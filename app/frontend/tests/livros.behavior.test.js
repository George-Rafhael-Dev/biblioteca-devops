const fs = require("fs");
const path = require("path");

describe("Comportamento da Página de Livros", () => {
  beforeEach(() => {
    jest.resetModules();
    localStorage.clear();
    localStorage.setItem("token", "token-teste");

    const htmlPath = path.join(__dirname, "..", "livros.html");
    const html = fs.readFileSync(htmlPath, "utf8");

    document.body.innerHTML = html;
  });

  test("deve carregar os livros e exibi-los na tabela", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        {
          id: 1,
          titulo: "Dom Casmurro",
          autor: "Machado de Assis",
          categoria: "Romance",
          ano: 1899,
          disponivel: true
        }
      ]
    });

    const scriptPath = path.join(__dirname, "..", "script.js");
    const script = fs.readFileSync(scriptPath, "utf8");

    const scriptElement = document.createElement("script");
    scriptElement.textContent = script;
    document.body.appendChild(scriptElement);

    await new Promise(resolve => setTimeout(resolve, 0));

    const tabela = document.getElementById("tabela-livros");

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/livros")
    );

    expect(tabela.innerHTML).toContain("Dom Casmurro");
    expect(tabela.innerHTML).toContain("Machado de Assis");
    expect(tabela.innerHTML).toContain("Romance");
    expect(tabela.innerHTML).toContain("1899");
  });
});