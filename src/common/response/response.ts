interface ErrorResponse {
  message: string;
  details: any | null;
}

class MapResponse {
  constructor(
    public data: any,
    public statusCode: number,
    public error: ErrorResponse | null
  ) {}
}

export function succussRequestResponse(
  statusCode: number,
  data: any,
  res: any
) {
  res.status(statusCode).json(new MapResponse(data, statusCode, null));
}

export function failedRequestResponse(
  statusCode: number,
  error: ErrorResponse,
  res: any
) {
  res.status(statusCode).json(new MapResponse(null, statusCode, error));
}
