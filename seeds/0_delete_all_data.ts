import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("storybook_pages").del();
    await knex("comments").del();
    await knex("storybooks").del();
    await knex("characters").del();
    await knex("users").del();
};
