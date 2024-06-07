document.addEventListener('DOMContentLoaded', (event) => {
    const chatWindow = document.getElementById('chat-window');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    let messageCount = 0;
    const responses = ["Сообщение А", "Сообщение Б", "Сообщение В", "Сообщение Г"];

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        displayMessage(message, 'user');
        userInput.value = '';

        if (messageCount < responses.length) {
            setTimeout(() => {
                displayBotMessage(responses[messageCount]);
                messageCount++;
            }, 1000);
        }
    }

    function displayMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = text;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function displayBotMessage(text) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'bot');
        chatWindow.appendChild(messageElement);

        let charIndex = 0;
        const typingInterval = setInterval(() => {
            if (charIndex < text.length) {
                messageElement.textContent += text[charIndex];
                charIndex++;
            } else {
                clearInterval(typingInterval);
                chatWindow.scrollTop = chatWindow.scrollHeight;
            }
        }, 100);
    }
});
