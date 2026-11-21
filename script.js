
// ĐIỀU KHIỂN CHUYỂN TRANG
function navigateToPage(pageName) {
    const pages = document.querySelectorAll(".page");

    pages.forEach(page => page.classList.remove("active"));

    // Hỗ trợ cả hai cách đặt tên trang Kho kiến thức
    const targetId = pageName === "knowledge"
        ? (document.getElementById("knowledge") ? "knowledge" : "knowledge-page")
        : pageName;

    const targetPage = document.getElementById(targetId);

    if (!targetPage) {
        console.error("Không tìm thấy trang:", targetId);
        alert("Không tìm thấy trang cần mở. Hãy kiểm tra index.html.");
        return;
    }

    targetPage.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-page]").forEach(button => {
    button.addEventListener("click", function(event) {
        event.preventDefault();
        navigateToPage(this.dataset.page);
    });
});


// NGÂN HÀNG CÂU HỎI THEO TỪNG MÔN

const questionBank = {
    math: {
        title: "📐 Toán học lớp 12",
        questions: [
            {
                q: "Đạo hàm của hàm số y = x² là gì?",
                a: ["x", "2x", "x²", "2"],
                correct: 1,
                explain: "(x²)' = 2x."
            },
            {
                q: "Nguyên hàm của f(x) = 2x là gì?",
                a: ["x² + C", "2x² + C", "x + C", "2 + C"],
                correct: 0,
                explain: "Vì (x²)' = 2x."
            }
        ]
    },

    physics: {
        title: "⚡ Vật lí lớp 12",
        questions: [
            {
                q: "Đơn vị của tần số là gì?",
                a: ["Mét", "Giây", "Héc", "Niutơn"],
                correct: 2,
                explain: "Tần số có đơn vị là Héc (Hz)."
            },
            {
                q: "Trong hệ SI, đơn vị của công suất là gì?",
                a: ["Jun", "Oát", "Vôn", "Ampe"],
                correct: 1,
                explain: "Công suất có đơn vị là Oát (W)."
            }
        ]
    },

    chemistry: {
        title: "🧪 Hóa học lớp 12",
        questions: [
            {
                q: "Chất nào sau đây thuộc loại este?",
                a: ["CH₃COOH", "CH₃COOC₂H₅", "C₂H₅OH", "CH₃CHO"],
                correct: 1,
                explain: "CH₃COOC₂H₅ là etyl axetat, một este."
            },
            {
                q: "Glucose có công thức phân tử là gì?",
                a: ["C₆H₁₂O₆", "C₁₂H₂₂O₁₁", "C₂H₅OH", "CH₄"],
                correct: 0,
                explain: "Glucose có công thức phân tử C₆H₁₂O₆."
            }
        ]
    },

    literature: {
        title: "📖 Ngữ văn lớp 12",
        questions: [
            {
                q: "Một trong những đặc trưng của ngôn ngữ nghị luận là gì?",
                a: [
                    "Tính hình tượng là chủ yếu",
                    "Tính logic và lập luận chặt chẽ",
                    "Chỉ sử dụng lời thoại",
                    "Không cần bằng chứng"
                ],
                correct: 1,
                explain: "Văn bản nghị luận cần lập luận logic và bằng chứng thuyết phục."
            }
        ]
    },

    english: {
        title: "🌐 Tiếng Anh lớp 12",
        questions: [
            {
                q: "Choose the correct answer: She _____ English for five years.",
                a: ["studies", "studied", "has studied", "study"],
                correct: 2,
                explain: "Present perfect: has/have + V3."
            }
        ]
    },

    biology: {
        title: "🧬 Sinh học lớp 12",
        questions: [
            {
                q: "Đơn phân cấu tạo nên ADN là gì?",
                a: ["Amino acid", "Nucleotide", "Glucose", "Glycerol"],
                correct: 1,
                explain: "ADN được cấu tạo từ các nucleotide."
            }
        ]
    },

    history: {
        title: "🏛️ Lịch sử lớp 12",
        questions: [
            {
                q: "Liên hợp quốc chính thức được thành lập vào năm nào?",
                a: ["1919", "1939", "1945", "1954"],
                correct: 2,
                explain: "Liên hợp quốc chính thức thành lập ngày 24/10/1945."
            }
        ]
    }
};


