const fs = require("fs");
const path = require("path");

describe("Comportamento do Login", () => {
  beforeEach(() => {
    jest.resetModules();
    localStorage.clear();

    const htmlPath = path.join(__dirname, "..", "login.html");
    const html = fs.readFileSync(htmlPath, "utf8");

    document.body.innerHTML = html;

    window.history.pushState({}, "", "/");
    
  });

  test("deve enviar matrícula e senha para a API de login", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        token: "token-teste"
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
      .getElementById("form-login")
      .dispatchEvent(new Event("submit", { bubbles: true }));

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/login"),
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

    expect(localStorage.getItem("token")).toBe("token-teste");
  });
});
