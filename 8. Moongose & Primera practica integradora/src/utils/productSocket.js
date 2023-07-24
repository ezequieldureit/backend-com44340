import { productService } from '../services/products.service.js';

export async function handleProductSocket(socket, io) {
  try {
    // Issue all products to the client when connected
    const products = await productService.find();
    socket.emit('mensajeServer', products);
  } catch (error) {
    // Send an error event to the client if an error occurs while getting the products
    socket.emit('productError', 'Error al obtener los productos');
    console.log(error);
  }

  socket.on('product', async (data) => {
    console.log('data:', data);

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
      title === '' ||
      description === '' ||
      code === '' ||
      price === '' ||
      status === '' ||
      stock === '' ||
      category === ''
    ) {
      console.log('Error (code already used or missing fields)');
      // Send an error event to the client if any fields are missing
      socket.emit('productError', 'Por favor completa todos los campos');
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

        await productService.create(product);
        io.emit('productoAgregado', product);
      } catch (error) {
        // Send an error event to the client if an error occurs while adding the product
        socket.emit('productError', 'Error al agregar el producto');
        console.log(error);
      }
    }
  });

  socket.on('deleteProduct', async (data) => {
    const productName = data;

    try {
      const deletedProduct = await productService.findByNameAndDelete(
        productName
      );

      if (deletedProduct) {
        const products = await productService.find();
        io.emit('productDeleted', products);
        console.log('Producto eliminado');
      } else {
        // Send an error event to the client if the product is not found
        socket.emit('productError', 'Producto no encontrado');
        console.log('The product was not found. No deletion was performed');
      }
    } catch (error) {
      // Send an error event to the client if an error occurs while removing the product
      socket.emit('productError', 'Error al eliminar el producto');
      console.log(error);
    }
  });

  socket.on('getProducts', async () => {
    try {
      const products = await productService.find();
      socket.emit('mensajeServer', products);
    } catch (error) {
      // Send an error event to the client if an error occurs while getting the products
      socket.emit('productError', 'Error al obtener los productos');
      console.log(error);
    }
  });
}
