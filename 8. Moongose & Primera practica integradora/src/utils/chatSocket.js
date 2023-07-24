import { MessageModel } from '../DAO/models/messages.model.js';

export async function handleChatSocket(socket, io) {
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
      user: data.user,
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
