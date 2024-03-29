import knex from "../db";
const userTable = "users";

const resolvers = {
    getUser: async ({ id }: { id: number }) => {
        const user = await knex(userTable).where('id', id).first();
        return user;
    },
    getUsers: async ({ limit, offset }: { limit: number; offset: number }) => {
        const users = await knex(userTable).select().limit(limit).offset(offset);
        return users;
    },
    createUser: async ({ input }: { input: { firstName: string; lastName: string; gender: string } }) => {
        const [userId] = await knex(userTable).insert(input);
        const user = await knex(userTable).where('id', userId).first();
        return user;
    },
    updateUser: async ({ id, input }: { id: number; input: { firstName: string; lastName: string; gender: string } }) => {
        await knex(userTable).where('id', id).update(input);
        const user = await knex(userTable).where('id', id).first();
        return user;
    },
}

export default resolvers;
