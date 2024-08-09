import { Knex } from "knex";

export class PaymentService {
    constructor(private knex: Knex) { }

    createPayment = async (user_id:string) =>{
        await this.knex.insert({ user_id, status:"pending" }).into("payment")
    }

    updatePayment = async(user_id:string,payment_id:string) =>{
        const pending = await this.knex.raw(`delete from payment where user_id = ? and status = 'pending'`,[user_id])
        await this.knex.insert({ user_id, status:"completed",payment_id}).into("payment")
    }

    checkUserPayment = async(userId:string)=>{
        return await this.knex("payment")
        .where({
            user_id : userId,
            status:"completed"
        })
        .select("*")
    }
}