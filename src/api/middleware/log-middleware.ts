import {
  AfterMiddlewareHandler,
  BeforeMiddlewareHandler,
  Request,
  Response,
} from 'typescript-openapi-router';
import { Logger } from '@xtool/logger';

const logger = new Logger('log-middleware');

export const logRequest: BeforeMiddlewareHandler = async (
  request: Request
): Promise<[Request, Response<any> | null]> => {
  logger.log('================ REQUEST START ================');
  logger.log('Received request', JSON.stringify(request));
  logger.log('================ REQUEST PROCESSING START ================');
  return [request, null];
};

export const logResponse: AfterMiddlewareHandler = async (
  response: Response<any>
): Promise<Response<any>> => {
  logger.log('================ REQUEST PROCESSING END ================');
  logger.log('Returning response', JSON.stringify(response));
  logger.log('================ REQUEST END ================');
  return response;
};
