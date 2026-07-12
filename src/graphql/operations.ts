import { graphql } from '../gql';

export const REGISTER_MUTATION = graphql(`
  mutation Register(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $userType: String!
    $phone: String!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      userType: $userType
      phone: $phone
    ) {
      token
      user {
        id
        firstName
        lastName
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
        firstName
        lastName
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
      firstName
      lastName
      email
      userType
      phone
      savedProperties {
        id
      }
      createdAt
    }
  }
`);

export const LOGOUT_MUTATION = graphql(`
  mutation Logout {
    logout
  }
`);

export const MY_PROPERTIES_QUERY = graphql(`
  query MyProperties {
    myProperties {
      id
      title
      type
      location
      region
      district
      price
      verified
      bedrooms
      bathrooms
      size
      parking
      about
      amenities
      lat
      lng
      image
      images {
        main
        kitchen
        bedroom
        bathroom
      }
      agreementUrl
      createdAt
    }
  }
`);

export const CREATE_PROPERTY_MUTATION = graphql(`
  mutation CreateProperty($input: CreatePropertyInput!) {
    createProperty(input: $input) {
      id
      title
      type
      location
      region
      district
      price
      verified
      bedrooms
      bathrooms
      size
      parking
      about
      amenities
      lat
      lng
      image
      images {
        main
        kitchen
        bedroom
        bathroom
      }
      agreementUrl
      createdAt
    }
  }
`);

export const PROPERTY_QUERY = graphql(`
  query Property($id: ID!) {
    property(id: $id) {
      id
      title
      type
      location
      region
      district
      price
      verified
      bedrooms
      bathrooms
      size
      parking
      about
      amenities
      mapDescription
      lat
      lng
      image
      images {
        main
        kitchen
        bedroom
        bathroom
      }
      agreementUrl
      landlord {
        id
        firstName
        lastName
        email
        phone
      }
      createdAt
    }
  }
`);

export const TOGGLE_SAVE_PROPERTY_MUTATION = graphql(`
  mutation ToggleSaveProperty($propertyId: ID!) {
    toggleSaveProperty(propertyId: $propertyId) {
      id
      savedProperties {
        id
      }
    }
  }
`);

export const CREATE_APPLICATION_MUTATION = graphql(`
  mutation CreateApplication($input: CreateApplicationInput!) {
    createApplication(input: $input) {
      id
      status
      createdAt
    }
  }
`);

export const MY_APPLICATIONS_QUERY = graphql(`
  query MyApplications {
    myApplications {
      id
      property {
        id
      }
      status
      createdAt
    }
  }
`);
