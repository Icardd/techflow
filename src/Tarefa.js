// src/Tarefa.js
// Classe que representa uma tarefa no sistema AgileBoard

class Tarefa {
  /**
   * Cria uma nova instância de Tarefa
   * @param {string} titulo - Título obrigatório
   * @param {string} descricao - Descrição da tarefa
   * @param {string} prioridade - 'baixa', 'media' ou 'alta'
   */
  constructor(titulo, descricao, prioridade) {
    this.id        = null;       // Preenchido pelo GerenciadorTarefas
    this.titulo    = titulo;
    this.descricao = descricao || "";
    this.prioridade = prioridade || "media";
    this.status    = "aberta";   // Status inicial padrão
  }

  /**
   * Atualiza os campos da tarefa com os dados fornecidos
   * @param {Object} dados - Campos a serem atualizados
   */
  editar(dados) {
    if (dados.titulo)              this.titulo    = dados.titulo;
    if (dados.descricao !== undefined) this.descricao = dados.descricao;
    if (dados.prioridade)          this.prioridade = dados.prioridade;
    if (dados.status)              this.status    = dados.status;
  }
}

module.exports = Tarefa;
