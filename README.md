# Evidência & Vida — Divulgação Científica da Vacinação no Brasil

> **Portal Interativo de Divulgação Científica, Modelagem Epidemiológica e Transparência Histórica da COVID-19 no Brasil.**

---

## 🎯 Intuito e Propósito do Projeto

O projeto **Evidência & Vida** foi criado com um objetivo central: **tornar acessíveis e compreensíveis para pessoas fora da academia os modelos matemáticos e epidemiológicos que orientam as políticas de vacinação**, demonstrando empiricamente o volume extraordinário de vidas salvas pela ciência e pelo Sistema Único de Saúde (SUS).

Paralelamente, a plataforma estabelece uma **memória pública rigorosa**, confrontando lado a lado as descobertas científicas revisadas por pares (*peer-reviewed*) com as ações políticas, omissões e investigações de bastidores da atuação do governo federal (gestão Jair Bolsonaro) durante a pandemia de COVID-19.

---

## 📚 Base Científica e Documental

A aplicação foi integralmente construída a partir de **28 documentos originais** anexados e preservados no acervo do projeto:

### 1. Artigos Científicos de Referência Internacional
* **The Lancet Regional Health - Americas (2023;17: 100418)**  
  *Santos, Noronha, Werneck, Struchiner & Villela (Fiocruz, UERJ, UFF, UFRJ, FGV)*  
  *Título:* *"Estimated COVID-19 severe cases and deaths averted in the first year of the vaccination campaign in Brazil: a retrospective observational study"*.  
  *Principais achados:* **303.129 vidas salvas** (queda de 82% na mortalidade esperada) e **875.846 casos graves evitados** (queda de 74%) no primeiro ano. Demonstra que a priorização de idosos (>60 anos) respondeu por 61% de todos os óbitos evitados (187.890 vidas).
* **Journal of the Royal Society Interface (2022;19: 20220275)**  
  *Libotte, Anjos, Almeida, Malta & Medronho (LNCC / UFRJ)*  
  *Título:* *"Impacts of a delayed and slow-paced vaccination on cases and deaths during the COVID-19 pandemic: a modelling study"*.  
  *Principais achados:* Modelagem matemática SIR-V com Processos Gaussianos (GPR) e inferência Bayesiana (TMCMC). Comprova que antecipar a vacinação em apenas 30 dias com ritmo acelerado teria poupado **31.657 vidas** no Rio de Janeiro (44,7% do total). Simula também o efeito destrutivo da hesitação vacinal e do abandono da 2ª dose.
* **The Lancet Regional Health - Americas (2023;17: 100397)**  
  *Ferreira, Marquitti, Silva, Borges, Gomes, Cruz, Kraenkel, Coutinho, Prado & Bastos (Observatório COVID-19 BR, UNESP, UNICAMP, Fiocruz, USP, UFABC)*  
  *Título:* *"Estimating the impact of implementation and timing of the COVID-19 vaccination programme in Brazil: a counterfactual analysis"*.  
  *Principais achados:* Análise contrafactual Bayesiana com processos autoregressivos AR(1) via INLA. Revela que mais de **165 mil internações de idosos foram evitadas**, gerando economia direta de **US$ 2,0 bilhões ao SUS**, compensando todo o custo nacional com imunizantes. Demonstra que 8 semanas de antecipação teriam poupado outras 46.888 vidas adicionais.

### 2. Dossiê Jornalístico e Inquéritos Oficiais (25 Documentos)
* **Recusa de Vacinas:** Documentação oficial revelando a rejeição da oferta de 70 milhões de doses da Pfizer a US$ 10 (metade do preço internacional) em agosto de 2020 e 53 e-mails ignorados pelo governo.
* **Corrupção e CPI da Covid:** Inquéritos do Ministério Público Federal e depoimentos sobre o contrato relâmpago de US$ 15/dose da Covaxin pela Precisa Medicamentos, cobrança de propina de US$ 1 por dose (caso Davati) e prevaricação presidencial.
* **Desinformação e Ataques à Ciência:** Gravações de ataques à Fiocruz como "antro esquerdista", pressão diplomática internacional em favor de cloroquina ineficaz e defesa de tratamentos sem comprovação.
* **Impacto Social e Vulnerabilidade:** Estudos da orfandade de 1,3 milhão de crianças brasileiras e da mortalidade infantil por Covid 10 vezes superior à registrada nos Estados Unidos.
* **Histórico do SUS:** Análise comparada com a campanha da gripe suína H1N1 em 2010 (quando o Brasil vacinou 88 milhões de pessoas em apenas 3 meses).

---

## 🔬 Estrutura da Plataforma

O portal é organizado em 6 seções navegáveis com facilidade tanto em desktop quanto em dispositivos móveis:

```
[ Evidência & Vida ]
 ├── 1. Introdução & Visão Geral
 ├── 2. Dismistificando Modelos (Educação Científica)
 ├── 3. Vidas Salvas no Brasil (Tabela das 27 UFs)
 ├── 4. Ciência vs Governo (Confronto Fato a Fato)
 ├── 5. Simulador Contrafactual (Curvas em Tempo Real)
 ├── 6. Jogo: O Epidemiologista (Simulação Gamificada)
 └── 7. Biblioteca de Fontes (Acervo dos 28 PDFs)
```

