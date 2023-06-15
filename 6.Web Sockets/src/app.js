import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import path from "path";
import ProductManager from "./manager/productManager.js";

import productsRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";
import viewRouter from "./routes/view.routes.js";

const app = express();
const port = 8080;
const productManager = new ProductManager();

// Setting of Express Server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statis files
app.use("/", express.static(path.resolve(process.cwd(), "src/public")));

// Setting of Handlebars
app.engine(
  "handlebars",
  handlebars.engine({
    extname: ".handlebars",
    defaultLayout: "main",
    layoutsDir: path.resolve(process.cwd(), "src/views/layouts"),
  })
);
app.set("view engine", "handlebars");
app.set("views", path.resolve(process.cwd(), "src/views"));

// Routes
app.use("/", viewRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

app.use('*', (req, res)=>
   res.status(404).json({
             error: "Ruta no existente"
  }) 
);


// Server start
const server = app.listen(port, () => {
  console.log(`Server listening in port ${port}`);
});

// Setting of Socket.io
const io = new Server(server);

io.on("connection", async (socket) => {
  console.log("New client connected");
  let products;

  try {
    products = await productManager.getProducts();
    socket.emit("mensajeServer", products);
  } catch (error) {
    console.log(error);
  }

  socket.on("product", async (data) => {
    console.log("data:", data);

    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    } = data;

    if (
      title === "" ||
      description === "" ||
      code === "" ||
      price === "" ||
      status === "" ||
      stock === "" ||
      category === ""
    ) {
      console.log("Error(code already used or missing fields)");
    } else {
      try {
        const product = {
          title,
          description,
          code,
          price,
          status,
          stock,
          category,
          thumbnail,
        };

        await productManager.addProducts(product);
        const datos = await productManager.getProducts();
        io.emit("productoAgregado", datos);
      } catch (error) {
        console.log(error);
      }
    }
  });

  socket.on("deleteProduct", async (data) => {
    const productName = data;

    try {
      const deletedProduct = await productManager.deleteProductByName(
        productName
      );

      if (deletedProduct) {
        const products = await productManager.getProducts();
        io.emit("productDeleted", products);
      } else {
        console.log(
          "The product was not found. No deletion was performed"
        );
        socket.emit("productNotFound", "The product was not found.");
      }
    } catch (error) {
      console.log(error);
    }
  });
});
