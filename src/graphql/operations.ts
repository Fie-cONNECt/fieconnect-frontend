import { graphql } from '../gql';

export const REGISTER_MUTATION = graphql(`
  mutation Register(
    $name: String!
    $email: String!
    $password: String!
    $userType: String!
    $phone: String!
  ) {
    register(name: $name, email: $email, password: $password, userType: $userType, phone: $phone) {
      token
      user {
        id
        name
        email
        userType
        phone
        createdAt
      }
    }
  }
`);

export const LOGIN_MUTATION = graphql(`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        userType
        phone
        createdAt
      }
    }
  }
`);

export const ME_QUERY = graphql(`
  query Me {
    me {
      id
      name
      email
      userType
      phone
      createdAt
    }
  }
`);
