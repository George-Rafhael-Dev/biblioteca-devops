const fs = require("fs");
const path = require("path");

describe("Página de Livros", () => {
  test("deve possuir os elementos necessários", () => {
    const htmlPath = path.join(__dirname, "..", "livros.html");
    const html = fs.readFileSync(htmlPath, "utf8");

    document.body.innerHTML = html;

    expect(document.getElementById("btn-logout")).not.toBeNull();
    expect(document.getElementById("form-livro")).not.toBeNull();

    expect(document.getElementById("titulo")).not.toBeNull();
    expect(document.getElementById("autor")).not.toBeNull();
    expect(document.getElementById("categoria")).not.toBeNull();
    expect(document.getElementById("ano")).not.toBeNull();

    expect(document.getElementById("tabela-livros")).not.toBeNull();
    expect(document.getElementById("mensagem")).not.toBeNull();
  });
});