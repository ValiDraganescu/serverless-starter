import 'reflect-metadata';
import {
    ApiRouter,
    getRouter,
    HttpMethod,
    Response,
    Route,
    Router
} from 'typescript-openapi-router';
import { Logger } from '@xtool/logger';
import {getApiConfig} from "../config/api-config";
import {StatusResponse} from "@api/api-interface";

const logger = new Logger("RouterMain");

@ApiRouter(getApiConfig())
export class MainRouter extends Router {
    @Route({
        description: 'returns the doc for this API',
        method: HttpMethod.GET,
        path: `/public/doc`,
        responses: [
            {
                description: 'Returns the OpenApi json for this API',
                statusCode: 200
            }
        ],
        security: [],
        tags: ['API Documentation']
    })
    async getDoc(): Promise<Response<unknown>> {
        logger.log('Get api doc');
        const router = getRouter();
        return new Response<unknown>().setBody(router.getApiDoc('3.0.0'));
    }

    @Route({
        path: `/public/status`,
        method: HttpMethod.GET,
        description: 'API status verification method',
        summary: 'Returns 200 is the API is running',
        responses: [
            {
                statusCode: 200,
                description: 'Current status message',
                body: StatusResponse
            }
        ],
        security: [],
        tags: ['API Status']
    })
    async status(): Promise<Response<StatusResponse>> {
        logger.log('Get status');
        const result = new StatusResponse();
        result.data = { message: 'running' };
        return new Response<StatusResponse>().setBody(result);
    }
}
