window.portfolioData = window.portfolioData || {};
window.portfolioData.disciplinas = [
    // ===================== UERJ =====================
    // Tópicos Especiais A — 2027.1 (gerado a partir de topicos_a/plano_2027-1.md)
    {
        "id": "topicos-a",
        "institution": "UERJ",
        "gamified": true,
        "nome": "Tópicos Especiais A",
        "descricao": "Deep Learning aplicado em PyTorch: de redes neurais a LLMs, passando por CNNs, visão aplicada, sequências, Transformers e modelos generativos.",
        "icone": "fa-brain",
        "rota": "disciplinas/uerj-topicos-a.html",
        "cronograma_link": "#",
        "cronograma": [
            {
                "data": "A definir",
                "topico": "Aula 01 — início (calendário UERJ 2027.1)",
                "tipo": "aula"
            },
            {
                "data": "A definir",
                "topico": "Proposta do projeto final (junto com o Lab 3)",
                "tipo": "entrega"
            },
            {
                "data": "A definir",
                "topico": "P1 — cumulativa, blocos 1–6",
                "tipo": "prova",
                "pontuacao": 0.33
            },
            {
                "data": "A definir",
                "topico": "Apresentações do projeto final",
                "tipo": "entrega",
                "pontuacao": 0.33
            },
            {
                "data": "Contínuo",
                "topico": "Gamificação (quests, desafios e labs)",
                "tipo": "aula",
                "pontuacao": 0.33
            }
        ],
        "gamificacao": {
            "xp_meta": 2880,
            "niveis": [
                {
                    "nome": "🧠 Perceptron",
                    "xp": 0
                },
                {
                    "nome": "🔗 MLP",
                    "xp": 400
                },
                {
                    "nome": "🖼️ CNN",
                    "xp": 1000
                },
                {
                    "nome": "🔁 LSTM",
                    "xp": 1700
                },
                {
                    "nome": "⚡ Transformer",
                    "xp": 2400
                },
                {
                    "nome": "🌐 Foundation Model",
                    "xp": 3000
                }
            ],
            "badge_bonus_xp": 30,
            "plano": "topicos_a/plano_2027-1.md"
        },
        "badges": [
            {
                "id": "ta-badge-b1",
                "titulo": "Bloco 1 · Fundamentos",
                "icone": "fa-brain",
                "bloco": 1
            },
            {
                "id": "ta-badge-b2",
                "titulo": "Bloco 2 · Convolucional",
                "icone": "fa-border-all",
                "bloco": 2
            },
            {
                "id": "ta-badge-b3",
                "titulo": "Bloco 3 · Visão Aplicada",
                "icone": "fa-eye",
                "bloco": 3
            },
            {
                "id": "ta-badge-b4",
                "titulo": "Bloco 4 · Sequencial",
                "icone": "fa-wave-square",
                "bloco": 4
            },
            {
                "id": "ta-badge-b5",
                "titulo": "Bloco 5 · Transformer",
                "icone": "fa-bolt",
                "bloco": 5
            },
            {
                "id": "ta-badge-b6",
                "titulo": "Bloco 6 · Generativo",
                "icone": "fa-wand-magic-sparkles",
                "bloco": 6
            }
        ],
        "aulas": [
            {
                "titulo": "Aula 01: Do neurônio ao MLP",
                "link": "topicos_a/2027/slides/aula01.html",
                "resumo": "Apresentação do curso; perceptron, o problema do XOR, MLP, ativações e aproximação universal."
            },
            {
                "titulo": "Aula 02: Funções de perda e backpropagation",
                "link": "topicos_a/2027/slides/aula02.html",
                "resumo": "MSE e entropia cruzada, gradiente descendente, grafo computacional, backprop e autograd."
            },
            {
                "titulo": "Aula 03: Treinando redes: otimização e regularização",
                "link": "topicos_a/2027/slides/aula03.html",
                "resumo": "Momentum, Adam/AdamW, LR schedules, inicialização, viés-variância, L2, early stopping, dropout e BatchNorm."
            },
            {
                "titulo": "Aula 04: Lab 1: MLP em PyTorch",
                "link": "topicos_a/2027/slides/aula04.html",
                "resumo": "Pipeline completo de treino no FashionMNIST e experimentos controlados com otimizadores e regularização."
            },
            {
                "titulo": "Aula 05: Convolução e pooling",
                "link": "topicos_a/2027/slides/aula05.html",
                "resumo": "Por que MLPs escalam mal com imagens; convolução, padding, stride, canais, pooling e campo receptivo."
            },
            {
                "titulo": "Aula 06: Arquiteturas: de LeNet a ResNet",
                "link": "topicos_a/2027/slides/aula06.html",
                "resumo": "LeNet, AlexNet, VGG, Inception, ResNet e conexões residuais, MobileNet, EfficientNet, ConvNeXt e ViT."
            },
            {
                "titulo": "Aula 07: Transfer learning e data augmentation",
                "link": "topicos_a/2027/slides/aula07.html",
                "resumo": "Feature extraction vs. fine-tuning, LRs discriminativos, augmentation com transforms.v2 e domain shift."
            },
            {
                "titulo": "Aula 08: Lab 2: Fine-tuning de CNN",
                "link": "topicos_a/2027/slides/aula08.html",
                "resumo": "Do zero vs. feature extraction vs. fine-tuning completo de uma ResNet-18 no Oxford-IIIT Pets."
            },
            {
                "titulo": "Aula 09: Detecção de objetos",
                "link": "topicos_a/2027/slides/aula09.html",
                "resumo": "Bounding boxes, IoU, NMS, mAP, família R-CNN e YOLO na prática."
            },
            {
                "titulo": "Aula 10: Segmentação",
                "link": "topicos_a/2027/slides/aula10.html",
                "resumo": "Semântica, instância e panóptica; FCN, U-Net, Dice/IoU, Mask R-CNN e SAM."
            },
            {
                "titulo": "Aula 11: Avaliação, interpretabilidade e robustez",
                "link": "topicos_a/2027/slides/aula11.html",
                "resumo": "Métricas além da acurácia, calibração, Grad-CAM, shortcut learning, exemplos adversariais e ética. Anúncio do projeto final."
            },
            {
                "titulo": "Aula 12: Lab 3: Detecção ou segmentação",
                "link": "topicos_a/2027/slides/aula12.html",
                "resumo": "Trilha D (fine-tuning de YOLO) ou trilha S (U-Net no Oxford-IIIT Pets), com análise de falhas."
            },
            {
                "titulo": "Aula 13: Texto como dados: tokenização e embeddings",
                "link": "topicos_a/2027/slides/aula13.html",
                "resumo": "Tokenização (BPE, WordPiece), TF-IDF como baseline, nn.Embedding, word2vec e viés em embeddings."
            },
            {
                "titulo": "Aula 14: RNN, LSTM e GRU",
                "link": "topicos_a/2027/slides/aula14.html",
                "resumo": "Recorrência, BPTT, vanishing/exploding gradients, portas da LSTM, GRU, bidirecionais e padding."
            },
            {
                "titulo": "Aula 15: Mecanismo de atenção",
                "link": "topicos_a/2027/slides/aula15.html",
                "resumo": "Gargalo do seq2seq, atenção de Bahdanau e Luong, query/key/value e o caminho até o Transformer."
            },
            {
                "titulo": "Aula 16: Lab 4: LSTM vs. atenção",
                "link": "topicos_a/2027/slides/aula16.html",
                "resumo": "TF-IDF vs. BiLSTM vs. BiLSTM com atenção no IMDB, com visualização dos pesos de atenção."
            },
            {
                "titulo": "Aula 17: A arquitetura Transformer",
                "link": "topicos_a/2027/slides/aula17.html",
                "resumo": "Self-attention matricial, escala por √d, multi-head, codificação posicional, bloco completo, máscaras e custo O(n²)."
            },
            {
                "titulo": "Aula 18: Pré-treino: BERT, GPT, T5 e ViT",
                "link": "topicos_a/2027/slides/aula18.html",
                "resumo": "Pré-treino auto-supervisionado, MLM vs. modelagem causal, T5, ViT, CLIP e modelos em português."
            },
            {
                "titulo": "Aula 19: Ecossistema Hugging Face e fine-tuning",
                "link": "topicos_a/2027/slides/aula19.html",
                "resumo": "Hub, model cards e licenças, pipeline, AutoTokenizer/AutoModel, datasets, Trainer e escolha de modelos."
            },
            {
                "titulo": "Aula 20: Lab 5: Fine-tuning de BERT",
                "link": "topicos_a/2027/slides/aula20.html",
                "resumo": "Fine-tuning de um Transformer no mesmo split do Lab 4, com análise de custo e latência."
            },
            {
                "titulo": "Aula 21: Modelos generativos: AE, VAE, GAN e difusão",
                "link": "topicos_a/2027/slides/aula21.html",
                "resumo": "Autoencoders, VAE e reparametrização, GANs, difusão (DDPM), Stable Diffusion e ética."
            },
            {
                "titulo": "Aula 22: Como LLMs funcionam",
                "link": "topicos_a/2027/slides/aula22.html",
                "resumo": "Decodificação (temperatura, top-k, top-p), leis de escala, SFT, RLHF/DPO, KV cache, raciocínio e limitações."
            },
            {
                "titulo": "Aula 23: Usando LLMs: prompting, RAG, LoRA e ética",
                "link": "topicos_a/2027/slides/aula23.html",
                "resumo": "Prompting estruturado, embeddings e busca vetorial, RAG, LoRA/QLoRA, agentes, ética e custo."
            },
            {
                "titulo": "Aula 24: Lab 6: Sistema RAG",
                "link": "topicos_a/2027/slides/aula24.html",
                "resumo": "Sistema RAG com modelos abertos e avaliação sistemática com perguntas de resposta conhecida."
            }
        ],
        "notebooks": [
            {
                "titulo": "Lab 1: MLP em PyTorch",
                "link": "topicos_a/2027/notebooks/lab01_mlp_fashionmnist.ipynb",
                "resumo": "Pipeline completo de treino no FashionMNIST e experimentos controlados com otimizadores e regularização."
            },
            {
                "titulo": "Lab 2: Fine-tuning de CNN",
                "link": "topicos_a/2027/notebooks/lab02_transfer_learning.ipynb",
                "resumo": "Do zero vs. feature extraction vs. fine-tuning completo de uma ResNet-18 no Oxford-IIIT Pets."
            },
            {
                "titulo": "Lab 3: Detecção ou segmentação",
                "link": "topicos_a/2027/notebooks/lab03_deteccao_segmentacao.ipynb",
                "resumo": "Trilha D (fine-tuning de YOLO) ou trilha S (U-Net no Oxford-IIIT Pets), com análise de falhas."
            },
            {
                "titulo": "Lab 4: LSTM vs. atenção",
                "link": "topicos_a/2027/notebooks/lab04_lstm_atencao.ipynb",
                "resumo": "TF-IDF vs. BiLSTM vs. BiLSTM com atenção no IMDB, com visualização dos pesos de atenção."
            },
            {
                "titulo": "Lab 5: Fine-tuning de BERT",
                "link": "topicos_a/2027/notebooks/lab05_finetuning_bert.ipynb",
                "resumo": "Fine-tuning de um Transformer no mesmo split do Lab 4, com análise de custo e latência."
            },
            {
                "titulo": "Lab 6: Sistema RAG",
                "link": "topicos_a/2027/notebooks/lab06_rag.ipynb",
                "resumo": "Sistema RAG com modelos abertos e avaliação sistemática com perguntas de resposta conhecida."
            }
        ],
        "quests": [
            {
                "id": "ta-a01-quest",
                "titulo": "Aula 01 — Quest (🎲 Place your Bets): XOR: quem resolve?",
                "descricao": "Apostar se cada configuração (perceptron, MLP com/sem ativação) resolve o XOR. Registrada pelo professor em sala.",
                "tipo": "quest",
                "xp": 50,
                "bloco": 1,
                "aula": 1
            },
            {
                "id": "ta-a01-desafio",
                "titulo": "Aula 01 — Desafio (🔍 Explore): A espiral no TensorFlow Playground",
                "descricao": "Resolva o dataset espiral no playground.tensorflow.org com o menor número de neurônios possível. Registre a configuração (camadas, ativação, LR, features), envie um print e descreva em 1 parágrafo o que acontece com ativação Linear.",
                "tipo": "desafio",
                "xp": 70,
                "bloco": 1,
                "aula": 1,
                "mecanismo": "auto-desafio",
                "link": "topicos_a/2027/desafios/desafio.html?id=ta-a01-desafio",
                "slide": "topicos_a/2027/slides/aula01.html",
                "prazo_dias": 7
            },
            {
                "id": "ta-a02-quest",
                "titulo": "Aula 02 — Quest (🗣️ Teach it Back): Explique a regra da cadeia",
                "descricao": "Em duplas, explicar o backprop de uma rede pequena com checklist. Registrada pelo professor em sala.",
                "tipo": "quest",
                "xp": 50,
                "bloco": 1,
                "aula": 2
            },
            {
                "id": "ta-a02-desafio",
                "titulo": "Aula 02 — Desafio (💻 Implement): Backprop em NumPy",
                "descricao": "Implemente em NumPy o forward e o backward de um MLP D→16→3 (ReLU + softmax + entropia cruzada) e verifique com np.allclose que os gradientes batem com o autograd do PyTorch usando os mesmos pesos.",
                "tipo": "desafio",
                "xp": 70,
                "bloco": 1,
                "aula": 2,
                "mecanismo": "auto-desafio",
                "link": "topicos_a/2027/desafios/desafio.html?id=ta-a02-desafio",
                "slide": "topicos_a/2027/slides/aula02.html",
                "prazo_dias": 7
            },
            {
                "id": "ta-a03-quest",
                "titulo": "Aula 03 — Quest (📉 Diagnose the Curve): Quatro pacientes",
                "descricao": "Diagnosticar curvas de treino/validação e prescrever correções. Registrada pelo professor em sala.",
                "tipo": "quest",
                "xp": 50,
                "bloco": 1,
                "aula": 3
            },
            {
                "id": "ta-a03-desafio",
                "titulo": "Aula 03 — Desafio (📖 Study): O paper do Dropout",
                "descricao": "Leia as seções 1–2 de Srivastava et al. (JMLR 2014) e responda: (1) por que dropout se parece com treinar um ensemble? (2) o que muda entre treino e inferência, e por quê? (3) em que situação você não usaria dropout?",
                "tipo": "desafio",
                "xp": 70,
                "bloco": 1,
                "aula": 3,
                "mecanismo": "auto-desafio",
                "link": "topicos_a/2027/desafios/desafio.html?id=ta-a03-desafio",
                "slide": "topicos_a/2027/slides/aula03.html",
                "prazo_dias": 7
            },
            {
                "id": "ta-lab1-checkpoint",
                "titulo": "Lab 1 — Checkpoint de bancada: MLP em PyTorch",
                "descricao": "Loop de treino rodando com acurácia de validação ≥ 85% e curvas plotadas. Validado pelo professor em sala.",
                "tipo": "lab-checkpoint",
                "xp": 60,
                "bloco": 1,
                "aula": 4
            },
            {
                "id": "ta-lab1-entrega",
                "titulo": "Lab 1 — Entrega: MLP em PyTorch",
                "descricao": "Notebook executado com a tabela das 3 configurações, curvas, análise por configuração e acurácia de teste da melhor.",
                "tipo": "lab-entrega",
                "xp": 180,
                "bloco": 1,
                "aula": 4,
                "mecanismo": "auto-desafio",
                "link": "topicos_a/2027/desafios/desafio.html?id=ta-lab1-entrega",
                "slide": "topicos_a/2027/slides/aula04.html",
                "notebook": "topicos_a/2027/notebooks/lab01_mlp_fashionmnist.ipynb",
                "prazo_dias": 7
            },
            {
                "id": "ta-boss1",
                "titulo": "👹 Boss 1 — Micrograd",
                "descricao": "Implemente um mini-autograd escalar (classe Value com +, *, **, tanh/ReLU e backward), construa um MLP com ele, treine em make_moons e verifique os gradientes contra o PyTorch. Opcional.",
                "tipo": "boss",
                "xp": 150,
                "bonus": true,
                "bloco": 1,
                "aula": 4,
                "mecanismo": "auto-desafio",
                "link": "topicos_a/2027/desafios/desafio.html?id=ta-boss1",
                "slide": "topicos_a/2027/slides/aula04.html",
                "prazo_dias": 14
            },
            {
                "id": "ta-a05-quest",
                "titulo": "Aula 05 — Quest (⚡ Lightning Round): Shapes e parâmetros",
                "descricao": "Quiz cronometrado de cálculo de shapes e parâmetros de camadas conv. Registrada pelo professor em sala.",
                "tipo": "quest",
                "xp": 50,
                "bloco": 2,
                "aula": 5
            },
            {
                "id": "ta-a05-desafio",
                "titulo": "Aula 05 — Desafio (🔍 Explore): CNN Explainer",
                "descricao": "No CNN Explainer (poloclub.github.io/cnn-explainer), registre: (1) o que os feature maps da primeira e da última conv detectam em 2 imagens; (2) o efeito de padding e stride, conferindo com a fórmula; (3) onde a resolução espacial é perdida.",
                "tipo": "desafio",
                "xp": 70,
                "bloco": 2,
                "aula": 5,
                "mecanismo": "auto-desafio",
                "link": "topicos_a/2027/desafios/desafio.html?id=ta-a05-desafio",
                "slide": "topicos_a/2027/slides/aula05.html",
                "prazo_dias": 7
            },
            {
                "id": "ta-a06-quest",
                "titulo": "Aula 06 — Quest (📊 Rank it): Ordene as arquiteturas",
                "descricao": "Ordenar 6 arquiteturas por ano, parâmetros e acurácia no ImageNet. Registrada pelo professor em sala.",
                "tipo": "quest",
                "xp": 50,
                "bloco": 2,
                "aula": 6
            },
            {
                "id": "ta-a06-desafio",
                "titulo": "Aula 06 — Desafio (📖 Study): O paper da ResNet",
                "descricao": "Leia as seções 3.1–3.2 de He et al. (CVPR 2016) e responda: (1) o que é o problema de degradação e por que não é overfitting? (2) por que aprender o resíduo F(x) é mais fácil? (3) o que fazer quando x e F(x) têm dimensões diferentes?",
                "tipo": "desafio",
                "xp": 70,
                "bloco": 2,
                "aula": 6,
                "mecanismo": "auto-desafio",
                "link": "topicos_a/2027/desafios/desafio.html?id=ta-a06-desafio",
                "slide": "topicos_a/2027/slides/aula06.html",
                "prazo_dias": 7
            },
            {
                "id": "ta-a07-quest",
                "titulo": "Aula 07 — Quest (🏗️ Architect): Quatro clientes, quatro estratégias",
                "descricao": "Propor estratégia de transferência e augmentation para cenários reais. Registrada pelo professor em sala.",
                "tipo": "quest",
                "xp": 50,
                "bloco": 2,
                "aula": 7
            },
            {
                "id": "ta-a07-desafio",
                "titulo": "Aula 07 — Desafio (💻 Implement): Seu pipeline de augmentation",
                "descricao": "Monte um pipeline com torchvision.transforms.v2 (≥ 4 transformações) para um dataset à sua escolha, gere uma grade 4×4 da mesma imagem aumentada, justifique cada transformação e cite uma que não faria sentido no domínio.",
                "tipo": "desafio",
                "xp": 70,
                "bloco": 2,
                "aula": 7,
                "mecanismo": "auto-desafio",
                "link": "topicos_a/2027/desafios/desafio.html?id=ta-a07-desafio",
                "slide": "topicos_a/2027/slides/aula07.html",
                "prazo_dias": 7
            },
            {
                "id": "ta-lab2-checkpoint",
                "titulo": "Lab 2 — Checkpoint de bancada: Fine-tuning de CNN",
                "descricao": "Feature extraction treinando na GPU e superando o modelo do zero na validação. Validado pelo professor em sala.",
                "tipo": "lab-checkpoint",
                "xp": 60,
                "bloco": 2,
                "aula": 8
            },
            {
                "id": "ta-lab2-entrega",
                "titulo": "Lab 2 — Entrega: Fine-tuning de CNN",
                "descricao": "Notebook com a tabela das 3 estratégias, curvas, matriz de confusão (3 raças mais confundidas) e 5 erros comentados.",
                "tipo": "lab-entrega",
                "xp": 180,
                "bloco": 2,
                "aula": 8,
                "mecanismo": "auto-desafio",
                "link": "topicos_a/2027/desafios/desafio.html?id=ta-lab2-entrega",
                "slide": "topicos_a/2027/slides/aula08.html",
                "notebook": "topicos_a/2027/notebooks/lab02_transfer_learning.ipynb",
                "prazo_dias": 7
            },
            {
                "id": "ta-boss2",
                "titulo": "👹 Boss 2 — Degradação",
                "descricao": "No CIFAR-10, treine redes planas de 20 e 56 camadas e ResNets de 20 e 56 camadas com o mesmo orçamento e reproduza (ou não) a Figura 1 do paper da ResNet. Opcional.",
                "tipo": "boss",
                "xp": 150,
                "bonus": true,
                "bloco": 2,
                "aula": 8,
                "mecanismo": "auto-desafio",
                "link": "topicos_a/2027/desafios/desafio.html?id=ta-boss2",
                "slide": "topicos_a/2027/slides/aula08.html",
                "prazo_dias": 14
            },
            {
                "id": "ta-a09-quest",
                "titulo": "Aula 09 — Quest (🃏 Two Truths and a Lie): Detecção em três rodadas",
                "descricao": "Encontrar a afirmação falsa sobre detecção e explicar o erro. Registrada pelo professor em sala.",
                "tipo": "quest",
                "xp": 50,
                "bloco": 3,
                "aula": 9
            },
            {
                "id": "ta-a09-desafio",
                "titulo": "Aula 09 — Desafio (🔍 Explore): YOLO no seu dia a dia",
                "descricao": "Rode um YOLO pré-treinado em 5 fotos (ou um vídeo) tiradas por você. Registre 3 acertos e 3 falhas com hipóteses (oclusão, escala, classe fora do COCO) e teste o efeito de conf=0,1 vs. 0,5.",
                "tipo": "desafio",
                "xp": 70,
                "bloco": 3,
                "aula": 9,
                "mecanismo": "auto-desafio",
                "link": "topicos_a/2027/desafios/desafio.html?id=ta-a09-desafio",
                "slide": "topicos_a/2027/slides/aula09.html",
                "prazo_dias": 7
            },
            {
                "id": "ta-a10-quest",
                "titulo": "Aula 10 — Quest (🎲 Place your Bets): Adivinhe o modelo",
                "descricao": "Associar máscaras preditas aos modelos que as produziram. Registrada pelo professor em sala.",
                "tipo": "quest",
                "xp": 50,
                "bloco": 3,
                "aula": 10
            },
            {
                "id": "ta-a10-desafio",
                "titulo": "Aula 10 — Desafio (🎨 Create): O mapa das tarefas de visão",
                "descricao": "Crie um diagrama de 1 página comparando classificação, detecção, segmentação semântica e de instância: entrada/saída (shape), arquitetura exemplo, loss e métrica, caso de uso real.",
                "tipo": "desafio",
                "xp": 70,
                "bloco": 3,
                "aula": 10,
                "mecanismo": "auto-desafio",
                "link": "topicos_a/2027/desafios/desafio.html?id=ta-a10-desafio",
                "slide": "topicos_a/2027/slides/aula10.html",
                "prazo_dias": 7
            },
            {
                "id": "ta-a11-quest",
                "titulo": "Aula 11 — Quest (📉 Diagnose the Curve): Modelos suspeitos",
                "descricao": "Diagnosticar desbalanceamento, descalibração e shortcuts a partir de prontuários. Registrada pelo professor em sala.",
                "tipo": "quest",
                "xp": 50,
                "bloco": 3,
                "aula": 11
            },
            {
                "id": "ta-a11-desafio",
                "titulo": "Aula 11 — Desafio (💻 Implement): Grad-CAM em fotos suas",
                "descricao": "Aplique Grad-CAM a uma ResNet-50 pré-treinada em 3 imagens suas (top-3 classes + mapa da top-1), procure um caso em que o modelo acerta pelo motivo errado e compare os mapas de duas classes numa mesma foto.",
                "tipo": "desafio",
                "xp": 70,
                "bloco": 3,
                "aula": 11,
                "mecanismo": "auto-desafio",
                "link": "topicos_a/2027/desafios/desafio.html?id=ta-a11-desafio",
                "slide": "topicos_a/2027/slides/aula11.html",
                "prazo_dias": 7
            },
            {
                "id": "ta-lab3-checkpoint",
                "titulo": "Lab 3 — Checkpoint de bancada: Detecção ou segmentação",
                "descricao": "Dataset carregado e visualizado, modelo base avaliado e treino iniciado. Validado pelo professor em sala.",
                "tipo": "lab-checkpoint",
                "xp": 60,
                "bloco": 3,
                "aula": 12
            },
            {
                "id": "ta-lab3-entrega",
                "titulo": "Lab 3 — Entrega: Detecção ou segmentação",
                "descricao": "Notebook com métrica antes/depois, predições × anotações em 6 imagens, 5 falhas com hipóteses e o que mudaria com mais tempo.",
                "tipo": "lab-entrega",
                "xp": 180,
                "bloco": 3,
                "aula": 12,
                "mecanismo": "auto-desafio",
                "link": "topicos_a/2027/desafios/desafio.html?id=ta-lab3-entrega",
                "slide": "topicos_a/2027/slides/aula12.html",
                "notebook": "topicos_a/2027/notebooks/lab03_deteccao_segmentacao.ipynb",
                "prazo_dias": 7
            },
            {
                "id": "ta-boss3",
                "titulo": "👹 Boss 3 — Adversário",
                "descricao": "Implemente FGSM e PGD contra o modelo do Lab 2, plote acurácia × ε, aplique adversarial training e discuta o trade-off entre acurácia limpa e robusta. Opcional.",
                "tipo": "boss",
                "xp": 150,
                "bonus": true,
                "bloco": 3,
                "aula": 12,
                "mecanismo": "auto-desafio",
                "link": "topicos_a/2027/desafios/desafio.html?id=ta-boss3",
                "slide": "topicos_a/2027/slides/aula12.html",
                "prazo_dias": 14
            },
            {
                "id": "ta-proposta",
                "titulo": "📄 Proposta do projeto final",
                "descricao": "1 página: problema, dados, métrica, baseline, blocos usados (≥ 2) e se é individual ou em dupla. Não vale XP: serve para receber feedback cedo.",
                "tipo": "projeto",
                "xp": 0,
                "bloco": 3,
                "aula": 12,
                "mecanismo": "auto-desafio",
                "link": "topicos_a/2027/desafios/desafio.html?id=ta-proposta",
                "slide": "topicos_a/2027/slides/aula12.html",
                "prazo_dias": 7
            },
            {
                "id": "ta-a13-quest",
                "titulo": "Aula 13 — Quest (⚡ Lightning Round): Tokens, vetores e cossenos",
                "descricao": "Quiz relâmpago sobre tokenização, cosseno e embeddings. Registrada pelo professor em sala.",
                "tipo": "quest",
                "xp": 50,
                "bloco": 4,
                "aula": 13
            },
            {
                "id": "ta-a13-desafio",
                "titulo": "Aula 13 — Desafio (🔍 Explore): O preço do português",
                "descricao": "Tokenize um parágrafo em português e sua tradução em inglês com 2 tokenizadores. Monte a tabela tokenizador × língua × tokens × tokens/palavra, mostre 3 quebras estranhas e discuta custo e contexto de LLMs.",
                "tipo": "desafio",
                "xp": 70,
                "bloco": 4,
                "aula": 13,
                "mecanismo": "auto-desafio",
                "link": "topicos_a/2027/desafios/desafio.html?id=ta-a13-desafio",
                "slide": "topicos_a/2027/slides/aula13.html",
                "prazo_dias": 7
            },
            {
                "id": "ta-a14-quest",
                "titulo": "Aula 14 — Quest (🗣️ Teach it Back): Explique as portas",
                "descricao": "Explicar as portas da LSTM com a analogia do caderno e a GRU como versão enxuta. Registrada pelo professor em sala.",
                "tipo": "quest",
                "xp": 50,
                "bloco": 4,
                "aula": 14
            },
            {
                "id": "ta-a14-desafio",
                "titulo": "Aula 14 — Desafio (📖 Study): Understanding LSTM Networks",
                "descricao": "Leia o post de C. Olah (2015) e responda: (1) por que o estado da célula ajuda contra o vanishing gradient? (2) o que acontece com a porta de esquecimento sempre em 1 e sempre em 0? (3) qual a diferença estrutural entre LSTM e GRU e quando escolher cada uma?",
                "tipo": "desafio",
                "xp": 70,
                "bloco": 4,
                "aula": 14,
                "mecanismo": "auto-desafio",
                "link": "topicos_a/2027/desafios/desafio.html?id=ta-a14-desafio",
                "slide": "topicos_a/2027/slides/aula14.html",
                "prazo_dias": 7
            },
            {
                "id": "ta-a15-quest",
                "titulo": "Aula 15 — Quest (🏗️ Architect): Escolha a arquitetura",
                "descricao": "Escolher entre MLP, CNN 1D, LSTM e LSTM+atenção para problemas sequenciais. Registrada pelo professor em sala.",
                "tipo": "quest",
                "xp": 50,
                "bloco": 4,
                "aula": 15
            },
            {
                "id": "ta-a15-desafio",
                "titulo": "Aula 15 — Desafio (🎨 Create): Sua analogia para Q, K, V",
                "descricao": "Crie uma analogia própria para query, key e value em 1 página com diagrama, mapeando scores, softmax e média ponderada, e diga onde a analogia falha.",
                "tipo": "desafio",
                "xp": 70,
                "bloco": 4,
                "aula": 15,
                "mecanismo": "auto-desafio",
                "link": "topicos_a/2027/desafios/desafio.html?id=ta-a15-desafio",
                "slide": "topicos_a/2027/slides/aula15.html",
                "prazo_dias": 7
            },
            {
                "id": "ta-lab4-checkpoint",
                "titulo": "Lab 4 — Checkpoint de bancada: LSTM vs. atenção",
                "descricao": "Split salvo, baseline TF-IDF avaliado e DataLoader com padding funcionando. Validado pelo professor em sala.",
                "tipo": "lab-checkpoint",
                "xp": 60,
                "bloco": 4,
                "aula": 16
            },
            {
                "id": "ta-lab4-entrega",
                "titulo": "Lab 4 — Entrega: LSTM vs. atenção",
                "descricao": "Notebook com a tabela dos 3 modelos, mapas de atenção em 5 reviews e discussão do custo-benefício.",
                "tipo": "lab-entrega",
                "xp": 180,
                "bloco": 4,
                "aula": 16,
                "mecanismo": "auto-desafio",
                "link": "topicos_a/2027/desafios/desafio.html?id=ta-lab4-entrega",
                "slide": "topicos_a/2027/slides/aula16.html",
                "notebook": "topicos_a/2027/notebooks/lab04_lstm_atencao.ipynb",
                "prazo_dias": 7
            },
            {
                "id": "ta-boss4",
                "titulo": "👹 Boss 4 — Machado",
                "descricao": "Treine uma LSTM de caracteres em obras de Machado de Assis (domínio público) e gere 3 trechos de 500 caracteres com temperaturas 0,5, 1,0 e 1,5, comentando a qualidade. Opcional.",
                "tipo": "boss",
                "xp": 150,
                "bonus": true,
                "bloco": 4,
                "aula": 16,
                "mecanismo": "auto-desafio",
                "link": "topicos_a/2027/desafios/desafio.html?id=ta-boss4",
                "slide": "topicos_a/2027/slides/aula16.html",
                "prazo_dias": 14
            },
            {
                "id": "ta-a17-quest",
                "titulo": "Aula 17 — Quest (🎲 Place your Bets): Aposte nos shapes",
                "descricao": "Prever shapes e comportamentos dentro de um bloco Transformer. Registrada pelo professor em sala.",
                "tipo": "quest",
                "xp": 50,
                "bloco": 5,
                "aula": 17
            },
            {
                "id": "ta-a17-desafio",
                "titulo": "Aula 17 — Desafio (💻 Implement): Multi-head attention do zero",
                "descricao": "Implemente scaled dot-product attention e multi-head attention com máscara causal, copie os pesos para nn.MultiheadAttention e verifique com torch.allclose; plote a matriz de atenção com e sem máscara.",
                "tipo": "desafio",
                "xp": 70,
                "bloco": 5,
                "aula": 17,
                "mecanismo": "auto-desafio",
                "link": "topicos_a/2027/desafios/desafio.html?id=ta-a17-desafio",
                "slide": "topicos_a/2027/slides/aula17.html",
                "prazo_dias": 7
            },
            {
                "id": "ta-a18-quest",
                "titulo": "Aula 18 — Quest (🃏 Two Truths and a Lie): BERT, GPT e companhia",
                "descricao": "Encontrar a afirmação falsa sobre as famílias de Transformers. Registrada pelo professor em sala.",
                "tipo": "quest",
                "xp": 50,
                "bloco": 5,
                "aula": 18
            },
            {
                "id": "ta-a18-desafio",
                "titulo": "Aula 18 — Desafio (📖 Study): O paper do BERT",
                "descricao": "Leia a seção 3 de Devlin et al. (NAACL 2019) e responda: (1) por que mascarar 15% e por que nem todos viram [MASK]? (2) como o mesmo modelo é adaptado para classificação vs. QA? (3) por que o BERT não é bom para gerar texto?",
                "tipo": "desafio",
                "xp": 70,
                "bloco": 5,
                "aula": 18,
                "mecanismo": "auto-desafio",
                "link": "topicos_a/2027/desafios/desafio.html?id=ta-a18-desafio",
                "slide": "topicos_a/2027/slides/aula18.html",
                "prazo_dias": 7
            },
            {
                "id": "ta-a19-quest",
                "titulo": "Aula 19 — Quest (📊 Rank it): Ordene os modelos",
                "descricao": "Ordenar modelos do Hub por parâmetros, latência e adequação ao português. Registrada pelo professor em sala.",
                "tipo": "quest",
                "xp": 50,
                "bloco": 5,
                "aula": 19
            },
            {
                "id": "ta-a19-desafio",
                "titulo": "Aula 19 — Desafio (🎨 Create): Ficha comparativa de modelos",
                "descricao": "Para uma tarefa à sua escolha, compare 3 modelos do Hub numa ficha de 1 página (parâmetros, dados de treino, idiomas, licença, métricas, limitações) e escolha um para produção e outro para protótipo.",
                "tipo": "desafio",
                "xp": 70,
                "bloco": 5,
                "aula": 19,
                "mecanismo": "auto-desafio",
                "link": "topicos_a/2027/desafios/desafio.html?id=ta-a19-desafio",
                "slide": "topicos_a/2027/slides/aula19.html",
                "prazo_dias": 7
            },
            {
                "id": "ta-lab5-checkpoint",
                "titulo": "Lab 5 — Checkpoint de bancada: Fine-tuning de BERT",
                "descricao": "Mesmo split carregado, baseline zero-shot avaliado e fine-tuning iniciado. Validado pelo professor em sala.",
                "tipo": "lab-checkpoint",
                "xp": 60,
                "bloco": 5,
                "aula": 20
            },
            {
                "id": "ta-lab5-entrega",
                "titulo": "Lab 5 — Entrega: Fine-tuning de BERT",
                "descricao": "Notebook com a tabela final dos 5 modelos, 10 exemplos BERT × LSTM e recomendação para produção.",
                "tipo": "lab-entrega",
                "xp": 180,
                "bloco": 5,
                "aula": 20,
                "mecanismo": "auto-desafio",
                "link": "topicos_a/2027/desafios/desafio.html?id=ta-lab5-entrega",
                "slide": "topicos_a/2027/slides/aula20.html",
                "notebook": "topicos_a/2027/notebooks/lab05_finetuning_bert.ipynb",
                "prazo_dias": 7
            },
            {
                "id": "ta-boss5",
                "titulo": "👹 Boss 5 — Mini-GPT",
                "descricao": "Monte um GPT de caracteres do zero (reaproveitando o Desafio 17), treine no corpus do Boss 4 e compare a geração com a LSTM. Opcional.",
                "tipo": "boss",
                "xp": 150,
                "bonus": true,
                "bloco": 5,
                "aula": 20,
                "mecanismo": "auto-desafio",
                "link": "topicos_a/2027/desafios/desafio.html?id=ta-boss5",
                "slide": "topicos_a/2027/slides/aula20.html",
                "prazo_dias": 14
            },
            {
                "id": "ta-a21-quest",
                "titulo": "Aula 21 — Quest (📉 Diagnose the Curve): Pacientes generativos",
                "descricao": "Diagnosticar mode collapse, amostras borradas e outros problemas de modelos generativos. Registrada pelo professor em sala.",
                "tipo": "quest",
                "xp": 50,
                "bloco": 6,
                "aula": 21
            },
            {
                "id": "ta-a21-desafio",
                "titulo": "Aula 21 — Desafio (💻 Implement): Autoencoder com latente 2D",
                "descricao": "Treine um autoencoder (ou VAE) no MNIST com latente 2D, plote o latente colorido por dígito, gere uma interpolação de 10 passos e decodifique 5 pontos aleatórios do latente, comentando as regiões vazias.",
                "tipo": "desafio",
                "xp": 70,
                "bloco": 6,
                "aula": 21,
                "mecanismo": "auto-desafio",
                "link": "topicos_a/2027/desafios/desafio.html?id=ta-a21-desafio",
                "slide": "topicos_a/2027/slides/aula21.html",
                "prazo_dias": 7
            },
            {
                "id": "ta-a22-quest",
                "titulo": "Aula 22 — Quest (⚡ Lightning Round): Decodificação, treino e limitações",
                "descricao": "Quiz relâmpago sobre geração e treinamento de LLMs. Registrada pelo professor em sala.",
                "tipo": "quest",
                "xp": 50,
                "bloco": 6,
                "aula": 22
            },
            {
                "id": "ta-a22-desafio",
                "titulo": "Aula 22 — Desafio (🔍 Explore): Brincando com a temperatura",
                "descricao": "Rode um LLM pequeno (Ollama ou Hugging Face), gere respostas com 4 combinações de temperatura × top-p (3 por combinação), tabule diversidade, coerência e erros, e provoque e documente uma alucinação.",
                "tipo": "desafio",
                "xp": 70,
                "bloco": 6,
                "aula": 22,
                "mecanismo": "auto-desafio",
                "link": "topicos_a/2027/desafios/desafio.html?id=ta-a22-desafio",
                "slide": "topicos_a/2027/slides/aula22.html",
                "prazo_dias": 7
            },
            {
                "id": "ta-a23-quest",
                "titulo": "Aula 23 — Quest (🏗️ Architect): Quatro produtos com LLM",
                "descricao": "Escolher entre prompt, RAG e fine-tuning para cenários reais e defender a escolha. Registrada pelo professor em sala.",
                "tipo": "quest",
                "xp": 50,
                "bloco": 6,
                "aula": 23
            },
            {
                "id": "ta-a23-desafio",
                "titulo": "Aula 23 — Desafio (🎨 Create): Guia de decisão: prompt, RAG ou fine-tuning?",
                "descricao": "Crie um fluxograma de 1 página para decidir entre prompting, RAG e fine-tuning/LoRA, considerando custo, latência, atualização dos dados, privacidade e citação de fontes, e aplique-o aos 4 cenários da quest.",
                "tipo": "desafio",
                "xp": 70,
                "bloco": 6,
                "aula": 23,
                "mecanismo": "auto-desafio",
                "link": "topicos_a/2027/desafios/desafio.html?id=ta-a23-desafio",
                "slide": "topicos_a/2027/slides/aula23.html",
                "prazo_dias": 7
            },
            {
                "id": "ta-lab6-checkpoint",
                "titulo": "Lab 6 — Checkpoint de bancada: Sistema RAG",
                "descricao": "Corpus indexado, retrieval testado em 3 perguntas e as 10 perguntas de avaliação escritas. Validado pelo professor em sala.",
                "tipo": "lab-checkpoint",
                "xp": 60,
                "bloco": 6,
                "aula": 24
            },
            {
                "id": "ta-lab6-entrega",
                "titulo": "Lab 6 — Entrega: Sistema RAG",
                "descricao": "Notebook com o pipeline completo, tabela de avaliação, comparação com/sem RAG, 3 falhas analisadas e 1 experimento de melhoria.",
                "tipo": "lab-entrega",
                "xp": 180,
                "bloco": 6,
                "aula": 24,
                "mecanismo": "auto-desafio",
                "link": "topicos_a/2027/desafios/desafio.html?id=ta-lab6-entrega",
                "slide": "topicos_a/2027/slides/aula24.html",
                "notebook": "topicos_a/2027/notebooks/lab06_rag.ipynb",
                "prazo_dias": 7
            },
            {
                "id": "ta-boss6",
                "titulo": "👹 Boss 6 — LoRA",
                "descricao": "Faça fine-tuning de um LLM pequeno (≤ 1B) com PEFT/LoRA em um dataset de instruções (≥ 500 exemplos) e compare base vs. adaptado em 10 prompts novos. Opcional.",
                "tipo": "boss",
                "xp": 150,
                "bonus": true,
                "bloco": 6,
                "aula": 24,
                "mecanismo": "auto-desafio",
                "link": "topicos_a/2027/desafios/desafio.html?id=ta-boss6",
                "slide": "topicos_a/2027/slides/aula24.html",
                "prazo_dias": 14
            },
            {
                "id": "ta-streak-1",
                "titulo": "🔥 Streak #1",
                "descricao": "3 desafios seguidos entregues no prazo. Lançado pelo professor.",
                "tipo": "streak",
                "xp": 20,
                "bonus": true
            },
            {
                "id": "ta-streak-2",
                "titulo": "🔥 Streak #2",
                "descricao": "3 desafios seguidos entregues no prazo. Lançado pelo professor.",
                "tipo": "streak",
                "xp": 20,
                "bonus": true
            },
            {
                "id": "ta-streak-3",
                "titulo": "🔥 Streak #3",
                "descricao": "3 desafios seguidos entregues no prazo. Lançado pelo professor.",
                "tipo": "streak",
                "xp": 20,
                "bonus": true
            },
            {
                "id": "ta-streak-4",
                "titulo": "🔥 Streak #4",
                "descricao": "3 desafios seguidos entregues no prazo. Lançado pelo professor.",
                "tipo": "streak",
                "xp": 20,
                "bonus": true
            },
            {
                "id": "ta-streak-5",
                "titulo": "🔥 Streak #5",
                "descricao": "3 desafios seguidos entregues no prazo. Lançado pelo professor.",
                "tipo": "streak",
                "xp": 20,
                "bonus": true
            },
            {
                "id": "ta-streak-6",
                "titulo": "🔥 Streak #6",
                "descricao": "3 desafios seguidos entregues no prazo. Lançado pelo professor.",
                "tipo": "streak",
                "xp": 20,
                "bonus": true
            }
        ]
    },
    // ===================== UERJ (sem gamificação) =====================
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
            { "titulo": "Aula 03: Agentes de IA", "link": "puc_ia/slides/aula03.html", "resumo": "Arquiteturas Cognitivas (ReAct), Agentes Autônomos e como rodar um LLM localmente como o 'cérebro' do agente." },
            { "titulo": "Aula 04: No-Code e Low-Code", "link": "puc_ia/slides/aula04.html", "resumo": "Montando o mesmo agente visualmente com ferramentas low-code (n8n), sem escrever o loop ReAct à mão." },
            { "titulo": "Aula 05: Ideação de Soluções", "link": "puc_ia/slides/aula05.html", "resumo": "Design de solução e definição de escopo para o MVP do projeto integrado. AI Canvas (Prediction, Judgment, Action)." },
            { "titulo": "Aula 06: Colaboração com Git", "link": "puc_ia/slides/aula06.html", "resumo": "Versionamento de código/prompts e fluxo de trabalho em equipe (clone, commit, push, pull) para projetos de IA. Prompts são código!" }
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

            { "id": "pi-ia-a4-quiz", "titulo": "Aula 04 — Quiz: No-Code e Low-Code", "descricao": "Quiz sobre no-code/low-code, por que n8n, e como versionar workflows.", "tipo": "quiz", "xp": 20, "mecanismo": "auto-quiz", "link": "puc_ia/quiz/aula04.html" },
            { "id": "pi-ia-a4-n8n", "titulo": "Aula 04 — Prático: Montar um fluxo no n8n", "descricao": "Use puc_ia/n8n/setup.sh para subir o n8n localmente e editar o workflow de exemplo (Webhook → LLM local → resposta).", "tipo": "hands-on", "xp": 40, "mecanismo": "auto-desafio", "link": "puc_ia/desafios/aula04-n8n.html" },

            { "id": "pi-ia-a5-quiz", "titulo": "Aula 05 — Quiz: AI Canvas", "descricao": "Quiz sobre Prediction, Judgment e Action.", "tipo": "quiz", "xp": 15, "mecanismo": "auto-quiz", "link": "puc_ia/quiz/aula05.html" },
            { "id": "pi-ia-a5-pratico", "titulo": "Aula 05 — Prático: Canvas do MVP", "descricao": "Preencha o AI Canvas do seu projeto e escreva a frase de escopo do Sprint 1.", "tipo": "hands-on", "xp": 30, "mecanismo": "auto-desafio", "link": "puc_ia/desafios/aula05-canvas.html" },

            { "id": "pi-ia-a6-quiz", "titulo": "Aula 06 — Quiz: Fluxo Git", "descricao": "Quiz sobre branches, commits e Pull Requests.", "tipo": "quiz", "xp": 15, "mecanismo": "auto-quiz", "link": "puc_ia/quiz/aula06.html" },
            { "id": "pi-ia-a6-pratico", "titulo": "Aula 06 — Prático: PR revisado pelo time", "descricao": "Cada integrante cria uma branch, commita, abre PR e revisa o PR de um colega antes do merge.", "tipo": "hands-on", "xp": 30, "mecanismo": "auto-desafio", "link": "puc_ia/desafios/aula06-pr-review.html" },

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

            { "id": "pi-si-a2-quiz", "titulo": "Aula 02 — Quiz: PyTorch & Redes Neurais", "descricao": "Quiz sobre tensores, broadcasting, autograd, nn.Module, loss, otimizadores e o ciclo de treino.", "tipo": "quiz", "xp": 20, "mecanismo": "auto-quiz", "link": "puc_si/quiz/aula02.html" },
            { "id": "pi-si-a2-pratico", "titulo": "Aula 02 — Prático: Regressão Linear Manual (Lab 02)", "descricao": "Implemente o loop de treino manualmente (forward, backward, update de pesos) sem usar nn.Module.", "tipo": "hands-on", "xp": 40 },
            { "id": "pi-si-a2-treinar-rede", "titulo": "Aula 02 — Desafio: Sua primeira rede neural", "descricao": "Construa uma rede neural inteira na mão (sem nn.Module), depois resolva o mesmo problema com nn.Module + loss + otimizador, e compare — no Colab ou Jupyter local.", "tipo": "hands-on", "xp": 40, "mecanismo": "auto-desafio", "link": "puc_si/desafios/aula02-treinar-rede.html" },

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
