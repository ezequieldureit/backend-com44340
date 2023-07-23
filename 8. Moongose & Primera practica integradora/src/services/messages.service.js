import { MessageModel } from '../DAO/models/messages.model.js';

class MessagesService {
  validatePostMessage(user, message) {
    if (!user || !message) {
      console.log('Validation error: please complete user and message');
      throw 'Validation error';
    }
  }
  async getAllMessages() {
    const users = await MessageModel.find({});
    return users;
  }
  async createMessage(user, message) {
    this.validateMessage(firstName, lastName, email);
    const messageCreated = await MessageModel.create({ user, message });
    return messageCreated;
  }
}

export const messagesService = new MessagesService();
