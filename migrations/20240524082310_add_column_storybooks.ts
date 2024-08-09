import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw("alter table storybooks add prompt varchar(255);")
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw("alter table storybooks drop column prompt;")
}

