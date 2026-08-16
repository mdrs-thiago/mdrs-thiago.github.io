#!/usr/bin/env bash
# Sobe o n8n localmente para a quest "Montar um fluxo no n8n" (PI-IA).
# Prioriza Docker (mais isolado); cai para `npx n8n` se Docker não estiver disponível.
# Em ambos os casos, tenta importar automaticamente example-workflow.json.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKFLOW_FILE="$SCRIPT_DIR/example-workflow.json"
DATA_DIR="$SCRIPT_DIR/.n8n-data"

echo "== PI-IA: subindo n8n localmente =="
echo ""

if command -v docker &> /dev/null; then
    echo "Docker encontrado — subindo n8n via Docker."
    mkdir -p "$DATA_DIR"

    docker rm -f pi-ia-n8n &> /dev/null || true
    docker run -d \
        --name pi-ia-n8n \
        -p 5678:5678 \
        -v "$DATA_DIR:/home/node/.n8n" \
        -v "$SCRIPT_DIR:/workflows" \
        docker.n8n.io/n8nio/n8n:latest

    echo "Aguardando o n8n iniciar..."
    sleep 8

    echo "Importando workflow de exemplo..."
    docker exec pi-ia-n8n n8n import:workflow --input=/workflows/example-workflow.json \
        || echo "Aviso: não deu para importar automaticamente — importe pela interface (Import from File)."

    echo ""
    echo "n8n rodando em http://localhost:5678"
    echo "Para parar: docker stop pi-ia-n8n"

elif command -v npx &> /dev/null; then
    echo "Docker não encontrado. Usando npx n8n (requer Node.js 18+)."
    mkdir -p "$DATA_DIR"
    export N8N_USER_FOLDER="$DATA_DIR"

    npx n8n import:workflow --input="$WORKFLOW_FILE" \
        || echo "Aviso: não deu para importar automaticamente — importe pela interface (Import from File)."

    echo ""
    echo "Subindo n8n em http://localhost:5678 (Ctrl+C para parar)"
    npx n8n start

else
    echo "Não encontrei Docker nem Node.js/npx neste computador."
    echo "Instale um dos dois antes de continuar:"
    echo "  Docker:  https://docs.docker.com/get-docker/"
    echo "  Node.js: https://nodejs.org/ (inclui npx)"
    exit 1
fi
