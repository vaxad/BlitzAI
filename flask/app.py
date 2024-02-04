from io import BytesIO
from flask import Flask, jsonify, request , send_file, make_response, send_from_directory
from PIL import Image
import google.generativeai as genai
import PIL
from flask_cors import CORS
import re
import os
import tempfile
from roboflow import Roboflow
import supervision as sv
import cv2
import numpy as np
from reportlab.pdfgen import canvas
from dotenv import load_dotenv
from openai import OpenAI
from pathlib import Path
from ttsvoice import tts
from gtts import gTTS
#API KEYs
load_dotenv()
GEMINI_KEY = os.getenv("GEMINI_KEY")
ROBOFLOW_KEY = os.getenv("ROBOFLOW_KEY")
OPENAI_KEY = os.getenv("OPENAI_KEY")

genai.configure(api_key=GEMINI_KEY)
rf = Roboflow(api_key=ROBOFLOW_KEY)
client = OpenAI(api_key=OPENAI_KEY)

app = Flask(__name__) 
CORS(app)

#CONSTANTS
temp_folder = tempfile.mkdtemp()

#Functions
def remove_special_characters(text):
    pattern = r'[^a-zA-Z0-9. ]'
    cleaned_text = re.sub(pattern, '', text)
    return cleaned_text

def predict_yolosegment_image(image_path):
    project = rf.workspace().project("coco-dataset-vdnr1")
    model = project.version(11).model
    result = model.predict(image_path, confidence=40).json()
    labels = [item["class"] for item in result["predictions"]]
    detections = sv.Detections.from_roboflow(result)
    label_annotator = sv.LabelAnnotator()
    mask_annotator = sv.MaskAnnotator()
    image = cv2.imread(image_path)
    annotated_image = mask_annotator.annotate(scene=image, detections=detections)
    annotated_image = label_annotator.annotate(scene=annotated_image, detections=detections, labels=labels)
    _, temp_file = tempfile.mkstemp(suffix=".png")
    cv2.imwrite(temp_file, annotated_image)
    return temp_file

def predict_emotiondetection(image):
    project = rf.workspace().project("emotion1-cso6k")
    model = project.version(1).model
    class_colors = {
        'anger': (0, 0, 255),
        'fear': (0, 255, 255),
        'happy': (0, 255, 0),
        'neutral': (255, 255, 0),
        'sad': (255, 0, 0),
        'disgust': (255, 0, 255)
    }
    prediction = model.predict(image, confidence=40, overlap=30).json()
    for p in prediction['predictions']:
        center_x, center_y = int(p['x']), int(p['y'])
        w, h = int(p['width']), int(p['height'])
        x = center_x - w // 2
        y = center_y - h // 2
        class_name = p['class']
        confidence = p['confidence']

        color = class_colors.get(class_name, (255, 255, 255))
        cv2.rectangle(image, (x, y), (x + w, y + h), color, 2)
        text = f"{class_name} ({confidence:.2f})"
        text_color = (0, 0, 0) if color != (0, 0, 255) else (255, 255, 255)
        cv2.putText(image, text, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, text_color, 2)

    ret, buffer = cv2.imencode('.jpg', image)
    image = buffer.tobytes()
    return image

def generate_pdf_content(values):
    buffer = BytesIO()
    pdf = canvas.Canvas(buffer)
    pdf.drawString(100, 800, f"Hello, {values.get('name', 'Unknown')}")
    pdf.drawString(100, 780, f"Email: {values.get('email', 'N/A')}")
    pdf.save()
    pdf_content = buffer.getvalue()
    buffer.close()
    return pdf_content

