export interface IClubHttpResult<T> {
  status: boolean;
  result: T;
  error: unknown;
  errors: unknown;
  statusCode: number;
  statusMessage: string;
  resultMessage: string;
}

export interface ITableResult<T> {
  pageNumber: number;
  maxPages: number;
  totalCount: number;
  hasNext: boolean;
  hasPrevious: boolean;
  data: T;
}
