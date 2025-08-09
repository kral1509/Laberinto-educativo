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

// Precarga inicial del personaje por defecto
preCargarSprites(personajeSeleccionado);

// Función para precargar sprites
function preCargarSprites(nombreArchivo) {
  const baseNombre = nombreArchivo.split(".")[0].toLowerCase();
  const max = spritesPorDireccion[nombreArchivo];
  const direcciones = ["up", "down", "left", "right"];

  imagenesCargadas[baseNombre] = {};

  direcciones.forEach(dir => {
    imagenesCargadas[baseNombre][dir] = [];
    for (let i = 1; i <= max; i++) {
      const img = new Image();
      img.src = Recursos/${baseNombre}${i}${dir}.png;
      imagenesCargadas[baseNombre][dir].push(img);
    }
  });

  const idle = new Image();
  idle.src = Recursos/${baseNombre}Idle.png;
  imagenesCargadas[baseNombre]["idle"] = idle;
}

// Selector del personaje desde el menú
document.getElementById("seleccion-personaje").addEventListener("change", function () {
  personajeSeleccionado = this.value;
  document.getElementById("imagen-personaje").src = "Recursos/" + personajeSeleccionado;
  preCargarSprites(personajeSeleccionado);
});

function mostrarJuego() {
  document.getElementById("menu-principal").classList.add("oculto");
  document.getElementById("pantalla-niveles").classList.add("oculto");
  document.getElementById("pantalla-juego").classList.remove("oculto");
  iniciarNivel(0);
}

function volverAlMenu() {
  document.getElementById("pantalla-juego").classList.add("oculto");
  document.getElementById("pantalla-niveles").classList.add("oculto");
  document.getElementById("menu-principal").classList.remove("oculto");
}

function salir() {
  alert("Gracias por jugar :)");
}

function irAlMenu() {
  document.getElementById("pantalla-inicio").classList.add("oculto");
  document.getElementById("menu-principal").classList.remove("oculto");
}

function mostrarNiveles() {
  document.getElementById("menu-principal").classList.add("oculto");
  document.getElementById("pantalla-niveles").classList.remove("oculto");
}

function iniciarNivel(nivel) {
  nivelActual = nivel;
  mapa = JSON.parse(JSON.stringify(mapasPorNivel[nivelActual]));

  let encontrado = false;
  for (let y = 0; y < mapa.length; y++) {
    for (let x = 0; x < mapa[0].length; x++) {
      if (mapa[y][x] === 4) {
        if (!encontrado) {
          posX = x * tileSize + tileSize / 2;
          posY = y * tileSize + tileSize / 2;
          destinoX = posX;
          destinoY = posY;
          encontrado = true;
        }
        mapa[y][x] = 0;
      }
    }