#Routes
@app.route('/ocr', methods=['POST'])
def ocr():
    try:
        image_file = request.files['image']
        image_file.save("temp_image.jpg")
        img = PIL.Image.open('temp_image.jpg')
        model = genai.GenerativeModel('gemini-pro-vision')
        result = model.generate_content([img,"Extract all the text from the image"],stream=True)
        result.resolve()
        os.remove("temp_image.jpg")
        return jsonify({'result': result.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/chatbot', methods=['POST'])
def chatbot():
    try:
        user_input = request.form['text']
        model = genai.GenerativeModel('gemini-pro')
        result = model.generate_content(user_input, stream=True)
        result.resolve()
        res = remove_special_characters(result.text)
        return jsonify({'result': res})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route("/yolosegment", methods=["POST"])
def yolosegment():
    if request.method == "POST":
        if "image" not in request.files:
            return jsonify({"error": "No file part"})
        file = request.files["image"]
        if file.filename == "":
            return jsonify({"error": "No selected file"})
        temp_dir = tempfile.mkdtemp()
        temp_file = os.path.join(temp_dir, file.filename)
        file.save(temp_file)
        annotated_image_file = predict_yolosegment_image(temp_file)
        os.remove(temp_file)
        os.rmdir(temp_dir)
        return send_file(annotated_image_file, mimetype="image/png", as_attachment=True)


@app.route("/emotiondetection", methods=["POST"])
def emotiondetection():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'})
    image = request.files['image']
    image_np = np.frombuffer(image.read(), np.uint8)
    image = cv2.imdecode(image_np, cv2.IMREAD_COLOR)
    emotion_detection_image = predict_emotiondetection(image)
    temp_file = tempfile.NamedTemporaryFile(suffix=".jpg", delete=False, mode='wb')
    temp_file.write(emotion_detection_image)
    temp_file_path = temp_file.name
    temp_file.close()
    return send_file(
        temp_file_path,
        mimetype='image/jpeg',
        as_attachment=True,
        download_name='emotion_detection_prediction.jpg'
    )

@app.route("/receiptgeneration", methods=["POST"])
def receiptgeneration():
    values = request.json.get('values', {})
    response = make_response(generate_pdf_content(values))
    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = 'inline; filename=output.pdf'

    return response

@app.route('/imagecaptioning', methods=['POST'])
def imagecaptioning():
    try:
        image_file = request.files['image']
        image_file.save("temp_image.jpg")
        img = PIL.Image.open('temp_image.jpg')
        model = genai.GenerativeModel('gemini-pro-vision')
        result = model.generate_content([img,"Give a short description of what is happening in the image"],stream=True)
        result.resolve()
        os.remove("temp_image.jpg")
        return jsonify({'result': result.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route("/getTranscipt", methods=["POST"])
def getTranscipt():
    try:
        audio_file = request.files['audio']
        if audio_file and audio_file.filename.endswith(('.mp3', '.wav', '.flac','mp4')):
            audio_path = os.path.join(temp_folder, audio_file.filename)
            audio_file.save(audio_path)
            transcript = client.audio.transcriptions.create(
                model="whisper-1",
                file=Path(audio_path),
                response_format="text"
            )
            return jsonify({"transcript": transcript})

        else:
            return jsonify({"error": "Invalid audio file format"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/generateAlternateThumbnail", methods=["POST"])
def generateAlternateThumbnail():
    try:
        image_file = request.files['image']
        n_thumbnails = int(request.form['n_thumbnails'])
        image = Image.open(image_file)
        byte_stream = BytesIO()
        image.save(byte_stream, format='PNG')
        byte_array = byte_stream.getvalue()
        response = client.images.create_variation(
            image=byte_array,
            n=n_thumbnails,
            model="dall-e-2",
            size="1024x1024"
        )
        result_url=[]
        for i in range(n_thumbnails):
            result_url.append(response.data[i].url)
        return jsonify({"result_url": result_url})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/editImagewithPrompt", methods=["POST"])
def editImagewithPrompt():
    try:
        image_file = request.files['image']
        mask_file = request.files['mask']
        prompt = request.form['prompt']

        image = Image.open(image_file)
        image = image.resize((1024,1024))
        image_byte_stream = BytesIO()
        image.save(image_byte_stream, format='PNG')
        image_byte_array = image_byte_stream.getvalue()

        mask = Image.open(mask_file)
        mask = mask.resize((1024,1024))
        mask_byte_stream = BytesIO()
        mask.save(mask_byte_stream, format='PNG')
        mask_byte_array = mask_byte_stream.getvalue()

        response = client.images.edit(
            image=image_byte_array,
            mask=mask_byte_array,
            model="dall-e-2",
            prompt=prompt,
            n=1,
            size="1024x1024"
        )
        result_url=response.data[0].url
        return jsonify({"result_url": result_url})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/generateImage", methods=["POST"])
def generateImage():
    try:
        prompt = request.form['prompt']
        response = client.images.generate(
            model="dall-e-3",
            prompt=prompt,
            size="1792x1024",
            quality="standard",
            n=1,
        )
        result_url=response.data[0].url
        return jsonify({"result_url": result_url})
    except Exception as e:
        return jsonify({"error": str(e)}), 500 

@app.route("/generateThumbnailfromTitle", methods=["POST"])
def generateThumbnailfromTitle():
    try:
        title = request.form['title']
        prompt = f"Generate youtube thumbnail for youtube title : {title}"
        response = client.images.generate(
            model="dall-e-3",
            prompt=prompt,
            size="1792x1024",
            quality="standard",
            n=1,
        )
        result_url=response.data[0].url
        return jsonify({"result_url": result_url})
    except Exception as e:
        return jsonify({"error": str(e)}), 500 

@app.route("/generateThumbnailfromDescription", methods=["POST"])
def generateThumbnailfromDescription():
    try:
        text = request.form['text']
        prompt = f"Generate youtube thumbnail for youtube description : {text}"
        response = client.images.generate(
            model="dall-e-3",
            prompt=prompt,
            size="1792x1024",
            quality="standard",
            n=1,
        )
        result_url=response.data[0].url
        return jsonify({"result_url": result_url})
    except Exception as e:
        return jsonify({"error": str(e)}), 500 

@app.route('/tts', methods=["POST"])
def tts_api():
    try:
        output_folder = "output_folder"  
        if not os.path.exists(output_folder):
            os.makedirs(output_folder)
        text = request.form['text']
        voice = request.form['voice']
        tempo = request.form['tempo']
        engine = gTTS(text=text, lang='en', slow=(tempo == "low"))
        audio_file_path = os.path.join(output_folder, 'output.mp3')
        engine.save(audio_file_path)
        return send_from_directory(output_folder, 'output.mp3', as_attachment=True)
    except Exception as e:
        return jsonify({"error": str(e)}), 500 

@app.route('/createSummaryFromAudioText', methods=["POST"])
def createSummaryFromAudioText():
    try:
        text = request.form['text']
        no_words = request.form['no_words']
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": f"You are a youtube transcript summarizer designed to give output as text with {no_words} words"},
                {"role": "user", "content": text}
            ]
        )
        return jsonify({"result": response.choices[0].message.content})
    except Exception as e:
        return jsonify({"error": str(e)}), 500 


@app.route('/createTitlefromDescription', methods=["POST"])
def createTitlefromDescription():
    try:
        text = request.form['text']
        no_words = request.form['no_words']
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": f"You are a youtube video title generator from video description designed to give output as text with {no_words} words"},
                {"role": "user", "content": text}
            ]
        )
        return jsonify({"result": response.choices[0].message.content})
    except Exception as e:
        return jsonify({"error": str(e)}), 500 

@app.route('/createScriptfromDescription', methods=["POST"])
def createScriptfromDescription():
    try:
        text = request.form['text']
        no_words = request.form['no_words']
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": f"You are a youtube video script generator from video description designed to give output as text with {no_words} words"},
                {"role": "user", "content": text}
            ]
        )
        return jsonify({"result": response.choices[0].message.content})
    except Exception as e:
        return jsonify({"error": str(e)}), 500 
    
