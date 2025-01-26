import { celebrate, Joi } from "celebrate";

export const cardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required().messages({
      "string.min": "Минимальная длина должна составлять не менее 2 символов",
      "string.max": "Максимальная длина не должна превышать 30 символов",
    }),
    link: Joi.string()
      .pattern(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
      )
      .required(),
  }),
});
