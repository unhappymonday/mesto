import mongoose from "mongoose";

interface IUser {
  name: string;
  about: string;
  avatar: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    minlength: [2, "Минимальная длина должна составлять не менее 2 символов"],
    maxlength: [30, "Максимальная длина не должна превышать 30 символов"],
    required: [true, "Поле должно быть заполнено"],
  },
  about: {
    type: String,
    minlength: [2, "Минимальная длина должна составлять не менее 2 символов"],
    maxlength: [200, "Максимальная длина не должна превышать 200 символов"],
    required: [true, "Поле должно быть заполнено"],
  },
  avatar: {
    type: String,
    required: [true, "Поле должно быть заполнено"],
  },
});

export default mongoose.model<IUser>("user", userSchema);
