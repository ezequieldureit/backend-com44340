import { productService } from '../services/products.service.js';

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.find();
    res.status(200).json({
      status: 'Success',
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      motive: error.message,
      data: {},
    });
  }
};
const getOneProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productService.findById(id);
    if (!product) {
      res.status(404).json({
        status: 'Error',
        motive: 'Product not found',
        data: {},
      });
    } else {
      res.status(200).json({
        status: 'Success',
        data: product,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      motive: error.message,
      data: {},
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    const createdProduct = await productService.create(newProduct);
    res.status(201).json({
      status: 'Success',
      data: createdProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      motive: error.message,
      data: {},
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedProduct = req.body;
    const result = await productService.findByIdAndUpdate(id, updatedProduct, {
      new: true,
    });
    if (!result) {
      res.status(404).json({
        status: 'Error',
        motive: 'Product not found',
        data: {},
      });
    } else {
      res.status(200).json({
        status: 'Success',
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      motive: error.message,
      data: {},
    });
  }
};

const removeProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await productService.findByIdAndDelete(id);
    res.status(200).json({
      status: 'Success',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      motive: error.message,
      data: {},
    });
  }
};

export {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  removeProduct
};