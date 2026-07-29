/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Application = {
  __typename?: 'Application';
  agreementUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  employerName: Scalars['String']['output'];
  furtherDetailsRequest?: Maybe<Scalars['String']['output']>;
  furtherDetailsResponse?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  jobTitle: Scalars['String']['output'];
  lengthOfEmployment: Scalars['String']['output'];
  monthlyIncome: Scalars['String']['output'];
  nationalIdUrl: Scalars['String']['output'];
  personalStatement: Scalars['String']['output'];
  property: Property;
  signedAgreementUrl?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  supportingDocsUrl?: Maybe<Scalars['String']['output']>;
  tenant: User;
  updatedAt: Scalars['String']['output'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: User;
};

export type Comment = {
  __typename?: 'Comment';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  sender: User;
  text: Scalars['String']['output'];
};

export type CreateApplicationInput = {
  employerName: Scalars['String']['input'];
  jobTitle: Scalars['String']['input'];
  lengthOfEmployment: Scalars['String']['input'];
  monthlyIncome: Scalars['String']['input'];
  nationalIdUrl: Scalars['String']['input'];
  personalStatement: Scalars['String']['input'];
  propertyId: Scalars['ID']['input'];
  supportingDocsUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePropertyInput = {
  about: Scalars['String']['input'];
  agreementUrl?: InputMaybe<Scalars['String']['input']>;
  amenities: Array<Scalars['String']['input']>;
  bathroomImage: Scalars['String']['input'];
  bathrooms: Scalars['String']['input'];
  bedroomImage: Scalars['String']['input'];
  bedrooms: Scalars['String']['input'];
  district: Scalars['String']['input'];
  image: Scalars['String']['input'];
  kitchenImage: Scalars['String']['input'];
  location: Scalars['String']['input'];
  parking: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  region: Scalars['String']['input'];
  size: Scalars['String']['input'];
  title: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type Dispute = {
  __typename?: 'Dispute';
  comments: Array<Comment>;
  createdAt: Scalars['String']['output'];
  creator: User;
  description: Scalars['String']['output'];
  evidenceUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  status: Scalars['String']['output'];
  tenancy: Application;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  viewedByLandlordAt?: Maybe<Scalars['String']['output']>;
  viewedByTenantAt?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addDisputeComment: Dispute;
  approveApplicationWithAgreement: Application;
  changePassword: Scalars['Boolean']['output'];
  createApplication: Application;
  createDispute: Dispute;
  createProperty: Property;
  login: AuthPayload;
  logout: Scalars['Boolean']['output'];
  markNotificationAsRead: Notification;
  register: AuthPayload;
  requestFurtherDetails: Application;
  resolveDispute: Dispute;
  savePreferences: User;
  skipPreferences: User;
  submitFurtherDetails: Application;
  submitSignedAgreement: Application;
  toggleSaveProperty: User;
  trackPropertyView: Scalars['Boolean']['output'];
  updateApplicationStatus: Application;
  updateProfile: User;
};

export type MutationAddDisputeCommentArgs = {
  id: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};

export type MutationApproveApplicationWithAgreementArgs = {
  agreementUrl: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};

export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};

export type MutationCreateApplicationArgs = {
  input: CreateApplicationInput;
};

export type MutationCreateDisputeArgs = {
  description: Scalars['String']['input'];
  evidenceUrl?: InputMaybe<Scalars['String']['input']>;
  tenancyId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type MutationCreatePropertyArgs = {
  input: CreatePropertyInput;
};

export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationMarkNotificationAsReadArgs = {
  id: Scalars['ID']['input'];
};

export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  userType: Scalars['String']['input'];
};

export type MutationRequestFurtherDetailsArgs = {
  id: Scalars['ID']['input'];
  message: Scalars['String']['input'];
};

export type MutationResolveDisputeArgs = {
  id: Scalars['ID']['input'];
};

export type MutationSavePreferencesArgs = {
  input: PreferencesInput;
};

export type MutationSkipPreferencesArgs = {
  input?: InputMaybe<PreferencesInput>;
};

export type MutationSubmitFurtherDetailsArgs = {
  id: Scalars['ID']['input'];
  response: Scalars['String']['input'];
};

export type MutationSubmitSignedAgreementArgs = {
  id: Scalars['ID']['input'];
  signedAgreementUrl: Scalars['String']['input'];
};

export type MutationToggleSavePropertyArgs = {
  propertyId: Scalars['ID']['input'];
};

export type MutationTrackPropertyViewArgs = {
  durationSec?: InputMaybe<Scalars['Float']['input']>;
  propertyId: Scalars['ID']['input'];
};

export type MutationUpdateApplicationStatusArgs = {
  id: Scalars['ID']['input'];
  status: Scalars['String']['input'];
};

export type MutationUpdateProfileArgs = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  link?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  read: Scalars['Boolean']['output'];
  recipient: User;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type PreferencesInput = {
  amenities?: InputMaybe<Array<Scalars['String']['input']>>;
  bedrooms?: InputMaybe<Array<Scalars['String']['input']>>;
  districts?: InputMaybe<Array<Scalars['String']['input']>>;
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  parking?: InputMaybe<Scalars['String']['input']>;
  regions?: InputMaybe<Array<Scalars['String']['input']>>;
  types?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Property = {
  __typename?: 'Property';
  about: Scalars['String']['output'];
  agreementUrl?: Maybe<Scalars['String']['output']>;
  amenities: Array<Scalars['String']['output']>;
  bathrooms: Scalars['String']['output'];
  bedrooms: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  district: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  images: PropertyImages;
  landlord: User;
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
  location: Scalars['String']['output'];
  mapDescription?: Maybe<Scalars['String']['output']>;
  parking: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  region: Scalars['String']['output'];
  size: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  verified: Scalars['Boolean']['output'];
};

export type PropertyImages = {
  __typename?: 'PropertyImages';
  bathroom: Scalars['String']['output'];
  bedroom: Scalars['String']['output'];
  kitchen: Scalars['String']['output'];
  main: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  dispute?: Maybe<Dispute>;
  me?: Maybe<User>;
  myApplications: Array<Application>;
  myDisputes: Array<Dispute>;
  myNotifications: Array<Notification>;
  myProperties: Array<Property>;
  myTenancies: Array<Application>;
  properties: Array<Property>;
  property?: Maybe<Property>;
  receivedApplications: Array<Application>;
  recommendedProperties: Array<RecommendedProperty>;
  tenancy?: Maybe<Application>;
};

export type QueryDisputeArgs = {
  id: Scalars['ID']['input'];
};

export type QueryPropertiesArgs = {
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  region?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type QueryPropertyArgs = {
  id: Scalars['ID']['input'];
};

export type QueryRecommendedPropertiesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  region?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type QueryTenancyArgs = {
  id: Scalars['ID']['input'];
};

export type RecommendedProperty = {
  __typename?: 'RecommendedProperty';
  property: Property;
  reasons: Array<Scalars['String']['output']>;
  score: Scalars['Float']['output'];
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  preferences: UserPreferences;
  savedProperties: Array<Property>;
  updatedAt: Scalars['String']['output'];
  userType: Scalars['String']['output'];
};

export type UserPreferences = {
  __typename?: 'UserPreferences';
  amenities: Array<Scalars['String']['output']>;
  bedrooms: Array<Scalars['String']['output']>;
  districts: Array<Scalars['String']['output']>;
  maxPrice?: Maybe<Scalars['Float']['output']>;
  minPrice?: Maybe<Scalars['Float']['output']>;
  onboardingStatus: Scalars['String']['output'];
  parking?: Maybe<Scalars['String']['output']>;
  regions: Array<Scalars['String']['output']>;
  types: Array<Scalars['String']['output']>;
};

export type RegisterMutationVariables = Exact<{
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  userType: Scalars['String']['input'];
  phone: Scalars['String']['input'];
}>;

export type RegisterMutation = {
  __typename?: 'Mutation';
  register: {
    __typename?: 'AuthPayload';
    token: string;
    user: {
      __typename?: 'User';
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      userType: string;
      phone: string;
      createdAt: string;
    };
  };
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'AuthPayload';
    token: string;
    user: {
      __typename?: 'User';
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      userType: string;
      phone: string;
      createdAt: string;
    };
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    userType: string;
    phone: string;
    avatarUrl?: string | null;
    bio?: string | null;
    createdAt: string;
    savedProperties: Array<{ __typename?: 'Property'; id: string }>;
    preferences: {
      __typename?: 'UserPreferences';
      regions: Array<string>;
      districts: Array<string>;
      types: Array<string>;
      minPrice?: number | null;
      maxPrice?: number | null;
      bedrooms: Array<string>;
      amenities: Array<string>;
      parking?: string | null;
      onboardingStatus: string;
    };
  } | null;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation'; logout: boolean };

export type MyPropertiesQueryVariables = Exact<{ [key: string]: never }>;

export type MyPropertiesQuery = {
  __typename?: 'Query';
  myProperties: Array<{
    __typename?: 'Property';
    id: string;
    title: string;
    type: string;
    location: string;
    region: string;
    district: string;
    price: number;
    verified: boolean;
    bedrooms: string;
    bathrooms: string;
    size: string;
    parking: string;
    about: string;
    amenities: Array<string>;
    lat?: number | null;
    lng?: number | null;
    image: string;
    agreementUrl?: string | null;
    createdAt: string;
    images: {
      __typename?: 'PropertyImages';
      main: string;
      kitchen: string;
      bedroom: string;
      bathroom: string;
    };
  }>;
};

export type PropertiesQueryVariables = Exact<{
  region?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
}>;

export type PropertiesQuery = {
  __typename?: 'Query';
  properties: Array<{
    __typename?: 'Property';
    id: string;
    title: string;
    type: string;
    location: string;
    region: string;
    district: string;
    price: number;
    verified: boolean;
    bedrooms: string;
    bathrooms: string;
    size: string;
    image: string;
    about: string;
    createdAt: string;
  }>;
};

export type RecommendedPropertiesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  region?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
}>;

export type RecommendedPropertiesQuery = {
  __typename?: 'Query';
  recommendedProperties: Array<{
    __typename?: 'RecommendedProperty';
    score: number;
    reasons: Array<string>;
    property: {
      __typename?: 'Property';
      id: string;
      title: string;
      type: string;
      location: string;
      region: string;
      district: string;
      price: number;
      verified: boolean;
      bedrooms: string;
      bathrooms: string;
      size: string;
      image: string;
      about: string;
      createdAt: string;
    };
  }>;
};

export type TrackPropertyViewMutationVariables = Exact<{
  propertyId: Scalars['ID']['input'];
  durationSec?: InputMaybe<Scalars['Float']['input']>;
}>;

export type TrackPropertyViewMutation = { __typename?: 'Mutation'; trackPropertyView: boolean };

export type SavePreferencesMutationVariables = Exact<{
  input: PreferencesInput;
}>;

export type SavePreferencesMutation = {
  __typename?: 'Mutation';
  savePreferences: {
    __typename?: 'User';
    id: string;
    preferences: {
      __typename?: 'UserPreferences';
      regions: Array<string>;
      districts: Array<string>;
      types: Array<string>;
      minPrice?: number | null;
      maxPrice?: number | null;
      bedrooms: Array<string>;
      amenities: Array<string>;
      parking?: string | null;
      onboardingStatus: string;
    };
  };
};

export type SkipPreferencesMutationVariables = Exact<{
  input?: InputMaybe<PreferencesInput>;
}>;

export type SkipPreferencesMutation = {
  __typename?: 'Mutation';
  skipPreferences: {
    __typename?: 'User';
    id: string;
    preferences: {
      __typename?: 'UserPreferences';
      regions: Array<string>;
      districts: Array<string>;
      types: Array<string>;
      minPrice?: number | null;
      maxPrice?: number | null;
      bedrooms: Array<string>;
      amenities: Array<string>;
      parking?: string | null;
      onboardingStatus: string;
    };
  };
};

export type CreatePropertyMutationVariables = Exact<{
  input: CreatePropertyInput;
}>;

export type CreatePropertyMutation = {
  __typename?: 'Mutation';
  createProperty: {
    __typename?: 'Property';
    id: string;
    title: string;
    type: string;
    location: string;
    region: string;
    district: string;
    price: number;
    verified: boolean;
    bedrooms: string;
    bathrooms: string;
    size: string;
    parking: string;
    about: string;
    amenities: Array<string>;
    lat?: number | null;
    lng?: number | null;
    image: string;
    agreementUrl?: string | null;
    createdAt: string;
    images: {
      __typename?: 'PropertyImages';
      main: string;
      kitchen: string;
      bedroom: string;
      bathroom: string;
    };
  };
};

export type PropertyQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type PropertyQuery = {
  __typename?: 'Query';
  property?: {
    __typename?: 'Property';
    id: string;
    title: string;
    type: string;
    location: string;
    region: string;
    district: string;
    price: number;
    verified: boolean;
    bedrooms: string;
    bathrooms: string;
    size: string;
    parking: string;
    about: string;
    amenities: Array<string>;
    mapDescription?: string | null;
    lat?: number | null;
    lng?: number | null;
    image: string;
    agreementUrl?: string | null;
    createdAt: string;
    images: {
      __typename?: 'PropertyImages';
      main: string;
      kitchen: string;
      bedroom: string;
      bathroom: string;
    };
    landlord: {
      __typename?: 'User';
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
  } | null;
};

export type ToggleSavePropertyMutationVariables = Exact<{
  propertyId: Scalars['ID']['input'];
}>;

export type ToggleSavePropertyMutation = {
  __typename?: 'Mutation';
  toggleSaveProperty: {
    __typename?: 'User';
    id: string;
    savedProperties: Array<{ __typename?: 'Property'; id: string }>;
  };
};

export type CreateApplicationMutationVariables = Exact<{
  input: CreateApplicationInput;
}>;

export type CreateApplicationMutation = {
  __typename?: 'Mutation';
  createApplication: { __typename?: 'Application'; id: string; status: string; createdAt: string };
};

export type MyApplicationsQueryVariables = Exact<{ [key: string]: never }>;

export type MyApplicationsQuery = {
  __typename?: 'Query';
  myApplications: Array<{
    __typename?: 'Application';
    id: string;
    nationalIdUrl: string;
    supportingDocsUrl?: string | null;
    employerName: string;
    jobTitle: string;
    monthlyIncome: string;
    lengthOfEmployment: string;
    personalStatement: string;
    status: string;
    furtherDetailsRequest?: string | null;
    furtherDetailsResponse?: string | null;
    agreementUrl?: string | null;
    signedAgreementUrl?: string | null;
    createdAt: string;
    property: {
      __typename?: 'Property';
      id: string;
      title: string;
      image: string;
      location: string;
      price: number;
      bedrooms: string;
      bathrooms: string;
    };
  }>;
};

export type ReceivedApplicationsQueryVariables = Exact<{ [key: string]: never }>;

export type ReceivedApplicationsQuery = {
  __typename?: 'Query';
  receivedApplications: Array<{
    __typename?: 'Application';
    id: string;
    nationalIdUrl: string;
    supportingDocsUrl?: string | null;
    employerName: string;
    jobTitle: string;
    monthlyIncome: string;
    lengthOfEmployment: string;
    personalStatement: string;
    status: string;
    furtherDetailsRequest?: string | null;
    furtherDetailsResponse?: string | null;
    agreementUrl?: string | null;
    signedAgreementUrl?: string | null;
    createdAt: string;
    property: {
      __typename?: 'Property';
      id: string;
      title: string;
      image: string;
      location: string;
      price: number;
    };
    tenant: {
      __typename?: 'User';
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
  }>;
};

export type UpdateApplicationStatusMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  status: Scalars['String']['input'];
}>;

export type UpdateApplicationStatusMutation = {
  __typename?: 'Mutation';
  updateApplicationStatus: { __typename?: 'Application'; id: string; status: string };
};

export type RequestFurtherDetailsMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  message: Scalars['String']['input'];
}>;

export type RequestFurtherDetailsMutation = {
  __typename?: 'Mutation';
  requestFurtherDetails: {
    __typename?: 'Application';
    id: string;
    status: string;
    furtherDetailsRequest?: string | null;
  };
};

export type SubmitFurtherDetailsMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  response: Scalars['String']['input'];
}>;

export type SubmitFurtherDetailsMutation = {
  __typename?: 'Mutation';
  submitFurtherDetails: {
    __typename?: 'Application';
    id: string;
    status: string;
    furtherDetailsResponse?: string | null;
  };
};

export type MyNotificationsQueryVariables = Exact<{ [key: string]: never }>;

export type MyNotificationsQuery = {
  __typename?: 'Query';
  myNotifications: Array<{
    __typename?: 'Notification';
    id: string;
    title: string;
    message: string;
    read: boolean;
    link?: string | null;
    createdAt: string;
  }>;
};

export type MarkNotificationAsReadMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type MarkNotificationAsReadMutation = {
  __typename?: 'Mutation';
  markNotificationAsRead: { __typename?: 'Notification'; id: string; read: boolean };
};

export type ApproveApplicationWithAgreementMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  agreementUrl: Scalars['String']['input'];
}>;

export type ApproveApplicationWithAgreementMutation = {
  __typename?: 'Mutation';
  approveApplicationWithAgreement: {
    __typename?: 'Application';
    id: string;
    status: string;
    agreementUrl?: string | null;
  };
};

export type SubmitSignedAgreementMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  signedAgreementUrl: Scalars['String']['input'];
}>;

