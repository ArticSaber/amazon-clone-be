import multer from "multer";
import productModel from "../models/productSchema.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import  writeFile  from "fs/promises";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const getAllProducts = async (request, response) => {
  try {
    const productData = await productModel.find();
    response.status(200).send(productData);
  } catch (error) {
    response.status(500).json({ ErrorMessage: error.message });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const createProduct = async (request, response) => {
  try {
    const { title, price, category, stock, description, rating } = request.body;
    const file = request.file;
    console.log(file);
    // const { secure_url } = await cloudinary.uploader.upload(file.path, {
    //   public_id: file.originalname,
    //   folder: "products",
    // });
    // const productData = new productModel({
    //   title,
    //   price,
    //   category,
    //   stock,
    //   description,
    //   image: secure_url,
    //   rating,
    // });
    // await productData.save();
    // response.status(201).json(productData);
  } catch (error) {
    response.status(500).json({ ErrorMessage: error.message });
  }
};

export { getAllProducts, createProduct, upload };
