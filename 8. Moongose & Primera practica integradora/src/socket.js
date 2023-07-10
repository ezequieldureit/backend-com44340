import { Server } from "socket.io";
import ProductManager from "./manager/productManager.js";

export function configureSocket(server) {
  const io = new Server(server);
  const productManager = new ProductManager();

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
          console.log("The product was not found. No deletion was performed");
          socket.emit("productNotFound", "The product was not found.");
        }
      } catch (error) {
        console.log(error);
      }
    });
  });
}
