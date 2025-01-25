import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { constants } from "http2";

const errorHandler: ErrorRequestHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode =
    err.statusCode || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
  const message =
    statusCode === constants.HTTP_STATUS_INTERNAL_SERVER_ERROR
      ? "На сервере произошла ошибка"
      : err.message;

  res.status(statusCode).send({ message, statusCode: statusCode });
};

export default errorHandler;
