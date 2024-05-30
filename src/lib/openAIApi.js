import { getApiKey } from "../lib/apiKey.js";

export const communicateWithOpenAI = (messages, id) => {
  const promises = [];
  if (Array.isArray(id)) {
    for (let i = 0; i < id.length; i++) {
      const result = solicitude(id[i]);
      promises.push(result);
    }
  } else {
    const result = solicitude(id);
    promises.push(result);
  }
  function solicitude(id) {
    const OPENAI_API_KEY = getApiKey();
    //console.log("API Key:", OPENAI_API_KEY); // Agregar esta línea para verificar la API Key
    const data = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: `${messages}` },
        {
          role: "system",
          content: `Responde en primera persona como si fuera este personaje del Señor de los Anillos:${id}`,
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
      .then((response) => response.json())
      .then((data) => {
        return data.choices;
      })
      .catch((error) => {
        //console.error("Error en la solicitud a OpenAI:", error); // Agregar esta línea para imprimir errores
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

