window.portfolioData = window.portfolioData || {};
Object.assign(window.portfolioData, {
    "bio": {
        "paragrafos": [
            {
                "en": "Thiago Medeiros holds a Ph.D. in Electrical Engineering from PUC-Rio and teaches at UERJ's Department of Systems and Computer Engineering (DESC) and at PUC-Rio's Department of Electrical Engineering. His research covers <strong>deep learning</strong>, <strong>computer vision</strong>, <strong>out-of-distribution detection</strong> and <strong>large language models</strong>, with applications ranging from agricultural robotics to neuro-symbolic systems. He advises undergraduate and master's students at both universities.",
                "pt": "Thiago Medeiros é doutor em Engenharia Elétrica pela PUC-Rio e professor do Departamento de Engenharia de Sistemas e Computação (DESC) da UERJ e do Departamento de Engenharia Elétrica da PUC-Rio. Sua pesquisa envolve <strong>deep learning</strong>, <strong>visão computacional</strong>, <strong>detecção de out-of-distribution</strong> e <strong>grandes modelos de linguagem</strong>, com aplicações que vão da robótica agrícola a sistemas neuro-simbólicos. Orienta alunos de graduação e mestrado nas duas universidades."
            }
        ]
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
    // Fallback only: the home page reads the "Eventos" tab of the content sheet live.
    "events": [],
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
    // Fallback snapshot of the "Orientação" tab (2026-10-15); the home page reads the sheet live.
    "students": [
        {"name": "Gustavo Boaretto", "institution": "UERJ", "level": "Graduação", "title": "", "situacao": "Concluiu"},
        {"name": "Jhonata", "institution": "UERJ", "level": "Graduação", "title": "", "situacao": "Concluiu"},
        {"name": "Tiago", "institution": "UERJ", "level": "Graduação", "title": "", "situacao": "Concluiu"},
        {"name": "Andrey", "institution": "UERJ", "level": "Graduação", "title": "", "situacao": "Concluiu"},
        {"name": "Dayvid", "institution": "UERJ", "level": "Graduação", "title": "", "situacao": "Concluiu"},
        {"name": "João Félix", "institution": "UERJ", "level": "Graduação", "title": "", "situacao": "B"},
        {"name": "Luan Teles", "institution": "UERJ", "level": "Graduação", "title": "", "situacao": "Concluiu"},
        {"name": "Lucas Lima", "institution": "UERJ", "level": "Graduação", "title": "", "situacao": "B"},
        {"name": "Roberta", "institution": "UERJ", "level": "Graduação", "title": "", "situacao": "Concluiu"},
        {"name": "Rômulo", "institution": "UERJ", "level": "Graduação", "title": "", "situacao": "Concluiu"},
        {"name": "Luis Davi", "institution": "UERJ", "level": "Graduação", "title": "", "situacao": "B"},
        {"name": "Pedro", "institution": "UERJ", "level": "Graduação", "title": "", "situacao": "A"},
        {"name": "Alexandre", "institution": "UERJ", "level": "Graduação", "title": "", "situacao": "B"},
        {"name": "Marco", "institution": "UERJ", "level": "Graduação", "title": "", "situacao": "B"},
        {"name": "João Monteiro", "institution": "UERJ", "level": "Graduação", "title": "", "situacao": "Concluiu"},
        {"name": "Eduardo Novelino", "institution": "UERJ", "level": "Graduação", "title": "", "situacao": "B"},
        {"name": "Rodrigo", "institution": "UERJ", "level": "Graduação", "title": "", "situacao": "B"},
        {"name": "Gabriel Ibner", "institution": "UERJ", "level": "Graduação", "title": "", "situacao": "B"},
        {"name": "Igor", "institution": "UERJ", "level": "Graduação", "title": "", "situacao": "B"},
        {"name": "João Pedro", "institution": "UERJ", "level": "Graduação", "title": "", "situacao": "A"},
        {"name": "Thiago Mello", "institution": "UERJ", "level": "Graduação", "title": "", "situacao": "Pré A"},
        {"name": "Giulia", "institution": "UERJ", "level": "Graduação", "title": "", "situacao": "A"},
        {"name": "Davi Nascimento", "institution": "UERJ", "level": "Graduação", "title": "", "situacao": "A"},
        {"name": "Marcelo", "institution": "PUC-Rio", "level": "Mestrado", "title": "", "situacao": "Concluiu"},
        {"name": "Kelvin", "institution": "PUC-Rio", "level": "Graduação", "title": "", "situacao": "B"},
        {"name": "Ana", "institution": "PUC-Rio", "level": "Graduação", "title": "", "situacao": "B"},
        {"name": "Vilson Wenis", "institution": "PUC-Rio", "level": "Mestrado", "title": "", "situacao": ""},
        {"name": "Pedro Guedes", "institution": "UERJ", "level": "Mestrado", "title": "", "situacao": "Concluiu"},
        {"name": "João Pedro", "institution": "PUC-Rio", "level": "Mestrado", "title": "", "situacao": ""},
        {"name": "Gustavo Rohenkhol", "institution": "PUC-Rio", "level": "Mestrado", "title": "", "situacao": ""},
        {"name": "Caio Grasso", "institution": "UERJ", "level": "Mestrado", "title": "", "situacao": ""},
        {"name": "Renan Gomes", "institution": "UERJ", "level": "Mestrado", "title": "", "situacao": ""}
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
