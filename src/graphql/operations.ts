import { graphql } from '../gql';

export const REGISTER_MUTATION = graphql(`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      token
      user {
        id
        name
        email
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
      createdAt
    }
  }
`);
