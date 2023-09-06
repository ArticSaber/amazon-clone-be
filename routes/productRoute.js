import express from "express";
const router = express.Router();
import {
  getAllProducts,
  createProduct,
  upload,
} from "../controllers/productsController.js";


router.route("/").get(getAllProducts);
router.route("/add").post(upload.single("image"), createProduct);
router.route("/upload").post(upload.single("image") , createProduct);

export default router;
