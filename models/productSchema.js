import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["Electronics", "Food & Beverages", "Toys", "Books", "Clothing"],
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    productID: {
      type: String,
      default: uuidv4,
      unique: true,
    },
  },
  { collection: "products", timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;