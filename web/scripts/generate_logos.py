import os
from lib.generators.prompt_generator import PromptGenerator

def main():
    # Get HF token from environment variable
    hf_token = os.environ.get("HF_API_TOKEN")
    if not hf_token:
        raise ValueError("Please set the HF_API_TOKEN environment variable.")

    # Initialize generator
    generator = PromptGenerator(hf_token, upper_limit=5000)

    # Generate prompts
    client_prompt = "A logo for a modern tech company called 'TechNova'"
    prompts = generator.generate_prompts(client_prompt)

    # Save prompts
    generator.save_prompts(prompts)

    # Generate images
    generator.generate_images(prompts)

if __name__ == "__main__":
    main() 