// Crear un proyecto basado en Express, el cual cuente con un servidor que escuche en el puerto 8080. Ademas de configurar los siguientes endpoints:
// - El endpoint del metodo GET a la ruta '/bienvenida' debera devolver un html con letras en color azul, en una stringify, dando la bienvenida.
// - El endpoint del metodo GET a la ruta '/usuario' debera devolver un objeto con los datos de un usuario falso: {nombre,apellido,edad,correo}

const express = require("express");
const path = require("path");
const app = express();
const port = 8080;

app.get("/bienvenida", (req, res) => {
  const filePath = path.join(__dirname, "/bienvenida.html");
  res.sendFile(filePath);
});

app.get("/usuario", (req, res) => {
  const usuario = {
    nombre: "Ezequiel",
    edad: 34,
    localidad: "Buenos Aires",
  };

  res.json(usuario);
});

app.get("*", (req, res) => {
  res.send("Hello world from Express");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${8080}`);
});
