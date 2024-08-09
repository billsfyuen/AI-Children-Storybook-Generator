import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("characters",(table)=>{
        table.renameColumn("character_name","name")
        table.renameColumn("image_name","image")
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("characters",(table)=>{
        table.renameColumn("name","character_name")
        table.renameColumn("image","image_name")
    })

}

