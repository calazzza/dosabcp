let agressividade = document.querySelector('#agressividade');
let desvioPadrao = document.querySelector('#desvio-padrao');
let fck = document.querySelector('#fck');
let estrutura = document.querySelector('#estrutura');
let finuraAreia = document.querySelector('#finura-areia');
let cimentoEspecifica = document.querySelector("#cimento-espec");
let areiaEspecifica = document.querySelector("#areia-espec");
let britaEspecifica = document.querySelector("#brita-espec");
let cimentoUnitaria = document.querySelector("#cimento-unitaria");
let areiaUnitaria = document.querySelector("#areia-unitaria");
let britaUnitaria = document.querySelector("#brita-unitaria");
let areiaUmidade = document.querySelector("#areia-umidade");
let britaUmidade = document.querySelector("#brita-umidade");
let diametroBrita = document.querySelector('#diametro-brita');
let slump = document.querySelector('#slump');
let betoneira = document.querySelector('#betoneira');

let fcj = document.querySelector("#fcj");
let aguaCimento = document.querySelector('#agua-cimento');
let consumoAgua = document.querySelector('#consumo-agua');
let consumoCimento = document.querySelector('#consumo-cimento');
let consumoBrita = document.querySelector('#consumo-brita');
let volumeAreia = document.querySelector("#volume-areia");
let consumoAreia = document.querySelector("#consumo-areia");
let tracoCimento = document.querySelector("#traco-cimento");
let tracoAreia = document.querySelector("#traco-areia");
let tracoBrita = document.querySelector("#traco-brita");
let tracoAC = document.querySelector("#traco-ac");
let consumoBetoneiraCimento = document.querySelector("#consumo-betoneira-cimento");
let consumoBetoneiraAreia = document.querySelector("#consumo-betoneira-areia");
let consumoBetoneiraBrita = document.querySelector("#consumo-betoneira-brita");
let consumoBetoneiraAgua = document.querySelector("#consumo-betoneira-agua");

let inputs = document.querySelectorAll("input");
let inputsResultados = document.querySelectorAll("#resultados input");
let selects = document.querySelectorAll("select");

let erroFck = document.querySelector("#erro-fck");
let erroFcj = document.querySelector('#erro-fcj');
let erroAC = document.querySelector('#erro-ac');
let erroCimento = document.querySelector('#erro-cimento');
let erros;
let c = 0;

let titulosDesvioPadrao = [
    "Quando todos os materiais forem medidos em peso e houver medidor e água, corrigindo-se as quantidades de agregado miúdo e água em função de determinações frequentes e precisas do teor de umidade dos agregados, e houver garantia de manutenção, no decorrer da obra, da homogeneidade dos materiais a serem empregados",
    "Quando o cimento for medido em peso e os agregados em volume, e houver medidor de água, com correção do volume do agregado miúdo e da quantidade de água em função de determinações frequentes e precisa do teor de umidade dos agregados",
    "Quando o cimento for medido em peso e os agregados em volume, e houver medidor de água, corrigindo-se a quantidade de água em função da umidade dos agregados simplesmente estimada"
]

let tabelaAguaCimento = [
    ['armado', '0.65', '0.60', '0.55', '0.45'],
    ['protendido', '0.60', '0.55', '0.50', '0.40']
];

let tabelaFck = [
    ['armado', '20', '25', '30', '40'],
    ['protendido', '25', '30', '35', '40']
];

let tabelaConsumoCimento = [
    ['0', '260', '280', '320', '360'],
];
    
let tabelaConsumoAgua = [
    ['A', '225', '215',	'200', '195', '190', '185'],
    ['B', '230', '220', '205', '200', '195', '190'],
    ['C', '235', '225',	'210', '205', '200', '195'],
    ['D', '240', '230',	'215', '210', '205', '200'],
    ['E', '245', '235',	'220', '215', '210', '205'],
    ['F', '250', '240',	'225', '220', '215', '210'],
    ['J', '255', '245',	'230', '225', '220', '215']
];
    
