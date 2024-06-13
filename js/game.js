let palavraSecretaDica;
let palavraSecretaSorteada;
let listaDinamica = [];
let tentativas = 6;

const palavras = [
    { nome: "RECICLAGEM", dica: "PROCESSO DE REAPROVEITAMENTO DE MATERIAIS" },
    { nome: "SUSTENTABILIDADE", dica: "USO DOS RECURSOS NATURAIS DE FORMA RESPONSÁVEL" },
    { nome: "BIODIVERSIDADE", dica: "VARIEDADE DE VIDA EXISTENTE NO PLANETA" },
    { nome: "REFLORESTAMENTO", dica: "ATO DE PLANTAR ÁRVORES PARA RECUPERAR A VEGETAÇÃO ORIGINAL" },
    { nome: "ENERGIA SOLAR", dica: "FONTE DE ENERGIA RENOVÁVEL QUE UTILIZA A LUZ DO SOL" },
    { nome: "COMPOSTAGEM", dica: "TRANSFORMAÇÃO DE RESÍDUOS ORGÂNICOS EM ADUBO NATURAL" },
    { nome: "EFEITO ESTUFA", dica: "FENÔMENO NATURAL QUE MANTÉM A TERRA AQUECIDA" },
    { nome: "DESMATAMENTO", dica: "REMOÇÃO DA VEGETAÇÃO NATURAL DE UMA ÁREA" },
    { nome: "AQUECIMENTO GLOBAL", dica: "AUMENTO DA TEMPERATURA DA TERRA DEVIDO À EMISSÃO DE GASES" },
    { nome: "POLUIÇÃO", dica: "CONTAMINAÇÃO DO AMBIENTE POR SUBSTÂNCIAS NOCIVAS" },
    { nome: "ECOEFICIÊNCIA", dica: "PRÁTICA DE PRODUZIR MAIS UTILIZANDO MENOS RECURSOS" },
    { nome: "CONSCIÊNCIA AMBIENTAL", dica: "ATENÇÃO E ATITUDE RESPONSÁVEL EM PRESERVAR O MEIO AMBIENTE" },
    { nome: "ENERGIA EÓLICA", dica: "ENERGIA OBTIDA A PARTIR DA FORÇA DO VENTO" },
    { nome: "PEGADA ECOLÓGICA", dica: "MEDIÇÃO DO IMPACTO DAS ATIVIDADES HUMANAS NO MEIO AMBIENTE" },
    { nome: "ÁGUA POTÁVEL", dica: "ÁGUA ADEQUADA PARA O CONSUMO HUMANO" },
    { nome: "PRESERVAÇÃO", dica: "ATO DE PROTEGER O MEIO AMBIENTE" },
    { nome: "RECURSOS NATURAIS", dica: "ELEMENTOS DA NATUREZA UTILIZADOS PELO SER HUMANO" },
    { nome: "ENERGIA RENOVÁVEL", dica: "FONTES DE ENERGIA QUE SE REGENERAM NATURALMENTE" },
    { nome: "LIXO ELETRÔNICO", dica: "RESÍDUOS DE DISPOSITIVOS ELETRÔNICOS" },
    { nome: "ECOSSISTEMA", dica: "CONJUNTO DE ORGANISMOS VIVOS INTERAGINDO COMO UMA UNIDADE" },
    { nome: "ADUBO ORGÂNICO", dica: "FERTILIZANTE NATURAL PRODUZIDO A PARTIR DE RESÍDUOS ORGÂNICOS" },
    { nome: "RESERVA FLORESTAL", dica: "ÁREA PROTEGIDA DESTINADA À CONSERVAÇÃO DO MEIO AMBIENTE" },
    { nome: "FLORESTA AMAZÔNICA", dica: "MAIOR FLORESTA TROPICAL DO MUNDO, LOCALIZADA NA AMÉRICA DO SUL" },
    { nome: "ENERGIAS LIMPAS", dica: "FONTES DE ENERGIA QUE NÃO POLUEM O MEIO AMBIENTE" },
    { nome: "EROSÃO", dica: "PROCESSO DE DESGASTE DO SOLO" },
    { nome: "ENERGIA HIDRELÉTRICA", dica: "ENERGIA OBTIDA A PARTIR DO MOVIMENTO DA ÁGUA" },
    { nome: "MEIO AMBIENTE", dica: "CONJUNTO DE CONDIÇÕES NATURAIS QUE INFLUENCIAM A VIDA NO PLANETA" },
    { nome: "ENERGIA GEOTÉRMICA", dica: "ENERGIA OBTIDA A PARTIR DO CALOR PROVENIENTE DO INTERIOR DA TERRA" },
    { nome: "BIODEGRADÁVEL", dica: "MATERIAL QUE PODE SER DECOMPOSTO NATURALMENTE" }
];

