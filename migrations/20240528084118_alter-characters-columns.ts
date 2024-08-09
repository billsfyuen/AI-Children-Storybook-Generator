import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('characters', table => {
        table.boolean('is_hidden').defaultTo(false);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('characters', table => {
        table.dropColumn('is_hidden');
    });
}