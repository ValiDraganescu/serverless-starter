import {DocParameter} from "typescript-openapi-router/dist/doc/model/parameter";

export const locationParameter: DocParameter = {
    name: 'location',
    in: 'query',
    description: 'lat, lon (45.756721, 21.228722) - the location around which the search will be made',
    required: false,
    schema: {
        type: 'string'
    }
}