// ĐIỀU KHIỂN CHỌN MÔN

const subjectSelection =
    document.getElementById("subject-selection");

const quizArea =
    document.getElementById("quiz-area");

let questions = [];
let current = 0;
let score = 0;

document.querySelectorAll("[data-subject]").forEach(button => {
    button.addEventListener("click", () => {
        const subject = button.dataset.subject;

        questions = questionBank[subject].questions;
        current = 0;
        score = 0;

        document.getElementById("subject-title").textContent =
            questionBank[subject].title;

        subjectSelection.hidden = true;
        quizArea.hidden = false;

        document.getElementById("result").textContent = "";
        document.getElementById("restart").hidden = true;

        showQuestion();
    });
});


// QUAY LẠI CHỌN MÔN

document.getElementById("back-subject").addEventListener("click", () => {
    quizArea.hidden = true;
    subjectSelection.hidden = false;
});


// HIỂN THỊ CÂU HỎI

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next");

function showQuestion() {
    const item = questions[current];

    document.getElementById("progress").textContent =
        `Câu ${current + 1}/${questions.length}`;

    questionEl.textContent = item.q;
    feedback.textContent = "";
    answersEl.innerHTML = "";
    nextBtn.hidden = true;

    item.a.forEach((answer, index) => {
        const btn = document.createElement("button");
        btn.className = "answer";
        btn.textContent = answer;

        btn.addEventListener("click", () => checkAnswer(index));

        answersEl.appendChild(btn);
    });
}


// KIỂM TRA ĐÁP ÁN

function checkAnswer(index) {
    const item = questions[current];
    const buttons = answersEl.querySelectorAll("button");

    buttons.forEach((btn, i) => {
        btn.disabled = true;

        if (i === item.correct) {
            btn.classList.add("correct");
        }
    });

    if (index === item.correct) {
        score++;
        feedback.textContent = "🎉 Chính xác! " + item.explain;
    } else {
        buttons[index].classList.add("wrong");
        feedback.textContent = "Chưa chính xác! " + item.explain;
    }

    nextBtn.hidden = false;
}


// CHUYỂN CÂU

nextBtn.addEventListener("click", () => {
    current++;

    if (current < questions.length) {
        showQuestion();
    } else {
        finishQuiz();
    }
});


// KẾT QUẢ

function finishQuiz() {
    questionEl.textContent = "Bạn đã hoàn thành bài kiểm tra!";
    answersEl.innerHTML = "";
    feedback.textContent = "";
    nextBtn.hidden = true;

    document.getElementById("result").textContent =
        `Kết quả: ${score}/${questions.length} câu đúng.`;

    document.getElementById("restart").hidden = false;
}


// LÀM LẠI BÀI

document.getElementById("restart").addEventListener("click", () => {
    current = 0;
    score = 0;

    document.getElementById("result").textContent = "";
    document.getElementById("restart").hidden = true;

    showQuestion();
});

/* ==========================================
   STUDY HUB - GAMING ZONE
========================================== */

const gameMenu = document.getElementById("game-menu");
const gameSubjectMenu = document.getElementById("game-subject-menu");
const gameStage = document.getElementById("game-stage");
const gameStageContent = document.getElementById("game-stage-content");

const gameNames = {
    speed: "⚡ Đấu trường tốc độ",
    millionaire: "🏆 Ai là triệu phú?",
    mystery: "🔐 Giải mã bí mật",
    matching: "🧩 Thử thách ghép đôi"
};

const subjects = [
    {id:"math", name:"Toán học", icon:"📐"},
    {id:"physics", name:"Vật lí", icon:"⚡"},
    {id:"chemistry", name:"Hóa học", icon:"🧪"},
    {id:"literature", name:"Ngữ văn", icon:"📖"},
    {id:"english", name:"Tiếng Anh", icon:"🌐"},
    {id:"biology", name:"Sinh học", icon:"🧬"},
    {id:"history", name:"Lịch sử", icon:"🏛️"}
];

