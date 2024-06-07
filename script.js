document.addEventListener("DOMContentLoaded", () => {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");

    const responses = ["Сообщение А", "Сообщение Б", "Сообщение В", "Сообщение Г"];
    let messageCount = 0;

    function appendMessage(sender, text) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", sender);
        messageElement.textContent = text;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function typeResponse(text, delay = 100) {
        let index = 0;
        const typing = setInterval(() => {
            if (index < text.length) {
                chatBox.lastChild.textContent += text.charAt(index);
                index++;
                chatBox.scrollTop = chatBox.scrollHeight;
            } else {
                clearInterval(typing);
            }
        }, delay);
    }

    function sendMessage() {
        const message = userInput.value.trim();
        if (message === "") return;

        appendMessage("user", message);
        userInput.value = "";
        messageCount++;

        if (messageCount <= responses.length) {
            appendMessage("bot", "");
            setTimeout(() => {
                typeResponse(responses[messageCount - 1], 100);
            }, 500);
        }
    }

    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});
