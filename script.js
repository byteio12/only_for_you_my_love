// ====== Edita aquí ======
const MENSAJE_FINAL = "Ahora ya está más bonito, ahora viene lo especial para ti JSJSJSJS 💖";
const PAUSA_DRAMATICA_MS = 2000;

const FECHA_INICIO = new Date(2026, 7, 3);   // 3 de agosto
const FECHA_FIN = new Date(2026, 10, 3);     // 3 de noviembre
// ========================

let intervaloFlotantes;

const $ = (id) => document.getElementById(id);
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
const rand = (min, max) => Math.random() * (max - min) + min;

function mostrar(id) {
  document.querySelectorAll(".pantalla").forEach((p) => p.classList.remove("activa"));
  $(id).classList.add("activa");
}

async function parpadear() {
  const velo = $("parpadeo");
  // Fundido rápido a negro, un parpadeo corto y vuelve
  velo.style.transition = "opacity .12s";
  velo.classList.add("on");
  await esperar(350);
  velo.classList.remove("on");
  await esperar(90);
  velo.classList.add("on");
  await esperar(550);
  // Cambia de pantalla en la oscuridad
  mostrar("p3");
  document.title = "¡3 meses de novios!";
  await esperar(150);
  velo.style.transition = "opacity .15s";
  velo.classList.remove("on");
}

function explosionConfeti(cantidad = 90) {
  const colores = ["#fff", "#ff4d8d", "#ffd93d", "#6bd6ff", "#b46bff", "#7CFC9A"];
  const p3 = $("p3");
  for (let i = 0; i < cantidad; i++) {
    const c = document.createElement("div");
    const ang = rand(0, Math.PI * 2);
    const dist = rand(120, Math.max(innerWidth, innerHeight) * 0.7);
    c.className = "confeti";
    c.style.background = colores[Math.floor(rand(0, colores.length))];
    c.style.setProperty("--x", Math.cos(ang) * dist + "px");
    c.style.setProperty("--y", Math.sin(ang) * dist + "px");
    p3.appendChild(c);
    setTimeout(() => c.remove(), 1700);
  }
}

function soltarFlotante(contenedor = "p3") {
  const emojis = ["💖", "💗", "💕", "✨", "💘"];
  const el = document.createElement("span");
  el.className = "flotante";
  el.textContent = emojis[Math.floor(rand(0, emojis.length))];
  el.style.left = rand(0, 100) + "vw";
  el.style.fontSize = rand(1.2, 3) + "rem";
  el.style.animationDuration = rand(4, 8) + "s";
  el.style.setProperty("--giro", rand(-40, 40) + "deg");
  $(contenedor).appendChild(el);
  setTimeout(() => el.remove(), 8200);
}

function celebrar() {
  $("p3").classList.add("encendido");
  explosionConfeti();
  setTimeout(() => explosionConfeti(50), 700);
  for (let i = 0; i < 14; i++) setTimeout(soltarFlotante, i * 120);
  intervaloFlotantes = setInterval(soltarFlotante, 350);
  setTimeout(() => $("btn-continuar").classList.add("visible"), 4000);
}

async function iniciarTroleo() {
  mostrar("p2");
  $("texto-p2").textContent = "Esto está muy aburrido la verdad...";
  await esperar(PAUSA_DRAMATICA_MS);
  $("frase-brillo").classList.add("visible");
  await esperar(1800);
  await parpadear();
  celebrar();
}

async function irA(id) {
  const velo = $("parpadeo");
  velo.style.transition = "opacity .6s";
  velo.classList.add("on");
  await esperar(650);
  mostrar(id);
  await esperar(100);
  velo.classList.remove("on");
}

async function cambiarTexto(sale, entra) {
  $(sale).classList.add("sale");
  await esperar(500);
  $(entra).classList.add("visible");
}

async function contarHistoria() {
  clearInterval(intervaloFlotantes);
  await irA("p4");
  await esperar(500);
  $("h-texto1").classList.add("visible");
  await esperar(2000);                      // pausa de 2 segundos
  $("h-fecha").classList.add("visible");
  await esperar(900 + 1500);                // aparece + 1 segundo fija
  $("h-fecha").classList.add("baja");                // la fecha baja...
  await cambiarTexto("h-texto1", "h-texto2");        // ..."este lunes en específico"
  await esperar(2500);                               // tiempo para leerlo
  await cambiarTexto("h-texto2", "h-texto3");        // "Pues este lunes..."
  await esperar(2000);                               // pausa de 2 segundos
  await cambiarTexto("h-texto3", "h-texto4");        // "... cambiaría el giro..."
  await esperar(3500);                               // tiempo para leer antes de cambiar de fondo
  mostrarAmor();
}

function animarContador(el, hasta, duracion = 7000) {
  return new Promise((resolver) => {
    const inicio = performance.now();
    function paso(ahora) {
      const t = Math.min((ahora - inicio) / duracion, 1);
      el.textContent = Math.round(hasta * t * t * t);   // lento al inicio, rápido al final
      if (t < 1) requestAnimationFrame(paso);
      else resolver();
    }
    requestAnimationFrame(paso);
  });
}

async function mostrarAmor() {
  await irA("p5");
  for (let i = 0; i < 10; i++) setTimeout(() => soltarFlotante("p5"), i * 150);
  intervaloFlotantes = setInterval(() => soltarFlotante("p5"), 450);
  await esperar(600);
  $("a-texto").classList.add("visible");
  await esperar(1200);
  $("a-contador").classList.add("visible");
  const dias = Math.round((FECHA_FIN - FECHA_INICIO) / 86400000);
  await animarContador($("a-dias"), dias);
  $("a-fin").classList.add("visible");                  // aparece 03/11/2026
  for (let i = 0; i < 8; i++) setTimeout(() => soltarFlotante("p5"), i * 100);
  await esperar(2500);
  $("btn-carta").classList.add("visible");
}

// Tiempo de lectura: ~300 ms por palabra, mínimo 3 segundos
const tiempoLectura = (el) =>
  Math.max(3000, el.textContent.trim().split(/\s+/).length * 300);

async function mostrarCarta() {
  clearInterval(intervaloFlotantes);
  await irA("p6");
  for (let i = 0; i < 8; i++) setTimeout(() => soltarFlotante("p6"), i * 200);
  intervaloFlotantes = setInterval(() => soltarFlotante("p6"), 700);
  await esperar(900);

  // Una parte a la vez: aparece, se lee y se va
  for (const linea of document.querySelectorAll("#carta .c-linea")) {
    linea.classList.add("visible");
    await esperar(1000 + tiempoLectura(linea));
    linea.classList.remove("visible");
    await esperar(1100);
  }

  // Cierre: estas dos se quedan en pantalla
  $("carta").style.display = "none";
  $("c-gracias").classList.add("visible");
  await esperar(1000 + tiempoLectura($("c-gracias")));
  $("c-firma").classList.add("visible");
  for (let i = 0; i < 12; i++) setTimeout(() => soltarFlotante("p6"), i * 120);
}

$("mensaje-final").textContent = MENSAJE_FINAL;
$("btn-hola").addEventListener("click", iniciarTroleo, { once: true });
$("btn-continuar").addEventListener("click", contarHistoria, { once: true });
$("btn-carta").addEventListener("click", mostrarCarta, { once: true });