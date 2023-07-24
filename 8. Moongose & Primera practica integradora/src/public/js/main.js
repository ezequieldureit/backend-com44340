const socket = io();

// Function to display the list of products in the table
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

// Handle the "messageServer" event sent by the server with the initial product list
socket.on('mensajeServer', (productos) => {
  console.log('Productos recibidos:', productos);
  displayProducts(productos);
});

// Handle the "productAdded" event sent by the server when a product is added
socket.on('productoAgregado', (product) => {
  console.log('Producto agregado:', product);
  // Get updated product list from server and display it
  socket.emit('getProducts');
});

// Add handling of the "getProducts" event sent by the server in response to "productAdded"
socket.on('getProducts', (products) => {
  console.log('Lista de productos actualizada:', products);
  displayProducts(products);
});

// Handle the "productDeleted" event sent by the server when a product is deleted
socket.on('productDeleted', (products) => {
  console.log('Producto eliminado:', products);
  displayProducts(products);
});

// Handle the "productError" event sent by the server in case of errors
socket.on('productError', (error) => {
  console.log('Error en el servidor:', error);
});

// Handle the "getProducts" event sent by the server in response to "productAdded"
socket.on('getProducts', (products) => {
  console.log('Lista actualizada de productos:', products);
  displayProducts(products);
});
// Manage the add product form
const submitProductForm = document.getElementById('submitProduct');
submitProductForm.addEventListener('click', (event) => {
  event.preventDefault();

  // Get the form data and send it to the server
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
