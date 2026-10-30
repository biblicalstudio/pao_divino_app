/**
 * PÃO DIVINO - Base de Dados Oficial de Receitas
 * Extraído e enriquecido dos e-books "Pães Sagrados dos Profetas",
 * "45 Receitas de Pão Sem Glúten", "75 Receitas Bíblicas" e Devocionais.
 */

const BIBLICAL_INGREDIENTS_INFO = [
  {
    name: "Cevada",
    verse: "João 6:9",
    meaning: "Símbolo de humildade, resiliência e multiplicação divina. Base do pão multiplicado por Jesus para 5.000 pessoas.",
    healthBenefit: "Rica em betaglucanas, auxilia no controle glicêmico e na saúde do coração."
  },
  {
    name: "Lentilhas e Favas",
    verse: "Ezequiel 4:9",
    meaning: "Símbolo de sustento e fraternidade nos momentos de provação no deserto.",
    healthBenefit: "Fonte vegetal de ferro, ácido fólico e proteínas de alto valor biológico."
  },
  {
    name: "Azeite de Oliva Extra Virgem",
    verse: "Salmos 23:5",
    meaning: "Símbolo do Espírito Santo, da unção de cura, paz e abundância que nunca falta na botija.",
    healthBenefit: "Gorduras monoinsaturadas nobres e polifenóis com forte ação antioxidante."
  },
  {
    name: "Mel Puro Silvestre",
    verse: "1 Samuel 14:29",
    meaning: "A doçura da Palavra de Deus que ilumina os olhos e renova as forças do cansado.",
    healthBenefit: "Ação antimicrobiana natural, prebiótica e rica em enzimas vitais."
  },
  {
    name: "Sal da Terra",
    verse: "Mateus 5:13",
    meaning: "Preservação da aliança eterna, pureza e sabor divino colocado em tudo o que fazemos.",
    healthBenefit: "Minerais essenciais que equilibram os eletrólitos do corpo humano."
  },
  {
    name: "Espelta e Trigo Puro",
    verse: "Êxodo 9:32",
    meaning: "O grão ancestral mais nobre que resistiu às pragas do Egito pela proteção do Altíssimo.",
    healthBenefit: "Digestão mais leve que o trigo moderno, rica em fósforo e magnésio."
  }
];

const DEVOTIONALS = [
  {
    id: "oracao-sovar",
    title: "Oração Antes de Sovar a Massa",
    verse: "Salmo 90:17 - 'Confirma sobre nós a obra de nossas mãos; sim, confirma a obra de nossas mãos.'",
    text: "Senhor Deus Todo-Poderoso, consagro este momento e o trabalho das minhas mãos. Que enquanto misturo estes grãos e sovo esta massa, o Teu amor fermente o meu coração com paciência, paz e perseverança. Que este alimento seja remédio, saúde e bênção abundante para todos que se sentarem à minha mesa. Em nome de Jesus, Amém."
  },
  {
    id: "oracao-forno",
    title: "Oração Enquanto o Pão Está no Forno",
    verse: "1 Reis 19:6 - 'Olhou Elias e viu à sua cabeceira um pão cozido sobre as brasas. Comeu, bebeu e recobrou as forças.'",
    text: "Pai celestial, assim como o fogo do forno transforma a massa crua em pão perfumado e nutritivo, que as provações da vida moldem nosso caráter com fé inabalável. Que o calor da Tua presença encha este lar de ternura e afaste toda a escassez. Amém."
  },
  {
    id: "oracao-partir",
    title: "Bênção ao Partir o Pão à Mesa",
    verse: "Lucas 24:30-31 - 'E aconteceu que, estando com eles à mesa, tomando o pão, o abençoou e partiu-o, e lhes dava. Abriram-se-lhes então os olhos, e o conheceram.'",
    text: "Senhor Jesus, nosso Pão da Vida, bendizemos o Teu santo nome por esta mesa farta e pelo milagre da provisão diária. Ao partirmos este pão juntos em família e fraternidade, abre nossos olhos espirituais para reconhecer a Tua graça em cada detalhe. Que jamais falte o pão material nem o pão espiritual em nossos lares. Amém."
  },
  {
    id: "reflexao-multiplicacao",
    title: "O Segredo da Multiplicação",
    verse: "João 6:11 - 'Jesus tomou os pães e, tendo dado graças, os distribuiu.'",
    text: "O rapaz entregou apenas cinco pães de cevada e dois peixinhos. Parecia insignificante diante de milhares de pessoas famintas, mas nas mãos de Jesus o pouco se tornou banquete com doze cestos de sobra. Nunca despreze o que você tem: entregue tudo a Deus com gratidão e veja a multiplicação acontecer na sua vida."
  }
];

