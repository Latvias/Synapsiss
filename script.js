const messages = ["Сообщение А", "Сообщение Б", "Сообщение В", "Сообщение Г"];
let messageIndex = 0;

document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById("user-input");
    const chatWindow = document.getElementById("chat-window");

    if (userInput.value.trim() === "") return;

    // Отправка пользовательского сообщения
    const userMessage = document.createElement("div");
    userMessage.classList.add("message", "user");
    userMessage.textContent = userInput.value;
    chatWindow.appendChild(userMessage);

    // Прокрутка окна чата вниз
    chatWindow.scrollTop = chatWindow.scrollHeight;

    // Очистка поля ввода
    userInput.value = "";

    // Отправка ответного сообщения
    if (messageIndex < messages.length) {
        setTimeout(() => {
            typeMessage(messages[messageIndex], chatWindow);
            messageIndex++;
        }, 500); // Задержка перед ответом в 500 мс
    }
}

function typeMessage(message, chatWindow) {
    const botMessage = document.createElement("div");
    botMessage.classList.add("message", "bot");
    chatWindow.appendChild(botMessage);

    let charIndex = 0;
    const typingSpeed = 100; // 10 символов в секунду

    function typeChar() {
        if (charIndex < message.length) {
            botMessage.textContent += message.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, typingSpeed);
        } else {
            // Прокрутка окна чата вниз после завершения печати
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
    }

    typeChar();
}
