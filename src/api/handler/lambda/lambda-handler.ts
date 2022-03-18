import {HttpMethod, Request, Response, Router, StatusCode} from "typescript-openapi-router";
import {APIGatewayEventRequestContext, S3Event} from "aws-lambda";
import {ResponseEnvelope} from "@api/api-interface";
import {APIGatewayProxyEventV2WithRequestContext} from "aws-lambda/trigger/api-gateway-proxy";
import {Logger} from "@xtool/logger";

const logger = new Logger('lambdaHandler');

const getRequestFromHttpEvent = (
    event: APIGatewayProxyEventV2WithRequestContext<APIGatewayEventRequestContext>,
    parsedBody: any
): Request => {
    const queryString: any = event.queryStringParameters ?? null;
    const headers: any = event.headers;

    return new Request({
        headers: headers,
        path: event.requestContext.path,
        method: event.requestContext.httpMethod as HttpMethod,
        body: parsedBody,
        rawBody: event.body,
        queryParams: queryString
    });
};

const getRequestFromS3Event = (event: S3Event): Request => {
    logger.log('Processing s3 event to router request', JSON.stringify(event));
    const mainRecord = event.Records[0];
    return new Request({
        method: HttpMethod.POST,
        path: `/private/s3/${mainRecord.s3.bucket.name}`,
        body: event
    });
};

const getRequestFromWsEvent = (event: any, parsedBody: any) => {
    const path = parsedBody?.action ?? 'weather-station';
    return new Request({
        headers: event.headers,
        method: HttpMethod.POST,
        path: `/private/websocket/${path}/${event.requestContext.eventType}`,
        body: parsedBody
    });
};


const getBodyFromError = (e: any) => ({
    errors: [
        {
            code: '1',
            message: e.message
        }
    ]
});

export const lambdaHandler = async (
    router: Router,
    event: APIGatewayProxyEventV2WithRequestContext<APIGatewayEventRequestContext> & S3Event
): Promise<Response<ResponseEnvelope>> => {
    let parsedBody: any;
    if (event.body) {
        try {
            parsedBody = JSON.parse(event.body);
        } catch (e: any) {
            console.error('error parsing body', e);
            return new Response<ResponseEnvelope>(StatusCode.badRequest).setBody(getBodyFromError(e));
        }
    }
    let request;
    if (event.Records) {
        console.log('S3 event');
        request = getRequestFromS3Event(event);
    } else if (event.requestContext?.connectionId) {
        console.log('websocket event');
        request = getRequestFromWsEvent(event, parsedBody);
    } else {
        console.log('http event');
        request = getRequestFromHttpEvent(event, parsedBody);
    }
    try {
        return router.handleEvent(request);
    } catch (e: any) {
        return new Response<ResponseEnvelope>(
            StatusCode.internalServerError
        ).setBody({
            errors: [
                {
                    code: '1',
                    message: e.message
                }
            ]
        });
    }
};