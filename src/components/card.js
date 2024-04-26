export const card = (character) => {
  const li = document.createElement("li");
  li.innerHTML =  
  ` 
    <li class ="card-li" itemscope itemtype="Personaje" id=${character.id}>
      <div class="card">
        <div class="imgs-container"> 
          <a id="click-img">
            <img src=${character.imageUrl} alt=${character.name} class="card-img">
          </a>
          <img src="https://d100mj7v0l85u5.cloudfront.net/s3fs-public/2022-10/futuro-codigo-de-barras.png" alt="barcode" class="barcode-img">
        </div> 
        <div class="card-text"> 
          <h3 itemprop="name" class="card-tittle">${character.name}</h3>
          <div class="p-box">
            <p1 itemprop="nenType"><span>Tipo de Nen: </span>${character.facts.nenType}</p1>
            <p2 itemprop="ocupation"><span>Ocupación: </span>${character.facts.ocupation}</p2>
            <p3 itemprop="abilities"><span>Habilidades: </span>${character.extraInfo.abilities}</p3>
          </div>  
        </div>
      </div>
    </li>
  `;

  const clickImg = li.querySelector("#click-img");
  clickImg.addEventListener("click", () => {
    alert(`you've just make a click in ${character.name}`);
    /* navigateTo("/api-key", {});
- ¿Qué quiero? Que el click me lleve a otra vista
- Para que el click sepa a dónde tiene que ir:
- Crear variable para el identificador. Necesita tener un identificador (en este caso, el id de cada personaje)
- Crear una nueva URL (con window location) que incluya la ruta de la vista y el identificador respectivo (query param + identificador {key+value} === ?id=character.id). "Llevar" el identificador a la url
- Actualizar el historial de navegación en la URL (con history.pushState({}, '', newUrl)) para sumar la nueva URL sin borrar el historial
- onURLchange

- MIRAR RAMA NICO PARA REFERENCIAR PASOS A SEGUIR
*/
  });    

  return li;
};

