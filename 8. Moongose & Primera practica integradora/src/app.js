import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import { configureSocket } from './utils/socketServer.js';
import connectDB from './utils/db.js';
import { usersRouter } from './routes/users.routes.js';
import productsRouter from './routes/products.routes.js';
import viewRouter from './routes/view.routes.js';
import cartRouter from './routes/cart.routes.js';

const app = express();
const port = 8080;

// Conection with MongoDB
connectDB();

// Express Server Configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use('/', express.static(path.resolve(process.cwd(), 'src/public')));

// Handlebars Configuration
app.engine(
  'handlebars',
  handlebars.engine({
    extname: '.handlebars',
    defaultLayout: 'main',
    layoutsDir: path.resolve(process.cwd(), 'src/views/layouts'),
  })
);
app.set('view engine', 'handlebars');
app.set('views', path.resolve(process.cwd(), 'src/views'));

// Routes API
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);

// Routes Views
app.use('/', viewRouter);

// Default route if the route doesn't exist
app.use('*', (req, res) =>
  res.status(404).json({
    error: 'Ruta no existente',
  })
);

// Server start
const server = app.listen(port, () => {
  console.log(`Server listening in port ${port}`);
});

// Socket IO Configuration
configureSocket(server);
