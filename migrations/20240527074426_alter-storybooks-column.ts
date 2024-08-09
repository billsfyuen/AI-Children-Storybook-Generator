import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw("ALTER TABLE storybooks DROP COLUMN style;")
    await knex.raw("ALTER TABLE storybooks ALTER COLUMN is_public SET DEFAULT false;")
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw("ALTER TABLE storybooks ALTER COLUMN is_public DROP DEFAULT;")
    await knex.raw("ALTER TABLE storybooks ADD style VARCHAR(255);")
}

