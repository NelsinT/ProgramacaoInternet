let lista = [];

if (localStorage.lista != undefined)
    lista = JSON.parse(localStorage.lista);

function atualizarVisualizacao() {
    const div = document.getElementById('listaVisual');
    div.innerHTML = 'Itens:<br>';

lista.forEach((item, i) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';

    const adquiridoTexto = item.adquirido ? '✅ Adquirido' : '❌ Não adquirido';
    const dataTexto = new Date(item.data).toLocaleString();

    itemDiv.innerHTML = `
        ${i + 1}. ${item.nomedoitem}<br>
        ${item.imagem ? `<img src="${item.imagem}" alt="${item.nomedoitem}" style="max-width:100px;"><br>` : ''}
        ${adquiridoTexto}<br>
    `;


    // Botão de detalhes
    const botaoDetalhes = document.createElement('button');
    botaoDetalhes.textContent = 'Detalhes';
    botaoDetalhes.onclick = function () {
        alert(`DETALHES DO ITEM:\n\n` +
            `Nome: ${item.nomedoitem}\n` +
            `Quantidade: ${item.quantidade}\n` +
            `Descrição: ${item.descricao}\n` +
            `Imagem: ${item.imagem || 'Sem imagem'}\n` +
            `Status: ${item.adquirido ? 'Adquirido' : 'Não adquirido'}\n` +
            `Data de inserção: ${dataTexto}`);
    };

    const botaoToggle = document.createElement('button');
    botaoToggle.textContent = 'Alternar aquisição';
    botaoToggle.onclick = function () {
        if (confirm(`Tens certeza que que queres alterar o estado do "${item.nomedoitem}" da lista?`)) {
            lista[i].adquirido = !lista[i].adquirido;
            localStorage.setItem('lista', JSON.stringify(lista));
            atualizarVisualizacao();
        }

    };

    // Botão de remover
    const botaoRemover = document.createElement('button');
    botaoRemover.textContent = 'Remover';
    botaoRemover.onclick = function () {
        if (confirm(`Tens certeza que quer remover "${item.nomedoitem}" da lista?`)) {
            removerItem(i);
        }
    };

    itemDiv.appendChild(botaoDetalhes);
    itemDiv.appendChild(botaoToggle);
    itemDiv.appendChild(botaoRemover);
    div.appendChild(itemDiv);
});

}

function removerItem(index) {
    lista.splice(index, 1);
    localStorage.setItem('lista', JSON.stringify(lista));
    atualizarVisualizacao();
}

document.getElementById('adicionar').onclick = function () {
    const produto = {
        nomedoitem: document.getElementById('nomedoitem').value.trim(),
        quantidade: document.getElementById('quantidade').value.trim(),
        descricao: document.getElementById('descricao').value.trim(),
        imagem: document.getElementById('imagem').value.trim(),
        adquirido: document.getElementById('adquirido').checked,
        data: new Date().toISOString()
    };

    if (produto.nomedoitem && produto.quantidade && produto.descricao) {
        lista.push(produto);
        localStorage.setItem('lista', JSON.stringify(lista));
        atualizarVisualizacao();

        // quando clicas no adicionar e for valido da clear a todos os campos que estavam preenchidos
        document.getElementById('nomedoitem').value = '';
        document.getElementById('quantidade').value = '';
        document.getElementById('descricao').value = '';
        document.getElementById('imagem').value = '';
        document.getElementById('adquirido').checked = false;
    } else {
        alert("Por favor, preencha os campos obrigatórios");
    }
}

atualizarVisualizacao();
