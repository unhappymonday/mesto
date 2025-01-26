import { Request, Response, NextFunction } from "express";
import Users from "../models/users";
import NotFoundError from "../errors/not-found-error";
import BadRequestError from "../errors/bad-request-errors";

export const getAllUsers = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  Users.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Users.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь по указанному _id не найден");
      }
      res.status(200).send(user);
    })
    .catch(next);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  Users.create(req.body)
    .then((user) => {
      res.status(200).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        throw new BadRequestError(
          "Переданы некорректные данные при создании пользователя"
        );
      } else {
        next(err);
      }
    });
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  Users.findByIdAndUpdate((req as any).user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь с указанным _id не найден");
      }
      res.status(200).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        throw new BadRequestError(
          "Переданы некорректные данные при обновлении профиля"
        );
      } else {
        next(err);
      }
    });
};

export const updateAvatar = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Users.findByIdAndUpdate(req.params.userId, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      const { avatar } = req.body;
      if (!avatar) {
        throw new NotFoundError("Пользователь не найден");
      }
      const avatarUrl = avatar;
      res.status(200).send({
        message: "Аватар обновлен",
        avatar: avatarUrl,
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        throw new BadRequestError("Переданы некорректные данные");
      } else {
        next(err);
      }
    });
};
