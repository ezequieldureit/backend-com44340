import express from 'express';
import {
  addProductToCart,
  createCart,
  getAllCarts,
  getCartById,
} from '../controllers/carts.controller.js';

const cartRouter = express.Router();

cartRouter.use(express.json());
cartRouter.use(express.urlencoded({ extended: true }));

cartRouter.post('/', createCart);

cartRouter.get('/', getAllCarts);

cartRouter.get('/:id', getCartById);

cartRouter.post('/:cid/products/:pid', addProductToCart);

export default cartRouter;
