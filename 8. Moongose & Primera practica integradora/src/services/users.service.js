import { UserModel } from '../DAO/models/users.model.js';

class UserService {
  validatePostUser(firstName, lastName, email) {
    if (!firstName || !lastName || !email) {
      console.log(
        'Validation error: please complete firstName, lastName and email'
      );
      throw 'Validation error';
    }
  }
  validatePutUser(_id, firstName, lastName, email) {
    if (!_id || !firstName || !lastName || !email) {
      console.log(
        'Validation error: please complete firstName, lastName and email'
      );
      throw 'Validation error';
    }
  }
  validateDeleteUser(id) {
    if (!id) {
      console.log(
        'Validation error: please complete firstName, lastName and email'
      );
      throw 'Validation error';
    }
  }

  async getAllUsers() {
    const users = await UserModel.find({});
    return users;
  }
  async createUser(firstName, lastName, email) {
    this.validatePostUser(firstName, lastName, email);
    const userCreated = await UserModel.create({ firstName, lastName, email });
    return userCreated;
  }
  async updateUser(firstName, lastName, email) {
    this.validatePutUser(firstName, lastName, email);
    const userUpdated = await UserModel.updateOne(
      { firstName, lastName, email }
    );
    return userUpdated;
  }
  async deleteUser(id) {
    this.validateDeleteUser(id)
    const userDeleted = await UserModel.deleteOne({ _id: id });
    return userDeleted;
  }
}

export const userService = new UserService();
