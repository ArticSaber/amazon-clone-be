import express from "express";
const router = express.Router();
import imageUpload from "../middlewares/imageUpload.js";
import {
  getAllProducts,
  addNewProduct,
  getFileByName,
} from "../controllers/productsController.js";
import {
  addProductsToCart,
  getUserCartItems,
  getCartTotal,
  checkOutCart,
  removeCartItem,
  updateCartItemQuantity,
} from "../controllers/shoppingCartController.js";

router.route("/").get(getAllProducts);

router.route("/assets/:filename").get(getFileByName);

router.route("/upload").post(imageUpload.single("productImage"), addNewProduct);

router.route("/cart/:id").get(getUserCartItems);

router.route("/cartTotal").get(getCartTotal);

router.route("/cart").post(addProductsToCart);

router.route("/checkout").delete(checkOutCart);
router.route("/cart").post(addProductsToCart);
router
  .route("/cart/:cartItemId")
  .put(updateCartItemQuantity)
  .delete(removeCartItem);

export default router;
