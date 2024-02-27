// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Todo, Data } = initSchema(schema);

export {
  Todo,
  Data
};