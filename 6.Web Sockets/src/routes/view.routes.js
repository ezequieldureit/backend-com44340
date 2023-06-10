// import { Router } from "express";
// import ProductManager from "../manager/productManager.js";

// const viewRouter = Router();
// const productManager = new ProductManager();

// viewRouter.get("/", async (req, res) => {
//   let allProducts = await productManager.getProducts();
//   res.render("home", {
//     title: "Proyecto Final Coder House",
//     products: allProducts,
//   });
// });

// viewRouter.get("/realtimeproducts", (req, res) => {
//   res.render("realTimeProducts",{});
// });

// export default viewRouter;
import { Router } from "express";
import ProductManager from "../manager/productManager.js";

const viewRouter = Router();
const productManager = new ProductManager();

viewRouter.get("/", async (req, res) => {
  let allProducts = await productManager.getProducts();
  res.render("home", {
    title: "Proyecto Final Coder House",
    products: allProducts,
  });
});

viewRouter.get("/realtimeproducts", async (req, res) => {
  let allProducts = await productManager.getProducts();
  res.render("realTimeProducts", {
    title: "Productos en tiempo real",
    products: allProducts,
  });
});

export default viewRouter;
