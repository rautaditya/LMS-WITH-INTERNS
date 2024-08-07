document.addEventListener("DOMContentLoaded", () => {
    const chatBody = document.querySelector(".chat-body");
    const txtInput = document.querySelector("#txtinput");
    const send = document.querySelector(".send");
    const openChatbotButton = document.querySelector("#openChatbotButton");
    const containerChatbot = document.querySelector("#containerchatbot");

    const questions = [
        "What is your name?",
        "What is your email?",
        "What is your mobile number?",
    ];

    const courses = ["Data Science", "Machine Learning", "Web Development", "Java Development ","Mobile App Development"];

    let currentQuestionIndex = 0;
    let userData = {};

    function appendMessage(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.className = `${sender}-message`;
        messageElement.textContent = message;
        chatBody.appendChild(messageElement);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function displayCourseOptions() {
        courses.forEach(course => {
            const courseOption = document.createElement("div");
            courseOption.className = "course-option";
            courseOption.textContent = course;
            courseOption.addEventListener("click", () => {
                userData.course = course;
                appendMessage("user", course);
                appendMessage("bot", "Thanks, one of our super helpful counsellors will reach out to you soon. Meanwhile, why don't you see the course offerings.");
                saveUserData();
            });
            chatBody.appendChild(courseOption);
        });
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function askNextQuestion() {
        if (currentQuestionIndex < questions.length) {
            appendMessage("bot", questions[currentQuestionIndex]);
        } else if (currentQuestionIndex === questions.length) {
            appendMessage("bot", "Here are the available courses. Please select one:");
            displayCourseOptions();
        } else {
            saveUserData();
        }
    }

    function saveUserData() {
        fetch('/api/chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    
    function handleUserInput() {
        const userMessage = txtInput.value.trim();
        if (userMessage === "") return;

        appendMessage("user", userMessage);

        if (currentQuestionIndex === 0) {
            userData.name = userMessage;
        } else if (currentQuestionIndex === 1) {
            userData.email = userMessage;
        } else if (currentQuestionIndex === 2) {
            userData.mobile = userMessage;
        }

        currentQuestionIndex++;
        txtInput.value = "";
        askNextQuestion();
    }

    send.addEventListener("click", handleUserInput);
    txtInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            handleUserInput();
        }
    });

    openChatbotButton.addEventListener("click", () => {
        containerChatbot.style.display = containerChatbot.style.display === "none" ? "flex" : "none";
    });

    askNextQuestion();
});
function addUserMessage(message) {
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'chatbot-message user-message';
    userMessageDiv.innerHTML = `<p>${message}</p>`;
    document.querySelector('.chat-body').appendChild(userMessageDiv);
}

function addBotMessage(message) {
    const botMessageDiv = document.createElement('div');
    botMessageDiv.className = 'chatbot-message bot-message';
    botMessageDiv.innerHTML = `<p>${message}</p>`;
    document.querySelector('.chat-body').appendChild(botMessageDiv);
}