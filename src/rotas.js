// src/rotas.js
// Define todas as rotas HTTP da API REST

const express    = require("express");
const router     = express.Router();
const gerenciador = require("./GerenciadorTarefas");

// POST /tarefas — Criar nova tarefa
router.post("/", (req, res) => {
  try {
    const { titulo, descricao, prioridade } = req.body;
    const tarefa = gerenciador.adicionar(titulo, descricao, prioridade);
    return res.status(201).json({ ok: true, tarefa });
  } catch (erro) {
    return res.status(400).json({ ok: false, mensagem: erro.message });
  }
});

// GET /tarefas — Listar todas
router.get("/", (req, res) => {
  const lista = gerenciador.listar();
  return res.status(200).json({ ok: true, tarefas: lista, total: lista.length });
});

// GET /tarefas/filtrar?prioridade=alta — Filtrar por prioridade (mudança de escopo)
router.get("/filtrar", (req, res) => {
  const { prioridade } = req.query;
  if (!prioridade) {
    return res.status(400).json({ ok: false, mensagem: "Informe o parâmetro 'prioridade'." });
  }
  const resultado = gerenciador.filtrarPorPrioridade(prioridade);
  return res.status(200).json({ ok: true, tarefas: resultado, total: resultado.length });
});

// GET /tarefas/:id — Buscar por ID
router.get("/:id", (req, res) => {
  const tarefa = gerenciador.buscarPorId(req.params.id);
  if (!tarefa) {
    return res.status(404).json({ ok: false, mensagem: "Tarefa não encontrada." });
  }
  return res.status(200).json({ ok: true, tarefa });
});

// PUT /tarefas/:id — Editar tarefa
router.put("/:id", (req, res) => {
  const tarefa = gerenciador.editar(req.params.id, req.body);
  if (!tarefa) {
    return res.status(404).json({ ok: false, mensagem: "Tarefa não encontrada." });
  }
  return res.status(200).json({ ok: true, tarefa });
});

// PATCH /tarefas/:id/status — Alterar status
router.patch("/:id/status", (req, res) => {
  const { status } = req.body;
  const tarefa = gerenciador.alterarStatus(req.params.id, status);
  if (!tarefa) {
    return res.status(404).json({ ok: false, mensagem: "Tarefa não encontrada." });
  }
  return res.status(200).json({ ok: true, tarefa });
});

// DELETE /tarefas/:id — Excluir tarefa
router.delete("/:id", (req, res) => {
  const removida = gerenciador.excluir(req.params.id);
  if (!removida) {
    return res.status(404).json({ ok: false, mensagem: "Tarefa não encontrada." });
  }
  return res.status(200).json({ ok: true, mensagem: "Tarefa excluída com sucesso." });
});

module.exports = router;
