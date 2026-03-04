const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = window.innerHeight;

let score = 0;
let isImmortal = false;
let gameActive = true;
let speed = 2;
let playerLane = 1; // 0: Trái, 1: Giữa, 2: Phải
const lanes = [80, 200, 320];


let currentQuestion = { q: "7 x 8", a: 56, options: [54, 56, 64] };
let obstacles = [];
isImmortal = document.getElementById('immortal-mode').checked;

// Khởi tạo biển báo
function spawnObstacles() {
    const y = -100;
    const shuffledOptions = [...currentQuestion.options].sort(() => Math.random() - 0.5);
    obstacles.push({ y, laneOptions: shuffledOptions });
}

function generateNewQuestion() {
    const a = Math.floor(Math.random() * 8) + 2; // Bảng từ 2-9
    const b = Math.floor(Math.random() * 9) + 1;
    const ans = a * b;
    
    currentQuestion = {
        q: `${a} x ${b}`,
        a: ans,
        options: [ans, ans + 2, ans - 2].sort(() => Math.random() - 0.5)
    };
    
    const questionEl = document.getElementById('question');
    if(questionEl) questionEl.innerText = currentQuestion.q;
}

function draw() {
    if (!gameActive) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Vẽ làn đường
    ctx.strokeStyle = "#1a1a3a";
    ctx.setLineDash([20, 20]);
    ctx.beginPath(); ctx.moveTo(140, 0); ctx.lineTo(140, canvas.height); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(260, 0); ctx.lineTo(260, canvas.height); ctx.stroke();

    // Vẽ xe của bé (Khối Neon xanh)
    ctx.shadowBlur = 15; ctx.shadowColor = "#00f3ff";
    ctx.fillStyle = "#00f3ff";
    ctx.fillRect(lanes[playerLane] - 25, canvas.height - 100, 50, 80);
    ctx.shadowBlur = 0;

    // Vẽ biển báo
    obstacles.forEach((obs, index) => {
        obs.y += speed;
        obs.laneOptions.forEach((val, i) => {
            ctx.fillStyle = "#111";
            ctx.fillRect(lanes[i] - 35, obs.y, 70, 40);
            ctx.strokeStyle = "#ff00ff";
            ctx.strokeRect(lanes[i] - 35, obs.y, 70, 40);
            ctx.fillStyle = "#fff";
            ctx.font = "20px Orbitron";
            ctx.fillText(val, lanes[i] - 15, obs.y + 28);
        });

        // Kiểm tra va chạm
        if (obs.y > canvas.height - 120 && obs.y < canvas.height - 60) {
            if (obs.laneOptions[playerLane] === currentQuestion.a) {
                score += 10;
                document.getElementById('score-val').innerText = score;
                speed += 0.1; 
                obstacles.splice(index, 1);
                generateNewQuestion();
            } else {
                // Kiểm tra checkbox trực tiếp từ DOM
                const immortalMode = document.getElementById('immortal-mode').checked;
                if (immortalMode) {
                    speed = 1; // Khựng lại một chút
                    obstacles.splice(index, 1);
                    canvas.style.boxShadow = "inset 0 0 50px red";
                    setTimeout(() => { 
                        canvas.style.boxShadow = "none"; 
                        speed = 2.5; // Tốc độ ổn định lại
                    }, 800);
                    generateNewQuestion(); 
                } else {
                    gameActive = false;
                    document.getElementById('overlay').style.display = 'flex';
                }
            }
        }
    });

    if (obstacles.length === 0 || obstacles[0].y > canvas.height) {
        if (obstacles.length === 0) spawnObstacles();
        else obstacles.shift();
    }

    requestAnimationFrame(draw);
}

function generateNewQuestion() {
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 8) + 2;
    const ans = a * b;
    currentQuestion = {
        q: `${a} x ${b}`,
        a: ans,
        options: [ans, ans + 2, ans - 2].sort(() => Math.random() - 0.5)
    };
    document.getElementById('question').innerText = currentQuestion.q;
}




window.addEventListener('keydown', (e) => {
    if (e.key === "ArrowLeft" && playerLane > 0) playerLane--;
    if (e.key === "ArrowRight" && playerLane < 2) playerLane++;
});

generateNewQuestion();
draw();