### 1. Introdução & Visão Geral
Apresentação do manifesto de divulgação científica, os 4 grandes números empíricos da imunização no Brasil e cartões de acesso direto a cada área do portal.

### 2. Dismistificando os Modelos Epidemiológicos
Explicação didática das ferramentas matemáticas utilizadas pelos cientistas:
* **Modelo SIR-V Dinâmico:** Explicação interativa das gavetas populacionais:
  * $S$ (Suscetíveis)
  * $I$ (Infectados)
  * $V$ (Vacinados com dose 1 e dose 2)
  * $R$ (Recuperados / Imunes)
  * $D$ (Óbitos)
* **O que é um Modelo Contrafactual?** Como a ciência calcula o "mundo alternativo" que teria existido sem intervenções para quantificar o benefício da campanha.
* **Regressão por Processos Gaussianos (GPR):** Como os computadores limpam os ruídos de fins de semana e atrasos de cartório sem criar distorções artificiais.
* **O Perigo de Pular a Segunda Dose:** Demonstração da queda de eficácia biológica e do risco de recrudescimento da transmissão.

### 3. Vidas Salvas nas 27 Unidades Federativas
Painel com os dados oficiais do estudo da *The Lancet* cobrindo todos os estados brasileiros (SP, MG, RJ, BA, RS, PR, etc.):
* População, casos graves evitados e óbitos evitados no primeiro ano.
* Taxa de mortalidade evitada por 100 mil habitantes.
* Filtros por macrorregião (Sudeste, Nordeste, Sul, Centro-Oeste e Norte), busca em tempo real e exportação dos dados em formato `.csv`.

### 4. Ciência vs Ações do Governo: Confronto Fato a Fato
Módulo comparativo que coloca lado a lado:
* **A Ação Governamental Registrada:** Fatos apurados pela imprensa investigativa e CPI (com citação literal de autoridades).
* **O que a Ciência Comprovou:** Contraposição direta com os dados dos artigos acadêmicos.
* **Link Direto:** Acesso ao PDF original de cada investigação anexada.

### 5. Simulador Contrafactual Interativo
Ferramenta interativa de exploração matemática:
* **Parâmetros Ajustáveis:**
  1. *Data de início da vacinação* (-60 dias adiantado até +30 dias de atraso).
  2. *Ritmo diário de aplicação* (de 0,20% a 0,80% da população/dia).
  3. *Taxa de abandono da 2ª dose* (0% a 30%).
  4. *Eficácia vacinal ponderada* (50% a 95%).
* **Visualização Dinâmica:** Gráfico SVG em tempo real exibindo a curva simulada, o histórico real e a projeção sem vacinação, com cálculo instantâneo de vidas salvas e do número reprodutivo $R(t)$.
* **Mobile-First:** Em smartphones, o gráfico e os indicadores aparecem no topo para que a resposta seja visualizada instantaneamente ao ajustar qualquer controle.

### 6. Jogo Educativo: "O Epidemiologista no Comando"
Experiência gamificada de tomada de decisão em saúde pública:
* O jogador assume a gestão do Programa Nacional de Imunizações (PNI) durante 8 momentos históricos cruciais (oferta da Pfizer em 2020, Butantan/CoronaVac, prioridade para idosos, escândalo da Covaxin, adesão à 2ª dose, ataques à Fiocruz, vacinação pediátrica e reforço da Ômicron).
* **Simulação de Agentes 2D (60fps):** Canvas interativo com 90+ cidadãos interagindo no território (suscetíveis, infectados, vacinados e imunes).
* **Síntese de Áudio Procedural:** Sons em tempo real sintetizados via Web Audio API, com controle de mudo.
* **Balanço Final:** Comparação entre as escolhas do jogador e o desfecho histórico brasileiro.

### 7. Biblioteca de Fontes
Catálogo interativo com busca rápida e download de todos os **28 arquivos PDF originais** anexados ao projeto.

---

## 🛠️ Tecnologias e Arquitetura

* **Framework:** React 19 (Single Page Application com Vite)
* **Linguagem:** TypeScript com tipagem estrita
* **Estilização:** Tailwind CSS v4 com paleta clínica/científica (60-30-10) e fontes *Plus Jakarta Sans* e *JetBrains Mono*
* **Gráficos e Simulação:** SVG responsivo com equações dinâmicas e HTML5 Canvas 2D
* **Áudio:** Web Audio API (síntese senoidal e procedural sem dependências externas)
* **Ícones:** Lucide React

---

## 🚀 Como Executar Localmente

```bash
# 1. Instalar as dependências do projeto
npm install

# 2. Executar o servidor de desenvolvimento
npm run dev

# 3. Compilar para produção
npm run build

# 4. Validar tipagem e lint
npm run lint
```

O servidor iniciará em `http://localhost:3000`.

---

## ⚖️ Licença e Compromisso Social

Este projeto foi desenvolvido com finalidade estritamente **educacional, histórica e de divulgação científica**. Dedica-se à memória das vítimas da pandemia de COVID-19 no Brasil e homenageia os profissionais do SUS e a comunidade científica brasileira que trabalharam incansavelmente para salvar vidas.
