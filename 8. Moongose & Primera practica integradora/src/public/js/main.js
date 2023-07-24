// // Handle the "messageServer" event
// const socket = io();

// socket.on("mensajeServer", (productos) => {
//   console.log("Productos recibidos:", productos);

//   const productTableBody = document.getElementById("productTableBody");
//   productTableBody.innerHTML = "";

//   productos.forEach((producto) => {
//     const row = document.createElement("tr");
//     row.innerHTML = `
//         <td>${producto.title}</td>
//         <td>${producto.description}</td>
//         <td>${producto.code}</td>
//         <td>${producto.price}</td>
//         <td>${producto.stock}</td>
//         <td>${producto.category}</td>
//         <td><img src="${producto.thumbnail}" alt="Imagen del producto" class=thumbnail-image></td>
//       `;
//     productTableBody.appendChild(row);
//   });
// });

// // Handle product add form submission
// const submitProductForm = document.getElementById("submitProduct");
// submitProductForm.addEventListener("click", (event) => {
//   event.preventDefault();

//   const title = document.getElementById("title").value;
//   const description = document.getElementById("description").value;
//   const code = document.getElementById("code").value;
//   const price = document.getElementById("price").value;
//   const stock = document.getElementById("stock").value;
//   const category = document.getElementById("category").value;
//   const thumbnail = document.getElementById("thumbnail").value;

//   socket.emit("product", {
//     title,
//     description,
//     code,
//     price,
//     stock,
//     category,
//     thumbnail,
//   });
// });

const socket = io();

// Función para mostrar la lista de productos en la tabla
function displayProducts(products) {
  const productTableBody = document.getElementById('productTableBody');
  productTableBody.innerHTML = '';

  products.forEach((producto) => {
    const row = document.createElement('tr');
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
}

// Manejar el evento "mensajeServer" enviado por el servidor con la lista de productos inicial
socket.on('mensajeServer', (productos) => {
  console.log('Productos recibidos:', productos);
  displayProducts(productos);
});

// Manejar el evento "productoAgregado" enviado por el servidor cuando se agrega un producto
socket.on('productoAgregado', (product) => {
  console.log('Producto agregado:', product);
  // Obtener la lista de productos actualizada del servidor y mostrarla
  socket.emit('getProducts');
});

// Agregar el manejo del evento "getProducts" enviado por el servidor en respuesta a "productoAgregado"
socket.on('getProducts', (products) => {
  console.log('Lista de productos actualizada:', products);
  displayProducts(products);
});

// Manejar el evento "productDeleted" enviado por el servidor cuando se elimina un producto
socket.on('productDeleted', (products) => {
  console.log('Producto eliminado:', products);
  displayProducts(products);
});

// Manejar el evento "productError" enviado por el servidor en caso de errores
socket.on('productError', (error) => {
  console.log('Error en el servidor:', error);
});

// Manejar el evento "getProducts" enviado por el servidor en respuesta a "productoAgregado"
socket.on('getProducts', (products) => {
  console.log('Lista actualizada de productos:', products);
  displayProducts(products);
});
// Manejar el formulario de agregar producto
const submitProductForm = document.getElementById('submitProduct');
submitProductForm.addEventListener('click', (event) => {
  event.preventDefault();

  // Obtener los datos del formulario y enviarlos al servidor
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const code = document.getElementById('code').value;
  const price = document.getElementById('price').value;
  const stock = document.getElementById('stock').value;
  const category = document.getElementById('category').value;
  const thumbnail = document.getElementById('thumbnail').value;

  socket.emit('product', {
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnail,
  });
});

// Resto del código ...

function limpiarFormulario() {
  document.getElementById('miFormulario').reset();
}

// Handle product delete form submission
const deleteProductForm = document.getElementById('deleteProduct');
deleteProductForm.addEventListener('click', (event) => {
  event.preventDefault();

  const titleDelete = document.getElementById('titleDelete').value;

  socket.emit('deleteProduct', titleDelete);
});
