document.addEventListener('DOMContentLoaded', () => {
    const messages = ["Сообщение А", "Сообщение Б", "Сообщение В", "Сообщение Г"];
    let messageIndex = 0;

    const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    function addMessage(content, isUser) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', isUser ? 'user' : 'bot');
        messageElement.textContent = content;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function sendMessage() {
        const userMessage = messageInput.value.trim();
        if (userMessage) {
            addMessage(userMessage, true);
            messageInput.value = '';
            if (messageIndex < messages.length) {
                setTimeout(() => typeMessage(messages[messageIndex++]), 1000);
            }
        }
    }

    function typeMessage(content) {
        let typedContent = '';
        let i = 0;
        const interval = setInterval(() => {
            if (i < content.length) {
                typedContent += content[i++];
                addMessage(typedContent, false);
                chatBox.lastChild.textContent = typedContent;
            } else {
                clearInterval(interval);
            }
        }, 100);
    }

    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
});
