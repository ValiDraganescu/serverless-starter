import { IMiddleware } from 'typescript-openapi-router';
import { logRequest, logResponse } from './log-middleware';
import { corsMiddleware } from './cors-middleware';

export const globalMiddleware: IMiddleware = {
    before: [
        logRequest
    ],
    after: [
        corsMiddleware,
        logResponse
    ]
};
