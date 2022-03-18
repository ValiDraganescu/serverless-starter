import {HttpMethod, Response, Route, Router, StatusCode} from "typescript-openapi-router";
import {BusinessSearchResponseData, SearchBusinessesRequest} from "@api/api-interface";
import {searchParameters} from "../../endpoint-parameters/search-paramters";
import {searchImplementation} from "./service/old-api-search";

export class TravelerBusinessesRouter extends Router {

    @Route({
        path: '/private/search',
        method: HttpMethod.GET,
        description: 'some description',
        parameters: searchParameters,
        responses: [
            {
                description: 'Returns a list of business',
                statusCode: StatusCode.okay,
                body: BusinessSearchResponseData,
            }
        ]
    })
    async search(request: SearchBusinessesRequest): Promise<Response<BusinessSearchResponseData>> {
        return await searchImplementation(request);
    }
}