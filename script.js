/*******************************************
 * Escenarios (5 ejemplos):
 *   - 2 fáciles (cliente fácil)
 *   - 3 complicados (cliente complicado)
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
// Mostrar un mensaje en el chat
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

// Maneja la lógica al enviar la respuesta del usuario (vendedor)
function handleUserInput() {
  const userText = userInput.value.trim();
  if (!userText) return;

  displayMessage(userText, "user");
  userInput.value = "";

  // Convertir a minúsculas para comparar con keywords
  const lowerUserText = userText.toLowerCase();

  /****************************************************************
   * AQUI PONEMOS LÓGICA PARA QUE EL CLIENTE (CHATBOT) RESPONDA
   * DESDE SU PUNTO DE VISTA (NO COMO VENDEDOR)
   ****************************************************************/

  // Ejemplo de keywords y respuesta como "cliente"
  if (lowerUserText.includes("descuento")) {
    // El Chatbot (cliente) se interesa en el descuento, pero sigue dudando
    displayMessage("¿Descuento? Suena interesante, pero quisiera saber si realmente vale la pena. ¿De cuánto estamos hablando?", "bot");
    return; 
  } else if (lowerUserText.includes("garantía")) {
    // El Chatbot (cliente) pide más información sobre la garantía
    displayMessage("La garantía me daría más confianza. ¿Cuánto tiempo cubre y qué incluye exactamente?", "bot");
    return;
  } else if (lowerUserText.includes("precio") || lowerUserText.includes("caro")) {
    // El Chatbot (cliente) expresa objeción sobre el precio
    displayMessage("Siguen pareciéndome costosos. ¿Tienes alguna opción más económica o algún plan de pago?", "bot");
    return;
  } else if (lowerUserText.includes("marca") || lowerUserText.includes("competencia")) {
    // El Chatbot (cliente) compara marcas
    displayMessage("He visto varias marcas en otras tiendas. ¿Por qué esta marca es mejor que la competencia?", "bot");
    return;
  }

  // Si no hay palabras clave, se avanza al siguiente paso del escenario (diálogo predefinido)
  scenarioStep++;
  if (scenarioStep < currentScenario.steps.length) {
    setTimeout(() => {
      displayMessage(currentScenario.steps[scenarioStep], "bot");
    }, 600);
  } else {
    // Si llegamos al final del escenario, mensaje de cierre
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

// Iniciar el chat al cargar la página
window.onload = startChat;
