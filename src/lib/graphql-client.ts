import { TypedDocumentNode } from '@graphql-typed-document-node/core';

const GQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql';

export async function requestGQL<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables,
): Promise<TResult> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const queryBody = (document as any).loc?.source?.body;
  if (!queryBody) {
    throw new Error('GraphQL Document must have a source body');
  }

  const response = await fetch(GQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: 'include',
    body: JSON.stringify({
      query: queryBody,
      variables,
    }),
  });

  const body = await response.json();
  if (body.errors) {
    throw new Error(body.errors[0]?.message || 'GraphQL Request Error');
  }

  return body.data as TResult;
}