criarPalavraSecreta();
function criarPalavraSecreta() {
    const indexPalavra = parseInt(Math.random() * palavras.length);

    palavraSecretaSorteada = palavras[indexPalavra].nome;
    palavraSecretaDica = palavras[indexPalavra].dica;
}

montarPalavraNaTela();
function montarPalavraNaTela() {
    const dica = document.getElementById("dica");
    dica.innerHTML = palavraSecretaDica;

    const palavraTela = document.getElementById("palavra-secreta");
    palavraTela.innerHTML = "";

    for (let i = 0; i < palavraSecretaSorteada.length; i++) {
        if (listaDinamica[i] === undefined) {
            if (palavraSecretaSorteada[i] === " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML += "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>";
            } else {
                listaDinamica[i] = "&nbsp;";
                palavraTela.innerHTML += "<div class='letras'>" + listaDinamica[i] + "</div>";
            }
        } else {
            if (palavraSecretaSorteada[i] === " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML += "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>";
            } else {
                palavraTela.innerHTML += "<div class='letras'>" + listaDinamica[i] + "</div>";
            }
        }
    }
}

function verificaLetraEsclhida(letra) {
    document.getElementById("tecla-" + letra).disabled = true;
    if (tentativas > 0) {
        mudarStyleLetra("tecla-" + letra, false);
        comparaListas(letra);
        montarPalavraNaTela();
    }
}

function mudarStyleLetra(tecla, condicao) {
    if (condicao === false) {
        document.getElementById(tecla).style.background = "#C71585";
        document.getElementById(tecla).style.color = "#ffffff";
    } else {
        document.getElementById(tecla).style.background = "#008000";
        document.getElementById(tecla).style.color = "#ffffff";
    }
}

function comparaListas(letra) {
    const letraNormalizada = letra.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const palavraNormalizada = palavraSecretaSorteada.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const pos = palavraNormalizada.indexOf(letraNormalizada);
    if (pos < 0) {
        tentativas--;
        carregaImg();

        if (tentativas === 0) {
            abreModal("OPS!", "Não foi dessa vez ... A palavra secreta era <br>" + palavraSecretaSorteada);
        }
    } else {
        mudarStyleLetra("tecla-" + letra, true);
        for (let i = 0; i < palavraSecretaSorteada.length; i++) {
            if (palavraNormalizada[i] === letraNormalizada) {
                listaDinamica[i] = palavraSecretaSorteada[i];
            }
        }
    }

    let vitoria = true;
    for (let i = 0; i < palavraSecretaSorteada.length; i++) {
        if (palavraSecretaSorteada[i] !== listaDinamica[i]) {
            vitoria = false;
        }
    }

    if (vitoria) {
        abreModal("PARABÉNS!", "Você acertou...");
        tentativas = 0;
    }
}

function carregaImg() {
    const imagem = document.getElementById("imagem");
    switch (tentativas) {
        case 5:
            imagem.style.backgroundImage = "url('../img/tentativa02.png')";
            break;
        case 4:
            imagem.style.backgroundImage = "url('../img/tentativa03.png')";
            break;
        case 3:
            imagem.style.backgroundImage = "url('../img/tentativa04.png')";
            break;
        case 2:
            imagem.style.backgroundImage = "url('../img/tentativa05.png')";
            break;
        case 1:
            imagem.style.backgroundImage = "url('../img/tentativa06.png')";
            break;
        case 0:
            imagem.style.backgroundImage = "url('../img/tentativa07.png')";
            break;
        default:
            imagem.style.backgroundImage = "url('../img/tentativa01.png')";
            break;
    }
    imagem.style.backgroundRepeat = "no-repeat";
    imagem.style.backgroundSize = "contain";
    imagem.style.backgroundPosition = "center";
}

function abreModal(titulo, mensagem) {
    let modalTitulo = document.getElementById("exampleModalLabel");
    modalTitulo.innerText = titulo;

    let modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = mensagem;

    $("#myModal").modal({
        show: true
    });
}

let btnReiniciar = document.querySelector("#btnReiniciar");
btnReiniciar.addEventListener("click", function () {
    location.reload();
});
