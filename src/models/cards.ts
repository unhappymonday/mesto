import mongoose from "mongoose";

interface ICard {
  name: string;
  link: string;
  owner: mongoose.Schema.Types.ObjectId;
  likes?: Array<mongoose.Types.ObjectId>;
  createdAt: Date;
}

const cardSchema = new mongoose.Schema<ICard>({
  name: {
    type: String,
    minlength: [2, "Минимальная длина должна составлять не менее 2 символов"],
    maxlength: [30, "Максимальная длина не должна превышать 30 символов"],
    required: [true, "Поле должно быть заполнено"],
  },
  link: {
    type: String,
    required: [true, "Поле должно быть заполнено"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "Поле должно быть заполнено"],
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<ICard>("card", cardSchema);
