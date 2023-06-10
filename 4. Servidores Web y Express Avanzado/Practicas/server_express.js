// const express = require("express");
// const app = express();
// // const port = 3000;
// app.use(express.urlencoded({ extended: true })); // modulo para querys
// app.use(express.json()); // metodo para estandarizar el POST de json al back

// let productos = [
//   { id: "1000", name: "Camisa", precio: 6000 },
//   { id: "2000", name: "Chomba", precio: 4000 },
//   { id: "3000", name: "Remera", precio: 5000 },
//   { id: "4000", name: "Musculosa", precio: 3200 },
//   { id: "5000", name: "Campera", precio: 9700 },
//   { id: "6000", name: "Pantalon", precio: 7500 },
// ];

// // Consultar productos filtrado por precio
// app.get("/productos", (req, res) => {
//   console.log(req.query); // me trae los productos filtrados en la url. ej: ?precio=6000&nombre=camisa
//   const precio = req.query.precio;
//   if (req.query && precio) {
//     const productosFiltradosPorPrecio = productos.filter(
//       (p) => p.precio == precio
//     );
//     return res.status(200).json({
//       status: "success",
//       msg: "Te paso los productos cuyo precio es: " + precio,
//       data: productosFiltradosPorPrecio,
//     });
//   } else {
//     return res.status(200).json({
//       status: "success",
//       msg: "Estos son todos los productos!",
//       data: productos,
//     });
//   }
// });

// // Consultar productos filtrados por ID
// app.get("/productos/:id", (req, res) => {
//   const id = req.params.id;
//   const producto = productos.find((p) => p.id == id);

//   if (producto) {
//     return res.status(200).json({
//       status: "success",
//       msg: "Producto encontrado con exito!",
//       data: producto,
//     }); // siempre responder json.
//   } else {
//     return res.status(400).json({
//       status: "error",
//       msg: "Producto no encontrado!",
//       data: {},
//     });
//   }
// });

// // Borrar productos por ID
// app.delete("/productos/:id", (req, res) => {
//   const id = req.params.id;
//   //   const producto = productos.find((p) => p.id == id);
//   productos = productos.filter((p) => p.id != id);

//   return res.status(200).json({
//     status: "success",
//     msg: "Filtramos los productos cuyo id es " + id,
//     data: {},
//   }); // siempre responder json.
// });

// // Modificar productos por ID
// app.put("/productos/:id", (req, res) => {
//   const id = req.params.id;
//   const datosNuevos = req.body;
//   const indice = productos.findIndex((p) => p.id == id);
//   if (indice == -1) {
//     return res.status(404).json({
//       status: "error",
//       msg: "Error porque este producto no existe",
//       data: {},
//     });
//   } else {
//     productos[indice] = { ...datosNuevos, id: productos[indice].id };
//     return res.status(201).json({
//       status: "success",
//       msg: "El producto fue modificado exitosamente",
//       data: productos[indice],
//     });
//   }
// });

// // Agregar productos ---> en caso de usar postman seleccionar body->raw->JSON
// app.post("/productos", (req, res) => {
//   const productoParaCrear = req.body;
//   // El codigo de abajo se utilizo para testear el ida y vuelva con postman en el console.log
//   //   console.log(body);
//   //   res.send("Holala");
//   productoParaCrear.id = (Math.random() * 100000).toFixed(0);
//   productoParaCrear.fecha = Date.now();

//   productos.push(productoParaCrear);

//   return res.status(201).json({
//     status: "success",
//     msg: "Creamos el producto solicitado ",
//     data: productoParaCrear,
//   }); // siempre responder json.
// });

// app.get("/*", (req, res) => {
//   return res.status(404).json({
//     status: "error",
//     msg: "Error esta ruta no existe",
//     data: {},
//   }); // siempre responder json.
// });

// // app.listen(port, () => {
// //   console.log(`Example app listening on port ${3000}`);
// // });
