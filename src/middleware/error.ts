import {
  Request, Response, NextFunction,
} from 'express';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = err || 500;

  let message: string;
  switch (status) {
    case 400:
      message = 'Плохой запрос';
      break;
    case 401:
      message = 'Не авторизовано';
      break;
    case 403:
      message = 'Доступ запрещен';
      break;
    case 404:
      message = 'Не найдено';
      break;
    case 500:
    default:
      message = 'Внутренняя ошибка сервера';
      break;
  }

  res.status(status).json({
    message,
  });

  next();
};

export default errorHandler;
