import { data } from '../data/dataset.js';
import { navigateTo } from "../router.js";
import { communicateWithOpenAI } from '../lib/openAIApi.js';

export const ChatGroup = () => {
    // Crear contenedor principal
    const containerChat = document.createElement("div");
    containerChat.classList.add("containerchat");

    // Contenedor para los personajes
    const grupalPersonajesContainer = document.createElement("div");
    grupalPersonajesContainer.classList.add("grupal-personajes-container");
    containerChat.appendChild(grupalPersonajesContainer);

    // Contenedor para el desplazamiento de los personajes
    const grupalPersonajesScroll = document.createElement("div");
    grupalPersonajesScroll.classList.add("grupal-personajes-scroll");
    grupalPersonajesContainer.appendChild(grupalPersonajesScroll);

    // Crear elementos para cada personaje
    data.forEach((personaje) => {
        const grupalPersonajeSelector = document.createElement("div");
        grupalPersonajeSelector.classList.add("grupal-personaje-selector");
        grupalPersonajeSelector.setAttribute("data-id", personaje.id);

        const imgPersonaje = document.createElement("img");
        imgPersonaje.classList.add("grupal-personaje-selector-img");
        imgPersonaje.src = personaje.imageUrl;
        imgPersonaje.alt = personaje.name;

        grupalPersonajeSelector.appendChild(imgPersonaje);
        grupalPersonajesScroll.appendChild(grupalPersonajeSelector);
    });

    // Contenedor para el chat
    const chatContainer = document.createElement("div");
    chatContainer.classList.add("chat-container");
    containerChat.appendChild(chatContainer);

    // Icono de volver
    const backIcon = document.createElement("img");
    backIcon.classList.add("back-icon");
    backIcon.src = "https://cdn-icons-png.flaticon.com/512/93/93634.png"; // URL del icono de volver
    backIcon.alt = "Volver";
    backIcon.addEventListener("click", () => {
        navigateTo('/'); 
    });

    // Añadir el icono de volver al contenedor principal
    grupalPersonajesContainer.appendChild(backIcon);
    // Añadir el contenedor principal al cuerpo del documento
    document.body.appendChild(containerChat)
    
    const containerChatMessages = document.createElement("div");
    containerChatMessages.id = "container-chat";
    containerChatMessages.classList.add("container-chat");

    const formMessagesInput = document.createElement("form");
    formMessagesInput.classList.add("messages-input");

    const inputMessage = document.createElement("input");
    inputMessage.type = "text";
    inputMessage.id = "message-input";
    inputMessage.classList.add("message-input");
    inputMessage.placeholder = "Escribe tu mensaje aquí";

    const buttonSend = document.createElement("button");
    buttonSend.type = "submit";
    buttonSend.id = "send-message";
    buttonSend.classList.add("button-Send");

    const imgSend = document.createElement("img");
    imgSend.src = "https://cdn-icons-png.freepik.com/512/8138/8138457.png";
    imgSend.alt = "boton enviar mensaje";
    imgSend.style.width = "24px";
    imgSend.style.height = "24px";

    buttonSend.appendChild(imgSend);
    formMessagesInput.appendChild(inputMessage);
    formMessagesInput.appendChild(buttonSend);

    
    chatContainer.appendChild(containerChatMessages);
    chatContainer.appendChild(formMessagesInput);

    // Manejador de evento para enviar el mensaje
    buttonSend.addEventListener("click", async (e) => {
        e.preventDefault();
        const userMessageContainer = document.createElement("div");
        userMessageContainer.classList.add("user-message");
        const userMessageText = document.createElement("p");
        userMessageText.textContent = inputMessage.value;
        userMessageContainer.appendChild(userMessageText);
        containerChatMessages.appendChild(userMessageContainer);
        inputMessage.value = "";

        const writing = document.createElement("p");
        writing.classList.add("writing");
        writing.textContent = "están escribiendo...";
        containerChatMessages.appendChild(writing);

        try {
            const respuesta = await communicateWithOpenAI(
                inputMessage.value,
                data.map((personaje) => personaje.id)
            );

            containerChatMessages.removeChild(writing);

            respuesta.forEach((elemento, i) => {
                const messageContainer = document.createElement("div");
                messageContainer.classList.add("response-message");
                const messageText = document.createElement("p");
                messageText.innerHTML = `<span style="font-weight: bold;">${
                    data[i].name
                }:</span> ${elemento[0].message.content}`;
                messageContainer.appendChild(messageText);
                containerChatMessages.appendChild(messageContainer);
            });
        } catch (error) {
            console.error('Ocurrió un error:', error);
            const errorDiv = document.createElement("div");
            errorDiv.classList.add("error-message");
            const messageBubblep = document.createElement("p");
            messageBubblep.textContent =
                "Surgió un problema con tu Api Key, por favor revísala";
            errorDiv.appendChild(messageBubblep);
            containerChatMessages.appendChild(errorDiv);
            inputMessage.value = "";
        }
        

        containerChatMessages.style.overflowY = "auto";
    });

    return containerChat;
};
