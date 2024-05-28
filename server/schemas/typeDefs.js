const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    diets: [Diet]!
    workouts: [Workout]!
  }

  type Diet {
    _id: ID
    food: String
    calories: Int
    carbs:Int
    createdAt: String
  
  }
  type Workout {
    _id: ID
    bodyPart: String
    exercise: String
    workoutType:String
    sets:Int
    reps:String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    diets(username: String): [Diet]
    workouts(username:String):[Workout]
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addDiet(food:String!, calories:Int!, carbs: Int!): Diet
    updateDiet(_id:ID!, food: String, calories: Int, carbs: Int):Diet
    addWorkout(bodyPart:String!, exercise:String!, workoutType:String!, sets:Int, reps:String): Workout
  
  }
`;

module.exports = typeDefs;
