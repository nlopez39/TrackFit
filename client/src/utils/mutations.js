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
export const ADD_WORKOUT = gql`
  mutation addWorkout(
    $bodyPart: String!
    $exercise: String!
    $workoutType: String!
    $sets: Int
    $reps: Int
  ) {
    addWorkout(
      bodyPart: $bodyPart
      exercise: $exercise
      workoutType: $workoutType
      sets: $sets
      reps: $reps
    ) {
      _id
      bodyPart
      exercise
      workoutType
      sets
      reps
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
