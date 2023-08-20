import productModel from "../models/productsModel.js"; 
const getAllProducts = async (request, response) => {
  try {
    const productData = await productModel.find();
    response.status(200).send(productData);
  } catch (error) {
    response.status(500).json({ ErrorMessage: error.message });
  }
};

export { getAllProducts };
