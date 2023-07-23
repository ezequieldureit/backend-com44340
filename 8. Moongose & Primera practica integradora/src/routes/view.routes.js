import express from 'express';
import { Router } from 'express';
import {
    viewChat,
  viewProducts,
  viewRealTimeProducts,
  viewUsers,
} from '../controllers/view.controller.js';


const viewRouter = Router();

viewRouter.use(express.json());
viewRouter.use(express.urlencoded({ extended: true }));


viewRouter.get('/', viewProducts);

viewRouter.get('/realtimeproducts', viewRealTimeProducts);

viewRouter.get('/users', viewUsers);

viewRouter.get("/chat", viewChat);

export default viewRouter;
