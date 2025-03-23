let flowerImages = {};
let flowerMap = {
  daisy: "Daisy-flower2.png",
  rose: "rose2.png",
  sunflower: "sunflower2.png",
  tulip: "tulip-flower2.png",
  violet: "violet-flower2.png"
};

function preload() {
  for (let key in flowerMap) {
    flowerImages[key] = loadImage(`../assets/image/${flowerMap[key]}`);
  }
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "0");

  let input = document.getElementById("wordInput");
  let statusMessage = document.getElementById("statusMessage");
  let currentPlot = 0;
  const allPlots = document.querySelectorAll(".plot");

  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      const word = input.value.trim().toLowerCase();
      if (word.length > 0 && flowerMap[word] && currentPlot < allPlots.length) {
        const plot = allPlots[currentPlot];
        plot.innerHTML = ""; // Clear any existing flower

        const img = document.createElement("img");
        img.src = `assets/image/${flowerMap[word]}`;
        img.style.width = "32px";
        img.style.position = "absolute";
        img.style.top = "50%";
        img.style.left = "50%";
        img.style.transform = "translate(-50%, -50%)";

        plot.appendChild(img);
        statusMessage.textContent = `🌱 Planted "${word}"!`;
        input.value = "";
        currentPlot++;

        setTimeout(() => (statusMessage.textContent = ""), 2000);
      } else if (!flowerMap[word]) {
        statusMessage.textContent = `"${word}" is not a valid plant!`;
        setTimeout(() => (statusMessage.textContent = ""), 2000);
      }
    }
  });

  // Reset button clears all plots
  const resetBtn = document.getElementById("resetButton");
  resetBtn.addEventListener("click", () => {
    allPlots.forEach(plot => (plot.innerHTML = ""));
    currentPlot = 0;
  });
}

function draw() {
  clear(); // optional visual clearing
}
