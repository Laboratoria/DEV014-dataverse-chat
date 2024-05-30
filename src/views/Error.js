export function Error (){
    const errorEl = document.createElement("div");
    errorEl.innerHTML = `
    <p class="titleError"> Error: Page not found</p>
    <h3> <strong>No se encontro esta pagina </strong></h3>
    <a href="/"><button id="mostrar" class="mostrar">volver</button></a>
      
    `;
  
    return errorEl;
  };
  
  