@app.route('/createDescriptionfromTitle', methods=["POST"])
def createDescriptionfromTitle():
    try:
        text = request.form['text']
        no_words = request.form['no_words']
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": f"You are a youtube video description generator from video title designed to give output as text with {no_words} words"},
                {"role": "user", "content": text}
            ]
        )
        return jsonify({"result": response.choices[0].message.content})
    except Exception as e:
        return jsonify({"error": str(e)}), 500 

@app.route('/generateScriptfromTitle', methods=["POST"])
def generateScriptfromTitle():
    try:
        text = request.form['text']
        no_words = request.form['no_words']
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": f"You are a youtube video script generator from video title designed to give output as text with {no_words} words"},
                {"role": "user", "content": text}
            ]
        )
        return jsonify({"result": response.choices[0].message.content})
    except Exception as e:
        return jsonify({"error": str(e)}), 500 
    
@app.route('/createHashTagsfromDescription', methods=["POST"])
def createHashTagsfromDescription():
    try:
        text = request.form['text']
        no_words = request.form['no_words']
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": f"You are a youtube hashtag generator from video description designed to give output as text with {no_words} hashtags"},
                {"role": "user", "content": text}
            ]
        )
        return jsonify({"result": response.choices[0].message.content})
    except Exception as e:
        return jsonify({"error": str(e)}), 500 
    
