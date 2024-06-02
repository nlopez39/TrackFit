import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const UPDATE_DIET = gql`
  mutation updateDiet($id: ID!, $food: String, $calories: Int, $carbs: Int) {
    updateDiet(_id: $id, food: $food, calories: $calories, carbs: $carbs) {
      _id
      food
      calories
      carbs
      createdAt
    }
  }
`;

export const ADD_DIET = gql`
  mutation addDiet($food: String!, $calories: Int!, $carbs: Int!) {
    addDiet(food: $food, calories: $calories, carbs: $carbs) {
      _id
      food
      calories
      carbs
      createdAt
    }
  }
`;

export const ADD_GOAL = gql`
  mutation addGoal($goal: String!, $date: String!) {
    addGoal(goal: $goal, date: $date) {
      _id
      goal
      date
    }
  }
`;
export const UPDATE_GOAL = gql`
  mutation updateGoal($id: ID!, $goal: String!, $date: String!) {
    updateGoal(_id: $id, goal: $goal, date: $date) {
      _id
      goal
      date
    }
  }
`;
export const REMOVE_GOAL = gql`
  mutation removeGoal($_id: ID!) {
    removeGoal(_id: $_id) {
      _id
      goal
      date
    }
  }
`;

export const ADD_WORKOUT = gql`
  mutation addWorkout(
    $dayofWeek: String!
    $bodyPart: String!
    $exercise: String!
    $caloriesBurned: Int!
  ) {
    addWorkout(
      dayofWeek: $dayofWeek
      bodyPart: $bodyPart
      exercise: $exercise
      caloriesBurned: $caloriesBurned
    ) {
      _id
      dayofWeek
      bodyPart
      exercise
      caloriesBurned
    }
  }
`;
export const REMOVE_DIET = gql`
  mutation removeDiet($_id: ID!) {
    removeDiet(_id: $_id) {
      _id
      food
      calories
      carbs
    }
  }
`;
export const REMOVE_WORKOUT = gql`
  mutation removeWorkout($_id: ID!) {
    removeWorkout(_id: $_id) {
      _id
      dayofWeek
      bodyPart
      exercise
      caloriesBurned
    }
  }
`;
export const COMPLETE_WORKOUT = gql`
  mutation completeWorkout($_id: ID!) {
    completeWorkout(_id: $_id) {
      _id
      dayofWeek
      bodyPart
      exercise
      completed
    }
  }
`;
export const COMPLETE_GOAL = gql`
  mutation completeGoal($_id: ID!) {
    completeGoal(_id: $_id) {
      _id
      goal
      date
      completed
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;
