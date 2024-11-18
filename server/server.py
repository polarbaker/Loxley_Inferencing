import io
from flask import Flask, request, jsonify
from diffusers import BitsAndBytesConfig, SD3Transformer2DModel
from diffusers import StableDiffusion3Pipeline
from transformers import T5EncoderModel  # Importing the missing model
import matplotlib.pyplot as plt
from PIL import Image
import torch
import requests  # For making the POST request
import base64  # For encoding images to base64

#    #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
#    !huggingface-cli login

app = Flask(__name__)

# Target URL to forward the data to
TARGET_URL = 'https://fast-bear-157.convex.site/image'  # The convex URL to process images

@app.route('/')
def ping():
    """ Ping route to check if server is up """
    return jsonify({"message": "Server is up and running!"}), 200

@app.route('/ping_and_post', methods=['POST'])
def ping_and_post():
    """ Route to receive GET request and forward the data via POST """
    try:
        # Get the incoming query parameters (information in GET request)
        incoming_data = request.args.to_dict()  # Convert query parameters to a dictionary
        
        # Optionally, process or modify the data (add a new key-value pair)
        incoming_data['new_key'] = 'new_value'  # Add or modify data if needed

        images = makeImages()
        
        # Send the data and images to the target URL as a POST request
        headers = {'Content-Type': 'application/json'}  # Specify content type as JSON
        
        # Convert PIL images to base64 strings
        base64_images = []
        for img in images:
            # Convert PIL image to bytes in PNG format
            img_byte_arr = io.BytesIO()
            img.save(img_byte_arr, format='PNG')
            img_byte_arr = img_byte_arr.getvalue()
            
            # Encode bytes to base64 string
            base64_str = base64.b64encode(img_byte_arr).decode('utf-8')
            base64_images.append(base64_str)
            
        data = {
            **incoming_data,
            'images': base64_images
        }
        
        response = requests.post(TARGET_URL, json=data, headers=headers)
        
        # Check the response from the POST request
        if response.status_code == 200:
            return jsonify({
                "status": "success", 
                "message": "Data forwarded successfully",
                "forwarded_data": incoming_data
            }), 200
        else:
            return jsonify({
                "status": "error", 
                "message": "Failed to forward data", 
                "response": response.text
            }), 500
    
    except Exception as e:
        # Handle any errors that occur
        print(f"Error: {e}")
        return jsonify({"status": "error", "message": str(e)}), 400


def makeImages(promptsList = ["A logo for a modern tech company called 'Loxley Logos', futuristic, gradient colors, wireframe, circuit patterns, modern font, innovation theme, vector logo, clean design, high resolution, centered, no background"]):
    model_id = "stabilityai/stable-diffusion-3.5-large-turbo"

    nf4_config = BitsAndBytesConfig(
        load_in_4bit=True,
        bnb_4bit_quant_type="nf4",
        bnb_4bit_compute_dtype=torch.bfloat16
    )
    model_nf4 = SD3Transformer2DModel.from_pretrained(
        model_id,
        subfolder="transformer",
        quantization_config=nf4_config,
        torch_dtype=torch.bfloat16
    )

    ## embedding engine for the prompts
    t5_nf4 = T5EncoderModel.from_pretrained("diffusers/t5-nf4", torch_dtype=torch.bfloat16)

    pipeline = StableDiffusion3Pipeline.from_pretrained(
        model_id,
        transformer=model_nf4,
        text_encoder_3=t5_nf4,
        torch_dtype=torch.bfloat16
    )
    pipeline.enable_model_cpu_offload()

    image = pipeline(
        prompt=promptsList,
        num_inference_steps=2,
        guidance_scale=0.8,
        max_sequence_length=512,
        num_images_per_prompt = 1
    )


    return image.images

    # # Create a 3x3 grid
    # fig, axes = plt.subplots(9, 9, figsize=(12, 12))  # 3x3 grid

    # # Flatten the axes array for easy iteration
    # axes = axes.flatten()

    # # Display each image
    # for i, ax in enumerate(axes):
    #     ax.imshow(image.images[i])
    #     ax.axis('off')  # Hide axis

    # plt.tight_layout()  # Adjust layout to avoid overlap
    # plt.show()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)