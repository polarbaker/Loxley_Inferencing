import itertools
import os
import random
from typing import List, Optional
import torch
from diffusers import StableDiffusionPipeline
from PIL import Image
import imagehash
from huggingface_hub import login

from ..config.prompt_config import (
    STYLES, COLORS, TECHNIQUES, SHAPES, FONTS, THEMES, MODEL_CONFIG
)

class PromptGenerator:
    def __init__(self, hf_token: str, upper_limit: int = 5000):
        """
        Initialize the PromptGenerator with authentication and configuration.
        
        Args:
            hf_token (str): Hugging Face API token
            upper_limit (int): Maximum number of images to generate
        """
        self.upper_limit = upper_limit
        self.hf_token = hf_token
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.image_hashes = set()
        self.setup_model()
        
    def setup_model(self) -> None:
        """Initialize the Stable Diffusion model."""
        login(token=self.hf_token)
        self.pipe = StableDiffusionPipeline.from_pretrained(
            MODEL_CONFIG["model_id"],
            torch_dtype=torch.float16,
            use_auth_token=self.hf_token
        ).to(self.device)

    def generate_prompts(self, client_prompt: str) -> List[str]:
        """Generate a list of prompts based on the client's input."""
        prompt_combinations = list(itertools.product(
            STYLES, COLORS, TECHNIQUES, SHAPES, FONTS, THEMES
        ))
        
        num_samples = min(self.upper_limit, len(prompt_combinations))
        sampled_combinations = random.sample(prompt_combinations, num_samples)
        
        prompts = []
        for combo in sampled_combinations:
            style, color, technique, shape, font, theme = combo
            prompt = (f"{client_prompt}, {style}, {color}, {technique}, {shape}, "
                     f"{font}, {theme} theme, {MODEL_CONFIG['standard_language']}")
            prompts.append(prompt)
            
        return prompts

    def save_prompts(self, prompts: List[str], output_file: str = "prompts.txt") -> None:
        """Save generated prompts to a file."""
        with open(output_file, "w") as f:
            for prompt in prompts:
                f.write(prompt + "\n")

    def generate_images(self, prompts: List[str]) -> None:
        """Generate images from the prompts."""
        os.makedirs(MODEL_CONFIG["output_dir"], exist_ok=True)
        
        unique_images_saved = 0
        for idx, prompt in enumerate(prompts):
            if unique_images_saved >= self.upper_limit:
                print(f"Reached the upper limit of {self.upper_limit} images.")
                break

            seed = random.randint(0, 2**32 - 1)
            generator = torch.Generator(device=self.device).manual_seed(seed)
            
            image = self.pipe(prompt, generator=generator).images[0]
            img_hash = imagehash.phash(image)
            
            if img_hash in self.image_hashes:
                print(f"Duplicate image detected for prompt index {idx}. Skipping.")
                continue
                
            self.image_hashes.add(img_hash)
            unique_images_saved += 1
            
            image_path = os.path.join(
                MODEL_CONFIG["output_dir"], 
                f"logo_{unique_images_saved}.png"
            )
            image.save(image_path)
            print(f"Saved image {image_path}")
            