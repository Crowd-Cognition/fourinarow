/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUserLog = /* GraphQL */ `
  query GetUserLog($id: ID!) {
    getUserLog(id: $id) {
      id
      name
      log
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUserLogs = /* GraphQL */ `
  query ListUserLogs(
    $filter: ModelUserLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserLogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        log
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
