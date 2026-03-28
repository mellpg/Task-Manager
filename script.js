let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

const listaTarefas = document.getElementById("listaTarefas");
const inputTarefa = document.getElementById("novaTarefa");

function renderizarTarefas() {
  listaTarefas.innerHTML = "";

  tarefas.forEach((tarefa, index) => {
    const divTarefa = document.createElement("div");
    divTarefa.classList.add("tarefa");
    divTarefa.classList.add(tarefa.status);

    divTarefa.innerHTML = `
            <span>${tarefa.texto}</span>
            <button onclick="marcarFeito(${index})">Feito</button>
            <button onclick="cancelarTarefa(${index})">Cancelar</button>
        `;

    listaTarefas.appendChild(divTarefa);
  });
}

function adicionarTarefa() {
  const texto = inputTarefa.value.trim();
  if (texto === "") return;

  tarefas.push({ texto, status: "pendente" });
  salvarTarefas();
  renderizarTarefas();
  inputTarefa.value = "";
}

function marcarFeito(index) {
  tarefas[index].status = "feito";
  salvarTarefas();
  renderizarTarefas();
}

function cancelarTarefa(index) {
  tarefas[index].status = "cancelado";
  salvarTarefas();
  renderizarTarefas();
}

function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function limparTarefas() {
  tarefas = [];
  salvarTarefas();
  renderizarTarefas();
}

renderizarTarefas();
