# Plano de aula — Redes Neurais (Teoria e Prática com PyTorch)

**Período:** 09/03/2026 a 11/07/2026  
**Aulas:** quarta e quinta (**1h40** por encontro)  
**Ferramenta principal:** **PyTorch**  
**Feriados (sem aula):**
- **23/04/2026 (qui)** — Feriado de São Jorge  
- **04/06/2026 (qui)** — Corpus Christi  

**Total de encontros no período:** 36  
**Encontros sem aula (feriados):** 2  
**Total de aulas efetivas:** **34**  
**Primeira aula:** **11/03/2026 (qua)**  
**Última aula:** **09/07/2026 (qui)**

---

## Estrutura sugerida da disciplina

- **Bloco 1 — Fundamentos:** Perceptron/MLP, perdas, backprop, treinamento, otimização, regularização  
- **Bloco 2 — Visão Computacional (CNNs):** convolução, arquiteturas, transfer learning, avaliação e interpretabilidade  
- **Bloco 3 — NLP:** embeddings, RNN/LSTM/GRU, atenção, Transformers e fine-tuning com Hugging Face  
- **Fechamento:** projeto final + apresentações

---

## Template de encontro (1h40 / 100 min)

- **10 min** — recap + 2 perguntas rápidas  
- **35–40 min** — teoria (com 1–2 checkpoints)  
- **45–50 min** — prática guiada (notebook PyTorch)  
- **5–10 min** — wrap-up + tarefa objetiva

---

## Cronograma (34 encontros)

> Observação: **sem aula em 23/04/2026 e 04/06/2026**.

| Aula | Data | Dia | Tema | Observação |
|---:|:---:|:---:|---|---|
| 1 | 11/03/2026 | Qua | Apresentação + setup do ambiente (Colab/local), revisão rápida de Python/NumPy | prática leve |
| 2 | 12/03/2026 | Qui | Perceptron/MLP, ativações, visão do treinamento |  |
| 3 | 18/03/2026 | Qua | Perdas e métricas (CE, accuracy, F1) + dataset split | lab |
| 4 | 19/03/2026 | Qui | Backprop “na mão” + autograd no PyTorch | lab |
| 5 | 25/03/2026 | Qua | Treino em PyTorch: DataLoader, loop, device, seeds | lab |
| 6 | 26/03/2026 | Qui | Otimizadores (SGD/Adam), LR schedule, init (Xavier/He) | lab |
| 7 | 01/04/2026 | Qua | Regularização I: L2, early stopping, validação, overfit/underfit |  |
| 8 | 02/04/2026 | Qui | Regularização II: dropout, batch norm (efeitos) + **Quiz 1** | quiz |
| 9 | 08/04/2026 | Qua | Introdução a CNN: conv/padding/stride/pooling |  |
| 10 | 09/04/2026 | Qui | CNN em PyTorch (primeira arquitetura) + augmentation | lab |
| 11 | 15/04/2026 | Qua | Arquiteturas e boas práticas (VGG/ResNet: ideias) |  |
| 12 | 16/04/2026 | Qui | Transfer learning/fine-tuning (ResNet/MobileNet) | lab |
| 13 | 22/04/2026 | Qua | Revisão/plantão + fechamento de pendências de labs | buffer |
| — | 23/04/2026 | Qui | **FERIADO — São Jorge** | sem aula |
| 14 | 29/04/2026 | Qua | Diagnóstico: curvas, matriz de confusão, análise de erros | lab |
| 15 | 30/04/2026 | Qui | Segmentação/detecção (visão geral) + demo com modelo pronto | semi-lab |
| 16 | 06/05/2026 | Qua | Interpretabilidade (Grad-CAM) + casos | lab |
| 17 | 07/05/2026 | Qui | Robustez/dataset shift/calibração + **Quiz 2** | quiz |
| 18 | 13/05/2026 | Qua | Pipeline/reprodutibilidade/boas práticas de experimento | prática leve |
| 19 | 14/05/2026 | Qui | **Avaliação** | avaliação |
| 20 | 20/05/2026 | Qua | NLP: tokenização, vocabulário, baseline (BoW) vs embeddings |  |
| 21 | 21/05/2026 | Qui | Embeddings treináveis no PyTorch + classificação simples | lab |
| 22 | 27/05/2026 | Qua | RNN: intuição, BPTT, vanishing/exploding |  |
| 23 | 28/05/2026 | Qui | LSTM/GRU em prática (classificação de texto) | lab |
| 24 | 03/06/2026 | Qua | Atenção: motivação, mecanismo, seq2seq (alto nível) |  |
| — | 04/06/2026 | Qui | **FERIADO — Corpus Christi** | sem aula |
| 25 | 10/06/2026 | Qua | Atenção em prática (encoder-decoder + attention simples) | lab |
| 26 | 11/06/2026 | Qui | Transformers I: self-attention, multi-head, positional |  |
| 27 | 17/06/2026 | Qua | Transformers II: BERT/GPT, pré-treino vs fine-tuning |  |
| 28 | 18/06/2026 | Qui | Hugging Face + fine-tuning Transformer (classificação) | lab |
| 29 | 24/06/2026 | Qua | Revisão/plantão + tempo de debug e consolidação de labs | buffer |
| 30 | 25/06/2026 | Qui | Tópicos atuais: LLMs, prompting, noções de RAG, limitações/ética |  |
| 31 | 01/07/2026 | Qua | Projeto final: briefing, rubrica, escolha de dataset/métrica, baseline | projeto |
| 32 | 02/07/2026 | Qui | Clínica de projeto + experimentos (tempo de bancada) | projeto |
| 33 | 08/07/2026 | Qua | Contingência / reposição / ensaio de apresentação | buffer |
| 34 | 09/07/2026 | Qui | Apresentações finais + retrospectiva | fechamento |

---

## Entregas sugeridas (prática)

- **Lab 1 (MLP do zero + treino):** entrega sugerida **02/04/2026** (Aula 8)  
- **Lab 2 (CNN + transfer learning):** entrega sugerida **07/05/2026** (Aula 17) ou **13/05/2026** (Aula 18)  
- **Lab 3 (NLP com LSTM/GRU):** entrega sugerida **11/06/2026** (Aula 26)  
- **Lab 4 (HF fine-tuning Transformer):** entrega sugerida **24/06/2026** (Aula 29)  

---

## Observações didáticas (PyTorch)

- Manter um **notebook base** que evolui ao longo do semestre (loop de treino → métricas → scheduler → logs → checkpoint) reduz atrito e aumenta consistência.
- **CV:** datasets rápidos (CIFAR-10, FashionMNIST) + um “mini real” com modelo pré-treinado para demo.
- **NLP:** AG News / IMDB para classificação; SST-2 (GLUE) é uma alternativa enxuta para fine-tuning com Hugging Face.
