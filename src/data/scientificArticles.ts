import { ScientificArticle } from '../types';

export const SCIENTIFIC_ARTICLES: ScientificArticle[] = [
  {
    id: 'lancet-brazil-national',
    title: 'Estimated COVID-19 severe cases and deaths averted in the first year of the vaccination campaign in Brazil: a retrospective observational study',
    journal: 'The Lancet Regional Health - Americas (Vol. 17, 100418)',
    year: 2023,
    authors: [
      'Cleber Vinicius Brito dos Santos',
      'Tatiana Guimarães de Noronha',
      'Guilherme Loureiro Werneck',
      'Claudio José Struchiner',
      'Daniel Antunes Maciel Villela'
    ],
    institutions: [
      'Fiocruz (Fundação Oswaldo Cruz)',
      'UERJ (Universidade do Estado do Rio de Janeiro)',
      'UFRJ (Universidade Federal do Rio de Janeiro)',
      'FGV (Fundação Getulio Vargas)',
      'UFF (Universidade Federal Fluminense)'
    ],
    pdfPath: '/assets/aistudio/article_brazil_5ec0311b.pdf',
    summary: 'Estudo ecológico e observacional retrospectivo que analisou microdados nacionais unificados (SI-PNI e SIVEP-Gripe) para os 27 estados e 5.569 municípios brasileiros entre 17 de janeiro de 2021 e 31 de janeiro de 2022.',
    demystification: {
      question: 'Como os cientistas sabem que a vacina salvou 303 mil vidas se essas pessoas não morreram?',
      laymanAnswer: 'Pense em dois grupos idênticos de pessoas com a mesma idade e vivendo nas mesmas cidades: um grupo tomou a vacina e o outro não. Durante cada dia da pandemia, os cientistas mediram quantas pessoas não vacinadas adoeceram gravemente ou faleceram. Se entre os vacinados a taxa de mortes despencou drasticamente, a diferença direta entre as duas curvas representa exatamente as vidas que teriam sido perdidas se a vacina não existisse.',
      mathematicalMethod: 'Cálculo diário estratificado por faixas etárias (20-29 até ≥90 anos) e municípios, comparando as taxas de incidência de casos graves e óbitos entre vacinados (parciais, esquemas completos e reforço) e não vacinados (método de Haas). Os dados foram pareados probabilisticamente entre o banco de vacinação (SI-PNI) e o de hospitalizações (SIVEP-Gripe).',
      whyItMatters: 'Demonstra que priorizar idosos salvou mais de 187 mil pessoas da terceira idade no primeiro ano (61% do total de vidas poupadas), mesmo eles representando apenas 20% da população adulta.'
    },
    keyMetrics: [
      {
        label: 'Casos Graves Evitados',
        value: '875.846',
        ci95: '843.383 – 915.709',
        detail: 'Redução de 74% no total de casos graves esperados no primeiro ano de campanha.'
      },
      {
        label: 'Óbitos Evitados no Brasil',
        value: '303.129',
        ci95: '284.019 – 321.681',
        detail: 'Queda de 82% no total de mortes esperadas caso a população adulta permanecesse desprotegida.'
      },
      {
        label: 'Idosos (≥60 anos) Salvos',
        value: '187.890',
        detail: '61% de todos os óbitos evitados foram de idosos, graças à priorização técnica do início da fila vacinal.'
      },
      {
        label: 'Doses Aplicadas no Período',
        value: '>300 Milhões',
        detail: '81% da população brasileira recebeu pelo menos uma dose até fevereiro de 2022.'
      }
    ],
    counterfactualInsights: [
      'Sem vacinas, o total de hospitalizações graves no Brasil teria saltado de 1,17 milhão para mais de 2,04 milhões.',
      'O número de mortes registradas em 2021 teria superado 672 mil apenas naquele ano, dobrando o impacto mortal da crise.',
      'Estados com maiores populações (SP, MG, RJ e BA) evitaram o maior volume absoluto de óbitos, enquanto estados do Norte e Centro-Oeste tiveram a maior redução percentual de risco relativo.'
    ]
  },
  {
    id: 'royal-society-modeling',
    title: 'Impacts of a delayed and slow-paced vaccination on cases and deaths during the COVID-19 pandemic: a modelling study',
    journal: 'Journal of the Royal Society Interface (Vol. 19: 20220275)',
    year: 2022,
    authors: [
      'Gustavo Barbosa Libotte',
      'Lucas dos Anjos',
      'Regina Célia Cerqueira de Almeida',
      'Sandra Mara Cardoso Malta',
      'Roberto de Andrade Medronho'
    ],
    institutions: [
      'LNCC (Laboratório Nacional de Computação Científica - MCTIC)',
      'IESC / Faculdade de Medicina da UFRJ'
    ],
    pdfPath: '/assets/aistudio/article_modeling_study_4adcd30a.pdf',
    summary: 'Modelo matemático epidemiológico SIR estendido com compartimentos múltiplos de vacinas, regularização por Processos Gaussianos (GPR) e calibração Bayesiana (TMCMC), avaliando o impacto fatal do atraso e da lentidão da imunização.',
    demystification: {
      question: 'O que é um modelo matemático SIR e por que 30 dias de atraso mataram tantas pessoas?',
      laymanAnswer: 'Um vírus se propaga como uma reação em cadeia: 1 pessoa infecta 2, que infectam 4, que infectam 8. Quando a vacinação começa cedo, ela quebra essa corrente antes que a "avalanche" ganhe força. Se você atrasa a vacinação em apenas 30 dias durante uma onda ascendente, a quantidade de pessoas infectadas já se multiplicou tanto que as vacinas chegam atrasadas para conter o pico de mortes no hospital.',
      mathematicalMethod: 'Sistema de equações diferenciais acopladas para Susceptíveis S(t), Infectados I(t), Vacinados Vi(t), Removidos R(t) e Óbitos D(t). Incorpora taxa de vacinação diária ν, intervalo entre doses 1/τ, eficácia η e redução de eficácia por abandono da 2ª dose (μ e α). Ruídos e atrasos de notificação foram suavizados com Gaussian Process Regression com kernel RBF.',
      whyItMatters: 'Comprova matematicamente que o atraso político na compra de doses não foi uma questão burocrática inofensiva: apenas no estado do Rio de Janeiro, antecipar 30 dias teria evitado 31.657 mortes.'
    },
    keyMetrics: [
      {
        label: 'Vidas Poupadas com +30 Dias de Antecipação (RJ)',
        value: '31.657',
        ci95: '25.801 – 35.117',
        detail: 'Quase 45% (44,68%) de todas as mortes no período poderiam ter sido evitadas com apenas 30 dias de agilidade.'
      },
      {
        label: 'Atraso de 30 Dias (Pior Cenário no RJ)',
        value: '123.255',
        detail: 'Mortes excedentes que ocorreriam caso a vacinação atrasasse 30 dias e operasse em ritmo lento (0,35%/dia).'
      },
      {
        label: 'Pico Diário com Atraso',
        value: '1.405 óbitos/dia',
        detail: 'O atraso empurraria o pico para julho de 2021 com recorde brutal, mesmo que mais doses fossem aplicadas depois.'
      },
      {
        label: 'Perda da 2ª Dose (Abandono de 20%)',
        value: '+50% mortes/dia',
        detail: 'Quem deixa de tomar a 2ª dose perde até metade da proteção, permitindo o recrudescimento da transmissão.'
      }
    ],
    counterfactualInsights: [
      'Se a campanha tivesse iniciado em dezembro de 2020 (quando outros países já vacinavam), o número de reprodução R(t) teria caído abaixo de 1 já em fevereiro de 2021.',
      'O ritmo histórico brasileiro (0,40% da população vacinada/dia) foi bom, mas se atingisse 0,50% (como no H1N1), dezenas de milhares de vidas seriam poupadas.',
      'A desinformação que fez milhões perderem o reforço ou a 2ª dose provocou ressurgimentos perigosos da curva infecciosa.'
    ]
  },
  {
    id: 'lancet-counterfactual-elderly',
    title: 'Estimating the impact of implementation and timing of the COVID-19 vaccination programme in Brazil: a counterfactual analysis',
    journal: 'The Lancet Regional Health - Americas (Vol. 17, 100397)',
    year: 2023,
    authors: [
      'Leonardo Souto Ferreira',
      'Flavia Maria Darcie Marquitti',
      'Rafael Lopes Paixão da Silva',
      'Marcelo Eduardo Borges',
      'Marcelo Ferreira da Costa Gomes',
      'Oswaldo Gonçalves Cruz',
      'Roberto André Kraenkel',
      'Renato Mendes Coutinho',
      'Paulo Inácio Prado',
      'Leonardo Soares Bastos'
    ],
    institutions: [
      'Observatório COVID-19 BR',
      'UNESP (Instituto de Física Teórica)',
      'UNICAMP (Instituto de Física Gleb Wataghin)',
      'Fiocruz (Programa de Computação Científica)',
      'UFABC',
      'USP (Instituto de Biociências)'
    ],
    pdfPath: '/assets/aistudio/article_estimating_the_impact_dd2a4338.pdf',
    summary: 'Modelo estatístico Bayesiano com efeitos aleatórios autoregressivos de ordem 1 (AR(1)) via INLA, comparando cenários contrafactuais de ausência de vacina versus aceleração moderada (4 semanas) e alta (8 semanas).',
    demystification: {
      question: 'O que significa "análise contrafactual"? Como os cientistas simulam um mundo alternativo?',
      laymanAnswer: '"Contrafactual" significa "contrário aos fatos": é a técnica científica que reconstrói com rigor matemático o que teria acontecido caso determinada decisão tivesse sido diferente. Como conhecíamos a relação de risco entre jovens de 20-29 anos (não vacinados no início) e idosos acima de 60 anos, o modelo pôde projetar com precisão cirúrgica quantas internações teriam ocorrido se a vacina tivesse chegado 4 ou 8 semanas antes.',
      mathematicalMethod: 'Modelo linear Bayesiano com dependência temporal estocástica AR(1) ajustado via INLA (Integrated Nested Laplace Approximation). A regressão prevê internações e óbitos em idosos (60-69, 70-79, ≥80 anos) em função da cobertura vacinal específica de cada fabricante (AstraZeneca, CoronaVac, Pfizer) e das baixas no grupo jovem de referência.',
      whyItMatters: 'Revela que o custo da vacinação no Brasil (US$ 2,2 bilhões) foi praticamente pago integralmente pela economia direta em leitos de UTI e internações evitadas (US$ 2,0 bilhões), além de evidenciar a tragédia de não vacinar 8 semanas antes.'
    },
    keyMetrics: [
      {
        label: 'Internações de Idosos Evitadas',
        value: '167.914',
        ci95: '158.206 – 178.298',
        detail: 'Internações hospitalares poupadas em idosos (>60 anos) nos primeiros 7 meses de vacinação.'
      },
      {
        label: 'Vidas de Idosos Salvas no Período',
        value: '58.644',
        ci95: '53.785 – 63.952',
        detail: 'Queda direta de 35% nas mortes de idosos entre março e agosto de 2021.'
      },
      {
        label: 'Vidas Extras se Iniciasse 8 Semanas Mais Cedo',
        value: '+46.888 vidas',
        ci95: 'Total: 105.532 vidas',
        detail: 'Se o governo tivesse aceitado as ofertas iniciais de vacinas e acelerado a campanha em 8 semanas.'
      },
      {
        label: 'Economia Hospitalar Direta ao SUS',
        value: 'US$ 2,0 Bilhões',
        detail: 'Economia em internações (custo médio de US$ 12.000/leito), cobrindo o gasto federal total com imunizantes.'
      }
    ],
    counterfactualInsights: [
      'A aceleração de 8 semanas teria evitado 104.507 internações hospitalares a mais, aliviando o colapso dos hospitais no pico da variante Gama.',
      'Mesmo sem considerar imunidade coletiva (efeito rebanho), os números demonstram um benefício esmagador.',
      'O atraso na vacinação pediátrica (crianças de 5 a 11 anos) em 2021/2022 repetiu a mesma lentidão prejudicial observada na campanha de adultos.'
    ]
  }
];