let selectedGame = "";
let selectedSubject = "";
let activeQuestions = [];
let gameClock = null;
let gameState = {};

function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

function stopGameClock() {
    clearInterval(gameClock);
    gameClock = null;
}

function showGameMenu() {
    stopGameClock();
    gameMenu.hidden = false;
    gameSubjectMenu.hidden = true;
    gameStage.hidden = true;
}

function showSubjectMenu() {
    stopGameClock();
    gameMenu.hidden = true;
    gameSubjectMenu.hidden = false;
    gameStage.hidden = true;
}

function showGameStage() {
    gameMenu.hidden = true;
    gameSubjectMenu.hidden = true;
    gameStage.hidden = false;
}

document.querySelectorAll("[data-game]").forEach(button => {
    button.addEventListener("click", () => {
        selectedGame = button.dataset.game;

        document.getElementById("selected-game-title").textContent =
            gameNames[selectedGame];

        const grid = document.getElementById("game-subject-grid");
        grid.innerHTML = "";

        subjects.forEach(subject => {
            const btn = document.createElement("button");
            btn.className = "subject-card";

            btn.innerHTML = `
                <span>${subject.icon}</span>
                <h3>${subject.name}</h3>
                <p>Thử thách kiến thức ${subject.name} lớp 12.</p>
                <small>CHỌN MÔN →</small>
            `;

            btn.addEventListener("click", () => {
                selectedSubject = subject.id;
                activeQuestions = questionBank[subject.id].questions;
                startSelectedGame();
            });

            grid.appendChild(btn);
        });

        showSubjectMenu();
    });
});

document.getElementById("back-games")
    .addEventListener("click", showGameMenu);

document.getElementById("back-game-subject")
    .addEventListener("click", showSubjectMenu);

/* ==========================================
   HÀM HIỂN THỊ CÂU HỎI CHUNG
========================================== */

function createStats(items) {
    return `
        <div class="game-stats">
            ${items.map(item => `
                <div class="game-stat">
                    <small>${item.label}</small>
                    <strong id="${item.id}">${item.value}</strong>
                </div>
            `).join("")}
        </div>
    `;
}

function createOptionButtons(item, callback) {
    return item.a.map((answer, index) => `
        <button class="game-option" data-index="${index}">
            ${String.fromCharCode(65 + index)}. ${answer}
        </button>
    `).join("");
}

function startSelectedGame() {
    showGameStage();

    if (!activeQuestions || activeQuestions.length === 0) {
        gameStageContent.innerHTML = "<h3>Chưa có câu hỏi cho môn học này.</h3>";
        return;
    }

    if (selectedGame === "speed") startSpeedGame();
    if (selectedGame === "millionaire") startMillionaire();
    if (selectedGame === "mystery") startMystery();
    if (selectedGame === "matching") startMatching();
}

/* ==========================================
   GAME 01 - ĐẤU TRƯỜNG TỐC ĐỘ
========================================== */

function startSpeedGame() {
    stopGameClock();

    gameState = {
        time: 60,
        score: 0,
        lives: 3,
        combo: 0,
        index: 0,
        questions: shuffle(activeQuestions),
        answered: false
    };

    gameStageContent.innerHTML = `
        <span class="tag">SPEED CHALLENGE ⚡</span>
        <h2>Đấu trường tốc độ</h2>
        <p>Trả lời đúng để tích lũy điểm và combo!</p>

        ${createStats([
            {label:"THỜI GIAN",id:"speed-time",value:60},
            {label:"ĐIỂM SỐ",id:"speed-score",value:0},
            {label:"MẠNG SỐNG",id:"speed-lives",value:"❤️❤️❤️"}
        ])}

        <div class="game-progress">
            <div id="speed-bar" style="width:100%"></div>
        </div>

        <div id="speed-question"></div>
        <div id="speed-options" class="game-options"></div>
        <div id="speed-feedback" class="game-message"></div>
        <button id="speed-next" class="game-action" hidden>
            Câu tiếp theo →
        </button>
    `;

    showSpeedQuestion();

    gameClock = setInterval(() => {
        gameState.time--;

        document.getElementById("speed-time").textContent =
            gameState.time;

        document.getElementById("speed-bar").style.width =
            gameState.time / 60 * 100 + "%";

        if (gameState.time <= 0) endSpeedGame();
    }, 1000);
}

