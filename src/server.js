// src/server.js
// Ponto de entrada da aplicação TaskFlow

const express = require("express");
const path    = require("path");
const rotas   = require("./rotas");

const app  = express();
const PORT = process.env.PORT || 3000;

// Interpreta JSON nas requisições
app.use(express.json());

// Serve os arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, "../public")));

// Registra as rotas da API
app.use("/tarefas", rotas);

// Rota de status da API
app.get("/api", (req, res) => {
  res.json({
    sistema: "TaskFlow — Sistema de Gerenciamento de Tarefas",
    versao: "1.0.0",
    rotas: {
      "GET    /tarefas":                    "Listar todas as tarefas",
      "POST   /tarefas":                    "Criar nova tarefa",
      "GET    /tarefas/:id":                "Buscar tarefa por ID",
      "PUT    /tarefas/:id":                "Editar tarefa",
      "DELETE /tarefas/:id":                "Excluir tarefa",
      "PATCH  /tarefas/:id/status":         "Alterar status",
      "GET    /tarefas/filtrar?prioridade":  "Filtrar por prioridade",
    },
  });
});

// Inicia o servidor apenas fora do ambiente de teste
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`TaskFlow rodando em http://localhost:${PORT}`);
  });
}

module.exports = app;
// servidor
