let ROUTES = {};
let rootEl;

export const setRootEl = (el) => {
  rootEl = el;
};

export const setRoutes = (routes) => {
  // Lanzar un error si rutas no es un objeto
  if (typeof routes !== "object") {
    throw new Error("This is not an object");
  }
  // Lanzar un error si rutas no define una ruta /error
  if (!routes["/error"]) {
    throw new Error(
      "Routes must define an /error route with a function handler"
    );
  }
  ROUTES = routes;
};

const renderView = (pathname, props = {}) => {
  // Limpiar el elemento raíz del DOM
  rootEl.innerHTML = "";
  // Encontrar la vista correcta en ROUTES para la ruta
  const view = ROUTES[pathname] || ROUTES["/error"];
  // Renderizar la vista correcta pasando el valor de props
  const viewElement = view(props);

  rootEl.appendChild(viewElement);

};

const queryStringToObject = (queryString) => {
  const params = new URLSearchParams(queryString);
  const obj = Object.fromEntries(params);
  return obj;
};
export const navigateTo = (pathname, props = {}) => {
  const queryString = Object.keys(props)
    .map((key) => `${key}=${props[key]}`)
    .join("&");

  const fullPath = `${pathname}?${queryString}`;

  window.history.pushState({}, "", fullPath);

  renderView(pathname, props);
};

export const onURLChange = (location) => {
  const { pathname, search } = location;
  const searchParams = queryStringToObject(search);

  renderView(pathname, searchParams);
};