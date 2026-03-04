let score = 0;
let currentCorrectAnswer = 0;

async function loadNewQuestion() {
    const questionElement = document.getElementById('math-question');
    const optionsContainer = document.getElementById('options');
    const fish = document.getElementById('current-fish');

    questionElement.innerText = "Đang quăng cần...";
    optionsContainer.innerHTML = '';
    fish.style.transform = "translateY(0)"; // Reset vị trí cá

    try {
        const response = await fetch('/api/get-fish-question');
        const data = await response.json();
        
        currentCorrectAnswer = data.correct_answer;
        questionElement.innerText = data.question;
        
        data.options.forEach(option => {
            const chest = document.createElement('div');
            chest.className = 'chest';
            chest.innerText = option;
            chest.onclick = () => checkAnswer(option, chest);
            optionsContainer.appendChild(chest);
        });
    } catch (e) { 
        console.error("Lỗi tải câu hỏi:", e);
        questionElement.innerText = "Lỗi kết nối Server!";
    }
}

function checkAnswer(selected, element) {
    const fish = document.getElementById('current-fish');
    // Chuyển selected về số để so sánh chính xác
    if (parseInt(selected) === currentCorrectAnswer) {
        score += 10;
        document.getElementById('score').innerText = `Điểm: ${score}`;
        fish.style.transform = "translateY(-300px)"; // Cá bay lên
        element.style.background = "#00ff00"; // Xanh neon
        setTimeout(loadNewQuestion, 1200);
    } else {
        fish.style.transform = "translateY(500px)"; // Cá lặn mất
        element.style.background = "#ff0000"; // Đỏ
        setTimeout(loadNewQuestion, 1200);
    }
}

document.addEventListener('DOMContentLoaded', loadNewQuestion);