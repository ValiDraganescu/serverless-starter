import { DocProperty, InheritedDoc } from 'typescript-openapi-router';
import {ResponseEnvelope, StatusData} from '../model';

@InheritedDoc()
export class StatusResponse extends ResponseEnvelope {
    @DocProperty({
        type: 'object',
        objectType: StatusData.name,
        isRequired: true,
    })
    data: StatusData;
}
