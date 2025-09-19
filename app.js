// elementos
const intro = document.getElementById('intro');
const cards = document.getElementById('cards');
const donation = document.getElementById('donation');

const startBtn = document.getElementById('startBtn');
const donateBtn = document.getElementById('donateBtn');
const otherDest = document.getElementById('otherdest');
const cardText = document.getElementById('cardText');
const cardContainer = document.getElementById('cardContainer');

// cartas disponibles
const deck = [
  { key: "bug", img: "img/BugInfinito.png", msg: "🐞 El Bug Eterno te acompañará hoy. Prepárate para debuggear hasta el amanecer.", type: "malo" },
  { key: "commit", img: "img/CommitSupremo.png", msg: "🔥 El Commit Supremo está contigo. Todo push será perfecto y sin conflictos.", type: "bueno" },
  { key: "stack", img: "img/StackOverflow.png", msg: "📚 El Oráculo de Stack Overflow te ilumina. Toda pregunta tendrá respuesta.", type: "bueno" },

  { key: "coffee", img: "img/Coffee.png", msg: "☕ El Espíritu del Café te bendice. Ningún bug resistirá con cafeína en tus venas.", type: "bueno" },
  { key: "rubberduck", img: "img/RubberDuck.png", msg: "🦆 La Sabiduría del Rubber Duck disipará tu confusión. Explica y hallarás la respuesta.", type: "bueno" },
  { key: "deploy", img: "img/Deploy.png", msg: "🚀 La Fuerza del Deploy te impulsa. Todo lanzamiento será exitoso y sin errores.", type: "bueno" },
  { key: "refactor", img: "img/Refactor.png", msg: "🔧 *El Poder del Refactor te guía*. Tu código será limpio y eficiente.", type: "bueno" },
  { key: "merge", img: "img/Merge.png", msg: "🔀 *La Magia del Merge te protege*. Conflictos se resolverán con facilidad.", type: "bueno" },

  { key: "algorithm", img: "img/Algorithm.png", msg: "🧠 *La Geometría del Algoritmo te rodea*. Verás patrones donde otros solo ven caos.", type: "bueno" },
  { key: "debug", img: "img/Debug.png", msg: "🐛 *El Espíritu del Debug te observa*. Cada error se revelará justo cuando intentes dormir.", type: "malo" },
  { key: "api", img: "img/API.png", msg: "🌐 *La Profecía del API es clara*: hoy responderá con 200, pero mañana será un 500 misterioso.", type: "malo" },
  { key: "loop", img: "img/Loop.png", msg: "🔄 *El Ciclo Infinito te envuelve*. Solo un `break` sabio romperá tu destino.", type: "malo" },
  { key: "readme", img: "img/README.png", msg: "📄 *El README Sagrado aparece*. Creíste que era documentación, pero solo era lorem ipsum eterno.", type: "malo" },
  { key: "404", img: "img/404.png", msg: "🚫 *El 404 ha sido revelado*. No todo bug se encuentra en tu código, algunos viven en tu alma.", type: "malo" },

  { key: "junior", img: "img/Junior.png", msg: "👶 *El Aprendiz del Console.log sonríe*. Revelará verdades que confundirán hasta al más sabio senior.", type: "bueno" },
  { key: "senior", img: "img/Senior.png", msg: "🧙‍♂️ *El Senior Místico levanta su barba*. Te guiará, pero solo si traes café.", type: "bueno" },
  { key: "lead", img: "img/Lead.png", msg: "👔 *El Líder de Proyectos traza el camino*. Sin embargo, el verdadero sprint está en tu corazón.", type: "bueno" },

  { key: "fullstack", img: "img/FullStack.png", msg: "🧑‍💻 *El Full Stack Supremo aparece*. Domina todo… pero teme a los commits del viernes.", type: "bueno" },
  { key: "frontend", img: "img/Frontend.png", msg: "🎨 *El Hechicero del Frontend te bendice*. La belleza será tu escudo, pero el CSS será tu castigo.", type: "bueno" },
  { key: "backend", img: "img/Backend.png", msg: "🛠️ *El Guardián del Backend ruge*. La estabilidad será tu aliada, salvo cuando la base de datos despierte.", type: "bueno" }

];

// función para elegir N cartas aleatorias sin repetir
function pickRandomCards(n) {
  const shuffled = [...deck].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

// flujo
startBtn.addEventListener('click', () => {
  intro.classList.remove('active');
  intro.classList.add('hidden');
  cards.classList.add('active');

  // generar 3 cartas aleatorias
  const chosenCards = pickRandomCards(3);
  cardContainer.innerHTML = ""; // limpiar

  chosenCards.forEach(cardData => {
    const card = document.createElement('div');
    card.className = `tarot-card ${cardData.type}`;
    card.dataset.card = cardData.key;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <img src="img/CardBack.png" alt="Dorso de carta" loading="lazy">
        </div>
        <div class="card-back">
          <img src="${cardData.img}" alt="Carta ${cardData.key}" loading="lazy">
        </div>
      </div>
    `;

    card.addEventListener('click', () => {
      card.classList.add('flipped');
      cardText.textContent = cardData.msg;
      cardText.classList.remove('hidden');
      donateBtn.classList.remove('hidden');
      otherDest.classList.remove('hidden');
    });

    cardContainer.appendChild(card);
  });

  // animación entrada cartas
  anime({
    targets: '.tarot-card',
    translateY: [50,0],
    opacity: [0,1],
    delay: anime.stagger(200),
    duration: 800,
    easing: 'easeOutElastic(1, .6)'
  });
});

otherDest.addEventListener('click', () => {
  startBtn.click(); // reiniciar el proceso
  cardText.textContent = "✨ El oráculo te ofrece un nuevo destino...";
});  
  

donateBtn.addEventListener('click', () => {
  cards.classList.remove('active');
  cards.classList.add('hidden');
  donation.classList.add('active');

  // animación QR
  anime({
    targets: '.qr',
    scale: [0,1],
    opacity: [0,1],
    duration: 1000,
    easing: 'easeOutElastic(1, .6)'
  });
});

const thanksBtn = document.getElementById('thanksBtn');

thanksBtn.addEventListener('click', () => {
  donation.classList.remove('active');
  donation.classList.add('hidden');
  intro.classList.add('active');
  intro.classList.remove('hidden');
});



// ==== Ojo que sigue el cursor ====
const $eye = document.querySelector('.eye');
const $iris = document.querySelector('.iris');

if ($eye && $iris) {
  let bounds = $eye.getBoundingClientRect();
  const refreshBounds = () => bounds = $eye.getBoundingClientRect();

  const maxMove = 35; // límite del movimiento

  const onMouseMove = e => {
    const { width, height, left, top } = bounds;
    const hw = width / 2;
    const hh = height / 2;

    const x = e.clientX - (left + hw);
    const y = e.clientY - (top + hh);

    // limitar valores
    const clampedX = Math.max(-maxMove, Math.min(maxMove, x));
    const clampedY = Math.max(-maxMove, Math.min(maxMove, y));

    anime({
      targets: $iris,
      translateX: clampedX,
      translateY: clampedY,
      duration: 300,
      easing: "easeOutExpo"
    });
  };

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('resize', refreshBounds);
}



