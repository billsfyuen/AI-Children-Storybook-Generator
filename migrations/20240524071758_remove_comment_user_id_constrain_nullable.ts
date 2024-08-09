import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw("ALTER TABLE comments ALTER COLUMN user_id DROP NOT NULL;")
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw("ALTER TABLE comments ADD CONSTRAINT user_id_not_null CHECK (user_id IS NOT NULL);")
}

