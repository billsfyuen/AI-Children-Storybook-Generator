import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw("ALTER TABLE characters ALTER COLUMN prompt TYPE TEXT;")
    await knex.raw("ALTER TABLE storybook_pages ALTER COLUMN prompt TYPE TEXT;")
    await knex.raw("ALTER TABLE storybooks ALTER COLUMN prompt TYPE TEXT;")
    await knex.raw("ALTER TABLE storybook_pages ALTER COLUMN caption TYPE TEXT;")
}


export async function down(knex: Knex): Promise<void> {
    // await knex.raw("ALTER TABLE characters ALTER COLUMN prompt TYPE TEXT;")
    // await knex.raw("ALTER TABLE storybook_pages ALTER COLUMN prompt TYPE TEXT;")
    // await knex.raw("ALTER TABLE storybooks ALTER COLUMN prompt TYPE TEXT;")
    // await knex.raw("ALTER TABLE storybook_pages ALTER COLUMN caption TYPE TEXT;")
}

