import { Knex } from "knex";

export class LikeService {
    constructor(private knex: Knex) { }

    getLikes = async (user_id:string)=>{
        const result = (await this.knex.raw(`
        select s.id as id, character_id,bookname,description,target_age,s.created_at,category,total_page,image
        from like_relation l 
        join storybooks s 
        on storybook_id = s.id 
        join storybook_pages p
        on s.id = p.storybook_id
        where s.user_id = ?
        and page_number = '1'
        `,[user_id])).rows
        return result
    }


    likeBook = async (user_id:string, storybook_id:string) =>{
        await this.knex.insert ({user_id,storybook_id}).into("like_relation")
    }

    dislikeBook = async (user_id:string, storybook_id:string) =>{
        await this.knex("like_relation").where("user_id", user_id).andWhere("storybook_id",storybook_id).del()
    }

    getLikeCount = async (storybookId: string) => {
        const result = (await this.knex.raw(`
        select count(storybook_id)
        from like_relation
        where storybook_id = ?
        group by storybook_id`, [storybookId])).rows[0]

        return result || { count: 0 }
    }
}