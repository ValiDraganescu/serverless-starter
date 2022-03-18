import { DocProperty } from 'typescript-openapi-router';

export class StatusData {
    @DocProperty({
        type: 'string',
        isRequired: true,
        description: 'The status message',
    })
    message: string;
}
