export const header = () => {
  const containerHeader = document.createElement ('header');
  containerHeader.innerHTML = `  
    <img class="logo" src="data/img/logo.png" alt="Logo de la página">
    <h1>El Chat de los Anillos</h1> 
    `;

  return containerHeader;

};