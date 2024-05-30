// src/lib/openAIApi.js

// Importa la función para obtener la API KEY desde apiKey.js
import { getApiKey } from './apiKey.js';

export const communicateWithOpenAI = (messages, id) => {
  const promises = [];
  
  if (Array.isArray(id)) {
    for (let i = 0; i < id.length; i++) {
      const result = makeRequest(messages, id[i]);
      promises.push(result);
    }
  } else {
    const result = makeRequest(messages, id);
    promises.push(result);
  }

  function makeRequest(messages, id) {
    const OPENAI_API_KEY = getApiKey();
    const data = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: `${messages}` },
        {
          role: "system",
          content: `Responde en primera persona como si fuera este personaje: ${id}`,
        },
      ],
      temperature: 0.7,
    };

    return fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify(data),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to communicate with OpenAI');
      }
      return response.json();
    })
    .then((data) => {
      return data.choices;
    })
    .catch((error) => {
      throw error;
    });
  }

  return Promise.all(promises)
    .then((results) => {
      return results;
    })
    .catch((error) => {
      throw error;
    });
};
