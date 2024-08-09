import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw("alter table storybook_pages add prompt varchar(255);")
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw("alter table storybook_pages drop column prompt;")
}

