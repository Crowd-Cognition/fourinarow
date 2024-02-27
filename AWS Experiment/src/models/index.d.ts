import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerTodo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Todo, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTodo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Todo, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Todo = LazyLoading extends LazyLoadingDisabled ? EagerTodo : LazyTodo

export declare const Todo: (new (init: ModelInit<Todo>) => Todo) & {
  copyOf(source: Todo, mutator: (draft: MutableModel<Todo>) => MutableModel<Todo> | void): Todo;
}

type EagerData = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Data, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly log_data: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyData = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Data, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly log_data: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Data = LazyLoading extends LazyLoadingDisabled ? EagerData : LazyData

export declare const Data: (new (init: ModelInit<Data>) => Data) & {
  copyOf(source: Data, mutator: (draft: MutableModel<Data>) => MutableModel<Data> | void): Data;
}