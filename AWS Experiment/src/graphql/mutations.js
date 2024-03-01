/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createUserLog = /* GraphQL */ `
  mutation CreateUserLog(
    $input: CreateUserLogInput!
    $condition: ModelUserLogConditionInput
  ) {
    createUserLog(input: $input, condition: $condition) {
      id
      name
      log
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateUserLog = /* GraphQL */ `
  mutation UpdateUserLog(
    $input: UpdateUserLogInput!
    $condition: ModelUserLogConditionInput
  ) {
    updateUserLog(input: $input, condition: $condition) {
      id
      name
      log
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteUserLog = /* GraphQL */ `
  mutation DeleteUserLog(
    $input: DeleteUserLogInput!
    $condition: ModelUserLogConditionInput
  ) {
    deleteUserLog(input: $input, condition: $condition) {
      id
      name
      log
      createdAt
      updatedAt
      __typename
    }
  }
`;
