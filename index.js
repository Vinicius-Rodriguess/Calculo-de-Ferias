const formulario = document.querySelector(".formulario");
const buttonSubmit = document.querySelector(".btnSubmit");
const resultado = document.querySelector(".resultadoCalculoExibir");
const salarioResult = document.querySelector(".salarioResult");
const abonoResult = document.querySelector(".abonoResult");
const umtercoResult = document.querySelector(".umtercoResult");
const umTercoAbonoResult = document.querySelector(".umTercoAbonoResult");
const inssResult = document.querySelector(".inssResult");
const irResult = document.querySelector(".irResult");
const mediasResult = document.querySelector(".mediasResult");

class Calcula {
    constructor(salario, dias, medias, abono) {
        this.salario = salario;
        this.dias = dias;
        this.medias = medias;
        this.abono = abono;
        this.tercoProporcial = 0;
        this.tercoAbono = 0;
        this.descontoInss = 0;
        this.descontoIr = 0;
        this.salarioProporcial = 0;

        this.abono === true ? this.feriasComAbono() : this.feriasSemAbono();
    }

    feriasSemAbono() {
        const salarioProporcial = (this.salario / 30) * this.dias;
        this.tercoProporcial = (salarioProporcial + this.medias) / 3;
        this.salarioProporcial = salarioProporcial;

        const proventos = salarioProporcial + this.tercoProporcial;

        this.descontosBase(proventos);
    }

    feriasComAbono() {
        const salarioProporcial = (this.salario / 30) * this.dias;
        this.tercoProporcial = (salarioProporcial + this.medias) / 3;
        this.salarioProporcial = salarioProporcial;

        const abono = (salarioProporcial / 30) * 10;
        this.tercoAbono = abono / 3;

        const proventos = salarioProporcial + this.tercoProporcial + abono + this.tercoAbono;

        this.descontosBase(proventos);
    }

    descontosBase(proventos) {
        this.descontoInss = this.calcularDescontoInss(proventos);
        this.descontoIr = this.calcularDescontoIr(proventos);

        const descontosTotais = this.descontoInss + this.descontoIr;

        const liquido = proventos - descontosTotais;

        this.exibir(proventos, descontosTotais, liquido);
    }

    calcularDescontoInss(salario) {
        let descontarInss = 0;

        if (salario > 0 && salario < 1320) {
            descontarInss = 0.075; // 7.5%
            return Math.min(salario * descontarInss, 99);
        } else if (salario >= 1320.01 && salario < 2571.29) {
            descontarInss = 0.09; // 9.0%
            return Math.min(salario * descontarInss, 112.62);
        } else if (salario >= 2571.30 && salario < 3856.94) {
            descontarInss = 0.12; // 12.0%
            return Math.min(salario * descontarInss, 154.28);
        } else if (salario >= 3856.95 && salario < 7507.29) {
            descontarInss = 0.14; // 14.0%
            return Math.min(salario * descontarInss, 511.05);
        } else if (salario > 7507.29){
            descontarInss = 876.94;
            return descontarInss;
        }

        return 0;
    }

    calcularDescontoIr(salario) {
        let descontarIr = 0;

        if (salario >= 1903.99 && salario < 2826.65) {
            descontarIr = 0.075; // 7.5%
            return Math.min(salario * descontarIr, 158.40);
        } else if (salario >= 2826.66 && salario < 3751.05) {
            descontarIr = 0.15; // 15%
            return Math.min(salario * descontarIr, 370.40);
        } else if (salario >= 3751.06 && salario < 4664.68) {
            descontarIr = 0.225; // 22,50%
            return Math.min(salario * descontarIr, 651.73);
        } else if (salario >= 4664.69) {
            descontarIr = 0.275; // 27,50%
            return Math.min(salario * descontarIr, 884.96);
        }

        return 0;
    }

    exibir(proventos, descontos, liquido) {
        resultado.innerHTML = `Proventos: ${proventos.toFixed(2)} - Descontos: ${descontos.toFixed(2)} - Liquido: ${liquido.toFixed(2)}`;
        salarioResult.innerHTML = this.salarioProporcial.toFixed(2);
        abonoResult.innerHTML = this.abono ? (this.tercoAbono * 3).toFixed(2) : '0.00'; // Exibe o valor do abono se for verdadeiro, senão exibe 0.00
        umtercoResult.innerHTML = this.tercoProporcial.toFixed(2);
        umTercoAbonoResult.innerHTML = this.tercoAbono.toFixed(2);
        inssResult.innerHTML = this.descontoInss.toFixed(2);
        irResult.innerHTML = this.descontoIr.toFixed(2);
        mediasResult.innerHTML = this.medias.toFixed(2);
    }
}

buttonSubmit.addEventListener("click", e => {
    e.preventDefault();

    const salario = parseFloat(document.querySelector(".salario").value);
    const medias = parseFloat(document.querySelector(".medias").value) || 0;
    const dias = parseInt(document.querySelector(".dias").value);
    const abono = document.querySelector(".abono").checked;

    if (!isNaN(salario)) {
        new Calcula(salario, dias, medias, abono);
    } else {
        console.error("Erro ao analisar o salário.");
    }
});
