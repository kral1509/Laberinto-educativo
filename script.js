let nivelActual = 0;
let mapa = [];
const tileSize = 48;

const spritesPorDireccion = {
  "pikachu.png": 3,
  "luigi.png": 8,
  "cuphead.png": 10,
};

let personajeSeleccionado = "pikachu.png";
let direccion = "down";
let frame = 1;
let posX = 0;
let posY = 0;
let destinoX = 0;
let destinoY = 0;
let moviendo = false;
let distanciaDesdeInicio = 0;
const imagenesCargadas = {};
const texturasMapa = {
  camino: new Image(),
  muro: new Image(),
};

texturasMapa.camino.src = "Recursos/mapa1camino.png";
texturasMapa.muro.src = "Recursos/mapa1muro.png";

let ultimoCambioSprite = Date.now();
const tiempoEntreSprites = 60;
const velocidad = 6;
let loopID = null;
let tiempoRestante = 30;
let intervaloTiempo = null;
let teclasPresionadas = {};

document.addEventListener("keydown", (e) => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    e.preventDefault(); // <- Esto evita el desplazamiento de la página
    teclasPresionadas[e.key] = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    e.preventDefault(); // <- También en keyup
    teclasPresionadas[e.key] = false;
  }
});

document.addEventListener("keydown", (e) => {  // Tecla ESC para regresar al menú
  teclasPresionadas[e.key] = true;
  if (e.key === "Escape") {
  const juegoVisible = !document.getElementById("pantalla-juego").classList.contains("oculto");
  const nivelesVisible = !document.getElementById("pantalla-niveles").classList.contains("oculto");

  if (juegoVisible || nivelesVisible) {
    volverAlMenu();
  }
}

});