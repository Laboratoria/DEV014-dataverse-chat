export const renderItems = (data) => {
  // Crear un elemento <ul>
  const ulElement = document.createElement('ul');
  
  // Recorrer la data
  data.forEach(item => {
    // Crear un elemento <li> para cada item
    const liElement = document.createElement('li');
    const liImg = document.createElement('img');
    const liName = document.createElement('h3'); // h3 para el nombre
    const liShortDescription = document.createElement('p'); // Para la descripción corta
    const liDetails = document.createElement('p'); // Para la información de raza, edad, estatura, año de nacimiento.

    // Asignar la clase item al <li>
    liElement.classList.add("item");
    // Configuramos el ID del personaje como un atributo data en el elemento li
    liElement.dataset.id = item.id;
    // Asignar el contenido del item a los elementos correspondientes
    liImg.src = item.imageUrl;
    liName.textContent = item.name;
    liShortDescription.textContent = item.shortDescription;
    const combinedDetails = `Raza: ${item.facts.race}<br>Edad: ${item.facts.age}<br>Estatura: ${item.facts.height}<br>Año de nacimiento: ${item.facts.yearOfBirth}`;
    liDetails.innerHTML = combinedDetails;

    // Asignar el atributo itemtype a los elementos <li>
    liElement.setAttribute("itemtype", "actors");
    liElement.setAttribute("itemscope","")
    
    // Añadir atributos itemprop a los elementos correspondientes
    liName.setAttribute("itemprop", "name");
    liShortDescription.setAttribute("itemprop", "description");
    liDetails.setAttribute("itemprop", "details");

    // Agregar los elementos al <li> en el orden deseado
    liElement.appendChild(liName); 
    liElement.appendChild(liShortDescription); 
    liElement.appendChild(liImg); 
    liElement.appendChild(liDetails); 

   // Agregar un evento clic a cada tarjeta para redirigir a la página de detalles
   liElement.addEventListener('click', function() {
    const personajeId = this.dataset.id; // Obtener el ID del personaje del atributo data
    const url = `/Personajes?id=${personajeId}`; // Construir la URL de la página de detalles
    window.location.href = url; // Redirigir a la URL
});

    
    // Agregar el <li> al <ul>
    ulElement.appendChild(liElement);
  });

  
  return ulElement;
};