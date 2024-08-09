import { Knex } from "knex";


export class StorybookService {
    constructor(private knex: Knex) { }

    loadAllStorybook = async () => {
        const data = await this.knex
            .select(
                "storybooks.id",
                "storybooks.bookname",
                "storybooks.description",
                "storybooks.target_age",
                "storybook_pages.image",
                "storybooks.is_public"
            )
            .from("storybooks")
            .join("storybook_pages", "storybooks.id", "=", "storybook_pages.storybook_id")
            .where("storybook_pages.page_number", "=", 1);
        return data;
    }

    getStoryBookInfoById = async (id?: string) => {
        return await this.knex('storybooks')
            .select(
                'storybooks.bookname',
                'storybooks.description',
                'storybooks.target_age',
                'storybooks.category',
                'storybooks.total_page',
                'characters.name as character_name'
            )
            .innerJoin('characters', 'storybooks.character_id', 'characters.id')
            .where('storybooks.id', id);
    }

    searchStoryBook = async (str: string) => {
        return await this.knex("storybooks")
            .join("storybook_pages", "storybook_id", "storybooks.id")
            .select("storybooks.id", "bookname", "target_age", "category", "description", "image","is_public")
            .whereILike("bookname", `%${str}%`)
            .andWhere("page_number", "1")
            .andWhere("is_public","true")
            .limit(5)
    }

    getStoryBookById = async (storybookId: string) => {
        return await this.knex
            .select("bookname", "description", "target_age", "total_page", "category", "storybooks.created_at", "image", "is_public")
            .from("storybooks")
            .join("storybook_pages", "storybooks.id", "storybook_id")
            .where(`storybooks.id`, storybookId)
            .andWhere("page_number", "1")
    }

    getCharacterByStorybookId = async (id: string) => {
        return await this.knex
            .select("characters.name as character_name")
            .from("storybooks")
            .innerJoin('characters', 'storybooks.character_id', 'characters.id')
            .where('storybooks.id', id);
    }

    createStorybook = async (
        user_id: number,
        bookname: string,
        description: string,
        character_id: number,
        target_age: number,
        category: string,
        total_page: number,
        plot: string
    ) => {
        return await this.knex('storybooks')
            .insert({
                user_id,
                bookname,
                description,
                character_id,
                target_age,
                category,
                total_page,
                plot
            })
            .returning('id');
    }

    getStoryBookCategory = async () => {
        let data: {
            all?: number
            category?: any,
            target_age?: any,
            total_page?: any
        } = {}
        data.all = (await this.knex.raw("select * from storybooks")).rows.length
        data.category = (await this.knex.raw("select category, count(category) from storybooks where category is not null group by category ")).rows
        data.total_page = (await this.knex.raw("select total_page, count(total_page) from storybooks where total_page is not null group by total_page ")).rows
        data.target_age = (await this.knex.raw("select target_age, count(target_age) from storybooks where target_age is not null group by target_age ")).rows
        return data
    }

    filterBook = async (column: string, condition: string[]) => {
        return await this.knex.select("storybooks.id as id", "bookname", "description", "target_age","is_public","image")
        .from("storybooks")
        .join("storybook_pages","storybooks.id","storybook_id")
        .where(`${column}`, condition)
        .andWhere("page_number","1")
    }

    storybookSorting = async (category: string) => {
        if (category == "created_at") {
            category = "storybooks.created_at"
        }
        return await this.knex.select("storybooks.id as id", "bookname", "description", "target_age","is_public","image")
        .from("storybooks")
        .join("storybook_pages","storybooks.id","storybook_id")
        .where("page_number","1")
        .orderBy(category)
    }

    aggregateSorting = async () => {
        return (await this.knex.raw(`
        select count(like_relation.storybook_id) as count,bookname,description,target_age,like_relation.storybook_id as id,is_public,image
        from like_relation 
        right join storybooks 
        on storybooks.id = like_relation.storybook_id 
        join storybook_pages
        on storybooks.id = storybook_pages.storybook_id
        where page_number = 1
        group by like_relation.storybook_id,bookname,description,target_age,is_public,image
        order by count desc`)).rows
    }

    getBookLikes = async (storybookId: string) => {
        const result = (await this.knex.raw(`
        select count(storybook_id)
        from like_relation
        where storybook_id = ?
        group by storybook_id`, [storybookId])).rows[0]

        return result || { count: 0 }
    }

    storybookUpdatePrivate = async (storybookId: string) => {
        await this.knex('storybooks')
            .update("is_public", false)
            .where("id", storybookId)
    }

    storybookUpdatePublic = async (storybookId: string) => {
        await this.knex('storybooks')
            .update("is_public", true)
            .where("id", storybookId)
    }
}

