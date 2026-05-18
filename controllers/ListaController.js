const minhaLista = new LinkedList();
//---------------------------------------------------------------------------------------------
function limpaInputs() {
  document.getElementById("txtnovaTarefa").value = "";
  document.getElementById("txtnovaPrioridade").value = "";
  document.getElementById("txtIndice").value = "";
  document.getElementById("txtnovaTarefa").focus();
}
//--------------------------------------------------------------------------------------------
function leiaDadosTarefa() {
  const descricao = document.getElementById("txtnovaTarefa").value.trim();
  const prioridade = document.getElementById("txtnovaPrioridade").value.trim();
  if (descricao === "" || prioridade === "") {
    alert("Preencha os campos de descrição e prioridade!");
    return null;
  }
  return new Tarefa(descricao, prioridade, obterDataAtual(), obterHoraAtual());
}








//--------------------------------------------------------------------------------------------
function adicionarElementoInicio() {
  const novaTarefa = leiaDadosTarefa;
  // Se a lista estiver vazia ou a prioridade da nova for menor (mais urgente) que a do primeiro elemento atual ele adiciona a nova tarefa na minha lista 
  if (minhaLista.isEmpty() || parseInt(novaTarefa.prioridade) < parseInt(minhaLista.getFirst().prioridade)) {
    minhaLista.addFirst(novaTarefa);
  }
  else {
    let indice = 0;
    // o let inserido começa valendo false por que posteriormente a sera usado para atribuir novos valores 
    let inserido = false;

    // Percorre cada tarefa que já está na lista
    for (const tarefaAtual of minhaLista) {
        // Se a prioridade de quem está na lista for maior (menos urgente) que a da nova
        if (parseInt(tarefaAtual.prioridade) > parseInt(novaTarefa.prioridade)) {
            minhaLista.addAtIndex(novaTarefa, indice); // Insere nessa posição
            inserido = true;
            break; 
        }
        indice++; // Vai para o próximo índice da lista
    }
}
}
//------------------------------------------------------------------------------------------------------








/*------------------------------------------------------------------------------------------------------
function adicionarElementoFinal() {
  const novaTarefa = leiaDadosTarefa();
  minhaLista.addLast(novaTarefa);
  alert("Inserido!");
  atualizarLista();

}
*/




function renumeraIndices() {
  let i = 0;

  // Usamos o iterator padrão da sua lista, que varre os dados com total segurança
  for (const tarefa of minhaLista) {
    if (tarefa && typeof tarefa === 'object') {
      tarefa.index = i; // Atribui o índice sequencial ao objeto da tarefa
    }
    i++;
  }
  // AQUI NÃO PODE TER CHAMADA PARA atualizarLista()!
}








/*
// Função para remover o primeiro elemento da lista
function removerElementoInicio() {
  if (!minhaLista.isEmpty()) {
    const tarefaRealizada = minhaLista.removeFirst();
    
    // Calcula o tempo completo usando a nova função helper
    const tempoNaFila = calcularTempoFila(tarefaRealizada);
    
    mostrarMensagemRemocao(tarefaRealizada, tempoNaFila);
    atualizarLista();
  } else {
    alert("Lista de Tarefas Vazia");
  }
}
function removerElementoFinal() {
  if (!minhaLista.isEmpty()) {
    const tarefaRealizada = minhaLista.removeLast();
    
    // Faz exatamente o mesmo cálculo aqui!
    const tempoNaFila = calcularTempoFila(tarefaRealizada);
    
    mostrarMensagemRemocao(tarefaRealizada, tempoNaFila);
    atualizarLista();
  } else {
    alert("Lista de Tarefas Vazia");
  }
}

*/


function mostrarMensagemRemocao(tarefaRealizada, tempoNaFila) {
  const mensagem = document.getElementById("mensagem-remocao");

  mensagem.innerHTML = `<strong>Tarefa realizada:</strong> ${tarefaRealizada.descricao} <br> <small class="text-muted">${tempoNaFila}</small>`;
  mensagem.style.display = "block";
}





