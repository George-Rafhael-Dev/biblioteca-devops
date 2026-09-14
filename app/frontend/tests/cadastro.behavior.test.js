const fs = require("fs");
const path = require("path");

describe("Comportamento do Cadastro", () => {
  beforeEach(() => {
    jest.resetModules();
    localStorage.clear();

    const htmlPath = path.join(__dirname, "..", "login.html");
    const html = fs.readFileSync(htmlPath, "utf8");

    document.body.innerHTML = html;
  });

  test("deve enviar matrícula e senha para a API de cadastro", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        mensagem: "Usuário cadastrado com sucesso!"
      })
    });

    const scriptPath = path.join(__dirname, "..", "script.js");
    const script = fs.readFileSync(scriptPath, "utf8");

    const scriptElement = document.createElement("script");
    scriptElement.textContent = script;
    document.body.appendChild(scriptElement);

    document.getElementById("matricula").value = "12345";
    document.getElementById("senha").value = "123456";

    document
      .getElementById("btn-cadastrar")
      .dispatchEvent(new Event("click", { bubbles: true }));

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/cadastro"),
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          matricula: "12345",
          senha: "123456"
        })
      })
    );
  });
});