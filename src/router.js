let ROUTES = {};
let rootElement = "";

export const setRootElement= (el) => {
  rootElement = el;
};


export const setRoutes = (routes) => {
  if (typeof routes !== 'object') {
    throw new Error("Las rutas deben ser un objeto.");
  }
  if (!routes['/error']) {
    throw new Error("Debes definir una ruta /error en tus rutas.");
  }
  ROUTES = routes;
};


const queryStringToObject = (queryString) => {
  const params = new URLSearchParams (queryString);
  const object = Object.fromEntries(params);

  return object;
}


const renderView = (pathname, props = {}) => {
  rootElement.innerHTML = "";
  const view = ROUTES[pathname] || ROUTES["/error"];
  const viewElement = view(props);

  rootElement.appendChild(viewElement);
};


export const navigateTo = (pathname, props = {}) => {
  const queryString = Object.keys(props)
    .map((key) => `${key}=${props[key]}`)
    .join("&");

  const fullPath = `${pathname}?${queryString}`;
  window.history.pushState({}, "", fullPath);

  renderView(pathname, props);
};


export const onURLChange = (pathname) => {
  const searchURL = window.location.search;
  const objectProps = queryStringToObject(searchURL);
  renderView(pathname, objectProps);
};