function showSpeedQuestion() {
    const item = gameState.questions[
        gameState.index % gameState.questions.length
    ];

    gameState.answered = false;

    document.getElementById("speed-question").innerHTML = `
        <div class="game-question-box">
            <p>${questionBank[selectedSubject].title}</p>
            <h3>${item.q}</h3>
        </div>
    `;

    document.getElementById("speed-options").innerHTML =
        createOptionButtons(item);

    document.querySelectorAll("#speed-options button").forEach(btn => {
        btn.addEventListener("click", () => {
            answerSpeed(Number(btn.dataset.index));
        });
    });

    document.getElementById("speed-next").hidden = true;
    document.getElementById("speed-feedback").textContent = "";
}

function answerSpeed(index) {
    if (gameState.answered || gameState.time <= 0) return;

    gameState.answered = true;

    const item = gameState.questions[
        gameState.index % gameState.questions.length
    ];

    const buttons = document.querySelectorAll("#speed-options button");

    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === item.correct) btn.classList.add("correct");
    });

    if (index === item.correct) {
        gameState.combo++;
        gameState.score += 10 + Math.min(gameState.combo - 1, 5) * 2;

        document.getElementById("speed-feedback").textContent =
            "🎉 Chính xác! +" + (10 + Math.min(gameState.combo - 1, 5) * 2) +
            " điểm · Combo x" + gameState.combo;
    } else {
        buttons[index].classList.add("wrong");
        gameState.lives--;
        gameState.combo = 0;

        document.getElementById("speed-feedback").textContent =
            "💡 " + item.explain;
    }

    document.getElementById("speed-score").textContent =
        gameState.score;

    document.getElementById("speed-lives").textContent =
        "❤️".repeat(gameState.lives) +
        "🖤".repeat(3 - gameState.lives);

    if (gameState.lives <= 0) {
        endSpeedGame();
        return;
    }

    document.getElementById("speed-next").hidden = false;
}

document.addEventListener("click", event => {
    if (event.target.id === "speed-next" && selectedGame === "speed") {
        if (!gameState.answered) return;
        gameState.index++;
        showSpeedQuestion();
    }
});

function endSpeedGame() {
    stopGameClock();
    showGameResult(
        "ĐẤU TRƯỜNG KẾT THÚC!",
        gameState.score,
        "⚡ Điểm thưởng tốc độ"
    );
}

/* ==========================================
   GAME 02 - AI LÀ TRIỆU PHÚ
========================================== */

function startMillionaire() {
    stopGameClock();

    gameState = {
        index: 0,
        score: 0,
        answered: false,
        questions: shuffle(activeQuestions)
    };

    showMillionaireQuestion();
}

function showMillionaireQuestion() {
    if (gameState.index >= 15) {
        showGameResult("CHÚC MỪNG NHÀ TRIỆU PHÚ!", 1500, "🏆 Bạn đã hoàn thành 15 lượt!");
        return;
    }

    const item = gameState.questions[
        gameState.index % gameState.questions.length
    ];

    gameState.answered = false;

    gameStageContent.innerHTML = `
        <span class="tag">WHO WANTS TO BE A MILLIONAIRE?</span>
        <h2>🏆 Ai là triệu phú?</h2>

        <div class="game-levels">
            <span>5 câu: 100 điểm</span>
            <span>10 câu: 500 điểm</span>
            <span>15 câu: 1500 điểm</span>
        </div>

        ${createStats([
            {label:"CÂU HỎI",id:"millionaire-number",value:(gameState.index + 1)+"/15"},
            {label:"ĐIỂM THƯỞNG",id:"millionaire-score",value:gameState.score},
            {label:"ĐỘ KHÓ",id:"millionaire-level",value:gameState.index < 5 ? "Dễ" : gameState.index < 10 ? "Vừa" : "Khó"}
        ])}

        <div class="game-question-box">
            <h3>${item.q}</h3>
        </div>

        <div id="millionaire-options" class="game-options">
            ${createOptionButtons(item)}
        </div>

        <div id="millionaire-feedback" class="game-message"></div>

        <button id="help-5050" class="game-action game-secondary">
            50 : 50
        </button>

        <button id="millionaire-next" class="game-action" hidden>
            Câu tiếp theo →
        </button>
    `;

    document.querySelectorAll("#millionaire-options button").forEach(btn => {
        btn.addEventListener("click", () => {
            answerMillionaire(Number(btn.dataset.index));
        });
    });

    document.getElementById("help-5050").addEventListener("click", use5050);
}

