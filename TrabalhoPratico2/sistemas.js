var lista_semestres = [];

var unidadesCurriculares = {
    "primeiro_ano": {
        "primeiro_semestre": ["Álgebra Linear e Geometria Analítica", "Fundamentos de Programação", "Interação com o Utilizador", "Matemática I", "Sistemas Digitais"],
        "segundo_semestre": ["Circuitos Eletrónicos", "Estruturas de Dados", "Matemática II", "Programação para a Internet I", "Tecnologias e Arquitetura de Computadores"]
    },
    "segundo_ano": {
        "primeiro_semestre": ["Programação para a Internet II", "Estatistica", "Bases de Dados", "Multimédia e CG", "Programação"],
        "segundo_semestre": ["Bases de Dados II", "Programação Aplicada", "Engenharia de Software", "Redes de Computadores I", "Sistemas Operativos"]
    },
    "terceiro_ano": {
        "primeiro_semestre": ["Gestão de Projeto", "Redes de Computadores II", "Introdução á Inteligência Artificial", "Tecnologias e Aplicações Móveis", "Laboratório de Programação"],
        "segundo_semestre": ["Sistemas de Informação", "Sistemas Distribuídos", "Gestão de Sistemas e Redes"]
    }
};


document.addEventListener("DOMContentLoaded", function() {
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

    function removerUnidadeCurricular() {
        let nome = document.getElementById("texto_nome_remover").value.trim();
        let ano = document.getElementById("texto_ano_remover").value.trim();
        let semestre = document.getElementById("texto_semestre_remover").value.trim();
    
        if (nome && ano && semestre) {
            if (unidadesCurriculares[ano] && unidadesCurriculares[ano][semestre]) {
                let index = unidadesCurriculares[ano][semestre].indexOf(nome);
                if (index !== -1) {
                    unidadesCurriculares[ano][semestre].splice(index, 1);
                    
                    fecharPopupRemover();
                    mostrarMensagem("Unidade curricular removida com sucesso.");
                } else {
                    mostrarMensagem("A unidade curricular especificada não foi encontrada.");
                }
            } else {
                mostrarMensagem("O ano ou semestre especificado não foi encontrado.");
            }
        } else {
            mostrarMensagem("Por favor, preencha todos os campos antes de remover.");
        }
        atualizarInterface()
    }
    
    function atualizarInterface() {
        let nome = document.getElementById("texto_nome_remover").value.trim();
        let ano = document.getElementById("texto_ano_remover").value.trim();
        let semestre = document.getElementById("texto_semestre_remover").value.trim();
    
        // Construir o seletor com base no ano e semestre
        let selector = `.primeiroano .${semestre} a`; // Ajustado para refletir a estrutura do HTML
        let unidadesHTML = document.querySelectorAll(selector);
    
        // Iterar sobre os elementos encontrados e remover aquele com o texto correspondente
        unidadesHTML.forEach(function(element) {
            if (element.textContent.trim() === nome) {
                element.remove();
            }
        });
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
function adicionarUnidadeCurricular() {
    var nome = document.getElementById("texto_nome").value;
    var ano = document.getElementById("texto_ano").value;
    var semestre = document.getElementById("texto_semestre").value;

    if (nome && ano && semestre) {
        var unidadeCurricular = {
            nome: nome,
            ano: ano,
            semestre: semestre
        };
        var listaSemestres = JSON.parse(localStorage.getItem("lista_semestres")) || [];
        listaSemestres.push(unidadeCurricular);
        localStorage.setItem("lista_semestres", JSON.stringify(listaSemestres));
        document.getElementById("texto_nome").value = "";
        document.getElementById("texto_ano").value = "";
        document.getElementById("texto_semestre").value = "";
        mostrarMensagem("Unidade curricular adicionada com sucesso.");
    } else {
        mostrarMensagem("Por favor, preencha todos os campos antes de salvar.");
    }
    fecharPopup();

}

    function mostrarMensagem(mensagem) {
        let mensagemElemento = document.getElementById("mensagem");

        mensagemElemento.textContent = mensagem;

        mensagemElemento.style.display = "block";

        setTimeout(function() {
            mensagemElemento.style.display = "none";
        }, 3000);
    }

    function mostrarDados() {
        lista_semestres = JSON.parse(localStorage.getItem("lista_semestres")) ?? [];

        var tabela_users = document.getElementById('tabela_users');
        tabela_users.innerHTML = "";
    }
});
