import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("users", (table) => {
        table.increments();
        table.string("username").notNullable().unique();
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
        table.timestamps(false, true);
    });

    await knex.schema.createTable("characters", (table) => {
        table.increments();
        table.bigint("user_id").notNullable();
        table.foreign("user_id").references("users.id");
        table.string("character_name").notNullable();
        table.string("image_name").notNullable().unique();
        table.timestamps(false, true);
    });

    await knex.schema.createTable("storybooks", (table) => {
        table.increments();
        table.bigint("user_id").notNullable()
        table.foreign("user_id").references("users.id");
        table.bigint("character_id").notNullable()
        table.foreign("character_id").references("characters.id");
        table.string("bookname").notNullable();
        table.string("description").notNullable();
        table.boolean("is_public").notNullable()
        table.bigint("target_age").notNullable()
        table.timestamps(false, true);
    });

    await knex.schema.createTable("comments", (table) => {
        table.increments();
        table.string("content").notNullable();
        table.bigint("user_id").notNullable();
        table.foreign("user_id").references("users.id");
        table.bigint("storybook_id").notNullable()
        table.foreign("storybook_id").references("storybooks.id");
        table.timestamps(false, true);
    });

    await knex.schema.createTable("like_relation", (table) => {
        table.increments();
        table.bigint("user_id").notNullable();
        table.foreign("user_id").references("users.id");
        table.bigint("storybook_id").notNullable()
        table.foreign("storybook_id").references("storybooks.id");
    });

    await knex.schema.createTable("payment", (table) => {
        table.increments();
        table.string("payment_id").notNullable().unique();
        table.bigint("user_id").notNullable();
        table.foreign("user_id").references("users.id");
    });

    await knex.schema.createTable("storybook_pages", (table) => {
        table.increments();
        table.bigint("storybook_id").notNullable()
        table.foreign("storybook_id").references("storybooks.id");
        table.bigint("page_number").notNullable()
        table.string("caption").notNullable();
        table.string("image").notNullable().unique();
        table.timestamps(false, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("storybook_pages");
    await knex.schema.dropTable("payment");
    await knex.schema.dropTable("like_relation");
    await knex.schema.dropTable("comments");
    await knex.schema.dropTable("storybooks");
    await knex.schema.dropTable("characters");
    await knex.schema.dropTable("users");
}

