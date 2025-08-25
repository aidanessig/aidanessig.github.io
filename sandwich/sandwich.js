let words = {4: [], 5: [], 6: []};
let currentWord = "";
let wordLength = 4;
let currentGuess = [];
let startLetter = "";
let endLetter = "";
let timerInterval;
let startTime = 0;
let elapsedTotal = 0;
let roundFinished = false;
let hintsUsed = 0;
let nextHintIndex = 1;
let roundTimes = {4: 0, 5: 0, 6: 0}; 

// seeded rng
function cyrb128(str) {
  let h1 = 1779033703, h2 = 3144134277,
      h3 = 1013904242, h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  return [(h1^h2^h3^h4) >>> 0];
}

function seededRandom(seed) {
  let s = cyrb128(seed)[0];
  return function() {
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickDailyWord(list, dateSeed, offset=0) {
  const rand = seededRandom(dateSeed + "_" + offset);
  const idx = Math.floor(rand() * list.length);
  return list[idx];
}

async function loadWords() {
  for (let len of [4, 5, 6]) {
    const res = await fetch(`words-${len}.txt`);
    words[len] = res.ok ? (await res.text()).trim().split("\n") : [];
  }
  startRound(4);
  startTimer();
}

function startTimer() {
  startTime = Date.now();
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (!roundFinished) {
      let elapsed = elapsedTotal + (Date.now() - startTime) / 1000;
      document.getElementById("timer").textContent = `${elapsed.toFixed(1)}s`;
    }
  }, 100);
}

function stopTimer() {
  const segment = (Date.now() - startTime) / 1000;
  elapsedTotal += segment;
  roundTimes[wordLength] = segment;
  clearInterval(timerInterval);
}

function startRound(length) {
  wordLength = length;
  const list = words[length];

  const today = new Date().toISOString().split("T")[0];
  currentWord = pickDailyWord(list, today, length);

  startLetter = currentWord[0];
  endLetter = currentWord[currentWord.length - 1];
  currentGuess = Array(length).fill("");
  roundFinished = false;
  hintsUsed = 0;
  nextHintIndex = 1;

  document.getElementById("word-length").textContent = `Length: ${length}`;
  document.getElementById("next-instructions").style.display = "none";
  document.getElementById("definitions").innerHTML = "";

  renderBoard();
  renderKeyboard();

  const nextBtn = document.getElementById("next-btn");
  if (nextBtn) nextBtn.remove();

  const hintBtn = document.getElementById("hint-btn");
  if (hintBtn && hintBtn.style.display === "none") {
    hintBtn.style.display = "inline-block";
  }
}

function renderBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";
  for (let i = 0; i < wordLength; i++) {
    const div = document.createElement("div");
    div.className = "box";
    if (i === 0) {
      div.textContent = startLetter;
      div.classList.add("locked");
      currentGuess[i] = startLetter;
    } else if (i === wordLength - 1) {
      div.textContent = endLetter;
      div.classList.add("locked");
      currentGuess[i] = endLetter;
    } else {
      div.textContent = currentGuess[i];
    }
    board.appendChild(div);
  }
}

function renderKeyboard() {
  const layout = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
  const kb = document.getElementById("keyboard");
  kb.innerHTML = "";

  layout.forEach((row, rowIdx) => {
    const rowDiv = document.createElement("div");
    rowDiv.className = "kb-row";

    if (rowIdx === 2) {
      const enterBtn = document.createElement("button");
      enterBtn.className = "key wide-key";
      enterBtn.textContent = "Enter";
      enterBtn.onclick = () => handleKey("Enter");
      rowDiv.appendChild(enterBtn);
    }

    row.split("").forEach(letter => {
      const btn = document.createElement("button");
      btn.className = "key";
      btn.textContent = letter;
      btn.onclick = () => handleKey(letter.toLowerCase());
      rowDiv.appendChild(btn);
    });

    if (rowIdx === 2) {
      const delBtn = document.createElement("button");
      delBtn.className = "key wide-key";
      delBtn.textContent = "⌫";
      delBtn.onclick = () => handleKey("⌫");
      rowDiv.appendChild(delBtn);
    }

    kb.appendChild(rowDiv);
  });
}

function handleKey(key) {
  if (roundFinished && key === "Enter") {
    const nextBtn = document.getElementById("next-btn");
    if (nextBtn) nextBtn.click();
    return;
  }

  if (roundFinished) return;

  if (key === "⌫") {
    for (let i = wordLength - 2; i > 0; i--) {
      if (currentGuess[i] !== "") {
        currentGuess[i] = "";
        break;
      }
    }
  } else if (key === "Enter") {
    submitGuess();
  } else {
    for (let i = 1; i < wordLength - 1; i++) {
      if (currentGuess[i] === "") {
        currentGuess[i] = key;
        break;
      }
    }
  }
  renderBoard();
}

