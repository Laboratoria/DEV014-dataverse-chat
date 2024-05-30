import { data } from '../data/dataset.js';
import { communicateWithOpenAI } from "../lib/openAIApi.js";
import { navigateTo } from "../router.js";

export const Personajes = (props) => {
    const personajeId = props.id;
    const personaje = data.find((personaje) => personaje.id === personajeId);

    const chatp = document.createElement('div');
    chatp.innerHTML = `
    <div class="container">
        <!-- Contenedor del chat -->
        <div class="chats-container">
            <div class="chat-perfil"> 
                <img id="myBtn" class="img-online" src="${personaje.imageUrl}" alt="">
                <p id="online" class="detail-online">En linea</p>
                <img class="back-icon" src="https://cdn-icons-png.flaticon.com/512/93/93634.png" alt="Volver">
            </div> 
            <div id="container-chat" class="container-chat"></div> 
            <form class="messages-input">
                <input type="text" class="message-input" id="message-input" placeholder="Escribe tu mensaje aquí">
                <button id="send-message" class="button-Send" type="submit">
                    <img src="https://cdn-icons-png.freepik.com/512/8138/8138457.png" alt="boton enviar mensaje" style="width: 24px; height: 24px;">
                </button>
            </form>
        </div>
    </div>
    <!-- Modal -->
    <div id="myModal" class="modal">
        <!-- Contenido del modal -->
        <div class="modal-content">
            <span class="close">&times;</span>
            <div class="character-details">
                <h3><span id="nombre" class="detail-value">${personaje.name}</span></h3>
                <h4><span id="nombre" class="detail-value">(${personaje.shortDescription})</span></h4>
                <div class="div-personaje-img">
                    <img class="personaje-img" src="${personaje.imageUrl}" alt="">
                </div>
                <div class="detail">
                    <label for="nombre" class="detail-label">Raza:</label>
                    <span id="nombre" class="detail-value">${personaje.facts.race}</span>
                </div>
                <div class="detail">
                    <label for="edad" class="detail-label">Edad:</label>
                    <span id="edad" class="detail-value">${personaje.facts.age}</span>
                </div>
                <div class="detail">
                    <label for="estatura" class="detail-label">Estatura:</label>
                    <span id="estatura" class="detail-value">${personaje.facts.height}</span>
                </div>
                <div class="detail">
                    <label for="anio-nacimiento" class="detail-label">Año de nacimiento:</label>
                    <span id="anio-nacimiento" class="detail-value">${personaje.facts.yearOfBirth}</span>
                </div>
                <div class="detail">
                    <label for="descripcion" class="detail-label">Descripción:</label>
                    <p id="descripcion" class="detail-value">${personaje.description}</p>
                </div>
            </div>
        </div>
    </div>
    `;

    window.addEventListener('load', function() {
        
      // Obtener el modal
        var modal = document.getElementById("myModal");

        // Obtener el botón que abre el modal
        var btn = document.getElementById("myBtn");

        // Obtener el elemento <span> que cierra el modal
        var span = document.getElementsByClassName("close")[0];

        // Cuando el usuario hace clic en el botón, abre el modal
        btn.onclick = function() {
        modal.style.display = "block";
        }

        // Cuando el usuario hace clic en <span> (x), cierra el modal
        span.onclick = function() {
        modal.style.display = "none";
        }

        // Cuando el usuario hace clic en cualquier parte fuera del modal, lo cierra
        window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
        }             
    });
   
    chatp.classList.add('container-general');
    const personajeContainer = chatp.querySelector("#container-chat");
    const sendMessage = chatp.querySelector("#send-message");
    const inputMessage = chatp.querySelector("#message-input");

    function formatTime(date) {
        return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
    }

    function createUserMessage(messageContent) {
        const userMessageDiv = document.createElement("div");
        userMessageDiv.classList.add("user-message");

        const messageInfo = document.createElement("div");
        messageInfo.classList.add("message-info");
        messageInfo.textContent = "Tú"; // Nombre del usuario

        const messageBubble = document.createElement("div");
        messageBubble.classList.add("message-bubble");
        messageBubble.textContent = messageContent;

        const messageTime = document.createElement("div");
        messageTime.classList.add("message-time");
        messageTime.textContent = formatTime(new Date());

        userMessageDiv.appendChild(messageInfo);
        userMessageDiv.appendChild(messageBubble);
        userMessageDiv.appendChild(messageTime);

        return userMessageDiv;
    }

    function createIAMessage(messageContent) {
        const IAMessageDiv = document.createElement("div");
        IAMessageDiv.classList.add("ia-message");

        const messageInfo = document.createElement("div");
        messageInfo.classList.add("message-info");
        messageInfo.textContent = personaje.name; // Nombre del personaje

        const messageBubble = document.createElement("div");
        messageBubble.classList.add("message-bubble");
        messageBubble.textContent = "Escribiendo...";

        const messageTime = document.createElement("div");
        messageTime.classList.add("message-time");
        messageTime.textContent = formatTime(new Date());

        IAMessageDiv.appendChild(messageInfo);
        IAMessageDiv.appendChild(messageBubble);
        IAMessageDiv.appendChild(messageTime);

        setTimeout(() => {
            messageBubble.textContent = messageContent;
        }, 1000); // Simula el tiempo de respuesta de la IA

        return IAMessageDiv;
    }

    async function sendMessageHandler() {
        try {
            const respuesta = await communicateWithOpenAI(inputMessage.value, personajeId);
            const messageContent = respuesta[0][0].message.content;
            console.log(respuesta)
            const userMessageDiv = createUserMessage(inputMessage.value);
            personajeContainer.appendChild(userMessageDiv);

            const IAMessageDiv = createIAMessage(messageContent);
            personajeContainer.appendChild(IAMessageDiv);

            inputMessage.value = "";
        } catch (error) {
            const userMessageDiv = createUserMessage(inputMessage.value);
            personajeContainer.appendChild(userMessageDiv);

            const errorDiv = document.createElement("div");
            errorDiv.classList.add("error-message");

            const messageBubble = document.createElement("div");
            messageBubble.classList.add("message-bubble");
            messageBubble.textContent = "Surgió un problema con tu Api Key: " + error.message;

            const messageTime = document.createElement("div");
            messageTime.classList.add("message-time");
            messageTime.textContent = formatTime(new Date());

            errorDiv.appendChild(messageBubble);
            errorDiv.appendChild(messageTime);

            personajeContainer.appendChild(errorDiv);

            inputMessage.value = "";
        }
    }

    sendMessage.addEventListener("click", (e) => {
        e.preventDefault();
        sendMessageHandler();
    });

    const backButton = chatp.querySelector('.back-icon');
    backButton.addEventListener('click', () => {
        navigateTo("/");
    });

    return chatp;
};
