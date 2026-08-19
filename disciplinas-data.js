window.portfolioData = window.portfolioData || {};
window.portfolioData.disciplinas = [
    // ===================== UERJ (sem gamificação) =====================
    {
        "id": "topicos-a",
        "institution": "UERJ",
        "gamified": false,
        "nome": "Tópicos Especiais A",
        "descricao": "Deep Learning aplicado: de Redes Neurais a Transformers, passando por CNNs, RNNs e Transfer Learning.",
        "icone": "fa-brain",
        "rota": "disciplinas/uerj-topicos-a.html",
        "cronograma_link": "https://docs.google.com/spreadsheets/d/1L9_sqJaPZ-5NUnlf5b4zvoH0mdcaXg_rNySrDcCjzrM/edit?usp=sharing",
        "cronograma": [
            { "data": "12/03", "topico": "Fundamentos de Redes Neurais", "tipo": "aula" },
            { "data": "18/03", "topico": "Perceptron & MLPs", "tipo": "aula" },
            { "data": "01/04", "topico": "Treinamento de Redes Neurais", "tipo": "aula" },
            { "data": "15/04", "topico": "Viés e Variância", "tipo": "aula" },
            { "data": "29/04", "topico": "Prova P1 (Teórico)", "tipo": "prova" },
            { "data": "30/04", "topico": "Prova P1 (Prática)", "tipo": "prova" }
        ],
        "aulas": [
            { "titulo": "Aula 0: Introdução ao Curso", "link": "topicos_a/slides/aula01.html", "resumo": "Informações sobre o curso, avaliações e cronograma." },
            { "titulo": "Aula 1: Redes Neurais", "link": "topicos_a/slides/aula02.html", "resumo": "Conceitos básicos, de Perceptron a Multi-Layer Perceptron." },
            { "titulo": "Aula 2: Visão Computacional", "link": "topicos_a/slides/aula03.html", "resumo": "Fundamentos da visão clássica e processamento de imagens." },
            { "titulo": "Aula 3: Introdução às CNNs", "link": "topicos_a/slides/aula04.html", "resumo": "Conceitos fundamentais de Redes Neurais Convolucionais." },
            { "titulo": "Aula 4: Arquiteturas de CNNs", "link": "topicos_a/slides/aula05.html", "resumo": "Arquiteturas clássicas (AlexNet, VGG, ResNet)." },
            { "titulo": "Aula 5: Transfer Learning", "link": "topicos_a/slides/aula06.html", "resumo": "Reaproveitando modelos pré-treinados em novos domínios." },
            { "titulo": "Aula 6: Object Detection (YOLO)", "link": "topicos_a/slides/aula07.html", "resumo": "Detecção de objetos em tempo real com YOLO." },
            { "titulo": "Aula 7: Semantic Segmentation", "link": "topicos_a/slides/aula08.html", "resumo": "Segmentação semântica com U-Net." },
            { "titulo": "Aula 8: RNNs & LSTMs", "link": "topicos_a/slides/aula09.html", "resumo": "Processamento de sequências e séries temporais." },
            { "titulo": "Aula 9: Transformers (Intro)", "link": "topicos_a/slides/aula10.html", "resumo": "A arquitetura que revolucionou o NLP." },
            { "titulo": "Aula 10: BERT & LLMs", "link": "topicos_a/slides/aula_bert.html", "resumo": "Contextual Language Models, Self-Attention e o ecossistema atual de LLMs." }
        ],
        "notebooks": [
            { "titulo": "Exemplo Prático: HuggingFace & BERT", "link": "topicos_a/notebooks/exemplo_bert.ipynb", "resumo": "Notebook de referência para uso de pipelines e modelos do HuggingFace Hub." }
        ]
    },
    {
        "id": "iac",
        "institution": "UERJ",
        "gamified": false,
        "nome": "Instalações de Ambiente",
        "descricao": "Infraestrutura de TI: Datacenters, Cloud Computing (AWS), Cabeamento Estruturado e Proteção Elétrica.",
        "icone": "fa-server",
        "rota": "disciplinas/uerj-iac.html",
        "cronograma_link": "https://docs.google.com/spreadsheets/d/1L9_sqJaPZ-5NUnlf5b4zvoH0mdcaXg_rNySrDcCjzrM/edit?usp=sharing",
        "cronograma": [
            { "data": "06/03", "topico": "Introdução a Data Centers", "tipo": "aula" },
            { "data": "13/03", "topico": "Infraestrutura Física (Power/Cooling)", "tipo": "aula" },
            { "data": "20/03", "topico": "Cabeamento Estruturado", "tipo": "aula" },
            { "data": "24/04", "topico": "Prova Parcial P1", "tipo": "prova" }
        ],
        "aulas": [
            { "titulo": "Aula 01: Introdução a Servidores", "link": "instalacoes_ambiente_computacional/slides/aula01.html", "resumo": "Conceitos, Tipos (Torre, Rack, Blade) e Hardware." },
            { "titulo": "Aula 02: Datacenters", "link": "instalacoes_ambiente_computacional/slides/aula02.html", "resumo": "Layout físico, Piso Elevado, Tiers e Refrigeração." },
            { "titulo": "Aula 03: Cloud Computing (Intro)", "link": "instalacoes_ambiente_computacional/slides/aula03.html", "resumo": "Conceitos de Nuvem e Infraestrutura Global AWS." },
            { "titulo": "Aula 04: AWS Compute (EC2)", "link": "instalacoes_ambiente_computacional/slides/aula04.html", "resumo": "Instâncias EC2, Famílias e AMIs." },
            { "titulo": "Aula 05: AWS Networking (VPC)", "link": "instalacoes_ambiente_computacional/slides/aula05.html", "resumo": "Virtual Private Cloud, Subnets e Security Groups." },
            { "titulo": "Aula 06: AWS Storage (S3 & EBS)", "link": "instalacoes_ambiente_computacional/slides/aula06.html", "resumo": "Armazenamento de objetos vs blocos na nuvem." },
            { "titulo": "Aula 07: Cabeamento (Coaxial)", "link": "instalacoes_ambiente_computacional/slides/aula07.html", "resumo": "Histórico e aplicações de cabos coaxiais." },
            { "titulo": "Aula 08: Par Trançado (UTP)", "link": "instalacoes_ambiente_computacional/slides/aula08.html", "resumo": "Categorias de cabos ethernet e padrões de crimpagem." },
            { "titulo": "Aula 09: Fibra Óptica", "link": "instalacoes_ambiente_computacional/slides/aula09.html", "resumo": "Física da luz, monomodo vs multimodo." },
            { "titulo": "Aula 10: Cabeamento Estruturado", "link": "instalacoes_ambiente_computacional/slides/aula10.html", "resumo": "Normas ANSI/TIA-568 e subsistemas." },
            { "titulo": "Aula 11: Proteção Elétrica", "link": "instalacoes_ambiente_computacional/slides/aula11.html", "resumo": "UPS, Aterramento e proteção contra surtos." }
        ]
    },
    {
        "id": "pac",
        "institution": "UERJ",
        "gamified": false,
        "nome": "Projeto de Ambiente",
        "descricao": "Gerenciamento de projetos de infraestrutura computacional com metodologias ágeis.",
        "icone": "fa-project-diagram",
        "rota": "disciplinas/uerj-pac.html",
        "cronograma_link": "https://docs.google.com/spreadsheets/d/1o-Qtw-wo32wWJ1_g6gNp_ZE_wRrtIspEUUZ92OrUUFs/edit?usp=sharing",
        "cronograma": [
            { "data": "07/03", "topico": "Definição de Escopo", "tipo": "aula" },
            { "data": "14/03", "topico": "Metodologias Ágeis", "tipo": "aula" },
            { "data": "28/04", "topico": "Apresentação Parcial", "tipo": "entrega" }
        ],
        "aulas": [
            { "titulo": "Aula 1: Gerenciamento de Projeto", "link": "projeto_ambiente_computacional/uerj_pac_gerenciamento_projetos.pptx", "resumo": "Fundamentos para o gerenciamento e o ciclo de vida de um projeto." }
        ]
    },

    // ===================== PUC-Rio: PI-IA (gamificado) =====================
    {
        "id": "puc-pi-ia",
        "institution": "PUC-Rio",
        "gamified": true,
        "nome": "Projeto Integrado de Introdução à IA",
        "descricao": "Projetos práticos com IA: LLMs, Agentes, Prompt Engineering e MVPs com impacto social.",
        "icone": "fa-robot",
        "rota": "disciplinas/puc-pi-ia.html",
        "recursos": [
            { "titulo": "Rubrica Sprint 1", "link": "puc/rubricas/sprint-1.html", "icone": "fa-clipboard-check" },
            { "titulo": "Rubrica Sprint 2", "link": "puc/rubricas/sprint-2.html", "icone": "fa-clipboard-list" },
            { "titulo": "Rubrica Sprint 3", "link": "puc/rubricas/sprint-3.html", "icone": "fa-flag-checkered" }
        ],
        "cronograma_link": "https://docs.google.com/spreadsheets/d/1Njc9_jsPZ5YPB5FR3fnJ4fekevkRKv7jmdf6YG6Iegc/edit?usp=sharing",
        "cronograma": [
            { "data": "02/03", "topico": "Apresentação Inicial", "tipo": "aula" },
            { "data": "09/03", "topico": "Introdução à IA", "tipo": "quiz", "pontuacao": 0.03 },
            { "data": "16/03", "topico": "LLMs", "tipo": "quiz", "pontuacao": 0.03 },
            { "data": "23/03", "topico": "Definição do Projeto", "tipo": "apresentacao", "pontuacao": 0.05 },
            { "data": "30/03", "topico": "Agent LLM", "tipo": "quiz", "pontuacao": 0.03 },
            { "data": "06/04", "topico": "Avaliando modelos de automação de processos", "tipo": "quiz", "pontuacao": 0.03 },
            { "data": "13/04", "topico": "Não há aula", "tipo": "sem-aula" },
            { "data": "20/04", "topico": "Acompanhamento de Projeto", "tipo": "rubrica", "pontuacao": 0.03 },
            { "data": "27/04", "topico": "Apresentação Sprint 1", "tipo": "entrega", "pontuacao": 0.15 },
            { "data": "04/05", "topico": "Avaliando modelos de automação de processos (Trabalho Prático)", "tipo": "trabalho", "pontuacao": 0.03 },
            { "data": "11/05", "topico": "Acompanhamento de Projeto", "tipo": "rubrica", "pontuacao": 0.03 },
            { "data": "18/05", "topico": "Acompanhamento de Projeto", "tipo": "rubrica", "pontuacao": 0.03 },
            { "data": "25/05", "topico": "Apresentação Sprint 2", "tipo": "entrega", "pontuacao": 0.10 },
            { "data": "01/06", "topico": "Acompanhamento de Projeto", "tipo": "rubrica", "pontuacao": 0.03 },
            { "data": "08/06", "topico": "Acompanhamento de Projeto", "tipo": "rubrica", "pontuacao": 0.03 },
            { "data": "15/06", "topico": "Apresentação Sprint 3", "tipo": "entrega", "pontuacao": 0.15 },
            { "data": "22/06", "topico": "Entrega do relatório final", "tipo": "entrega", "pontuacao": 0.25 },
            { "data": "29/06", "topico": "Feedback sobre a disciplina", "tipo": "aula" }
        ],
        "aulas": [
            { "titulo": "Aula 01: O que é IA? (Desmistificando)", "link": "puc_ia/slides/aula01.html", "resumo": "IA como modelagem matemática (funções, otimização) e o conceito de Aprendizado (Generalização vs Memorização). Estado da arte e responsabilidade social." },
            { "titulo": "Aula 02: LLMs - O Cérebro Probabilístico", "link": "puc_ia/slides/aula02.html", "resumo": "Modelagem probabilística da linguagem (Next Token Prediction), limitações matemáticas (alucinações) e Engenharia de Prompt Avançada." },
            { "titulo": "Aula 03: Agentes e Automação (n8n)", "link": "puc_ia/slides/aula03.html", "resumo": "Arquiteturas Cognitivas (ReAct), Agentes Autônomos e prática com ferramentas Low-code (n8n) para construção de MVPs." },
            { "titulo": "Aula 04: Ideação de Soluções", "link": "puc_ia/slides/aula04.html", "resumo": "Design de solução e definição de escopo para o MVP do projeto integrado. AI Canvas (Prediction, Judgment, Action)." },
            { "titulo": "Aula 05: Colaboração com Git", "link": "puc_ia/slides/aula05.html", "resumo": "Versionamento de código/prompts e fluxo de trabalho em equipe (clone, commit, push, pull) para projetos de IA. Prompts são código!" }
        ],
        "badges": [
            { "id": "pi-ia-badge-sprint1", "titulo": "Sprint 1 Completo", "icone": "fa-medal" },
            { "id": "pi-ia-badge-sprint2", "titulo": "Sprint 2 Completo", "icone": "fa-medal" },
            { "id": "pi-ia-badge-mestre", "titulo": "Mestre PI-IA", "icone": "fa-crown" }
        ],
        "quests": [
            { "id": "pi-ia-onboarding", "titulo": "Primeiros Passos", "descricao": "Compareça à apresentação inicial da disciplina.", "tipo": "onboarding", "xp": 20 },

            { "id": "pi-ia-a1-quiz", "titulo": "Aula 01 — Quiz: Fundamentos de IA", "descricao": "Quiz interativo de fim de aula — resultado calculado na hora.", "tipo": "quiz", "xp": 20, "mecanismo": "auto-quiz", "link": "puc_ia/quiz/aula01.html" },
            { "id": "pi-ia-a1-pratico", "titulo": "Aula 01 — Prático: IA no seu dia a dia", "descricao": "Mapeie 3 usos de IA que você encontrou essa semana e classifique cada um (IA fraca/estreita vs. o que seria IA forte).", "tipo": "hands-on", "xp": 20 },
            { "id": "pi-ia-a1-llm-local", "titulo": "Aula 01 — Desafio: Primeiro contato com um LLM local", "descricao": "Instale o Ollama, baixe o llama3.2 e converse com ele pelo terminal — um gostinho do que vem na Aula 03.", "tipo": "hands-on", "xp": 20, "mecanismo": "auto-desafio", "link": "puc_ia/desafios/aula01-llm-local.html" },

            { "id": "pi-ia-a2-quiz", "titulo": "Aula 02 — Quiz: Como LLMs funcionam", "descricao": "Quiz sobre tokenização, decodificação e treinamento de LLMs.", "tipo": "quiz", "xp": 20, "mecanismo": "auto-quiz", "link": "puc_ia/quiz/aula02.html" },
            { "id": "pi-ia-a2-pratico", "titulo": "Aula 02 — Prático: Prompt Engineering em dupla", "descricao": "Escolha um tópico e construa um prompt usando uma das 7 técnicas vistas em aula, com CoT de 3–5 passos.", "tipo": "hands-on", "xp": 30, "mecanismo": "auto-desafio", "link": "puc_ia/desafios/aula02-prompt-engineering.html" },

            { "id": "pi-ia-a3-quiz", "titulo": "Aula 03 — Quiz: Agentes e ReAct", "descricao": "Quiz sobre arquiteturas de agentes (Reason + Act).", "tipo": "quiz", "xp": 20, "mecanismo": "auto-quiz", "link": "puc_ia/quiz/aula03.html" },
            { "id": "pi-ia-a3-llm-local", "titulo": "Aula 03 — Prático: Rodar uma LLM local", "descricao": "Suba um modelo local (Ollama ou LM Studio) e converse com ele pelo terminal ou API.", "tipo": "hands-on", "xp": 40, "mecanismo": "auto-desafio", "link": "puc_ia/desafios/aula03-llm-local.html" },
            { "id": "pi-ia-a3-n8n", "titulo": "Aula 03 — Prático: Montar um fluxo no n8n", "descricao": "Use puc_ia/n8n/setup.sh para subir o n8n localmente e editar o workflow de exemplo (Webhook → LLM local → resposta).", "tipo": "hands-on", "xp": 40, "mecanismo": "auto-desafio", "link": "puc_ia/desafios/aula03-n8n.html" },

            { "id": "pi-ia-a4-quiz", "titulo": "Aula 04 — Quiz: AI Canvas", "descricao": "Quiz sobre Prediction, Judgment e Action.", "tipo": "quiz", "xp": 15, "mecanismo": "auto-quiz", "link": "puc_ia/quiz/aula04.html" },
            { "id": "pi-ia-a4-pratico", "titulo": "Aula 04 — Prático: Canvas do MVP", "descricao": "Preencha o AI Canvas do seu projeto e escreva a frase de escopo do Sprint 1.", "tipo": "hands-on", "xp": 30, "mecanismo": "auto-desafio", "link": "puc_ia/desafios/aula04-canvas.html" },

            { "id": "pi-ia-a5-quiz", "titulo": "Aula 05 — Quiz: Fluxo Git", "descricao": "Quiz sobre branches, commits e Pull Requests.", "tipo": "quiz", "xp": 15, "mecanismo": "auto-quiz", "link": "puc_ia/quiz/aula05.html" },
            { "id": "pi-ia-a5-pratico", "titulo": "Aula 05 — Prático: PR revisado pelo time", "descricao": "Cada integrante cria uma branch, commita, abre PR e revisa o PR de um colega antes do merge.", "tipo": "hands-on", "xp": 30, "mecanismo": "auto-desafio", "link": "puc_ia/desafios/aula05-pr-review.html" },

            { "id": "pi-ia-acompanhamento-1", "titulo": "Rubrica — Acompanhamento (pré-Sprint 1)", "descricao": "Submeta a rubrica de acompanhamento.", "tipo": "rubrica", "xp": 30, "mecanismo": "auto-rubrica", "rubrica_link": "puc/rubricas/sprint-1.html" },
            { "id": "pi-ia-boss-sprint1", "titulo": "Boss: Sprint 1", "descricao": "Apresente o protótipo inicial do seu MVP.", "tipo": "boss", "xp": 150, "badge": "pi-ia-badge-sprint1" },
            { "id": "pi-ia-trabalho-automacao", "titulo": "Trabalho Prático: Automação", "descricao": "Entregue o trabalho prático de avaliação de modelos de automação de processos.", "tipo": "trabalho", "xp": 30 },
            { "id": "pi-ia-acompanhamento-2", "titulo": "Rubrica — Acompanhamento", "descricao": "Rubrica de acompanhamento de projeto.", "tipo": "rubrica", "xp": 25 },
            { "id": "pi-ia-acompanhamento-3", "titulo": "Rubrica — Acompanhamento (pré-Sprint 2)", "descricao": "Submeta a rubrica de acompanhamento.", "tipo": "rubrica", "xp": 30, "mecanismo": "auto-rubrica", "rubrica_link": "puc/rubricas/sprint-2.html" },
            { "id": "pi-ia-boss-sprint2", "titulo": "Boss: Sprint 2", "descricao": "Apresente a evolução do seu MVP.", "tipo": "boss", "xp": 130, "badge": "pi-ia-badge-sprint2" },
            { "id": "pi-ia-acompanhamento-4", "titulo": "Rubrica — Acompanhamento", "descricao": "Rubrica de acompanhamento de projeto.", "tipo": "rubrica", "xp": 25 },
            { "id": "pi-ia-acompanhamento-5", "titulo": "Rubrica — Acompanhamento (pré-Sprint 3)", "descricao": "Submeta a rubrica de acompanhamento.", "tipo": "rubrica", "xp": 30, "mecanismo": "auto-rubrica", "rubrica_link": "puc/rubricas/sprint-3.html" },
            { "id": "pi-ia-boss-sprint3", "titulo": "Boss: Sprint 3 (Final)", "descricao": "Apresentação final do projeto.", "tipo": "boss", "xp": 180, "badge": "pi-ia-badge-mestre" },
            { "id": "pi-ia-relatorio-final", "titulo": "Relatório Final Entregue", "descricao": "Entregue o relatório final do projeto.", "tipo": "entrega", "xp": 100 }
        ]
    },

    // ===================== PUC-Rio: PI-SI (gamificado) =====================
    {
        "id": "puc-pi-si",
        "institution": "PUC-Rio",
        "gamified": true,
        "nome": "Projeto Integrado de Sistemas Inteligentes",
        "descricao": "Ciência de dados aplicada: Python, PyTorch, modelagem de problemas e pipelines de ML.",
        "icone": "fa-microchip",
        "rota": "disciplinas/puc-pi-si.html",
        "recursos": [
            { "titulo": "Rubrica Sprint 1", "link": "puc_si/rubricas/sprint-1.html", "icone": "fa-clipboard-check" },
            { "titulo": "Rubrica Sprint 2", "link": "puc_si/rubricas/sprint-2.html", "icone": "fa-clipboard-list" },
            { "titulo": "Rubrica Sprint 3", "link": "puc_si/rubricas/sprint-3.html", "icone": "fa-flag-checkered" },
            { "titulo": "Guia: agente local com Ollama", "link": "puc_si/desafios/guia-agente-local.html", "icone": "fa-robot" }
        ],
        "cronograma_link": "https://docs.google.com/spreadsheets/d/1Njc9_jsPZ5YPB5FR3fnJ4fekevkRKv7jmdf6YG6Iegc/edit?usp=sharing",
        "cronograma": [
            { "data": "05/03", "topico": "Introdução + andamento do curso", "tipo": "aula" },
            { "data": "12/03", "topico": "Introdução Python + Torch", "tipo": "aula" },
            { "data": "19/03", "topico": "Introdução Python + Torch", "tipo": "aula" },
            { "data": "26/03", "topico": "Desafio Stone", "tipo": "aula" },
            { "data": "02/04", "topico": "Sem aula (Páscoa)", "tipo": "sem-aula" },
            { "data": "09/04", "topico": "Auxílio em projeto", "tipo": "aula" },
            { "data": "16/04", "topico": "Apresentação Sprint 1", "tipo": "entrega" },
            { "data": "23/04", "topico": "Sem aula (Dia de São Jorge)", "tipo": "sem-aula" },
            { "data": "30/04", "topico": "Rubrica #01", "tipo": "rubrica" },
            { "data": "07/05", "topico": "Modelagem de sistemas", "tipo": "aula" },
            { "data": "14/05", "topico": "Rubrica #02", "tipo": "rubrica" },
            { "data": "21/05", "topico": "Auxílio em projeto", "tipo": "aula" },
            { "data": "28/05", "topico": "Apresentação Sprint 2", "tipo": "entrega" },
            { "data": "04/06", "topico": "Sem aula (Corpus Christi)", "tipo": "sem-aula" },
            { "data": "11/06", "topico": "Git", "tipo": "aula" },
            { "data": "18/06", "topico": "Rubrica #03", "tipo": "rubrica" },
            { "data": "25/06", "topico": "Auxílio em projeto", "tipo": "aula" },
            { "data": "02/07", "topico": "Apresentação Sprint 3", "tipo": "entrega" }
        ],
        "aulas": [
            { "titulo": "Aula 01: Python para Data Science", "link": "puc_si/slides/aula01.html", "resumo": "Stack essencial para IA: NumPy, Pandas e Matplotlib focados em manipulação de dados." },
            { "titulo": "Aula 02: PyTorch Fundamentals", "link": "puc_si/slides/aula02.html", "resumo": "Tensores como estrutura universal, operações matemáticas e a mecânica do Autograd (diferenciação automática)." },
            { "titulo": "Aula 03: A Matéria-Prima (Dados)", "link": "puc_si/slides/aula03.html", "resumo": "Estratégias de aquisição (Scraping, APIs, Sensores), montagem de datasets e avaliação de qualidade de dados." },
            { "titulo": "Aula 04: Modelagem de Sistemas", "link": "puc_si/slides/aula04.html", "resumo": "Traduzindo problemas de negócio vago para formulações matemáticas (Features, Targets e Métricas de Sucesso)." },
            { "titulo": "Aula 05: Git Workflow Profissional", "link": "puc_si/slides/aula05.html", "resumo": "Padronização de desenvolvimento: Branches (Feature/Fix), Pull Requests, Code Review e Conventional Commits." },
            { "titulo": "Aula 06: Crash Course de Numpy & Pandas", "link": "puc_si/slides/aula06.html", "resumo": "Manipulação avançada de dados: Indexação, Agrupamento, Pivot Tables e Visualização com Matplotlib." },
            { "titulo": "Aula 07: Raspberry Pi", "link": "puc_si/slides/aula07.html", "resumo": "Do modelo ao mundo físico: GPIO, sensores e a lógica de decisão que liga um sistema inteligente ao ambiente real (Edge AI)." },
            { "titulo": "Aula 08: Arduino", "link": "puc_si/slides/aula08.html", "resumo": "Microcontroladores, sketches, leitura analógica e a ponte serial entre Arduino e Raspberry Pi." }
        ],
        "badges": [
            { "id": "pi-si-badge-sprint1", "titulo": "Sprint 1 Completo", "icone": "fa-medal" },
            { "id": "pi-si-badge-sprint2", "titulo": "Sprint 2 Completo", "icone": "fa-medal" },
            { "id": "pi-si-badge-mestre", "titulo": "Mestre PI-SI", "icone": "fa-crown" }
        ],
        "quests": [
            { "id": "pi-si-onboarding", "titulo": "Primeiros Passos", "descricao": "Compareça à aula de introdução e andamento do curso.", "tipo": "onboarding", "xp": 20 },

            { "id": "pi-si-a1-quiz", "titulo": "Aula 01 — Quiz de código: Normalização", "descricao": "Quiz executado no navegador (Pyodide) — implemente e valide min-max normalization.", "tipo": "quiz", "xp": 20, "mecanismo": "auto-quiz", "link": "puc_si/quiz/aula01.html" },
            { "id": "pi-si-a1-pratico", "titulo": "Aula 01 — Prático: Pipeline ETL (Lab 01)", "descricao": "Crie uma classe Dataset, leia california_housing.csv com Pandas, extraia o vetor de preços com NumPy e plote um histograma.", "tipo": "hands-on", "xp": 40 },
            { "id": "pi-si-a1-tool-etl", "titulo": "Aula 01 — Desafio: Ferramenta de dados p/ agente", "descricao": "Escreva você mesmo o código que conversa com um agente local (Ollama, via pyfetch/tool calling): monte o pedido, leia a chamada de ferramenta, rode sua função e devolva o resultado real.", "tipo": "hands-on", "xp": 40, "mecanismo": "auto-desafio", "link": "puc_si/desafios/aula01-tool-etl.html" },

            { "id": "pi-si-a2-quiz", "titulo": "Aula 02 — Quiz: Tensores & Autograd", "descricao": "Quiz sobre view/reshape, CUDA e o ciclo zero_grad/backward/step.", "tipo": "quiz", "xp": 20, "mecanismo": "auto-quiz", "link": "puc_si/quiz/aula02.html" },
            { "id": "pi-si-a2-pratico", "titulo": "Aula 02 — Prático: Regressão Linear Manual (Lab 02)", "descricao": "Implemente o loop de treino manualmente (forward, backward, update de pesos) sem usar nn.Module.", "tipo": "hands-on", "xp": 40 },
            { "id": "pi-si-a2-guardrail", "titulo": "Aula 02 — Desafio: Score de guardrail", "descricao": "Escreva você mesmo o código que conversa com um agente local (Ollama, via pyfetch/tool calling): monte o pedido, leia a chamada de ferramenta, rode sua função e devolva o resultado real.", "tipo": "hands-on", "xp": 40, "mecanismo": "auto-desafio", "link": "puc_si/desafios/aula02-guardrail-score.html" },

            { "id": "pi-si-a3-quiz", "titulo": "Aula 03 — Quiz de código: Outliers", "descricao": "Quiz executado no navegador (Pyodide) — implemente e valide a remoção de outliers.", "tipo": "quiz", "xp": 20, "mecanismo": "auto-quiz", "link": "puc_si/quiz/aula03.html" },
            { "id": "pi-si-a3-pratico", "titulo": "Aula 03 — Prático: O Detetive de Dados (Lab 03)", "descricao": "Limpe um dataset com problemas (nulos, duplicatas, outliers) e salve a versão 'Gold' pronta para treino.", "tipo": "hands-on", "xp": 40 },
            { "id": "pi-si-a3-audit", "titulo": "Aula 03 — Desafio: Auditoria de governança", "descricao": "Audite um dataset do ponto de vista do que um agente poderia (ou não) acessar com segurança.", "tipo": "hands-on", "xp": 40, "mecanismo": "auto-desafio", "link": "puc_si/desafios/aula03-audit-agente.html" },

            { "id": "pi-si-a4-quiz", "titulo": "Aula 04 — Quiz de código: Precision/Recall/F1", "descricao": "Quiz executado no navegador (Pyodide) — implemente e valide as métricas da matriz de confusão.", "tipo": "quiz", "xp": 20, "mecanismo": "auto-quiz", "link": "puc_si/quiz/aula04.html" },
            { "id": "pi-si-a4-pratico", "titulo": "Aula 04 — Prático: Desafio de Modelagem — Churn (Lab 04)", "descricao": "Defina X e Y, identifique colunas de vazamento, treine uma Regressão Logística e meça o F1-Score.", "tipo": "hands-on", "xp": 40 },
            { "id": "pi-si-a4-observabilidade", "titulo": "Aula 04 — Desafio: Métrica de saúde do agente", "descricao": "Defina uma métrica de observabilidade/saúde para um agente hipotético.", "tipo": "hands-on", "xp": 40, "mecanismo": "auto-desafio", "link": "puc_si/desafios/aula04-observabilidade.html" },

            { "id": "pi-si-a5-quiz", "titulo": "Aula 05 — Quiz: Git Workflow", "descricao": "Quiz sobre branches, Pull Requests e Conventional Commits.", "tipo": "quiz", "xp": 15, "mecanismo": "auto-quiz", "link": "puc_si/quiz/aula05.html" },
            { "id": "pi-si-a5-pratico", "titulo": "Aula 05 — Prático: Simulação de Time Ágil (Lab 05)", "descricao": "Em squad: cada pessoa cria uma branch, abre PR, revisa o PR de um colega e faz merge só após aprovação.", "tipo": "hands-on", "xp": 30 },
            { "id": "pi-si-a5-repo-agente", "titulo": "Aula 05 — Desafio: Repo de um agente", "descricao": "Estruture prompts/configs de um agente como código versionável e envie o PR revisado.", "tipo": "hands-on", "xp": 30, "mecanismo": "auto-desafio", "link": "puc_si/desafios/aula05-repo-agente.html" },

            { "id": "pi-si-a6-quiz", "titulo": "Aula 06 — Quiz de código: GroupBy", "descricao": "Quiz executado no navegador (Pyodide + Pandas) — encontre a categoria líder em receita.", "tipo": "quiz", "xp": 20, "mecanismo": "auto-quiz", "link": "puc_si/quiz/aula06.html" },
            { "id": "pi-si-a6-pratico", "titulo": "Aula 06 — Prático: EDA de E-commerce", "descricao": "Rode o pipeline completo (ingestão, limpeza, feature engineering, análise, dashboard) do projeto final da aula.", "tipo": "hands-on", "xp": 50 },
            { "id": "pi-si-a6-dashboard-custos", "titulo": "Aula 06 — Desafio: Dashboard de custos do agente", "descricao": "Desenhe um painel de custo/uso para um agente, no espírito da gestão financeira pedida pela Stonelab.", "tipo": "hands-on", "xp": 40, "mecanismo": "auto-desafio", "link": "puc_si/desafios/aula06-dashboard-custos.html" },

            { "id": "pi-si-a7-quiz", "titulo": "Aula 07 — Quiz de código: Decisão de Alerta", "descricao": "Quiz executado no navegador (Pyodide) — a lógica de decisão de um sistema de sensores.", "tipo": "quiz", "xp": 20, "mecanismo": "auto-quiz", "link": "puc_si/quiz/aula07.html" },
            { "id": "pi-si-a7-sensor-tool", "titulo": "Aula 07 — Desafio: Sensor como ferramenta", "descricao": "Escreva você mesmo o código que conversa com um agente local (Ollama, via pyfetch/tool calling): monte o pedido, leia a chamada de ferramenta, rode sua função e devolva o resultado real.", "tipo": "hands-on", "xp": 30, "mecanismo": "auto-desafio", "link": "puc_si/desafios/aula07-sensor-tool.html" },

            { "id": "pi-si-a8-quiz", "titulo": "Aula 08 — Quiz: Arduino", "descricao": "Quiz sobre sketches, leitura analógica e a ponte serial com o Raspberry Pi.", "tipo": "quiz", "xp": 15, "mecanismo": "auto-quiz", "link": "puc_si/quiz/aula08.html" },
            { "id": "pi-si-a8-circuito", "titulo": "Aula 08 — Desafio: Circuito sensor + LED", "descricao": "Monte (real ou no Tinkercad) um circuito com sensor e LED, e escreva o sketch de decisão.", "tipo": "hands-on", "xp": 30, "mecanismo": "auto-desafio", "link": "puc_si/desafios/aula08-circuito.html" },

            { "id": "pi-si-desafio-stone", "titulo": "Aceitar o Desafio Stone", "descricao": "Registre a aceitação do Desafio Stone e o plano inicial da equipe.", "tipo": "milestone", "xp": 40 },
            { "id": "pi-si-consultoria-1", "titulo": "Consultoria I", "descricao": "Sessão de auxílio em projeto antes do Sprint 1.", "tipo": "attendance", "xp": 15 },
            { "id": "pi-si-boss-sprint1", "titulo": "Boss: Sprint 1", "descricao": "Apresente os resultados do Sprint 1.", "tipo": "boss", "xp": 150, "badge": "pi-si-badge-sprint1" },
            { "id": "pi-si-rubrica-1", "titulo": "Rubrica #01 enviada", "descricao": "Submeta a Rubrica #01 (autoavaliação, avaliação da equipe e peer-review).", "tipo": "rubrica", "xp": 40, "mecanismo": "auto-rubrica", "rubrica_link": "puc_si/rubricas/sprint-1.html" },
            { "id": "pi-si-rubrica-2", "titulo": "Rubrica #02 enviada", "descricao": "Submeta a Rubrica #02.", "tipo": "rubrica", "xp": 40, "mecanismo": "auto-rubrica", "rubrica_link": "puc_si/rubricas/sprint-2.html" },
            { "id": "pi-si-consultoria-2", "titulo": "Consultoria II", "descricao": "Sessão de auxílio em projeto antes do Sprint 2.", "tipo": "attendance", "xp": 15 },
            { "id": "pi-si-boss-sprint2", "titulo": "Boss: Sprint 2", "descricao": "Apresente os resultados do Sprint 2.", "tipo": "boss", "xp": 180, "badge": "pi-si-badge-sprint2" },
            { "id": "pi-si-rubrica-3", "titulo": "Rubrica #03 enviada", "descricao": "Submeta a Rubrica #03.", "tipo": "rubrica", "xp": 40, "mecanismo": "auto-rubrica", "rubrica_link": "puc_si/rubricas/sprint-3.html" },
            { "id": "pi-si-consultoria-3", "titulo": "Consultoria III", "descricao": "Sessão de auxílio em projeto antes do Sprint 3.", "tipo": "attendance", "xp": 15 },
            { "id": "pi-si-boss-sprint3", "titulo": "Boss: Sprint 3 (Final)", "descricao": "Apresentação final do projeto.", "tipo": "boss", "xp": 250, "badge": "pi-si-badge-mestre" }
        ]
    },

    // ===================== PUC-Rio: IC (sem gamificação) =====================
    {
        "id": "puc-ic",
        "institution": "PUC-Rio",
        "gamified": false,
        "nome": "Inteligência Computacional",
        "descricao": "Lógica Fuzzy, conjuntos difusos e sistemas de inferência para tomada de decisão.",
        "icone": "fa-brain",
        "rota": "disciplinas/puc-ic.html",
        "cronograma_link": "#",
        "cronograma": [
            { "data": "Semana 1", "topico": "Lógica Fuzzy vs Clássica", "tipo": "aula" },
            { "data": "Semana 2", "topico": "Conjuntos e Pertinência", "tipo": "aula" },
            { "data": "Semana 3", "topico": "Sistemas de Inferência", "tipo": "aula" }
        ],
        "aulas": [
            { "titulo": "Aula 01: Lógica Fuzzy", "link": "#", "resumo": "Introdução à lógica difusa, conjuntos fuzzy e sistemas de inferência." }
        ]
    }
];
