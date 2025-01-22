import { Request, Response } from 'express';
import Users from '../models/users';

export const getAllUsers = (res: Response) => {
  Users.find()
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send(err));
};

export const getUserById = (req: Request, res: Response) => {
  Users.findById(req.params.id)
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(500).send(err));
};

export const createUser = (req: Request, res: Response) => {
  Users.create(req.body)
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(500).send(err));
};
