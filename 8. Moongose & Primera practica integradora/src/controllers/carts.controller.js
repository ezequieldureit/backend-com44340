import { cartService } from '../services/carts.service.js';

const createCart = async (req, res) => {
  try {
    const result = await cartService.addCarts();
    res.status(201).json({
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

const getAllCarts = async (req, res) => {
  try {
    const result = await cartService.getCartAll();
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

const getCartById = async (req, res) => {
  try {
    const id = req.params.id;
    const cartById = await cartService.getCartById(id);
    if (!cartById) {
      res.status(404).json({
        status: 'Error',
        motive: 'Cart not found',
        data: {},
      });
    } else {
      res.status(200).json({
        status: 'Success',
        data: cartById,
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

const addProductToCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const cart = await cartService.addProductToCart(cartId, productId);
    if (!cart) {
      res.status(404).json({
        status: 'Error',
        motive: 'Cart not found',
        data: {},
      });
    } else {
      res.status(201).json({
        status: 'Success',
        data: cart,
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

export { createCart, getAllCarts, getCartById, addProductToCart };
