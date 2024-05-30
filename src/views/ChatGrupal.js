import { data } from "../data/dataset.js";
import { navigateTo } from "../router.js";
import { communicateWithOpenAI } from "../lib/openAIApi.js";
import { getApiKey, setApiKey } from "../lib/apiKey.js";

let modalShown = false;

const showModal = () => {
  if (!modalShown) {
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    modalContent.innerHTML = `
      <span class="cerrarX">&times;</span>
      <p><strong>Desbloquea la Tierra Media</strong><br><br>
      Ingresa tu API KEY y forja amistades en esta épica conversación.
      </p>
      <input type="text" id="apiKeyInput" placeholder="API Key"><br>
      <button id="submitApiKeyBtn">Enviar</button>
    `;

    modalContainer.appendChild(modalContent);
    document.body.appendChild(modalContainer);

    const apiKeyInput = modalContent.querySelector('#apiKeyInput');
    const closeBtn = modalContent.querySelector('.cerrarX');

    closeBtn.addEventListener('click', () => {
      closeModal(modalContainer);
    });

    const submitBtn = modalContent.querySelector('#submitApiKeyBtn');
    submitBtn.addEventListener('click', () => {
      const apiKeyValue = apiKeyInput.value;
      if (apiKeyValue === "") {
        alert("Debes ingresar una ApiKey válida");
      } else {
        setApiKey(apiKeyValue);
        closeModal(modalContainer);
        modalShown = true; // Set modalShown to true after API key is set
      }
    });

    modalContainer.addEventListener('click', (e) => {
      if (e.target === modalContainer) {
        closeModal(modalContainer);
      }
    });
  }
};

const closeModal = (modalContainer) => {
  if (modalContainer) {
    modalContainer.remove();
  }
};

const chatGroup = () => {
  const container = document.createElement("div");
  container.classList.add("chat-body", "chat-groupal");

  // Crear un contenedor para el botón de regresar y el título
  const headerContainer = document.createElement("div");
  headerContainer.classList.add("header-container");
 
  const backButton = document.createElement("button");
  const backButtonImage = document.createElement("img");
  backButtonImage.src = "data/img/chevron-left.svg";
  backButton.appendChild(backButtonImage);
  backButton.classList.add("back-button");
  headerContainer.appendChild(backButton);
 
  const title = document.createElement("h1");
  title.textContent = "Chismorreos de la Tierra Media";
  headerContainer.appendChild(title);
 
  container.appendChild(headerContainer);
 
  backButton.addEventListener("click", () => {
    navigateTo("/");
  });

  // Añadir línea decorativa
  const line = document.createElement("div");
  line.innerHTML = `
    <p class="linea"></p>
    `;
  container.appendChild(line);

  
  const idCharacter = [];

  for (let i = 0; i < data.length; i++) {
    idCharacter.push(data[i].id);
  }

  const chatContainer = document.createElement("div");
  chatContainer.classList.add("chat-container");
  container.appendChild(chatContainer);

  // Añadir línea decorativa2
  const line2 = document.createElement("div");
  line2.innerHTML = `
    <p class="linea"></p>
    `;
  container.appendChild(line2);

  const inputContainer = document.createElement("form");
  inputContainer.classList.add("input-Container");
  container.appendChild(inputContainer);

  const inputText = document.createElement("input");
  inputText.setAttribute("type", "text");
  inputText.setAttribute("placeholder", "Escribe un mensaje...");
  inputText.classList.add("message-input");
  inputContainer.appendChild(inputText);

  const buttonSend = document.createElement("button");
  buttonSend.textContent = "Enviar"; 
  buttonSend.classList.add("button-Send");

  inputContainer.appendChild(buttonSend);

  // Check if API Key is set, if not show modal
  if (!getApiKey()) {
    showModal();
  }

  buttonSend.addEventListener("click", async (e) => {
    e.preventDefault();
  
    // Check if API Key is set, if not show modal
    if (!getApiKey()) {
      showModal();
      return;
    }
  
    const userMessageContainer = document.createElement("div");
    userMessageContainer.classList.add("user-message-container");
  
    const userMessageBubble = document.createElement("div");
    userMessageBubble.classList.add("message-bubble");
    
    const userMessageText = document.createElement("p");
    userMessageText.textContent = inputText.value;
  
    userMessageBubble.appendChild(userMessageText);
    userMessageContainer.appendChild(userMessageBubble);
    chatContainer.appendChild(userMessageContainer);
    
    const userMessage = inputText.value;
    inputText.value = "";
  
    // Crear el contenedor para el texto y la imagen
    const writingContainer = document.createElement("div");
    writingContainer.classList.add("writing-container");
  
    const writing = document.createElement("p");
    writing.classList.add("writing");
    writing.textContent = "24 personas de la Comarca están escribiendo...";
  
    // Crear el elemento de imagen de chat de personas escribiendo
    const writingImage = document.createElement("img");
    writingImage.src = "/data/img/Group-Typing.svg"; 
    writingImage.style.border = "none";
    writingImage.style.width = "90px";
    writingImage.style.height = "90px";

    writingImage.alt = "Imagen de personas escribiendo";
  
    // Añadir la imagen y el texto al contenedor
    writingContainer.appendChild(writingImage);
    writingContainer.appendChild(writing);
  
    // Añadir el contenedor al chatContainer
    chatContainer.appendChild(writingContainer);
  
    try {
      const apiKey = getApiKey();
      const respuesta = await communicateWithOpenAI(userMessage, idCharacter, apiKey);
  
      chatContainer.removeChild(writingContainer);
  
      respuesta.forEach((elemento, i) => {
        const messageContainer = document.createElement("div");
        messageContainer.classList.add("response-message");
  
        // Imagen del personaje
        const characterImage = document.createElement("img");
        characterImage.classList.add("imageCharacter");
        characterImage.src = data[i].imageUrl; // URL de la imagen del personaje
        characterImage.alt = data[i].name; // Nombre del personaje
  
        // Contenedor para el texto del mensaje
        const messageTextContainer = document.createElement("div");
        messageTextContainer.classList.add("message-text-container");
  
        // Texto del mensaje de respuesta
        const messageText = document.createElement("p");
        messageText.innerHTML = `<span style="font-weight: bold;">${data[i].name}:</span> ${elemento[0].message.content}`;
  
        // Agregar el texto del mensaje al contenedor de texto
        messageTextContainer.appendChild(messageText);
  
        // Agregar la imagen del personaje y el contenedor de texto al contenedor principal del mensaje
        messageContainer.appendChild(characterImage);
        messageContainer.appendChild(messageTextContainer);
  
        // Agregar el contenedor del mensaje al contenedor principal del chat
        chatContainer.appendChild(messageContainer);
      });
  
    } catch (error) {
      chatContainer.removeChild(writingContainer);
  
      const errorDiv = document.createElement("div");
      errorDiv.classList.add("error-message");
      const messageBubblep = document.createElement("p");
      messageBubblep.textContent =
        "Habla, amigo y entra... surgió un problema, por favor revisa tu Api Key para acceder";
      errorDiv.appendChild(messageBubblep);
      chatContainer.appendChild(errorDiv);
      inputText.value = "";
    }
  
    chatContainer.style.overflowY = "auto";
  });
  
  return container;
};

export default chatGroup;