import { textGeneratorModel } from "../aiEngine/openaiGenerator";
import { improveCharacterDetailPrompt } from "../utils/promptGenerator";

const TEXT_MODEL = 'gpt-3.5-turbo';

export function genCharacterRequirementJSON(
    name: string, 
    speciesType: string, 
    gender: string, 
    age: string, 
    bodyShape: string, 
    heightSize: string,
) {
    let characterRequirementJSON = {
        "character_features": {
            "species_type": speciesType,
            //choice: tiger, cat, human, robot, wolf, elephant, fox, alien, dragon, bear, unicorn, fairy, gnome, mermaid
            "gender": gender,
            //choice: male, female
            "name": name,
            //free input
            "age": age,
            //choice: child, teenager, adult, elderly
            "body_shape": bodyShape,
            //choice: slim, muscular, chubby, petite
            "height_size": heightSize,
            //choice: tall, short, average
            "distinctive_features": "",
            //choice (at most 2): fluffy cheeks, tuft on head, big green eyes, freckles, pointed ears, pixie ears, button nose, raindrop dimples
            "clothing_outfit": "",
            //choice (with color): monk tunic, superhero costume, casual wear, space suit, pirate outfit, royal gown, ninja attire, cowboy costume, school uniform, business suit, beachwear, vintage dress, sports gear
            "accessories": ""
            //choice (with color): hat, glasses, backpack, weapon, magic wand
        },
        "color_theme": {
            "primary_colors": "",
            //choice (at most 2): yellow, blue, red, white, orange, green, purple, cyan, magenta, teal, silver, gold, maroon, navy, turquoise, lime, peach, beige, lavender, grey, tan, cream
            "secondary_colors": "",
            //choice (at most 2 / differ from primary_colors): yellow, blue, red, white, orange, green, purple, cyan, magenta, teal, silver, gold, maroon, navy, turquoise, lime, peach, beige, lavender, grey, tan, cream
            "pattern_markings": "",
            //choice: stripes, spots, solid color
            "gradient_shading": ""
            //choice: gradient shading, flat colors
            //for our app, fixed with gradient shading
        },
        "drawing_style": {
            "art_style": "pixar",
            //choice: cartoon, chibi, manga, pixar, studio ghibli
            //for our app, fixed with "pixar"
            "linework": "clean",
            //choice: clean, sketchy, bold, fine
            //for our app, fixed with "clean"
            "detail_level": "intermediate",
            //choice: highly detailed, minimalist, intermediate
            //for our app, fixed with intermediate
            "color_palette": "vibrant",
            //choice: vibrant, pastel, monochrome, warm, cool
            //for our app, fixed with vibrant
            "medium": "watercolor"
            //choice: digital, watercolor, pencil sketch
            //for our app, fixed with watercolor
        },
        "intended_use": {
            "purpose": "illustration", 
            //choice: 2D game asset, animation, illustration
            //for our app, fixed with "illustration"
            "audience": "children" 
            //choice: children, teenagers, adults)
            //for our app, fixed with children
        }
    }
    return improveCharacterDetail(characterRequirementJSON);
}

async function improveCharacterDetail(characterRequirementJSON: {}) {

    let prompt = improveCharacterDetailPrompt(characterRequirementJSON);
    let resultJSON = await textGeneratorModel(prompt, TEXT_MODEL)

    return JSON.parse(resultJSON as string);
}