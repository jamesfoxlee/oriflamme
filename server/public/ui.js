function showMessages (messages) {
  const messagesContainer = document.querySelector('.messages');
  messages.forEach((message, idx, arr) => {
    const senderClass = message.authorId === 'me' ? 'message--mine': 'message--theirs'
    const div = `<div class="message ${senderClass}">
      <div class="message__content">${message.content}</div>
    </div>`;
    messagesContainer.insertAdjacentHTML('beforeend', div)
  });
}

export {
  showMessages
}