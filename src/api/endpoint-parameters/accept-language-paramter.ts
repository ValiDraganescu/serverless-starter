import {DocParameter} from "typescript-openapi-router/dist/doc/model/parameter";

export const acceptLanguageParameter: DocParameter = {
  name: 'Accept-Language',
  in: 'header',
  description: 'Set the code of the required language. The API will return content in that lang if exists. Lang defaults to en',
  required: false,
  schema: {
    type: 'string',
    enum: ['en', 'fr', 'ro']
  },
};