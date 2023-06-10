const fs = require("fs"); // importamos el modulo fs

// Creo clase ProductManager con sus componentes
class ProductManager {
  #products;
  static lastID = 0;
  constructor(path) {
    this.#products = [];
    this.path = path; // este metodo se ejecuta cuando se crea una nueva instancia de ProductManager. El constructor recibe un parametro 'path' que se asigna a la variable de instancia 'path'.
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
    this.saveProductsToFile(); // guarda los productos en un archivo, en este caso esta declarado en el metodo saveProductsToFile()
    return console.log("Producto añadido a la tienda");
  }

  async saveProductsToFile() {
    try {
      const productsString = JSON.stringify(this.#products, null, 2); // convierte la lista de productos 'this.products' a una cadena JSON utlizando JSON.stringify(). La opcion null,2 se utiliza para dar formato legible a la cadena JSON con una sangria de 2 espacios.
      await fs.promises.writeFile(this.path, productsString); // utiliza la funcion 'fs.promises.writeFile()' para escribir la cadena JSON en el archivo especificado 'this.path'. Esta operacion es asincronica, por lo que utiliza 'await' para esperar que se complete la escritura del archivo.
    } catch (error) {
      //Si se produce algun error durante la escritura del archivo,captura el error y muestra un mensaje.
      console.log("Error al guardar los productos en el archivo:", error);
    }
  }

  async loadProductsFromFile() {
    try {
      const fileData = await fs.promises.readFile(this.path, "utf-8"); //en esta operacion asincronica utilizamos la funcion 'fs.promises.readFile()' para leer el archivo especificado en 'this.path'. Con la palabra await se espera que se complete la lectura del archivo.
      this.#products = JSON.parse(fileData); //convierte la cadena de datos del archivo 'fileData' en un objeto utilizando JSON.parse()
    } catch (error) {
      // si se produce algun error durante la lectura del archivo, captura el error y muestra un mensaje
      console.log("Error al cargar los productos desde el archivo:", error);
    }
  }

  async getProducts() {
    await this.loadProductsFromFile(); // con 'await' espera la carga de productos desde el archivo utilizando el metodo loadProductsFromFile
    return console.log(this.#products);
  }

  async getProductById(prodid) {
    await this.loadProductsFromFile(); // utiliza 'await' para esperar que se complete la carga de productos desde el archivo utilizando el metodo loadProductsFromFile()
    const productFound = this.#products.find((prod) => prod.id === prodid); // utiliza el metodo 'Array.find()' para buscar un producto en '#this.products' que coincida con el 'id' proporcionado 'prodid'
    if (productFound) {
      return console.log(productFound); // si en encuentra el 'id' muestra el producto
    }
    return console.log("Not Found"); // sino muestra en consola el mensaje 'Not Found'
  }

  async updateProduct(prodid, updatedData) {
    // se declara una funcion asincronica updateProduct
    await this.loadProductsFromFile(); // espera que se complete la carga de productos desde el archivo utilizando el metodo loadProductsFromFile()
    const productIndex = this.#products.findIndex((prod) => prod.id === prodid); // utiliza el metodo 'Array.findIndex()' para encontrar el indice de producto en la lista de productos 'this.#products' que coincida con el id proporcionado (prodid)
    if (productIndex !== -1) {
      // si se encuentra el producto(el indice no tiene que ser igual a -1), actualiza los datos del producto utilizando la sintaxis de propagacion(...)para combinar los datos existentes del producto con los nuevos datos proporcionados 'updateData'
      this.#products[productIndex] = {
        ...this.#products[productIndex],
        ...updatedData,
      };
      this.saveProductsToFile(); // guarda los productos actualizados en saveProductsToFile() y devuelve mensaje en consola
      return console.log("Producto actualizado correctamente");
    }
    return console.log("Not Found"); // si no encuentra el id tira este mensaje en consola
  }

  async deleteProduct(prodid) {
    await this.loadProductsFromFile(); // espero la carga de productos desde el archivo
    const productIndex = this.#products.findIndex((prod) => prod.id === prodid); // verifico el index que coincida con el id proporcionado
    if (productIndex !== -1) { 
      this.#products.splice(productIndex, 1); // si encuentro el producto(el indice no tiene que ser igual a -1) utiliza el motodo Array.splice para eliminar el producto del archivo
      this.saveProductsToFile(); // guarda la modificacion en el archivo utilizando el metodo saveProductToFile
      return console.log("Producto eliminado correctamente"); // muestra mensaje
    }
    return console.log("Not Found"); // si no encuentra el id proporcionado muestra este mensaje.
  }
}

const productManager = new ProductManager("products.json"); // creo una instancia de la clase ProductManager y la asigno a una constante productManager. El constructor toma un argumento path, que representa la ruta del archivo donde se guardaran los productos. En este caso, se guardan en un archivo llamado 'products.json'

// Agrego productos para proceder con las pruebas
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
// Muestro los productos
// productManager.getProducts(); 

// Muestro el producto del ID proporcionado
// productManager.getProductById(2);

// Realizo un upgrade del producto con el id proporcionado y modifico algunos parametro
// productManager.updateProduct(2, { price: 60 });

// Borro un producto de la lista con el id proporcionado
// productManager.deleteProduct(1);
