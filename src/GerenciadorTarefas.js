// src/GerenciadorTarefas.js
// Responsável por armazenar e operar sobre as tarefas (sem banco de dados)

const Tarefa = require("./Tarefa");

class GerenciadorTarefas {
  constructor() {
    this.tarefas   = []; // Armazenamento em memória
    this.proximoId = 1;  // Contador de IDs únicos
  }

  /**
   * Adiciona uma nova tarefa
   * @param {string} titulo - Obrigatório
   * @param {string} descricao - Opcional
   * @param {string} prioridade - 'baixa', 'media' ou 'alta'
   * @returns {Tarefa} Tarefa criada
   */
  adicionar(titulo, descricao, prioridade) {
    if (!titulo || titulo.trim() === "") {
      throw new Error("O título da tarefa é obrigatório.");
    }
    const tarefa    = new Tarefa(titulo.trim(), descricao, prioridade);
    tarefa.id       = this.proximoId++;
    this.tarefas.push(tarefa);
    return tarefa;
  }

  /**
   * Lista todas as tarefas cadastradas
   * @returns {Tarefa[]}
   */
  listar() {
    return this.tarefas;
  }

  /**
   * Busca uma tarefa pelo ID
   * @param {number} id
   * @returns {Tarefa|null}
   */
  buscarPorId(id) {
    return this.tarefas.find(t => t.id === Number(id)) || null;
  }

  /**
   * Edita uma tarefa existente
   * @param {number} id
   * @param {Object} dados
   * @returns {Tarefa|null}
   */
  editar(id, dados) {
    const tarefa = this.buscarPorId(id);
    if (!tarefa) return null;
    tarefa.editar(dados);
    return tarefa;
  }

  /**
   * Altera o status de uma tarefa
   * @param {number} id
   * @param {string} status - 'aberta', 'em_andamento' ou 'finalizada'
   * @returns {Tarefa|null}
   */
  alterarStatus(id, status) {
    const tarefa = this.buscarPorId(id);
    if (!tarefa) return null;
    tarefa.status = status;
    return tarefa;
  }

  /**
   * Filtra tarefas por prioridade (adicionado na mudança de escopo)
   * @param {string} prioridade
   * @returns {Tarefa[]}
   */
  filtrarPorPrioridade(prioridade) {
    return this.tarefas.filter(t => t.prioridade === prioridade);
  }

  /**
   * Remove uma tarefa pelo ID
   * @param {number} id
   * @returns {boolean}
   */
  excluir(id) {
    const index = this.tarefas.findIndex(t => t.id === Number(id));
    if (index === -1) return false;
    this.tarefas.splice(index, 1);
    return true;
  }

  /**
   * Reseta o estado (usado nos testes)
   */
  resetar() {
    this.tarefas   = [];
    this.proximoId = 1;
  }
}

// Exporta instância única para toda a aplicação
module.exports = new GerenciadorTarefas();
// gerenciador
// filtro prioridade
