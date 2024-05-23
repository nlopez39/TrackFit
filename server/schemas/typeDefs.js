const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    diets: [Diet]!
  }

  type Diet {
    _id: ID
    food: String
    calories: Int
    carbs:Int
    createdAt: String
  
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    diets(username: String): Diet
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addDiet(food:String!, calories:Int!, carbs: Int!): Diet
    addThought(thoughtText: String!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
  }
`;

module.exports = typeDefs;
