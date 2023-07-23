import { Router } from 'express';
import {
  createProduct,
  getAllProducts,
  getOneProduct,
  removeProduct,
  updateProduct,
} from '../controllers/products.controller.js';

const productRouter = Router();

productRouter.get('/', getAllProducts);

productRouter.get('/:id', getOneProduct);

productRouter.post('/', createProduct);

productRouter.put('/:id', updateProduct);

productRouter.delete('/:id', removeProduct);

export default productRouter;
