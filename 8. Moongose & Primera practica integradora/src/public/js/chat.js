const socket = io();

socket.on('chatMessage', (data) => {
  const chatMessages = document.getElementById('chat-messages');
  const newMessage = document.createElement('p');
  newMessage.innerHTML = `<strong>${data.user}:</strong> ${data.message}`;
  chatMessages.appendChild(newMessage);
});

document.getElementById('chat-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const user = document.getElementById('user').value;
  const message = document.getElementById('message').value;

  if (user.trim() !== '' && message.trim() !== '') {
    socket.emit('chatMessage', { user, message });
    document.getElementById('message').value = '';
  }
});

