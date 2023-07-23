import express from 'express';
import { createUser, deleteUser, getAllUsers, updateUser } from '../controllers/users.controller.js';

export const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);

usersRouter.post('/', createUser);

usersRouter.put('/:id', updateUser);

usersRouter.delete('/:id', deleteUser);
