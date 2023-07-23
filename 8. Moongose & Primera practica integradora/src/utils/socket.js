import { Server } from 'socket.io';
import { productService } from '../services/products.service.js';
import { MessageModel } from '../DAO/models/messages.model.js';

// Function to handle product socket events
async function handleProductSocket(socket) {
  try {
    const products = await productService.find();
    socket.emit('mensajeServer', products);
  } catch (error) {
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
      console.log('Error(code already used or missing fields)');
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
        console.log('The product was not found. No deletion was performed');
        socket.emit('productNotFound', 'The product was not found.');
      }
    } catch (error) {
      console.log(error);
    }
  });
}

// Function to handle chat socket events
// Function to handle chat socket events
async function handleChatSocket(socket) {
  console.log('New client connected');

  try {
    const messages = await MessageModel.find({});
    socket.emit('initialMessages', messages);
  } catch (error) {
    console.log('Error fetching messages:', error);
  }

  socket.on('chatMessage', async (data) => {
    console.log('Received message:', data);
    const newMessage = new MessageModel({
      email: data.email,
      message: data.message,
    });
    try {
      await newMessage.save();
      io.emit('chatMessage', data);
    } catch (error) {
      console.log('Error saving message:', error);
    }
  });
}

export function configureSocket(server) {
  const io = new Server(server);

  io.on('connection', (socket) => {
    // Handle product-related socket events
    handleProductSocket(socket);

    // Handle chat-related socket events
    handleChatSocket(socket);
  });
}
