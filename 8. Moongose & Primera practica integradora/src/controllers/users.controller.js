import { userService } from '../services/users.service.js';

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json({
      status: 'success',
      msg: 'listado de usuarios',
      data: users,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong',
      data: {},
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const userCreated = await userService.createUser(
      firstName,
      lastName,
      email
    );
    return res.status(201).json({
      status: 'success',
      msg: 'user created',
      data: userCreated,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
    const userUpdated = await userService.updateUser(
      id,
      firstName,
      lastName,
      email
    );
    return res.status(201).json({
      status: 'success',
      msg: 'user uptaded',
      data: userUpdated,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userDeleted = await userService.deleteUser(id);
    return res.status(200).json({
      status: 'success',
      msg: 'user deleted',
      data: {},
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
};

export { getAllUsers, createUser, updateUser, deleteUser };
