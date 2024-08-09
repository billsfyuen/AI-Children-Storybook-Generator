import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw("CREATE TYPE status AS ENUM('pending','completed')")
    await knex.raw("ALTER TABLE payment ADD status status;")
    await knex.raw("ALTER TABLE payment ALTER COLUMN payment_id DROP NOT NULL;")
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw("ALTER TABLE payment ADD CONSTRAINT payment_id_not_null CHECK (payment_id IS NOT NULL);")
    await knex.raw("ALTER TABLE payment DROP COLUMN status;")
    await knex.raw("DROP TYPE status")
}

