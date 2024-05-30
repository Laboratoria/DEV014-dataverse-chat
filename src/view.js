import { navigateTo } from "../router.js";

export const renderItems = (data) => {
  const ulElement = document.createElement('ul');

  data.forEach(item => {
    const liElement = document.createElement('li');
    const liImg = document.createElement('img');
    const liName = document.createElement('h3');
    const liShortDescription = document.createElement('p');
    const liDetails = document.createElement('h4');
    const liInfo = document.createElement('button');
    liInfo.classList.add('Info');
    const liChat = document.createElement('button');
    liChat.classList.add('ChatIndividual');

    liElement.classList.add("item");

    liImg.src = item.imageUrl;
    liName.textContent = item.name;
    liShortDescription.textContent = item.shortDescription;
    const combinedDetails = `<strong>Raza:</strong> <span class="race-color">${item.facts.race}</span><br> 
    <strong>Edad:</strong> <span class="age-color">${item.facts.age}</span><br>
    <strong>Estatura:</strong> <span class="height-color">${item.facts.height}</span><br>
    <strong>Año de nacimiento:</strong> <span class="year-color">${item.facts.yearOfBirth}</span>`;
    liDetails.innerHTML = combinedDetails;
    liInfo.textContent = "Ver Info";
    liChat.textContent = "Chatear";

    liElement.setAttribute("itemtype", "actors");
    liElement.setAttribute("itemscope", "");
    liName.setAttribute("itemprop", "name");
    liShortDescription.setAttribute("itemprop", "description");
    liDetails.setAttribute("itemprop", "details");
    liInfo.setAttribute("itemprop", "details");
    liChat.setAttribute("itemprop", "details");

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('item-buttons-container');
    buttonContainer.appendChild(liInfo);
    buttonContainer.appendChild(liChat);

    liElement.appendChild(liImg);
    liElement.appendChild(liName);
    liElement.appendChild(liShortDescription);
    liElement.appendChild(liDetails);
    liElement.appendChild(buttonContainer);
    ulElement.appendChild(liElement);

    liInfo.addEventListener('click', () => {
      const infoModalContainer = document.createElement('div');
      infoModalContainer.classList.add('info-modal-container');

      const infoModalContent = document.createElement('div');
      infoModalContent.classList.add('info-modal-content');

      infoModalContent.innerHTML = `
        <span class="close-btn">&times;</span>
        <img src="${item.imageUrl}" alt="${item.name}">
        <div class="info-details">
          <h2>${item.name}</h2>
          <h3>${item.shortDescription}</h3>
          <strong>Raza:</strong> <span class="race-color">${item.facts.race}</span><br> 
          <strong>Edad:</strong> <span class="age-color">${item.facts.age}</span><br>
          <strong>Estatura:</strong> <span class="height-color">${item.facts.height}</span><br>
          <strong>Año de nacimiento:</strong> <span class="year-color">${item.facts.yearOfBirth}</span> <br>
          <p>${item.description}</p>
          <div class="btn-container">
          <button class="btn-close-modal">Volver al listado</button>  
          <button class="btn-chat">Chatear</button>
          </div>
        </div>
      `;

      infoModalContainer.appendChild(infoModalContent);
      document.body.appendChild(infoModalContainer);

      const closeBtn = infoModalContent.querySelector('.close-btn');
      closeBtn.addEventListener('click', () => {
        closeModal(infoModalContainer);
      });

      const btnChat = infoModalContent.querySelector('.btn-chat');
      btnChat.addEventListener('click', () => {
        closeModal(infoModalContainer);
        navigateTo('/ChatIndividual', { id: item.id });
      });

      const btnCloseModal = infoModalContent.querySelector('.btn-close-modal');
      btnCloseModal.addEventListener('click', () => {
        closeModal(infoModalContainer);
      });
    });

    liChat.addEventListener('click', () => {
      const modalId = `modal-container-individual-${item.id}`;
      const modalContainer = document.createElement('div');
      modalContainer.id = modalId;
      modalContainer.classList.add('modal-container');

      const modalContent = document.createElement('div');
      modalContent.classList.add('modal-content');

      modalContent.innerHTML = `
        <span class="close-btn">&times;</span>
        <p><strong>Haz nuevas amistades en la Tierra Media</strong><br>
        <br>
        Ingresa tu API KEY y comienza a chatear con ${item.name}.</p>
        <input type="text" id="individualApiKeyInput" placeholder="API Key">
        <button id="submitIndividualApiKeyBtn">Enviar</button>
      `;

      modalContainer.appendChild(modalContent);
      document.body.appendChild(modalContainer);

      const closeBtn = modalContent.querySelector('.close-btn');
      closeBtn.addEventListener('click', () => {
        closeModal(modalContainer);
      });

      const submitBtn = modalContent.querySelector('#submitIndividualApiKeyBtn');
      submitBtn.addEventListener('click', () => {
        const individualApiKeyInput = modalContent.querySelector('#individualApiKeyInput').value;
        localStorage.setItem('individualApiKey', individualApiKeyInput);
        closeModal(modalContainer);
        navigateTo('/ChatIndividual', { id: item.id });
      });

      modalContainer.addEventListener('click', (event) => {
        if (event.target === modalContainer) {
          closeModal(modalContainer);
        }
      });
    });
  });

  return ulElement;
};

const closeModal = (modalContainer) => {
  if (modalContainer) {
    document.body.removeChild(modalContainer);
  }
};

