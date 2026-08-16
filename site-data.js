window.portfolioData = window.portfolioData || {};
Object.assign(window.portfolioData, {
    "bio": {
        "paragrafos": [
            {
                "en": "I'm a researcher and lecturer working on <strong>Artificial Intelligence</strong>, based in the Systems and Computer Engineering Department (DESC) at UERJ and the Electrical Engineering Department at PUC-Rio. My research centers on <strong>Deep Learning</strong>, <strong>Computer Vision</strong>, <strong>out-of-distribution detection</strong>, and <strong>Large Language Models</strong> — usually at the point where theory meets a real system, from agricultural robotics to neuro-symbolic pipelines built on LLMs.",
                "pt": "Sou pesquisador e professor com foco em <strong>Inteligência Artificial</strong>, atuando no Departamento de Engenharia de Sistemas e Computação (DESC) da UERJ e no Departamento de Engenharia Elétrica da PUC-Rio. Minha pesquisa se concentra em <strong>Deep Learning</strong>, <strong>Computer Vision</strong>, <strong>detecção de Out-of-Distribution</strong> e <strong>Large Language Models</strong> — sempre buscando pontes entre a teoria e aplicações reais, de robótica agrícola a sistemas neuro-simbólicos com LLMs."
            },
            {
                "en": "Advise undergraduate, master's, and undergraduate-research projects spanning precision agriculture, remote sensing, legal and financial LLM applications, and public-health data analysis.",
                "pt": "Oriento projetos de graduação, mestrado e iniciação científica em agricultura de precisão, sensoriamento remoto, aplicações jurídicas e financeiras de LLMs, e análise de dados em saúde pública."
            }
        ],
        "tags": ["Deep Learning", "Computer Vision", "OOD Detection", "LLMs", "Fuzzy Systems", "Time Series", "MLOps"]
    },
    "research_areas": [
        {
            "title": { "en": "Deep Learning & Computer Vision", "pt": "Deep Learning & Visão Computacional" },
            "icon": "fa-eye",
            "description": {
                "en": "Neural architectures for pattern recognition in images and video, with a focus on precision agriculture and security.",
                "pt": "Arquiteturas neurais para reconhecimento de padrões em imagens e vídeo, com foco em agricultura de precisão e segurança."
            }
        },
        {
            "title": { "en": "Large Language Models", "pt": "Large Language Models (LLMs)" },
            "icon": "fa-comments",
            "description": {
                "en": "RAG, fine-tuning, autonomous agents and neuro-symbolic systems — from financial-report automation to automated responses for university regulations.",
                "pt": "RAG (Retrieval-Augmented Generation), fine-tuning, agentes autônomos e sistemas neuro-simbólicos — de automação de relatórios financeiros a respostas automatizadas para regulamentos universitários."
            }
        },
        {
            "title": { "en": "Explainability & Robustness", "pt": "Explicabilidade e Robustez" },
            "icon": "fa-shield-alt",
            "description": {
                "en": "Out-of-distribution detection via feature space, Gaussian distributions and gradient vectors; model explainability and defense against adversarial attacks.",
                "pt": "Detecção de out-of-distribution via espaço de features, distribuições Gaussianas e vetores de gradiente; explicabilidade de modelos e defesa contra adversarial attacks."
            }
        },
        {
            "title": { "en": "Responsible AI", "pt": "Inteligência Artificial Responsável" },
            "icon": "fa-balance-scale",
            "description": {
                "en": "Ethics, transparency and bias mitigation in AI systems applied to sensitive contexts (public health, legal, financial).",
                "pt": "Ética, transparência e mitigação de vieses em sistemas de IA aplicados a contextos sensíveis (saúde pública, jurídico, financeiro)."
            }
        }
    ],
    "news": ["Defesa de dissertação do aluno Marcelo Aguiar acontecerá no dia 26/04/2026, às 14h."],
    "escrita": [
        {
            "titulo": { "en": "Towards Out-of-Distribution Detection Using Gradient Vectors", "pt": "Towards Out-of-Distribution Detection Using Gradient Vectors" },
            "tipo": "preprint",
            "resumo": {
                "en": "A gradient-vector-based approach to out-of-distribution detection, submitted to the journal Neural Networks.",
                "pt": "Abordagem de detecção de out-of-distribution baseada em vetores de gradiente, submetido à revista Neural Networks."
            },
            "link_opcional": "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5036612",
            "data": "2025"
        },
        {
            "titulo": { "en": "[DRAFT — review needed] Gamification in AI Teaching", "pt": "[RASCUNHO — revisar] Gamificação no ensino de IA aplicada" },
            "tipo": "ideia",
            "resumo": {
                "en": "Notes on introducing a points/quest layer into the PUC-Rio Integrated Project courses — what worked, what didn't, and what to change next term.",
                "pt": "Nota sobre a experiência de introduzir pontuação/quests nas disciplinas de Projeto Integrado da PUC-Rio — o que funcionou, o que não funcionou, e o que fica pra próxima turma."
            },
            "link_opcional": "",
            "data": "2026"
        },
        {
            "titulo": { "en": "[DRAFT — review needed] When Should a Model Say \"I Don't Know\"?", "pt": "[RASCUNHO — revisar] Quando um modelo deveria dizer \"não sei\"?" },
            "tipo": "ideia",
            "resumo": {
                "en": "An informal reflection on the practical limits of OOD detection in production, outside the tidy world of academic benchmarks.",
                "pt": "Reflexão informal sobre os limites práticos de detecção de OOD em produção, fora do contexto de benchmark acadêmico."
            },
            "link_opcional": "",
            "data": "2026"
        }
    ],
    "students": [
        { "name": "Andrey Iorran Correa Lobato",
          "level": "Graduação",
          "project": "Sistema de Gerenciamento da Saúde Pública Brasileira: Plataforma Web para Extração, Pré-processamento e Conversão de Arquivos do DATASUS",
          "status": "Concluído",
          "period": "2024.2", "institution": "UERJ",
          "thesis_link": "https://drive.google.com/file/d/1MNwRayo4p0hl_dO9qWf_Gqo5Vn-AY2Fy/view?usp=sharing", "github_link": "", "tags": ["Data Analysis"]
        },
        { "name": "Caio Marcos Muniz Grasso da Silva",
          "level": "Graduação",
          "project": "Classificação de gêneros musicais utilizando visão computacional",
          "status": "Concluído",
          "period": "2024.1", "institution": "UERJ",
          "thesis_link": "https://drive.google.com/file/d/1yOVq1OICFZay5C2xVfHXBhccPgS4qF4q/view?usp=sharing", "github_link": "", "tags": ["Deep Learning", "Computer Vision"]
        },
        { "name": "Gustavo Fonseca Boaretto",
          "level": "Graduação",
          "project": "Modelagem de previsão de cota em rios da Região Norte do Brasil com séries temporais e machine learning",
          "status": "Concluído",
          "period": "2025.1", "institution": "UERJ",
          "thesis_link": "https://drive.google.com/file/d/1kDVvdET_QCBZd-SVqQd_lpcuO0xYl5P0/view?usp=sharing", "github_link": "", "tags": ["Deep Learning", "Time Series Analysis"]
        },
        { "name": "Jhonata Ferreira Lima",
          "level": "Graduação",
          "project": "Detecção de pastoreio em sistemas ILP com deep learning e sensoriamento remoto",
          "status": "Concluído",
          "period": "2025.2", "institution": "UERJ",
          "thesis_link": "https://drive.google.com/file/d/1WZ1CLiNLMLT_2VVIw39bsoHWAqljqeP7/view?usp=sharing", "github_link": "", "tags": ["Deep Learning", "Remote Sensing"]
        },
        { "name": "João Victor Monteiro de Macedo",
          "level": "Graduação",
          "project": "Deep learning aplicado à identificação da morfologia de implantes dentários a partir de imagens radiográficas",
          "status": "Concluído",
          "period": "2025.2", "institution": "UERJ",
          "thesis_link": "https://drive.google.com/file/d/1lubGiS6lq7CN0QP9WyHDG5ptlQQHyep1/view?usp=drive_link", "github_link": "", "tags": ["Deep Learning", "Computer Vision"]
        },
        { "name": "Larissa Trindade de Araujo Tredinnick",
          "level": "Graduação",
          "project": "Trindade: uma plataforma para gerenciamento de projetos",
          "status": "Concluído",
          "period": "2023.2", "institution": "UERJ",
          "thesis_link": "https://drive.google.com/file/d/1Jbk9xDW6mnd7W-BnNEkQ594I8k13D3Em/view?usp=sharing", "github_link": "", "tags": ["Software Development"]
        },
        { "name": "Luan Silva Teles",
          "level": "Graduação",
          "project": "Arquitetura e Engenharia de Dados para Monitoramento Climático em Tempo Real da Cidade do Rio de Janeiro",
          "status": "Concluído",
          "period": "2025.1", "institution": "UERJ",
          "thesis_link": "https://drive.google.com/file/d/1uuBBCC-xX0vcuIIQsMkWYlPt-1pZG4Pu/view?usp=sharing", "github_link": "", "tags": ["Data Architecture", "Data Engineering"]
        },
        { "name": "Luis Davi Lopes Carneiro",
          "level": "Graduação",
          "project": "Processo Automático de Extração de Informações de Demonstrações Financeiras usando Grandes Modelos de Linguagem",
          "status": "Em andamento",
          "period": "2026.1", "institution": "UERJ",
          "thesis_link": "", "github_link": "", "tags": ["Deep Learning", "Natural Language Processing"]
        },
        { "name": "Pedro Roncoli Sarmet Moreira",
          "level": "Graduação",
          "project": "ContraGolpes - Um site informativo sobre golpes e fraudes mais comuns na internet",
          "status": "Concluído",
          "period": "2023.2", "institution": "UERJ",
          "thesis_link": "https://drive.google.com/file/d/1VTnpDNBC1y9UOx58XxKukTOftg8ZQk6B/view?usp=sharing", "github_link": "", "tags": ["Deep Learning", "Time Series Analysis"]
        },
        { "name": "Roberta Ramos Vieira Rocha",
          "level": "Graduação",
          "project": "Análise de dados do Sistema de Informações sobre Nascidos Vivos (SINASC)",
          "status": "Concluído",
          "period": "2025.1", "institution": "UERJ",
          "thesis_link": "https://drive.google.com/file/d/1tZAy3IdxRMLfuNqs0i8Q7jZY9w3ldb9P/view?usp=sharing", "github_link": "", "tags": ["Data Analysis", "Public Health"]
        },
        { "name": "Rômulo Rizo Cabral",
          "level": "Graduação",
          "project": "SymbioFin: Automação de Relatórios de Análise Fundamentalista Utilizando Sistemas Neuro-Simbólicos e LLMs",
          "status": "Concluído",
          "period": "2025.2", "institution": "UERJ",
          "thesis_link": "https://drive.google.com/file/d/13IjhnDJG6V0nCIrwnjLl-o7_--H7hUYW/view?usp=sharing", "github_link": "", "tags": ["Deep Learning", "Natural Language Processing"]
        },
        { "name": "Tiago Rodrigues de Souza",
          "level": "Graduação",
          "project": "Sistema de Respostas Automatizadas para Regulamentos Universitários usando Grandes Modelos de Linguagem",
          "status": "Concluído",
          "period": "2025.1", "institution": "UERJ",
          "thesis_link": "https://drive.google.com/file/d/13W0dEB0dkGfNy_SkFRF3ieUX0Z8cGuWv/view?usp=sharing", "github_link": "", "tags": ["Deep Learning", "Natural Language Processing"]
        },
        { "name": "Pedro Henrique Monteiro Guedes",
          "level": "Mestrado",
          "project": "Classificação de emissões acústicas de navios com redes neurais",
          "status": "Concluído",
          "period": "2025.2", "institution": "UERJ",
          "thesis_link": "", "github_link": "", "tags": ["Deep Learning", "Computer Vision"]
        },
        { "name": "Caio Grasso Muniz",
          "level": "Mestrado",
          "project": "Otimização com agregador fuzzy para busca de hiperparâmetros em redes neurais",
          "status": "Em andamento",
          "period": "2026.1", "institution": "UERJ",
          "thesis_link": "", "github_link": "", "tags": ["Deep Learning", "Fuzzy Logic"]
        },
        { "name": "Marcelo Aguiar",
          "level": "Mestrado",
          "project": "Q-MHNAS: Busca de arquitetura neural Multi-Head com inspiração quântica",
          "status": "Em andamento",
          "period": "2026.1", "institution": "UERJ",
          "thesis_link": "", "github_link": "", "tags": ["Deep Learning", "Fuzzy Logic"]
        }
    ],
    "publicacoes": [
        {
            "titulo": "On the intelligent control design of an agricultural mobile robot for cotton crop monitoring",
            "revista": "2019 12th International Conference on Developments in eSystems Engineering (DeSE)",
            "link": "https://ieeexplore.ieee.org/abstract/document/9073410/"
        },
        {
            "titulo": "Comparative study of computer vision models for insect pest identification in complex backgrounds",
            "revista": "2019 12th International Conference on Developments in eSystems Engineering (DeSE)",
            "link": "https://ieeexplore.ieee.org/abstract/document/9073250/"
        },
        {
            "titulo": "Automatic generation of fuzzy inference systems for multivariate time series forecasting",
            "revista": "Fuzzy Sets and Systems, 2023",
            "link": "https://www.sciencedirect.com/science/article/pii/S0165011423003020"
        },
        {
            "titulo": "Out-of-distribution detection in deep learning models: A feature space-based approach",
            "revista": "2023 International Joint Conference on Neural Networks (IJCNN)",
            "link": "https://ieeexplore.ieee.org/abstract/document/10191711/"
        },
        {
            "titulo": "Outlier exposure for open set crop recognition from multitemporal image sequences",
            "revista": "IEEE Geoscience and Remote Sensing Letters, 2023",
            "link": "https://ieeexplore.ieee.org/abstract/document/10042432/"
        },
        {
            "titulo": "Sistema de navegação autônoma para o robô agrícola soybot",
            "revista": "XV Simpósio Brasileiro de Automação Inteligente, 2021",
            "link": "https://sba.org.br/open_journal_systems/index.php/sbai/article/view/2646"
        },
        {
            "titulo": "A neuroevolutionary approach for system identification",
            "revista": "Journal of Control, Automation and Electrical Systems, 2023",
            "link": "https://link.springer.com/article/10.1007/s40313-023-01061-x"
        },
        {
            "titulo": "Gaussian-based approach for out-of-distribution detection in deep learning",
            "revista": "Engineering Applications of Neural Networks, 2023",
            "link": "https://link.springer.com/chapter/10.1007/978-3-031-34204-2_26"
        },
        {
            "titulo": "A fuzzy-based multi-objective optimization applied to analog circuits for fuzzy systems",
            "revista": "SN Computer Science, 2023",
            "link": "https://link.springer.com/article/10.1007/s42979-023-02143-y"
        }
    ]
});
