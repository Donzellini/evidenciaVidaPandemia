export interface AttachedDocument {
  id: string;
  title: string;
  type: 'scientific_paper' | 'news_investigation';
  source: string;
  date?: string;
  description: string;
  pdfPath: string;
}

export const ALL_ATTACHED_DOCUMENTS: AttachedDocument[] = [
  {
    id: 'art-1',
    title: 'Estimated COVID-19 severe cases and deaths averted in the first year of the vaccination campaign in Brazil',
    type: 'scientific_paper',
    source: 'The Lancet Regional Health - Americas (2023)',
    description: 'Estudo ecológico nacional que quantificou 875.846 casos graves e 303.129 mortes evitadas no 1º ano de vacinação no Brasil.',
    pdfPath: '/assets/aistudio/article_brazil_5ec0311b.pdf'
  },
  {
    id: 'art-2',
    title: 'Impacts of a delayed and slow-paced vaccination on cases and deaths during the COVID-19 pandemic: a modelling study',
    type: 'scientific_paper',
    source: 'Journal of the Royal Society Interface (2022)',
    description: 'Modelagem matemática com equações SIR-V, Processos Gaussianos (GPR) e estimativa de 31.657 mortes evitáveis com 30 dias de antecedência no RJ.',
    pdfPath: '/assets/aistudio/article_modeling_study_4adcd30a.pdf'
  },
  {
    id: 'art-3',
    title: 'Estimating the impact of implementation and timing of the COVID-19 vaccination programme in Brazil: a counterfactual analysis',
    type: 'scientific_paper',
    source: 'The Lancet Regional Health - Americas (2023)',
    description: 'Análise contrafactual Bayesiana (INLA AR(1)) em idosos (>60 anos): 167k hospitalizações evitadas e +47k vidas salvas caso iniciado 8 semanas antes.',
    pdfPath: '/assets/aistudio/article_estimating_the_impact_dd2a4338.pdf'
  },
  {
    id: 'news-pfizer-half-price',
    title: 'Bolsonaro recusou vacina da Pfizer em 2020 por metade do preço',
    type: 'news_investigation',
    source: 'Correio Braziliense / Folha de S.Paulo',
    date: '07/06/2021',
    description: 'Revelação de 53 e-mails da Pfizer ignorados pelo governo brasileiro ofertando 70 milhões de doses a US$ 10 em agosto de 2020.',
    pdfPath: '/assets/aistudio/Bolsonaro_recusou_vacina_da_Pfizer_em_2020_por_metade_do_pre_o_2e445f00.pdf'
  },
  {
    id: 'news-propina-davati',
    title: 'EXCLUSIVO: Governo Bolsonaro pediu propina de US$ 1 por dose, diz vendedor de vacina',
    type: 'news_investigation',
    source: 'Folha de S.Paulo',
    date: '29/06/2021',
    description: 'Depoimento de Luiz Paulo Dominguetti sobre pedido de propina de US$ 1 por dose feito por Roberto Dias, diretor de Logística da Saúde.',
    pdfPath: '/assets/aistudio/EXCLUSIVO__Governo_Bolsonaro_pediu_propina_de_US__1_por_dose__diz_vendedor_de_vacina_-_29_06_2021_-_Poder_-_Folha_bf0ec188.pdf'
  },
  {
    id: 'news-covaxin-piaui',
    title: 'O contrato relâmpago da Covaxin',
    type: 'news_investigation',
    source: 'Revista piauí',
    date: '25/06/2021',
    description: 'A anatomia do contrato de R$ 1,61 bilhão a US$ 15/dose negociado com a Precisa Medicamentos e o papel direto de Bolsonaro.',
    pdfPath: '/assets/aistudio/O_contrato_rel_mpago_da_Covaxin_-_revista_piau__21bc7bac.pdf'
  },
  {
    id: 'news-procuradoria-covaxin',
    title: 'Procuradoria vê indícios de crime e risco temerário em compra da Covaxin pela gestão Bolsonaro',
    type: 'news_investigation',
    source: 'Folha de S.Paulo',
    date: '22/06/2021',
    description: 'MPF envia inquérito para o 11º Ofício de Combate ao Crime após constatar descumprimento de prazos e pressão sobre servidores.',
    pdfPath: '/assets/aistudio/Procuradoria_v__ind_cios_de_crime_e_risco_temer_rio_em_compra_da_Covaxin_pela_gest_o_Bolsonaro_-_22_06_2021_-_Poder_-_Folha_cc4fa2d6.pdf'
  },
  {
    id: 'news-irmaos-miranda',
    title: 'É bem mais grave, diz deputado sobre relatos de irmão por pressão do governo pela Covaxin',
    type: 'news_investigation',
    source: 'Folha de S.Paulo',
    date: '22/06/2021',
    description: 'Servidor Luís Ricardo Miranda relata pressão atípica do tenente-coronel Alex Lial Marinho para aprovação de importação com invoices irregulares.',
    pdfPath: '/assets/aistudio/___bem_mais_grave___diz_deputado_sobre_relatos_de_irm_o_por_press_o_do_governo_pela_Covaxin_-_22_06_2021_-_Poder_-_Folha_c2a2a425.pdf'
  },
  {
    id: 'news-fiocruz-antro',
    title: 'A obsessão bolsonarista com o "antro esquerdista" da Fiocruz',
    type: 'news_investigation',
    source: 'Revista VEJA',
    date: '26/05/2021',
    description: 'Áudios da secretária Mayra Pinheiro na CPI atacando a Fundação Oswaldo Cruz e histórico de perseguição ideológica à ciência pública.',
    pdfPath: '/assets/aistudio/A_obsess_o_bolsonarista_com_o__antro_esquerdista__da_Fiocruz___VEJA_d988df0d.pdf'
  },
  {
    id: 'news-cloroquina-india',
    title: 'Bolsonaro pediu que premier da Índia liberasse insumos de cloroquina a laboratórios de empresários aliados',
    type: 'news_investigation',
    source: 'O Globo',
    date: '10/06/2021',
    description: 'Telegrama secreto do Itamaraty revelando telefonema de Bolsonaro a Narendra Modi em favor das empresas EMS e Apsen.',
    pdfPath: '/assets/aistudio/Bolsonaro_pediu_que_premier_da__ndia_liberasse_insumos_de_cloroquina_a_laborat_rios_de_empres_rios_aliados__leia__ntegra_da_conversa_-_Jornal_O_Globo_09877b1f.pdf'
  },
  {
    id: 'news-h1n1-comparacao',
    title: 'Por que Brasil vacinou 88 milhões em 3 meses contra H1N1 e agora patina contra covid-19',
    type: 'news_investigation',
    source: 'BBC News Brasil',
    date: '17/04/2021',
    description: 'Como o planejamento em 2010 bateu recordes mundiais e como as omissões e negacionismo de 2020-2021 travaram o SUS.',
    pdfPath: '/assets/aistudio/Por_que_Brasil_vacinou_88_milh_es_em_3_meses_contra_H1N1_e_agora_patina_contra_covid-19_-_BBC_News_Brasil_683fcbec.pdf'
  },
  {
    id: 'news-orfaos-covid',
    title: '1,3 milhão de crianças brasileiras perderam pais ou cuidadores no auge da pandemia',
    type: 'news_investigation',
    source: 'Folha de S.Paulo / The Lancet',
    date: '01/11/2025',
    description: 'Estudo pioneiro sobre o impacto social devastador da pandemia nas crianças brasileiras e a ausência de amparo do Estado.',
    pdfPath: '/assets/aistudio/1_3_milh_o_de_crian_as_ficaram__rf_s_no_Brasil_na_pandemia_-_01_11_2025_-_Equil_brio_e_Sa_de_-_Folha_c308dd2c.pdf'
  },
  {
    id: 'news-mortes-bebes',
    title: '10 vezes mais do que os EUA: por que Brasil tem tantas mortes de bebês por covid-19',
    type: 'news_investigation',
    source: 'BBC News Brasil',
    date: '13/03/2021',
    description: 'Análise epidemiológica comparativa revelando 420 mortes de bebês no Brasil contra 45 nos EUA no mesmo período.',
    pdfPath: '/assets/aistudio/_10_vezes_mais_do_que_os_EUA___por_que_Brasil_tem_tantas_mortes_de_beb_s_por_covid-19_-_BBC_News_Brasil_faf6d1ad.pdf'
  },
  {
    id: 'news-monica-calazans',
    title: '"Não tenham medo", diz Mônica Calazans, 1ª pessoa a ser vacinada no Brasil',
    type: 'news_investigation',
    source: 'G1',
    date: '17/01/2021',
    description: 'O início histórico da vacinação em São Paulo minutos após a autorização emergencial da Anvisa para a CoronaVac.',
    pdfPath: '/assets/aistudio/_N_o_tenham_medo___diz_M_nica_Calazans__1__pessoa_a_ser_vacinada_no_Brasil___G1_ba8ec71e.pdf'
  },
  {
    id: 'news-stf-estados-compra',
    title: 'STF autoriza estados e municípios a comprar vacinas contra Covid se União descumprir plano',
    type: 'news_investigation',
    source: 'G1',
    date: '23/02/2021',
    description: 'Decisão unânime do Supremo garantindo autonomia aos entes federados para proteção da saúde coletiva perante a inércia federal.',
    pdfPath: '/assets/aistudio/STF_autoriza_estados_e_munic_pios_a_comprar_vacinas_contra_Covid_se_Uni_o_descumprir_plano___G1_f6895279.pdf'
  },
  {
    id: 'news-lancha-lago-paranoa',
    title: 'Uma tarde no lago: Churrasco na lancha com Flávio Bolsonaro e lobistas durante a pandemia',
    type: 'news_investigation',
    source: 'Revista piauí',
    date: '21/10/2026',
    description: 'Encontro em Brasília entre o filho do presidente, operadores da Precisa Medicamentos e presente de Rolex em dia com mais de 1.200 mortos.',
    pdfPath: '/assets/aistudio/Uma_tarde_no_lago_-_revista_piau__12ac22f2.pdf'
  },
  {
    id: 'news-flavio-bndes',
    title: 'Flávio Bolsonaro abriu as portas do BNDES para dono da Precisa',
    type: 'news_investigation',
    source: 'Revista VEJA',
    date: '25/06/2021',
    description: 'Intermediação oficial em agenda do banco estatal para executivos ligados à importação da Covaxin.',
    pdfPath: '/assets/aistudio/Fl_vio_Bolsonaro_abriu_as_portas_do_BNDES_para_dono_da_Precisa___VEJA_346a13d5.pdf'
  },
  {
    id: 'news-flavio-hospitais-rio',
    title: 'Flávio Bolsonaro chefiava esquema de corrupção em hospitais do Rio, denuncia deputado',
    type: 'news_investigation',
    source: 'Revista Fórum',
    date: '30/03/2026',
    description: 'Depoimento do deputado Otoni de Paula sobre ingerência e indicações políticas na rede federal hospitalar do RJ.',
    pdfPath: '/assets/aistudio/Fl_vio_Bolsonaro_chefiava_esquema_de_corrup__o_em_hospitais_do_Rio__denuncia_deputado_-_Revista_F_rum_ad334be4.pdf'
  },
  {
    id: 'news-vacina-suspeita-vaxxinity',
    title: 'Exclusivo: A vacina suspeita da família Bolsonaro (Vaxxinity)',
    type: 'news_investigation',
    source: 'Revista ISTOÉ',
    date: '26/08/2021',
    description: 'Troca de e-mails apontando negociação paralela de vacina experimental sem aval da Anvisa ou FDA durante viagem a Washington.',
    pdfPath: '/assets/aistudio/Exclusivo__A_vacina_suspeita_da_fam_lia_Bolsonaro_-_Revista_Isto__a129c46f.pdf'
  },
  {
    id: 'news-flavio-negociacao-suspeita',
    title: 'Flávio Bolsonaro participou de negociação suspeita para compra de vacina',
    type: 'news_investigation',
    source: 'ISTOÉ Dinheiro',
    date: '26/08/2021',
    description: 'Encaminhamento urgente ao secretário-executivo da Saúde para negociar imunizante experimental com empresário do RJ.',
    pdfPath: '/assets/aistudio/Fl_vio_Bolsonaro_participou_de_negocia__o_suspeita_para_compra_de_vacina_-_ISTO__DINHEIRO_4f92f06f.pdf'
  },
  {
    id: 'news-guedes-funerarias',
    title: 'Ex-gestora de fundos de Paulo Guedes investiu R$ 350 milhões em funerárias',
    type: 'news_investigation',
    source: 'Correio Braziliense',
    date: '29/09/2021',
    description: 'Aporte milionário no Grupo Zelo (45 empresas do mercado funerário e cemitérios) no momento em que o país batia 120 mil mortos.',
    pdfPath: '/assets/aistudio/Ex-gestora_de_fundos__de_Paulo_Guedes__investiu_R__350_milh_es_em_funer_rias_d9b66a29.pdf'
  },
  {
    id: 'news-wizard-nao-doar-sus',
    title: 'Líder de grupo que negocia vacinas, Carlos Wizard não quer doar doses ao SUS',
    type: 'news_investigation',
    source: 'Poder360',
    date: '13/03/2021',
    description: 'Empresário e conselheiro informal do governo afirma que exigência legal de doar 50% das doses privadas ao SUS é descabida.',
    pdfPath: '/assets/aistudio/L_der_de_grupo_que_negocia_vacinas__Carlos_Wizard_n_o_quer_doar_doses_ao_SUS_21a1e207.pdf'
  },
  {
    id: 'news-wizard-hang-empresarios',
    title: 'Com Wizard e Hang à frente, empresários querem comprar vacinas contra Covid',
    type: 'news_investigation',
    source: 'Folha de S.Paulo',
    date: '26/02/2021',
    description: 'Investida de empresários bolsonaristas para adquirir doses privadas no mercado internacional.',
    pdfPath: '/assets/aistudio/Com_Wizard_e_Hang___frente__empres_rios_querem_comprar_vacinas_contra_Covid_-_26_02_2021_-_Equil_brio_e_Sa_de_-_Folha_cc61891a.pdf'
  },
  {
    id: 'news-clinicas-mudanca-lei',
    title: 'Clínicas privadas querem mudança na lei de vacina para não doar doses ao SUS',
    type: 'news_investigation',
    source: 'Folha de S.Paulo',
    date: '11/03/2021',
    description: 'ABCVAC anuncia tentativa de recorrer ao Congresso e judicializar o tema para vender doses de Covaxin sem contrapartida ao SUS.',
    pdfPath: '/assets/aistudio/Cl_nicas_privadas_querem_mudan_a_na_lei_de_vacina_para_n_o_doar_doses_ao_SUS_-_11_03_2021_-_Equil_brio_e_Sa_de_-_Folha_efbff1f5.pdf'
  },
  {
    id: 'news-clinicas-india-negociacao',
    title: 'Clínicas particulares vão à Índia negociar compra de vacina contra Covid',
    type: 'news_investigation',
    source: 'Folha de S.Paulo / Agora SP',
    date: '03/01/2021',
    description: 'Comitiva de clínicas privadas viaja a Nova Déli para negociar 5 milhões de doses da Bharat Biotech.',
    pdfPath: '/assets/aistudio/Cl_nicas_particulares_v_o____ndia_negociar_compra_de_vacina_contra_Covid_-_03_01_2021_-_S_o_Paulo_-_Agora_23bf5dfc.pdf'
  },
  {
    id: 'news-bharat-precisa-acordo',
    title: 'Indiana Bharat fecha acordo para fornecer vacina contra Covid-19 a empresa brasileira',
    type: 'news_investigation',
    source: 'G1',
    date: '12/01/2021',
    description: 'Anúncio formal da representação da Covaxin pela Precisa Medicamentos no Brasil antes da conclusão da Fase 3 de testes clínicos.',
    pdfPath: '/assets/aistudio/Indiana_Bharat_fecha_acordo_para_fornecer_vacina_contra_Covid-19_a_empresa_brasileira___G1_5c3d524d.pdf'
  },
  {
    id: 'news-bolsonaro-vacina-privada-aval',
    title: 'Bolsonaro dá aval a compra de vacina privada, mas empresas negam processo',
    type: 'news_investigation',
    source: 'Revista VEJA',
    date: '26/01/2021',
    description: 'Bolsonaro declara apoio à compra de 33 milhões de doses por conglomerados empresariais, mas multinacionais negam negociação paralela.',
    pdfPath: '/assets/aistudio/Bolsonaro_d__aval_a_compra_de_vacina_privada__mas_empresas_negam_processo___VEJA_ba3e7827.pdf'
  },
  {
    id: 'news-mp-tcu-suspensao-covaxin',
    title: 'MP junto ao TCU pede suspensão de compra da Covaxin pelo Ministério da Saúde',
    type: 'news_investigation',
    source: 'UOL / Reuters',
    date: '26/02/2021',
    description: 'Subprocurador-geral Lucas Furtado contesta contrato de R$ 1,614 bilhão por vacina sem autorização para testes de fase 3 no Brasil.',
    pdfPath: '/assets/aistudio/MP_junto_ao_TCU_pede_suspens_o_de_compra_da_Covaxin_pelo_Minist_rio_da_Sa_de_-_26_02_2021_-_UOL_Economia_3784e9bf.pdf'
  }
];
