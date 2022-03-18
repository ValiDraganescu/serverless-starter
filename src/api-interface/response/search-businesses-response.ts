import {BusinessSearchResponseData, ResponseEnvelope} from "../model";
import {DocProperty, InheritedDoc} from "typescript-openapi-router";

@InheritedDoc()
export class SearchBusinessesResponse extends ResponseEnvelope {
    @DocProperty({
        type: 'object',
        objectType: BusinessSearchResponseData.name,
        isRequired: false
    })
    data: BusinessSearchResponseData;
}