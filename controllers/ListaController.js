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
  const novaTarefa = leiaDadosTarefa();
  minhaLista.addFirst(novaTarefa);
  alert("Inserido!");
  atualizarLista();
}
//------------------------------------------------------------------------------------------------------
function adicionarElementoFinal() {
  const novaTarefa = leiaDadosTarefa();
  minhaLista.addLast(novaTarefa);
  alert("Inserido!");
  atualizarLista();

}
//--------------------------------------------------------------------------------------------
function adicionarIndice() {
  // Use 'minhaLista.head' ou 'minhaLista.inicio' (conforme o nome na sua classe)
  let atual = minhaLista.head; 
  let i = 0;

  while (atual !== null) {
    if (typeof atual.dado === 'object') {
      atual.dado.index = i; 
    }
    atual = atual.proximo; 
    i++;
  }
}
//--------------------------------------------------------------------------------------------
// Função para remover o primeiro elemento da lista
function removerElementoInicio() {
  if (!minhaLista.isEmpty()) {
    const tarefaRealizada = minhaLista.removeFirst();
    mostrarMensagemRemocao(tarefaRealizada);
    atualizarLista();
  }
  else {
    alert("Lista de Tarefas Vazia");
  }

}
//--------------------------------------------------------------------------------------------
// Função para remover o ultimo elemento da lista
function removerElementoFinal() {
   if (!minhaLista.isEmpty()) {
    const tarefaRealizada = minhaLista.removeLast();
    mostrarMensagemRemocao(tarefaRealizada);
    atualizarLista();
  }
  else {
    alert("Lista de Tarefas Vazia");
  }
}

//--------------------------------------------------------------------------------------------
function mostrarMensagemRemocao(tarefaRealizada) {
  const mensagem = document.getElementById("mensagem-remocao");
  mensagem.innerHTML = "Tarefa realizada: " + tarefaRealizada.descricao;
  mensagem.style.display = "block";
}
//-------------------------------------------------------------------------------------------- 
function atualizarLista() {
  const listaTarefas = document.getElementById("list_listadeTarefas");
  const lblTarefas = document.getElementById("lblmostraTarefas");
  
  listaTarefas.innerHTML = ""; 
  
  // Chamamos a função aqui para garantir que os índices estejam certos antes de mostrar
  adicionarIndice(); 

  if (!minhaLista.isEmpty()) {
    lblTarefas.innerHTML = "Lista de Tarefas";
    for (const tarefa of minhaLista) {
      const novaLinha = document.createElement("li");
      // Agora o toString() da tarefa poderá usar o index que acabamos de atualizar
      novaLinha.innerHTML = tarefa.toString(); 
      listaTarefas.appendChild(novaLinha);
    }
  } else {
    lblTarefas.innerHTML = "Lista de Tarefas Vazia";
  }
}