function answerMillionaire(index) {
    if (gameState.answered) return;

    gameState.answered = true;

    const item = gameState.questions[
        gameState.index % gameState.questions.length
    ];

    const buttons = document.querySelectorAll("#millionaire-options button");

    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === item.correct) btn.classList.add("correct");
    });

    if (index === item.correct) {
        gameState.score += (gameState.index + 1) * 10;
        document.getElementById("millionaire-feedback").textContent =
            "🎉 Chính xác! " + item.explain;
    } else {
        buttons[index].classList.add("wrong");
        document.getElementById("millionaire-feedback").textContent =
            "💡 " + item.explain;
    }

    document.getElementById("millionaire-score").textContent =
        gameState.score;

    document.getElementById("help-5050").disabled = true;
    document.getElementById("millionaire-next").hidden = false;
}

function use5050() {
    if (gameState.answered) return;

    const item = gameState.questions[
        gameState.index % gameState.questions.length
    ];

    const buttons = [...document.querySelectorAll("#millionaire-options button")];

    const wrongButtons = shuffle(
        buttons.filter((btn, index) => index !== item.correct)
    );

    wrongButtons.slice(0, 2).forEach(btn => {
        btn.disabled = true;
        btn.style.visibility = "hidden";
    });

    document.getElementById("help-5050").disabled = true;
}

document.addEventListener("click", event => {
    if (event.target.id === "millionaire-next" &&
        selectedGame === "millionaire" && gameState.answered) {
        gameState.index++;
        showMillionaireQuestion();
    }
});

/* ==========================================
   GAME 03 - GIẢI MÃ BÍ MẬT
========================================== */

function startMystery() {
    stopGameClock();

    const item = shuffle(activeQuestions)[0];

    const correctAnswer = item.a[item.correct];

    gameState = {
        item,
        answer: correctAnswer.toLowerCase().trim(),
        hints: 0,
        score: 100,
        finished: false
    };

    gameStageContent.innerHTML = `
        <span class="tag">MYSTERY CHALLENGE 🔐</span>
        <h2>Giải mã bí mật</h2>
        <p>Đọc câu hỏi và tìm đáp án chính xác.</p>

        <div class="game-question-box">
            <p>GỢI Ý CỦA BẠN</p>
            <h3>${item.q}</h3>
        </div>

        <div class="game-levels">
            <span>💡 Gợi ý 1: ${item.explain}</span>
            <span>⭐ Điểm tối đa: 100</span>
        </div>

        <input id="mystery-answer" class="mystery-input"
            placeholder="Nhập đáp án của bạn...">

        <div id="mystery-feedback" class="game-message"></div>

        <button id="mystery-submit" class="game-action">
            GIẢI MÃ →
        </button>

        <button id="mystery-hint" class="game-action game-secondary">
            Xem đáp án gợi ý
        </button>
    `;

    document.getElementById("mystery-submit").addEventListener("click", checkMystery);

    document.getElementById("mystery-hint").addEventListener("click", () => {
        if (gameState.finished) return;

        gameState.hints++;
        gameState.score = Math.max(20, 100 - gameState.hints * 20);

        document.getElementById("mystery-feedback").textContent =
            "💡 Gợi ý: " + gameState.item.explain;
    });
}

