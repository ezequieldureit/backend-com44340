import { ProductModel } from "../DAO/models/products.model.js";

class ProductService {
  async create(newProduct) {
    try {
      const createdProduct = await ProductModel.create(newProduct);
      return createdProduct;
    } catch (error) {
      console.error("Error creating product:", error);
      throw new Error("Error creating product");
    }
  }

  async find() {
    try {
      const products = await ProductModel.find();
      return products;
    } catch (error) {
      console.error("Error finding products:", error);
      throw new Error("Error finding products");
    }
  }

  async findById(id) {
    try {
      const product = await ProductModel.findById(id);
      return product;
    } catch (error) {
      console.error("Error finding product by ID:", error);
      throw new Error("Error finding product by ID");
    }
  }

  async findByIdAndUpdate(id, updatedProduct) {
    try {
      const result = await ProductModel.findByIdAndUpdate(id, updatedProduct, {
        new: true,
      });
      return result;
    } catch (error) {
      console.error("Error updating product:", error);
      throw new Error("Error updating product");
    }
  }

  async findByIdAndDelete(id) {
    try {
      const result = await ProductModel.findOneAndDelete(id);
      return result;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw new Error("Error deleting product");
    }
  }
  async findByNameAndDelete(title) {
    try {
      const result = await ProductModel.deleteOne({title: title});
      return result;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw new Error("Error deleting product");
    }
  }
}

export const productService = new ProductService();
