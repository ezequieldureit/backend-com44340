// Handle the "messageServer" event
const socket = io();

socket.on("mensajeServer", (productos) => {
  console.log("Productos recibidos:", productos);

  const productTableBody = document.getElementById("productTableBody");
  productTableBody.innerHTML = "";

  productos.forEach((producto) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${producto.title}</td>
        <td>${producto.description}</td>
        <td>${producto.code}</td>
        <td>${producto.price}</td>
        <td>${producto.stock}</td>
        <td>${producto.category}</td>
        <td><img src="${producto.thumbnail}" alt="Imagen del producto" class=thumbnail-image></td>
      `;
    productTableBody.appendChild(row);
  });
});

// Handle product add form submission
const submitProductForm = document.getElementById("submitProduct");
submitProductForm.addEventListener("click", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const code = document.getElementById("code").value;
  const price = document.getElementById("price").value;
  const stock = document.getElementById("stock").value;
  const category = document.getElementById("category").value;
  const thumbnail = document.getElementById("thumbnail").value;

  socket.emit("product", {
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnail,
  });
});
function limpiarFormulario() {
  document.getElementById("miFormulario").reset();
}

// Handle product delete form submission
const deleteProductForm = document.getElementById("deleteProduct");
deleteProductForm.addEventListener("click", (event) => {
  event.preventDefault();

  const titleDelete = document.getElementById("titleDelete").value;

  socket.emit("deleteProduct", titleDelete);
});
