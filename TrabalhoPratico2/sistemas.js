var lista_semestres = [];

function abrirPopup() {
    document.getElementById("popup").style.display = "block";
}

function fecharPopup() {
    document.getElementById("popup").style.display = "none";
}

function abrirPopupRemover() {
    document.getElementById("popup-remover").style.display = "block";
}

function fecharPopupRemover() {
    document.getElementById("popup-remover").style.display = "none";
}

document.getElementById("adicionarButao").addEventListener("click", abrirPopup);
document.getElementById("removerButao").addEventListener("click", abrirPopupRemover);
document.getElementById("cancelarAdicaoButao").addEventListener("click", fecharPopup);
document.getElementById("cancelarRemocaoButao").addEventListener("click", fecharPopupRemover);
document.getElementById("fecharPopup-remover").addEventListener("click", removerUnidadeCurricular);
document.getElementById("adicionarUnidadeCurricular").addEventListener("click", adicionarUnidadeCurricular);

function getCurricularesFromHTML() {
    let curriculares = {
        "primeiro_ano": {
            "primeiro_semestre": [],
            "segundo_semestre": []
        },
        "segundo_ano": {
            "primeiro_semestre": [],
            "segundo_semestre": []
        },
        "terceiro_ano": {
            "primeiro_semestre": [],
            "segundo_semestre": []
        }
    };

    document.querySelectorAll('.primeiro_ano ul.primeiro_ano a').forEach(a => curriculares.primeiro_ano.primeiro_semestre.push(a.textContent));
    document.querySelectorAll('.primeiro_ano ul:not(.primeiro_ano) a').forEach(a => curriculares.primeiro_ano.segundo_semestre.push(a.textContent));

    document.querySelectorAll('.segundo_ano ul.segundo_ano a').forEach(a => curriculares.segundo_ano.primeiro_semestre.push(a.textContent));
    document.querySelectorAll('.segundo_ano ul:not(.segundo_ano) a').forEach(a => curriculares.segundo_ano.segundo_semestre.push(a.textContent));

    document.querySelectorAll('.terceiro_ano ul.terceiro_ano a').forEach(a => curriculares.terceiro_ano.primeiro_semestre.push(a.textContent));
    document.querySelectorAll('.terceiro_ano ul:not(.terceiro_ano) a').forEach(a => curriculares.terceiro_ano.segundo_semestre.push(a.textContent));

    return curriculares;
}

function removerUnidadeCurricular() {
    let nome = document.getElementById("texto_nome_remover").value.trim();
    let ano = document.getElementById("texto_ano_remover").value.trim();
    let semestre = document.getElementById("texto_semestre_remover").value.trim();

    if (nome && ano && semestre) {
        let confirmacao = confirm(`Tens mesmo a certeza de que desejas remover a unidade curricular "${nome}"?`);
        if (confirmacao) {
            let unidadesCurriculares = getCurricularesFromHTML();

            if (unidadesCurriculares[ano] && unidadesCurriculares[ano][semestre]) {
                let index = unidadesCurriculares[ano][semestre].indexOf(nome);
                if (index !== -1) {
                    unidadesCurriculares[ano][semestre].splice(index, 1);

                    let listItems = document.querySelectorAll(`.${ano} ul a`);
                    listItems.forEach(item => {
                        if (item.textContent === nome) {
                            item.remove();
                        }
                    });

                    fecharPopupRemover();
                    mostrarMensagem("Unidade curricular removida com sucesso.");
                } else {
                    mostrarMensagem("A unidade curricular especificada não foi encontrada.");
                }
            } else {
                mostrarMensagem("O ano ou semestre especificado não foi encontrado.");
            }
        }
    } else {
        mostrarMensagem("Por favor, preencha todos os campos antes de remover.");
    }
    atualizarInterface();
}



function atualizarInterface() {
    let nome = document.getElementById("texto_nome_remover").value.trim();
    let ano = document.getElementById("texto_ano_remover").value.trim();
    let semestre = document.getElementById("texto_semestre_remover").value.trim();

    let selector = `.${ano} .${semestre} a`;
    let unidadesHTML = document.querySelectorAll(selector);

    unidadesHTML.forEach(function (element) {
        if (element.textContent.trim() === nome) {
            element.remove();
        }
    });
}

function adicionarUnidadeCurricular() {
    var nome = document.getElementById("texto_nome").value.trim();
    var ano = document.getElementById("texto_ano").value.trim();
    var semestre = document.getElementById("texto_semestre").value.trim();

    if (nome && ano && semestre) {
        var unidadeCurricular = {
            nome: nome,
            ano: ano,
            semestre: semestre
        };

        var listaSemestres = JSON.parse(localStorage.getItem("lista_semestres")) || [];
        listaSemestres.push(unidadeCurricular);
        localStorage.setItem("lista_semestres", JSON.stringify(listaSemestres));

        var semestreElement = document.querySelector(`.${ano} .${semestre} ul`);
        if (semestreElement) {
            var novaUnidade = document.createElement("a");
            novaUnidade.textContent = nome;
            semestreElement.appendChild(novaUnidade);
        } else {
            mostrarMensagem("Não foi possível encontrar o ano ou semestre especificado no HTML.");
        }

        document.getElementById("texto_nome").value = "";
        document.getElementById("texto_ano").value = "";
        document.getElementById("texto_semestre").value = "";

        mostrarMensagem("Unidade curricular adicionada com sucesso.");


        atribuirEventosUnidadesCurriculares();
    } else {
        mostrarMensagem("Por favor, preencha todos os campos antes de salvar.");
    }
    fecharPopup();
}

