import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    ProductID: {
      type: Number,
      // required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      // required: true,
      unique: true,
      index: true,
    },
    price: {
      type: Number,
      // required: true,
    },
    category: {
      type: String,
      // enum: ["Electronics", "Food & Beverages", "Toys", "Books"],
      // required: true,
    },
    stock: {
      type: Number,
      // required: true,
    },
    image: {
      type: String,
      // required: true,
      unique: true,
      index: true,
    },
    rating: {
      type: Number,
      // required: true,
    },
  },
  {
    collection: "products",
  }
);

const product = mongoose.model("products", productSchema);
export default product;
