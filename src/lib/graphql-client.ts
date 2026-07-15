import { TypedDocumentNode } from "@graphql-typed-document-node/core";

const GQL_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:4000/graphql";

function printAST(node: any): string {
  if (!node) return "";
  if (Array.isArray(node)) {
    return node.map(printAST).join("\n");
  }
  switch (node.kind) {
    case "Document":
      return node.definitions.map(printAST).join("\n\n");
    case "OperationDefinition":
      const op = node.operation;
      const name = node.name ? " " + node.name.value : "";
      const vars =
        node.variableDefinitions && node.variableDefinitions.length > 0
          ? `(${node.variableDefinitions.map(printAST).join(", ")})`
          : "";
      return `${op}${name}${vars} ${printAST(node.selectionSet)}`;
    case "VariableDefinition":
      return `$${node.variable.name.value}: ${printAST(node.type)}`;
    case "NamedType":
      return node.name.value;
    case "NonNullType":
      return `${printAST(node.type)}!`;
    case "ListType":
      return `[${printAST(node.type)}]`;
    case "SelectionSet":
      return `{ ${node.selections.map(printAST).join(" ")} }`;
    case "Field":
      const alias = node.alias ? node.alias.value + ": " : "";
      const args =
        node.arguments && node.arguments.length > 0
          ? `(${node.arguments.map(printAST).join(", ")})`
          : "";
      const sel = node.selectionSet ? " " + printAST(node.selectionSet) : "";
      return `${alias}${node.name.value}${args}${sel}`;
    case "Argument":
      return `${node.name.value}: ${printAST(node.value)}`;
    case "Variable":
      return `$${node.name.value}`;
    case "IntValue":
    case "FloatValue":
    case "StringValue":
    case "BooleanValue":
    case "EnumValue":
      return JSON.stringify(node.value);
    default:
      return "";
  }
}

export async function requestGQL<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables,
): Promise<TResult> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  let queryBody = (document as any).loc?.source?.body;
  if (!queryBody) {
    queryBody = printAST(document);
  }

  if (!queryBody) {
    throw new Error("GraphQL Document must have a source body");
  }

  const response = await fetch(GQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: "include",
    cache: "no-store",
    body: JSON.stringify({
      query: queryBody,
      variables,
    }),
  });

  const body = await response.json();
  if (body.errors) {
    throw new Error(body.errors[0]?.message || "GraphQL Request Error");
  }

  return body.data as TResult;
}
