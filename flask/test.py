from openai import OpenAI
client = OpenAI(api_key="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")

# audio_file= open("test/story.mp3", "rb")
# print(audio_file)
# transcript = client.audio.transcriptions.create(
#   model="whisper-1", 
#   file=audio_file
# )
# print(transcript)

from io import BytesIO
from PIL import Image

image = Image.open("test/thumbnail.png")
width, height = 256, 256
image = image.resize((width, height))


byte_stream = BytesIO()
image.save(byte_stream, format='PNG')
byte_array = byte_stream.getvalue()

response = client.images.create_variation(
  image=byte_array,
  n=2,
  model="dall-e-2",
  size="1024x1024"
)
print(response)
# print(response.data[0].url)