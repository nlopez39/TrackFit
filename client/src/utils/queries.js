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
    }
  }
`;
