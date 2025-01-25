import { NextFunction, Request, Response } from "express";
import Cards from "../models/cards";
import NotFoundError from "../errors/not-found-error";

export const getAllCards = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  Cards.find({})
    .populate("owner")
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

export const getCardById = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  Cards.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Карточка не найдена");
      }
      res.status(200).send(card);
    })
    .catch((err) => res.status(500).send(err));
};

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;

  Cards.create({ name, link, owner: (req as any).user._id })
    .then((card) =>
      res.status(200).send({
        name: card.name,
        link: card.link,
      })
    )
    .catch((err) => res.status(500).send(err));
};

export const createCardLike = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: (req as any).user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Карточка не найдена");
      }
      res.status(200).send(card);
    })
    .catch(next);
};

export const deleteCardLike = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: (req as any).user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Карточка не найдена");
      }
      res.status(200).send(card);
    })
    .catch(next);
};
