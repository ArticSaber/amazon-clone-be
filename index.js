import express from "express";
const app = express();
import shoppingCartRouter from "./routes/shoppingCartRoute.js";
import authRoute from "./routes/authRoute.js";
import mongoose from "mongoose";
import {} from "dotenv/config.js";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
const PORT = 3500;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (errorMessage) => console.log(errorMessage));
db.once("open", () => console.log(`Connected successfully to database`));

app.use("/api/v1/shoppingcart", shoppingCartRouter);
app.use("/api/v1/auth", authRoute);

app.listen(
  PORT,
  console.log(
    `Server started running at http://localhost:${PORT}/api/v1/shoppingcart/`
  )
);

export default app;