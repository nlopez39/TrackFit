const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    diets: [Diet]!
    workouts: [Workout]!
    goals:[Goal]!
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
    dayofWeek: String
    bodyPart: String
    exercise: String
   caloriesBurned:Int
   completed: Boolean!
  }
  type Goal {
    _id:ID
    goal: String
    date: String
    completed: Boolean!
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
    goals(username:String):[Goal]
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addGoal(goal:String!, date: String!): Goal
    login(email: String!, password: String!): Auth
    addDiet(food:String!, calories:Int!, carbs: Int!): Diet
    updateGoal(_id:ID!, goal:String!, date:String!):Goal
    updateDiet(_id:ID!, food: String, calories: Int, carbs: Int):Diet
    addWorkout(dayofWeek:String!,bodyPart:String!, exercise:String!, caloriesBurned:Int!): Workout
    completeWorkout(_id:ID!):Workout
    completeGoal(_id:ID!): Goal
    removeDiet(_id:ID!):Diet
    removeGoal(_id:ID!):Goal
    removeWorkout(_id:ID!):Workout
  
  }
`;

module.exports = typeDefs;
