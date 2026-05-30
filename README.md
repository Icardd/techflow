# TaskFlow — Sistema de Gerenciamento de Tarefas

Sistema web de gerenciamento de tarefas desenvolvido para a TechFlow Solutions, aplicando metodologia ágil Scrum com quadro Kanban para controle do fluxo de trabalho.

## Objetivo

Oferecer à equipe da startup de logística uma ferramenta para cadastrar, acompanhar e priorizar tarefas operacionais em tempo real.

## Escopo Inicial

- CRUD completo de tarefas (adicionar, listar, editar, excluir)
- Alteração de status por tarefa (aberta, em andamento, finalizada)
- Interface web para uso da equipe
- API REST em Node.js com Express
- Testes automatizados com Jest
- Pipeline de CI com GitHub Actions

## Mudança de Escopo

**Funcionalidade adicionada:** Filtro de tarefas por prioridade.

**Justificativa:** O cliente solicitou a capacidade de visualizar rapidamente apenas as tarefas de alta prioridade, sem percorrer a lista completa. A solução foi adicionar a rota `GET /tarefas/filtrar?prioridade=alta` e um filtro visual na interface.

**Impacto:** Nova rota na API, novo método no GerenciadorTarefas, novo filtro na interface e novo teste automatizado.

## Tecnologias

- Node.js
- Express
- HTML, CSS e JavaScript (frontend)
- Jest
- Supertest
- GitHub Actions

## Estrutura do Projeto

```
taskflow/
├── src/
│   ├── server.js             # Servidor Express
│   ├── rotas.js              # Rotas da API
│   ├── GerenciadorTarefas.js # Lógica de negócio
│   └── Tarefa.js             # Classe de entidade
├── public/
│   └── index.html            # Interface web
├── tests/
│   └── tarefas.test.js       # Testes automatizados
├── docs/                     # Diagramas UML e documentação
├── .github/
│   └── workflows/
│       └── ci.yml            # Pipeline GitHub Actions
└── package.json
```

## Como Executar

**Pré-requisitos:** Node.js 18+ instalado

```bash
# Instalar dependências
npm install

# Iniciar o servidor
npm start

# Rodar os testes
npm test
```

Após iniciar, acesse `http://localhost:3000` no navegador.

## Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /tarefas | Listar todas as tarefas |
| POST | /tarefas | Adicionar nova tarefa |
| GET | /tarefas/:id | Buscar tarefa por ID |
| PUT | /tarefas/:id | Editar tarefa |
| DELETE | /tarefas/:id | Excluir tarefa |
| PATCH | /tarefas/:id/status | Alterar status |
| GET | /tarefas/filtrar?prioridade=alta | Filtrar por prioridade |

## Metodologia

O projeto utiliza **Scrum** com suporte visual do **Kanban**:
- Sprints semanais com backlog definido
- Quadro Kanban no GitHub Projects: To Do, In Progress e Done
- Commits semânticos a cada entrega
- CI automático via GitHub Actions

## Integração Contínua

O pipeline executa os testes automaticamente a cada push nas branches `main` e `dev`, garantindo que nenhuma alteração quebre funcionalidades existentes.
//docs atualizados
