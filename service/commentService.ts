import { Knex } from "knex";

export class CommentService {
    constructor(private knex: Knex){ }

        getAllComment = async (storybook_id: string) => {
            let result = await this.knex
            .select("comments.id","content", "comments.updated_at","username")
            .from("comments")
            .leftJoin("users","users.id","user_id")
            .where("storybook_id",storybook_id)
            .orderBy("id")
        
            return result
        }
        
        createComment = async (content: string, storybook_id: string, user_id: string|null) => {
            let result = await this.knex
            .insert ({content, user_id, storybook_id })
            .into("comments")

            return result
        }

        updateComment = async (content: string,  comment_id: string) => {
           
           console.log(content, comment_id);
           
            let result = await this.knex
            ("comments")
            .update({
                content: content,
                updated_at: this.knex.fn.now()
            })
            .where("id", comment_id)
            .orderBy("created_at", "asc")

            return result
        }

        deleteComment = async (comment_id: string) => {
            await this.knex
            ("comments")
            .where("id", comment_id)
            .del();
        }

        getCommentByUserId = async (user_id:string)=>{
            return await this.knex.select("id").from("comments").where("user_id",user_id)
        }
    }
