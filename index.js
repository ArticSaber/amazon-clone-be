import express from "express";
const app = express();
import shoppingCartRouter from "./routes/shoppingCartRoute.js";
import authRoute from "./routes/authRoute.js";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
app.use(cors());
app.use(express.json());
const PORT = 3500;

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  });
const db = mongoose.connection;
db.on("error", (errorMessage) => console.log(errorMessage));
db.once("open", () => console.log(`Connected successfully to database`));


app.use("/api/v1/shoppingCart", shoppingCartRouter);
app.use("/api/v1/auth", authRoute);

app.listen(
  PORT,
  console.log(
    `Server started running at http://localhost:${PORT}/api/v1/shoppingCart/`
  )
);

