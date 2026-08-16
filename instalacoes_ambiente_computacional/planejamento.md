# Planejamento de Aulas - Instalações de Ambiente Computacional

**Disciplina:** Instalações de Ambiente Computacional  
**Carga Horária Estimada:** 10 a 12 Encontros  

## Visão Geral
A disciplina aborda a infraestrutura física e lógica de datacenters e ambientes computacionais, cobrindo desde o hardware de servidores e disposição física, passando por computação em nuvem (com foco em AWS), até a infraestrutura de cabeamento e proteção elétrica.

---

## Cronograma de Aulas

### Módulo 1: Servidores e Infraestrutura de Datacenter

**Encontro 01: Introdução a Servidores**
- **Conteúdo:**
    - O que é um servidor? Diferença para desktops.
    - Tipos de Servidores: Torre (Tower), Rack (Rackmount) e Lâmina (Blade).
    - Hardware de Servidores: Processadores (Xeon/Epyc), Memória RAM (ECC), Armazenamento (SAS/SATA/NVMe, RAID).
- **Objetivo:** Compreender o hardware e os form factors dos servidores.

**Encontro 02: Disposição Física e Datacenters**
- **Conteúdo:**
    - Layout de Datacenter: Pisos elevados, Calhas.
    - Racks: Unidades de Rack (U), Organização.
    - Refrigeração: Corredores Frios e Quentes (Hot/Cold Aisles).
    - Tierização de Datacenters (Tier I, II, III, IV).
- **Objetivo:** Entender como organizar fisicamente os servidores em um ambiente profissional.

### Módulo 2: Computação em Nuvem (Cloud Computing) - Foco AWS

**Encontro 03: Introdução à Cloud Computing**
- **Conteúdo:**
    - Conceitos: On-premise vs. Cloud.
    - Modelos de Serviço: IaaS, PaaS, SaaS.
    - Modelos de Implantação: Pública, Privada, Híbrida.
    - Introdução à AWS: Infraestrutura Global (Regiões, Zonas de Disponibilidade).
- **Objetivo:** Fundamentos teóricos da nuvem.

**Encontro 04: Computação na AWS (EC2)**
- **Conteúdo:**
    - Amazon EC2 (Elastic Compute Cloud).
    - Tipos de Instâncias (General Purpose, Compute Optimized, etc.).
    - AMIs (Amazon Machine Images).
    - Prática: Criando uma instância Linux/Windows básica.
- **Objetivo:** Prática de criação de servidores virtuais.

**Encontro 05: Redes na AWS (VPC)**
- **Conteúdo:**
    - Amazon VPC (Virtual Private Cloud).
    - Subnets (Públicas e Privadas).
    - Security Groups e NACLs (Firewall virtual).
    - Prática: Configurando rede para permitir acesso web e SSH/RDP.
- **Objetivo:** Entender a infraestrutura de rede virtualizada.

**Encontro 06: Armazenamento e Gerenciamento na AWS**
- **Conteúdo:**
    - Amazon S3 (Simple Storage Service): Buckets, Objetos, Classes de armazenamento.
    - Amazon EBS (Elastic Block Store): Discos virtuais para EC2.
    - IAM (Identity and Access Management): Usuários, Grupos e Permissões básicas.
- **Objetivo:** Gerenciamento de dados e segurança básica.

### Módulo 3: Infraestrutura de Cabeamento de Rede

**Encontro 07: Introdução ao Cabeamento e Cabo Coaxial**
- **Conteúdo:**
    - Evolução dos meios de transmissão.
    - Cabo Coaxial: Estrutura, Tipos (RG-6, RG-59), Conectores (BNC, F).
    - Aplicações atuais (CCTV, TV a cabo) vs. Históricas (Redes Bus).
- **Objetivo:** Conhecer meios legados e suas aplicações atuais.

**Encontro 08: Par Trançado (Twisted Pair) e Ethernet**
- **Conteúdo:**
    - Cabos UTP, STP, FTP.
    - Categorias: Cat5e, Cat6, Cat6a, Cat7, Cat8.
    - Padrões de Crimpagem: T568A vs T568B.
    - Prática (se possível) ou Demonstração: Crimpagem de conectores RJ45.
- **Objetivo:** Dominar o padrão mais comum de redes locais.

**Encontro 09: Fibra Óptica**
- **Conteúdo:**
    - Princípio de funcionamento (Refração total).
    - Tipos: Monomodo (SM) vs. Multimodo (MM).
    - Conectores (LC, SC, ST) e Polimentos (UPC, APC).
    - Fusão e Emenda Mecânica (Conceitos).
- **Objetivo:** Entender o backbone e conexões de longa distância/alta velocidade.

**Encontro 10: Cabeamento Estruturado e Normas**
- **Conteúdo:**
    - Normas ANSI/TIA-568.
    - Subsistemas: Cabeamento Horizontal, Backbone, Área de Trabalho, Sala de Telecomunicações.
    - Patch Panels, Racks de Cabeamento, Identificação e Documentação.
- **Objetivo:** Planejar uma infraestrutura de rede organizada e normatizada.

### Módulo 4: Proteção Elétrica e Encerramento

**Encontro 11: Dispositivos de Proteção Elétrica**
- **Conteúdo:**
    - Problemas de Energia: Surtos, Apagões, Ruídos.
    - Aterramento Elétrico (Conceitos básicos).
    - DPS (Dispositivo de Proteção contra Surtos).
    - UPS (Nobreaks): Standby (Offline), Line-Interactive, Online (Double Conversion).
    - Cálculo de dimensionamento básico de UPS.
- **Objetivo:** Garantir a continuidade e segurança dos equipamentos.

**Encontro 12: Revisão e Avaliação**
- **Conteúdo:**
    - Revisão geral dos tópicos.
    - Prova Final ou Apresentação de Projetos (Ex: Planejar um pequeno datacenter com servidores, cloud híbrida e cabeamento).
- **Objetivo:** Avaliar o aprendizado.
