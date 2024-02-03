from PIL import Image, ImageDraw
import cv2
import os

def detect_faces(image_path):
    # Load the image using OpenCV
    image = cv2.imread(image_path)

    # Convert the image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Load the pre-trained face detector from OpenCV
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

    # Detect faces in the image
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    return faces

def erase_faces(image_path, output_path):
    # Open the image using Pillow
    image = Image.open(image_path)

    # Detect faces in the image
    faces = detect_faces(image_path)

    # Initialize a drawing object to draw bounding boxes on the original image
    draw = ImageDraw.Draw(image)

    # Iterate over detected faces, draw bounding boxes, and erase the faces
    for (x, y, w, h) in faces:
        # Draw a bounding box on the original image
        draw.rectangle([x, y, x+w, y+h], outline="red", width=2)

        # Erase the face region by pasting a transparent rectangle
        image.paste((0, 0, 0, 0), (x, y, x+w, y+h))

    # Save the result
    image.save(output_path, format='PNG')

if __name__ == "__main__":
    input_image_path = "test/Happy.jpg"
    output_image_path = "test/output.png"

    erase_faces(input_image_path, output_image_path)
