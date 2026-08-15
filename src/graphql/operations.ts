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
      avatarUrl
      bio
      savedProperties {
        id
      }
      preferences {
        regions
        districts
        types
        minPrice
        maxPrice
        bedrooms
        amenities
        parking
        onboardingStatus
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

export const PROPERTIES_QUERY = graphql(`
  query Properties($region: String, $type: String, $minPrice: Float, $maxPrice: Float) {
    properties(region: $region, type: $type, minPrice: $minPrice, maxPrice: $maxPrice) {
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
      image
      about
      createdAt
    }
  }
`);

export const RECOMMENDED_PROPERTIES_QUERY = graphql(`
  query RecommendedProperties(
    $limit: Int
    $region: String
    $type: String
    $minPrice: Float
    $maxPrice: Float
  ) {
    recommendedProperties(
      limit: $limit
      region: $region
      type: $type
      minPrice: $minPrice
      maxPrice: $maxPrice
    ) {
      score
      stars
      reasons
      property {
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
        image
        about
        createdAt
      }
    }
  }
`);

export const TRACK_PROPERTY_VIEW_MUTATION = graphql(`
  mutation TrackPropertyView($propertyId: ID!, $durationSec: Float) {
    trackPropertyView(propertyId: $propertyId, durationSec: $durationSec)
  }
`);

export const MY_RECENT_ACTIVITY_QUERY = graphql(`
  query MyRecentActivity($limit: Int) {
    myRecentActivity(limit: $limit) {
      id
      type
      title
      subtitle
      status
      link
      createdAt
      property {
        id
        title
        location
        image
        price
      }
    }
  }
`);

export const SAVE_PREFERENCES_MUTATION = graphql(`
  mutation SavePreferences($input: PreferencesInput!) {
    savePreferences(input: $input) {
      id
      preferences {
        regions
        districts
        types
        minPrice
        maxPrice
        bedrooms
        amenities
        parking
        onboardingStatus
      }
    }
  }
`);

export const SKIP_PREFERENCES_MUTATION = graphql(`
  mutation SkipPreferences($input: PreferencesInput) {
    skipPreferences(input: $input) {
      id
      preferences {
        regions
        districts
        types
        minPrice
        maxPrice
        bedrooms
        amenities
        parking
        onboardingStatus
      }
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
      videoUrl
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
      videoUrl
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
        title
        image
        location
        price
        bedrooms
        bathrooms
      }
      nationalIdUrl
      supportingDocsUrl
      employerName
      jobTitle
      monthlyIncome
      lengthOfEmployment
      personalStatement
      status
      furtherDetailsRequest
      furtherDetailsResponse
      agreementUrl
      signedAgreementUrl
      createdAt
    }
  }
`);

export const RECEIVED_APPLICATIONS_QUERY = graphql(`
  query ReceivedApplications {
    receivedApplications {
      id
      property {
        id
        title
        image
        location
        price
      }
      tenant {
        id
        firstName
        lastName
        email
        phone
      }
      nationalIdUrl
      supportingDocsUrl
      employerName
      jobTitle
      monthlyIncome
      lengthOfEmployment
      personalStatement
      status
      furtherDetailsRequest
      furtherDetailsResponse
      agreementUrl
      signedAgreementUrl
      createdAt
    }
  }
`);

export const UPDATE_APPLICATION_STATUS_MUTATION = graphql(`
  mutation UpdateApplicationStatus($id: ID!, $status: String!) {
    updateApplicationStatus(id: $id, status: $status) {
      id
      status
    }
  }
`);

export const CANCEL_APPLICATION_MUTATION = graphql(`
  mutation CancelApplication($id: ID!) {
    cancelApplication(id: $id) {
      id
      status
    }
  }
`);

export const REQUEST_FURTHER_DETAILS_MUTATION = graphql(`
  mutation RequestFurtherDetails($id: ID!, $message: String!) {
    requestFurtherDetails(id: $id, message: $message) {
      id
      status
      furtherDetailsRequest
    }
  }
`);

export const SUBMIT_FURTHER_DETAILS_MUTATION = graphql(`
  mutation SubmitFurtherDetails($id: ID!, $response: String!) {
    submitFurtherDetails(id: $id, response: $response) {
      id
      status
      furtherDetailsResponse
    }
  }
`);

export const MY_NOTIFICATIONS_QUERY = graphql(`
  query MyNotifications {
    myNotifications {
      id
      title
      message
      read
      link
      createdAt
    }
  }
`);

export const MARK_NOTIFICATION_READ_MUTATION = graphql(`
  mutation MarkNotificationAsRead($id: ID!) {
    markNotificationAsRead(id: $id) {
      id
      read
    }
  }
`);

export const APPROVE_APPLICATION_WITH_AGREEMENT_MUTATION = graphql(`
  mutation ApproveApplicationWithAgreement($id: ID!, $agreementUrl: String!) {
    approveApplicationWithAgreement(id: $id, agreementUrl: $agreementUrl) {
      id
      status
      agreementUrl
    }
  }
`);

export const SUBMIT_SIGNED_AGREEMENT_MUTATION = graphql(`
  mutation SubmitSignedAgreement($id: ID!, $signedAgreementUrl: String!) {
    submitSignedAgreement(id: $id, signedAgreementUrl: $signedAgreementUrl) {
      id
      status
      signedAgreementUrl
    }
  }
`);

export const MY_TENANCIES_QUERY = graphql(`
  query MyTenancies {
    myTenancies {
      id
      property {
        id
        title
        image
        location
        price
        bedrooms
        bathrooms
        size
        landlord {
          id
          firstName
          lastName
          email
          phone
        }
      }
      tenant {
        id
        firstName
        lastName
        email
        phone
      }
      status
      agreementUrl
      signedAgreementUrl
      updatedAt
      createdAt
    }
  }
`);

export const TENANCY_QUERY = graphql(`
  query Tenancy($id: ID!) {
    tenancy(id: $id) {
      id
      property {
        id
        title
        image
        location
        price
        bedrooms
        bathrooms
        size
        landlord {
          id
          firstName
          lastName
          email
          phone
        }
      }
      tenant {
        id
        firstName
        lastName
        email
        phone
      }
      status
      agreementUrl
      signedAgreementUrl
      updatedAt
      createdAt
    }
  }
`);

export const MY_DISPUTES_QUERY = graphql(`
  query MyDisputes {
    myDisputes {
      id
      tenancy {
        id
        property {
          id
          title
          image
          location
          price
        }
      }
      creator {
        id
        firstName
        lastName
      }
      title
      description
      evidenceUrl
      status
      createdAt
    }
  }
`);

export const DISPUTE_QUERY = graphql(`
  query Dispute($id: ID!) {
    dispute(id: $id) {
      id
      tenancy {
        id
        property {
          id
          title
          image
          location
          price
        }
      }
      creator {
        id
        firstName
        lastName
      }
      title
      description
      evidenceUrl
      status
      comments {
        id
        sender {
          id
          firstName
          lastName
        }
        text
        createdAt
      }
      viewedByLandlordAt
      viewedByTenantAt
      createdAt
      updatedAt
    }
  }
`);

export const CREATE_DISPUTE_MUTATION = graphql(`
  mutation CreateDispute(
    $tenancyId: ID!
    $title: String!
    $description: String!
    $evidenceUrl: String
  ) {
    createDispute(
      tenancyId: $tenancyId
      title: $title
      description: $description
      evidenceUrl: $evidenceUrl
    ) {
      id
      status
    }
  }
`);

export const ADD_DISPUTE_COMMENT_MUTATION = graphql(`
  mutation AddDisputeComment($id: ID!, $text: String!) {
    addDisputeComment(id: $id, text: $text) {
      id
      comments {
        id
        sender {
          id
          firstName
          lastName
        }
        text
        createdAt
      }
    }
  }
`);

export const RESOLVE_DISPUTE_MUTATION = graphql(`
  mutation ResolveDispute($id: ID!) {
    resolveDispute(id: $id) {
      id
      status
    }
  }
`);

export const UPDATE_PROFILE_MUTATION = graphql(`
  mutation UpdateProfile(
    $firstName: String
    $lastName: String
    $phone: String
    $bio: String
    $avatarUrl: String
  ) {
    updateProfile(
      firstName: $firstName
      lastName: $lastName
      phone: $phone
      bio: $bio
      avatarUrl: $avatarUrl
    ) {
      id
      firstName
      lastName
      email
      userType
      phone
      avatarUrl
      bio
      createdAt
      updatedAt
    }
  }
`);

export const CHANGE_PASSWORD_MUTATION = graphql(`
  mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
    changePassword(currentPassword: $currentPassword, newPassword: $newPassword)
  }
`);
