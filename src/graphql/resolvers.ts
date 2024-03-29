import knex from "../db";
const userTable = "users";

const resolvers = {
    getUser: async ({ id }: { id: number }) => {
        const user = await knex(userTable).where('id', id).first();
        return user;
    },
    getUsers: async () => {
        const users = await knex(userTable).select();
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