let tabelaConsumoBrita = [
    ['1.0', '665', '728', '790', '815', '840', '865'],
    ['1.2', '654', '712', '770', '795', '820', '845'],
    ['1.4', '625', '688', '750', '775', '800', '825'],
    ['1.6', '605', '688', '730', '755', '780', '805'],
    ['1.8', '585', '648', '710', '735', '760', '785'],
    ['2.0', '565', '628', '690', '715', '740', '765'],
    ['2.2', '545', '608', '670', '695', '720', '745'],
    ['2.4', '525', '588', '650', '675', '700', '725'],
    ['2.6', '505', '568', '630', '655', '680', '705'],
    ['2.8', '485', '548', '610', '635', '660', '685']
];

for (var i=0, l=inputs.length; i<l; i++) {
    inputs[i].addEventListener('input', calcularTudo, false);
}

for (var i=0, l=selects.length; i<l; i++) {
    selects[i].addEventListener('change', calcularTudo, false);
}

for (var i=0, l=desvioPadrao.length; i<l; i++){
    item = document.querySelector(`#desvio-padrao > option:nth-child(${i+1})`)
    item.title = titulosDesvioPadrao[i]
}

defineTituloDesvioPadrao();

function calcularTudo(){
    erros = []

    verificaFck();
    calcularFcj();
    calcularAguaCimento();
    calcularConsumoAgua();
    calcularConsumoCimento();
    calcularConsumoBrita();
    calcularVolumeAreia();
    calcularConsumoAreia();
    calcularTraco();
    calcularCapacidadeBetoneira();
    verificaErros();
    defineTituloDesvioPadrao();
}

function verificaFck(){  
    if (parseFloat(fck.value) < tabelaFck.vlookup(estrutura.value, agressividade.value)){
        erros.push([fck, `O Fck mínimo para esta classe de agressividade é: ${tabelaFck.vlookup(estrutura.value, agressividade.value)}.`]);
    } else{
        ocultaErro(fck);
    }
}

function calcularFcj(){
    if (fck.value)
        fcj.value = (parseFloat(fck.value)+(1.65*desvioPadrao.value)).toFixed(5);
};

function calcularAguaCimento(){
    if (fck.value){
        let a, b;
        let e = 2.7182818284590452353602874;

        ocultaErro(fcj);

        if (fcj.value > 47 && fcj.value <= 50){
            a = 5.7427;
            b = -52.65;
        }
        else if (fcj.value > 44 && fcj.value <= 47){
            a = 5.3893;
            b = -49.64;
        }
        else if (fcj.value > 41 && fcj.value <= 44){
            a = 5.0623;
            b = -46.41;
        }
        else if (fcj.value > 35 && fcj.value <= 41){
            a = 4.7142;
            b = -43.28;
        }
        else if (fcj.value > 32 && fcj.value <= 35){
            a = 4.0432;
            b = -36.83;
        }
        else if (fcj.value > 29 && fcj.value <= 32){
            a = 3.634;
            b = -33.83;
        }
        else if (fcj.value <= 29){
            a = 3.2929;
            b = -30.63;
        }
        else {
            a = undefined;            
            erros.push([fcj, `Rever valores de Fcj. O valor máximo é 50. O valor atual é: ${fcj.value}.`]);
        }

        if (a != undefined){
            let lnx = (parseFloat(fcj.value) - a) / b;
            let aC = Math.pow(e,lnx).toFixed(5); 
            let tAC = tabelaAguaCimento.vlookup(estrutura.value, agressividade.value)

            if (aC <= tAC){
                aguaCimento.value = aC 

                ocultaErro(aguaCimento);
            } else {
                erros.push([aguaCimento,`A relação água cimento máxima para esta classe de agressividade é: ${tAC}. O valor atual é: ${aC}`]);
            }
        } else {
            aguaCimento.style.borderColor = "#dcdce6";
            aguaCimento.style.color = "#333";

            erroAC.style.display = "none";
        }
    } else {
        ocultaErro(fcj);
        ocultaErro(aguaCimento);
    }
}

function calcularConsumoAgua(){
    consumoAgua.value = tabelaConsumoAgua.vlookup(slump.value, diametroBrita.selectedIndex + 1);
}

function calcularConsumoCimento(){
    if (consumoAgua.value && aguaCimento.value){
        let cC = (parseFloat(consumoAgua.value) / parseFloat(aguaCimento.value)).toFixed(5);
        let tCC = tabelaConsumoCimento.vlookup(0, agressividade.value);

        if (cC >= tCC){
            consumoCimento.value = cC 

            ocultaErro(consumoCimento);
        } else {
            erros.push(consumoCimento, `O consumo de cimento mínimo para esta classe de agressividade é: ${tCC}.`)
        }
    } else {
        ocultaErro(consumoCimento);
    }
}