export type SubmitSignedAgreementMutation = {
  __typename?: 'Mutation';
  submitSignedAgreement: {
    __typename?: 'Application';
    id: string;
    status: string;
    signedAgreementUrl?: string | null;
  };
};

export type MyTenanciesQueryVariables = Exact<{ [key: string]: never }>;

export type MyTenanciesQuery = {
  __typename?: 'Query';
  myTenancies: Array<{
    __typename?: 'Application';
    id: string;
    status: string;
    agreementUrl?: string | null;
    signedAgreementUrl?: string | null;
    updatedAt: string;
    createdAt: string;
    property: {
      __typename?: 'Property';
      id: string;
      title: string;
      image: string;
      location: string;
      price: number;
      bedrooms: string;
      bathrooms: string;
      size: string;
      landlord: {
        __typename?: 'User';
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
      };
    };
    tenant: {
      __typename?: 'User';
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
  }>;
};

export type TenancyQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type TenancyQuery = {
  __typename?: 'Query';
  tenancy?: {
    __typename?: 'Application';
    id: string;
    status: string;
    agreementUrl?: string | null;
    signedAgreementUrl?: string | null;
    updatedAt: string;
    createdAt: string;
    property: {
      __typename?: 'Property';
      id: string;
      title: string;
      image: string;
      location: string;
      price: number;
      bedrooms: string;
      bathrooms: string;
      size: string;
      landlord: {
        __typename?: 'User';
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
      };
    };
    tenant: {
      __typename?: 'User';
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
  } | null;
};

export type MyDisputesQueryVariables = Exact<{ [key: string]: never }>;

export type MyDisputesQuery = {
  __typename?: 'Query';
  myDisputes: Array<{
    __typename?: 'Dispute';
    id: string;
    title: string;
    description: string;
    evidenceUrl?: string | null;
    status: string;
    createdAt: string;
    tenancy: {
      __typename?: 'Application';
      id: string;
      property: {
        __typename?: 'Property';
        id: string;
        title: string;
        image: string;
        location: string;
        price: number;
      };
    };
    creator: { __typename?: 'User'; id: string; firstName: string; lastName: string };
  }>;
};

export type DisputeQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type DisputeQuery = {
  __typename?: 'Query';
  dispute?: {
    __typename?: 'Dispute';
    id: string;
    title: string;
    description: string;
    evidenceUrl?: string | null;
    status: string;
    viewedByLandlordAt?: string | null;
    viewedByTenantAt?: string | null;
    createdAt: string;
    updatedAt: string;
    tenancy: {
      __typename?: 'Application';
      id: string;
      property: {
        __typename?: 'Property';
        id: string;
        title: string;
        image: string;
        location: string;
        price: number;
      };
    };
    creator: { __typename?: 'User'; id: string; firstName: string; lastName: string };
    comments: Array<{
      __typename?: 'Comment';
      id: string;
      text: string;
      createdAt: string;
      sender: { __typename?: 'User'; id: string; firstName: string; lastName: string };
    }>;
  } | null;
};

export type CreateDisputeMutationVariables = Exact<{
  tenancyId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
  evidenceUrl?: InputMaybe<Scalars['String']['input']>;
}>;

export type CreateDisputeMutation = {
  __typename?: 'Mutation';
  createDispute: { __typename?: 'Dispute'; id: string; status: string };
};

export type AddDisputeCommentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  text: Scalars['String']['input'];
}>;

export type AddDisputeCommentMutation = {
  __typename?: 'Mutation';
  addDisputeComment: {
    __typename?: 'Dispute';
    id: string;
    comments: Array<{
      __typename?: 'Comment';
      id: string;
      text: string;
      createdAt: string;
      sender: { __typename?: 'User'; id: string; firstName: string; lastName: string };
    }>;
  };
};

export type ResolveDisputeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type ResolveDisputeMutation = {
  __typename?: 'Mutation';
  resolveDispute: { __typename?: 'Dispute'; id: string; status: string };
};

export type UpdateProfileMutationVariables = Exact<{
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
}>;

export type UpdateProfileMutation = {
  __typename?: 'Mutation';
  updateProfile: {
    __typename?: 'User';
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    userType: string;
    phone: string;
    avatarUrl?: string | null;
    bio?: string | null;
    createdAt: string;
    updatedAt: string;
  };
};

export type ChangePasswordMutationVariables = Exact<{
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;

export type ChangePasswordMutation = { __typename?: 'Mutation'; changePassword: boolean };

export const RegisterDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Register' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'firstName' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'lastName' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'userType' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'phone' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'register' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'firstName' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'firstName' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'lastName' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'lastName' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'password' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userType' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'userType' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'phone' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'phone' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'token' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'userType' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Login' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'login' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'password' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'token' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'userType' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const MeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Me' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'me' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'userType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                { kind: 'Field', name: { kind: 'Name', value: 'avatarUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bio' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'savedProperties' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'preferences' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'regions' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'districts' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'types' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'minPrice' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'maxPrice' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'bedrooms' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'amenities' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'parking' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'onboardingStatus' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const LogoutDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Logout' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'logout' } }],
      },
    },
  ],
} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const MyPropertiesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MyProperties' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'myProperties' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'location' } },
                { kind: 'Field', name: { kind: 'Name', value: 'region' } },
                { kind: 'Field', name: { kind: 'Name', value: 'district' } },
                { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                { kind: 'Field', name: { kind: 'Name', value: 'verified' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bedrooms' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bathrooms' } },
                { kind: 'Field', name: { kind: 'Name', value: 'size' } },
                { kind: 'Field', name: { kind: 'Name', value: 'parking' } },
                { kind: 'Field', name: { kind: 'Name', value: 'about' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amenities' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lat' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lng' } },
                { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'images' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'main' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'kitchen' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'bedroom' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'bathroom' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'agreementUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MyPropertiesQuery, MyPropertiesQueryVariables>;
export const PropertiesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Properties' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'region' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'minPrice' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'maxPrice' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'properties' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'region' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'region' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'type' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'minPrice' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'minPrice' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'maxPrice' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'maxPrice' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'location' } },
                { kind: 'Field', name: { kind: 'Name', value: 'region' } },
                { kind: 'Field', name: { kind: 'Name', value: 'district' } },
                { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                { kind: 'Field', name: { kind: 'Name', value: 'verified' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bedrooms' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bathrooms' } },
                { kind: 'Field', name: { kind: 'Name', value: 'size' } },
                { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                { kind: 'Field', name: { kind: 'Name', value: 'about' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PropertiesQuery, PropertiesQueryVariables>;
export const RecommendedPropertiesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'RecommendedProperties' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'region' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'minPrice' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'maxPrice' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'recommendedProperties' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'region' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'region' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'type' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'minPrice' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'minPrice' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'maxPrice' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'maxPrice' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'score' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reasons' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'property' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'location' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'region' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'district' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'verified' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'bedrooms' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'bathrooms' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'size' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'about' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RecommendedPropertiesQuery, RecommendedPropertiesQueryVariables>;
export const TrackPropertyViewDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'TrackPropertyView' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'propertyId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'durationSec' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'trackPropertyView' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'propertyId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'propertyId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'durationSec' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'durationSec' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TrackPropertyViewMutation, TrackPropertyViewMutationVariables>;
export const SavePreferencesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SavePreferences' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PreferencesInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'savePreferences' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'preferences' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'regions' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'districts' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'types' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'minPrice' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'maxPrice' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'bedrooms' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'amenities' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'parking' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'onboardingStatus' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SavePreferencesMutation, SavePreferencesMutationVariables>;
export const SkipPreferencesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SkipPreferences' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'PreferencesInput' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'skipPreferences' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'preferences' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'regions' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'districts' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'types' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'minPrice' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'maxPrice' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'bedrooms' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'amenities' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'parking' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'onboardingStatus' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SkipPreferencesMutation, SkipPreferencesMutationVariables>;
export const CreatePropertyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateProperty' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreatePropertyInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createProperty' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'location' } },
                { kind: 'Field', name: { kind: 'Name', value: 'region' } },
                { kind: 'Field', name: { kind: 'Name', value: 'district' } },
                { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                { kind: 'Field', name: { kind: 'Name', value: 'verified' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bedrooms' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bathrooms' } },
                { kind: 'Field', name: { kind: 'Name', value: 'size' } },
                { kind: 'Field', name: { kind: 'Name', value: 'parking' } },
                { kind: 'Field', name: { kind: 'Name', value: 'about' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amenities' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lat' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lng' } },
                { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'images' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'main' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'kitchen' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'bedroom' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'bathroom' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'agreementUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreatePropertyMutation, CreatePropertyMutationVariables>;
export const PropertyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Property' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'property' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'location' } },
                { kind: 'Field', name: { kind: 'Name', value: 'region' } },
                { kind: 'Field', name: { kind: 'Name', value: 'district' } },
                { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                { kind: 'Field', name: { kind: 'Name', value: 'verified' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bedrooms' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bathrooms' } },
                { kind: 'Field', name: { kind: 'Name', value: 'size' } },
                { kind: 'Field', name: { kind: 'Name', value: 'parking' } },
                { kind: 'Field', name: { kind: 'Name', value: 'about' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amenities' } },
                { kind: 'Field', name: { kind: 'Name', value: 'mapDescription' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lat' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lng' } },
                { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'images' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'main' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'kitchen' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'bedroom' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'bathroom' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'agreementUrl' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'landlord' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PropertyQuery, PropertyQueryVariables>;
export const ToggleSavePropertyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ToggleSaveProperty' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'propertyId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'toggleSaveProperty' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'propertyId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'propertyId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'savedProperties' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ToggleSavePropertyMutation, ToggleSavePropertyMutationVariables>;
export const CreateApplicationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateApplication' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateApplicationInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createApplication' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateApplicationMutation, CreateApplicationMutationVariables>;
export const MyApplicationsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MyApplications' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'myApplications' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'property' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'location' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'bedrooms' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'bathrooms' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'nationalIdUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'supportingDocsUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'employerName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'jobTitle' } },
                { kind: 'Field', name: { kind: 'Name', value: 'monthlyIncome' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lengthOfEmployment' } },
                { kind: 'Field', name: { kind: 'Name', value: 'personalStatement' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'furtherDetailsRequest' } },
                { kind: 'Field', name: { kind: 'Name', value: 'furtherDetailsResponse' } },
                { kind: 'Field', name: { kind: 'Name', value: 'agreementUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'signedAgreementUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MyApplicationsQuery, MyApplicationsQueryVariables>;
export const ReceivedApplicationsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ReceivedApplications' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'receivedApplications' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'property' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'location' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'tenant' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'nationalIdUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'supportingDocsUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'employerName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'jobTitle' } },
                { kind: 'Field', name: { kind: 'Name', value: 'monthlyIncome' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lengthOfEmployment' } },
                { kind: 'Field', name: { kind: 'Name', value: 'personalStatement' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'furtherDetailsRequest' } },
                { kind: 'Field', name: { kind: 'Name', value: 'furtherDetailsResponse' } },
                { kind: 'Field', name: { kind: 'Name', value: 'agreementUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'signedAgreementUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReceivedApplicationsQuery, ReceivedApplicationsQueryVariables>;
export const UpdateApplicationStatusDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateApplicationStatus' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'status' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateApplicationStatus' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'status' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'status' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateApplicationStatusMutation,
  UpdateApplicationStatusMutationVariables
>;
export const RequestFurtherDetailsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RequestFurtherDetails' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'message' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestFurtherDetails' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'message' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'message' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'furtherDetailsRequest' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RequestFurtherDetailsMutation, RequestFurtherDetailsMutationVariables>;
export const SubmitFurtherDetailsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SubmitFurtherDetails' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'response' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'submitFurtherDetails' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'response' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'response' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'furtherDetailsResponse' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SubmitFurtherDetailsMutation, SubmitFurtherDetailsMutationVariables>;
export const MyNotificationsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MyNotifications' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'myNotifications' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                { kind: 'Field', name: { kind: 'Name', value: 'read' } },
                { kind: 'Field', name: { kind: 'Name', value: 'link' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MyNotificationsQuery, MyNotificationsQueryVariables>;
export const MarkNotificationAsReadDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'MarkNotificationAsRead' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'markNotificationAsRead' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'read' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  MarkNotificationAsReadMutation,
  MarkNotificationAsReadMutationVariables
>;
export const ApproveApplicationWithAgreementDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ApproveApplicationWithAgreement' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'agreementUrl' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'approveApplicationWithAgreement' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'agreementUrl' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'agreementUrl' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'agreementUrl' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ApproveApplicationWithAgreementMutation,
  ApproveApplicationWithAgreementMutationVariables
>;
export const SubmitSignedAgreementDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SubmitSignedAgreement' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'signedAgreementUrl' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'submitSignedAgreement' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'signedAgreementUrl' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'signedAgreementUrl' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'signedAgreementUrl' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SubmitSignedAgreementMutation, SubmitSignedAgreementMutationVariables>;
export const MyTenanciesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MyTenancies' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'myTenancies' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'property' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'location' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'bedrooms' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'bathrooms' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'size' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'landlord' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'tenant' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'agreementUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'signedAgreementUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MyTenanciesQuery, MyTenanciesQueryVariables>;
export const TenancyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Tenancy' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'tenancy' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'property' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'location' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'bedrooms' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'bathrooms' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'size' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'landlord' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'tenant' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'agreementUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'signedAgreementUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TenancyQuery, TenancyQueryVariables>;
export const MyDisputesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MyDisputes' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'myDisputes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'tenancy' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'property' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'location' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'creator' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'evidenceUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MyDisputesQuery, MyDisputesQueryVariables>;
export const DisputeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Dispute' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'dispute' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'tenancy' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'property' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'location' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'creator' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'evidenceUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'comments' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sender' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'text' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'viewedByLandlordAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'viewedByTenantAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DisputeQuery, DisputeQueryVariables>;
export const CreateDisputeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateDispute' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'tenancyId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'evidenceUrl' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createDispute' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'tenancyId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'tenancyId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'title' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'description' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'evidenceUrl' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'evidenceUrl' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateDisputeMutation, CreateDisputeMutationVariables>;
export const AddDisputeCommentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AddDisputeComment' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'text' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addDisputeComment' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'text' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'text' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'comments' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sender' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'text' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddDisputeCommentMutation, AddDisputeCommentMutationVariables>;
export const ResolveDisputeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ResolveDispute' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'resolveDispute' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ResolveDisputeMutation, ResolveDisputeMutationVariables>;
export const UpdateProfileDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateProfile' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'firstName' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'lastName' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'phone' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'bio' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'avatarUrl' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateProfile' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'firstName' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'firstName' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'lastName' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'lastName' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'phone' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'phone' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'bio' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'bio' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'avatarUrl' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'avatarUrl' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'userType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                { kind: 'Field', name: { kind: 'Name', value: 'avatarUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bio' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const ChangePasswordDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ChangePassword' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'currentPassword' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'newPassword' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'changePassword' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'currentPassword' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'currentPassword' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'newPassword' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'newPassword' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ChangePasswordMutation, ChangePasswordMutationVariables>;
