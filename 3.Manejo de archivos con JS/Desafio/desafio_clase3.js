const fs = require("fs");

class ProductManager {
  #products;
  static lastID = 0;
  constructor(path) {
    this.#products = [];
    this.path = path
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return console.log("Todos los campos son obligatorios");
    }

    const existingProduct = this.#products.find(
      (product) => product.code === code
    );
    if (existingProduct) {
      return console.log(
        `Error: el código ${code} ya está siendo utilizado por otro producto.`
      );
    }

    const product = {
      id: ++ProductManager.lastID,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.#products.push(product);
    this.saveProductsToFile();
    return console.log("Producto añadido a la tienda");
  }

  async saveProductsToFile() {
    try {
      const productsString = JSON.stringify(this.#products, null, 2);
      await fs.promises.writeFile(this.path, productsString);
    } catch (error) {
      console.log("Error al guardar los productos en el archivo:", error);
    }
  }

  async loadProductsFromFile() {
    try {
      const fileData = await fs.promises.readFile(this.path, "utf-8");
      this.#products = JSON.parse(fileData);
    } catch (error) {
      console.log("Error al cargar los productos desde el archivo:", error);
    }
  }

  async getProducts() {
    await this.loadProductsFromFile();
    return console.log(this.#products);
  }

  async getProductById(prodid) {
    await this.loadProductsFromFile();
    const productFound = this.#products.find((prod) => prod.id === prodid);
    if (productFound) {
      return console.log(productFound);
    }
    return console.log("Not Found");
  }

  async updateProduct(prodid, updatedData) {
    await this.loadProductsFromFile();
    const productIndex = this.#products.findIndex((prod) => prod.id === prodid);
    if (productIndex !== -1) {
      this.#products[productIndex] = { ...this.#products[productIndex], ...updatedData };
      this.saveProductsToFile();
      return console.log("Producto actualizado correctamente");
    }
    return console.log("Not Found");
  }

  async deleteProduct(prodid) {
    await this.loadProductsFromFile();
    const productIndex = this.#products.findIndex((prod) => prod.id === prodid);
    if (productIndex !== -1) {
      this.#products.splice(productIndex, 1);
      this.saveProductsToFile();
      return console.log("Producto eliminado correctamente");
    }
    return console.log("Not Found");
  }
}

const productManager = new ProductManager("products.json");

productManager.addProduct(
  "Zapatillas",
  "Zapatillas deportivas",
  30,
  "https://img_ejemplo.com/zapatillas.jpg",
  "4531",
  10
);

productManager.addProduct(
  "Zapatos",
  "Zapatos elegante sport",
  30,
  "https://img_ejemplo.com/zapatos.jpg",
  "5622",
  5
);
// Producto repetido
productManager.addProduct(
    "Zapatillas",
    "Zapatillas deportivas",
    30,
    "https://img_ejemplo.com/zapatillas.jpg",
    "4531",
    10
);

  


// productManager.getProducts();

// productManager.getProductById(2);

// productManager.updateProduct(2, { price: 40 });

// productManager.deleteProduct(1);
