import {APIGatewayEventRequestContext, APIGatewayProxyResultV2, S3Event} from 'aws-lambda';
import {MainRouter} from "../endpoints/main-router";
import {lambdaHandler} from "./lambda";
import {APIGatewayProxyEventV2WithRequestContext} from "aws-lambda/trigger/api-gateway-proxy";
import 'reflect-metadata';
import {Logger} from "@xtool/logger";
import {Response, StatusCode} from "typescript-openapi-router";
import {ResponseEnvelope} from "@api/api-interface";

const router = new MainRouter();
const logger = new Logger('main');

export async function main(
    event: APIGatewayProxyEventV2WithRequestContext<APIGatewayEventRequestContext> & S3Event,
): Promise<APIGatewayProxyResultV2> {
    try {
        return lambdaHandler(router, event);
    } catch (err) {
        logger.error(err);
        return new Response<ResponseEnvelope>(
            StatusCode.internalServerError
        ).setBody({
            errors: [
                {
                    code: 'unknown-error',
                    message: err.message
                }
            ]
        });
    }

}

