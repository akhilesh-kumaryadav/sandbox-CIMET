import { buildSchema } from 'graphql';

// Defining the schema and exporting it
const schema = buildSchema(`
    type User {
        id : Int!
        firstName : String!
        lastName : String!
        gender : String!
    }

    input UserInput {
        firstName : String!
        lastName : String!
        gender : String!
    }

    type Query {
        getUser(id: Int!): User
        getUsers(limit: Int!, offset: Int!): [User]
    }

    type Mutation {
        createUser(input: UserInput): User
        updateUser(id: Int!, input: UserInput): User
    }
`);

export default schema;