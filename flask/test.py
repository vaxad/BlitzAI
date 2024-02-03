from openai import OpenAI
client = OpenAI(api_key="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")

audio_file= open("test/story.mp3", "rb")
print(audio_file)
transcript = client.audio.transcriptions.create(
  model="whisper-1", 
  file=audio_file
)
print(transcript)