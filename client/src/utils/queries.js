import { gql } from "@apollo/client";

export const QUERY_DIET = gql`
  query getDiets {
    diets {
      _id
      food
      calories
      carbs
      createdAt
    }
  }
`;
export const QUERY_WORKOUT = gql`
  query getWorkouts {
    workouts {
      _id
      dayofWeek
      bodyPart
      exercise
      caloriesBurned
      completed
    }
  }
`;
export const QUERY_GOAL = gql`
  query getGoals {
    goals {
      _id
      goal
      date
      completed
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      diets {
        _id
        food
        calories
        carbs
      }
      workouts {
        _id
        dayofWeek
        bodyPart
        exercise
        caloriesBurned
        completed
      }
      goals {
        _id
        goal
        date
        completed
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      diets {
        _id
        food
        calories
        carbs
      }
      workouts {
        _id
        dayofWeek
        bodyPart
        exercise
        caloriesBurned
        completed
      }
      goals {
        _id
        goal
        date
        completed
      }
    }
  }
`;