function checkMystery() {
    if (gameState.finished) return;

    const value = document.getElementById("mystery-answer")
        .value.trim().toLowerCase();

    const feedback = document.getElementById("mystery-feedback");

    if (!value) {
        feedback.textContent = "Bạn hãy nhập đáp án trước nhé!";
        return;
    }

    const accepted = [
        gameState.answer,
        gameState.answer.replace(/\s+/g, ""),
        gameState.item.a[gameState.item.correct].toLowerCase()
    ];

    if (accepted.includes(value)) {
        gameState.finished = true;

        feedback.textContent = "🎉 Giải mã thành công! " + gameState.item.explain;

        document.getElementById("mystery-answer").disabled = true;
        document.getElementById("mystery-submit").disabled = true;

        document.getElementById("mystery-hint").disabled = true;

        setTimeout(() => {
            showGameResult("GIẢI MÃ THÀNH CÔNG!", gameState.score, "🔐 Điểm khám phá");
        }, 1200);
    } else {
        feedback.textContent = "Chưa chính xác! Hãy thử lại nhé.";
    }
}

/* ==========================================
   GAME 04 - THỬ THÁCH GHÉP ĐÔI
========================================== */

function startMatching() {
    stopGameClock();

    const source = shuffle(activeQuestions).slice(0, 4);

    let cards = [];

    source.forEach((item, index) => {
        cards.push({
            id:index,
            text:item.q,
            pair:index
        });

        cards.push({
            id:index,
            text:item.a[item.correct],
            pair:index
        });
    });

    gameState = {
        cards:shuffle(cards),
        selected:null,
        matched:[],
        moves:0,
        locked:false
    };

    renderMatching();
}

function renderMatching() {
    gameStageContent.innerHTML = `
        <span class="tag">MEMORY MATCH 🧩</span>
        <h2>Thử thách ghép đôi</h2>
        <p>Tìm các cặp câu hỏi và đáp án tương ứng.</p>

        ${createStats([
            {label:"LƯỢT GHÉP",id:"match-moves",value:0},
            {label:"CẶP ĐÚNG",id:"match-pairs",value:"0/4"},
            {label:"THẺ CÒN LẠI",id:"match-left",value:8}
        ])}

        <div id="matching-grid" class="game-memory-grid"></div>
        <div id="matching-feedback" class="game-message">
            Chọn hai thẻ để ghép đôi!
        </div>
    `;

    const grid = document.getElementById("matching-grid");

    gameState.cards.forEach((card, index) => {
        const btn = document.createElement("button");

        btn.className = "match-card";
        btn.textContent = "❔";
        btn.dataset.index = index;

        btn.addEventListener("click", () => selectMatch(index));

        grid.appendChild(btn);
    });
}

function selectMatch(index) {
    if (gameState.locked || gameState.matched.includes(index)) return;

    const buttons = document.querySelectorAll(".match-card");

    if (gameState.selected === index) return;

    buttons[index].textContent = gameState.cards[index].text;
    buttons[index].classList.add("selected");

    if (gameState.selected === null) {
        gameState.selected = index;
        return;
    }

    gameState.moves++;

    const first = gameState.selected;
    const second = index;

    const firstCard = gameState.cards[first];
    const secondCard = gameState.cards[second];

    gameState.locked = true;
    document.getElementById("match-moves").textContent = gameState.moves;

    if (firstCard.pair === secondCard.pair && first !== second) {
        gameState.matched.push(first, second);

        buttons[first].classList.add("matched");
        buttons[second].classList.add("matched");

        buttons[first].classList.remove("selected");
        buttons[second].classList.remove("selected");

        document.getElementById("matching-feedback").textContent =
            "🎉 Ghép đúng rồi!";

        gameState.selected = null;
        gameState.locked = false;

        document.getElementById("match-pairs").textContent =
            gameState.matched.length / 2 + "/4";

        document.getElementById("match-left").textContent =
            8 - gameState.matched.length;

        if (gameState.matched.length === 8) {
            setTimeout(() => {
                const score = Math.max(40, 100 - (gameState.moves - 4) * 5);
                showGameResult("HOÀN THÀNH GHÉP ĐÔI!", score, "🧩 Điểm trí nhớ");
            }, 600);
        }
    } else {
        document.getElementById("matching-feedback").textContent =
            "Chưa đúng cặp. Thử lại nhé!";

        setTimeout(() => {
            buttons[first].textContent = "❔";
            buttons[second].textContent = "❔";

            buttons[first].classList.remove("selected");
            buttons[second].classList.remove("selected");

            gameState.selected = null;
            gameState.locked = false;
        }, 850);
    }
}

