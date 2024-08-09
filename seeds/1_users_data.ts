import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        //hash password for '123'
        { username: "admin" ,email: "admin@storybook.com", password:"$2a$10$7DU9J1GI2ZDgr/Aa7ZOi0.cdJwGYDNTg1OOeQBiesld9quR/Kjs3q"},
        { username: "amy1234" ,email: "amy1234@gmail.com", password:"$2a$10$7DU9J1GI2ZDgr/Aa7ZOi0.cdJwGYDNTg1OOeQBiesld9quR/Kjs3q"},
        { username: "peter5678" ,email: "peter5678@gmail.com", password:"$2a$10$7DU9J1GI2ZDgr/Aa7ZOi0.cdJwGYDNTg1OOeQBiesld9quR/Kjs3q" },
        { username: "bob1314" ,email: "bob1314@gmail.com", password:"$2a$10$7DU9J1GI2ZDgr/Aa7ZOi0.cdJwGYDNTg1OOeQBiesld9quR/Kjs3q" }
    ]);
};
