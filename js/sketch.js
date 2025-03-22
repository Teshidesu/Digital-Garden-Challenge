let plants = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(240, 248, 234); // Light green background

    let input = document.getElementById("wordInput");
    let statusMessage = document.getElementById("statusMessage");

    // 🌱 Fix word input event listener
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

window.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("backgroundMusic");
  
    // Intenta reproducir el audio cada 2 segundos si está pausado
    setInterval(() => {
      if (audio.paused) {
        audio.play().catch(err => {
          console.warn("Audio blocked by browser:", err);
        });
      }
    }, 2000); // cada 2 segundos verifica que siga sonando
  });
  

function draw() {
    background(240, 248, 234);

    for (let plant of plants) {
        plant.grow();
        plant.display();
    }
}

// 🌿 Generate plants with colors based on words
function generatePlant(word) {
    let x = random(width);
    let y = height - 50;
    let col = colorFromWord(word);
    plants.push(new Plant(x, y, col));
}

// 🎨 Assign a color based on the word
function colorFromWord(word) {
    let hash = 0;
    for (let i = 0; i < word.length; i++) {
        hash += word.charCodeAt(i);
    }
    return color(hash % 255, (hash * 2) % 255, (hash * 3) % 255);
}

// 🌱 Plant Class
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
