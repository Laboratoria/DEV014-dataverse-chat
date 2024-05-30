import { setApiKey } from "../lib/apiKey.js";
import { navigateTo } from "../router.js";

const ApiKey = () => {
  const viewEl = document.createElement("div");
  const viewApiKey = `
  <div class="containerapikey">
    <div class="Container">
      <h1 class="title">API Key</h1>
      <input type="text" class="message-api-key-input" id="input-api-key" placeholder="Escribe la ApiKey" />
      <button class="apiKey-save-button" id="api-key-button">Guardar</button>
      <button class="back-button" id="back-button">Volver</button>
      <p id="save-confirmation" class="save-confirmation">API Key guardada correctamente</p>
    </div>
  </div>
`;

  viewEl.innerHTML = viewApiKey;

  const apiKeyButton = viewEl.querySelector("#api-key-button");
  const saveConfirmation = viewEl.querySelector("#save-confirmation");

  apiKeyButton.addEventListener("click", function () {
    const apiKeyInput = viewEl.querySelector("#input-api-key").value;
    if (apiKeyInput === "") {
      alert("Debes ingresar una ApiKey válida");
      apiKeyButton.disabled = true;
    } else {
      apiKeyButton.disabled = false;
      setApiKey(apiKeyInput);
      viewEl.querySelector("#input-api-key").value = ""; // Limpiar el input después de guardar la API Key
      saveConfirmation.style.display = "block"; // Mostrar mensaje de confirmación
      setTimeout(() => {
        saveConfirmation.style.display = "none"; // Ocultar mensaje de confirmación después de 3 segundos
      }, 3000);
    }
  });

  const backButton = viewEl.querySelector("#back-button");
  backButton.addEventListener("click", () => {
    navigateTo("/");
  });

  return viewEl;
};

export default ApiKey;