function mostrarMensagem(mensagem) {
    let mensagemElemento = document.getElementById("mensagem");

    mensagemElemento.textContent = mensagem;

    mensagemElemento.style.display = "block";

    setTimeout(function () {
        mensagemElemento.style.display = "none";
    }, 3000);
}

function atribuirEventosUnidadesCurriculares() {
    document.querySelectorAll('.primeiro_ano a, .segundo_ano a, .terceiro_ano a').forEach(a => {
        a.addEventListener('click', function () {
            abrirPopupMomentos(this.textContent);
        });
    });
}

function abrirPopupMomentos(nomeUnidadeCurricular) {
    if (document.getElementById("popup-titulo") && document.getElementById("popup-momentos")) {
        document.getElementById("popup-titulo").textContent = nomeUnidadeCurricular;
        document.getElementById("popup-momentos").style.display = "block";
        carregarMomentos(nomeUnidadeCurricular);
        atualizarTempoTotalGasto(nomeUnidadeCurricular);
    } else {
    }
}


function carregarMomentos(nomeUnidadeCurricular) {
    let momentos = JSON.parse(localStorage.getItem(nomeUnidadeCurricular)) || [];
    let lista = document.getElementById("momentos-lista");
    lista.innerHTML = "";
    momentos.forEach((momento, index) => {
        let li = document.createElement("li");
        li.className = "momento-item";
        li.textContent = `${momento.nomeAvaliacao}: ${momento.data} - ${momento.horaInicio} (${momento.duracao} minutos)`;
        let botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";
        botaoRemover.onclick = () => removerMomento(nomeUnidadeCurricular, index);
        li.appendChild(botaoRemover);
        lista.appendChild(li);
    });
    atualizarTempoTotalGasto(nomeUnidadeCurricular);
}

function removerMomento(nomeUnidadeCurricular, index) {
    let momentos = JSON.parse(localStorage.getItem(nomeUnidadeCurricular)) || [];  
    let confirmacao = confirm("Tens mesmo a certeza de que desejas remover este momento?");
    if (confirmacao) {
        momentos.splice(index, 1);
        localStorage.setItem(nomeUnidadeCurricular, JSON.stringify(momentos));
        carregarMomentos(nomeUnidadeCurricular);
        atualizarTempoTotalGasto(nomeUnidadeCurricular);
    }
}

document.getElementById("fecharPopupMomentos").addEventListener("click", fecharPopupMomentos);
document.getElementById("adicionar-momento-botao").addEventListener("click", abrirPopupAdicionarMomento);
document.getElementById("cancelarAdicionarMomento").addEventListener("click", fecharPopupAdicionarMomento);
document.getElementById("salvarMomento").addEventListener("click", adicionarMomento);

document.querySelectorAll('.primeiro_ano a, .segundo_ano a, .terceiro_ano a').forEach(a => {
    a.addEventListener('click', function () {
        abrirPopupMomentos(this.textContent);
    });
});

function mostrarMensagem(mensagem) {
    let mensagemElemento = document.getElementById("mensagem");
    mensagemElemento.textContent = mensagem;
    mensagemElemento.style.display = "block";
    setTimeout(function () {
        mensagemElemento.style.display = "none";
    }, 3000);
}

function atualizarTempoTotalGasto(nomeUnidadeCurricular) {
    let momentos = JSON.parse(localStorage.getItem(nomeUnidadeCurricular)) || [];
    let tempoTotal = 0;

    momentos.forEach(momento => {
        tempoTotal += parseInt(momento.duracao); 
    });

    let horas = Math.floor(tempoTotal / 60);
    let minutos = tempoTotal % 60;

}

function fecharPopupMomentos() {
    document.getElementById("popup-momentos").style.display = "none";
}

function abrirPopupAdicionarMomento() {
    document.getElementById("popup-adicionar-momento").style.display = "block";
}

function fecharPopupAdicionarMomento() {
    document.getElementById("popup-adicionar-momento").style.display = "none";
}

function adicionarMomento() {
    let nomeUnidadeCurricular = document.getElementById("popup-titulo").textContent;
    let nomeAvaliacao = document.getElementById("nome-avaliacao").value.trim();
    let data = document.getElementById("data-momento").value;
    let horaInicio = document.getElementById("hora-inicio-momento").value;
    let duracao = parseInt(document.getElementById("duracao-momento").value);

    if (nomeAvaliacao && data && horaInicio && duracao) {
        let momento = { nomeAvaliacao, data, horaInicio, duracao };
        let momentos = JSON.parse(localStorage.getItem(nomeUnidadeCurricular)) || [];
        momentos.push(momento);
        localStorage.setItem(nomeUnidadeCurricular, JSON.stringify(momentos));
        carregarMomentos(nomeUnidadeCurricular);
        fecharPopupAdicionarMomento();
    } else {
        mostrarMensagem("Por favor, preencha todos os campos antes de salvar.");
    }

    atualizarTempoTotalGasto(nomeUnidadeCurricular);
}

atribuirEventosUnidadesCurriculares();
