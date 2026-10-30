/**
 * PÃO DIVINO - Catálogo Oficial do E-book: 30 Sucos Detox (Saúde e Fé em Cada Copo)
 * Numerados de acordo com os slides originais do e-book.
 */

const SUCOS_DETOX_RECIPES = [
  {
    "id": "detox-02-suco-verde-completo",
    "pageNumber": 2,
    "title": "02 - Suco Verde Detox Completo",
    "subtitle": "Purificação profunda do organismo e oxigenação celular",
    "category": "detox-sucos",
    "prepTime": "5 min",
    "bakeTime": "0 min",
    "totalTime": "5 min",
    "servings": 1,
    "servingUnit": "copo (300ml)",
    "difficulty": "Muito Fácil",
    "image": "./images/sucos_detox/02_suco_verde_detox_completo.jpg",
    "badge": "Verde Purificador",
    "tags": [
      "Suco Detox",
      "Verde",
      "Clorofila",
      "Fibras",
      "Sem Açúcar"
    ],
    "verse": "Gênesis 1:29",
    "verseText": "E disse Deus: Eis que vos tenho dado todas as ervas que dão semente e todas as árvores frutíferas.",
    "ingredients": [
      {
        "name": "Folhas de Couve manteiga",
        "amount": 2,
        "unit": "folhas",
        "notes": "bem lavadas"
      },
      {
        "name": "Maçã verde com casca",
        "amount": 1,
        "unit": "unidade",
        "notes": "sem sementes"
      },
      {
        "name": "Pepino com casca",
        "amount": 1,
        "unit": "unidade",
        "notes": "em rodelas"
      },
      {
        "name": "Sementes de Chia",
        "amount": 1,
        "unit": "colher de sopa",
        "notes": "fonte de ômega-3"
      },
      {
        "name": "Suco de Limão fresco",
        "amount": 1,
        "unit": "unidade",
        "notes": "espremido na hora"
      },
      {
        "name": "Água de coco gelada",
        "amount": 200,
        "unit": "ml",
        "notes": "ou água mineral"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Bater no Liquidificador",
        "description": "Coloque a água de coco, a couve rasgada, a maçã em pedaços, o pepino, o suco de limão e a chia no liquidificador.",
        "timerSeconds": 120
      },
      {
        "step": 2,
        "title": "Beber sem Coar",
        "description": "Bata em velocidade alta por 2 minutos até ficar completamente homogêneo. Beba imediatamente sem coar para preservar as fibras prebióticas.",
        "timerSeconds": 30
      }
    ],
    "tips": "A combinação de couve com limão multiplica a absorção de ferro vegetal e ativa as enzimas hepáticas desintoxicantes."
  },
  {
    "id": "detox-03-abacaxi-hortela-gengibre",
    "pageNumber": 3,
    "title": "03 - Suco Detox de Abacaxi com Hortelã e Gengibre",
    "subtitle": "Digestão perfeita, alívio de inchaço e ação anti-inflamatória",
    "category": "detox-sucos",
    "prepTime": "5 min",
    "bakeTime": "0 min",
    "totalTime": "5 min",
    "servings": 1,
    "servingUnit": "copo (300ml)",
    "difficulty": "Muito Fácil",
    "image": "./images/sucos_detox/03_suco_detox_abacaxi_hortela_gengibre.jpg",
    "badge": "Digestivo & Refrescante",
    "tags": [
      "Suco Detox",
      "Digestivo",
      "Gengibre",
      "Termogênico",
      "Refrescante"
    ],
    "verse": "Gênesis 1:29",
    "verseText": "Alimente seu corpo com o que a terra oferece de melhor.",
    "ingredients": [
      {
        "name": "Abacaxi maduro",
        "amount": 2,
        "unit": "fatias grossas",
        "notes": "com miolo rico em bromelina"
      },
      {
        "name": "Folhas de Hortelã fresca",
        "amount": 10,
        "unit": "folhas",
        "notes": "higienizadas"
      },
      {
        "name": "Gengibre fresco ralado",
        "amount": 2,
        "unit": "cm",
        "notes": "pedacinho sem casca"
      },
      {
        "name": "Farinha de Linhaça dourada",
        "amount": 1,
        "unit": "colher de sopa",
        "notes": "fibras nobres"
      },
      {
        "name": "Água gelada filtrada",
        "amount": 200,
        "unit": "ml",
        "notes": ""
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Adicionar Ingredientes",
        "description": "Coloque as fatias de abacaxi picadas, a hortelã, o gengibre ralado, a linhaça e a água gelada no copo do liquidificador.",
        "timerSeconds": 60
      },
      {
        "step": 2,
        "title": "Bater Bem",
        "description": "Bata em velocidade máxima por cerca de 2 minutos até desmanchar todas as fibras do abacaxi. Sirva gelado sem coar.",
        "timerSeconds": 120
      }
    ],
    "tips": "A bromelina do abacaxi atua como enzima digestiva natural de proteínas pesadas, reduzindo a sensação de estufamento pós-refeição."
  },
  {
    "id": "detox-04-limao-couve-hortela",
    "pageNumber": 4,
    "title": "04 - Suco Detox de Limão com Couve e Hortelã",
    "subtitle": "Alcalinização sanguínea e hidratação revigorante",
    "category": "detox-sucos",
    "prepTime": "5 min",
    "bakeTime": "0 min",
    "totalTime": "5 min",
    "servings": 1,
    "servingUnit": "copo (250ml)",
    "difficulty": "Muito Fácil",
    "image": "./images/sucos_detox/04_suco_detox_limao_couve_hortela.jpg",
    "badge": "Alcalinizante",
    "tags": [
      "Suco Detox",
      "Alcalino",
      "Imunidade",
      "Vitamina C"
    ],
    "verse": "Gênesis 1:29",
    "verseText": "A terra produz o sustento que renova a força matinal.",
    "ingredients": [
      {
        "name": "Limões frescos",
        "amount": 1.5,
        "unit": "unidades",
        "notes": "suco espremido"
      },
      {
        "name": "Folhas de Couve manteiga",
        "amount": 2,
        "unit": "folhas",
        "notes": "sem talo central grosso"
      },
      {
        "name": "Hortelã fresca",
        "amount": 1,
        "unit": "pequeno maço",
        "notes": "cerca de 10-12 folhas"
      },
      {
        "name": "Água gelada",
        "amount": 200,
        "unit": "ml",
        "notes": ""
      },
      {
        "name": "Mel puro de abelha",
        "amount": 1,
        "unit": "colher de chá",
        "notes": "opcional, a gosto"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Extrair o Suco",
        "description": "Esprema o suco dos limões. No liquidificador, junte o suco de limão, a couve, as folhas de hortelã e a água gelada.",
        "timerSeconds": 60
      },
      {
        "step": 2,
        "title": "Bater e Servir",
        "description": "Bata até obter uma mistura aveludada e espumante. Adoce com mel se preferir e sirva imediatamente com pedras de gelo.",
        "timerSeconds": 90
      }
    ],
    "tips": "O limão, apesar de ácido ao paladar, possui efeito altamente alcalinizante no pH do sangue após ser metabolizado."
  },
  {
    "id": "detox-05-desintoxicante-verde",
    "pageNumber": 5,
    "title": "05 - Suco Detox Desintoxicante Verde Intenso",
    "subtitle": "Brotos vivos, aipo e couve para purificação celular profunda",
    "category": "detox-sucos",
    "prepTime": "7 min",
    "bakeTime": "0 min",
    "totalTime": "7 min",
    "servings": 1,
    "servingUnit": "copo (300ml)",
    "difficulty": "Fácil",
    "image": "./images/sucos_detox/05_suco_detox_desintoxicante_verde.jpg",
    "badge": "Super Clorofila",
    "tags": [
      "Suco Detox",
      "Brotos Vivos",
      "Aipo",
      "Diurético",
      "Detox Máximo"
    ],
    "verse": "Gênesis 1:29",
    "verseText": "Eis que vos tenho dado todas as ervas verdes que dão semente.",
    "ingredients": [
      {
        "name": "Couve manteiga",
        "amount": 4,
        "unit": "folhas",
        "notes": "frescas"
      },
      {
        "name": "Pepinos com casca",
        "amount": 2,
        "unit": "unidades",
        "notes": "ricos em silício e água"
      },
      {
        "name": "Talos de Aipo / Salsão",
        "amount": 6,
        "unit": "talos",
        "notes": "apenas talos crocantes"
      },
      {
        "name": "Maçã com casca",
        "amount": 1,
        "unit": "unidade",
        "notes": "vermelha ou verde"
      },
      {
        "name": "Brotos de girassol ou alfafa",
        "amount": 1,
        "unit": "xícara",
        "notes": "enzimas vivas e minerais"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Processar na Centrífuga ou Liquidificador",
        "description": "Passe todos os ingredientes na centrífuga de sucos ou bata no liquidificador com 100ml de água mineral gelada.",
        "timerSeconds": 180
      },
      {
        "step": 2,
        "title": "Consumo Imediato",
        "description": "Beba de imediato para absorver o máximo de enzimas vivas e clorofila intacta.",
        "timerSeconds": 30
      }
    ],
    "tips": "O aipo contém sódio orgânico bioativo que ajuda na regulação da pressão arterial e estimula a drenagem linfática natural."
  },
  {
    "id": "detox-06-cenoura-maca-chia",
    "pageNumber": 6,
    "title": "06 - Suco Detox de Cenoura com Maçã e Chia",
    "subtitle": "Betacaroteno para visão, pele radiante e saciedade prolongada",
    "category": "detox-sucos",
    "prepTime": "5 min",
    "bakeTime": "0 min",
    "totalTime": "5 min",
    "servings": 1,
    "servingUnit": "copo (300ml)",
    "difficulty": "Muito Fácil",
    "image": "./images/sucos_detox/06_suco_detox_cenoura_maca_chia.jpg",
    "badge": "Pele & Visão",
    "tags": [
      "Suco Detox",
      "Betacaroteno",
      "Pele",
      "Chia",
      "Energia"
    ],
    "verse": "Gênesis 1:29",
    "verseText": "Alimento da terra que rejuvenesce o vigor da juventude.",
    "ingredients": [
      {
        "name": "Cenoura fresca",
        "amount": 0.5,
        "unit": "unidade",
        "notes": "lavada e picada"
      },
      {
        "name": "Maçã fuji ou verde",
        "amount": 1,
        "unit": "unidade",
        "notes": "com casca"
      },
      {
        "name": "Pepino",
        "amount": 0.5,
        "unit": "unidade",
        "notes": "com casca"
      },
      {
        "name": "Sementes de Chia",
        "amount": 1,
        "unit": "colher de sopa",
        "notes": "gel prebiótico"
      },
      {
        "name": "Folha de Couve",
        "amount": 1,
        "unit": "folha",
        "notes": ""
      },
      {
        "name": "Água de coco gelada",
        "amount": 200,
        "unit": "ml",
        "notes": ""
      },
      {
        "name": "Folhas de Hortelã",
        "amount": 4,
        "unit": "folhas",
        "notes": "a gosto"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Liquidificador Potente",
        "description": "Junte a cenoura ralada ou picada, a maçã, o pepino, a couve, a chia, a hortelã e a água de coco gelada.",
        "timerSeconds": 60
      },
      {
        "step": 2,
        "title": "Bater por 4 Minutos",
        "description": "Bata por 4 minutos completos para que a chia solte suas fibras mucilaginosas e a cenoura fique completamente lisa.",
        "timerSeconds": 240
      }
    ],
    "tips": "O betacaroteno da cenoura aliado às gorduras boas da semente de chia é absorvido com eficiência máxima pelo organismo."
  },
  {
    "id": "detox-07-couve-maca-gengibre",
    "pageNumber": 7,
    "title": "07 - Suco Detox de Couve e Maçã com Gengibre",
    "subtitle": "O clássico revigorante para começar a manhã com disposição",
    "category": "detox-sucos",
    "prepTime": "4 min",
    "bakeTime": "0 min",
    "totalTime": "4 min",
    "servings": 1,
    "servingUnit": "copo (300ml)",
    "difficulty": "Muito Fácil",
    "image": "./images/sucos_detox/07_suco_detox_couve_maca_gengibre.jpg",
    "badge": "Despertar Vital",
    "tags": [
      "Suco Detox",
      "Clássico",
      "Gengibre",
      "Metabolismo",
      "Manhã"
    ],
    "verse": "Gênesis 1:29",
    "verseText": "Ervas que nutrem e despertam as forças do corpo.",
    "ingredients": [
      {
        "name": "Folha de Couve manteiga",
        "amount": 1,
        "unit": "folha grande",
        "notes": "fresca"
      },
      {
        "name": "Maçã madura",
        "amount": 1,
        "unit": "unidade",
        "notes": "com casca"
      },
      {
        "name": "Gengibre fresco",
        "amount": 3,
        "unit": "lascas finas",
        "notes": "cerca de 2cm"
      },
      {
        "name": "Água de coco gelada",
        "amount": 200,
        "unit": "ml",
        "notes": ""
      },
      {
        "name": "Água mineral gelada",
        "amount": 100,
        "unit": "ml",
        "notes": ""
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Bater no Liquidificador",
        "description": "Coloque a couve rasgada com as mãos, a maçã fatiada, as lascas de gengibre e os líquidos no liquidificador.",
        "timerSeconds": 60
      },
      {
        "step": 2,
        "title": "Bater por 2 Minutos",
        "description": "Bata por 2 minutos em potência alta. Beba sem coar imediatamente para usufruir dos compostos termogênicos do gengibre.",
        "timerSeconds": 120
      }
    ],
    "tips": "O gingerol estimula a produção de calor corporal (termogênese) e acelera a digestão dos alimentos ao longo do dia."
  },
  {
    "id": "detox-08-verde-com-quinoa",
    "pageNumber": 8,
    "title": "08 - Suco Detox Verde com Quinoa em Flocos",
    "subtitle": "Proteína vegetal ancestral e minerais essenciais para fortalecimento",
    "category": "detox-sucos",
    "prepTime": "5 min",
    "bakeTime": "0 min",
    "totalTime": "5 min",
    "servings": 1,
    "servingUnit": "copo (300ml)",
    "difficulty": "Muito Fácil",
    "image": "./images/sucos_detox/08_suco_detox_verde_quinoa.jpg",
    "badge": "Proteico & Nutritivo",
    "tags": [
      "Suco Detox",
      "Quinoa",
      "Proteína Vegetal",
      "Minerais",
      "Saciedade"
    ],
    "verse": "Gênesis 1:29",
    "verseText": "Grãos e sementes dados por Deus para sustento completo.",
    "ingredients": [
      {
        "name": "Folha de Couve manteiga",
        "amount": 1,
        "unit": "folha",
        "notes": "rasgada"
      },
      {
        "name": "Maçãs pequenas",
        "amount": 2,
        "unit": "unidades",
        "notes": "com casca"
      },
      {
        "name": "Talo de Salsão / Aipo",
        "amount": 1,
        "unit": "talo",
        "notes": "limpo"
      },
      {
        "name": "Quinoa em flocos",
        "amount": 1,
        "unit": "colher de sopa",
        "notes": "grão ancestral completo"
      },
      {
        "name": "Água de coco gelada",
        "amount": 200,
        "unit": "ml",
        "notes": ""
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Colocar no Liquidificador",
        "description": "Adicione a folha de couve, as maçãs em cubos, o talo de salsão fatiado, a quinoa em flocos e a água de coco gelada.",
        "timerSeconds": 60
      },
      {
        "step": 2,
        "title": "Bater e Beber",
        "description": "Bata por 2 minutos até que a quinoa se incorpore totalmente no suco líquido. Beba sem coar.",
        "timerSeconds": 120
      }
    ],
    "tips": "A quinoa em flocos fornece todos os 9 aminoácidos essenciais, transformando este detox em um potente shake pós-treino ou matinal."
  },
  {
    "id": "detox-09-fluidez-total",
    "pageNumber": 9,
    "title": "09 - Suco Detox Fluidez Total",
    "subtitle": "Lima da Pérsia, maçã e limão para desintoxicação biliar e leveza",
    "category": "detox-sucos",
    "prepTime": "4 min",
    "bakeTime": "0 min",
    "totalTime": "4 min",
    "servings": 1,
    "servingUnit": "copo (300ml)",
    "difficulty": "Muito Fácil",
    "image": "./images/sucos_detox/09_suco_detox_fluidez_total.jpg",
    "badge": "Fluidez & Fígado",
    "tags": [
      "Suco Detox",
      "Lima da Pérsia",
      "Fígado",
      "Vitamina C",
      "Leveza"
    ],
    "verse": "Gênesis 1:29",
    "verseText": "Frutos puros que limpam as vias e renovam a disposição.",
    "ingredients": [
      {
        "name": "Lima da Pérsia",
        "amount": 1,
        "unit": "unidade",
        "notes": "descascada, sem parte branca central"
      },
      {
        "name": "Maçãs vermelhas",
        "amount": 2,
        "unit": "unidades",
        "notes": "com casca e sem sementes"
      },
      {
        "name": "Limão taiti",
        "amount": 1,
        "unit": "unidade",
        "notes": "suco espremido"
      },
      {
        "name": "Água de coco gelada",
        "amount": 200,
        "unit": "ml",
        "notes": ""
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Preparar Frutas",
        "description": "Pique a lima da Pérsia e as maçãs. Coloque no liquidificador com o suco de limão e a água de coco gelada.",
        "timerSeconds": 60
      },
      {
        "step": 2,
        "title": "Bater e Servir",
        "description": "Bata por 2 minutos e sirva imediatamente sem coar com gelo.",
        "timerSeconds": 120
      }
    ],
    "tips": "A lima da Pérsia é uma das frutas cítricas mais suaves e menos ácidas, sendo a queridinha dos médicos para recuperação gástrica e hepática."
  },
  {
    "id": "detox-10-barriga-perfeita",
    "pageNumber": 10,
    "title": "10 - Suco Detox Barriga Perfeita",
    "subtitle": "Melancia hidratante, salsão e erva-doce para desinchar o abdômen",
    "category": "detox-sucos",
    "prepTime": "5 min",
    "bakeTime": "0 min",
    "totalTime": "5 min",
    "servings": 1,
    "servingUnit": "copo (300ml)",
    "difficulty": "Muito Fácil",
    "image": "./images/sucos_detox/10_suco_detox_barriga_perfeita.jpg",
    "badge": "Desincha Rápido",
    "tags": [
      "Suco Detox",
      "Melancia",
      "Erva-doce",
      "Secar Barriga",
      "Diurético"
    ],
    "verse": "Gênesis 1:29",
    "verseText": "A terra nos fornece o alívio que renova as energias do templo.",
    "ingredients": [
      {
        "name": "Melancia fresca em cubos",
        "amount": 1,
        "unit": "fatia generosa",
        "notes": "com parte branca próxima à casca rica em citrulina"
      },
      {
        "name": "Talos de Salsão fresco",
        "amount": 3,
        "unit": "talos",
        "notes": "picados"
      },
      {
        "name": "Talos ou sementes de Erva-doce",
        "amount": 3,
        "unit": "talos",
        "notes": "ação carminativa contra gases"
      },
      {
        "name": "Água de coco gelada",
        "amount": 200,
        "unit": "ml",
        "notes": ""
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Colocar no Liquidificador",
        "description": "Coloque a melancia, o salsão e a erva-doce com a água de coco no liquidificador.",
        "timerSeconds": 60
      },
      {
        "step": 2,
        "title": "Bater Bem",
        "description": "Bata muito bem por 2 minutos até triturar todos os talos. Beba sem coar para agir no trânsito intestinal.",
        "timerSeconds": 120
      }
    ],
    "tips": "A erva-doce elimina gases intestinais e cólicas, enquanto o salsão drena o excesso de líquido retido na região abdominal."
  },
  {
    "id": "detox-12-suco-rosa-beterraba",
    "pageNumber": 12,
    "title": "12 - Suco Rosa Detox com Beterraba e Morango",
    "subtitle": "Óxido nítrico para circulação, energia física e antioxidantes potentes",
    "category": "detox-sucos",
    "prepTime": "6 min",
    "bakeTime": "0 min",
    "totalTime": "6 min",
    "servings": 1,
    "servingUnit": "copo (300ml)",
    "difficulty": "Fácil",
    "image": "./images/sucos_detox/12_suco_rosa_detox_beterraba.jpg",
    "badge": "Coração & Resistência",
    "tags": [
      "Suco Detox",
      "Beterraba",
      "Morango",
      "Iogurte",
      "Antioxidante"
    ],
    "verse": "Salmos 147:3",
    "verseText": "Ele cura os que têm o coração quebrantado e sara as suas feridas.",
    "ingredients": [
      {
        "name": "Beterraba crua",
        "amount": 1,
        "unit": "unidade média",
        "notes": "bem lavada e picada"
      },
      {
        "name": "Suco de Laranja fresca",
        "amount": 1,
        "unit": "unidade",
        "notes": "espremida"
      },
      {
        "name": "Morangos frescos",
        "amount": 5,
        "unit": "unidades",
        "notes": "picados"
      },
      {
        "name": "Iogurte natural integral",
        "amount": 1,
        "unit": "pote (170g)",
        "notes": "probióticos vivos"
      },
      {
        "name": "Folhas de Hortelã",
        "amount": 2,
        "unit": "folhas",
        "notes": ""
      },
      {
        "name": "Pedaço de Gengibre",
        "amount": 1,
        "unit": "lasca (1cm)",
        "notes": ""
      },
      {
        "name": "Água gelada filtrada",
        "amount": 200,
        "unit": "ml",
        "notes": ""
      },
      {
        "name": "Mel puro",
        "amount": 1,
        "unit": "colher de chá",
        "notes": "opcional para adoçar"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Bater no Liquidificador",
        "description": "Junte a beterraba picada, suco de laranja, morangos, iogurte, gengibre, hortelã e água gelada.",
        "timerSeconds": 60
      },
      {
        "step": 2,
        "title": "Bater por 4 Minutos",
        "description": "Bata intensamente por 4 minutos até criar uma consistência cremosa como um smoothie cor de rosa vivo. Sirva bem gelado.",
        "timerSeconds": 240
      }
    ],
    "tips": "Os nitratos naturais da beterraba se transformam em óxido nítrico no corpo, dilatando vasos sanguíneos e oxigenando músculos e cérebro."
  },
  {
    "id": "detox-13-acerola-rejuvenescedor",
    "pageNumber": 13,
    "title": "13 - Suco Detox Acerola Rejuvenescedor",
    "subtitle": "Mega dose de vitamina C natural para síntese de colágeno e firmeza da pele",
    "category": "detox-sucos",
    "prepTime": "5 min",
    "bakeTime": "0 min",
    "totalTime": "5 min",
    "servings": 1,
    "servingUnit": "copo (300ml)",
    "difficulty": "Muito Fácil",
    "image": "./images/sucos_detox/13_suco_detox_acerola_rejuvenescedor.jpg",
    "badge": "Colágeno & Firmeza",
    "tags": [
      "Suco Detox",
      "Acerola",
      "Vitamina C",
      "Colágeno",
      "Chia"
    ],
    "verse": "Salmos 147:3",
    "verseText": "Renova tuas células e floresce com a bênção que Deus plantou em ti.",
    "ingredients": [
      {
        "name": "Acerolas frescas ou polpa",
        "amount": 10,
        "unit": "unidades",
        "notes": "riquíssimas em ácido ascórbico"
      },
      {
        "name": "Morangos frescos",
        "amount": 3,
        "unit": "unidades",
        "notes": "lavados"
      },
      {
        "name": "Iogurte natural desnatado",
        "amount": 200,
        "unit": "g",
        "notes": ""
      },
      {
        "name": "Sementes de Chia",
        "amount": 1,
        "unit": "colher de sopa",
        "notes": ""
      },
      {
        "name": "Água de coco gelada",
        "amount": 200,
        "unit": "ml",
        "notes": ""
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Bater Frutas e Iogurte",
        "description": "Bata a acerola, o morango, o iogurte natural e a água de coco no liquidificador por 2 minutos.",
        "timerSeconds": 120
      },
      {
        "step": 2,
        "title": "Adicionar Chia",
        "description": "Despeje no copo, adicione a colher de chia, mexa delicadamente com a colher e beba sem coar.",
        "timerSeconds": 30
      }
    ],
    "tips": "10 acerolas contêm até 30 vezes mais vitamina C do que uma laranja inteira, essencial para ativar a produção de colágeno pelo corpo."
  },
  {
    "id": "detox-14-anti-envelhecimento",
    "pageNumber": 14,
    "title": "14 - Suco Detox Anti-Envelhecimento",
    "subtitle": "Resveratrol da uva e licopeno do tomate contra radicais livres",
    "category": "detox-sucos",
    "prepTime": "4 min",
    "bakeTime": "0 min",
    "totalTime": "4 min",
    "servings": 1,
    "servingUnit": "copo (300ml)",
    "difficulty": "Muito Fácil",
    "image": "./images/sucos_detox/14_suco_detox_anti_envelhecimento.jpg",
    "badge": "Juventude Celular",
    "tags": [
      "Suco Detox",
      "Resveratrol",
      "Licopeno",
      "Longevidade"
    ],
    "verse": "Salmos 147:3",
    "verseText": "Ele cura e renova a vitalidade do corpo.",
    "ingredients": [
      {
        "name": "Uvas roxas com casca e semente",
        "amount": 10,
        "unit": "unidades",
        "notes": "fonte de resveratrol puro"
      },
      {
        "name": "Tomate maduro médio",
        "amount": 1,
        "unit": "unidade",
        "notes": "rico em licopeno"
      },
      {
        "name": "Damascos secos ou frescos",
        "amount": 2,
        "unit": "unidades",
        "notes": "vitamina A e ferro"
      },
      {
        "name": "Água de coco gelada",
        "amount": 200,
        "unit": "ml",
        "notes": ""
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Adicionar ao Liquidificador",
        "description": "Coloque as uvas roxas inteiras, o tomate picado, os damascos e a água de coco no copo do liquidificador.",
        "timerSeconds": 60
      },
      {
        "step": 2,
        "title": "Bater e Servir",
        "description": "Bata em velocidade alta por 2 minutos e meio. Beba imediatamente sem coar para aproveitar todo o resveratrol.",
        "timerSeconds": 150
      }
    ],
    "tips": "O resveratrol das uvas atua nos genes da longevidade (sirtuínas) e protege os vasos sanguíneos contra oxidação precoce."
  },
  {
    "id": "detox-15-contra-diabetes",
    "pageNumber": 15,
    "title": "15 - Suco Detox Contra a Diabetes & Equilíbrio Glicêmico",
    "subtitle": "Framboesa de baixo índice glicêmico e goji berry para controle de açúcar",
    "category": "detox-sucos",
    "prepTime": "4 min",
    "bakeTime": "0 min",
    "totalTime": "4 min",
    "servings": 1,
    "servingUnit": "copo (300ml)",
    "difficulty": "Muito Fácil",
    "image": "./images/sucos_detox/15_suco_detox_contra_diabetes.jpg",
    "badge": "Controle Glicêmico",
    "tags": [
      "Suco Detox",
      "Framboesa",
      "Goji Berry",
      "Glicemia Baixa"
    ],
    "verse": "Salmos 147:3",
    "verseText": "Equilíbrio e cura para o funcionamento dos órgãos vitais.",
    "ingredients": [
      {
        "name": "Beterraba crua",
        "amount": 0.25,
        "unit": "unidade",
        "notes": "apenas um pedaço pequeno"
      },
      {
        "name": "Framboesas frescas ou congeladas",
        "amount": 1,
        "unit": "xícara (100g)",
        "notes": "baixíssimo índice glicêmico"
      },
      {
        "name": "Goji berry desidratada",
        "amount": 1,
        "unit": "colher de sopa",
        "notes": "hidratada por 5 min em água morna"
      },
      {
        "name": "Água de coco gelada",
        "amount": 200,
        "unit": "ml",
        "notes": ""
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Bater no Liquidificador",
        "description": "Coloque o pedaço de beterraba, as framboesas, a goji berry hidratada e a água de coco no liquidificador.",
        "timerSeconds": 60
      },
      {
        "step": 2,
        "title": "Bater e Beber sem Coar",
        "description": "Bata por 2 minutos. As fibras das framboesas formam uma barreira que retarda a absorção de glicose no sangue.",
        "timerSeconds": 120
      }
    ],
    "tips": "Framboesas são ricas em ácido elágico e fibras insolúveis que evitam picos de insulina após as refeições."
  },
  {
    "id": "detox-16-goji-berry-cranberry",
    "pageNumber": 16,
    "title": "16 - Suco Rosa com Goji Berry e Cranberry",
    "subtitle": "Saúde do trato urinário, proteção renal e antioxidantes nobres",
    "category": "detox-sucos",
    "prepTime": "5 min",
    "bakeTime": "0 min",
    "totalTime": "5 min",
    "servings": 1,
    "servingUnit": "copo (300ml)",
    "difficulty": "Muito Fácil",
    "image": "./images/sucos_detox/16_suco_rosa_goji_berry_cranberry.jpg",
    "badge": "Rins & Vias Urinárias",
    "tags": [
      "Suco Detox",
      "Cranberry",
      "Goji Berry",
      "Rins",
      "Rosa"
    ],
    "verse": "Salmos 147:3",
    "verseText": "Pureza que lava e protege o templo do corpo.",
    "ingredients": [
      {
        "name": "Beterraba ralada crua",
        "amount": 2,
        "unit": "colheres de sopa",
        "notes": ""
      },
      {
        "name": "Maçã fuji",
        "amount": 0.5,
        "unit": "unidade",
        "notes": "com casca"
      },
      {
        "name": "Gengibre",
        "amount": 1,
        "unit": "lasca pequena",
        "notes": ""
      },
      {
        "name": "Suco de Cranberry integral sem açúcar",
        "amount": 200,
        "unit": "ml",
        "notes": ""
      },
      {
        "name": "Goji berry hidratada",
        "amount": 1,
        "unit": "colher de sopa",
        "notes": ""
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Bater Ingredientes",
        "description": "No liquidificador, junte a beterraba ralada, a maçã em cubos, a lasca de gengibre, o suco de cranberry e a goji berry.",
        "timerSeconds": 60
      },
      {
        "step": 2,
        "title": "Bater por 3 Minutos",
        "description": "Bata por 3 minutos até ficar completamente liso e uniforme. Sirva bem gelado com pedras de gelo.",
        "timerSeconds": 180
      }
    ],
    "tips": "O cranberry possui proantocianidinas tipo A, que impedem a fixação de bactérias patogênicas nas paredes da bexiga e dos rins."
  },
  {
    "id": "detox-17-bomba-imunologica",
    "pageNumber": 17,
    "title": "17 - Suco Detox Bomba Imunológica",
    "subtitle": "Amoras, ameixa e sementes de abóbora ricas em zinco protetor",
    "category": "detox-sucos",
    "prepTime": "5 min",
    "bakeTime": "0 min",
    "totalTime": "5 min",
    "servings": 1,
    "servingUnit": "copo (300ml)",
    "difficulty": "Muito Fácil",
    "image": "./images/sucos_detox/17_suco_detox_bomba_imunologica.jpg",
    "badge": "Escudo Imunológico",
    "tags": [
      "Suco Detox",
      "Imunidade",
      "Zinco",
      "Amoras",
      "Antocianinas"
    ],
    "verse": "Salmos 147:3",
    "verseText": "Ele cura e restaura as defesas com as riquezas da criação.",
    "ingredients": [
      {
        "name": "Ameixas frescas",
        "amount": 2,
        "unit": "unidades",
        "notes": "sem caroço"
      },
      {
        "name": "Amoras frescas ou congeladas",
        "amount": 1,
        "unit": "xícara (150g)",
        "notes": "antocianinas roxas"
      },
      {
        "name": "Sementes de Abóbora sem casca",
        "amount": 1,
        "unit": "colher de sopa",
        "notes": "riqueza em zinco e magnésio"
      },
      {
        "name": "Água de coco gelada",
        "amount": 200,
        "unit": "ml",
        "notes": ""
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Bater Tudo",
        "description": "Coloque as ameixas sem caroço, as amoras, as sementes de abóbora e a água de coco no liquidificador.",
        "timerSeconds": 60
      },
      {
        "step": 2,
        "title": "Homogeneizar e Beber",
        "description": "Bata bem por 2 minutos até que as sementes se desintegrem. Beba de imediato sem coar.",
        "timerSeconds": 120
      }
    ],
    "tips": "As sementes de abóbora são campeãs mundiais de zinco vegetal, mineral indispensável para a maturação dos leucócitos (células de defesa)."
  },
  {
    "id": "detox-18-adeus-colesterol",
    "pageNumber": 18,
    "title": "18 - Suco Detox Adeus Colesterol",
    "subtitle": "Toranja cítrica, morangos e canela para equilíbrio de lipídios no sangue",
    "category": "detox-sucos",
    "prepTime": "6 min",
    "bakeTime": "0 min",
    "totalTime": "6 min",
    "servings": 1,
    "servingUnit": "copo (300ml)",
    "difficulty": "Fácil",
    "image": "./images/sucos_detox/18_suco_detox_adeus_colesterol.jpg",
    "badge": "Coração Saudável",
    "tags": [
      "Suco Detox",
      "Toranja",
      "Colesterol",
      "Canela",
      "Morangos"
    ],
    "verse": "Salmos 147:3",
    "verseText": "Desobstrução e vitalidade fluindo pelas artérias da vida.",
    "ingredients": [
      {
        "name": "Morangos frescos",
        "amount": 5,
        "unit": "unidades",
        "notes": "limpos"
      },
      {
        "name": "Toranja integral fresca (grapefruit)",
        "amount": 1,
        "unit": "unidade",
        "notes": "sem casca e sem sementes"
      },
      {
        "name": "Canela em pó do Ceilão",
        "amount": 0.5,
        "unit": "colher de chá",
        "notes": "metabolizadora de gorduras"
      },
      {
        "name": "Água de coco gelada",
        "amount": 200,
        "unit": "ml",
        "notes": ""
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Bater no Liquidificador",
        "description": "Coloque os morangos, os gomos da toranja e a água de coco gelada no copo do liquidificador.",
        "timerSeconds": 60
      },
      {
        "step": 2,
        "title": "Adicionar a Canela",
        "description": "Bata tudo e despeje no copo sem coar. Salpique a canela em pó, misture com uma colher e beba em seguida.",
        "timerSeconds": 90
      }
    ],
    "tips": "A pectina e a naringenina presentes na toranja ajudam a diminuir a absorção de colesterol ruim (LDL) no intestino."
  },
  {
    "id": "detox-19-potencia-rosa",
    "pageNumber": 19,
    "title": "19 - Suco Detox Potência Rosa",
    "subtitle": "Melancia, salsão e beterraba para hidratação máxima e drenagem",
    "category": "detox-sucos",
    "prepTime": "4 min",
    "bakeTime": "0 min",
    "totalTime": "4 min",
    "servings": 1,
    "servingUnit": "copo (300ml)",
    "difficulty": "Muito Fácil",
    "image": "./images/sucos_detox/19_suco_detox_potencia_rosa.jpg",
    "badge": "Drenante & Energético",
    "tags": [
      "Suco Detox",
      "Melancia",
      "Beterraba",
      "Salsão",
      "Drenagem"
    ],
    "verse": "Salmos 147:3",
    "verseText": "Força e vigor renovados em cada taça natural.",
    "ingredients": [
      {
        "name": "Fatias de Melancia",
        "amount": 3,
        "unit": "fatias médias",
        "notes": "em cubos"
      },
      {
        "name": "Beterraba pequena",
        "amount": 0.5,
        "unit": "unidade",
        "notes": "crua e descascada"
      },
      {
        "name": "Talos de Salsão",
        "amount": 2,
        "unit": "talos",
        "notes": "lavados"
      },
      {
        "name": "Água de coco gelada",
        "amount": 200,
        "unit": "ml",
        "notes": ""
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Bater Tudo",
        "description": "Coloque a melancia, a beterraba, os talos de salsão e a água de coco no liquidificador.",
        "timerSeconds": 60
      },
      {
        "step": 2,
        "title": "Consumo Imediato",
        "description": "Bata por 2 minutos até dissolver a beterraba. Beba imediatamente sem coar com muito gelo.",
        "timerSeconds": 120
      }
    ],
    "tips": "A água biológica da melancia somada ao potássio do salsão atua como um diurético natural sem causar perda de sais minerais."
  },
  {
    "id": "detox-21-termogenico-melancia",
    "pageNumber": 21,
    "title": "21 - Suco Detox Termogênico de Melancia com Gengibre",
    "subtitle": "Aceleração metabólica, citrulina e queima calórica natural",
    "category": "detox-sucos",
    "prepTime": "4 min",
    "bakeTime": "0 min",
    "totalTime": "4 min",
    "servings": 1,
    "servingUnit": "copo (300ml)",
    "difficulty": "Muito Fácil",
    "image": "./images/sucos_detox/21_suco_detox_termogenico_melancia.jpg",
    "badge": "Termogênico Potente",
    "tags": [
      "Suco Detox",
      "Termogênico",
      "Melancia",
      "Gengibre",
      "Limão"
    ],
    "verse": "Filipenses 4:13",
    "verseText": "Tudo posso naquele que me fortalece.",
    "ingredients": [
      {
        "name": "Melancia em cubos",
        "amount": 3,
        "unit": "xícaras",
        "notes": "gelada"
      },
      {
        "name": "Gengibre fresco",
        "amount": 1,
        "unit": "pedaço (2cm)",
        "notes": "sem casca"
      },
      {
        "name": "Suco de Limão",
        "amount": 0.5,
        "unit": "unidade",
        "notes": "espremido"
      },
      {
        "name": "Água de coco gelada",
        "amount": 200,
        "unit": "ml",
        "notes": ""
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Colocar no Liquidificador",
        "description": "Adicione a melancia gelada, o pedaço de gengibre, o suco de meio limão e a água de coco.",
        "timerSeconds": 60
      },
      {
        "step": 2,
        "title": "Bater e Beber",
        "description": "Bata muito bem por 1 minuto e meio. Beba sem coar para absorver as fibras saciantes.",
        "timerSeconds": 90
      }
    ],
    "tips": "Tome cerca de 30 minutos antes do treino ou da caminhada matinal para potencializar o gasto calórico e a oxigenação muscular."
  },
  {
    "id": "detox-22-queima-tudo",
    "pageNumber": 22,
    "title": "22 - Suco Detox Queima Tudo (Chá Verde & Limão)",
    "subtitle": "Epigalocatequinas do chá verde com raspas de gengibre para derreter gorduras",
    "category": "detox-sucos",
    "prepTime": "5 min",
    "bakeTime": "0 min",
    "totalTime": "5 min",
    "servings": 1,
    "servingUnit": "copo (300ml)",
    "difficulty": "Muito Fácil",
    "image": "./images/sucos_detox/22_suco_detox_queima_tudo.jpg",
    "badge": "Queima Gordura",
    "tags": [
      "Suco Detox",
      "Chá Verde",
      "Gengibre",
      "Limão",
      "Secar"
    ],
    "verse": "Filipenses 4:13",
    "verseText": "Acelere seu metabolismo e transforme seu corpo com fé e dedicação.",
    "ingredients": [
      {
        "name": "Chá verde infusionado e gelado",
        "amount": 200,
        "unit": "ml",
        "notes": "infusão de 3 minutos"
      },
      {
        "name": "Suco de Limão fresco",
        "amount": 100,
        "unit": "ml",
        "notes": "espremido"
      },
      {
        "name": "Raspas de Gengibre fresco",
        "amount": 1,
        "unit": "colher de chá",
        "notes": "a gosto"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Preparar Chá e Limão",
        "description": "Faça a infusão do chá verde (1 colher de sopa de folhas para 200ml de água quente, por 3 minutos) e gele.",
        "timerSeconds": 180
      },
      {
        "step": 2,
        "title": "Misturar e Servir",
        "description": "Junte o chá verde gelado com o suco de limão e adicione as raspas de gengibre. Misture bem e sirva com gelo.",
        "timerSeconds": 30
      }
    ],
    "tips": "O EGCG (antioxidante do chá verde) estimula o hormônio norepinefrina, enviando sinais para que as células de gordura quebrem lipídios."
  },
  {
    "id": "detox-23-uva-gengibre-canela",
    "pageNumber": 23,
    "title": "23 - Suco Detox de Uva com Gengibre e Canela",
    "subtitle": "Energia revigorante da videira sagrada com especiarias ativadoras",
    "category": "detox-sucos",
    "prepTime": "4 min",
    "bakeTime": "0 min",
    "totalTime": "4 min",
    "servings": 1,
    "servingUnit": "copo (300ml)",
    "difficulty": "Muito Fácil",
    "image": "./images/sucos_detox/23_suco_detox_uva_gengibre_canela.jpg",
    "badge": "Fruto da Videira",
    "tags": [
      "Suco Detox",
      "Uva Integral",
      "Gengibre",
      "Canela",
      "Vitalidade"
    ],
    "verse": "Filipenses 4:13",
    "verseText": "O fruto da videira que alegra o coração e renova a vitalidade.",
    "ingredients": [
      {
        "name": "Suco de Uva integral tinto",
        "amount": 200,
        "unit": "ml",
        "notes": "100% puro sem açúcar"
      },
      {
        "name": "Limão com casca",
        "amount": 1,
        "unit": "unidade",
        "notes": "bem lavado, sem o miolo branco para não amargar"
      },
      {
        "name": "Gengibre fresco ralado",
        "amount": 1,
        "unit": "colher de chá",
        "notes": "a gosto"
      },
      {
        "name": "Canela em pó",
        "amount": 0.5,
        "unit": "colher de café",
        "notes": "a gosto"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Bater no Liquidificador",
        "description": "Coloque o suco de uva integral, o limão em pedaços, o gengibre ralado e a canela no liquidificador.",
        "timerSeconds": 60
      },
      {
        "step": 2,
        "title": "Servir Gelado",
        "description": "Bata por 1 minuto e meio e sirva imediatamente com pedras de gelo.",
        "timerSeconds": 90
      }
    ],
    "tips": "A uva integral combinada à canela melhora a sensibilidade das células à insulina, reduzindo o desejo compulsivo por doces."
  },
  {
    "id": "detox-24-secar-abdomen",
    "pageNumber": 24,
    "title": "24 - Suco Detox para Secar o Abdômen",
    "subtitle": "Agrião picante, hortelã e raspas cítricas para eliminar toxinas retidas",
    "category": "detox-sucos",
    "prepTime": "5 min",
    "bakeTime": "0 min",
    "totalTime": "5 min",
    "servings": 1,
    "servingUnit": "copo (300ml)",
    "difficulty": "Muito Fácil",
    "image": "./images/sucos_detox/24_suco_detox_secar_abdomen.jpg",
    "badge": "Seca Abdômen",
    "tags": [
      "Suco Detox",
      "Agrião",
      "Hortelã",
      "Limão",
      "Diurético"
    ],
    "verse": "Filipenses 4:13",
    "verseText": "Força para perseverar e cuidar do templo sagrado.",
    "ingredients": [
      {
        "name": "Talos e folhas de Agrião fresco",
        "amount": 10,
        "unit": "talos",
        "notes": "rico em iodo e ferro"
      },
      {
        "name": "Folhas de Hortelã",
        "amount": 10,
        "unit": "folhas",
        "notes": "refrescante"
      },
      {
        "name": "Suco de Limão fresco",
        "amount": 2,
        "unit": "unidades",
        "notes": "espremidos"
      },
      {
        "name": "Raspas finas de casca de limão",
        "amount": 1,
        "unit": "colher de café",
        "notes": "limoneno concentrado"
      },
      {
        "name": "Água de coco gelada",
        "amount": 200,
        "unit": "ml",
        "notes": ""
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Bater no Liquidificador",
        "description": "Coloque o agrião, as folhas de hortelã, o suco de 2 limões, as raspas e a água de coco no liquidificador.",
        "timerSeconds": 60
      },
      {
        "step": 2,
        "title": "Beber sem Coar",
        "description": "Bata por 2 minutos em velocidade máxima. Beba sem coar para obter o benefício completo dos flavonoides.",
        "timerSeconds": 120
      }
    ],
    "tips": "O agrião contém glicosinolatos que auxiliam o fígado a filtrar resíduos metabólicos e aceleram o processo de emagrecimento."
  },
  {
    "id": "detox-25-metabolico",
    "pageNumber": 25,
    "title": "25 - Suco Detox Metabólico (Amoras & Alecrim)",
    "subtitle": "Alecrim sagrado com frutas vermelhas para acelerar a queima interna",
    "category": "detox-sucos",
    "prepTime": "5 min",
    "bakeTime": "0 min",
    "totalTime": "5 min",
    "servings": 1,
    "servingUnit": "copo (300ml)",
    "difficulty": "Muito Fácil",
    "image": "./images/sucos_detox/25_suco_detox_metabolico.jpg",
    "badge": "Alecrim & Fogo",
    "tags": [
      "Suco Detox",
      "Alecrim",
      "Amoras",
      "Framboesas",
      "Metabólico"
    ],
    "verse": "Filipenses 4:13",
    "verseText": "Ervas de bom aroma que despertam a vitalidade física e mental.",
    "ingredients": [
      {
        "name": "Amoras frescas ou congeladas",
        "amount": 8,
        "unit": "unidades",
        "notes": ""
      },
      {
        "name": "Framboesas frescas ou congeladas",
        "amount": 8,
        "unit": "unidades",
        "notes": ""
      },
      {
        "name": "Alecrim fresco levemente triturado",
        "amount": 1,
        "unit": "colher de sopa",
        "notes": "erva da memória e do ânimo"
      },
      {
        "name": "Água de coco gelada",
        "amount": 200,
        "unit": "ml",
        "notes": ""
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Colocar as Frutas",
        "description": "Coloque as amoras, framboesas e a água de coco gelada no copo do liquidificador.",
        "timerSeconds": 60
      },
      {
        "step": 2,
        "title": "Adicionar o Alecrim e Bater",
        "description": "Adicione as folhas de alecrim fresco e bata em velocidade alta por 2 minutos. Beba sem coar.",
        "timerSeconds": 120
      }
    ],
    "tips": "O ácido rosmarínico presente no alecrim melhora a concentração, combate a névoa mental e ativa o metabolismo basal."
  },
  {
    "id": "detox-26-emagrecimento-turbo",
    "pageNumber": 26,
    "title": "26 - Suco Detox Emagrecimento Turbo",
    "subtitle": "Laranja, limão, gengibre e agrião para queima calórica turbinada",
    "category": "detox-sucos",
    "prepTime": "5 min",
    "bakeTime": "0 min",
    "totalTime": "5 min",
    "servings": 1,
    "servingUnit": "copo (300ml)",
    "difficulty": "Muito Fácil",
    "image": "./images/sucos_detox/26_suco_detox_emagrecimento_turbo.jpg",
    "badge": "Turbo Queima",
    "tags": [
      "Suco Detox",
      "Turbo",
      "Laranja",
      "Limão",
      "Agrião"
    ],
    "verse": "Filipenses 4:13",
    "verseText": "Determinação e fé para cuidar da saúde todos os dias.",
    "ingredients": [
      {
        "name": "Suco de Laranja fresca",
        "amount": 1,
        "unit": "unidade",
        "notes": "espremida"
      },
      {
        "name": "Suco de Limão fresco",
        "amount": 1,
        "unit": "unidade",
        "notes": "espremido"
      },
      {
        "name": "Talos de Agrião fresco",
        "amount": 10,
        "unit": "talos",
        "notes": "lavados"
      },
      {
        "name": "Pepino médio",
        "amount": 0.25,
        "unit": "unidade",
        "notes": "com casca"
      },
      {
        "name": "Pedaços de Gengibre",
        "amount": 2,
        "unit": "lascas",
        "notes": "sem casca"
      },
      {
        "name": "Água de coco gelada",
        "amount": 200,
        "unit": "ml",
        "notes": ""
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Preparar Sucos Cítricos",
        "description": "Esprema a laranja e o limão. Adicione ao liquidificador junto com o agrião, pepino, gengibre e água de coco.",
        "timerSeconds": 60
      },
      {
        "step": 2,
        "title": "Bater Bem",
        "description": "Bata por 2 minutos em rotação máxima até obter uma bebida cremosa e alaranjada. Beba sem coar.",
        "timerSeconds": 120
      }
    ],
    "tips": "A sinergia entre vitamina C cítrica e compostos picantes do gengibre aumenta a taxa metabólica de repouso por até 2 horas após a ingestão."
  },
  {
    "id": "detox-27-goiaba-canela",
    "pageNumber": 27,
    "title": "27 - Suco Detox de Goiaba com Canela e Limão",
    "subtitle": "Licopeno tropical, saciedade por fibras densas e equilíbrio glicêmico",
    "category": "detox-sucos",
    "prepTime": "5 min",
    "bakeTime": "0 min",
    "totalTime": "5 min",
    "servings": 1,
    "servingUnit": "copo (300ml)",
    "difficulty": "Muito Fácil",
    "image": "./images/sucos_detox/27_suco_detox_goiaba_canela.jpg",
    "badge": "Tropical Saciante",
    "tags": [
      "Suco Detox",
      "Goiaba",
      "Canela",
      "Saciedade",
      "Licopeno"
    ],
    "verse": "Filipenses 4:13",
    "verseText": "A terra farta gera frutos doces e nutritivos para nosso corpo.",
    "ingredients": [
      {
        "name": "Goiaba vermelha média",
        "amount": 1,
        "unit": "unidade",
        "notes": "com casca e polpa"
      },
      {
        "name": "Suco de Limões frescos",
        "amount": 2,
        "unit": "unidades",
        "notes": "espremidos"
      },
      {
        "name": "Canela em pó",
        "amount": 1,
        "unit": "colher de chá",
        "notes": ""
      },
      {
        "name": "Água de coco gelada",
        "amount": 200,
        "unit": "ml",
        "notes": ""
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Bater Fruta e Sucos",
        "description": "No liquidificador, junte a goiaba fatiada, o suco de limão e a água de coco. Bata bem por 2 minutos.",
        "timerSeconds": 120
      },
      {
        "step": 2,
        "title": "Adicionar Canela",
        "description": "Despeje no copo sem coar. Polvilhe a canela em pó por cima, mexa com a colher e beba imediatamente.",
        "timerSeconds": 30
      }
    ],
    "tips": "A goiaba é uma das frutas com maior teor de fibras solúveis por grama, gerando sensação de saciedade por até 4 horas."
  },
  {
    "id": "detox-28-anti-estresse-calmante",
    "pageNumber": 28,
    "title": "28 - Suco Detox Anti-Estresse e Calmante (Maracujá & Abacate)",
    "subtitle": "Gorduras nobres do abacate com maracujina para relaxar mente e músculos",
    "category": "detox-sucos",
    "prepTime": "5 min",
    "bakeTime": "0 min",
    "totalTime": "5 min",
    "servings": 1,
    "servingUnit": "copo (300ml)",
    "difficulty": "Muito Fácil",
    "image": "./images/sucos_detox/28_suco_detox_anti_estresse_calmante.jpg",
    "badge": "Paz & Sono Reparador",
    "tags": [
      "Suco Detox",
      "Maracujá",
      "Abacate",
      "Calmante",
      "Anti-Estresse"
    ],
    "verse": "Filipenses 4:13",
    "verseText": "A paz que excede todo entendimento acalma o coração e a mente.",
    "ingredients": [
      {
        "name": "Abacate maduro",
        "amount": 0.25,
        "unit": "unidade média",
        "notes": "gorduras monoinsaturadas e magnésio"
      },
      {
        "name": "Suco concentrado de Maracujá",
        "amount": 200,
        "unit": "ml",
        "notes": "maracujina calmante natural"
      },
      {
        "name": "Água de coco gelada",
        "amount": 200,
        "unit": "ml",
        "notes": "repositor eletrolítico"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Preparar Maracujá e Abacate",
        "description": "Retire a polpa de 1/4 do abacate maduro. Coloque no liquidificador com o suco de maracujá e a água de coco.",
        "timerSeconds": 60
      },
      {
        "step": 2,
        "title": "Bater até Cremoso",
        "description": "Bata por 2 minutos até virar uma vitamina suave e aveludada. Não precisa coar. Beba no final da tarde ou à noite.",
        "timerSeconds": 120
      }
    ],
    "tips": "O magnésio do abacate atua no relaxamento das fibras musculares esqueléticas, enquanto a passiflora do maracujá acalma o sistema nervoso central."
  },
  {
    "id": "detox-29-cha-verde-e-uva",
    "pageNumber": 29,
    "title": "29 - Suco Detox Chá Verde e Uvas Verdes",
    "subtitle": "Polifenóis leves, hidratação alcalina e pureza refrescante",
    "category": "detox-sucos",
    "prepTime": "4 min",
    "bakeTime": "0 min",
    "totalTime": "4 min",
    "servings": 1,
    "servingUnit": "copo (300ml)",
    "difficulty": "Muito Fácil",
    "image": "./images/sucos_detox/29_suco_detox_cha_verde_uva.jpg",
    "badge": "Refrescância & Longevidade",
    "tags": [
      "Suco Detox",
      "Chá Verde",
      "Uva Verde",
      "Hidratação",
      "Leve"
    ],
    "verse": "Filipenses 4:13",
    "verseText": "Que cada gole seja uma bênção para o seu corpo e alma.",
    "ingredients": [
      {
        "name": "Chá verde pronto e gelado",
        "amount": 1,
        "unit": "xícara (200ml)",
        "notes": "infusão suave"
      },
      {
        "name": "Uvas verdes sem caroço",
        "amount": 10,
        "unit": "unidades",
        "notes": "thompson ou vitória verde"
      },
      {
        "name": "Água de coco gelada",
        "amount": 200,
        "unit": "ml",
        "notes": ""
      },
      {
        "name": "Pedras de Gelo",
        "amount": 4,
        "unit": "cubos",
        "notes": "a gosto"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Adicionar ao Liquidificador",
        "description": "Coloque o chá verde gelado, as uvas verdes inteiras, a água de coco e os cubos de gelo no liquidificador.",
        "timerSeconds": 60
      },
      {
        "step": 2,
        "title": "Bater e Servir Gelado",
        "description": "Bata por 1 minuto e meio até triturar bem as uvas. Sirva imediatamente em copo alto com folhas de hortelã para decorar.",
        "timerSeconds": 90
      }
    ],
    "tips": "As uvas verdes fornecem quercetina e catequinas que reduzem a retenção hídrica nas pernas e tornozelos nos dias quentes."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SUCOS_DETOX_RECIPES };
}