/* ==========================================
   MÀN HÌNH KẾT QUẢ CHUNG
========================================== */

function showGameResult(title, score, description) {
    stopGameClock();

    let rank;

    if (score >= 150) rank = "🏆 BẬC THẦY TRI THỨC";
    else if (score >= 80) rank = "🥇 CAO THỦ";
    else if (score >= 40) rank = "🥈 CHIẾN BINH";
    else rank = "🌱 TÂN BINH";

    gameStageContent.innerHTML = `
        <div style="font-size:65px;margin:15px">🏆</div>

        <h2>${title}</h2>

        <p>Chúc mừng bạn đã hoàn thành thử thách!</p>

        <div class="game-result-score">${score}</div>

        <h3>${rank}</h3>

        <p style="margin:15px;color:#888">${description}</p>

        <button class="game-action" id="retry-game">
            CHƠI LẠI 🚀
        </button>

        <button class="game-action game-secondary" id="return-games">
            DANH SÁCH TRÒ CHƠI
        </button>
    `;

    document.getElementById("retry-game").addEventListener("click", startSelectedGame);
    document.getElementById("return-games").addEventListener("click", showGameMenu);
}
// ======================================
// STUDY HUB - KNOWLEDGE STORAGE
// Lưu tài liệu bằng IndexedDB
// ======================================

const DB_NAME = "StudyHubKnowledge";
const DB_VERSION = 1;
const STORE_NAME = "documents";

let knowledgeDB;

// Mở cơ sở dữ liệu
function openKnowledgeDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = function(event) {
            const db = event.target.result;

            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, {
                    keyPath: "id",
                    autoIncrement: true
                });
            }
        };

        request.onsuccess = function(event) {
            knowledgeDB = event.target.result;
            resolve(knowledgeDB);
        };

        request.onerror = function() {
            reject(request.error);
        };
    });
}

