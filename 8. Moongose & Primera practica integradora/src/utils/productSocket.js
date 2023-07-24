import { productService } from '../services/products.service.js';

export async function handleProductSocket(socket, io) {
  try {
    // Emitir todos los productos al cliente cuando se conecte
    const products = await productService.find();
    socket.emit('mensajeServer', products);
  } catch (error) {
    // Enviar un evento de error al cliente si ocurre un error al obtener los productos
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
      // Enviar un evento de error al cliente si falta algún campo
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
        // Enviar un evento de error al cliente si ocurre un error al agregar el producto
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
        // Enviar un evento de error al cliente si el producto no se encuentra
        socket.emit('productError', 'Producto no encontrado');
        console.log('The product was not found. No deletion was performed');
      }
    } catch (error) {
      // Enviar un evento de error al cliente si ocurre un error al eliminar el producto
      socket.emit('productError', 'Error al eliminar el producto');
      console.log(error);
    }
  });

  socket.on('getProducts', async () => {
    try {
      const products = await productService.find();
      socket.emit('mensajeServer', products);
    } catch (error) {
      // Enviar un evento de error al cliente si ocurre un error al obtener los productos
      socket.emit('productError', 'Error al obtener los productos');
      console.log(error);
    }
  });
}
