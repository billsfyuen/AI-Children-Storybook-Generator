import { adamOpenAI, teckyOpenAI } from "./openai";

const SIZE_FOR_DALL_E = "1792x1024";

export async function textGeneratorModel(prompt: string, model: string) {
  const chatCompletion = await teckyOpenAI.chat.completions.create({
    messages: [{
      role: 'user',
      content: prompt
    }],
    model: model,
  });

  let result = chatCompletion.choices[0].message.content

  return result;
}

export async function imageGeneratorModel(prompt: string, model: string){
  const response = await adamOpenAI.images.generate({
    model: model,
    prompt: 
    `I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS:
    '${prompt}'`,
    n: 1,
    size: SIZE_FOR_DALL_E
  });
  
  let image_url = response.data[0].url;

  return image_url
}