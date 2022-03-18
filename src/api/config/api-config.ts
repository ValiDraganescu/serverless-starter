import {ApiInfo, StatusCode} from "typescript-openapi-router";
import {ResponseEnvelope} from "@api/api-interface";
import {globalMiddleware} from "../middleware/global-middleware";
import {TravelerBusinessesRouter} from "../endpoints/traveler/traveler-businesses-router";

export const getApiConfig = (): ApiInfo => {
    return {
        version: process.env.API_VERSION ?? '1',
        title: `api title`,
        securitySchemes: {
            ApiKeyAuth: {
                type: 'apiKey',
                in: 'header',
                name: 'x-api-key'
            },
            BearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        },
        security: [
            {
                ApiKeyAuth: []
            },
            {
                BearerAuth: []
            }
        ],
        servers: [
            {
                url: `http://localhost:8082`,
                description: 'localhost for api'
            },
            {
                url: 'https://dev.someapi.com',
                description: 'Development environment for the api'
            },
            {
                url: 'https://prod.someapi.com',
                description: 'Production environment for the api '
            }
        ],
        additionalRouters: [
            TravelerBusinessesRouter
        ],
        globalResponses: [
            {
                statusCode: StatusCode.internalServerError,
                description: 'Internal server error',
                body: ResponseEnvelope
            },
            {
                statusCode: StatusCode.badRequest,
                description: 'Bad request',
                body: ResponseEnvelope
            },
            {
                statusCode: StatusCode.unauthorized,
                description: 'Unauthorized',
                body: ResponseEnvelope
            },
            {
                statusCode: StatusCode.forbidden,
                description: 'Forbidden',
                body: ResponseEnvelope
            },
            {
                statusCode: StatusCode.notFound,
                description: 'Not found',
                body: ResponseEnvelope
            },
            {
                statusCode: StatusCode.notImplemented,
                description: 'Not implemented'
            }
        ],
        globalMiddleware: globalMiddleware
    };
};