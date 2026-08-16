# Setup do backend de gamificação (PI-IA / PI-SI)

Modelo: **a planilha é a fonte da verdade**. Para a maioria das quests, você valida
completude adicionando uma linha na aba `progress` à mão — não existe autodeclaração livre
no site. A única exceção é um caminho de escrita bem restrito (`doPost`, ver seção 2):
as páginas de quiz e desafio em `puc_ia/quiz/` e `puc_ia/desafios/` podem gravar sua
própria linha em `progress` quando o aluno termina — quiz com a nota calculada no
navegador, desafio com o texto que o aluno colou como comprovação. Nenhuma outra parte do
site tem esse botão. Cada aluno acessa por um **link pessoal** contendo a própria matrícula
(`?aluno=<matrícula>`), ou digita a matrícula na própria página do quiz/desafio.

## 1. Criar a planilha

Crie uma Google Sheet com estas três abas:

**`progress`** — cabeçalho:
```
aluno_id | disciplina | quest_id | data_validacao | detalhe
```
Você adiciona uma linha aqui **sempre que validar uma quest de um aluno** — `aluno_id` é a
matrícula, `disciplina` é `puc-pi-ia` ou `puc-pi-si`, `quest_id` é o identificador da quest
(veja a lista completa em `disciplinas-data.js`, campo `quests` de cada disciplina —
ex.: `pi-ia-a3-llm-local`). `data_validacao` é só pra seu controle, não é lido pelo site.
`detalhe` é preenchido automaticamente pelas páginas de quiz/desafio (nota do quiz, ou o
texto que o aluno colou como comprovação) — para quests validadas manualmente por você,
pode deixar em branco.

**`roster_pi_ia`** e **`roster_pi_si`** — cabeçalho:
```
aluno_id | nome
```
Uma linha por aluno matriculado no semestre — `aluno_id` é a matrícula (mesma usada no link
pessoal e na aba `progress`). Serve só pra personalizar a saudação na página ("Oi, Maria!");
se um aluno não estiver aqui, o site ainda funciona, só não mostra o nome.

**Atualize o roster no início de cada semestre.** É o único passo recorrente, além de ir
validando quests ao longo do curso.

## 2. Publicar o Apps Script

1. Na planilha, vá em **Extensões → Apps Script**.
2. Apague o conteúdo padrão e cole o conteúdo de `gamification/apps-script.gs`.
3. Salve o projeto.
4. **Implantar → Nova implantação → Tipo: App da Web**.
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
5. Copie a URL gerada (termina em `/exec`).

## 3. Conectar o site à URL

Cole a URL copiada em `js/config.js`, na constante `APPS_SCRIPT_URL`. Enquanto isso não for
feito, as páginas de PI-IA/PI-SI mostram a lista de quests normalmente, só que sem nenhuma
marcada — não quebra, só fica "vazio" até você configurar.

## 4. Gerar o link pessoal de cada aluno

O link de cada aluno é a URL da disciplina com `?aluno=<matrícula>`, por exemplo:
```
https://mdrs-thiago.github.io/disciplinas/puc-pi-ia.html?aluno=2024001234
```
Envie individualmente (e-mail, Google Classroom, etc.) — não há uma lista pública de todos
os links no site.

## 5. Sempre que o código do script mudar

O Apps Script não atualiza a URL publicada automaticamente ao editar o código — é preciso
**Implantar → Gerenciar implantações → editar (ícone de lápis) → Nova versão** toda vez que
`gamification/apps-script.gs` for alterado.

## Limitações conhecidas (aceitas conscientemente)

- **Sem autenticação real**: qualquer pessoa com a matrícula de outra pessoa poderia, em
  teoria, montar o link dela e ver o progresso, ou (agora que existe `doPost`) submeter um
  quiz/desafio em nome dela. A matrícula funciona como uma senha fraca, não como identidade
  verificada — consequência de não ter login em lugar nenhum do site.
- **`doPost` é uma exceção estreita, não autodeclaração geral**: só as páginas de quiz
  (nota calculada e verificável no navegador) e de desafio (comprovação em texto livre,
  não verificável automaticamente) chamam esse endpoint. Não há UI em nenhum outro lugar do
  site para declarar uma quest como feita — quests fora do quiz/desafio continuam exigindo
  validação manual sua na planilha, como antes.
- **Dedupe é por linha existente, não por trava de UI**: o `doPost` sempre confere se já
  existe `aluno_id + disciplina + quest_id` em `progress` antes de gravar, então mesmo uma
  segunda tentativa manual (ex.: via `curl`, sem passar pela página) é rejeitada como
  duplicada — não dá pra "resetar" tentando de novo sem que você apague a linha primeiro.
- **Cota do Apps Script**: contas Google pessoais têm limite diário de execuções. Baixo
  risco pra turmas pequenas.
- **Correção**: como você mesmo edita a planilha, corrigir um lançamento errado (inclusive
  os gravados automaticamente por quiz/desafio) é só apagar ou editar a linha em `progress`
  — o aluno poderá então resubmeter, já que a checagem de duplicata deixa de encontrar nada.

## Limitações conhecidas (aceitas conscientemente, ver plano)

- **Sem autenticação real**: qualquer pessoa com a matrícula de outra pessoa poderia, em
  teoria, montar o link dela e ver o progresso — é uma consequência de não ter login em
  lugar nenhum do site. A matrícula funciona como uma senha fraca, não como identidade
  verificada.
- **Cota do Apps Script**: contas Google pessoais têm limite diário de execuções. Baixo
  risco pra turmas pequenas.
- **Correção**: como você mesmo edita a planilha, corrigir um lançamento errado é só apagar
  ou editar a linha em `progress` — não precisa de nenhuma lógica especial no site.
