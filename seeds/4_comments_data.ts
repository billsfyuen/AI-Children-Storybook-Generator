import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("comments").del();

    // Inserts seed entries
    await knex("comments").insert([
        {   
            content: "Good Book", 
            user_id: "1", 
            storybook_id: "1"
        },
        {   
            content: "Lovely", 
            user_id: "3", 
            storybook_id: "1"
        },
        {   
            content: "My kid always read this book", 
            user_id: "2", 
            storybook_id: "2"
        }
    ]);
};
