import express from "express";
import handlebars from "express-handlebars";
import path from "path";
import productsRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";
import viewRouter from "./routes/view.routes.js";
import { configureSocket } from "./socket.js";
import connectDB from "./db.js";
import { usersRouter } from "./routes/users.routes.js";

const app = express();
const port = 8080;

// Conexión a la base de datos
connectDB();

// Setting of Express Server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
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
app.use("/api/users", usersRouter);

// Route si la ruta no existe
app.use("*", (req, res) =>
  res.status(404).json({
    error: "Ruta no existente",
  })
);

// Server start
const server = app.listen(port, () => {
  console.log(`Server listening in port ${port}`);
});

// Configurar Socket.io
configureSocket(server);
