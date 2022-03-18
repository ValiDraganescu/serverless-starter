import { DocProperty } from 'typescript-openapi-router';

export class ApiError {
    @DocProperty({
        type: 'string',
        isRequired: false,
    })
    code?: string;

    @DocProperty({
        type: 'string',
        isRequired: false,
    })
    message?: string;
}
