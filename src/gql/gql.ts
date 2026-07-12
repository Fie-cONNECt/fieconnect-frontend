/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation Register(\n    $firstName: String!\n    $lastName: String!\n    $email: String!\n    $password: String!\n    $userType: String!\n    $phone: String!\n  ) {\n    register(\n      firstName: $firstName\n      lastName: $lastName\n      email: $email\n      password: $password\n      userType: $userType\n      phone: $phone\n    ) {\n      token\n      user {\n        id\n        firstName\n        lastName\n        email\n        userType\n        phone\n        createdAt\n      }\n    }\n  }\n": typeof types.RegisterDocument,
    "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        id\n        firstName\n        lastName\n        email\n        userType\n        phone\n        createdAt\n      }\n    }\n  }\n": typeof types.LoginDocument,
    "\n  query Me {\n    me {\n      id\n      firstName\n      lastName\n      email\n      userType\n      phone\n      savedProperties {\n        id\n      }\n      createdAt\n    }\n  }\n": typeof types.MeDocument,
    "\n  mutation Logout {\n    logout\n  }\n": typeof types.LogoutDocument,
    "\n  query MyProperties {\n    myProperties {\n      id\n      title\n      type\n      location\n      region\n      district\n      price\n      verified\n      bedrooms\n      bathrooms\n      size\n      parking\n      about\n      amenities\n      lat\n      lng\n      image\n      images {\n        main\n        kitchen\n        bedroom\n        bathroom\n      }\n      agreementUrl\n      createdAt\n    }\n  }\n": typeof types.MyPropertiesDocument,
    "\n  mutation CreateProperty($input: CreatePropertyInput!) {\n    createProperty(input: $input) {\n      id\n      title\n      type\n      location\n      region\n      district\n      price\n      verified\n      bedrooms\n      bathrooms\n      size\n      parking\n      about\n      amenities\n      lat\n      lng\n      image\n      images {\n        main\n        kitchen\n        bedroom\n        bathroom\n      }\n      agreementUrl\n      createdAt\n    }\n  }\n": typeof types.CreatePropertyDocument,
    "\n  query Property($id: ID!) {\n    property(id: $id) {\n      id\n      title\n      type\n      location\n      region\n      district\n      price\n      verified\n      bedrooms\n      bathrooms\n      size\n      parking\n      about\n      amenities\n      mapDescription\n      lat\n      lng\n      image\n      images {\n        main\n        kitchen\n        bedroom\n        bathroom\n      }\n      agreementUrl\n      landlord {\n        id\n        firstName\n        lastName\n        email\n        phone\n      }\n      createdAt\n    }\n  }\n": typeof types.PropertyDocument,
    "\n  mutation ToggleSaveProperty($propertyId: ID!) {\n    toggleSaveProperty(propertyId: $propertyId) {\n      id\n      savedProperties {\n        id\n      }\n    }\n  }\n": typeof types.ToggleSavePropertyDocument,
};
const documents: Documents = {
    "\n  mutation Register(\n    $firstName: String!\n    $lastName: String!\n    $email: String!\n    $password: String!\n    $userType: String!\n    $phone: String!\n  ) {\n    register(\n      firstName: $firstName\n      lastName: $lastName\n      email: $email\n      password: $password\n      userType: $userType\n      phone: $phone\n    ) {\n      token\n      user {\n        id\n        firstName\n        lastName\n        email\n        userType\n        phone\n        createdAt\n      }\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        id\n        firstName\n        lastName\n        email\n        userType\n        phone\n        createdAt\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  query Me {\n    me {\n      id\n      firstName\n      lastName\n      email\n      userType\n      phone\n      savedProperties {\n        id\n      }\n      createdAt\n    }\n  }\n": types.MeDocument,
    "\n  mutation Logout {\n    logout\n  }\n": types.LogoutDocument,
    "\n  query MyProperties {\n    myProperties {\n      id\n      title\n      type\n      location\n      region\n      district\n      price\n      verified\n      bedrooms\n      bathrooms\n      size\n      parking\n      about\n      amenities\n      lat\n      lng\n      image\n      images {\n        main\n        kitchen\n        bedroom\n        bathroom\n      }\n      agreementUrl\n      createdAt\n    }\n  }\n": types.MyPropertiesDocument,
    "\n  mutation CreateProperty($input: CreatePropertyInput!) {\n    createProperty(input: $input) {\n      id\n      title\n      type\n      location\n      region\n      district\n      price\n      verified\n      bedrooms\n      bathrooms\n      size\n      parking\n      about\n      amenities\n      lat\n      lng\n      image\n      images {\n        main\n        kitchen\n        bedroom\n        bathroom\n      }\n      agreementUrl\n      createdAt\n    }\n  }\n": types.CreatePropertyDocument,
    "\n  query Property($id: ID!) {\n    property(id: $id) {\n      id\n      title\n      type\n      location\n      region\n      district\n      price\n      verified\n      bedrooms\n      bathrooms\n      size\n      parking\n      about\n      amenities\n      mapDescription\n      lat\n      lng\n      image\n      images {\n        main\n        kitchen\n        bedroom\n        bathroom\n      }\n      agreementUrl\n      landlord {\n        id\n        firstName\n        lastName\n        email\n        phone\n      }\n      createdAt\n    }\n  }\n": types.PropertyDocument,
    "\n  mutation ToggleSaveProperty($propertyId: ID!) {\n    toggleSaveProperty(propertyId: $propertyId) {\n      id\n      savedProperties {\n        id\n      }\n    }\n  }\n": types.ToggleSavePropertyDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register(\n    $firstName: String!\n    $lastName: String!\n    $email: String!\n    $password: String!\n    $userType: String!\n    $phone: String!\n  ) {\n    register(\n      firstName: $firstName\n      lastName: $lastName\n      email: $email\n      password: $password\n      userType: $userType\n      phone: $phone\n    ) {\n      token\n      user {\n        id\n        firstName\n        lastName\n        email\n        userType\n        phone\n        createdAt\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Register(\n    $firstName: String!\n    $lastName: String!\n    $email: String!\n    $password: String!\n    $userType: String!\n    $phone: String!\n  ) {\n    register(\n      firstName: $firstName\n      lastName: $lastName\n      email: $email\n      password: $password\n      userType: $userType\n      phone: $phone\n    ) {\n      token\n      user {\n        id\n        firstName\n        lastName\n        email\n        userType\n        phone\n        createdAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        id\n        firstName\n        lastName\n        email\n        userType\n        phone\n        createdAt\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        id\n        firstName\n        lastName\n        email\n        userType\n        phone\n        createdAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      id\n      firstName\n      lastName\n      email\n      userType\n      phone\n      savedProperties {\n        id\n      }\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      id\n      firstName\n      lastName\n      email\n      userType\n      phone\n      savedProperties {\n        id\n      }\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Logout {\n    logout\n  }\n"): (typeof documents)["\n  mutation Logout {\n    logout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MyProperties {\n    myProperties {\n      id\n      title\n      type\n      location\n      region\n      district\n      price\n      verified\n      bedrooms\n      bathrooms\n      size\n      parking\n      about\n      amenities\n      lat\n      lng\n      image\n      images {\n        main\n        kitchen\n        bedroom\n        bathroom\n      }\n      agreementUrl\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query MyProperties {\n    myProperties {\n      id\n      title\n      type\n      location\n      region\n      district\n      price\n      verified\n      bedrooms\n      bathrooms\n      size\n      parking\n      about\n      amenities\n      lat\n      lng\n      image\n      images {\n        main\n        kitchen\n        bedroom\n        bathroom\n      }\n      agreementUrl\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateProperty($input: CreatePropertyInput!) {\n    createProperty(input: $input) {\n      id\n      title\n      type\n      location\n      region\n      district\n      price\n      verified\n      bedrooms\n      bathrooms\n      size\n      parking\n      about\n      amenities\n      lat\n      lng\n      image\n      images {\n        main\n        kitchen\n        bedroom\n        bathroom\n      }\n      agreementUrl\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateProperty($input: CreatePropertyInput!) {\n    createProperty(input: $input) {\n      id\n      title\n      type\n      location\n      region\n      district\n      price\n      verified\n      bedrooms\n      bathrooms\n      size\n      parking\n      about\n      amenities\n      lat\n      lng\n      image\n      images {\n        main\n        kitchen\n        bedroom\n        bathroom\n      }\n      agreementUrl\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Property($id: ID!) {\n    property(id: $id) {\n      id\n      title\n      type\n      location\n      region\n      district\n      price\n      verified\n      bedrooms\n      bathrooms\n      size\n      parking\n      about\n      amenities\n      mapDescription\n      lat\n      lng\n      image\n      images {\n        main\n        kitchen\n        bedroom\n        bathroom\n      }\n      agreementUrl\n      landlord {\n        id\n        firstName\n        lastName\n        email\n        phone\n      }\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query Property($id: ID!) {\n    property(id: $id) {\n      id\n      title\n      type\n      location\n      region\n      district\n      price\n      verified\n      bedrooms\n      bathrooms\n      size\n      parking\n      about\n      amenities\n      mapDescription\n      lat\n      lng\n      image\n      images {\n        main\n        kitchen\n        bedroom\n        bathroom\n      }\n      agreementUrl\n      landlord {\n        id\n        firstName\n        lastName\n        email\n        phone\n      }\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ToggleSaveProperty($propertyId: ID!) {\n    toggleSaveProperty(propertyId: $propertyId) {\n      id\n      savedProperties {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation ToggleSaveProperty($propertyId: ID!) {\n    toggleSaveProperty(propertyId: $propertyId) {\n      id\n      savedProperties {\n        id\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;