function submitGuess() {
  if (roundFinished) return;

  const guess = currentGuess.join("");
  if (words[wordLength].includes(guess)) {
    roundFinished = true;
    stopTimer();
    flashCorrect();
    showToast("Correct", true);

    const hintBtn = document.getElementById("hint-btn");
    if (hintBtn) hintBtn.style.display = "none";

    if (wordLength < 6) {
      const instr = document.getElementById("next-instructions");
      instr.style.display = "block";
      instr.innerHTML = `Select <strong>Next Word</strong> to continue.`;
      addNextButton();
    } else {
      showPopup();
    }

    fetchDefinition(guess);
  } else {
    shakeBoard();
    showToast("Not in word list", false);
  }
}

function giveHint() {
  if (roundFinished) return;
  if (nextHintIndex >= wordLength - 1) return;

  for (let i = 1; i < wordLength - 1; i++) {
    currentGuess[i] = "";
  }

  for (let i = 1; i < nextHintIndex; i++) {
    currentGuess[i] = currentWord[i];
  }

  currentGuess[nextHintIndex] = currentWord[nextHintIndex];
  hintsUsed++;
  nextHintIndex++;

  renderBoard();
}

function fetchDefinition(word) {
  const defBox = document.getElementById("definitions");
  defBox.innerHTML = "<em>Loading definition...</em>";

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(res => res.json())
    .then(data => {
      if (!Array.isArray(data)) {
        defBox.innerHTML = "<em>No definitions found.</em>";
        return;
      }
      let html = `<h3>${word}</h3>`;
      data[0].meanings.forEach(m => {
        html += `<p><strong>${m.partOfSpeech}:</strong> ${m.definitions[0].definition}`;
        if (m.definitions[0].example) {
          html += ` <em>(${m.definitions[0].example})</em>`;
        }
        html += "</p>";
      });
      defBox.innerHTML = html;
    })
    .catch(() => {
      defBox.innerHTML = "<em>Error fetching definition.</em>";
    });
}

function shakeBoard() {
  const board = document.getElementById("board");
  board.classList.add("shake");
  setTimeout(() => board.classList.remove("shake"), 400);
}

function flashCorrect() {
  document.querySelectorAll(".box").forEach(box => {
    box.classList.add("flash-green");
    setTimeout(() => box.classList.remove("flash-green"), 600);
  });
}

function addNextButton() {
  const controls = document.getElementById("controls");
  if (!document.getElementById("next-btn")) {
    const btn = document.createElement("button");
    btn.id = "next-btn";
    btn.textContent = "Next Word";
    btn.onclick = () => {
      startRound(wordLength + 1);
      startTimer();
    };
    controls.appendChild(btn);
  }
}

function showPopup() {
  const controls = document.getElementById("controls");
  const oldHint = document.getElementById("hint-btn");
  if (oldHint) oldHint.remove();

  const finishedMsg = document.createElement("p");
  finishedMsg.textContent = "🎉 You finished Sandwich!";
  finishedMsg.className = "instructions";
  finishedMsg.style.display = "block";
  controls.insertBefore(finishedMsg, controls.firstChild);

  const shareBtn = document.createElement("button");
  shareBtn.id = "share-btn";
  shareBtn.textContent = "Share";
  shareBtn.onclick = shareResults;
  controls.appendChild(shareBtn);
}

function shareResults() {
  const today = new Date().toISOString().split("T")[0];
  const elapsed = elapsedTotal.toFixed(1);
  const hints = hintsUsed;

  const fmt = val => (val ? parseFloat(val).toFixed(1) : "–");

  const title = `🥪 Sandwich (${today})`;
  const text =
    `✅ Finished in ${elapsed}s with ${hints} hint(s)\n` +
    `🔡 4-letter: ${fmt(roundTimes[4])}s, ` +
    `5-letter: ${fmt(roundTimes[5])}s, ` +
    `6-letter: ${fmt(roundTimes[6])}s`;

  if (navigator.share) {
    navigator.share({
      title: title,
      text: text,
    }).catch(err => {
      console.error("Share failed", err);
      navigator.clipboard.writeText(`${title}\n${text}`);
      alert("Results copied to clipboard!");
    });
  } else {
    navigator.clipboard.writeText(`${title}\n${text}`);
    alert("Results copied to clipboard!");
  }
}

function showToast(message, success = false) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = success ? "show success" : "show";
  setTimeout(() => { toast.className = ""; }, 1500);
}

document.addEventListener("DOMContentLoaded", () => {
  // pause until user starts
  document.getElementById("start-btn").onclick = () => {
    document.getElementById("landing").style.display = "none";
    const hintBtn = document.getElementById("hint-btn");
    if (hintBtn) hintBtn.style.display = "inline-block";
    loadWords(); // load words and start game
  };
});

document.addEventListener("keydown", e => {
  if (/^[a-zA-Z]$/.test(e.key)) handleKey(e.key.toLowerCase());
  if (e.key === "Enter") {
    e.preventDefault();
    handleKey("Enter");
  }
  if (e.key === "Backspace") {
    e.preventDefault();
    handleKey("⌫");
  }
});

document.getElementById("hint-btn").onclick = giveHint;
