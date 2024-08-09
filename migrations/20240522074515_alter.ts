import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw("alter table storybooks add style varchar(255);")
    await knex.raw("alter table storybooks add category varchar(255);")
    await knex.raw("alter table storybooks add total_page bigint;")
    await knex.raw("alter table characters add prompt varchar(255);")
    await knex.raw("alter table characters add seed varchar(255);")

}


export async function down(knex: Knex): Promise<void> {
    await knex.raw("alter table characters drop column seed;")
    await knex.raw("alter table characters drop column prompt;")
    await knex.raw("alter table storybooks drop column total_page;")
    await knex.raw("alter table storybooks drop column category;")
    await knex.raw("alter table storybooks drop column style;")
}

