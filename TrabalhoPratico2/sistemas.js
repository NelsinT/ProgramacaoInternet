var unidadeCurricular = {
    nome: "",
    ano: 0,
    semestre: "",
};

var avaliacao = {
    nome: "",
};
document.getElementById("adicionarButao").addEventListener("click", function(evt){
    // Cria um novo objeto para a nova unidade curricular
    let novaEntrada = {
        nome: document.getElementById("texto_nome").value,
        ano: document.getElementById("texto_ano").value,
        semestre: document.getElementById("texto_semestre").value
    };

    // Adiciona a nova unidade curricular à lista
    lista_semestres.push(novaEntrada);

    // Atualiza os dados salvos
    guardarDados();
});

// Event listener para remover uma unidade curricular quando o botão "Remover" é clicado
document.getElementById("removerButao").addEventListener("click", function(evt){
    // Verifica se há alguma unidade curricular selecionada
    let unidadesSelecionadas = document.querySelectorAll('.semestres-content a.selected');

    // Se houver pelo menos uma unidade curricular selecionada
    if (unidadesSelecionadas.length > 0) {
        // Remove cada unidade curricular selecionada da lista
        unidadesSelecionadas.forEach(function(unidade) {
            let nomeUnidade = unidade.textContent.trim(); // Obtém o nome da unidade curricular
            // Encontra o índice da unidade curricular na lista
            let index = lista_semestres.findIndex(function(elem) {
                return elem.nome === nomeUnidade;
            });

            // Se a unidade curricular estiver na lista, remova-a
            if (index !== -1) {
                lista_semestres.splice(index, 1);
            }
        });

        // Após remover, atualiza os dados salvos
        guardarDados();

        // Exibe a mensagem de remoção bem-sucedida
        mostrarMensagem("Unidades curriculares removidas com sucesso.");
    } else {
        // Caso nenhuma unidade curricular esteja selecionada, exibe uma mensagem na tela
        mostrarMensagem("Nenhuma unidade curricular selecionada para remover.");
    }
});

// Função para salvar os dados da lista de unidades curriculares no armazenamento local
function guardarDados(){
    localStorage.setItem("lista_semestres", JSON.stringify(lista_semestres));
    // Atualiza a visualização dos dados
    mostrarDados();
}

// Função para exibir os dados da lista de unidades curriculares
function mostrarDados(){
    lista_semestres = JSON.parse(localStorage.getItem("lista_semestres")) ?? [];
    
    var tabela_users = document.getElementById('tabela_users');
    tabela_users.innerHTML = "";
    // Aqui você pode implementar a lógica para mostrar os dados na tabela ou em outra forma desejada
}

// Função para mostrar uma mensagem na tela
function mostrarMensagem(mensagem) {
    // Obtém o elemento de mensagem
    let mensagemElemento = document.getElementById("mensagem");

    // Define o texto da mensagem
    mensagemElemento.textContent = mensagem;

    // Exibe o elemento de mensagem
    mensagemElemento.style.display = "block";

    // Oculta a mensagem após alguns segundos
    setTimeout(function() {
        mensagemElemento.style.display = "none";
    }, 3000); // 3000 milissegundos = 3 segundos
}

// Adiciona este código ao seu JavaScript existente

// Função para abrir a pop-up
function abrirPopup() {
    document.getElementById("popup").style.display = "block";
}

// Função para fechar a pop-up
function fecharPopup() {
    document.getElementById("popup").style.display = "none";
}

// Função para adicionar uma unidade curricular
function adicionarUnidadeCurricular() {
    let novaEntrada = {
        nome: document.getElementById("texto_nome").value,
        ano: document.getElementById("texto_ano").value,
        semestre: document.getElementById("texto_semestre").value
    };

    // Adicione o código para adicionar novaEntrada à sua lista de unidades curriculares

    // Após adicionar, feche a pop-up
    fecharPopup();
}

document.getElementById("adicionarButao").addEventListener("click", abrirPopup);

document.getElementById("removerButao").addEventListener("click", fecharPopup);
