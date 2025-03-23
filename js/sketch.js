let plots = [];
let currentPlot = 0;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '0'); // Detrás de las capas visuales
  initPlots();

  let input = document.getElementById("wordInput");
  let statusMessage = document.getElementById("statusMessage");

  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      let word = input.value.trim();
      if (word.length > 0 && currentPlot < plots.length) {
        statusMessage.textContent = `🌱 Planting "${word}"...`;
        plots[currentPlot].plant(word);
        currentPlot++;
        input.value = "";
        setTimeout(() => (statusMessage.textContent = ""), 2000);
      }
    }
  });
}

function draw() {
  clear();
  for (let plot of plots) {
    plot.display();
  }
}

function initPlots() {
  const cols = 3;
  const rows = 3;
  const plotSize = 100;
  const margin = 20;

  const totalWidth = cols * plotSize + (cols - 1) * margin;
  const totalHeight = rows * plotSize + (rows - 1) * margin;

  const startX = width / 2 - totalWidth / 2 + 80;  // ← Esto lo ajustaste antes
  const startY = windowHeight / 2 - totalHeight / 2 + 50;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let px = startX + x * (plotSize + margin);
      let py = startY + y * (plotSize + margin);
      plots.push(new Plot(px, py, plotSize));
    }
  }
}



class Plot {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.hasPlant = false;
    this.color = null;
    this.word = '';
  }

  plant(word) {
    this.hasPlant = true;
    this.word = word;
    this.color = colorFromWord(word);
  }

  display() {
    fill(139, 69, 19); // tierra
    stroke(100);
    rect(this.x, this.y, this.size, this.size, 8);

    if (this.hasPlant) {
      fill(this.color);
      noStroke();
      ellipse(
        this.x + this.size / 2,
        this.y + this.size / 2,
        this.size / 2,
        this.size * 0.6
      );
    }
  }
}


function colorFromWord(word) {
  let hash = 0;
  for (let i = 0; i < word.length; i++) {
    hash += word.charCodeAt(i);
  }
  return color(hash % 255, (hash * 2) % 255, (hash * 3) % 255);
}

