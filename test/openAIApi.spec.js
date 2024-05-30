/* global describe, test, expect, jest */

import { communicateWithOpenAI } from "../src/lib/openAIApi.js";

window.fetch = jest.fn();

describe("communicateWithOpenAI return value expected", () => {
  test("should return a message from OpenAI API", async () => {
    const messages = "¿Cuál es tu debilidad?";
    const id = "sauron";
    const expectedResponse = {
      choices: [
        { text: "Hola, soy Sauron. Mi única debilidad es el Anillo Único que deseo poseer." },
      ],
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(expectedResponse),
    });

    const result = await communicateWithOpenAI(messages, id);

    console.log("Expected Response:", expectedResponse.choices);
    console.log("Actual Result:", result);

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
              content: `Responde en primera persona como si fuera este personaje: ${id}`,
            },
          ],
          temperature: 0.7,
        }),
      }
    );

    expect(result).toEqual([expectedResponse.choices]);
  
  });

  test("should handle an invalid response", async () => {
    const messages = "¿Cuál es tu debilidad?";
    const id = "sauron";

    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: () => Promise.resolve({ error: "Not Found" }),
    });

    await expect(communicateWithOpenAI(messages, id)).rejects.toThrow(
      'Failed to communicate with OpenAI'
    );
  });
});
