import { Request, Response } from 'express';
import Cards from '../models/cards';

export const getAllCards = (res: Response) => {
  Cards.find()
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send(err));
};

export const getCardById = (req: Request, res: Response) => {
  Cards.findById(req.params.id)
    .then((card) => res.status(200).send(card))
    .catch((err) => res.status(500).send(err));
};

export const createCard = (req: Request, res: Response) => {
  console.log((req as any).user._id);
  Cards.create(req.body)
    .then((card) => res.status(200).send({
      name: card.name,
      link: card.link,
    }))
    .catch((err) => res.status(500).send(err));
};

export const createCardLike = (req: Request, res: Response) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: (req as any).user._id } },
    { new: true },
  )
    .then((card) => res.status(200).send({
      name: card?.name,
      link: card?.link,
    }))
    .catch((err) => res.status(500).send(err));
};

export const deleteCardLike = (req: Request, res: Response) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: (req as any).user._id } },
    { new: true },
  )
    .then((card) => res.status(200).send({
      name: card?.name,
      link: card?.link,
    }))
    .catch((err) => res.status(500).send(err));
};
