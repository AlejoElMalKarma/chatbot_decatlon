/*******************************************
 * Escenarios (5 ejemplos):
 *   - 2 fáciles
 *   - 3 complicados
 *******************************************/
const scenarios = [
  // ESCENARIOS FÁCILES
  {
    type: "facil",
    steps: [
      "Hola, estoy buscando unas zapatillas ligeras para mis entrenamientos de decatlón. ¿Tienes algún modelo recomendado?",
      "Me interesa la tecnología de amortiguación. ¿Cuánto cuestan esas zapatillas?",
      "Suena bien. ¿Tienes varias tallas disponibles?",
      "Perfecto, creo que me llevaré ese par. ¡Gracias!"
    ]
  },
  {
    type: "facil",
    steps: [
      "Hola, quiero un balón medicinal para mejorar mi fuerza. ¿Qué marcas tienes?",
      "Muy bien, me agrada esa marca. ¿Cuánto pesa el que me recomiendas?",
      "¡Excelente! ¿Tiene buena durabilidad?",
      "Genial, lo compraré ahora mismo."
    ]
  },

  // ESCENARIOS COMPLICADOS
  {
    type: "complicado",
    steps: [
      "Buenos días, estaba buscando equipamiento para decatlón, pero no estoy convencido de comprar en esta tienda.",
      "Me han dicho que en otras tiendas hay ofertas mejores. ¿Por qué debería comprarte a ti?",
      "No estoy seguro de la calidad de estos productos. ¿Realmente aguantan un entrenamiento intenso?",
      "El precio que mencionas me parece un poco alto. ¿Hay algún tipo de descuento o garantía adicional?",
      "Todavía tengo dudas. ¿Qué pasa si el producto no cumple con mis expectativas después de unas semanas?"
    ]
  },
  {
    type: "complicado",
    steps: [
      "Hola, necesito un set de jabalinas para mi entrenamiento de decatlón, pero nunca he comprado aquí.",
      "He visto precios más bajos en línea. ¿Por qué tus precios son más altos?",
      "¿Estás seguro de que la calidad justifica ese costo? He tenido malas experiencias antes con marcas que no duran.",
      "Soy bastante exigente: necesito un equipo resistente a diferentes climas y golpes. ¿Cómo me lo garantizas?",
      "Aún me siento escéptico. Tal vez deba mirar más opciones antes de decidir."
    ]
  },
  {
    type: "complicado",
    steps: [
      "Hola, estoy buscando ropa especial para entrenar decatlón en clima muy frío. ¿Qué opciones tienes?",
      "No estoy convencido de gastar demasiado. ¿Realmente hace diferencia una prenda térmica de marca?",
      "He visto opciones más baratas en internet. ¿Por qué el precio aquí es tan alto?",
      "¿Qué tan gruesa es la tela? ¿No sentiré limitación en mis movimientos?",
      "Sigo dudando. ¿Tienes alguna promoción o facilidades de pago que me ayuden a decidir?",
      "No lo sé… no me gusta arrepentirme de mis compras. ¿Por qué confío en esta marca?"
    ]
  }
];

/*******************************************
 * Variables globales
 *******************************************/
let currentScenario;
let scenarioStep = 0;

const chatWindow = document.getElementById("chat-window");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

/*******************************************
 * Funciones
 *******************************************/
// Mostrar un mensaje en la ventana del chat
function displayMessage(message, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender);
  msgDiv.textContent = message;
  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Iniciar la conversación con un escenario aleatorio
function startChat() {
  scenarioStep = 0;
  currentScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
  displayMessage(currentScenario.steps[scenarioStep], "bot");
}

// Maneja la lógica cuando el usuario (vendedor) envía su respuesta
function handleUserInput() {
  const userText = userInput.value.trim();
  if (!userText) return;

  // Mostrar el texto del usuario
  displayMessage(userText, "user");
  userInput.value = "";

  // Convertimos a minúsculas para facilitar comparaciones
  const lowerUserText = userText.toLowerCase();

  // Revisamos si hay alguna palabra clave de interés
  if (lowerUserText.includes("descuento")) {
    displayMessage("Podemos ofrecerte un 10% de descuento si adquieres más de un producto.", "bot");
    return; // Salimos de la función sin avanzar el escenario
  } else if (lowerUserText.includes("garantía")) {
    displayMessage("Brindamos garantía de 6 meses contra defectos de fábrica.", "bot");
    return;
  } else if (lowerUserText.includes("precio") || lowerUserText.includes("caro")) {
    displayMessage("Nuestros precios están dentro del promedio de mercado, pero con mayor calidad.", "bot");
    return;
  } else if (lowerUserText.includes("marca") || lowerUserText.includes("competencia")) {
    displayMessage("Trabajamos con marcas líderes que destacan en innovación y durabilidad.", "bot");
    return;
  }

  // Si no se detecta ninguna palabra clave, avanzamos en el guion
  scenarioStep++;
  if (scenarioStep < currentScenario.steps.length) {
    setTimeout(() => {
      displayMessage(currentScenario.steps[scenarioStep], "bot");
    }, 600);
  } else {
    // Si llegamos al final del escenario, mostramos un mensaje final
    setTimeout(() => {
      displayMessage("¡Gracias por participar en la simulación!", "bot");
    }, 600);
  }
}

/*******************************************
 * Eventos
 *******************************************/
sendBtn.addEventListener("click", handleUserInput);
userInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") handleUserInput();
});

// Iniciar el chat automáticamente al cargar la página
window.onload = startChat;
