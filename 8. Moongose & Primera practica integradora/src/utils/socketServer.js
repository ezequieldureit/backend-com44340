import { Server } from 'socket.io';
import { handleProductSocket } from './productSocket.js';
import { handleChatSocket } from './chatSocket.js';

export function configureSocket(server) {
  const io = new Server(server);

  io.on('connection', (socket) => {
    // Handle product-related socket events
    handleProductSocket(socket, io);

    // Handle chat-related socket events
    handleChatSocket(socket, io);
  });
}
