import { communicateWithOpenAI } from "../src/lib/openAIApi.js";

window.fetch = jest.fn();

describe("El valor de retorno esperado de communicateWithOpenAI", () => {
  test("La aplicación debe devolver un mensaje de la API de OpenAI", async () => {
    const messages = "cual es tu hechizo favorito";
    const id = "gandalf";
    const expectedResponse = {
      choices: [
        { text: "Mi hechizo favorito es sin duda el hechizo de fuego, donde puedo conjurar llamas para iluminar la oscuridad y proteger a mis compañeros en la batalla." },
      ],
    };

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(expectedResponse),
    });

    const result = await communicateWithOpenAI(messages, id);

    expect(fetch).toHaveBeenCalledWith(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: expect.any(String),
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "user", content: messages },
            {
              role: "system",
              content: `Responde en primera persona como si fuera este personaje del Señor de los Anillos:${id}`,
            },
          ],
          temperature: 0.7,
        }),
      }
    );

    expect(result).toEqual([expectedResponse.choices]);
  });

  
  test("La aplicación debe manejar una respuesta inválida", async () => {
    const messages = "cual es tu hechizo favorito";
    const id = "gandalf";

    fetch.mockRejectedValueOnce(new Error("404 Not Found"));

    await expect(communicateWithOpenAI(messages, id)).rejects.toThrow(
      "404 Not Found"
    );
  });


  test("La aplicación debe manejar errores en la solicitud", async () => {
    const messages = "cual es tu hechizo favorito";
    const id = "gandalf";

    fetch.mockRejectedValueOnce(new Error("Error en la solicitud a OpenAI"));

    await expect(communicateWithOpenAI(messages, id)).rejects.toThrow(
      "Error en la solicitud a OpenAI"
    );
  });
});
