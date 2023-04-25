export enum HttpStatusCode {
  unauthorized = 401,
  noContent = 404,
}

export type HttpResponse = {
  statusCode: HttpStatusCode;
  body?: any;
};
