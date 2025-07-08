export interface IHttpResult<T> {
  status: string;
  message: string;
  data: T;
  errors: null;
}
