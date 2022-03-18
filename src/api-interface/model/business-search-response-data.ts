import {DocProperty} from "typescript-openapi-router";

export class BusinessSearchResponseData {

    @DocProperty({
        type: 'number',
        isRequired: false
    })
    id: number
}