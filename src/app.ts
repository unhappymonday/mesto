import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import userRouter from "./routes/users";
import cardRouter from "./routes/cards";
import errorHandler from "./middleware/error-handler";
import { errors } from "celebrate";

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/mestodb");

app.use((req: Request, _res: Response, next: NextFunction) => {
  (req as any).user = {
    _id: "6791432b20ecafdce4ee3f39",
  };

  next();
});
app.use("/users", userRouter);
app.use("/cards", cardRouter);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
