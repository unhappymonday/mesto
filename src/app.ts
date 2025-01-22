import express from 'express';
import mongoose from 'mongoose';

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
