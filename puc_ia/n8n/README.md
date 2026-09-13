# Quest: Montar um fluxo no n8n (PI-IA)

Sobe um n8n local já com três workflows prontos para você abrir, rodar e editar — em vez de
encarar uma tela em branco.

| Arquivo | O que faz |
| --- | --- |
| `01-webhook-llm-resposta.json` | Webhook → chama o LLM local → devolve a resposta. É o "olá mundo" do agente como API. |
| `02-triagem-llm-if.json` | O LLM classifica uma mensagem, um nó Code lê o JSON e um IF manda cada caso para um caminho. |
| `03-agente-com-ferramentas.json` | O nó AI Agent com modelo, memória e uma ferramenta (Calculadora), conversando pelo chat embutido. |

## Pré-requisitos

- Docker **ou** Node.js 18+ (o script usa o que encontrar primeiro).
- Um LLM rodando localmente (ex.: [Ollama](https://ollama.com)). Os workflows assumem Ollama em
  `http://localhost:11434` com o modelo `llama3.2` (`ollama pull llama3.2`). Se você baixou outro
  modelo, troque o nome dentro do nó — é um campo de texto.

## Como rodar

```bash
./setup.sh
```

Depois abra `http://localhost:5678`. Na primeira vez o n8n pede para criar uma conta de dono;
é uma conta local, na sua máquina, e serve só para destravar o editor.

## Testando o fluxo 01

Com o workflow aberto, clique em **Execute workflow** e, em outro terminal:

```bash
curl -X POST http://localhost:5678/webhook-test/pi-ia-agente \
  -H "Content-Type: application/json" \
  -d '{"pergunta": "Em duas frases: o que é um agente de IA?"}'
```

O `-test` na URL só existe enquanto o fluxo está em modo de teste. Depois de publicá-lo, o
endereço passa a ser `/webhook/pi-ia-agente`.

## Para o fluxo 03 (AI Agent)

O nó do modelo precisa de uma credencial. Abra **Modelo (Ollama)**, clique em *Create new
credential* e informe `http://localhost:11434` — nada de chave de API, é tudo local.

## Entregando a quest

No editor, menu `⋯` → **Download** exporta o workflow em JSON. É esse arquivo que você envia.

## Quando trava

- **`ECONNREFUSED 127.0.0.1:11434` com n8n no Docker:** dentro do contêiner, `localhost` é o próprio
  contêiner. Troque a URL do nó para `http://host.docker.internal:11434/api/generate` (o `setup.sh`
  já deixa esse endereço disponível).
- **Webhook devolve 404:** você está chamando `/webhook/` com o fluxo ainda em modo de teste. Use
  `/webhook-test/`, ou publique o workflow.
- **A expressão aparece literalmente na saída:** o campo está em modo *Fixed*. Troque para
  *Expression* no botãozinho ao lado do campo.

## Parar

- Docker: `docker stop pi-ia-n8n`
- `npx n8n`: `Ctrl+C` no terminal onde rodou o script.
