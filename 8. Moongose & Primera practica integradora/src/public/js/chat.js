const socket = io();

document.getElementById('chat-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  if (email.trim() !== '' && message.trim() !== '') {
    socket.emit('chatMessage', { email, message });
    document.getElementById('message').value = '';
  }
});

socket.on('chatMessage', (data) => {
  const chatMessages = document.getElementById('chat-messages');
  const newMessage = document.createElement('p');
  newMessage.innerHTML = `<strong>${data.email}:</strong> ${data.message}`;
  chatMessages.appendChild(newMessage);
});
