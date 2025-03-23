let plants = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(240, 248, 234);

  let input = document.getElementById("wordInput");
  let statusMessage = document.getElementById("statusMessage");

  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      let word = input.value.trim();
      if (word.length > 0) {
        statusMessage.textContent = `🌱 Growing "${word}"...`;
        generatePlant(word);
        setTimeout(() => (statusMessage.textContent = ""), 2000);
        input.value = "";
      }
    }
  });
}

function draw() {
  clear(); // Limpia el canvas para evitar que se solape sobre fondo
  for (let plant of plants) {
    plant.grow();
    plant.display();
  }
}

function generatePlant(word) {
  let x = random(width);
  let y = height - 50;
  let col = colorFromWord(word);
  plants.push(new Plant(x, y, col));
}

function colorFromWord(word) {
  let hash = 0;
  for (let i = 0; i < word.length; i++) {
    hash += word.charCodeAt(i);
  }
  return color(hash % 255, (hash * 2) % 255, (hash * 3) % 255);
}

class Plant {
  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    this.color = col;
    this.size = 5;
  }

  grow() {
    if (this.size < 50) this.size += 0.5;
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y - this.size, this.size, this.size * 2);
  }
}

// Reproducir audio incluso si el navegador lo bloquea
window.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("backgroundMusic");

  setInterval(() => {
    if (audio.paused) {
      audio.play().catch(err => {
        console.warn("Audio blocked by browser:", err);
      });
    }
  }, 2000);
});