const RECIPES_DATA = [
  // ==========================================
  // PÃES BÍBLICOS E SAGRADOS
  // ==========================================
  {
    id: "pao-de-ezequiel-classico",
    title: "Pão de Ezequiel Clássico",
    subtitle: "A Fórmula Sagrada Revelada por Deus ao Profeta",
    category: "sagrados",
    verse: "Ezequiel 4:9",
    verseText: "Toma trigo, cevada, favas, lentilhas, milheto e espelta; põe-nos numa vasilha e faz deles pão.",
    story: "Revelada a Ezequiel em cerca de 593 a.C., esta é a mais famosa receita bíblica de pão da humanidade. Ao misturar grãos ancestrais e leguminosas numa só vasilha, Deus criou uma proteína vegetal completa com aminoácidos essenciais, baixo índice glicêmico e saciedade profunda.",
    prepTime: "25 min",
    bakeTime: "40 min",
    totalTime: "1h 45 min",
    servings: 1, // 1 pão grande (14 fatias)
    servingUnit: "pão rústico",
    difficulty: "Médio",
    glycemicIndex: "Baixo",
    tags: ["Bíblico", "Multi-grãos", "Baixo IG", "Rico em Fibras", "Ancestral"],
    coverStyle: "linear-gradient(135deg, #3d2310, #73431d, #c98218)",
    badge: "Receita 1 do E-book",
    ingredients: [
      { name: "Farinha de Cevada", amount: 2, unit: "xícaras", notes: "moída fina" },
      { name: "Farinha de Lentilha vermelha ou verde", amount: 1, unit: "xícara", notes: "ou lentilhas cozidas e batidas" },
      { name: "Farinha de Trigo Integral ou Espelta", amount: 1, unit: "xícara", notes: "integral pura" },
      { name: "Fubá Mimoso Fino (Milho)", amount: 0.5, unit: "xícara", notes: "" },
      { name: "Aveia em Flocos Finos", amount: 0.5, unit: "xícara", notes: "" },
      { name: "Azeite de Oliva Extra Virgem", amount: 3, unit: "colheres de sopa", notes: "prensado a frio" },
      { name: "Fermento Biológico Seco", amount: 1, unit: "colher de chá", notes: "ou 15g de fermento fresco" },
      { name: "Mel puro ou açúcar mascavo", amount: 1, unit: "colher de sopa", notes: "para ativar o fermento" },
      { name: "Sal Marinho", amount: 1, unit: "colher de chá", notes: "" },
      { name: "Água Morna", amount: 1.5, unit: "xícaras", notes: "aproximadamente 300ml" }
    ],
    instructions: [
      {
        step: 1,
        title: "Ativação do Fermento Sagrado",
        description: "Em uma tigela pequena, dissolva o fermento biológico e o mel puro em meia xícara de água morna (cerca de 35°C, temperatura de leite materno). Deixe descansar por 10 minutos até espumar e liberar aroma adocicado.",
        timerSeconds: 600
      },
      {
        step: 2,
        title: "União dos Seis Grãos Sagrados",
        description: "Em uma tigela grande e espaçosa, misture a farinha de cevada, a farinha de lentilha, a espelta/trigo integral, o fubá e a aveia. Adicione o sal marinho e misture bem com as mãos ou uma colher de pau.",
        timerSeconds: 180
      },
      {
        step: 3,
        title: "Sova e Incorporação",
        description: "Faça uma cova no centro das farinhas. Despeje o fermento ativado, o azeite de oliva e o restante da água morna aos poucos. Misture até formar uma massa pegajosa mas maleável. Transfira para uma bancada enfarinhada e sove com fé por 10 minutos até a massa ficar macia e elástica.",
        timerSeconds: 600
      },
      {
        step: 4,
        title: "Descanso e Fermentação",
        description: "Pincele a massa com um fio de azeite, cubra a tigela com um pano limpo de algodão e deixe descansar em local aquecido e sem corrente de ar por 1 hora, ou até dobrar de volume.",
        timerSeconds: 3600
      },
      {
        step: 5,
        title: "Modelagem e Incisão Sagrada",
        description: "Modele em formato de pão rústico ou coloque em forma de bolo inglês untada. Com uma faca bem afiada, faça 3 cortes diagonais na superfície ou uma cruz. Deixe crescer por mais 20 minutos.",
        timerSeconds: 1200
      },
      {
        step: 6,
        title: "Forno Dourado",
        description: "Pré-aqueça o forno a 180°C. Asse por 40 a 45 minutos até que a casca fique bem dourada e soe oca ao bater suavemente na base. Deixe esfriar sobre uma grade antes de fatiar.",
        timerSeconds: 2400
      }
    ],
    tips: "Os seis ingredientes simbolizam perseverança, humildade e provisão divina. Para uma digestão ainda melhor, você pode deixar a massa fermentar lentamente na geladeira durante a noite (fermentação a frio de 8 horas)."
  },

  {
    id: "pao-de-cevada-do-milagre",
    title: "Pão de Cevada do Milagre",
    subtitle: "O Pão da Multiplicação que Jesus Abençoou",
    category: "sagrados",
    verse: "João 6:9, 11",
    verseText: "Está aqui um rapaz que tem cinco pães de cevada e dois peixinhos... Jesus tomou os pães e, tendo dado graças, os distribuiu.",
    story: "A mesma base de grão sagrado (cevada) que passou pelas mãos de Jesus no monte junto ao mar da Galileia. Um pão rústico, de sabor amendoado incomparável, que nos ensina que a bênção de Deus transforma o simples em extraordinário.",
    prepTime: "15 min",
    bakeTime: "45 min",
    totalTime: "1h 10 min",
    servings: 1,
    servingUnit: "pão de 12 fatias",
    difficulty: "Fácil",
    glycemicIndex: "Muito Baixo",
    tags: ["Bíblico", "O Pão de Jesus", "Sem Glúten Opcional", "Multiplicação", "Cevada"],
    coverStyle: "linear-gradient(135deg, #422a10, #8f531d, #d49a37)",
    badge: "Receita 2 do E-book",
    ingredients: [
      { name: "Farinha de Cevada (ou cevada em pó)", amount: 3, unit: "xícaras", notes: "rico em sabor rústico" },
      { name: "Farinha de Grão-de-Bico", amount: 1, unit: "xícara", notes: "traz elasticidade e proteína" },
      { name: "Farinha de Lentilha Vermelha", amount: 1, unit: "xícara", notes: "fina e aveludada" },
      { name: "Ovos Caipiras", amount: 2, unit: "unidades", notes: "batidos levemente" },
      { name: "Azeite Extra Virgem", amount: 3, unit: "colheres de sopa", notes: "" },
      { name: "Vinagre de Maçã Natural", amount: 1, unit: "colher de sopa", notes: "ativa a maciez" },
      { name: "Bicarbonato de Sódio", amount: 1, unit: "colher de chá", notes: "" },
      { name: "Fermento em Pó", amount: 1, unit: "colher de chá", notes: "" },
      { name: "Sal Marinho", amount: 1, unit: "colher de chá", notes: "" },
      { name: "Água Morna", amount: 1.25, unit: "xícaras", notes: "o suficiente para liga" }
    ],
    instructions: [
      {
        step: 1,
        title: "Mistura dos Secos Sagrados",
        description: "Em um bowl, una a farinha de cevada, a farinha de grão-de-bico, a farinha de lentilha, o bicarbonato e o sal marinho. Mexa com um batedor de arame.",
        timerSeconds: 120
      },
      {
        step: 2,
        title: "Emulsão dos Líquidos",
        description: "Em outra tigela, bata os ovos caipiras com o azeite extra virgem e a colher de vinagre de maçã até criar uma textura aveludada.",
        timerSeconds: 120
      },
      {
        step: 3,
        title: "Combinação Harmoniosa",
        description: "Despeje os líquidos sobre os secos. Adicione a água morna aos poucos, mexendo firmemente até obter uma massa espessa, uniforme e brilhante.",
        timerSeconds: 240
      },
      {
        step: 4,
        title: "Descanso da Massa",
        description: "Deixe a massa descansar na tigela por 20 minutos. As fibras de cevada e grão-de-bico absorverão os líquidos e hidratarão perfeitamente.",
        timerSeconds: 1200
      },
      {
        step: 5,
        title: "Forma e Cozimento",
        description: "Transfira para uma forma de pão untada com azeite e polvilhada com cevada. Asse em forno pré-aquecido a 180°C por 45 minutos até dourar a crosta.",
        timerSeconds: 2700
      }
    ],
    tips: "Dica de Ouro: Fica sublime servido quentinho com um fio de azeite e ervas frescas, exatamente como era consumido nas aldeias da Galileia."
  },

  {
    id: "pao-profetico-de-lentilha",
    title: "Pão Profético de Lentilha",
    subtitle: "Pão da Vida com Alto Teor Proteico e Sem Glúten",
    category: "sagrados",
    verse: "João 6:35",
    verseText: "Declarou-lhes Jesus: Eu sou o pão da vida; quem vem a mim nunca terá fome, e quem crê em mim nunca terá sede.",
    story: "As lentilhas eram o alimento mais nutritivo e acessível da antiguidade no Oriente Médio. Este pão traz uma textura incrivelmente macia, cor dourada marcante e zero glúten, sendo uma refeição completa em cada fatia.",
    prepTime: "15 min",
    bakeTime: "35 min",
    totalTime: "50 min",
    servings: 1,
    servingUnit: "pão de forma",
    difficulty: "Fácil",
    glycemicIndex: "Baixo",
    tags: ["Bíblico", "Sem Glúten", "Alto Teor Proteico", "Sem Sovar", "Linhaça"],
    coverStyle: "linear-gradient(135deg, #381e0f, #823c18, #d97838)",
    badge: "Receita 3 do E-book",
    ingredients: [
      { name: "Farinha de Lentilha (laranja ou marrom)", amount: 2, unit: "xícaras", notes: "moída fina" },
      { name: "Farinha de Arroz integral ou branca", amount: 1, unit: "xícara", notes: "" },
      { name: "Farinha de Linhaça Dourada moída", amount: 0.5, unit: "xícara", notes: "rica em ômega 3" },
      { name: "Aveia em Flocos Sem Glúten", amount: 0.5, unit: "xícara", notes: "" },
      { name: "Ovos", amount: 2, unit: "unidades", notes: "temperatura ambiente" },
      { name: "Azeite de Oliva Extra Virgem", amount: 0.25, unit: "xícara", notes: "60ml" },
      { name: "Mel Puro de Abelhas", amount: 1, unit: "colher de sopa", notes: "para sabor e maciez" },
      { name: "Fermento Químico em Pó", amount: 1, unit: "colher de chá", notes: "" },
      { name: "Sal Marinho", amount: 1, unit: "colher de chá", notes: "" },
      { name: "Água mineral morna", amount: 1, unit: "xícara", notes: "" }
    ],
    instructions: [
      {
        step: 1,
        title: "Base Úmida com Mel",
        description: "Bata com um garfo ou batedor os 2 ovos, o mel puro e o azeite de oliva até obter uma mistura clara e espumante.",
        timerSeconds: 120
      },
      {
        step: 2,
        title: "Adição dos Grãos e Fibras",
        description: "Incorpore aos poucos a farinha de lentilha, o arroz, a linhaça dourada e a aveia sem glúten, intercalando com a água morna.",
        timerSeconds: 180
      },
      {
        step: 3,
        title: "Textura Perfeita e Fermento",
        description: "Misture firmemente até a massa ficar homogênea e levemente pegajosa (consistência de bolo pesado). Adicione o fermento e o sal por último, misturando delicadamente.",
        timerSeconds: 120
      },
      {
        step: 4,
        title: "Montagem na Forma",
        description: "Despeje em uma forma de bolo inglês untada com azeite e polvilhada com linhaça. Se desejar, salpique sementes de abóbora ou aveia por cima para acabamento.",
        timerSeconds: 180
      },
      {
        step: 5,
        title: "Forno Dourado",
        description: "Asse em forno pré-aquecido a 170°C por 35 a 40 minutos. Ao espetar um palito, deve sair seco. Deixe esfriar completamente antes de fatiar para firmar a textura.",
        timerSeconds: 2200
      }
    ],
    tips: "Deixe esfriar 100% antes de cortar a primeira fatia. A lentilha precisa do calor residual para firmar seu miolo úmido e sedoso."
  },

  {
    id: "pao-azimo-da-ultima-ceia",
    title: "Pão Ázimo da Última Ceia (Matzá Sagrado)",
    subtitle: "O Pão da Aliança que Jesus Partiu - Rápido e Sem Fermento",
    category: "sagrados",
    verse: "Marcos 14:22",
    verseText: "E, comendo eles, tomou Jesus pão e, abençoando-o, o partiu e deu-lho, e disse: Tomai, comei, isto é o meu corpo.",
    story: "O pão sem fermento (ázimo) representa pureza moral, sinceridade de coração e prontidão espiritual desde a noite do Êxodo no Egito. É o exato pão que Cristo abençoou na Páscoa e repartiu com seus discípulos.",
    prepTime: "10 min",
    bakeTime: "6 min",
    totalTime: "16 min",
    servings: 6,
    servingUnit: "pães achatados (pães de folha)",
    difficulty: "Muito Fácil",
    glycemicIndex: "Médio",
    tags: ["Bíblico", "Sem Fermento", "A Última Ceia", "Ultra Rápido", "Frigideira / Chapa"],
    coverStyle: "linear-gradient(135deg, #2b180d, #613414, #b06e23)",
    badge: "Receita 4 do E-book",
    ingredients: [
      { name: "Farinha de Trigo Integral (ou Espelta)", amount: 2, unit: "xícaras", notes: "fina" },
      { name: "Azeite de Oliva Extra Virgem", amount: 0.5, unit: "xícara", notes: "de primeira prensagem" },
      { name: "Sal Marinho", amount: 1, unit: "colher de chá", notes: "" },
      { name: "Água Mineral Morna", amount: 0.5, unit: "xícara", notes: "o suficiente para massa lisa" }
    ],
    instructions: [
      {
        step: 1,
        title: "Mistura Pura",
        description: "Em uma tigela funda, misture a farinha de trigo integral e o sal marinho. O pão ázimo não leva fermento biológico nem químico.",
        timerSeconds: 60
      },
      {
        step: 2,
        title: "Azeite da Unção",
        description: "Adicione o azeite de oliva e misture esfregando com a ponta dos dedos até formar uma farofa úmida e cheirosa.",
        timerSeconds: 120
      },
      {
        step: 3,
        title: "Hidratação e Massa Lisa",
        description: "Acrescente a água morna aos poucos, amassando com as mãos até obter uma massa lisa, sedosa e maleável, que não grude nas mãos.",
        timerSeconds: 180
      },
      {
        step: 4,
        title: "Abertura Fina",
        description: "Divida a massa em 6 bolinhas. Em uma bancada enfarinhada, abra cada bolinha bem fininha com o rolo de massa (espessura de 2 a 3 milímetros). Faça furinhos na superfície com um garfo.",
        timerSeconds: 240
      },
      {
        step: 5,
        title: "Cozimento na Chapa Quente",
        description: "Aqueça bem uma frigideira de ferro ou chapa sem óleo. Coloque a massa aberta e asse por cerca de 3 minutos de cada lado, até surgirem pequenas bolhas douradas e tostadas.",
        timerSeconds: 360
      }
    ],
    tips: "Ideal para celebrações da Ceia do Senhor em família ou pequenos grupos. Sirva quente com azeite, ervas ou mel silvestre."
  },

  {
    id: "pao-de-aveia-com-mel-e-azeite",
    title: "Pão de Aveia com Mel e Azeite Puro",
    subtitle: "Adoçado com Mel Silvestre - Fofinho e Reconfortante",
    category: "sagrados",
    verse: "1 Samuel 14:29",
    verseText: "Vede como meus olhos se iluminaram porque provei um pouco deste mel.",
    story: "O mel silvestre era fonte instantânea de vigor e ânimo na Terra Prometida. A combinação da aveia macia com o azeite e o mel puro produz um pão aromático, perfeito para o café da manhã ou chá da tarde em família.",
    prepTime: "20 min",
    bakeTime: "35 min",
    totalTime: "1h 55 min",
    servings: 1,
    servingUnit: "pão grande (12 fatias)",
    difficulty: "Médio",
    glycemicIndex: "Médio",
    tags: ["Bíblico", "Adocicado", "Macio", "Aveia", "Mel Puro"],
    coverStyle: "linear-gradient(135deg, #472608, #965313, #e5a93c)",
    badge: "Receita 5 do E-book",
    ingredients: [
      { name: "Farinha de Aveia Fina", amount: 2, unit: "xícaras", notes: "" },
      { name: "Farinha de Trigo Integral ou Espelta", amount: 1, unit: "xícara", notes: "" },
      { name: "Aveia em Flocos Inteiros", amount: 0.5, unit: "xícara", notes: "para massa e cobertura" },
      { name: "Mel Puro de Abelhas", amount: 2, unit: "colheres de sopa", notes: "da melhor qualidade" },
      { name: "Azeite de Oliva Extra Virgem", amount: 3, unit: "colheres de sopa", notes: "" },
      { name: "Fermento Biológico Seco", amount: 1, unit: "colher de chá", notes: "" },
      { name: "Sal Marinho", amount: 1, unit: "colher de chá", notes: "" },
      { name: "Água Morna", amount: 1, unit: "xícara", notes: "" }
    ],
    instructions: [
      {
        step: 1,
        title: "Ativação com Mel Puro",
        description: "Em uma tigela, misture o fermento biológico seco, as 2 colheres de mel puro e a água morna. Aguarde 10 minutos até formar uma esponja espumante.",
        timerSeconds: 600
      },
      {
        step: 2,
        title: "Mistura dos Secos",
        description: "Em outra vasilha, combine a farinha de aveia, o trigo integral, a aveia em flocos e o sal marinho.",
        timerSeconds: 120
      },
      {
        step: 3,
        title: "Combinação e Sova Suave",
        description: "Adicione o fermento ativado e as 3 colheres de azeite aos ingredientes secos. Sove por cerca de 8 minutos até a massa ficar uniforme, elástica e acetinada.",
        timerSeconds: 480
      },
      {
        step: 4,
        title: "Descanso da Massa",
        description: "Cubra com um pano úmido e deixe crescer em lugar quentinho por 1 hora, até dobrar de tamanho.",
        timerSeconds: 3600
      },
      {
        step: 5,
        title: "Modelagem e Coroa de Flocos",
        description: "Modele o pão no formato desejado. Pincele levemente com azeite ou água e salpique flocos de aveia por cima, pressionando suavemente.",
        timerSeconds: 300
      },
      {
        step: 6,
        title: "Forno Dourado",
        description: "Asse em forno pré-aquecido a 180°C por 35 minutos até que a crosta esteja dourada e crocante e o interior super macio.",
        timerSeconds: 2100
      }
    ],
    tips: "Para um aroma irresistível pela casa toda, adicione 1/2 colher de chá de canela do Ceilão em pó junto às farinhas."
  },

  {
    id: "pao-grao-de-bico-ervas-deserto",
    title: "Pão de Grão-de-Bico com Ervas do Deserto",
    subtitle: "O Pão Cozido sobre as Brasas que Restaurou o Profeta Elias",
    category: "sagrados",
    verse: "1 Reis 19:6",
    verseText: "Olhou, e eis que à sua cabeceira estava um pão cozido sobre as brasas e uma botija de água. Comeu, bebeu e tornou a dormir. E o anjo do Senhor veio e disse: Levanta-te e come, porque o caminho te será sobremodo longo.",
    story: "Quando o profeta Elias estava exausto e desanimado sob o zimbro no deserto, um anjo lhe trouxe um pão quentinho e água fresca. Aquele pão sobrenatural deu-lhe forças para caminhar quarenta dias e quarenta noites até o monte Horebe.",
    prepTime: "15 min",
    bakeTime: "40 min",
    totalTime: "55 min",
    servings: 1,
    servingUnit: "pão rústico oval",
    difficulty: "Fácil",
    glycemicIndex: "Baixo",
    tags: ["Bíblico", "Sem Glúten", "Aromático", "O Pão de Elias", "Ervas Frescas"],
    coverStyle: "linear-gradient(135deg, #2e2612, #6b5219, #c49a37)",
    badge: "Receita 6 do E-book",
    ingredients: [
      { name: "Farinha de Grão-de-Bico", amount: 2, unit: "xícaras", notes: "base nutritiva e aromática" },
      { name: "Farinha de Milho (Fubá Mimoso)", amount: 1, unit: "xícara", notes: "" },
      { name: "Farinha de Arroz", amount: 0.5, unit: "xícara", notes: "para leveza" },
      { name: "Alecrim Fresco picadinho", amount: 1, unit: "colher de sopa", notes: "aroma do deserto" },
      { name: "Tomilho Seco ou Orégano Selvagem", amount: 1, unit: "colher de sopa", notes: "" },
      { name: "Azeite de Oliva Extra Virgem", amount: 0.25, unit: "xícara", notes: "60ml" },
      { name: "Ovos Caipiras", amount: 2, unit: "unidades", notes: "" },
      { name: "Fermento Químico em Pó", amount: 1, unit: "colher de chá", notes: "" },
      { name: "Sal Marinho", amount: 1, unit: "colher de chá", notes: "" },
      { name: "Água Morna", amount: 1, unit: "xícara", notes: "até dar o ponto" }
    ],
    instructions: [
      {
        step: 1,
        title: "Perfumando os Secos",
        description: "Misture a farinha de grão-de-bico, o fubá, a farinha de arroz, o sal, o fermento e as ervas aromáticas (alecrim e tomilho). O aroma das ervas é revigorante.",
        timerSeconds: 120
      },
      {
        step: 2,
        title: "Adição dos Ovos e Azeite",
        description: "Bata rapidamente os ovos com o azeite de oliva e junte aos ingredientes secos.",
        timerSeconds: 120
      },
      {
        step: 3,
        title: "Ponto da Massa",
        description: "Adicione a água morna aos poucos enquanto mistura, até obter uma massa consistente, úmida e ligeiramente pegajosa.",
        timerSeconds: 180
      },
      {
        step: 4,
        title: "Modelagem Rústica Oval",
        description: "Com as mãos untadas de azeite, modele a massa em formato rústico ovalado sobre uma assadeira untada. Decore com raminhos de alecrim e sal grosso por cima.",
        timerSeconds: 180
      },
      {
        step: 5,
        title: "Forno Dourado e Crocante",
        description: "Asse em forno pré-aquecido a 180°C por cerca de 40 minutos, até formar uma casquinha dourada crocante com miolo denso e perfume marcante.",
        timerSeconds: 2400
      }
    ],
    tips: "Casca crocante e perfumada. Excelente para saborear com sopas, patês de azeite ou queijo de cabra."
  },

  {
    id: "pao-do-mana-pao-do-ceu",
    title: "Pão do Maná - O Pão do Céu",
    subtitle: "Levíssimo, Sem Ovo, Sem Glúten e Delicado",
    category: "sagrados",
    verse: "Êxodo 16:15, 31",
    verseText: "Vendo-a os filhos de Israel, disseram uns aos outros: Maná é isto? Porque não sabiam o que era. Disse-lhes Moisés: Isto é o pão que o Senhor vos dá para comer... e o seu sabor era como de bolos de mel.",
    story: "Todas as manhãs caía no acampamento do deserto um manjar branco e delicado enviado diretamente dos céus. Esta receita celebra essa leveza celestial com uma textura aerada tipo nuvem, toque sutil de coco e casquinha estaladiça.",
    prepTime: "12 min",
    bakeTime: "30 min",
    totalTime: "42 min",
    servings: 1,
    servingUnit: "pão leve",
    difficulty: "Muito Fácil",
    glycemicIndex: "Médio",
    tags: ["Bíblico", "O Pão do Céu", "Sem Ovo", "Sem Glúten", "Vegano"],
    coverStyle: "linear-gradient(135deg, #2b2219, #5e4a36, #cfb794)",
    badge: "Receita 7 do E-book",
    ingredients: [
      { name: "Farinha de Arroz Branca", amount: 2, unit: "xícaras", notes: "leve e neutra" },
      { name: "Polvilho Doce", amount: 1, unit: "xícara", notes: "dá textura sedosa" },
      { name: "Tapioca Granulada ou fécula", amount: 0.5, unit: "xícara", notes: "" },
      { name: "Coco Ralado Fino sem açúcar", amount: 0.25, unit: "xícara", notes: "homenagem ao maná doce" },
      { name: "Azeite de Oliva Extra Virgem", amount: 3, unit: "colheres de sopa", notes: "" },
      { name: "Fermento Químico em Pó", amount: 1, unit: "colher de chá", notes: "" },
      { name: "Sal Marinho", amount: 1, unit: "colher de chá", notes: "" },
      { name: "Água com Gás Morna", amount: 1.25, unit: "xícaras", notes: "o gás traz aeração sublime" }
    ],
    instructions: [
      {
        step: 1,
        title: "Mistura dos Secos Alvos",
        description: "Em uma tigela grande, misture a farinha de arroz, o polvilho doce, a tapioca granulada, o coco fino, o sal e o fermento.",
        timerSeconds: 120
      },
      {
        step: 2,
        title: "Toque do Azeite",
        description: "Adicione as 3 colheres de azeite e incorpore com as pontas dos dedos até a farinha absorver a gordura uniformemente.",
        timerSeconds: 120
      },
      {
        step: 3,
        title: "Aeração com Água com Gás",
        description: "Acrescente a água com gás aos poucos, misturando rapidamente. As bolhas da água com gás reagirão criando uma textura aerada e cremosa.",
        timerSeconds: 180
      },
      {
        step: 4,
        title: "Transferência para a Forma",
        description: "Despeje a massa maleável em uma forma pequena untada com azeite e polvilhada com fécula.",
        timerSeconds: 120
      },
      {
        step: 5,
        title: "Cozimento Rápido",
        description: "Asse em forno pré-aquecido a 180°C por cerca de 30 minutos. O pão ficará clarinho por fora, com uma casquinha fina e miolo surpreendentemente macio.",
        timerSeconds: 1800
      }
    ],
    tips: "O segredo do pão do maná é a água com gás morna: o gás cria micro-câmaras de ar que deixam o miolo tão leve quanto uma nuvem."
  },

  {
    id: "pao-multigraos-abencoado-levain",
    title: "Pão Multi-Grãos Abençoado (Levain Rústico)",
    subtitle: "A Receita Mais Completa dos Profetas com Fermentação Natural",
    category: "sagrados",
    verse: "Ezequiel 4:9",
    verseText: "Põe-nos numa vasilha e faz deles pão; segundo o número dos dias que te deitares sobre o teu lado, comê-lo-ás.",
    story: "A versão mais artesanal e autêntica do pão bíblico: feita com fermentação natural lenta (levain), respeitando o tempo sagrado de maturação do trigo, da cevada e das leguminosas. Sabor profundo, digestão perfeita e conservação prolongada sem nenhum aditivo químico.",
    prepTime: "30 min",
    bakeTime: "45 min",
    totalTime: "9h (com fermentação longa)",
    servings: 1,
    servingUnit: "pão artesanal de 1kg",
    difficulty: "Avançado",
    glycemicIndex: "Muito Baixo",
    tags: ["Bíblico", "Fermentação Natural", "Levain", "Artesanal", "Multi-grãos"],
    coverStyle: "linear-gradient(135deg, #1f140a, #4a2b13, #8c5720)",
    badge: "Receita 8 do E-book",
    ingredients: [
      { name: "Levain (Fermento Natural ativo)", amount: 0.5, unit: "xícara", notes: "100g bem alimentado" },
      { name: "Farinha de Trigo Integral Ancestral ou Espelta", amount: 2, unit: "xícaras", notes: "" },
      { name: "Cevada em Flocos Finos", amount: 1, unit: "xícara", notes: "" },
      { name: "Lentilhas Cozidas e Amassadas", amount: 0.5, unit: "xícara", notes: "bem sequinhas" },
      { name: "Feijão Branco Cozido e Amassado", amount: 0.5, unit: "xícara", notes: "substituto das favas" },
      { name: "Fubá Mimoso de Milho", amount: 0.5, unit: "xícara", notes: "" },
      { name: "Aveia em Flocos", amount: 0.5, unit: "xícara", notes: "" },
      { name: "Azeite de Oliva Extra Virgem", amount: 3, unit: "colheres de sopa", notes: "" },
      { name: "Sal Marinho", amount: 1.5, unit: "colheres de chá", notes: "" },
      { name: "Água Morna Filtrada", amount: 1.5, unit: "xícaras", notes: "" }
    ],
    instructions: [
      {
        step: 1,
        title: "Mistura dos Grãos e Purês",
        description: "Em uma tigela ampla, junte as lentilhas e o feijão branco bem amassados. Acrescente a cevada, a espelta, o fubá, a aveia e o sal marinho.",
        timerSeconds: 240
      },
      {
        step: 2,
        title: "Adição do Levain e Sova Profunda",
        description: "Incorpore o Levain vivo, o azeite de oliva e a água morna. Sove por 12 minutos na bancada até a massa ganhar estrutura elástica e sedosa.",
        timerSeconds: 720
      },
      {
        step: 3,
        title: "Fermentação Longa (Overnight)",
        description: "Coloque a massa numa tigela untada, cubra hermeticamente e deixe fermentar por 8 horas (ou overnight na geladeira). A fermentação lenta quebra o amido e cria enzimas digestivas benéficas.",
        timerSeconds: 28800
      },
      {
        step: 4,
        title: "Modelagem e Descanso Final",
        description: "Retire da geladeira, modele no formato redondo tradicional (boule) e descanse por 1 hora em temperatura ambiente.",
        timerSeconds: 3600
      },
      {
        step: 5,
        title: "Cozimento com Vapor",
        description: "Asse em forno pré-aquecido a 200°C nos primeiros 15 minutos (com uma assadeira de água no fundo para criar vapor e casca crocante). Depois abaixe para 180°C por mais 30 minutos.",
        timerSeconds: 2700
      }
    ],
    tips: "O vapor nos primeiros 15 minutos garante uma crosta estaladiça dourada e um miolo úmido com alvéolos perfeitos."
  },

  // ==========================================
  // PÃES SEM GLÚTEN E SAUDÁVEIS (E-BOOK BÔNUS)
  // ==========================================
  {
    id: "pao-branco-sem-gluten",
    title: "Pão Branco Sem Glúten de Todo Dia",
    subtitle: "O Básico Essencial que Não Pode Faltar em Casa",
    category: "sem-gluten",
    verse: "Mateus 6:11",
    verseText: "O pão nosso de cada dia nos dá hoje.",
    story: "A receita perfeita do e-book bônus para substituir o pão de forma industrializado. Sem conservantes químicos, sem glúten, fofíssimo para torradas, sanduíches e lanches diários de toda a família.",
    prepTime: "10 min",
    bakeTime: "35 min",
    totalTime: "45 min",
    servings: 1,
    servingUnit: "pão de 14 fatias",
    difficulty: "Muito Fácil",
    glycemicIndex: "Médio",
    tags: ["Sem Glúten", "Sem Sovar", "Básico", "Liquidificador", "Rápido"],
    coverStyle: "linear-gradient(135deg, #2b1f13, #6b4c2b, #b38b59)",
    badge: "Receita 01 do E-book Bônus",
    ingredients: [
      { name: "Farinha de Arroz Branca", amount: 2, unit: "xícaras", notes: "peneirada" },
      { name: "Polvilho Doce", amount: 1, unit: "xícara", notes: "para maciez" },
      { name: "Ovos Caipiras", amount: 3, unit: "unidades", notes: "temperatura ambiente" },
      { name: "Óleo de Girassol ou Azeite", amount: 0.5, unit: "xícara", notes: "" },
      { name: "Leite Morno (ou leite vegetal)", amount: 0.75, unit: "xícara", notes: "" },
      { name: "Açúcar Mascavo ou De-merara", amount: 1, unit: "colher de sopa", notes: "" },
      { name: "Sal", amount: 0.5, unit: "colher de chá", notes: "" },
      { name: "Fermento Químico em Pó", amount: 1, unit: "colher de sopa", notes: "ou 1 sachê de fermento biológico" }
    ],
    instructions: [
      {
        step: 1,
        title: "Mistura dos Secos",
        description: "Em uma tigela, misture a farinha de arroz branca, o polvilho doce, o açúcar e o sal.",
        timerSeconds: 120
      },
      {
        step: 2,
        title: "Líquidos Aveludados",
        description: "No liquidificador ou à mão, bata os 3 ovos com o óleo e o leite morno até espumar.",
        timerSeconds: 120
      },
      {
        step: 3,
        title: "Combinação Homogênea",
        description: "Despeje os líquidos sobre os secos. Mexa com uma espátula até ficar bem homogêneo. Adicione o fermento por último com movimentos suaves.",
        timerSeconds: 180
      },
      {
        step: 4,
        title: "Forma e Forno",
        description: "Despeje em forma de bolo inglês untada com óleo e polvilhada com farinha de arroz. Asse a 180°C por 30 a 35 minutos até dourar e o palito sair limpo.",
        timerSeconds: 2100
      }
    ],
    tips: "Dica da Dona do E-book: O segredo para não ficar pesado é não bater demais a massa depois de juntar o fermento. Misture apenas até incorporar!"
  },

  {
    id: "pao-rapido-de-frigideira",
    title: "Pão Rápido de Frigideira de 5 Minutos",
    subtitle: "Pronto em Minutos para o Café da Manhã",
    category: "rapidos",
    verse: "Salmos 143:8",
    verseText: "Faze-me ouvir da tua benignidade pela manhã, pois em ti confio.",
    story: "Perfeito para quem tem uma rotina corrida mas não abre mão da alimentação limpa e saudável. Fica pronto em apenas 5 minutos na frigideira, douradinho por fora e macio por dentro.",
    prepTime: "3 min",
    bakeTime: "4 min",
    totalTime: "7 min",
    servings: 1,
    servingUnit: "1 pão individual grande",
    difficulty: "Muito Fácil",
    glycemicIndex: "Baixo",
    tags: ["Sem Glúten", "Frigideira", "5 Minutos", "Individual", "Super Rápido"],
    coverStyle: "linear-gradient(135deg, #3d260f, #824b17, #d48b37)",
    badge: "Receita 03 do E-book Bônus",
    ingredients: [
      { name: "Ovo", amount: 1, unit: "unidade", notes: "" },
      { name: "Farinha de Aveia ou Farinha de Arroz", amount: 2, unit: "colheres de sopa", notes: "" },
      { name: "Polvilho Doce ou Tapioca", amount: 1, unit: "colher de sopa", notes: "" },
      { name: "Azeite de Oliva", amount: 1, unit: "colher de chá", notes: "" },
      { name: "Água ou Leite Vegetal", amount: 1, unit: "colher de sopa", notes: "" },
      { name: "Fermento Químico em Pó", amount: 0.5, unit: "colher de café", notes: "" },
      { name: "Sal Marinho e Ervas Finas", amount: 1, unit: "pitada", notes: "orégano ou alecrim" }
    ],
    instructions: [
      {
        step: 1,
        title: "Bater Rápido",
        description: "Em uma xícara ou tigelinha, bata o ovo vigorosamente com o garfo. Adicione as farinhas, a água, o azeite, o sal e as ervas.",
        timerSeconds: 90
      },
      {
        step: 2,
        title: "Adicionar o Fermento",
        description: "Adicione o fermento e misture delicadamente com o garfo até borbulhar.",
        timerSeconds: 30
      },
      {
        step: 3,
        title: "Dourar na Frigideira",
        description: "Aqueça uma frigideira pequena untada com azeite em fogo baixo. Despeje a massa, tampe e deixe cozinhar por 2 a 3 minutos até firmar. Vire e doure por mais 1 minuto.",
        timerSeconds: 240
      }
    ],
    tips: "Corte ao meio e recheie com queijo branco, fatias de abacate ou azeite com orégano. Fica espetacular!"
  },

  {
    id: "pao-de-abobora-dourada",
    title: "Pão de Abóbora Dourada com Sementes",
    subtitle: "Cor Dourada Sublime, Rico em Betacaroteno e Maciez",
    category: "sem-gluten",
    verse: "Salmos 65:11",
    verseText: "Tu coroas o ano da tua bondade, e as tuas veredas destilam gordura.",
    story: "A abóbora cabotiá cozida traz uma umidade natural única aos pães sem glúten, dispensando açúcares refinados e óleos em excesso. Uma fatia dourada e acolhedora cheia de antioxidantes.",
    prepTime: "20 min",
    bakeTime: "40 min",
    totalTime: "1h",
    servings: 1,
    servingUnit: "pão de 12 fatias",
    difficulty: "Fácil",
    glycemicIndex: "Baixo",
    tags: ["Sem Glúten", "Abóbora", "Anti-inflamatório", "Macio", "Colorido Natural"],
    coverStyle: "linear-gradient(135deg, #4a2107, #99490e, #e87b1c)",
    badge: "Receita 12 do E-book Bônus",
    ingredients: [
      { name: "Purê de Abóbora Cabotiá cozida", amount: 1, unit: "xícara", notes: "bem amassadinho e sequinho" },
      { name: "Farinha de Arroz Integral", amount: 1.5, unit: "xícaras", notes: "" },
      { name: "Polvilho Doce", amount: 0.5, unit: "xícara", notes: "" },
      { name: "Farinha de Linhaça Dourada", amount: 0.25, unit: "xícara", notes: "" },
      { name: "Ovos", amount: 2, unit: "unidades", notes: "" },
      { name: "Azeite de Oliva Extra Virgem", amount: 3, unit: "colheres de sopa", notes: "" },
      { name: "Sementes de Abóbora", amount: 2, unit: "colheres de sopa", notes: "para a massa e acabamento" },
      { name: "Fermento Químico em Pó", amount: 1, unit: "colher de sopa", notes: "" },
      { name: "Sal Marinho e noz-moscada", amount: 1, unit: "colher de chá", notes: "" }
    ],
    instructions: [
      {
        step: 1,
        title: "Emulsão da Abóbora",
        description: "Bata no liquidificador ou com batedor os ovos, o purê de abóbora cozida e o azeite até virar um creme dourado liso.",
        timerSeconds: 180
      },
      {
        step: 2,
        title: "Mistura com as Farinhas",
        description: "Em um recipiente, junte a farinha de arroz integral, o polvilho doce, a linhaça e o sal. Despeje o creme de abóbora e mexa até massa uniforme.",
        timerSeconds: 180
      },
      {
        step: 3,
        title: "Fermento e Sementes",
        description: "Adicione o fermento e metade das sementes de abóbora. Despeje em forma de pão untada e salpique o restante das sementes por cima.",
        timerSeconds: 120
      },
      {
        step: 4,
        title: "Forno Dourado",
        description: "Asse em forno pré-aquecido a 180°C por cerca de 40 a 45 minutos. Espete o palito para conferir se está seco.",
        timerSeconds: 2400
      }
    ],
    tips: "Para um purê perfeito, asse a abóbora no forno com casca ou cozinhe no vapor. Isso evita que ela absorva água em excesso."
  },

  {
    id: "focaccia-italiana-alecrim-confit",
    title: "Focaccia Artesanal com Alecrim e Tomate Confit",
    subtitle: "Rústica, Dourada e com Fartura de Azeite de Oliva",
    category: "sem-gluten",
    verse: "Salmos 104:15",
    verseText: "E o azeite que faz reluzir o seu rosto, e o pão que fortalece o coração do homem.",
    story: "Inspirada nas mais nobres tradições mediterrâneas, esta focaccia sem glúten tem uma crosta dourada e brilhante de azeite, com furinhos característicos recheados com alecrim fresco e tomatinhos doces.",
    prepTime: "20 min",
    bakeTime: "30 min",
    totalTime: "50 min",
    servings: 8,
    servingUnit: "fatias generosas",
    difficulty: "Médio",
    glycemicIndex: "Médio",
    tags: ["Sem Glúten", "Focaccia", "Alecrim", "Azeite de Oliva", "Gourmet"],
    coverStyle: "linear-gradient(135deg, #1f2b14, #476127, #8bb84d)",
    badge: "Receita 21 do E-book Bônus",
    ingredients: [
      { name: "Farinha de Arroz Branca", amount: 1.5, unit: "xícaras", notes: "" },
      { name: "Farinha de Grão-de-Bico", amount: 0.5, unit: "xícara", notes: "dá cor e corpo" },
      { name: "Polvilho Doce", amount: 0.5, unit: "xícara", notes: "" },
      { name: "Azeite de Oliva Extra Virgem", amount: 0.33, unit: "xícara", notes: "generoso" },
      { name: "Água Morna", amount: 1, unit: "xícara", notes: "" },
      { name: "Fermento Biológico Seco", amount: 1, unit: "colher de sopa", notes: "10g" },
      { name: "Mel ou Açúcar Mascavo", amount: 1, unit: "colher de chá", notes: "" },
      { name: "Tomatinhos Sweet Grape cortados", amount: 10, unit: "unidades", notes: "para afundar na massa" },
      { name: "Ramos de Alecrim Fresco", amount: 3, unit: "ramos", notes: "folhas soltas" },
      { name: "Sal Grosso ou Flor de Sal", amount: 1, unit: "colher de chá", notes: "para finalizar" }
    ],
    instructions: [
      {
        step: 1,
        title: "Ativação do Fermento",
        description: "Misture o fermento biológico seco na água morna com o mel. Deixe espumar por 10 minutos.",
        timerSeconds: 600
      },
      {
        step: 2,
        title: "Massa Cremosa de Focaccia",
        description: "Em uma vasilha, misture as farinhas e o sal. Adicione o fermento ativado e metade do azeite. Misture bem até formar uma massa espessa e cremosa.",
        timerSeconds: 180
      },
      {
        step: 3,
        title: "Espalhar e Fazer as Covinhas",
        description: "Espalhe a massa em uma assadeira média untada com azeite. Com as pontas dos dedos untadas de azeite, faça covinhas em toda a superfície.",
        timerSeconds: 120
      },
      {
        step: 4,
        title: "Decoração Sagrada",
        description: "Pressione os tomatinhos nas covinhas, salpique as folhas de alecrim fresco, regue com o restante do azeite generosamente e finalize com flor de sal.",
        timerSeconds: 180
      },
      {
        step: 5,
        title: "Forno Dourado e Borbulhante",
        description: "Asse em forno pré-aquecido a 200°C por 25 a 30 minutos, até que as bordas fiquem bem crocantes e os tomates caramelizados.",
        timerSeconds: 1800
      }
    ],
    tips: "Sirva morna. O aroma de azeite quente e alecrim é uma das experiências olfativas mais reconfortantes da culinária."
  },

  {
    id: "pao-com-psyllium-husk-elastico",
    title: "Pão Funcional com Psyllium Husk",
    subtitle: "Elasticidade Incrível, Digestão Perfeita e Sem Glúten",
    category: "sem-gluten",
    verse: "1 Coríntios 6:19",
    verseText: "Não sabeis que o vosso corpo é o templo do Espírito Santo?",
    story: "O psyllium husk é uma fibra natural milenar extraída da casca da semente de Plantago ovata. Ele retém água e cria uma rede elástica natural idêntica à do glúten, permitindo fatiar fino sem esfarelar.",
    prepTime: "15 min",
    bakeTime: "40 min",
    totalTime: "55 min",
    servings: 1,
    servingUnit: "pão de 14 fatias",
    difficulty: "Médio",
    glycemicIndex: "Muito Baixo",
    tags: ["Sem Glúten", "Psyllium", "Elástico", "Keto Friendly", "Fatiável"],
    coverStyle: "linear-gradient(135deg, #2e1d0f, #663b17, #ad6e2d)",
    badge: "Receita 17 do E-book Bônus",
    ingredients: [
      { name: "Psyllium Husk em Pó (ou flocos)", amount: 2, unit: "colheres de sopa", notes: "20g de fibra pura" },
      { name: "Água Morna", amount: 1, unit: "xícara", notes: "para hidratar o psyllium" },
      { name: "Farinha de Amêndoas ou Farinha de Arroz", amount: 1.5, unit: "xícaras", notes: "" },
      { name: "Farinha de Linhaça Dourada", amount: 0.5, unit: "xícara", notes: "" },
      { name: "Ovos Caipiras", amount: 3, unit: "unidades", notes: "" },
      { name: "Vinagre de Maçã", amount: 1, unit: "colher de sopa", notes: "" },
      { name: "Azeite de Oliva", amount: 3, unit: "colheres de sopa", notes: "" },
      { name: "Fermento Químico em Pó", amount: 1, unit: "colher de sopa", notes: "" },
      { name: "Sal Marinho", amount: 1, unit: "colher de chá", notes: "" }
    ],
    instructions: [
      {
        step: 1,
        title: "O Gel Mágico de Psyllium",
        description: "Misture o psyllium em pó com 1 xícara de água morna. Aguarde 5 minutos: formará um gel espesso e elástico que substitui o glúten perfeitamente.",
        timerSeconds: 300
      },
      {
        step: 2,
        title: "Bater Ovos e Gordura",
        description: "Em outra tigela, bata os ovos com o azeite e a colher de vinagre de maçã.",
        timerSeconds: 120
      },
      {
        step: 3,
        title: "União das Farinhas e Gel",
        description: "Incorpore o gel de psyllium, as farinhas e o sal. Amasse com uma espátula ou as mãos até formar uma bola macia e modelável.",
        timerSeconds: 240
      },
      {
        step: 4,
        title: "Forno Dourado",
        description: "Modele no formato desejado ou use forma untada. Asse a 180°C por 40 a 45 minutos até que esteja firme e bem assado por dentro.",
        timerSeconds: 2500
      }
    ],
    tips: "Graças ao psyllium, você pode cortar fatias finíssimas sem esfarelar nada! Fica excelente para congelar já fatiado."
  },

  {
    id: "pao-doce-com-gotas-de-chocolate-amargo",
    title: "Pão Doce Rústico com Cacau Nobre",
    subtitle: "Aconchego, Saúde e Sabor Irresistível para Toda a Família",
    category: "doces-especiais",
    verse: "Salmos 34:8",
    verseText: "Provai e vede que o Senhor é bom; bem-aventurado o homem que nele confia.",
    story: "Uma receita especial de final de semana dos e-books. Aveludado com cacau puro, adoçado de forma natural e pontilhado com gotas de chocolate amargo 70%. Perfeito para um lanche reconfortante.",
    prepTime: "15 min",
    bakeTime: "40 min",
    totalTime: "55 min",
    servings: 1,
    servingUnit: "pão de 12 fatias",
    difficulty: "Fácil",
    glycemicIndex: "Médio",
    tags: ["Sem Glúten", "Pão Doce", "Cacau Puro", "Chocolate 70%", "Especial"],
    coverStyle: "linear-gradient(135deg, #1c0e08, #421d0d, #783515)",
    badge: "Receita 10 do E-book Bônus",
    ingredients: [
      { name: "Farinha de Aveia sem glúten", amount: 1.5, unit: "xícaras", notes: "" },
      { name: "Farinha de Amêndoas ou Arroz Integral", amount: 1, unit: "xícara", notes: "" },
      { name: "Cacau em Pó 100% Puro", amount: 0.33, unit: "xícara", notes: "sem açúcar" },
      { name: "Mel Puro ou Açúcar de Coco", amount: 0.5, unit: "xícara", notes: "" },
      { name: "Bananas bem maduras amassadas", amount: 2, unit: "unidades", notes: "adoçam e dão umidade" },
      { name: "Ovos", amount: 3, unit: "unidades", notes: "" },
      { name: "Óleo de Coco ou Manteiga Ghee", amount: 0.25, unit: "xícara", notes: "derretido" },
      { name: "Gotas de Chocolate Amargo 70%", amount: 0.5, unit: "xícara", notes: "" },
      { name: "Fermento Químico em Pó", amount: 1, unit: "colher de sopa", notes: "" },
      { name: "Sal Marinho", amount: 1, unit: "pitada", notes: "realça o cacau" }
    ],
    instructions: [
      {
        step: 1,
        title: "Base Aveludada de Cacau",
        description: "Em uma tigela, amasse as bananas e bata com os ovos, o mel/açúcar de coco e o óleo de coco.",
        timerSeconds: 180
      },
      {
        step: 2,
        title: "Peneirar os Secos",
        description: "Adicione as farinhas, o cacau em pó puro e a pitada de sal. Misture até obter uma massa escura brilhante e perfumada.",
        timerSeconds: 180
      },
      {
        step: 3,
        title: "Gotas de Chocolate e Fermento",
        description: "Incorpore o fermento e 2/3 das gotas de chocolate amargo com delicadeza. Despeje em forma untada e salpique o restante das gotas por cima.",
        timerSeconds: 120
      },
      {
        step: 4,
        title: "Forno Perfumado",
        description: "Asse em forno pré-aquecido a 180°C por 35 a 40 minutos. O aroma de bolo de chocolate assando tomará toda a casa.",
        timerSeconds: 2200
      }
    ],
    tips: "Sirva uma fatia quentinha com um café coado ou chá de ervas bíblicas. As gotas ficam derretidas por dentro!"
  },

  // ==========================================
  // BEBIDAS & ACOMPANHAMENTOS BÍBLICOS DETOX (BÔNUS)
  // ==========================================
  {
    id: "suco-verde-revitalizante-salmos",
    title: "Suco Verde Revitalizante dos Salmos",
    subtitle: "Nutre o Corpo e Alimenta o Espírito",
    category: "detox-acompanhamentos",
    verse: "Salmos 104:14",
    verseText: "Ele faz crescer a erva para o gado, e as plantas para o serviço do homem, para tirar da terra o alimento.",
    story: "Do e-book bônus de 75 Receitas Bíblicas e Sucos Detox. Uma bebida rica em clorofila viva, minerais alcalinizantes e hidratação profunda para acompanhar seu pão sagrado pela manhã.",
    prepTime: "5 min",
    bakeTime: "0 min",
    totalTime: "5 min",
    servings: 1,
    servingUnit: "1 copo grande de 350ml",
    difficulty: "Muito Fácil",
    glycemicIndex: "Muito Baixo",
    tags: ["Bíblico", "Detox", "Suco Verde", "Imunidade", "Refrescante"],
    coverStyle: "linear-gradient(135deg, #102913, #225729, #4ca658)",
    badge: "Receita 1 do E-book 75 Receitas",
    ingredients: [
      { name: "Folha de Couve Manteiga Orgânica", amount: 1, unit: "folha grande", notes: "higienizada e sem talo" },
      { name: "Salsa Fresca", amount: 1, unit: "colher de sopa", notes: "diurética e rica em ferro" },
      { name: "Melão ou Maçã Verde", amount: 1, unit: "fatia generosa", notes: "doce natural" },
      { name: "Suco de Limões Frescos", amount: 2, unit: "unidades", notes: "vitamina C pura" },
      { name: "Água de Coco ou Água Mineral Gelada", amount: 1.5, unit: "copos", notes: "300ml" },
      { name: "Gengibre Fresco", amount: 1, unit: "lasca fina", notes: "opcional, estimula a digestão" }
    ],
    instructions: [
      {
        step: 1,
        title: "Preparar os Verdes",
        description: "Higienize a folha de couve e a salsa em água corrente. Pique a fatia de melão e esprema os dois limões.",
        timerSeconds: 120
      },
      {
        step: 2,
        title: "Bater no Liquidificador",
        description: "Coloque todos os ingredientes no liquidificador com a água de coco bem gelada. Bata em potência máxima por 1 a 2 minutos até ficar completamente liso e verde vibrante.",
        timerSeconds: 90
      },
      {
        step: 3,
        title: "Servir Imediatamente",
        description: "Beba imediatamente sem coar para aproveitar 100% das fibras nobres e nutrientes vivos.",
        timerSeconds: 30
      }
    ],
    tips: "Beba em jejum acompanhado de uma fatia do Pão de Ezequiel ou Pão de Cevada tostada com azeite de oliva."
  },

  {
    id: "shot-imunidade-bom-samaritano",
    title: "Shot de Imunidade do Bom Samaritano",
    subtitle: "Cúrcuma, Gengibre, Limão e Especiarias Sagradas",
    category: "detox-acompanhamentos",
    verse: "Lucas 10:34",
    verseText: "E, aproximando-se, atou-lhe as feridas, aplicando-lhes azeite e vinho.",
    story: "Uma combinação potente anti-inflamatória e fortalecedora das defesas naturais, com cúrcuma dourada da terra, gengibre vigoroso e a acidez purificante do limão.",
    prepTime: "3 min",
    bakeTime: "0 min",
    totalTime: "3 min",
    servings: 1,
    servingUnit: "1 shot de 50ml",
    difficulty: "Muito Fácil",
    glycemicIndex: "Muito Baixo",
    tags: ["Bíblico", "Shot Matinal", "Anti-inflamatório", "Imunidade", "Cúrcuma"],
    coverStyle: "linear-gradient(135deg, #3d1b03, #8f4509, #f59f00)",
    badge: "Receita 5 do E-book 75 Receitas",
    ingredients: [
      { name: "Suco de Limão Taiti espremido na hora", amount: 1, unit: "unidade", notes: "" },
      { name: "Cúrcuma (Açafrão-da-terra) em pó puro", amount: 1, unit: "colher de chá", notes: "curcumina nobre" },
      { name: "Gengibre em pó ou ralado fresco", amount: 1, unit: "colher de chá", notes: "" },
      { name: "Canela do Ceilão em pó", amount: 0.5, unit: "colher de chá", notes: "" },
      { name: "Pimenta do Reino moída", amount: 1, unit: "pitadinha", notes: "aumenta a absorção em 2000%" },
      { name: "Água morna filtrada", amount: 2, unit: "colheres de sopa", notes: "para dissolver" }
    ],
    instructions: [
      {
        step: 1,
        title: "Mistura das Especiarias",
        description: "Esprema o limão em um copinho pequeno de shot. Adicione a cúrcuma, o gengibre, a canela e a pitada de pimenta do reino.",
        timerSeconds: 60
      },
      {
        step: 2,
        title: "Dissolução Rápida",
        description: "Adicione 2 colheres de água morna e mexa rapidamente com uma colher de café até dissolver as especiarias.",
        timerSeconds: 30
      },
      {
        step: 3,
        title: "Tomar de uma Vez",
        description: "Tome de uma só vez logo pela manhã, respirando fundo e agradecendo pela saúde renovada no seu templo.",
        timerSeconds: 20
      }
    ],
    tips: "A pitada de pimenta do reino contém piperina, que multiplica a biodisponibilidade da curcumina em até 2000 vezes no organismo humano!"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { RECIPES_DATA, DEVOTIONALS, BIBLICAL_INGREDIENTS_INFO };
}
