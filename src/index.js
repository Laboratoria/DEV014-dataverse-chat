import {Home} from './views/Home.js';
import {Error} from './views/Error.js';
import ApiKey from "./views/Apikey.js";
import {Personajes} from './views/Personajes.js';
import {ChatGroup} from './views/ChatGroup.js';
import { setRootEl, setRoutes, onURLChange } from './router.js';

// Define tus rutas y sus vistas asociadas
const routes = {
  "/": Home,
  "/error": Error,
  "/apikey": ApiKey,
  "/Personajes": Personajes,
  "/ChatGroup": ChatGroup
  
};

// Asigna las rutas
setRoutes(routes);

// Handle initial URL load
window.addEventListener("DOMContentLoaded", () => {
  // set root element
  const rootElement = document.getElementById('root'); 
  setRootEl(rootElement);
   // Llama a onURLChange con window.location para manejar la carga de la página inicial
   onURLChange(window.location);
  });

// Handle URL changes
window.addEventListener('popstate', () => {
    // Establecer el elemento raíz
  const rootElement = document.getElementById('root');
  
  // Invocar a onURLChange 
  onURLChange(window.location.pathname, rootElement);
 });