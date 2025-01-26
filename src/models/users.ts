import mongoose from "mongoose";

export interface IUser {
  name: string;
  about: string;
  avatar: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, "Поле должно быть заполнено"],
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    required: [true, "Поле должно быть заполнено"],
  },
  avatar: {
    type: String,
    required: [true, "Поле должно быть заполнено"],
  },
});

export default mongoose.model<IUser>("user", userSchema);
