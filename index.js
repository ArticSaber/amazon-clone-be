import express from "express";
import dbConnection from "./db/dbConnection.js";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import productRoute from "./routes/productRoute.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";


dotenv.config();

const corsOptions = {
  origin: ["http://localhost:5173", "https://amazon-kaarthik.vercel.app/"],
  credentials: true,
};

const PORT = process.env.PORT || 3500;
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));
app.use("/api/v1/products", productRoute);
app.use("/api/v1/auth", authRoute);


const connection = () => {
  try {
    dbConnection(process.env.DB_URL);
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
  } catch (error) {
    console.log("Error in connecting to DB", error);
  }
};

connection();