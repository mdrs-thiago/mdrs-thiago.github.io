window.portfolioData = {
    "disciplinas": [
        {
            "id": "puc-pi-ia",
            "nome": "Projeto Integrado de Introdução à IA",
            "descricao": "Projetos práticos com IA: LLMs, Agentes, Prompt Engineering e MVPs com impacto social.",
            "icone": "fa-robot",
            "rota": "puc/pi-ia.html",
            "recursos": [
                { "titulo": "Rubrica Sprint 1", "link": "puc/rubricas/sprint-1.html", "icone": "fa-clipboard-check" },
                { "titulo": "Rubrica Sprint 2", "link": "puc/rubricas/sprint-2.html", "icone": "fa-clipboard-list" }
            ],
            "cronograma_link": "https://docs.google.com/spreadsheets/d/1Njc9_jsPZ5YPB5FR3fnJ4fekevkRKv7jmdf6YG6Iegc/edit?usp=sharing",
            "cronograma": [
                { "data": "Semana 1", "topico": "O que é IA? (Modelagem & Aprendizado)", "tipo": "aula" },
                { "data": "Semana 2", "topico": "LLMs: Modelagem Probabilística", "tipo": "aula" },
                { "data": "Semana 3", "topico": "Agentes (ReAct) e Automação (n8n)", "tipo": "aula" },
                { "data": "Semana 4", "topico": "Workshop de Ideação do MVP", "tipo": "aula" },
                { "data": "Semana 5", "topico": "Colaboração e Versionamento (Git)", "tipo": "aula" },
                { "data": "Semana 7", "topico": "Sprint 1: Protótipo Inicial", "tipo": "entrega" },
                { "data": "Semana 10", "topico": "Sprint 2: Evolução", "tipo": "entrega" },
                { "data": "Semana 14", "topico": "Apresentação Final", "tipo": "prova" }
            ],
            "aulas": [
                {
                    "titulo": "Aula 01: O que é IA? (Desmistificando)",
                    "link": "puc_ia/slides/aula01.html",
                    "resumo": "IA como modelagem matemática (funções, otimização) e o conceito de Aprendizado (Generalização vs Memorização). Estado da arte e responsabilidade social."
                },
                {
                    "titulo": "Aula 02: LLMs - O Cérebro Probabilístico",
                    "link": "puc_ia/slides/aula02.html",
                    "resumo": "Modelagem probabilística da linguagem (Next Token Prediction), limitações matemáticas (alucinações) e Engenharia de Prompt Avançada."
                },
                {
                    "titulo": "Aula 03: Agentes e Automação (n8n)",
                    "link": "puc_ia/slides/aula03.html",
                    "resumo": "Arquiteturas Cognitivas (ReAct), Agentes Autônomos e prática com ferramentas Low-code (n8n) para construção de MVPs."
                },
                {
                    "titulo": "Aula 04: Ideação de Soluções",
                    "link": "puc_ia/slides/aula04.html",
                    "resumo": "Design de solução e definição de escopo para o MVP do projeto integrado. AI Canvas (Prediction, Judgment, Action)."
                },
                {
                    "titulo": "Aula 05: Colaboração com Git",
                    "link": "puc_ia/slides/aula05.html",
                    "resumo": "Versionamento de código/prompts e fluxo de trabalho em equipe (clone, commit, push, pull) para projetos de IA. Prompts são código!"
                }
            ]
        },
        {
            "id": "puc-pi-si",
            "nome": "Projeto Integrado de Sistemas Inteligentes",
            "descricao": "Ciência de dados aplicada: Python, PyTorch, modelagem de problemas e pipelines de ML.",
            "icone": "fa-microchip",
            "rota": "puc/pi-si.html",
            "recursos": [
                { "titulo": "Rubrica Sprint 1", "link": "puc_si/rubricas/sprint-1.html", "icone": "fa-clipboard-check" }
            ],
            "cronograma_link": "https://docs.google.com/spreadsheets/d/1Njc9_jsPZ5YPB5FR3fnJ4fekevkRKv7jmdf6YG6Iegc/edit?usp=sharing",
            "cronograma": [
                { "data": "05/03", "topico": "Python para Ciência de Dados", "tipo": "aula" },
                { "data": "26/03", "topico": "Apresentação do Desafio Stone", "tipo": "prova" },
                { "data": "16/04", "topico": "Entrega Sprint 1", "tipo": "prova" },
                { "data": "28/05", "topico": "Entrega Sprint 2", "tipo": "prova" },
                { "data": "02/07", "topico": "Entrega Sprint 3", "tipo": "prova" }
            ],
            "aulas": [
                {
                    "titulo": "Aula 01: Python para Data Science",
                    "link": "puc_si/slides/aula01.html",
                    "resumo": "Stack essencial para IA: NumPy, Pandas e Matplotlib focados em manipulação de dados."
                },
                {
                    "titulo": "Aula 02: PyTorch Fundamentals",
                    "link": "puc_si/slides/aula02.html",
                    "resumo": "Tensores como estrutura universal, operações matemáticas e a mecânica do Autograd (diferenciação automática)."
                },
                {
                    "titulo": "Aula 03: A Matéria-Prima (Dados)",
                    "link": "puc_si/slides/aula03.html",
                    "resumo": "Estratégias de aquisição (Scraping, APIs, Sensores), montagem de datasets e avaliação de qualidade de dados."
                },
                {
                    "titulo": "Aula 04: Modelagem de Sistemas",
                    "link": "puc_si/slides/aula04.html",
                    "resumo": "Traduzindo problemas de negócio vago para formulações matemáticas (Features, Targets e Métricas de Sucesso)."
                },
                {
                    "titulo": "Aula 05: Git Workflow Profissional",
                    "link": "puc_si/slides/aula05.html",
                    "resumo": "Padronização de desenvolvimento: Branches (Feature/Fix), Pull Requests, Code Review e Conventional Commits."
                }
            ]
        },
        {
            "id": "puc-ic",
            "nome": "Inteligência Computacional",
            "descricao": "Lógica Fuzzy, conjuntos difusos e sistemas de inferência para tomada de decisão.",
            "icone": "fa-brain",
            "rota": "puc/ic.html",
            "cronograma_link": "#",
            "cronograma": [
                { "data": "Semana 1", "topico": "Lógica Fuzzy vs Clássica", "tipo": "aula" },
                { "data": "Semana 2", "topico": "Conjuntos e Pertinência", "tipo": "aula" },
                { "data": "Semana 3", "topico": "Sistemas de Inferência", "tipo": "aula" }
            ],
            "aulas": [
                {
                    "titulo": "Aula 01: Lógica Fuzzy",
                    "link": "#",
                    "resumo": "Introdução à lógica difusa, conjuntos fuzzy e sistemas de inferência."
                }
            ]
        }
    ],
    "research_areas": [
        {
            "title": "Inteligência Artificial Responsável",
            "icon": "fa-balance-scale",
            "description": "Pesquisa em ética, transparência e mitigação de vieses em sistemas de IA."
        },
        {
            "title": "LLMs & Agentes Autônomos",
            "icon": "fa-comments",
            "description": "Desenvolvimento de aplicações baseadas em modelos de linguagem e automação de processos complexos."
        }
    ],
    "news": [],
    "students": [],
    "publicacoes": []
};
