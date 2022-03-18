import { AfterMiddlewareHandler, Response } from 'typescript-openapi-router';

export const corsMiddleware: AfterMiddlewareHandler = async (
  response: Response<any>
): Promise<Response<any>> => {
  response.headers['Access-Control-Allow-Origin'] = '*';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  response.headers['Access-Control-Allow-Credentials'] = true;
  return response;
};
