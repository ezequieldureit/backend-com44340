const express = require("express");
const app = express();
const port = 8080;
const { ProductManager } = require("./productManager");
const productManager = new ProductManager("./products.json");


app.use(express.urlencoded({ extended: true })); // modulo para querys
app.use(express.json()); // metodo para estandarizar el POST de json al back

// Ruta para obtener todos los productos
app.get("/productos", async (req, res) => {
  await productManager.loadProductsFromFile(); // carga los productos desde el archivo antes de obtenerlos
  const products = await productManager.getProducts();
  return res.send({
    status: "success",
    msg: "Estos son todos los productos!",
    productos: products,
  });
});

// Ruta para obtener un producto por su ID
app.get("/productos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await productManager.loadProductsFromFile();
  const product = await productManager.getProductById(id);
  if (product) {
    return res.send(product);
  } else {
    return res.send({ message: "Producto no encontrado" });
  }
});

// Ruta para obtener los productos con límite personalizado
app.get("/productos/limit/:limit", async (req, res) => {
  const limit = parseInt(req.params.limit);
  await productManager.loadProductsFromFile();
  const products = await productManager.getProducts();
  const limitedProducts = products.slice(0, limit);
  return res.send({
    status: "success",
    msg: `Estos son los primeros ${limit} productos!`,
    productos: limitedProducts,
  });
});






app.listen(port, () => {
  console.log(`Products app listening on port ${port}`);
});
