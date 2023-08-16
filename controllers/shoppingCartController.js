import cartModel from "../models/shoppingCartModel.js";
import productModel from "../models/productsModel.js";
const cartItemsArray = [0];

const addProductsToCart = async (request, response) => {
  const {
    productID,
    productName,
    productCost,
    productSelectedQuantity,
    productStockQuantity,
  } = request.body;
  const totalProductCost = productCost * productSelectedQuantity;
  cartItemsArray[0] += totalProductCost;
  const totalCartCost = cartItemsArray[0];

  const cartData = {
    productID: productID,
    productName: productName,
    productCost: productCost,
    productSelectedQuantity: productSelectedQuantity,
    totalProductCost: totalProductCost,
    totalCartCost: totalCartCost,
  };
  try {
    const updatedStock = await productModel.updateOne(
      { productID: productID },
      { $set: { productStockQuantity: productStockQuantity } }
    );
    const newCartData = await cartModel.insertMany(cartData);
    response.status(200).json(newCartData);
  } catch (error) {
    response.status(500).json({ ErrorMessage: error.message });
  }
};

const removeCartItem = async (request, response) => {
  const { cartItemId } = request.params;

  try {
    // Remove the cart item
    await cartModel.findByIdAndRemove(cartItemId);

    response.status(200).json({ message: "Cart item removed successfully" });
  } catch (error) {
    response.status(500).json({ ErrorMessage: error.message });
  }
};

const updateCartItemQuantity = async (request, response) => {
  const { cartItemId, newQuantity } = request.body;

  try {
    const updatedCartItem = await cartModel.findByIdAndUpdate(
      cartItemId,
      { productSelectedQuantity: newQuantity },
      { new: true }
    );

    response.status(200).json(updatedCartItem);
  } catch (error) {
    response.status(500).json({ ErrorMessage: error.message });
  }
};


const getUserCartItems = async (request, response) => {
  const { userId } = request.params;

  try {
    const cartItems = await cartModel.find({ userId: userId });
    response.status(200).json(cartItems);
  } catch (error) {
    response.status(500).json({ ErrorMessage: error.message });
  }
};

const getCartTotal = async (request, response) => {
  try {
    const cartDataItems = await cartModel.find({}).sort({ _id: -1 }).limit(1);
    response.status(200).json(cartDataItems);
  } catch (error) {
    response.status(500).json({ ErrorMessage: error.message });
  }
};

const checkOutCart = async (request, response) => {
  try {
    const checkOutData = await cartModel.collection.drop();
    response.status(200).json(checkOutData);
  } catch (error) {
    response.status(500).json({ ErrorMessage: error.message });
  }
};

export {
  addProductsToCart,
  getUserCartItems,
  getCartTotal,
  checkOutCart,
  removeCartItem,
  updateCartItemQuantity,
};
