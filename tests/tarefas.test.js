// tests/tarefas.test.js
// Testes automatizados do TaskFlow — Jest + Supertest

const request     = require("supertest");
const app         = require("../src/server");
const gerenciador = require("../src/GerenciadorTarefas");

// Reseta o estado antes de cada teste
beforeEach(() => {
  gerenciador.resetar();
});

// ─────────────────────────────────────────────
// POST /tarefas — Criar tarefa
// ─────────────────────────────────────────────
describe("POST /tarefas", () => {
  test("deve criar uma tarefa com dados válidos", async () => {
    const res = await request(app).post("/tarefas").send({
      titulo: "Mapear rotas de entrega",
      descricao: "Definir pontos de coleta",
      prioridade: "alta",
    });
    expect(res.status).toBe(201);
    expect(res.body.ok).toBe(true);
    expect(res.body.tarefa.titulo).toBe("Mapear rotas de entrega");
    expect(res.body.tarefa.status).toBe("aberta");
  });

  test("deve retornar erro 400 sem título", async () => {
    const res = await request(app).post("/tarefas").send({ descricao: "Sem título" });
    expect(res.status).toBe(400);
    expect(res.body.ok).toBe(false);
  });

  test("deve usar prioridade 'media' por padrão", async () => {
    const res = await request(app).post("/tarefas").send({ titulo: "Tarefa padrão" });
    expect(res.status).toBe(201);
    expect(res.body.tarefa.prioridade).toBe("media");
  });
});

// ─────────────────────────────────────────────
// GET /tarefas — Listar
// ─────────────────────────────────────────────
describe("GET /tarefas", () => {
  test("deve retornar lista vazia inicialmente", async () => {
    const res = await request(app).get("/tarefas");
    expect(res.status).toBe(200);
    expect(res.body.tarefas).toEqual([]);
    expect(res.body.total).toBe(0);
  });

  test("deve listar todas as tarefas criadas", async () => {
    await request(app).post("/tarefas").send({ titulo: "Tarefa A" });
    await request(app).post("/tarefas").send({ titulo: "Tarefa B" });
    const res = await request(app).get("/tarefas");
    expect(res.status).toBe(200);
    expect(res.body.total).toBe(2);
  });
});

// ─────────────────────────────────────────────
// GET /tarefas/:id — Buscar por ID
// ─────────────────────────────────────────────
describe("GET /tarefas/:id", () => {
  test("deve retornar a tarefa correta pelo ID", async () => {
    const criada = await request(app).post("/tarefas").send({ titulo: "Verificar estoque" });
    const id = criada.body.tarefa.id;
    const res = await request(app).get(`/tarefas/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.tarefa.titulo).toBe("Verificar estoque");
  });

  test("deve retornar 404 para ID inexistente", async () => {
    const res = await request(app).get("/tarefas/999");
    expect(res.status).toBe(404);
  });
});

// ─────────────────────────────────────────────
// PUT /tarefas/:id — Editar
// ─────────────────────────────────────────────
describe("PUT /tarefas/:id", () => {
  test("deve editar os dados da tarefa", async () => {
    const criada = await request(app).post("/tarefas").send({ titulo: "Original" });
    const id = criada.body.tarefa.id;
    const res = await request(app).put(`/tarefas/${id}`).send({ titulo: "Editada", prioridade: "alta" });
    expect(res.status).toBe(200);
    expect(res.body.tarefa.titulo).toBe("Editada");
    expect(res.body.tarefa.prioridade).toBe("alta");
  });

  test("deve retornar 404 ao editar ID inexistente", async () => {
    const res = await request(app).put("/tarefas/999").send({ titulo: "X" });
    expect(res.status).toBe(404);
  });
});

// ─────────────────────────────────────────────
// PATCH /tarefas/:id/status — Alterar status
// ─────────────────────────────────────────────
describe("PATCH /tarefas/:id/status", () => {
  test("deve alterar o status da tarefa", async () => {
    const criada = await request(app).post("/tarefas").send({ titulo: "Teste status" });
    const id = criada.body.tarefa.id;
    const res = await request(app).patch(`/tarefas/${id}/status`).send({ status: "em_andamento" });
    expect(res.status).toBe(200);
    expect(res.body.tarefa.status).toBe("em_andamento");
  });
});

// ─────────────────────────────────────────────
// GET /tarefas/filtrar — Filtrar por prioridade
// ─────────────────────────────────────────────
describe("GET /tarefas/filtrar", () => {
  test("deve filtrar tarefas por prioridade alta", async () => {
    await request(app).post("/tarefas").send({ titulo: "Urgente",   prioridade: "alta" });
    await request(app).post("/tarefas").send({ titulo: "Normal",    prioridade: "media" });
    await request(app).post("/tarefas").send({ titulo: "Urgente 2", prioridade: "alta" });
    const res = await request(app).get("/tarefas/filtrar?prioridade=alta");
    expect(res.status).toBe(200);
    expect(res.body.total).toBe(2);
    res.body.tarefas.forEach(t => expect(t.prioridade).toBe("alta"));
  });

  test("deve retornar 400 sem o parâmetro prioridade", async () => {
    const res = await request(app).get("/tarefas/filtrar");
    expect(res.status).toBe(400);
  });
});

// ─────────────────────────────────────────────
// DELETE /tarefas/:id — Excluir
// ─────────────────────────────────────────────
describe("DELETE /tarefas/:id", () => {
  test("deve excluir uma tarefa existente", async () => {
    const criada = await request(app).post("/tarefas").send({ titulo: "Para excluir" });
    const id = criada.body.tarefa.id;
    const res = await request(app).delete(`/tarefas/${id}`);
    expect(res.status).toBe(200);
    const check = await request(app).get(`/tarefas/${id}`);
    expect(check.status).toBe(404);
  });

  test("deve retornar 404 ao excluir ID inexistente", async () => {
    const res = await request(app).delete("/tarefas/999");
    expect(res.status).toBe(404);
  });
});
