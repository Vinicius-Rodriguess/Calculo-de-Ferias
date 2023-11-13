
const formulario = document.querySelector(".formulario");
const buttonSubmit = document.querySelector(".btnSubmit");
const resultado = document.querySelector(".resultado");

class Calcula {
    constructor(salario, dias, medias, abono) {

        this.salario = salario;
        this.dias = dias;

        //medias do que a pessoa recebeu a mais fora o salario, ex hora extra, periculosidade 
        this.medias = medias;

        //venda de ferias, calculo diferente
        this.abono = abono;

        this.abono === true ? this.feriasComAbono() : this.feriasSemAbono();
    }

    feriasSemAbono() {
        //regra de 3 para descobrir o proporcial caso nao seja 30 dias de descanso
        const salarioProporcial = (this.salario * this.dias) / 30;
        const tercoProporcial = (salarioProporcial + this.medias) / 3;

        const proventos = salarioProporcial + tercoProporcial;

        this.descontosBase(proventos);
    }

    feriasComAbono() {
        // isso só ta copiado de cima 
        //regra de 3 para descobrir o proporcial caso nao seja 30 dias de descanso
        const salarioProporcial = (this.salario * this.dias) / 30;
        const tercoProporcial = (salarioProporcial + this.medias) / 3;
        const abono = 1;

        const proventos = salarioProporcial + tercoProporcial + abono;

    }

    descontosBase(proventos){
        //Pegar tabela de bases do inss e de ir para os descontos

        const descontos = this.descontoInss(this.salario) + this.descontoIr(this.salario);
        const liquido = proventos - descontos;

        this.exibir(proventos, descontos, liquido);
    }

    descontoInss(salario) {
        let descontarInss = 0;

        if (salario > 0 && salario < 1320) descontarInss = 0.075; // 7.5%
        else if (salario >= 1320.01 && salario < 2571.29) descontarInss = 0.09; // 9.0%
        else if (salario >= 2571.30 && salario < 3856.94) descontarInss = 0.12; // 12.0%
        else if (salario >= 3856.95 && salario < 7507.49) descontarInss = 0.14; // 14.0%

        return salario * descontarInss;
    }

    descontoIr(salario) {
        let descontarIr = 0;

        // salario ate 1903,98 - isento
        if (salario >= 1903.99 && salario < 2826.65) descontarIr = 0.075; // 7.5%
        else if (salario >= 2826.66 && salario < 3751.05) descontarIr = 0.15; // 15.0%
        else if (salario >= 3751.06 && salario < 4664.68) descontarIr = 0.225; // 22.5%
        else if (salario >= 4664.68) descontarIr = 0.275; // 27.5%

        return salario * descontarIr;
    }


    exibir(proventos, descontos, liquido){
        resultado.innerHTML = `Proventos: ${proventos.toFixed(2)} - Descontos: ${descontos.toFixed(2)} - Liquido: ${liquido.toFixed(2)}`;
    }


}

buttonSubmit.addEventListener("click", e => {
    e.preventDefault();

    const salario = parseFloat(document.querySelector(".salario").value);
    const medias = parseFloat(document.querySelector(".medias").value) || 0;
    const dias = parseInt(document.querySelector(".dias").value);
    const abono = document.querySelector(".abono").checked;

    new Calcula(salario, dias, medias, abono);

});