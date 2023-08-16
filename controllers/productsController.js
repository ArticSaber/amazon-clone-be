import cartModel from "../models/shoppingCartModel.js";
import productModel from "../models/productsModel.js";
const PORT = 3500;

const getAllProducts = async (request, response) => {
  try {
    const productData = await productModel.find();
    response.status(200).send(productData);
  } catch (error) {
    response.status(500).json({ ErrorMessage: error.message });
  }
};
const addProductsToCart = async (request, response) => {
  const {
    productID,
    productName,
    productCost,
    productSelectedQuantity,
    productStockQuantity,
  } = request.body;

  const userId = request.userId;

  const totalProductCost = productCost * productSelectedQuantity;

  try {
    await productModel.updateOne(
      { productID: productID },
      { $set: { productStockQuantity: productStockQuantity } }
    );

    const cartData = {
      userId: userId,
      productID: productID,
      productName: productName,
      productCost: productCost,
      productSelectedQuantity: productSelectedQuantity,
      totalProductCost: totalProductCost,
    };

    const newCartData = await cartModel.insertMany(cartData);

    response.status(200).json(newCartData);
  } catch (error) {
    response.status(500).json({ ErrorMessage: error.message });
  }
};

const getFileByName = (request, response) => {
  const { filename } = request.params;
  const parentDirectory = __dirname.split("/controllers")[0];
  const filePath = parentDirectory + "/assets/" + filename;

  response.status(200).sendFile(filePath);
};

const addNewProduct = async (request, response) => {
  try {
    const {
      productID,
      productName,
      productCategory,
      productCost,
      productStockQuantity,
    } = request.body;
    const existingProduct = await productModel.findOne({
      productID: productID,
    });
    if (existingProduct) {
      return response
        .status(400)
        .json({ ErrorMessage: "Product already exists" });
    }
    const { filename } = request.file;

    const productImagePath =
      `http://localhost:${PORT}/api/v1/shoppingCart/assets/` + filename;

    const productData = {
      productID: productID,
      productName: productName,
      productCategory: productCategory,
      productCost: productCost,
      productStockQuantity: productStockQuantity,
      productImagePath: productImagePath,
    };

    const newProduct = await productModel.insertMany(productData);
    console.log(newProduct);
    response.status(200).json(newProduct);
  } catch (error) {
    response.status(500).json({ ErrorMessage: error.message });
  }
};

export { getAllProducts, addNewProduct, getFileByName, addProductsToCart };
