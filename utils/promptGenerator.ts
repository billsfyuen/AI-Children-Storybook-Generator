export function genStorybookTextPrompt(characterName: string, targetAge: number, category: string, totalPage: number): string {
    let prompt = 
    `You are a storybook generator. Generate a children story book of ${totalPage} pages. The target age group of the storybook is ${targetAge} years old. The name of the main character is "${characterName}". The category the the story is under ${category}. Each page must involve a main character in a scenario. The scenario should always:
1. be in a setting; 
2. have the main character doing an activity (use dynamic verbs, not passive things like "waiting" or "watching")
3. have the main character showing a strong emotion.
4. have a camera angle (e.g. wide-shot, full-shot, medium-shot, close-up)

Respond with the following exact format in JSON (do not add any conclusions at the end):
{
story_name: ... ,

description_summary: ... ,

scenario: [
    {
        page: 1
        setting: ... 
        activity: ...
        emotion: ...
        camera_angle: ...
        description: ...
    },
    {
        page: 2
        setting: ...
        activity: ...
        emotion: ...
        camera_angle: ...
        description: ...
    },
    ...
    {
        page: ${totalPage}
        activity: ...
        emotion: ...
        camera_angle: ...
        description: ...
    }
}
]
    `;

    return prompt
}

export function genCharacterTextPrompt(characterRequirementJSON: {}): string {

    const characterPromptIntro = 
    "You are a prompt engineer mastering in generate prompts to generate images of fictional characters. Use the following JSON as requirements to generate a prompt, be as details as possible:\n\n";

    const characterPromptEnd =
    "\n\nReturn only the prompt message. Skip any introduction and conclusion wordings"

    let prompt = characterPromptIntro + JSON.stringify(characterRequirementJSON) + characterPromptEnd;

    return prompt;
}

export function genPageImagePrompt(characterRequirementJSON: {}, pageDetails: {}): string {

    let pageRequirementJSON: any = Object.assign({}, characterRequirementJSON);

    const intro = 
    "You are a prompt engineer mastering in generate prompts for DALL-E-3. Use the following JSON as requirements to generate a prompt of a character doing activity in a scenario, be as details as possible:\n\n";

    const end =
    "\n\nReturn only the prompt message. Skip any introduction and conclusion wordings. You may start your prompt message with 'Draw...', 'Generate an image of...' or 'Create an illustration of...'."
    
    pageRequirementJSON['scenario'] = pageDetails;
    delete pageRequirementJSON['scenario'].page;

    let prompt = intro + JSON.stringify(pageRequirementJSON) + end;

    return prompt;
}

export function improveCharacterDetailPrompt(characterRequirementJSON: {}) {
    const intro = `You are a cartoon character creator. Your client has input some requirements for a new character. Please finish the form by fill in some values under the field "distinctive_features", "clothing_outfit", "accessories", "primary_colors", "secondary_colors", "pattern_markings", and "gradient_shading". We hope the character is appealing to children.\n\n`;
    const end = `\n\nPlease return only the JSON. Skip any introduction and / or conclusion wordings.`

    let prompt = intro + JSON.stringify(characterRequirementJSON) + end;

    return prompt;
}