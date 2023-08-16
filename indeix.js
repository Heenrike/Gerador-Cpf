const box = document.querySelector(".checkbox");
const cont = document.querySelector(".container");

class Cpf {
  constructor(cpfEnviado) {
    this.cpfLimpo = cpfEnviado.replace(/\D/g, "");
  }

  validar() {
    if (
      typeof this.cpfLimpo === "undefined" ||
      this.cpfLimpo.length !== 11 ||
      this.isRepeat() ||
      !this.cpfLimpo.match(/^\d+$/)
    )
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

  isRepeat() {
    const sequencia = this.cpfLimpo[1].repeat(this.cpfLimpo.length);
    return sequencia === this.cpfLimpo;
  }
}

const validar = document.querySelector(".validar");
validar.addEventListener("click", () => {
  const input = document.querySelector(".input").value.replace(/\D/g, "");
  const cpf = new Cpf(input);
  console.log(cpf.validar() === input);

  if (cpf.validar() === input) {
    cont.classList.add("acerto");
  } else {
    cont.classList.add("errodo");
  }
  setTimeout(function() {
    cont.classList.remove("acerto");
    cont.classList.remove("errodo");
  }, 1000);
});

const gerar = document.querySelector(".gerar");
gerar.addEventListener("click", () => {
  const inputField = document.querySelector(".input");
  const checkbox = document.querySelector("#checkbox");
  let NumbArray = [];

  do {
    NumbArray = [];
    for (let contador = 0; contador < 11; contador++) {
      NumbArray.push(gerarNumeroAleatorio(0, 9).toFixed(0));
    }
    const cpfGerado = NumbArray.join("");
    const cpf = new Cpf(String(cpfGerado));
    if (!cpf.validar()) {
      continue;
    }

    let valorCpf = cpf.validar();
    if (checkbox.checked) {
      valorCpf = valorCpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
    }

    inputField.value = valorCpf;
    console.log(cpfGerado);
    break;
  } while (true);
});

function gerarNumeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
