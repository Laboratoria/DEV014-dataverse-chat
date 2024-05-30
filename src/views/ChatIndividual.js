import { data } from "../data/dataset.js";
import { communicateWithOpenAI } from "../lib/openAIApi.js";
import { navigateTo } from "../router.js";

//Definición de chatIndividual
const ChatIndividual = (props) => {

  //Selección del Personaje
  const characterId = props.id;
  const character = data.find((character) => character.id === characterId);
  
  //Creación de la Interfaz de Chat
  const chat = document.createElement("div");
  chat.classList.add("chat-body", "chat-individual");  
  chat.innerHTML = `
  <section class="first-chat">
  <a id="back-home"> <img class="back-img" src="data/img/chevron-left.svg" alt="back"></a>

  <div>
    <p class="character-name">${character.name}</p>
    <p class="linea"></p>
  </div>
</section>
<div id="text-container" class="text-container"></div>
<p class="linea"></p>

<form class="flex-Input">
  <input id="input-message" class="message-input" type="text" placeholder="Escribe un mensaje...">
  <button id="send-message" class="button-Send" type="submit">Enviar</button>
</form>
      
  `;

  //Navegación
  const backButton = chat.querySelector("#back-home");
  backButton.addEventListener("click", () => {
    navigateTo("/");
  });

  //Referencias a Elementos del Chat
  const chatContainer = chat.querySelector("#text-container");
  const sendMessage = chat.querySelector("#send-message");
  const inputMessage = chat.querySelector("#input-message");

  //Funciones para Crear Mensajes
  function createUserMessage(messageContent) {
    const userMessageDiv = document.createElement("div");
    userMessageDiv.classList.add("user-message");
    const messageBubble = document.createElement("div");
    messageBubble.classList.add("message-bubble");
    messageBubble.textContent = messageContent;
    userMessageDiv.appendChild(messageBubble);
    return userMessageDiv;
  }

  //Crea un elemento para el mensaje de la IA
  function createIAMessage(messageContent) {
    const IAMessageDiv = document.createElement("div");
    IAMessageDiv.classList.add("ia-message");
    
    const characterImage = document.createElement("img");
    characterImage.classList.add("character-image");
    characterImage.src = `${character.imageUrl}`;
    characterImage.alt = `Imagen de ${character.name}`;
    
    const messageBubble = document.createElement("div");
    messageBubble.classList.add("message-bubble");
    messageBubble.textContent = messageContent;

    IAMessageDiv.appendChild(characterImage);
    IAMessageDiv.appendChild(messageBubble);
    return IAMessageDiv;
  }

  //Crea un elemento para indicar que el personaje está escribiendo.
  function createWritingMessage(character) {
    const writingContainer = document.createElement("div");
    writingContainer.classList.add("writing-container");

    const writing = document.createElement("p");
    writing.classList.add("writing");
    writing.textContent = `${character.name} está escribiendo...`;

    const writingImage = document.createElement("img");
    writingImage.src = `${character.imageUrl}`; // Usa la imagen del personaje
    writingImage.alt = `Imagen de ${character.name} escribiendo`;

    writingContainer.appendChild(writingImage);
    writingContainer.appendChild(writing);

    return writingContainer;
  }

  //Manejo del Envío de Mensajes
  async function sendMessageHandler() {
    const userMessage = inputMessage.value;

    // Limpiar el campo de entrada inmediatamente después de obtener el valor
    inputMessage.value = "";

    // Crear y mostrar el mensaje del usuario inmediatamente
    const userMessageDiv = createUserMessage(userMessage);
    chatContainer.appendChild(userMessageDiv);

    // Desplazar el contenedor de chat hacia abajo para mostrar el mensaje del usuario
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // Crear y mostrar el indicador de que el personaje está escribiendo
    const writingContainer = createWritingMessage(character);
    chatContainer.appendChild(writingContainer);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    try {
      const respuesta = await communicateWithOpenAI(userMessage, characterId);
      const messageContent = respuesta[0][0].message.content;

      // Crear y mostrar el mensaje de la IA
      const IAMessageDiv = createIAMessage(messageContent);
      chatContainer.appendChild(IAMessageDiv);

      // Eliminar el indicador de que el personaje está escribiendo
      chatContainer.removeChild(writingContainer);

      // Desplazar el contenedor de chat hacia abajo para mostrar el nuevo mensaje
      chatContainer.scrollTop = chatContainer.scrollHeight;
    } catch (error) {
      const errorDiv = document.createElement("div");
      errorDiv.classList.add("error-message");
      const messageBubble = document.createElement("div");
      messageBubble.classList.add("message-bubble");
      messageBubble.textContent =
        "Habla, amigo y entra... surgió un problema, por favor revisa tu Api Key para acceder";
      errorDiv.appendChild(messageBubble);
      chatContainer.appendChild(errorDiv); 
      chatContainer.removeChild(writingContainer);
    }
  }

  //Añadir Evento de Envío de Mensajes
  sendMessage.addEventListener("click", (e) => {
    e.preventDefault();
    sendMessageHandler();
  });

  return chat;
};

export default ChatIndividual;
