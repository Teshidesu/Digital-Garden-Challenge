let flowerImages = {};
let currentPlot = 0;

const flowerMap = {
  daisy: "daisy-po.png",
  rose: "rosa-po.png",
  sunflower: "girazol-po.png",
  lettuce: "lechuga-po.png",
  corn: "maiz-po.png",
  carrot: "zanahoria-po.png",
  tomato: "tomate-po.png",
  watermelon: "sandia-po.png",
  pumpkin: "calabaza-po.png"
};

const aliasMap = {
  rosa: "rose",
  girasol: "sunflower",
  sandia: "watermelon",
  calabaza: "pumpkin",
  maiz: "corn",
  lechuga: "lettuce",
  tomate: "tomato",
  zanahoria: "carrot",
  margarita: "daisy"
};

// 🔄 Preload p5.js
function preload() {
  for (let key in flowerMap) {
    flowerImages[key] = loadImage(`assets/image/${flowerMap[key]}`);
  }
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");
  canvas.style("position", "fixed");

  const input = document.getElementById("wordInput");
  const statusMessage = document.getElementById("statusMessage");
  const allPlots = document.querySelectorAll(".plot");
  const resetBtn = document.getElementById("resetButton");

  // 🎧 Activar audio después de cualquier clic
  document.addEventListener("click", () => {
    const audio = document.getElementById("backgroundMusic");
    if (audio && audio.paused) {
      audio.play().catch(err => {
        console.warn("Audio autoplay failed:", err);
      });
    }
  });

  // 🌱 Plantar flores
  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      let word = input.value.trim().toLowerCase();
      word = aliasMap[word] || word;

      const flowerFile = flowerMap[word];
      if (word && flowerFile && currentPlot < allPlots.length) {
        const plot = allPlots[currentPlot];
        plot.innerHTML = "";

        const img = document.createElement("img");
        img.src = `assets/image/${flowerFile}`;
        img.alt = word;
        img.style.width = "64px";
        img.style.height = "64px";
        img.style.position = "absolute";
        img.style.top = "50%";
        img.style.left = "50%";
        img.style.transform = "translate(-50%, -50%)";
        img.style.pointerEvents = "none";

        plot.appendChild(img);
        statusMessage.textContent = `🌱 Planted "${word}"!`;
        input.value = "";
        currentPlot++;

        setTimeout(() => (statusMessage.textContent = ""), 2000);
      } else {
        statusMessage.textContent = `"${word}" is not a valid plant!`;
        setTimeout(() => (statusMessage.textContent = ""), 2000);
      }
    }
  });

  // ♻️ Botón Reset
  resetBtn.addEventListener("click", () => {
    allPlots.forEach(plot => (plot.innerHTML = ""));
    currentPlot = 0;
    statusMessage.textContent = "🌿 Garden reset!";
    setTimeout(() => (statusMessage.textContent = ""), 1500);
  });
}

function draw() {
  clear();
}
