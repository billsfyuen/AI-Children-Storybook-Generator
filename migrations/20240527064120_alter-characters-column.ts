import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw("ALTER TABLE characters DROP COLUMN seed;")
    await knex.raw("ALTER TABLE characters ADD requirement TEXT;")
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw("ALTER TABLE characters DROP COLUMN requirement;")
    await knex.raw("ALTER TABLE characters ADD seed VARCHAR(255);")
}