@app.route('/validateMadeforKidsfromSummary', methods=["POST"])
def validateMadeforKidsfromSummary():
    try:
        text = request.form['text']
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": f"You are a youtube made for kids validator from video summary give output as a json format with keys isKidsSafe and valuesLearntfromvideo"},
                {"role": "user", "content": text}
            ]
        )
        return jsonify({"result": response.choices[0].message.content})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/createDescriptionfromScript', methods=["POST"])
def createDescriptionfromScript():
    try:
        text = request.form['text']
        no_words = request.form['no_words']
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": f"You are a youtube video description generator from video script designed to give output as text with {no_words} words"},
                {"role": "user", "content": text}
            ]
        )
        return jsonify({"result": response.choices[0].message.content})
    except Exception as e:
        return jsonify({"error": str(e)}), 500 
    
@app.route('/createHashTagsfromScript', methods=["POST"])
def createHashTagsfromScript():
    try:
        text = request.form['text']
        no_words = request.form['no_words']
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": f"You are a youtube hashtag generator from video script designed to give output as text with {no_words} hashtags"},
                {"role": "user", "content": text}
            ]
        )
        return jsonify({"result": response.choices[0].message.content})
    except Exception as e:
        return jsonify({"error": str(e)}), 500 

@app.route('/createTitlefromScript', methods=["POST"])
def createTitlefromScript():
    try:
        text = request.form['text']
        no_words = request.form['no_words']
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": f"You are a youtube video title generator from video script designed to give output as text with {no_words} words"},
                {"role": "user", "content": text}
            ]
        )
        return jsonify({"result": response.choices[0].message.content})
    except Exception as e:
        return jsonify({"error": str(e)}), 500 

@app.route("/generateThumbnailfromScript", methods=["POST"])
def generateThumbnailfromScript():
    try:
        text = request.form['text']
        prompt = f"Generate youtube thumbnail for youtube script : {text}"
        response = client.images.generate(
            model="dall-e-3",
            prompt=prompt,
            size="1792x1024",
            quality="standard",
            n=1,
        )
        result_url=response.data[0].url
        return jsonify({"result_url": result_url})
    except Exception as e:
        return jsonify({"error": str(e)}), 500 
    
@app.route('/hello', methods=['GET']) 
def helloworld(): 
	if(request.method == 'GET'): 
		data = {"data": "Hello World"} 
		return jsonify(data) 

if __name__ == '__main__': 
	app.run(debug=True)