//-------------------------------------------------------------------------------------------- 
function atualizarLista() {
  const listaTarefas = document.getElementById("list_listadeTarefas");
  const lblTarefas = document.getElementById("lblmostraTarefas");

  listaTarefas.innerHTML = "";
  
  // se a lista de tarefas nao estiver vazia começa o laço de repetição 
  if (!minhaLista.isEmpty()) {
    renumeraIndices(); // usado para enumerar as tarefas da lista 
    lblTarefas.innerHTML = "Lista de Tarefas (Clique em uma tarefa para removê-la)";

    // inicio da estrutura condicional para mostrar de maneira organizada as tarefas na lista 
    for (const tarefa of minhaLista) {
      const novaLinha = document.createElement("li");

      novaLinha.id = `tarefa-${tarefa.index}`;
      novaLinha.classList.add(`prioridade-${tarefa.prioridade}`);

      novaLinha.onclick = function () {
        removerPorCliqueNaLinha(tarefa.index);
      };

      novaLinha.style.cursor = "pointer";

      //to string responsavel por mostar na lista os dados de inserção de cada tarefa 
      novaLinha.innerHTML = `<strong>#${tarefa.index + 1}</strong> [P${tarefa.prioridade}] - ${tarefa.descricao} <span class="text-muted fst-italic ms-2">(Criada em: ${tarefa.data} às ${tarefa.hora})</span>`;

      listaTarefas.appendChild(novaLinha);
    }

  } else {
    lblTarefas.innerHTML = "Lista de Tarefas Vazia";
  }
}




// Adicione esta função junto com as suas outras funções complementares
function calcularTempoFila(tarefaRealizada) {
  // 1. Captura data e hora do exato momento da conclusão (Agora)
  const dataConclusaoStr = obterDataAtual();
  const horaConclusaoStr = obterHoraAtual();

  // 2. Converte os momentos de criação e conclusão para objetos Date do JS
  const momentoCriacao = new Date(`${converterDataFormatoISO8601(tarefaRealizada.data)}T${tarefaRealizada.hora}`);
  const momentoConclusao = new Date(`${converterDataFormatoISO8601(dataConclusaoStr)}T${horaConclusaoStr}`);

  // 3. Diferença total em milissegundos
  const diferencaMs = momentoConclusao - momentoCriacao;

  // 4. Constantes de tempo em milissegundos
  const msPorSegundo = 1000;
  const msPorMinuto = msPorSegundo * 60;
  const msPorHora = msPorMinuto * 60;
  const msPorDia = msPorHora * 24;

  // 5. Matemática dos tempos usando o operador de resto (%)
  const dias = Math.floor(diferencaMs / msPorDia);
  const horas = Math.floor((diferencaMs % msPorDia) / msPorHora);
  const minutos = Math.floor((diferencaMs % msPorHora) / msPorMinuto);
  const segundos = Math.floor((diferencaMs % msPorMinuto) / msPorSegundo);

  // 6. Retorna a string formatada com todas as unidades
  return `Tempo na fila: ${dias}d ${horas}h ${minutos}m ${segundos}s.`;
}





// Função para quando o usuário digita o índice na caixa de texto e clica no botão
function removerPorIndiceDigitado() {
  const inputIndice = document.getElementById("txtIndice");

  if (!inputIndice || inputIndice.value.trim() === "") {
    return alert("Por favor, digite o número da tarefa que deseja remover!");
  }

  // Captura o número que o usuário digitou (Ex: 1, 2, 3...)
  const numeroVisual = parseInt(inputIndice.value.trim());

  // AQUI: Convertemos o número do usuário para o índice real do código (Subtraímos 1)
  const indiceReal = numeroVisual - 1;

  // Agora a validação usa o indiceReal
  if (indiceReal < 0 || indiceReal >= minhaLista.length) {
    return alert("Número inválido! Essa tarefa não existe na lista.");
  }

  // Passamos o indiceReal (0, 1, 2...) para o seu método funcionar perfeitamente
  const tarefaRealizada = minhaLista.removeAtIndex(indiceReal);

  if (tarefaRealizada) {
    const tempoNaFila = calcularTempoFila(tarefaRealizada);
    mostrarMensagemRemocao(tarefaRealizada, tempoNaFila);
    atualizarLista();
    limpaInputs();
  }
}

//--------------------------------------------------------------------------------------------
function mostrarProximaTarefa() {
  if (minhaLista.isEmpty()) {
    return alert("Lista de Tarefas Vazia! Não há próxima tarefa.");
  }

  // Pega os dados do primeiro nó (head) usando o método da sua LinkedList
  const proxima = minhaLista.getFirst();

  // Exibe o alerta com as informações completas da tarefa
  alert(`A próxima tarefa a ser executada é:\n\n"${proxima.descricao}"\n[Prioridade: ${proxima.prioridade}]`);
}