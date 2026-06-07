// Gerenciador de Tarefas
function adicionarTarefa() {
  const input = document.getElementById("novaTarefa");
  const tarefaTexto = input.value.trim();

  if (tarefaTexto === "") {
    alert("Por favor, digite uma tarefa!");
    return;
  }

  const lista = document.getElementById("listaTarefas");
  const tarefaDiv = document.createElement("div");
  tarefaDiv.className = "tarefa-item";

  tarefaDiv.innerHTML = `
    <div class="tarefa-conteudo">
      <span class="tarefa-texto">${tarefaTexto}</span>
    </div>
    <div class="tarefa-acoes">
      <button class="btn-tarefa-concluir" onclick="toggleConcluir(this)">
        <i class="fas fa-check-circle"></i>
      </button>
      <button class="btn-tarefa-cancelar" onclick="cancelarTarefa(this)">
        <i class="fas fa-times-circle"></i>
      </button>
    </div>
  `;

  lista.appendChild(tarefaDiv);
  input.value = "";
  salvarTarefas();
}

function toggleConcluir(botao) {
  const tarefaItem = botao.closest(".tarefa-item");
  tarefaItem.classList.toggle("concluida");
  salvarTarefas();
}

function cancelarTarefa(botao) {
  const tarefaItem = botao.closest(".tarefa-item");
  tarefaItem.remove();
  salvarTarefas();
}

function limparTarefas() {
  const lista = document.getElementById("listaTarefas");
  if (lista.children.length > 0) {
    if (confirm("Tem certeza que deseja limpar todas as tarefas?")) {
      lista.innerHTML = "";
      salvarTarefas();
    }
  } else {
    alert("Não há tarefas para limpar!");
  }
}

function salvarTarefas() {
  const tarefas = [];
  const itens = document.querySelectorAll(".tarefa-item");
  itens.forEach((item) => {
    tarefas.push({
      texto: item.querySelector(".tarefa-texto").textContent,
      concluida: item.classList.contains("concluida"),
    });
  });
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarTarefas() {
  const tarefasSalvas = localStorage.getItem("tarefas");
  if (tarefasSalvas) {
    const tarefas = JSON.parse(tarefasSalvas);
    const lista = document.getElementById("listaTarefas");
    lista.innerHTML = "";
    tarefas.forEach((tarefa) => {
      const tarefaDiv = document.createElement("div");
      tarefaDiv.className = "tarefa-item";
      if (tarefa.concluida) tarefaDiv.classList.add("concluida");

      tarefaDiv.innerHTML = `
        <div class="tarefa-conteudo">
          <span class="tarefa-texto">${tarefa.texto}</span>
        </div>
        <div class="tarefa-acoes">
          <button class="btn-tarefa-concluir" onclick="toggleConcluir(this)">
            <i class="fas fa-check-circle"></i>
          </button>
          <button class="btn-tarefa-cancelar" onclick="cancelarTarefa(this)">
            <i class="fas fa-times-circle"></i>
          </button>
        </div>
      `;
      lista.appendChild(tarefaDiv);
    });
  }
}

// Carregar tarefas ao iniciar
document.addEventListener("DOMContentLoaded", carregarTarefas);
