import {home} from "./views/Home.js";
import {error} from './views/Error.js'; 
import chatGrupal from "./views/ChatGrupal.js";
import chatIndividual from "./views/ChatIndividual.js";
import { setRootElement, setRoutes, onURLChange } from './router.js';

const viewContainer = document.getElementById("root");

const routes = {
  "/": home,
  "/error": error,
  "/ChatGrupal": chatGrupal,
  "/ChatIndividual": chatIndividual,
  
};

// Asignar las rutas y el elemento raíz dentro del evento DOMContentLoaded
setRoutes(routes);
setRootElement(viewContainer);

// Definir el contenedor de la vista dentro del evento DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  onURLChange(window.location.pathname);  
});

window.addEventListener("popstate", () => {
  onURLChange(window.location);
  
});

