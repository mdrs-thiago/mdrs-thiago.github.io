# Quest: Montar um fluxo no n8n (PI-IA)

Sobe um n8n local pré-carregado com um fluxo de exemplo (Webhook → chama um LLM local → responde),
para você editar em vez de partir de uma tela em branco.

## Pré-requisitos

- Docker **ou** Node.js 18+ (o script usa o que encontrar primeiro).
- Um LLM rodando localmente (ex.: [Ollama](https://ollama.com)) — o workflow de exemplo assume
  Ollama em `http://localhost:11434` com o modelo `llama3.2` (`ollama pull llama3.2`). Se você
  rodou a quest "Rodar uma LLM local" com outra ferramenta, ajuste a URL/modelo no node
  "Chamar LLM Local" depois de abrir o n8n.

## Como rodar

```bash
./setup.sh
```

Depois abra `http://localhost:5678` no navegador. O workflow "PI-IA: Webhook -> LLM local (Ollama)
-> Resposta" já deve aparecer importado — edite-o à vontade para a sua automação.

## Parar

- Se subiu via Docker: `docker stop pi-ia-n8n`
- Se subiu via `npx n8n`: `Ctrl+C` no terminal onde rodou o script.