function calcularConsumoBrita(){
    if (britaUnitaria.value){
        consumoBrita.value = (britaUnitaria.value * tabelaConsumoBrita.vlookup(finuraAreia.value, diametroBrita.selectedIndex + 1)).toFixed(5);
    }
}

function calcularVolumeAreia(){
    if (consumoCimento.value && cimentoEspecifica.value && consumoBrita.value && britaEspecifica.value && consumoAgua.value)
        volumeAreia.value = (1000 - ((consumoCimento.value/cimentoEspecifica.value) + (consumoBrita.value/britaEspecifica.value) + (consumoAgua.value/1))).toFixed(5);
}

function calcularConsumoAreia(){
    if (volumeAreia.value && areiaEspecifica.value){
        consumoAreia.value = (volumeAreia.value * areiaEspecifica.value).toFixed(5);
    }
}

function calcularTraco(){
    if (consumoCimento.value && consumoAreia.value && consumoBrita.value){
        tracoCimento.value = (consumoCimento.value / consumoCimento.value).toFixed(2);
        
        tracoAreia.value = (consumoAreia.value / consumoCimento.value).toFixed(2);

        tracoBrita.value = (consumoBrita.value / consumoCimento.value).toFixed(2);

        tracoAC.value = (consumoAgua.value / consumoCimento.value).toFixed(2);
    }
}

function calcularCapacidadeBetoneira(){
    if (betoneira.value && tracoCimento.value && cimentoEspecifica.value && tracoAreia.value && areiaEspecifica.value && tracoBrita.value && britaEspecifica.value && tracoAC.value){
        betoneiraValue = parseFloat(betoneira.value);
        tracoCimentoValue = parseFloat(tracoCimento.value);
        cimentoEspecificaValue = parseFloat(cimentoEspecifica.value);
        tracoAreiaValue = parseFloat(tracoAreia.value);
        areiaEspecificaValue = parseFloat(areiaEspecifica.value);
        tracoBritaValue = parseFloat(tracoBrita.value);
        britaEspecificaValue = parseFloat(britaEspecifica.value);
        tracoACValue = parseFloat(tracoAC.value);

        consumoBetoneiraCimento.value = (betoneiraValue / ((tracoCimentoValue / cimentoEspecificaValue) + (tracoAreiaValue / areiaEspecificaValue) + (tracoBritaValue / britaEspecificaValue) +  tracoACValue)).toFixed(2)

        consumoBetoneiraAreia.value = (consumoBetoneiraCimento.value * tracoAreiaValue).toFixed(2);
        
        consumoBetoneiraBrita.value = (consumoBetoneiraCimento.value * tracoBritaValue).toFixed(2);
        
        consumoBetoneiraAgua.value = (consumoBetoneiraCimento.value * tracoACValue).toFixed(2)
    }
}

function verificaErros(){
    if (erros.length > 0){
        for (var i=0, l=erros.length; i<l; i++){
            exibeErros(erros[i]);
        }
        
        for (var i=0, l=inputsResultados.length; i<l; i++) {
            inputsResultados[i].value = "";
        }
    }
}

function exibeErros(e){
    e[0].style.borderColor = "#e02041";
    e[0].style.color = "#e02041";

    e[0].nextElementSibling.style.display = "block"
    e[0].nextElementSibling.textContent = e[1];
}

function ocultaErro(obj){
    obj.style.borderColor = "#dcdce6";
    obj.style.color = "#333";
        
    obj.nextElementSibling.style.display = "none"
}

function defineTituloDesvioPadrao(){
    desvioPadrao.title = titulosDesvioPadrao[desvioPadrao.selectedIndex];
}

Array.prototype.vlookup = function(needle,index,exactmatch){
    index = index || 0;
    exactmatch = exactmatch || false;
    for (var i = 0; i < this.length; i++){
        var row = this[i];
        
        if ((exactmatch && row[0]===needle) || row[0].indexOf(needle) != -1)
            return (index < row.length ? row[index] : row);
    }
    return null;
}