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
  '\n  mutation Register(\n    $firstName: String!\n    $lastName: String!\n    $email: String!\n    $password: String!\n    $userType: String!\n    $phone: String!\n  ) {\n    register(\n      firstName: $firstName\n      lastName: $lastName\n      email: $email\n      password: $password\n      userType: $userType\n      phone: $phone\n    ) {\n      token\n      user {\n        id\n        firstName\n        lastName\n        email\n        userType\n        phone\n        createdAt\n      }\n    }\n  }\n': typeof types.RegisterDocument;
  '\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        id\n        firstName\n        lastName\n        email\n        userType\n        phone\n        createdAt\n      }\n    }\n  }\n': typeof types.LoginDocument;
  '\n  query Me {\n    me {\n      id\n      firstName\n      lastName\n      email\n      userType\n      phone\n      avatarUrl\n      bio\n      savedProperties {\n        id\n      }\n      preferences {\n        regions\n        districts\n        types\n        minPrice\n        maxPrice\n        bedrooms\n        amenities\n        parking\n        onboardingStatus\n      }\n      createdAt\n    }\n  }\n': typeof types.MeDocument;
  '\n  mutation Logout {\n    logout\n  }\n': typeof types.LogoutDocument;
  '\n  query MyProperties {\n    myProperties {\n      id\n      title\n      type\n      location\n      region\n      district\n      price\n      verified\n      bedrooms\n      bathrooms\n      size\n      parking\n      about\n      amenities\n      lat\n      lng\n      image\n      images {\n        main\n        kitchen\n        bedroom\n        bathroom\n      }\n      agreementUrl\n      createdAt\n    }\n  }\n': typeof types.MyPropertiesDocument;
  '\n  query Properties($region: String, $type: String, $minPrice: Float, $maxPrice: Float) {\n    properties(region: $region, type: $type, minPrice: $minPrice, maxPrice: $maxPrice) {\n      id\n      title\n      type\n      location\n      region\n      district\n      price\n      verified\n      bedrooms\n      bathrooms\n      size\n      image\n      about\n      createdAt\n    }\n  }\n': typeof types.PropertiesDocument;
  '\n  query RecommendedProperties(\n    $limit: Int\n    $region: String\n    $type: String\n    $minPrice: Float\n    $maxPrice: Float\n  ) {\n    recommendedProperties(\n      limit: $limit\n      region: $region\n      type: $type\n      minPrice: $minPrice\n      maxPrice: $maxPrice\n    ) {\n      score\n      stars\n      reasons\n      property {\n        id\n        title\n        type\n        location\n        region\n        district\n        price\n        verified\n        bedrooms\n        bathrooms\n        size\n        image\n        about\n        createdAt\n      }\n    }\n  }\n': typeof types.RecommendedPropertiesDocument;
  '\n  mutation TrackPropertyView($propertyId: ID!, $durationSec: Float) {\n    trackPropertyView(propertyId: $propertyId, durationSec: $durationSec)\n  }\n': typeof types.TrackPropertyViewDocument;
  '\n  mutation SavePreferences($input: PreferencesInput!) {\n    savePreferences(input: $input) {\n      id\n      preferences {\n        regions\n        districts\n        types\n        minPrice\n        maxPrice\n        bedrooms\n        amenities\n        parking\n        onboardingStatus\n      }\n    }\n  }\n': typeof types.SavePreferencesDocument;
  '\n  mutation SkipPreferences($input: PreferencesInput) {\n    skipPreferences(input: $input) {\n      id\n      preferences {\n        regions\n        districts\n        types\n        minPrice\n        maxPrice\n        bedrooms\n        amenities\n        parking\n        onboardingStatus\n      }\n    }\n  }\n': typeof types.SkipPreferencesDocument;
  '\n  mutation CreateProperty($input: CreatePropertyInput!) {\n    createProperty(input: $input) {\n      id\n      title\n      type\n      location\n      region\n      district\n      price\n      verified\n      bedrooms\n      bathrooms\n      size\n      parking\n      about\n      amenities\n      lat\n      lng\n      image\n      images {\n        main\n        kitchen\n        bedroom\n        bathroom\n      }\n      agreementUrl\n      createdAt\n    }\n  }\n': typeof types.CreatePropertyDocument;
  '\n  query Property($id: ID!) {\n    property(id: $id) {\n      id\n      title\n      type\n      location\n      region\n      district\n      price\n      verified\n      bedrooms\n      bathrooms\n      size\n      parking\n      about\n      amenities\n      mapDescription\n      lat\n      lng\n      image\n      images {\n        main\n        kitchen\n        bedroom\n        bathroom\n      }\n      agreementUrl\n      landlord {\n        id\n        firstName\n        lastName\n        email\n        phone\n      }\n      createdAt\n    }\n  }\n': typeof types.PropertyDocument;
  '\n  mutation ToggleSaveProperty($propertyId: ID!) {\n    toggleSaveProperty(propertyId: $propertyId) {\n      id\n      savedProperties {\n        id\n      }\n    }\n  }\n': typeof types.ToggleSavePropertyDocument;
  '\n  mutation CreateApplication($input: CreateApplicationInput!) {\n    createApplication(input: $input) {\n      id\n      status\n      createdAt\n    }\n  }\n': typeof types.CreateApplicationDocument;
  '\n  query MyApplications {\n    myApplications {\n      id\n      property {\n        id\n        title\n        image\n        location\n        price\n        bedrooms\n        bathrooms\n      }\n      nationalIdUrl\n      supportingDocsUrl\n      employerName\n      jobTitle\n      monthlyIncome\n      lengthOfEmployment\n      personalStatement\n      status\n      furtherDetailsRequest\n      furtherDetailsResponse\n      agreementUrl\n      signedAgreementUrl\n      createdAt\n    }\n  }\n': typeof types.MyApplicationsDocument;
  '\n  query ReceivedApplications {\n    receivedApplications {\n      id\n      property {\n        id\n        title\n        image\n        location\n        price\n      }\n      tenant {\n        id\n        firstName\n        lastName\n        email\n        phone\n      }\n      nationalIdUrl\n      supportingDocsUrl\n      employerName\n      jobTitle\n      monthlyIncome\n      lengthOfEmployment\n      personalStatement\n      status\n      furtherDetailsRequest\n      furtherDetailsResponse\n      agreementUrl\n      signedAgreementUrl\n      createdAt\n    }\n  }\n': typeof types.ReceivedApplicationsDocument;
  '\n  mutation UpdateApplicationStatus($id: ID!, $status: String!) {\n    updateApplicationStatus(id: $id, status: $status) {\n      id\n      status\n    }\n  }\n': typeof types.UpdateApplicationStatusDocument;
  '\n  mutation RequestFurtherDetails($id: ID!, $message: String!) {\n    requestFurtherDetails(id: $id, message: $message) {\n      id\n      status\n      furtherDetailsRequest\n    }\n  }\n': typeof types.RequestFurtherDetailsDocument;
  '\n  mutation SubmitFurtherDetails($id: ID!, $response: String!) {\n    submitFurtherDetails(id: $id, response: $response) {\n      id\n      status\n      furtherDetailsResponse\n    }\n  }\n': typeof types.SubmitFurtherDetailsDocument;
  '\n  query MyNotifications {\n    myNotifications {\n      id\n      title\n      message\n      read\n      link\n      createdAt\n    }\n  }\n': typeof types.MyNotificationsDocument;
  '\n  mutation MarkNotificationAsRead($id: ID!) {\n    markNotificationAsRead(id: $id) {\n      id\n      read\n    }\n  }\n': typeof types.MarkNotificationAsReadDocument;
  '\n  mutation ApproveApplicationWithAgreement($id: ID!, $agreementUrl: String!) {\n    approveApplicationWithAgreement(id: $id, agreementUrl: $agreementUrl) {\n      id\n      status\n      agreementUrl\n    }\n  }\n': typeof types.ApproveApplicationWithAgreementDocument;
  '\n  mutation SubmitSignedAgreement($id: ID!, $signedAgreementUrl: String!) {\n    submitSignedAgreement(id: $id, signedAgreementUrl: $signedAgreementUrl) {\n      id\n      status\n      signedAgreementUrl\n    }\n  }\n': typeof types.SubmitSignedAgreementDocument;
  '\n  query MyTenancies {\n    myTenancies {\n      id\n      property {\n        id\n        title\n        image\n        location\n        price\n        bedrooms\n        bathrooms\n        size\n        landlord {\n          id\n          firstName\n          lastName\n          email\n          phone\n        }\n      }\n      tenant {\n        id\n        firstName\n        lastName\n        email\n        phone\n      }\n      status\n      agreementUrl\n      signedAgreementUrl\n      updatedAt\n      createdAt\n    }\n  }\n': typeof types.MyTenanciesDocument;
  '\n  query Tenancy($id: ID!) {\n    tenancy(id: $id) {\n      id\n      property {\n        id\n        title\n        image\n        location\n        price\n        bedrooms\n        bathrooms\n        size\n        landlord {\n          id\n          firstName\n          lastName\n          email\n          phone\n        }\n      }\n      tenant {\n        id\n        firstName\n        lastName\n        email\n        phone\n      }\n      status\n      agreementUrl\n      signedAgreementUrl\n      updatedAt\n      createdAt\n    }\n  }\n': typeof types.TenancyDocument;
  '\n  query MyDisputes {\n    myDisputes {\n      id\n      tenancy {\n        id\n        property {\n          id\n          title\n          image\n          location\n          price\n        }\n      }\n      creator {\n        id\n        firstName\n        lastName\n      }\n      title\n      description\n      evidenceUrl\n      status\n      createdAt\n    }\n  }\n': typeof types.MyDisputesDocument;
  '\n  query Dispute($id: ID!) {\n    dispute(id: $id) {\n      id\n      tenancy {\n        id\n        property {\n          id\n          title\n          image\n          location\n          price\n        }\n      }\n      creator {\n        id\n        firstName\n        lastName\n      }\n      title\n      description\n      evidenceUrl\n      status\n      comments {\n        id\n        sender {\n          id\n          firstName\n          lastName\n        }\n        text\n        createdAt\n      }\n      viewedByLandlordAt\n      viewedByTenantAt\n      createdAt\n      updatedAt\n    }\n  }\n': typeof types.DisputeDocument;
  '\n  mutation CreateDispute(\n    $tenancyId: ID!\n    $title: String!\n    $description: String!\n    $evidenceUrl: String\n  ) {\n    createDispute(\n      tenancyId: $tenancyId\n      title: $title\n      description: $description\n      evidenceUrl: $evidenceUrl\n    ) {\n      id\n      status\n    }\n  }\n': typeof types.CreateDisputeDocument;
  '\n  mutation AddDisputeComment($id: ID!, $text: String!) {\n    addDisputeComment(id: $id, text: $text) {\n      id\n      comments {\n        id\n        sender {\n          id\n          firstName\n          lastName\n        }\n        text\n        createdAt\n      }\n    }\n  }\n': typeof types.AddDisputeCommentDocument;
  '\n  mutation ResolveDispute($id: ID!) {\n    resolveDispute(id: $id) {\n      id\n      status\n    }\n  }\n': typeof types.ResolveDisputeDocument;
  '\n  mutation UpdateProfile(\n    $firstName: String\n    $lastName: String\n    $phone: String\n    $bio: String\n    $avatarUrl: String\n  ) {\n    updateProfile(\n      firstName: $firstName\n      lastName: $lastName\n      phone: $phone\n      bio: $bio\n      avatarUrl: $avatarUrl\n    ) {\n      id\n      firstName\n      lastName\n      email\n      userType\n      phone\n      avatarUrl\n      bio\n      createdAt\n      updatedAt\n    }\n  }\n': typeof types.UpdateProfileDocument;
  '\n  mutation ChangePassword($currentPassword: String!, $newPassword: String!) {\n    changePassword(currentPassword: $currentPassword, newPassword: $newPassword)\n  }\n': typeof types.ChangePasswordDocument;
};
const documents: Documents = {
  '\n  mutation Register(\n    $firstName: String!\n    $lastName: String!\n    $email: String!\n    $password: String!\n    $userType: String!\n    $phone: String!\n  ) {\n    register(\n      firstName: $firstName\n      lastName: $lastName\n      email: $email\n      password: $password\n      userType: $userType\n      phone: $phone\n    ) {\n      token\n      user {\n        id\n        firstName\n        lastName\n        email\n        userType\n        phone\n        createdAt\n      }\n    }\n  }\n':
    types.RegisterDocument,
  '\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        id\n        firstName\n        lastName\n        email\n        userType\n        phone\n        createdAt\n      }\n    }\n  }\n':
    types.LoginDocument,
  '\n  query Me {\n    me {\n      id\n      firstName\n      lastName\n      email\n      userType\n      phone\n      avatarUrl\n      bio\n      savedProperties {\n        id\n      }\n      preferences {\n        regions\n        districts\n        types\n        minPrice\n        maxPrice\n        bedrooms\n        amenities\n        parking\n        onboardingStatus\n      }\n      createdAt\n    }\n  }\n':
    types.MeDocument,
  '\n  mutation Logout {\n    logout\n  }\n': types.LogoutDocument,
  '\n  query MyProperties {\n    myProperties {\n      id\n      title\n      type\n      location\n      region\n      district\n      price\n      verified\n      bedrooms\n      bathrooms\n      size\n      parking\n      about\n      amenities\n      lat\n      lng\n      image\n      images {\n        main\n        kitchen\n        bedroom\n        bathroom\n      }\n      agreementUrl\n      createdAt\n    }\n  }\n':
    types.MyPropertiesDocument,
  '\n  query Properties($region: String, $type: String, $minPrice: Float, $maxPrice: Float) {\n    properties(region: $region, type: $type, minPrice: $minPrice, maxPrice: $maxPrice) {\n      id\n      title\n      type\n      location\n      region\n      district\n      price\n      verified\n      bedrooms\n      bathrooms\n      size\n      image\n      about\n      createdAt\n    }\n  }\n':
    types.PropertiesDocument,
  '\n  query RecommendedProperties(\n    $limit: Int\n    $region: String\n    $type: String\n    $minPrice: Float\n    $maxPrice: Float\n  ) {\n    recommendedProperties(\n      limit: $limit\n      region: $region\n      type: $type\n      minPrice: $minPrice\n      maxPrice: $maxPrice\n    ) {\n      score\n      stars\n      reasons\n      property {\n        id\n        title\n        type\n        location\n        region\n        district\n        price\n        verified\n        bedrooms\n        bathrooms\n        size\n        image\n        about\n        createdAt\n      }\n    }\n  }\n':
    types.RecommendedPropertiesDocument,
  '\n  mutation TrackPropertyView($propertyId: ID!, $durationSec: Float) {\n    trackPropertyView(propertyId: $propertyId, durationSec: $durationSec)\n  }\n':
    types.TrackPropertyViewDocument,
  '\n  mutation SavePreferences($input: PreferencesInput!) {\n    savePreferences(input: $input) {\n      id\n      preferences {\n        regions\n        districts\n        types\n        minPrice\n        maxPrice\n        bedrooms\n        amenities\n        parking\n        onboardingStatus\n      }\n    }\n  }\n':
    types.SavePreferencesDocument,
  '\n  mutation SkipPreferences($input: PreferencesInput) {\n    skipPreferences(input: $input) {\n      id\n      preferences {\n        regions\n        districts\n        types\n        minPrice\n        maxPrice\n        bedrooms\n        amenities\n        parking\n        onboardingStatus\n      }\n    }\n  }\n':
    types.SkipPreferencesDocument,
  '\n  mutation CreateProperty($input: CreatePropertyInput!) {\n    createProperty(input: $input) {\n      id\n      title\n      type\n      location\n      region\n      district\n      price\n      verified\n      bedrooms\n      bathrooms\n      size\n      parking\n      about\n      amenities\n      lat\n      lng\n      image\n      images {\n        main\n        kitchen\n        bedroom\n        bathroom\n      }\n      agreementUrl\n      createdAt\n    }\n  }\n':
    types.CreatePropertyDocument,
  '\n  query Property($id: ID!) {\n    property(id: $id) {\n      id\n      title\n      type\n      location\n      region\n      district\n      price\n      verified\n      bedrooms\n      bathrooms\n      size\n      parking\n      about\n      amenities\n      mapDescription\n      lat\n      lng\n      image\n      images {\n        main\n        kitchen\n        bedroom\n        bathroom\n      }\n      agreementUrl\n      landlord {\n        id\n        firstName\n        lastName\n        email\n        phone\n      }\n      createdAt\n    }\n  }\n':
    types.PropertyDocument,
  '\n  mutation ToggleSaveProperty($propertyId: ID!) {\n    toggleSaveProperty(propertyId: $propertyId) {\n      id\n      savedProperties {\n        id\n      }\n    }\n  }\n':
    types.ToggleSavePropertyDocument,
  '\n  mutation CreateApplication($input: CreateApplicationInput!) {\n    createApplication(input: $input) {\n      id\n      status\n      createdAt\n    }\n  }\n':
    types.CreateApplicationDocument,
  '\n  query MyApplications {\n    myApplications {\n      id\n      property {\n        id\n        title\n        image\n        location\n        price\n        bedrooms\n        bathrooms\n      }\n      nationalIdUrl\n      supportingDocsUrl\n      employerName\n      jobTitle\n      monthlyIncome\n      lengthOfEmployment\n      personalStatement\n      status\n      furtherDetailsRequest\n      furtherDetailsResponse\n      agreementUrl\n      signedAgreementUrl\n      createdAt\n    }\n  }\n':
    types.MyApplicationsDocument,
  '\n  query ReceivedApplications {\n    receivedApplications {\n      id\n      property {\n        id\n        title\n        image\n        location\n        price\n      }\n      tenant {\n        id\n        firstName\n        lastName\n        email\n        phone\n      }\n      nationalIdUrl\n      supportingDocsUrl\n      employerName\n      jobTitle\n      monthlyIncome\n      lengthOfEmployment\n      personalStatement\n      status\n      furtherDetailsRequest\n      furtherDetailsResponse\n      agreementUrl\n      signedAgreementUrl\n      createdAt\n    }\n  }\n':
    types.ReceivedApplicationsDocument,
  '\n  mutation UpdateApplicationStatus($id: ID!, $status: String!) {\n    updateApplicationStatus(id: $id, status: $status) {\n      id\n      status\n    }\n  }\n':
    types.UpdateApplicationStatusDocument,
  '\n  mutation RequestFurtherDetails($id: ID!, $message: String!) {\n    requestFurtherDetails(id: $id, message: $message) {\n      id\n      status\n      furtherDetailsRequest\n    }\n  }\n':
    types.RequestFurtherDetailsDocument,
  '\n  mutation SubmitFurtherDetails($id: ID!, $response: String!) {\n    submitFurtherDetails(id: $id, response: $response) {\n      id\n      status\n      furtherDetailsResponse\n    }\n  }\n':
    types.SubmitFurtherDetailsDocument,
  '\n  query MyNotifications {\n    myNotifications {\n      id\n      title\n      message\n      read\n      link\n      createdAt\n    }\n  }\n':
    types.MyNotificationsDocument,
  '\n  mutation MarkNotificationAsRead($id: ID!) {\n    markNotificationAsRead(id: $id) {\n      id\n      read\n    }\n  }\n':
    types.MarkNotificationAsReadDocument,
  '\n  mutation ApproveApplicationWithAgreement($id: ID!, $agreementUrl: String!) {\n    approveApplicationWithAgreement(id: $id, agreementUrl: $agreementUrl) {\n      id\n      status\n      agreementUrl\n    }\n  }\n':
    types.ApproveApplicationWithAgreementDocument,
  '\n  mutation SubmitSignedAgreement($id: ID!, $signedAgreementUrl: String!) {\n    submitSignedAgreement(id: $id, signedAgreementUrl: $signedAgreementUrl) {\n      id\n      status\n      signedAgreementUrl\n    }\n  }\n':
    types.SubmitSignedAgreementDocument,
  '\n  query MyTenancies {\n    myTenancies {\n      id\n      property {\n        id\n        title\n        image\n        location\n        price\n        bedrooms\n        bathrooms\n        size\n        landlord {\n          id\n          firstName\n          lastName\n          email\n          phone\n        }\n      }\n      tenant {\n        id\n        firstName\n        lastName\n        email\n        phone\n      }\n      status\n      agreementUrl\n      signedAgreementUrl\n      updatedAt\n      createdAt\n    }\n  }\n':
    types.MyTenanciesDocument,
  '\n  query Tenancy($id: ID!) {\n    tenancy(id: $id) {\n      id\n      property {\n        id\n        title\n        image\n        location\n        price\n        bedrooms\n        bathrooms\n        size\n        landlord {\n          id\n          firstName\n          lastName\n          email\n          phone\n        }\n      }\n      tenant {\n        id\n        firstName\n        lastName\n        email\n        phone\n      }\n      status\n      agreementUrl\n      signedAgreementUrl\n      updatedAt\n      createdAt\n    }\n  }\n':
    types.TenancyDocument,
  '\n  query MyDisputes {\n    myDisputes {\n      id\n      tenancy {\n        id\n        property {\n          id\n          title\n          image\n          location\n          price\n        }\n      }\n      creator {\n        id\n        firstName\n        lastName\n      }\n      title\n      description\n      evidenceUrl\n      status\n      createdAt\n    }\n  }\n':
    types.MyDisputesDocument,
  '\n  query Dispute($id: ID!) {\n    dispute(id: $id) {\n      id\n      tenancy {\n        id\n        property {\n          id\n          title\n          image\n          location\n          price\n        }\n      }\n      creator {\n        id\n        firstName\n        lastName\n      }\n      title\n      description\n      evidenceUrl\n      status\n      comments {\n        id\n        sender {\n          id\n          firstName\n          lastName\n        }\n        text\n        createdAt\n      }\n      viewedByLandlordAt\n      viewedByTenantAt\n      createdAt\n      updatedAt\n    }\n  }\n':
    types.DisputeDocument,
  '\n  mutation CreateDispute(\n    $tenancyId: ID!\n    $title: String!\n    $description: String!\n    $evidenceUrl: String\n  ) {\n    createDispute(\n      tenancyId: $tenancyId\n      title: $title\n      description: $description\n      evidenceUrl: $evidenceUrl\n    ) {\n      id\n      status\n    }\n  }\n':
    types.CreateDisputeDocument,
  '\n  mutation AddDisputeComment($id: ID!, $text: String!) {\n    addDisputeComment(id: $id, text: $text) {\n      id\n      comments {\n        id\n        sender {\n          id\n          firstName\n          lastName\n        }\n        text\n        createdAt\n      }\n    }\n  }\n':
    types.AddDisputeCommentDocument,
  '\n  mutation ResolveDispute($id: ID!) {\n    resolveDispute(id: $id) {\n      id\n      status\n    }\n  }\n':
    types.ResolveDisputeDocument,
  '\n  mutation UpdateProfile(\n    $firstName: String\n    $lastName: String\n    $phone: String\n    $bio: String\n    $avatarUrl: String\n  ) {\n    updateProfile(\n      firstName: $firstName\n      lastName: $lastName\n      phone: $phone\n      bio: $bio\n      avatarUrl: $avatarUrl\n    ) {\n      id\n      firstName\n      lastName\n      email\n      userType\n      phone\n      avatarUrl\n      bio\n      createdAt\n      updatedAt\n    }\n  }\n':
    types.UpdateProfileDocument,
  '\n  mutation ChangePassword($currentPassword: String!, $newPassword: String!) {\n    changePassword(currentPassword: $currentPassword, newPassword: $newPassword)\n  }\n':
    types.ChangePasswordDocument,
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
export function graphql(
  source: '\n  mutation Register(\n    $firstName: String!\n    $lastName: String!\n    $email: String!\n    $password: String!\n    $userType: String!\n    $phone: String!\n  ) {\n    register(\n      firstName: $firstName\n      lastName: $lastName\n      email: $email\n      password: $password\n      userType: $userType\n      phone: $phone\n    ) {\n      token\n      user {\n        id\n        firstName\n        lastName\n        email\n        userType\n        phone\n        createdAt\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation Register(\n    $firstName: String!\n    $lastName: String!\n    $email: String!\n    $password: String!\n    $userType: String!\n    $phone: String!\n  ) {\n    register(\n      firstName: $firstName\n      lastName: $lastName\n      email: $email\n      password: $password\n      userType: $userType\n      phone: $phone\n    ) {\n      token\n      user {\n        id\n        firstName\n        lastName\n        email\n        userType\n        phone\n        createdAt\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        id\n        firstName\n        lastName\n        email\n        userType\n        phone\n        createdAt\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        id\n        firstName\n        lastName\n        email\n        userType\n        phone\n        createdAt\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Me {\n    me {\n      id\n      firstName\n      lastName\n      email\n      userType\n      phone\n      avatarUrl\n      bio\n      savedProperties {\n        id\n      }\n      preferences {\n        regions\n        districts\n        types\n        minPrice\n        maxPrice\n        bedrooms\n        amenities\n        parking\n        onboardingStatus\n      }\n      createdAt\n    }\n  }\n',
): (typeof documents)['\n  query Me {\n    me {\n      id\n      firstName\n      lastName\n      email\n      userType\n      phone\n      avatarUrl\n      bio\n      savedProperties {\n        id\n      }\n      preferences {\n        regions\n        districts\n        types\n        minPrice\n        maxPrice\n        bedrooms\n        amenities\n        parking\n        onboardingStatus\n      }\n      createdAt\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation Logout {\n    logout\n  }\n',
): (typeof documents)['\n  mutation Logout {\n    logout\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query MyProperties {\n    myProperties {\n      id\n      title\n      type\n      location\n      region\n      district\n      price\n      verified\n      bedrooms\n      bathrooms\n      size\n      parking\n      about\n      amenities\n      lat\n      lng\n      image\n      images {\n        main\n        kitchen\n        bedroom\n        bathroom\n      }\n      agreementUrl\n      createdAt\n    }\n  }\n',
): (typeof documents)['\n  query MyProperties {\n    myProperties {\n      id\n      title\n      type\n      location\n      region\n      district\n      price\n      verified\n      bedrooms\n      bathrooms\n      size\n      parking\n      about\n      amenities\n      lat\n      lng\n      image\n      images {\n        main\n        kitchen\n        bedroom\n        bathroom\n      }\n      agreementUrl\n      createdAt\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Properties($region: String, $type: String, $minPrice: Float, $maxPrice: Float) {\n    properties(region: $region, type: $type, minPrice: $minPrice, maxPrice: $maxPrice) {\n      id\n      title\n      type\n      location\n      region\n      district\n      price\n      verified\n      bedrooms\n      bathrooms\n      size\n      image\n      about\n      createdAt\n    }\n  }\n',
): (typeof documents)['\n  query Properties($region: String, $type: String, $minPrice: Float, $maxPrice: Float) {\n    properties(region: $region, type: $type, minPrice: $minPrice, maxPrice: $maxPrice) {\n      id\n      title\n      type\n      location\n      region\n      district\n      price\n      verified\n      bedrooms\n      bathrooms\n      size\n      image\n      about\n      createdAt\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query RecommendedProperties(\n    $limit: Int\n    $region: String\n    $type: String\n    $minPrice: Float\n    $maxPrice: Float\n  ) {\n    recommendedProperties(\n      limit: $limit\n      region: $region\n      type: $type\n      minPrice: $minPrice\n      maxPrice: $maxPrice\n    ) {\n      score\n      stars\n      reasons\n      property {\n        id\n        title\n        type\n        location\n        region\n        district\n        price\n        verified\n        bedrooms\n        bathrooms\n        size\n        image\n        about\n        createdAt\n      }\n    }\n  }\n',
): (typeof documents)['\n  query RecommendedProperties(\n    $limit: Int\n    $region: String\n    $type: String\n    $minPrice: Float\n    $maxPrice: Float\n  ) {\n    recommendedProperties(\n      limit: $limit\n      region: $region\n      type: $type\n      minPrice: $minPrice\n      maxPrice: $maxPrice\n    ) {\n      score\n      stars\n      reasons\n      property {\n        id\n        title\n        type\n        location\n        region\n        district\n        price\n        verified\n        bedrooms\n        bathrooms\n        size\n        image\n        about\n        createdAt\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation TrackPropertyView($propertyId: ID!, $durationSec: Float) {\n    trackPropertyView(propertyId: $propertyId, durationSec: $durationSec)\n  }\n',
): (typeof documents)['\n  mutation TrackPropertyView($propertyId: ID!, $durationSec: Float) {\n    trackPropertyView(propertyId: $propertyId, durationSec: $durationSec)\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation SavePreferences($input: PreferencesInput!) {\n    savePreferences(input: $input) {\n      id\n      preferences {\n        regions\n        districts\n        types\n        minPrice\n        maxPrice\n        bedrooms\n        amenities\n        parking\n        onboardingStatus\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation SavePreferences($input: PreferencesInput!) {\n    savePreferences(input: $input) {\n      id\n      preferences {\n        regions\n        districts\n        types\n        minPrice\n        maxPrice\n        bedrooms\n        amenities\n        parking\n        onboardingStatus\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation SkipPreferences($input: PreferencesInput) {\n    skipPreferences(input: $input) {\n      id\n      preferences {\n        regions\n        districts\n        types\n        minPrice\n        maxPrice\n        bedrooms\n        amenities\n        parking\n        onboardingStatus\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation SkipPreferences($input: PreferencesInput) {\n    skipPreferences(input: $input) {\n      id\n      preferences {\n        regions\n        districts\n        types\n        minPrice\n        maxPrice\n        bedrooms\n        amenities\n        parking\n        onboardingStatus\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateProperty($input: CreatePropertyInput!) {\n    createProperty(input: $input) {\n      id\n      title\n      type\n      location\n      region\n      district\n      price\n      verified\n      bedrooms\n      bathrooms\n      size\n      parking\n      about\n      amenities\n      lat\n      lng\n      image\n      images {\n        main\n        kitchen\n        bedroom\n        bathroom\n      }\n      agreementUrl\n      createdAt\n    }\n  }\n',
): (typeof documents)['\n  mutation CreateProperty($input: CreatePropertyInput!) {\n    createProperty(input: $input) {\n      id\n      title\n      type\n      location\n      region\n      district\n      price\n      verified\n      bedrooms\n      bathrooms\n      size\n      parking\n      about\n      amenities\n      lat\n      lng\n      image\n      images {\n        main\n        kitchen\n        bedroom\n        bathroom\n      }\n      agreementUrl\n      createdAt\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Property($id: ID!) {\n    property(id: $id) {\n      id\n      title\n      type\n      location\n      region\n      district\n      price\n      verified\n      bedrooms\n      bathrooms\n      size\n      parking\n      about\n      amenities\n      mapDescription\n      lat\n      lng\n      image\n      images {\n        main\n        kitchen\n        bedroom\n        bathroom\n      }\n      agreementUrl\n      landlord {\n        id\n        firstName\n        lastName\n        email\n        phone\n      }\n      createdAt\n    }\n  }\n',
): (typeof documents)['\n  query Property($id: ID!) {\n    property(id: $id) {\n      id\n      title\n      type\n      location\n      region\n      district\n      price\n      verified\n      bedrooms\n      bathrooms\n      size\n      parking\n      about\n      amenities\n      mapDescription\n      lat\n      lng\n      image\n      images {\n        main\n        kitchen\n        bedroom\n        bathroom\n      }\n      agreementUrl\n      landlord {\n        id\n        firstName\n        lastName\n        email\n        phone\n      }\n      createdAt\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation ToggleSaveProperty($propertyId: ID!) {\n    toggleSaveProperty(propertyId: $propertyId) {\n      id\n      savedProperties {\n        id\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation ToggleSaveProperty($propertyId: ID!) {\n    toggleSaveProperty(propertyId: $propertyId) {\n      id\n      savedProperties {\n        id\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateApplication($input: CreateApplicationInput!) {\n    createApplication(input: $input) {\n      id\n      status\n      createdAt\n    }\n  }\n',
): (typeof documents)['\n  mutation CreateApplication($input: CreateApplicationInput!) {\n    createApplication(input: $input) {\n      id\n      status\n      createdAt\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query MyApplications {\n    myApplications {\n      id\n      property {\n        id\n        title\n        image\n        location\n        price\n        bedrooms\n        bathrooms\n      }\n      nationalIdUrl\n      supportingDocsUrl\n      employerName\n      jobTitle\n      monthlyIncome\n      lengthOfEmployment\n      personalStatement\n      status\n      furtherDetailsRequest\n      furtherDetailsResponse\n      agreementUrl\n      signedAgreementUrl\n      createdAt\n    }\n  }\n',
): (typeof documents)['\n  query MyApplications {\n    myApplications {\n      id\n      property {\n        id\n        title\n        image\n        location\n        price\n        bedrooms\n        bathrooms\n      }\n      nationalIdUrl\n      supportingDocsUrl\n      employerName\n      jobTitle\n      monthlyIncome\n      lengthOfEmployment\n      personalStatement\n      status\n      furtherDetailsRequest\n      furtherDetailsResponse\n      agreementUrl\n      signedAgreementUrl\n      createdAt\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query ReceivedApplications {\n    receivedApplications {\n      id\n      property {\n        id\n        title\n        image\n        location\n        price\n      }\n      tenant {\n        id\n        firstName\n        lastName\n        email\n        phone\n      }\n      nationalIdUrl\n      supportingDocsUrl\n      employerName\n      jobTitle\n      monthlyIncome\n      lengthOfEmployment\n      personalStatement\n      status\n      furtherDetailsRequest\n      furtherDetailsResponse\n      agreementUrl\n      signedAgreementUrl\n      createdAt\n    }\n  }\n',
): (typeof documents)['\n  query ReceivedApplications {\n    receivedApplications {\n      id\n      property {\n        id\n        title\n        image\n        location\n        price\n      }\n      tenant {\n        id\n        firstName\n        lastName\n        email\n        phone\n      }\n      nationalIdUrl\n      supportingDocsUrl\n      employerName\n      jobTitle\n      monthlyIncome\n      lengthOfEmployment\n      personalStatement\n      status\n      furtherDetailsRequest\n      furtherDetailsResponse\n      agreementUrl\n      signedAgreementUrl\n      createdAt\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateApplicationStatus($id: ID!, $status: String!) {\n    updateApplicationStatus(id: $id, status: $status) {\n      id\n      status\n    }\n  }\n',
): (typeof documents)['\n  mutation UpdateApplicationStatus($id: ID!, $status: String!) {\n    updateApplicationStatus(id: $id, status: $status) {\n      id\n      status\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation RequestFurtherDetails($id: ID!, $message: String!) {\n    requestFurtherDetails(id: $id, message: $message) {\n      id\n      status\n      furtherDetailsRequest\n    }\n  }\n',
): (typeof documents)['\n  mutation RequestFurtherDetails($id: ID!, $message: String!) {\n    requestFurtherDetails(id: $id, message: $message) {\n      id\n      status\n      furtherDetailsRequest\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation SubmitFurtherDetails($id: ID!, $response: String!) {\n    submitFurtherDetails(id: $id, response: $response) {\n      id\n      status\n      furtherDetailsResponse\n    }\n  }\n',
): (typeof documents)['\n  mutation SubmitFurtherDetails($id: ID!, $response: String!) {\n    submitFurtherDetails(id: $id, response: $response) {\n      id\n      status\n      furtherDetailsResponse\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query MyNotifications {\n    myNotifications {\n      id\n      title\n      message\n      read\n      link\n      createdAt\n    }\n  }\n',
): (typeof documents)['\n  query MyNotifications {\n    myNotifications {\n      id\n      title\n      message\n      read\n      link\n      createdAt\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation MarkNotificationAsRead($id: ID!) {\n    markNotificationAsRead(id: $id) {\n      id\n      read\n    }\n  }\n',
): (typeof documents)['\n  mutation MarkNotificationAsRead($id: ID!) {\n    markNotificationAsRead(id: $id) {\n      id\n      read\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation ApproveApplicationWithAgreement($id: ID!, $agreementUrl: String!) {\n    approveApplicationWithAgreement(id: $id, agreementUrl: $agreementUrl) {\n      id\n      status\n      agreementUrl\n    }\n  }\n',
): (typeof documents)['\n  mutation ApproveApplicationWithAgreement($id: ID!, $agreementUrl: String!) {\n    approveApplicationWithAgreement(id: $id, agreementUrl: $agreementUrl) {\n      id\n      status\n      agreementUrl\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation SubmitSignedAgreement($id: ID!, $signedAgreementUrl: String!) {\n    submitSignedAgreement(id: $id, signedAgreementUrl: $signedAgreementUrl) {\n      id\n      status\n      signedAgreementUrl\n    }\n  }\n',
): (typeof documents)['\n  mutation SubmitSignedAgreement($id: ID!, $signedAgreementUrl: String!) {\n    submitSignedAgreement(id: $id, signedAgreementUrl: $signedAgreementUrl) {\n      id\n      status\n      signedAgreementUrl\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query MyTenancies {\n    myTenancies {\n      id\n      property {\n        id\n        title\n        image\n        location\n        price\n        bedrooms\n        bathrooms\n        size\n        landlord {\n          id\n          firstName\n          lastName\n          email\n          phone\n        }\n      }\n      tenant {\n        id\n        firstName\n        lastName\n        email\n        phone\n      }\n      status\n      agreementUrl\n      signedAgreementUrl\n      updatedAt\n      createdAt\n    }\n  }\n',
): (typeof documents)['\n  query MyTenancies {\n    myTenancies {\n      id\n      property {\n        id\n        title\n        image\n        location\n        price\n        bedrooms\n        bathrooms\n        size\n        landlord {\n          id\n          firstName\n          lastName\n          email\n          phone\n        }\n      }\n      tenant {\n        id\n        firstName\n        lastName\n        email\n        phone\n      }\n      status\n      agreementUrl\n      signedAgreementUrl\n      updatedAt\n      createdAt\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Tenancy($id: ID!) {\n    tenancy(id: $id) {\n      id\n      property {\n        id\n        title\n        image\n        location\n        price\n        bedrooms\n        bathrooms\n        size\n        landlord {\n          id\n          firstName\n          lastName\n          email\n          phone\n        }\n      }\n      tenant {\n        id\n        firstName\n        lastName\n        email\n        phone\n      }\n      status\n      agreementUrl\n      signedAgreementUrl\n      updatedAt\n      createdAt\n    }\n  }\n',
): (typeof documents)['\n  query Tenancy($id: ID!) {\n    tenancy(id: $id) {\n      id\n      property {\n        id\n        title\n        image\n        location\n        price\n        bedrooms\n        bathrooms\n        size\n        landlord {\n          id\n          firstName\n          lastName\n          email\n          phone\n        }\n      }\n      tenant {\n        id\n        firstName\n        lastName\n        email\n        phone\n      }\n      status\n      agreementUrl\n      signedAgreementUrl\n      updatedAt\n      createdAt\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query MyDisputes {\n    myDisputes {\n      id\n      tenancy {\n        id\n        property {\n          id\n          title\n          image\n          location\n          price\n        }\n      }\n      creator {\n        id\n        firstName\n        lastName\n      }\n      title\n      description\n      evidenceUrl\n      status\n      createdAt\n    }\n  }\n',
): (typeof documents)['\n  query MyDisputes {\n    myDisputes {\n      id\n      tenancy {\n        id\n        property {\n          id\n          title\n          image\n          location\n          price\n        }\n      }\n      creator {\n        id\n        firstName\n        lastName\n      }\n      title\n      description\n      evidenceUrl\n      status\n      createdAt\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Dispute($id: ID!) {\n    dispute(id: $id) {\n      id\n      tenancy {\n        id\n        property {\n          id\n          title\n          image\n          location\n          price\n        }\n      }\n      creator {\n        id\n        firstName\n        lastName\n      }\n      title\n      description\n      evidenceUrl\n      status\n      comments {\n        id\n        sender {\n          id\n          firstName\n          lastName\n        }\n        text\n        createdAt\n      }\n      viewedByLandlordAt\n      viewedByTenantAt\n      createdAt\n      updatedAt\n    }\n  }\n',
): (typeof documents)['\n  query Dispute($id: ID!) {\n    dispute(id: $id) {\n      id\n      tenancy {\n        id\n        property {\n          id\n          title\n          image\n          location\n          price\n        }\n      }\n      creator {\n        id\n        firstName\n        lastName\n      }\n      title\n      description\n      evidenceUrl\n      status\n      comments {\n        id\n        sender {\n          id\n          firstName\n          lastName\n        }\n        text\n        createdAt\n      }\n      viewedByLandlordAt\n      viewedByTenantAt\n      createdAt\n      updatedAt\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateDispute(\n    $tenancyId: ID!\n    $title: String!\n    $description: String!\n    $evidenceUrl: String\n  ) {\n    createDispute(\n      tenancyId: $tenancyId\n      title: $title\n      description: $description\n      evidenceUrl: $evidenceUrl\n    ) {\n      id\n      status\n    }\n  }\n',
): (typeof documents)['\n  mutation CreateDispute(\n    $tenancyId: ID!\n    $title: String!\n    $description: String!\n    $evidenceUrl: String\n  ) {\n    createDispute(\n      tenancyId: $tenancyId\n      title: $title\n      description: $description\n      evidenceUrl: $evidenceUrl\n    ) {\n      id\n      status\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation AddDisputeComment($id: ID!, $text: String!) {\n    addDisputeComment(id: $id, text: $text) {\n      id\n      comments {\n        id\n        sender {\n          id\n          firstName\n          lastName\n        }\n        text\n        createdAt\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation AddDisputeComment($id: ID!, $text: String!) {\n    addDisputeComment(id: $id, text: $text) {\n      id\n      comments {\n        id\n        sender {\n          id\n          firstName\n          lastName\n        }\n        text\n        createdAt\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation ResolveDispute($id: ID!) {\n    resolveDispute(id: $id) {\n      id\n      status\n    }\n  }\n',
): (typeof documents)['\n  mutation ResolveDispute($id: ID!) {\n    resolveDispute(id: $id) {\n      id\n      status\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateProfile(\n    $firstName: String\n    $lastName: String\n    $phone: String\n    $bio: String\n    $avatarUrl: String\n  ) {\n    updateProfile(\n      firstName: $firstName\n      lastName: $lastName\n      phone: $phone\n      bio: $bio\n      avatarUrl: $avatarUrl\n    ) {\n      id\n      firstName\n      lastName\n      email\n      userType\n      phone\n      avatarUrl\n      bio\n      createdAt\n      updatedAt\n    }\n  }\n',
): (typeof documents)['\n  mutation UpdateProfile(\n    $firstName: String\n    $lastName: String\n    $phone: String\n    $bio: String\n    $avatarUrl: String\n  ) {\n    updateProfile(\n      firstName: $firstName\n      lastName: $lastName\n      phone: $phone\n      bio: $bio\n      avatarUrl: $avatarUrl\n    ) {\n      id\n      firstName\n      lastName\n      email\n      userType\n      phone\n      avatarUrl\n      bio\n      createdAt\n      updatedAt\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation ChangePassword($currentPassword: String!, $newPassword: String!) {\n    changePassword(currentPassword: $currentPassword, newPassword: $newPassword)\n  }\n',
): (typeof documents)['\n  mutation ChangePassword($currentPassword: String!, $newPassword: String!) {\n    changePassword(currentPassword: $currentPassword, newPassword: $newPassword)\n  }\n'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
