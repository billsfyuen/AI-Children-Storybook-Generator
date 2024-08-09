import { CharacterService } from "../service/characterService";
import { Request, Response } from "express";
import { imageGeneratorModel, textGeneratorModel } from "../aiEngine/openaiGenerator";
import { downloadImage } from "../utils/downloadImg";
import { genCharacterRequirementJSON } from "../utils/characterRequirement";
import { genCharacterTextPrompt } from "../utils/promptGenerator";
import { imageModelVII } from "../aiEngine/replicateGenerator";

const TEXT_MODEL = 'gpt-3.5-turbo';
const IMAGE_MODEL = 'dall-e-3'

export class CharacterController {
    constructor(private service: CharacterService) { }

    loadCharacters = async (req: Request, res: Response) => {
        try {
            const userId = req.session.userId;
            const allCharacters = await this.service.loadCharacters(userId as string)
            res.status(200).json({ data: allCharacters })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    loadCharacterById = async (req: Request, res: Response) => {
        try {
            const { id } = req.query
            const characterData = await this.service.loadCharacterById(id as string)
            res.status(200).json({ data: characterData })

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    /** createCharacter
     * @param req : userId, name, speciesType, gender, age, bodyShape, heightSize
     * @param res : character-name, image, character-requirement-JSON  
    */
    createCharacter = async (req: Request, res: Response) => {
        try {
            const userId = req.session.userId;
            const { name, speciesType, gender, age, bodyShape, heightSize } = req.body;

            let characterRequirementJSON = await genCharacterRequirementJSON(name, speciesType, gender, age, bodyShape, heightSize);
            let characterTextPrompt = genCharacterTextPrompt(characterRequirementJSON);
            let characterTextPromptGPT = await textGeneratorModel(characterTextPrompt, TEXT_MODEL);

            //using openai dall-e 3 model
            // let imageURL = await imageGeneratorModel(characterTextPromptGPT as string, IMAGE_MODEL);

            //using stable diffusion model from replicate
            let imageURL = await imageModelVII(characterTextPromptGPT as string);
            let filename = await downloadImage(imageURL as string, 'character');

            let characterName = `${name} the ${speciesType}`

            await this.service.createCharacter(userId as string, characterName, filename as string, characterTextPromptGPT as string, JSON.stringify(characterRequirementJSON));

            res.status(200).json(
                {
                    message: 'character creation successful',
                    data: {
                        name: name,
                        image: filename,
                        requirement: characterRequirementJSON
                    }
                }
            )

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    deleteCharacter = async (req: Request, res: Response) => {
        try {
            const { id } = req.query
            await this.service.deleteCharacter(id as string)
            res.status(200).json({ message: "delete successfully" })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    hideCharacter = async (req: Request, res: Response) => {
        try {
            const { id } = req.query
            await this.service.hideCharacter(id as string)
            res.status(200).json({ message: "hide character successfully" })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

}