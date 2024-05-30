// src/lib/apiKey.js

export const getApiKey = () => {
  // Obtiene la API KEY desde Local Storage
  return localStorage.getItem('ApiKey');
};

export const setApiKey = (key) => {
  // Guarda la API KEY en Local Storage
  localStorage.setItem('ApiKey', key);
};
