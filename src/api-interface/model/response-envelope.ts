import { DocProperty, Envelope } from 'typescript-openapi-router';
import {ApiError} from "./api-error";

export class ResponseEnvelope implements Envelope {
    @DocProperty({
        type: 'array',
        objectType: ApiError.name,
        isRequired: false,
    })
    errors?: ApiError[];
}
