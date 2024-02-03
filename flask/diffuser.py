from diffusers import DiffusionPipeline

pipeline = DiffusionPipeline.from_pretrained("stabilityai/stable-video-diffusion-img2vid-xt")
input_image_path = "test/luggage.png"

output_video_path = "test/video.mp4"
pipeline(input_image_path, output_video_path)