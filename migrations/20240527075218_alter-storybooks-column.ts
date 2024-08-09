import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw("ALTER TABLE storybooks DROP COLUMN prompt;")
    await knex.raw("ALTER TABLE storybooks ADD plot TEXT;")
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw("ALTER TABLE storybooks DROP COLUMN plot;")
    await knex.raw("ALTER TABLE storybooks ADD prompt VARCHAR(255);")
}

