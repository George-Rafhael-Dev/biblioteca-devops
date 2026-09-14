const request = require("supertest");
const app = require("../app");

describe("API da Biblioteca", () => {
  test("GET / deve retornar que a API está funcionando", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      status: "API rodando"
    });
  });
});