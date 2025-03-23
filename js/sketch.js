let flowerImages = {};
let flowerMap = {
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

function preload() {
  for (let key in flowerMap) {
    flowerImages[key] = loadImage(`/assets/image/${flowerMap[key]}`);
  }
}

img.style.width = "48px"; // o 56px si quieres más grande
img.style.height = "48px";

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

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    let word = input.value.trim().toLowerCase();
    word = aliasMap[word] || word; // convierte alias si existe

    const flowerFile = flowerMap[word];

    if (word && flowerFile && currentPlot < allPlots.length) {
      const plot = allPlots[currentPlot];
      plot.innerHTML = "";

      const img = document.createElement("img");
      img.src = `/assets/image/${flowerFile}`;
      img.alt = word;
      img.style.width = "48px";
      img.style.height = "48px";
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


function setup() {
  // 1. Crear canvas que cubre toda la pantalla y se mantenga fijo al fondo
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");
  canvas.style("position", "fixed"); // para que no se mueva con scroll

  // 2. Preparar lógica de plantación
  const input = document.getElementById("wordInput");
  const statusMessage = document.getElementById("statusMessage");
  const allPlots = document.querySelectorAll(".plot");
  let currentPlot = 0;

  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      const word = input.value.trim().toLowerCase();
      const flowerFile = flowerMap[word];

      if (word && flowerFile && currentPlot < allPlots.length) {
        const plot = allPlots[currentPlot];
        plot.innerHTML = ""; // limpiar contenido anterior

        const img = document.createElement("img");
        img.src = `/assets/image/${flowerFile}`;
        img.alt = word;
        img.style.width = "32px";
        img.style.position = "absolute";
        img.style.top = "50%";
        img.style.left = "50%";
        img.style.transform = "translate(-50%, -50%)";
        img.style.pointerEvents = "none"; // que no interfiera

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

  const resetBtn = document.getElementById("resetButton");
resetBtn.addEventListener("click", () => {
  allPlots.forEach(plot => (plot.innerHTML = ""));
  currentPlot = 0;
  statusMessage.textContent = "🌿 Garden reset!";
  setTimeout(() => (statusMessage.textContent = ""), 1500);
});

}

function draw() {
  clear(); // solo mantiene el canvas transparente
}
