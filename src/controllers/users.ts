import { Request, Response, NextFunction } from "express";
import Users from "../models/users";

export const getAllUsers = (req: Request, res: Response) => {
  Users.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => res.status(500).send(err));
};

export const getUserById = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  Users.findById(req.params.userId)
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(500).send(err));
};

export const createUser = (req: Request, res: Response) => {
  Users.create(req.body)
    .then((user) =>
      res.status(200).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      })
    )
    .catch((err) => res.status(500).send(err));
};

export const updateUser = (req: Request, res: Response) => {
  Users.findByIdAndUpdate((req as any).user._id, req.body, { new: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(500).send(err));
};

export const updateAvatar = (req: Request, res: Response) => {
  Users.findByIdAndUpdate(req.params.userId, req.body, { new: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(500).send(err));
};
