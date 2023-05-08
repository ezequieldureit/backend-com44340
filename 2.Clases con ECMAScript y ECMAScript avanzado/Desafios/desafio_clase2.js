// Creo una clase ProductManager con un objeto dentro->creo una variable instanciada privada #products(puede ser accedida solamente dentro de la misma clase)->creo una variable estatica lastID la cual se inicializa en cero y se comparte entre todas las instancias de ProductManager->creamos un constructor que se llama automaticamente cuando se crea una nueva instancia de la clase ProductManager. En este caso el constructor inicializa la variable de instancia #products con una matriz vacia.
class ProductManager {
  #products;
  static lastID = 0;
  constructor() {
    this.#products = [];
  }

  //----------------------

  // Creo un metodo addProduct, este metodo se utiliza para agregar un nuevo producto a la tienda representada por la instancia ProdcuctManager->comprueba si los campos title,description,price,thumbnail,code y stock no tienen valor, en caso de ser asi imprime en consola y devuelve la funcion,lo que significa que no realiza ninguna accion adicional->busca en la matriz de productos existentes (this.#products) si hay un producto con el mismo codigo que esta intentando agregar, en caso de ser afirmativo devuelve en consola y vuelve a la funcion sin agregar el producto duplicado->si el codigo no esta siendo utilizado por otro producto,se crea un nuevo objeto 'product' con los datos proporcionados(title,description,price,thumbnail,code,stock). El ID del producto se incrementa usando la variable estatica "ProductManager.lastID"->el nuevo objeto 'product' se agrega a la matriz de productos existentes (this.#products) utilizando el metodo push()->finalmente se imprime en mensaje en consola para indicar que se agrego un producto nuevo a la tienda....En resumen, este método addProduct verifica la validez de los campos proporcionados, busca duplicados de productos según el código y, si todo es válido, agrega un nuevo producto a la matriz de productos de la instancia de ProductManager.

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return console.log("Todos los campos son obligatorios");
    }

    const existingProduct = this.#products.find(
      (product) => product.code === code
    );
    if (existingProduct) {
      return console.log(
        `Error: el código "${code}" ya está siendo utilizado por otro producto.`
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
    return console.log("Producto añadido a la tienda");
  }
  // --------------------------------

  // El metodo getProduct() simplemente imprime en la consola la matriz de productos almacenados en la instancia de "ProductManager"
  getProduct() {
    return console.log(this.#products);
  }
  // -------------------------------

  // El metodo getProductById toma un parametro 'pid' que representa el ID del producto que se desea buscar -> utiliza el metodo find() en la matriz de productos (this.#products) para buscar un producto cuya 'id' coincida con el id proporcionado 'pid' -> si se encuentra un producto con el id dado, se almacena en la variable 'productFound' -> se muestra el producto encontrado en consola -> si no se encuentra ningun producto con el id dado, se muestra el mensaje 'Not Found'.

  getProductById(pid) {
    if (this.#products.find((p) => p.id === pid)) {
      const productFound = this.#products.find((p) => p.id === pid);
      return console.log(productFound);
    }
    return console.log("Not Found");
  }
}

// ---------------------------

// Este codigo crea un nuevo objeto 'ProductManager' y lo asigna a la variable 'productManager', lo que permite utilizar ese objeto para acceder a los metodos y propiedades de la clase 'ProductManager'

const productManager = new ProductManager();

// ---------------------------

// Basado en el código previo, se utilizaron los métodos addProduct() para agregar productos a la tienda representada por esa instancia(ProductManager).
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
