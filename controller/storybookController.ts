import { knex } from "../utils/knex";
import { PageService } from "../service/pageService";
import { CharacterService } from "../service/characterService";
import { StorybookService } from "../service/storybookService"
import { Request, Response } from "express";
import { genPageImagePrompt, genStorybookTextPrompt } from "../utils/promptGenerator";
import { imageGeneratorModel, textGeneratorModel } from "../aiEngine/openaiGenerator";
import { downloadImage } from "../utils/downloadImg";
import { imageModelVII } from "../aiEngine/replicateGenerator";

const TEXT_MODEL = 'gpt-3.5-turbo';
const IMAGE_MODEL = 'dall-e-3'

const pageService = new PageService(knex);
const characterService = new CharacterService(knex);

export class StorybookController {
    constructor(private service: StorybookService) { }

    getAllStoryBook = async (req: Request, res: Response) => {
        try {
            const allStoryBook = await this.service.loadAllStorybook()
            res.status(200).json({ data: allStoryBook })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    getStoryBookById = async (req: Request, res: Response) => {
        try {
            const { id } = req.query;

            const storybookQueryResult = await this.service.getStoryBookInfoById(id as string);

            const totalPage = parseInt(storybookQueryResult[0].total_page);

            const pagesQueryResult: { [key: string]: any }[] = [];

            for (let pageNumber = 1; pageNumber <= totalPage; pageNumber++) {
                let pageQueryResult = await pageService.getPageByStorybookId(id as string, pageNumber)
                pagesQueryResult.push(pageQueryResult[0])
            }

            //return a json file with
            // 1) information of the book, and
            // 2) all pages in asc order
            res.json({
                message: "successful",
                data: {
                    cover: storybookQueryResult,
                    pages: pagesQueryResult,
                }
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    onclickStoryBookById = async (req: Request, res: Response) => {
        try {
            let { id } = req.query;

            let storybookQueryResult = (await this.service.getStoryBookById(id as string))[0]
            const likes = await this.service.getBookLikes(id as string)

            storybookQueryResult.likeCount = likes.count
            res.status(200).json({ data: storybookQueryResult })
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    };

    /** createStoryBook
     * @param req : userId, characterId, targetAge, category, totalPage
     * @param res : bookName, storybookId, content
    */
    createStoryBook = async (req: Request, res: Response) => {
        try {

            const userId = req.session.userId;
            const { characterId, targetAge, category, totalPage } = req.body;

            let characterInfo = await characterService.loadCharacterById(characterId);

            let characterRequirementJSON = JSON.parse(characterInfo[0].requirement);
            let characterName = characterInfo[0].name;

            let storybookTextPrompt = genStorybookTextPrompt(characterName, targetAge, category, totalPage);
            let storybookContent = await textGeneratorModel(storybookTextPrompt, TEXT_MODEL);
            let storybookContentJSON = JSON.parse(storybookContent as string);

            let bookName = storybookContentJSON.story_name;
            let description = storybookContentJSON.description_summary;

            let createStorybookQuery = await this.service.createStorybook(
                parseInt(userId as string),
                bookName as string,
                description as string,
                parseInt(characterId),
                parseInt(targetAge),
                category as string,
                parseInt(totalPage),
                JSON.stringify(storybookContentJSON)
            );

            let storybookId = createStorybookQuery[0].id;

            for (let i = 0; i < totalPage; i++) {
                let pageDetails = storybookContentJSON.scenario[i];
                let pageTextPrompt = genPageImagePrompt(characterRequirementJSON, pageDetails);
                let pageTextPromptGPT = await textGeneratorModel(pageTextPrompt, TEXT_MODEL);

                //using openai dall-e 3 model
                // let pageImageURL = await imageGeneratorModel(pageTextPromptGPT as string, IMAGE_MODEL);

                //using stable diffusion model from replicate
                let pageImageURL = await imageModelVII(pageTextPromptGPT as string);

                let pageImageFileName = await downloadImage(pageImageURL as string, 'page');

                await pageService.createPage(
                    storybookId,
                    pageDetails.description,
                    pageImageFileName as string,
                    i + 1,
                    pageTextPromptGPT as string)
            }

            res.json({
                message: 'create story book successfully',
                data: {
                    name: bookName,
                    storybookId: storybookId,
                    content: storybookContentJSON
                }
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    createStoryBookPlot = async (req: Request, res: Response) => {
        try {
            const userId = req.session.userId;
            const { characterId, targetAge, category, totalPage } = req.body;

            let characterInfo = await characterService.loadCharacterById(characterId);

            let characterName = characterInfo[0].name;

            console.log(`Creating Storybook Content for ${characterName}`)

            let storybookTextPrompt = genStorybookTextPrompt(characterName, targetAge, category, totalPage);
            let storybookContent = await textGeneratorModel(storybookTextPrompt, TEXT_MODEL);
            let storybookContentJSON = JSON.parse(storybookContent as string);

            console.log(`Storybook Plot:`)
            console.log(storybookContentJSON)

            let bookName = storybookContentJSON.story_name;
            let description = storybookContentJSON.description_summary;

            let createStoryBookPlotQuery = await this.service.createStorybook(
                parseInt(userId as string),
                bookName as string,
                description as string,
                parseInt(characterId),
                parseInt(targetAge),
                category as string,
                parseInt(totalPage),
                JSON.stringify(storybookContentJSON)
            );

            res.json({
                message: "create storybook plot successful",
                data: {
                    id: createStoryBookPlotQuery[0].id,
                    plot: storybookContentJSON,
                }
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    getStoryBookType = async (req: Request, res: Response) => {
        try {
            const data = await this.service.getStoryBookCategory()
            return res.json({ data })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    filterBook = async (req: Request, res: Response) => {
        try {
            const { obj } = req.body
            let result: any[] = []
            for (let condition of obj.condition) {
                const data = await this.service.filterBook(obj.key, condition)
                result = result.concat(data)
            }
            return res.json({ data: result })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }

    }

    bookSorting = async (req: Request, res: Response) => {
        try {
            const { category } = req.body
            if (category == "likes") {
                const data = await this.service.aggregateSorting()
                return res.json({ data })
            }
            const data = await this.service.storybookSorting(category)
            return res.json({ data })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    searchStoryBook = async (req: Request, res: Response) => {
        try {
            const { search } = req.body
            const data = await this.service.searchStoryBook(search)
            return res.json({ data })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    //TODO: check if book is created by user
    storybookUpdatePrivate = async (req: Request, res: Response) => {
        try {
            const { id } = req.query;
            await this.service.storybookUpdatePrivate(id as string)
            return res.json({
                message: "Made storybook private"
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    //TODO: check if book is created by user
    storybookUpdatePublic = async (req: Request, res: Response) => {
        try {
            const { id } = req.query;
            await this.service.storybookUpdatePublic(id as string)
            return res.json({
                message: "Made storybook public"
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }
}