// Lấy danh sách tài liệu
function getKnowledgeFiles() {
    return new Promise((resolve, reject) => {
        const transaction = knowledgeDB.transaction(
            STORE_NAME,
            "readonly"
        );

        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Lưu một tài liệu
function saveKnowledgeFile(file) {
    return new Promise((resolve, reject) => {
        const transaction = knowledgeDB.transaction(
            STORE_NAME,
            "readwrite"
        );

        const store = transaction.objectStore(STORE_NAME);

        const documentData = {
            name: file.name,
            type: file.type,
            size: file.size,
            date: new Date().toISOString(),
            file: file
        };

        const request = store.add(documentData);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Xóa tài liệu
function deleteKnowledgeFile(id) {
    return new Promise((resolve, reject) => {
        const transaction = knowledgeDB.transaction(
            STORE_NAME,
            "readwrite"
        );

        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(Number(id));

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

// Định dạng dung lượng
function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) {
        return (bytes / 1024).toFixed(1) + " KB";
    }

    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

// Nhận diện loại tài liệu
function getFileCategory(file) {
    const ext = file.name.split(".").pop().toLowerCase();

    if (ext === "pdf") return "pdf";

    if (["doc", "docx", "txt", "rtf"].includes(ext)) {
        return "document";
    }

    if (["ppt", "pptx"].includes(ext)) {
        return "presentation";
    }

    if (["xls", "xlsx", "csv"].includes(ext)) {
        return "spreadsheet";
    }

    if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext)) {
        return "image";
    }

    return "other";
}

// Biểu tượng tài liệu
function getFileIcon(category) {
    const icons = {
        pdf: "📕",
        document: "📘",
        presentation: "📊",
        spreadsheet: "📗",
        image: "🖼️",
        other: "📁"
    };

    return icons[category] || "📁";
}

// Hiển thị danh sách
async function renderKnowledgeFiles() {
    const list = document.getElementById("knowledge-list");
    const count = document.getElementById("file-count");
    const status = document.getElementById("knowledge-status");

    if (!list || !count || !status) return;

    try {
        const files = await getKnowledgeFiles();

        count.textContent = files.length;

        const keyword = document
            .getElementById("knowledge-search")
            .value.trim().toLowerCase();

        const filter = document
            .getElementById("knowledge-filter")
            .value;

        const filteredFiles = files.filter(file => {
            const category = getFileCategory(file);

            const matchesName = file.name
                .toLowerCase()
                .includes(keyword);

            const matchesCategory =
                filter === "all" ||
                category === filter;

            return matchesName && matchesCategory;
        });

        status.textContent =
            `Hiển thị ${filteredFiles.length}/${files.length} tài liệu`;

        if (filteredFiles.length === 0) {
            list.innerHTML = `
                <div class="knowledge-empty">
                    <div style="font-size:40px">📂</div>
                    <h3>Chưa tìm thấy tài liệu</h3>
                    <p>Hãy tải tài liệu lên hoặc thay đổi từ khóa tìm kiếm.</p>
                </div>
            `;
            return;
        }

        list.innerHTML = filteredFiles.map(file => {
            const category = getFileCategory(file);

            return `
                <div class="knowledge-card">
                    <div class="knowledge-file-icon">
                        ${getFileIcon(category)}
                    </div>

                    <h3 title="${escapeKnowledgeText(file.name)}">
                        ${escapeKnowledgeText(file.name)}
                    </h3>

                    <p>
                        ${formatFileSize(file.size)}
                        · ${new Date(file.date).toLocaleDateString("vi-VN")}
                    </p>

                    <div class="knowledge-actions">
                        <button
                            class="knowledge-open"
                            onclick="openKnowledgeFile(${file.id})"
                        >
                            Mở / Tải xuống
                        </button>

                        <button
                            class="knowledge-delete"
                            onclick="removeKnowledgeFile(${file.id})"
                        >
                            Xóa
                        </button>
                    </div>
                </div>
            `;
        }).join("");

    } catch (error) {
        console.error(error);
        status.textContent = "Không thể tải danh sách tài liệu.";
    }
}

// Tránh chèn nội dung tên file thành HTML
function escapeKnowledgeText(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);
}

// Mở hoặc tải tài liệu
async function openKnowledgeFile(id) {
    const files = await getKnowledgeFiles();
    const selectedFile = files.find(file => file.id === Number(id));

    if (!selectedFile) {
        alert("Không tìm thấy tài liệu.");
        return;
    }

    const blob = new Blob(
        [selectedFile.file],
        { type: selectedFile.type || "application/octet-stream" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = selectedFile.name;
    link.target = "_blank";
    link.rel = "noopener";
    link.click();

    setTimeout(() => URL.revokeObjectURL(url), 60000);
}

// Xóa tài liệu
async function removeKnowledgeFile(id) {
    const confirmed = confirm(
        "Bạn có chắc chắn muốn xóa tài liệu này không?"
    );

    if (!confirmed) return;

    try {
        await deleteKnowledgeFile(id);
        await renderKnowledgeFiles();
    } catch (error) {
        alert("Không thể xóa tài liệu.");
        console.error(error);
    }
}

// Sự kiện tải tài liệu
document.addEventListener("DOMContentLoaded", async function() {
    const fileInput = document.getElementById("knowledge-files");

    if (!fileInput) return;

    try {
        await openKnowledgeDB();
        await renderKnowledgeFiles();
    } catch (error) {
        console.error(error);
        alert("Trình duyệt không thể khởi tạo kho tài liệu.");
        return;
    }

    fileInput.addEventListener("change", async function() {
        const files = Array.from(this.files);

        if (files.length === 0) return;

        try {
            for (const file of files) {
                await saveKnowledgeFile(file);
            }

            alert(`Đã lưu thành công ${files.length} tài liệu!`);
            await renderKnowledgeFiles();

        } catch (error) {
            console.error(error);
            alert("Có lỗi khi lưu tài liệu. Có thể dung lượng lưu trữ đã đầy.");
        }

        this.value = "";
    });

    document
        .getElementById("knowledge-search")
        .addEventListener("input", renderKnowledgeFiles);

    document
        .getElementById("knowledge-filter")
        .addEventListener("change", renderKnowledgeFiles);
});