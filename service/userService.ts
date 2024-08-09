import { Knex } from "knex";

export class UserService {
    constructor(private knex: Knex) { }

    login = async (email: string) => {
        return await this.knex.select('*').from("users").where('email', email)
    }

    checkDuplicateUser = async (username: string, email: string) => {
        return await this.knex.select("*").from("users").where("email", email).orWhere("username", username)
    }


    register = async (username: string, email: string, password: string) => {
        return await this.knex.insert({ username, email, password }).into("users").returning("id")
    }

    getUserInfo = async (userId: string) => {
        return this.knex.select("id", "username", "email").from("users").where("id", userId)
    }

    getStorybookbyUserId = async (userId: string) => { 
        return await this.knex
            .select(
                "storybooks.id",
                "storybooks.character_id",
                "storybooks.bookname",
                "storybooks.description",
                "storybooks.target_age",
                "storybooks.created_at",
                "storybooks.category",
                "storybooks.total_page",
                "storybook_pages.image"
            )
            .from("storybooks")
            .leftJoin("storybook_pages", "storybooks.id", "=", "storybook_pages.storybook_id")
            .where({
                "storybooks.user_id": userId,
                "storybook_pages.page_number": 1
            });
    };     


    editUsername = async (userId:string, username:string)=>{
        await this.knex("users").update({username}).where("id",userId)
        return 
    }

    checkPassword = async (userId:string) =>{
        return (this.knex.select("password").from("users").where("id", userId))
    }

    editPassword = async (userId:string ,hashPassword:string)=>{
        await this.knex("users").update({password : hashPassword}).where("id",userId)
    }

    checkFreeTrial = async (userId:string)=>{
        return await this.knex.select("has_first_attempt").from("users").where("id",userId)
    }

    firstAttemptDone = async (userId: string) => {
        await this.knex.raw('UPDATE users SET has_first_attempt = true WHERE id = ?', [userId])
    }
}