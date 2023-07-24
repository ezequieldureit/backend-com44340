import { messagesService } from '../services/messages.service.js';
import { productService } from '../services/products.service.js';
import { userService } from '../services/users.service.js';

const viewProducts = async (req, res) => {
  try {
    const allProducts = await productService.find();
    const mapAllProducts = allProducts.map((product) => {
      return {
        title: product.title,
        description: product.description,
        category: product.category,
        stock: product.category,
        price: product.price,
      };
    });
    res.render('home', {
      products: mapAllProducts,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

const viewRealTimeProducts = async (req, res) => {
  try {
    const allProducts = await productService.find();
    res.render('realTimeProducts', {
      title: 'Productos en tiempo real',
      products: allProducts,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al obtener los productos en tiempo real' });
  }
};

const viewUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    const mapAllUsers = users.map((user) => {
      return {
        name: user.firstName,
        lastname: user.lastName,
        email: user.email,
      };
    });
    res.render('users', {
      title: 'Listado de usuarios',
      users: mapAllUsers,
    });
  } catch (error) {
    console.log(error);
    res.render('error', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};


const viewChat = async (req, res) => {
  try {
    const allMessages = await messagesService.getAllMessages();

    // Mapeamos el arreglo allMessages para crear un nuevo arreglo con las propiedades adecuadas
    const mappedMessages = allMessages.map((message) => {
      return {
        user: message.user, // Asegúrate de que las propiedades user y message existan en el objeto message
        message: message.message,
      };
    });

    res.render('chat', {
      messages: mappedMessages, // Pasamos el nuevo arreglo mapeado a la plantilla
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al obtener los mensajes en tiempo real' });
  }
};

export { viewProducts, viewRealTimeProducts, viewUsers, viewChat };
