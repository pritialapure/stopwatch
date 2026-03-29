let startTime = 0, elapsed = 0, timer;
let running = false, lapCount = 1;

const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const lapBtn = document.getElementById("lap");
const resetBtn = document.getElementById("reset");
const lapList = document.getElementById("lapList");

function format(ms) {
  let m = Math.floor(ms / 60000);
  let s = Math.floor((ms % 60000) / 1000);
  let cs = Math.floor((ms % 1000) / 10);
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}:${String(cs).padStart(2,'0')}`;
}

startBtn.onclick = () => {
  if (!running) {
    startTime = Date.now() - elapsed;
    timer = setInterval(() => {
      elapsed = Date.now() - startTime;
      display.textContent = format(elapsed);
    }, 10);
    running = true;
    lapBtn.disabled = false;
    startBtn.textContent = "Pause";
  } else {
    clearInterval(timer);
    running = false;
    startBtn.textContent = "Start";
  }
};

lapBtn.onclick = () => {
  const li = document.createElement("li");
  li.textContent = `Lap ${lapCount++} — ${format(elapsed)}`;
  lapList.prepend(li);
};

resetBtn.onclick = () => {
  clearInterval(timer);
  elapsed = 0;
  running = false;
  lapCount = 1;
  display.textContent = "00:00:00";
  lapList.innerHTML = "";
  lapBtn.disabled = true;
  startBtn.textContent = "Start";
};

function toggleTheme() {
  document.body.classList.toggle("light");
}

function exportLaps() {
  let text = "";
  lapList.querySelectorAll("li").forEach(l => text += l.textContent + "\n");
  const blob = new Blob([text], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "laps.txt";
  a.click();
}

/* Keyboard shortcuts */
document.addEventListener("keydown", e => {
  if (e.key === " ") startBtn.click();
  if (e.key === "l") lapBtn.click();
  if (e.key === "r") resetBtn.click();
});