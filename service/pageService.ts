import { Knex } from "knex";

export class PageService {
    constructor(private knex: Knex) {}

    async getPageByStorybookId(storybookId?: string, pageNumber?: number) {
        return await this.knex
            .select('page_number', 'caption', 'image')
            .from('storybook_pages')
            .where('storybook_id', storybookId)
            .where('page_number', pageNumber);
    }

    async createPage(storybookId?: string, caption?: string, image?: string, pageNumber?: number, prompt?: string) {
        return await this.knex('storybook_pages')
            .insert({
                storybook_id: storybookId,
                page_number: pageNumber,
                caption: caption,
                image: image,
                prompt: prompt
            })
            .returning('id')
    }
}