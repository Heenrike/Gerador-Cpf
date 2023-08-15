class Cpf {
  constructor(cpfEnviado) {
    this.cpfLimpo = cpfEnviado.replace(/\D/g, "");
  }

  validar() {
    if (typeof this.cpfLimpo === "undefined" || this.cpfLimpo.length !== 11)
      return false;

    let cpfArray = Array.from(this.cpfLimpo);
    let cpfParcial = cpfArray.slice(0, -2);

    const digito1 = this.gerarNumb(cpfParcial);

    cpfParcial.push(digito1);
    const digito2 = this.gerarNumb(cpfParcial);
    const cpfCorreto = cpfParcial.join("") + digito2;

    return cpfCorreto;
  }

  gerarNumb(cpfParcial) {
    let x = cpfParcial.length + 1;
    const total = cpfParcial.reduce((cc, valor) => {
      const value = parseInt(valor) * x;
      x--;
      return cc + value;
    }, 0);
    const digito = 11 - (total % 11);
    return digito > 9 ? "0" : String(digito);
  }
}

const validar = document.querySelector(".validar");
validar.addEventListener("click", () => {
  const input = document.querySelector(".input").value.replace(/\D/g, "");
  const cpf = new Cpf(input);
  console.log(cpf.validar() === input);
});

const gerar = document.querySelector(".gerar");
gerar.addEventListener("click", () => {
  let NumbArray = [];
  for (let contador = 0; contador < 11; contador++) {
    NumbArray.push(gerarNumeroAleatorio(0, 9).toFixed(0));
  }

  const cpfGerado = NumbArray.join("");
  const inputField = document.querySelector(".input");

  const cpf = new Cpf(String(cpfGerado));
  inputField.value = cpf.validar();
  console.log(cpfGerado);
});

function gerarNumeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
