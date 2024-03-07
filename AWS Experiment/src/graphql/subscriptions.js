/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onCreateTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onUpdateTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($filter: ModelSubscriptionTodoFilterInput) {
    onDeleteTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateUserLog = /* GraphQL */ `
  subscription OnCreateUserLog($filter: ModelSubscriptionUserLogFilterInput) {
    onCreateUserLog(filter: $filter) {
      id
      name
      log
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateUserLog = /* GraphQL */ `
  subscription OnUpdateUserLog($filter: ModelSubscriptionUserLogFilterInput) {
    onUpdateUserLog(filter: $filter) {
      id
      name
      log
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteUserLog = /* GraphQL */ `
  subscription OnDeleteUserLog($filter: ModelSubscriptionUserLogFilterInput) {
    onDeleteUserLog(filter: $filter) {
      id
      name
      log
      createdAt
      updatedAt
      __typename
    }
  }
`;
