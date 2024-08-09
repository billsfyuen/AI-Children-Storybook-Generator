//backup image generator

import { replicate } from "./replicate";
import { downloadImage } from "../utils/downloadImg";

const SEED = 123;
const STABLE_DIFFUSION_3_MODEL = "stability-ai/stable-diffusion-3"

export async function imageModel(characterName: string): Promise<any> {
    const output: any = await replicate.run(
        "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
        {
            input: {
                seed: SEED,
                width: 960,
                height: 512,
                prompt: `a ${characterName} in pixar style`,
                scheduler: "K_EULER",
                num_outputs: 1,
                guidance_scale: 7.5,
                num_inference_steps: 50
            }
        }
    );
    const url = output[0]
    // const newFileName = await downloadImage(url, 'character')
    return url;
}

export async function imageModelVII(prompt: string) {
    const input = {
        cfg: 3.5,
        steps: 28,
        prompt: prompt,
        aspect_ratio: "3:2",
        output_format: "webp",
        output_quality: 90,
        negative_prompt: "",
        prompt_strength: 0.85
    };

    const output = await replicate.run(STABLE_DIFFUSION_3_MODEL, { input });
    let imageURL = output as String
    return imageURL[0]
}