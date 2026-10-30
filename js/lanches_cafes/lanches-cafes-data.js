/**
 * PÃO DIVINO - Catálogo Oficial do E-book: Lanches e Cafés da Manhã Saudáveis
 * 25 Receitas Nutritivas numeradas de acordo com as páginas originais do e-book.
 */

const LANCHES_CAFES_RECIPES = [
  {
    "id": "lanche-03-iogurte-granola-frutas",
    "pageNumber": 3,
    "title": "03 - Iogurte Natural com Granola e Frutas",
    "subtitle": "Combinação clássica, cremosa e rica em probióticos e fibras para o café da manhã",
    "category": "lanches-cafes",
    "prepTime": "5 min",
    "bakeTime": "0 min",
    "totalTime": "5 min",
    "servings": 1,
    "servingUnit": "tigela / porção",
    "difficulty": "Muito Fácil",
    "image": "./images/lanches_cafes/03_iogurte_natural_granola_frutas.jpg",
    "badge": "Café Nutritivo",
    "tags": [
      "Café da Manhã",
      "Iogurte",
      "Granola",
      "Fibras",
      "Probióticos"
    ],
    "verse": "Salmos 23:2",
    "verseText": "Ele me faz repousar em pastos verdejantes e guia-me mansamente a águas tranquilas.",
    "ingredients": [
      {
        "name": "Iogurte natural integral",
        "amount": 1,
        "unit": "copo (170g)",
        "notes": "sem adição de açúcar"
      },
      {
        "name": "Granola caseira crocante",
        "amount": 3,
        "unit": "colheres de sopa",
        "notes": "com castanhas e aveia"
      },
      {
        "name": "Frutas frescas fatiadas",
        "amount": 1,
        "unit": "xícara",
        "notes": "morango, mirtilo, banana e kiwi"
      },
      {
        "name": "Sementes de Chia",
        "amount": 1,
        "unit": "colher de sopa",
        "notes": "fonte de ômega-3"
      },
      {
        "name": "Mel puro de abelha",
        "amount": 1,
        "unit": "colher de chá",
        "notes": "opcional para finalizar"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Base Cremosa",
        "description": "Coloque o iogurte natural integral no fundo de uma tigela funda ou bowl elegante.",
        "timerSeconds": 30
      },
      {
        "step": 2,
        "title": "Adicionar as Frutas",
        "description": "Distribua as frutas frescas cortadas (morangos, mirtilos, banana e kiwi) delicadamente por cima da base de iogurte.",
        "timerSeconds": 60
      },
      {
        "step": 3,
        "title": "Fibras e Crocância",
        "description": "Salpique a granola caseira e as sementes de chia uniformemente sobre as frutas.",
        "timerSeconds": 30
      },
      {
        "step": 4,
        "title": "Finalizar com Mel",
        "description": "Regue com um fio de mel puro a gosto e sirva imediatamente para manter toda a crocância da granola.",
        "timerSeconds": 30
      }
    ],
    "tips": "O iogurte integral com chia fornece gorduras boas e fibras prebióticas que auxiliam a flora intestinal e prolongam a saciedade."
  },
  {
    "id": "lanche-04-mingau-aveia-canela-banana",
    "pageNumber": 4,
    "title": "04 - Mingau de Aveia com Canela e Banana",
    "subtitle": "Conforto digestivo, energia sustentada e doçura natural da fruta",
    "category": "lanches-cafes",
    "prepTime": "3 min",
    "bakeTime": "7 min",
    "totalTime": "10 min",
    "servings": 1,
    "servingUnit": "tigela",
    "difficulty": "Fácil",
    "image": "./images/lanches_cafes/04_mingau_aveia_canela_banana.jpg",
    "badge": "Energia Calmante",
    "tags": [
      "Café da Manhã",
      "Aveia",
      "Banana",
      "Termogênico",
      "Mingau"
    ],
    "verse": "Salmos 23:2",
    "verseText": "Ele me faz repousar em pastos verdejantes.",
    "ingredients": [
      {
        "name": "Aveia em flocos finos",
        "amount": 0.5,
        "unit": "xícara",
        "notes": "integral de boa qualidade"
      },
      {
        "name": "Leite integral ou vegetal",
        "amount": 1,
        "unit": "xícara",
        "notes": "amêndoas, aveia ou coco"
      },
      {
        "name": "Banana madura",
        "amount": 1,
        "unit": "unidade",
        "notes": "amassada com o garfo"
      },
      {
        "name": "Canela em pó",
        "amount": 1,
        "unit": "colher de chá",
        "notes": "aroma e termogênese"
      },
      {
        "name": "Mel puro de abelha",
        "amount": 1,
        "unit": "colher de chá",
        "notes": "a gosto"
      },
      {
        "name": "Sal marinho",
        "amount": 1,
        "unit": "pitada",
        "notes": "realça a doçura natural"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Cozinhar a Aveia",
        "description": "Em uma panela pequena, misture a aveia em flocos com o leite e a pitada de sal. Leve ao fogo médio-baixo mexendo sem parar até começar a encorpar.",
        "timerSeconds": 300
      },
      {
        "step": 2,
        "title": "Incorporar a Banana",
        "description": "Desligue o fogo e adicione a banana amassada, mexendo vigorosamente para liberar a doçura natural no mingau cremoso.",
        "timerSeconds": 60
      },
      {
        "step": 3,
        "title": "Aromatizar com Canela",
        "description": "Adicione a canela em pó e misture até que fique completamente uniforme.",
        "timerSeconds": 30
      },
      {
        "step": 4,
        "title": "Montagem e Finalização",
        "description": "Despeje em uma tigela bonita, decore com rodelas de banana fresca, polvilhe mais canela e finalize com um fio de mel puro.",
        "timerSeconds": 60
      }
    ],
    "tips": "A aveia contém betaglucana, fibra solúvel que reduz o colesterol e estabiliza a glicose no sangue."
  },
  {
    "id": "lanche-05-omelete-espinafre-tomate",
    "pageNumber": 5,
    "title": "05 - Omelete Cremosa com Espinafre e Tomate",
    "subtitle": "Rica em proteínas nobres, ferro vegetal e licopeno antioxidante",
    "category": "lanches-cafes",
    "prepTime": "5 min",
    "bakeTime": "5 min",
    "totalTime": "10 min",
    "servings": 1,
    "servingUnit": "porção",
    "difficulty": "Fácil",
    "image": "./images/lanches_cafes/05_omelete_cremosa_espinafre_tomate.jpg",
    "badge": "Proteico & Leve",
    "tags": [
      "Café da Manhã",
      "Ovos",
      "Espinafre",
      "Low Carb",
      "Sem Glúten"
    ],
    "verse": "Salmos 23:2",
    "verseText": "Refrigera a minha alma; guia-me pelas veredas da justiça por amor do seu nome.",
    "ingredients": [
      {
        "name": "Ovos caipiras frescos",
        "amount": 2,
        "unit": "unidades",
        "notes": "gemas alaranjadas"
      },
      {
        "name": "Espinafre fresco",
        "amount": 1,
        "unit": "xícara",
        "notes": "folhas bem higienizadas"
      },
      {
        "name": "Tomates-cereja",
        "amount": 3,
        "unit": "unidades",
        "notes": "cortados ao meio"
      },
      {
        "name": "Manteiga de boa qualidade",
        "amount": 0.5,
        "unit": "colher de sopa",
        "notes": "para untar e dourar"
      },
      {
        "name": "Sal marinho e pimenta-do-reino",
        "amount": 1,
        "unit": "a gosto",
        "notes": "moídos na hora"
      },
      {
        "name": "Ervas frescas picadas",
        "amount": 1,
        "unit": "colher de sopa",
        "notes": "salsinha ou cebolinha verde"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Bater os Ovos",
        "description": "Em uma tigela pequena, bata vigorosamente os dois ovos com uma pitada de sal e pimenta-do-reino até espumar.",
        "timerSeconds": 60
      },
      {
        "step": 2,
        "title": "Saltear os Vegetais",
        "description": "Aqueça uma frigideira em fogo médio, derreta metade da manteiga e refogue o espinafre e os tomatinhos rapidamente por 1 minuto. Reserve num pratinho.",
        "timerSeconds": 60
      },
      {
        "step": 3,
        "title": "Cozinhar a Omelete",
        "description": "Coloque o restante da manteiga na frigideira, despeje os ovos e mexa delicadamente o centro com uma espátula de silicone. Quando a borda firmar, puxe para o centro.",
        "timerSeconds": 120
      },
      {
        "step": 4,
        "title": "Rechear e Dobrar",
        "description": "Distribua o espinafre e os tomates sobre uma das metades da omelete, dobre ao meio e finalize salpicando as ervas frescas picadas.",
        "timerSeconds": 60
      }
    ],
    "tips": "Bater bem os ovos antes de colocar na frigideira cria uma textura macia e aerada, lembrando um suflê leve."
  },
  {
    "id": "lanche-06-cuscuz-milho-manteiga",
    "pageNumber": 6,
    "title": "06 - Cuscuz de Milho com Manteiga",
    "subtitle": "Herança tradicional brasileira de energia reconfortante e aroma acolhedor",
    "category": "lanches-cafes",
    "prepTime": "12 min",
    "bakeTime": "10 min",
    "totalTime": "22 min",
    "servings": 3,
    "servingUnit": "porções",
    "difficulty": "Fácil",
    "image": "./images/lanches_cafes/06_cuscuz_milho_manteiga.jpg",
    "badge": "Tradição & Força",
    "tags": [
      "Café da Manhã",
      "Milho",
      "Sem Glúten",
      "Cuscuz",
      "Nordestino"
    ],
    "verse": "Salmos 23:2",
    "verseText": "Ele me faz repousar em pastos verdejantes e guia-me mansamente a águas tranquilas.",
    "ingredients": [
      {
        "name": "Farinha de milho flocada (flocão)",
        "amount": 1.5,
        "unit": "xícara",
        "notes": "não transgênica de preferência"
      },
      {
        "name": "Água filtrada",
        "amount": 0.75,
        "unit": "xícara",
        "notes": "temperatura ambiente"
      },
      {
        "name": "Sal marinho",
        "amount": 0.5,
        "unit": "colher de chá",
        "notes": "a gosto"
      },
      {
        "name": "Manteiga de leite da terra",
        "amount": 2,
        "unit": "colheres de sopa",
        "notes": "para derreter por cima"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Hidratar a Massa",
        "description": "Em uma tigela, misture a farinha de milho flocada e o sal. Adicione a água aos poucos, esfregando com as pontas dos dedos até obter textura de areia úmida. Deixe descansar por 10 minutos.",
        "timerSeconds": 600
      },
      {
        "step": 2,
        "title": "Acomodar na Cuscuzeira",
        "description": "Coloque água no fundo da cuscuzeira. Deposite a massa hidratada com suavidade, sem apertar nem compactar, permitindo a circulação uniforme do vapor.",
        "timerSeconds": 60
      },
      {
        "step": 3,
        "title": "Cozimento no Vapor",
        "description": "Tampe a cuscuzeira e leve ao fogo médio. Após a água ferver e levantar o perfume irresistível de milho cozido (cerca de 10 minutos), o cuscuz estará pronto.",
        "timerSeconds": 600
      },
      {
        "step": 4,
        "title": "Desenformar e Untar",
        "description": "Desenforme em um prato, solte levemente com um garfo e regue com a manteiga generosamente ainda bem quente para derreter.",
        "timerSeconds": 60
      }
    ],
    "tips": "Nunca compacte a massa na cuscuzeira; deixar a farinha soltinha garante um cuscuz leve, fofo e que derrete na boca."
  },
  {
    "id": "lanche-07-panqueca-aveia-frutas-vermelhas",
    "pageNumber": 7,
    "title": "07 - Panqueca de Aveia com Frutas Vermelhas",
    "subtitle": "Massa leve de 3 ingredientes, rica em antioxidantes e sem adição de açúcares",
    "category": "lanches-cafes",
    "prepTime": "5 min",
    "bakeTime": "6 min",
    "totalTime": "11 min",
    "servings": 2,
    "servingUnit": "porções",
    "difficulty": "Fácil",
    "image": "./images/lanches_cafes/07_panqueca_aveia_frutas_vermelhas.jpg",
    "badge": "Antioxidante",
    "tags": [
      "Café da Manhã",
      "Panqueca",
      "Aveia",
      "Frutas Vermelhas",
      "Sem Glúten"
    ],
    "verse": "Salmos 23:2",
    "verseText": "Ele me faz repousar em pastos verdejantes.",
    "ingredients": [
      {
        "name": "Aveia em flocos finos",
        "amount": 0.5,
        "unit": "xícara",
        "notes": "rica em fibras solúveis"
      },
      {
        "name": "Ovo caipira",
        "amount": 1,
        "unit": "unidade",
        "notes": "fresco"
      },
      {
        "name": "Banana madura amassada",
        "amount": 0.5,
        "unit": "unidade",
        "notes": "adoçante natural"
      },
      {
        "name": "Canela em pó",
        "amount": 1,
        "unit": "colher de chá",
        "notes": "perfume aromático"
      },
      {
        "name": "Sal marinho",
        "amount": 1,
        "unit": "pitada",
        "notes": "para equilíbrio"
      },
      {
        "name": "Frutas vermelhas frescas",
        "amount": 0.5,
        "unit": "xícara",
        "notes": "morangos, mirtilos e amoras"
      },
      {
        "name": "Mel puro de abelha",
        "amount": 1,
        "unit": "colher de sopa",
        "notes": "a gosto para finalizar"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Bater Ovo e Banana",
        "description": "Em uma tigela média, amasse bem a meia banana madura e bata junto com o ovo usando um garfo até espumar.",
        "timerSeconds": 60
      },
      {
        "step": 2,
        "title": "Formar a Massa",
        "description": "Adicione a aveia em flocos finos, a canela e a pitada de sal. Misture bem até formar uma massa densa e homogênea.",
        "timerSeconds": 60
      },
      {
        "step": 3,
        "title": "Dourar na Frigideira",
        "description": "Aqueça uma frigideira antiaderente untada em fogo bem baixo. Despeje pequenas conchas e cozinhe por 2 a 3 minutos até formar bolhas.",
        "timerSeconds": 150
      },
      {
        "step": 4,
        "title": "Virar e Servir",
        "description": "Vire com uma espátula e doure o outro lado por 1 a 2 minutos. Empilhe as panquecas quentinhas, cubra com frutas vermelhas e regue com mel.",
        "timerSeconds": 90
      }
    ],
    "tips": "Cozinhar em fogo bem baixo com a frigideira tampada garante que a panqueca asse por dentro sem queimar por fora."
  },
  {
    "id": "lanche-08-tapioca-queijo-coalho-mel",
    "pageNumber": 8,
    "title": "08 - Tapioca com Queijo Coalho e Mel",
    "subtitle": "O contraste sublime entre o salgado do queijo tostado e a doçura pura do mel",
    "category": "lanches-cafes",
    "prepTime": "3 min",
    "bakeTime": "4 min",
    "totalTime": "7 min",
    "servings": 1,
    "servingUnit": "unidade",
    "difficulty": "Muito Fácil",
    "image": "./images/lanches_cafes/08_tapioca_queijo_coalho_mel.jpg",
    "badge": "Clássico Brasileiro",
    "tags": [
      "Café da Manhã",
      "Tapioca",
      "Queijo Coalho",
      "Mel",
      "Sem Glúten"
    ],
    "verse": "Salmos 23:2",
    "verseText": "Preparas uma mesa perante mim na presença dos meus inimigos; o meu cálice transborda.",
    "ingredients": [
      {
        "name": "Goma de tapioca hidratada",
        "amount": 3,
        "unit": "colheres de sopa",
        "notes": "peneirada"
      },
      {
        "name": "Queijo coalho artesanal",
        "amount": 2,
        "unit": "fatias",
        "notes": "em lâminas médias"
      },
      {
        "name": "Mel puro de abelha",
        "amount": 1,
        "unit": "colher de chá",
        "notes": "para regar"
      },
      {
        "name": "Manteiga de boa qualidade",
        "amount": 1,
        "unit": "fio",
        "notes": "opcional para selar"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Selar o Queijo Coalho",
        "description": "Em uma frigideira bem quente, doure as fatias de queijo coalho dos dois lados até formar uma crostinha dourada e crocante. Reserve.",
        "timerSeconds": 120
      },
      {
        "step": 2,
        "title": "Peneirar a Tapioca",
        "description": "Peneire a goma de tapioca hidratada diretamente sobre a frigideira em fogo médio, cobrindo o fundo em formato circular uniforme.",
        "timerSeconds": 60
      },
      {
        "step": 3,
        "title": "Cozinhar o Disco",
        "description": "Deixe a goma unir por 1 a 2 minutos. Quando as bordas soltarem da frigideira, vire delicadamente com uma espátula e deixe por mais 30 segundos.",
        "timerSeconds": 90
      },
      {
        "step": 4,
        "title": "Rechear e Servir",
        "description": "Acomode as fatias de queijo coalho douradas sobre uma das metades, dobre em meia-lua, regue com o fio de mel e sirva bem quente.",
        "timerSeconds": 30
      }
    ],
    "tips": "Aqueça bem a frigideira antes de colocar a goma; o calor sela o amido instantaneamente sem deixar a tapioca borrachenta."
  },
  {
    "id": "lanche-09-pao-integral-pastinha-abacate",
    "pageNumber": 9,
    "title": "09 - Pão Caseiro Integral com Pastinha de Abacate",
    "subtitle": "Fatia rústica nutritiva combinada com guacamole cremoso e antioxidante",
    "category": "lanches-cafes",
    "prepTime": "15 min",
    "bakeTime": "50 min",
    "totalTime": "65 min",
    "servings": 8,
    "servingUnit": "fatias",
    "difficulty": "Médio",
    "image": "./images/lanches_cafes/09_pao_integral_pastinha_abacate.jpg",
    "badge": "Pão Caseiro & Toast",
    "tags": [
      "Café da Manhã",
      "Pão Caseiro",
      "Integral",
      "Abacate",
      "Fibras"
    ],
    "verse": "Salmos 23:2",
    "verseText": "Ele me faz repousar em pastos verdejantes.",
    "ingredients": [
      {
        "name": "Farinha de trigo integral",
        "amount": 2,
        "unit": "xícaras",
        "notes": "moagem fina ou média"
      },
      {
        "name": "Farinha branca (ou aveia sem glúten)",
        "amount": 2,
        "unit": "xícaras",
        "notes": "para leveza"
      },
      {
        "name": "Leite morno",
        "amount": 2,
        "unit": "xícaras",
        "notes": "integral ou vegetal"
      },
      {
        "name": "Fermento biológico seco",
        "amount": 3,
        "unit": "colheres de chá",
        "notes": "fermento de pão"
      },
      {
        "name": "Sal marinho",
        "amount": 1,
        "unit": "colher de chá",
        "notes": "para a massa"
      },
      {
        "name": "Abacate maduro",
        "amount": 1,
        "unit": "unidade",
        "notes": "polpa cremosa"
      },
      {
        "name": "Suco de limão fresco",
        "amount": 0.5,
        "unit": "unidade",
        "notes": "evita escurecer e traz frescor"
      },
      {
        "name": "Sal, pimenta e ervas frescas",
        "amount": 1,
        "unit": "a gosto",
        "notes": "coentro ou salsinha picada"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Preparar a Massa do Pão",
        "description": "Pré-aqueça o forno a 200°C. Numa tigela grande, misture as farinhas, o fermento e o sal. Adicione o leite morno aos poucos até formar massa lisa e homogênea.",
        "timerSeconds": 300
      },
      {
        "step": 2,
        "title": "Forma e Corte",
        "description": "Transfira a massa para uma forma de pão untada, faça um corte longitudinal com lâmina afiada na superfície e deixe descansar 15 minutos.",
        "timerSeconds": 900
      },
      {
        "step": 3,
        "title": "Assar o Pão",
        "description": "Leve ao forno a 200°C por cerca de 45 a 50 minutos até que a casca fique dourada e produza som oco ao bater levemente no fundo.",
        "timerSeconds": 3000
      },
      {
        "step": 4,
        "title": "Preparar a Pastinha",
        "description": "Amasse a polpa do abacate com o garfo numa tigela. Adicione o suco de limão, sal, pimenta-do-reino e as ervas frescas picadas.",
        "timerSeconds": 120
      },
      {
        "step": 5,
        "title": "Montar as Fatias",
        "description": "Corte fatias do pão já morno, toste levemente e espalhe a pastinha de abacate generosamente por cima com um fio de azeite.",
        "timerSeconds": 60
      }
    ],
    "tips": "O limão na pastinha de abacate não só traz frescor cítrico irresistível como impede a oxidação precoce da polpa."
  },
  {
    "id": "lanche-10-crepioca-ricota-tomate-seco",
    "pageNumber": 10,
    "title": "10 - Crepioca com Ricota e Tomate Seco",
    "subtitle": "Praticidade mediterrânea com toque aromático, rúcula fresca e cúrcuma",
    "category": "lanches-cafes",
    "prepTime": "5 min",
    "bakeTime": "4 min",
    "totalTime": "9 min",
    "servings": 1,
    "servingUnit": "porção",
    "difficulty": "Muito Fácil",
    "image": "./images/lanches_cafes/10_crepioca_ricota_tomate_seco.jpg",
    "badge": "Mediterrâneo",
    "tags": [
      "Café da Manhã",
      "Crepioca",
      "Ricota",
      "Tomate Seco",
      "Sem Glúten"
    ],
    "verse": "Salmos 23:2",
    "verseText": "Ele me faz repousar em pastos verdejantes.",
    "ingredients": [
      {
        "name": "Goma de tapioca hidratada",
        "amount": 3,
        "unit": "colheres de sopa",
        "notes": "peneirada"
      },
      {
        "name": "Ovo caipira fresco",
        "amount": 1,
        "unit": "unidade",
        "notes": "batido"
      },
      {
        "name": "Cúrcuma em pó",
        "amount": 1,
        "unit": "pitada",
        "notes": "cor e ação anti-inflamatória"
      },
      {
        "name": "Sal marinho",
        "amount": 1,
        "unit": "pitada",
        "notes": "para a massa"
      },
      {
        "name": "Ricota fresca amassada",
        "amount": 2,
        "unit": "colheres de sopa",
        "notes": "bem temperada"
      },
      {
        "name": "Tomates secos escorridos",
        "amount": 3,
        "unit": "pedaços",
        "notes": "picados em tiras"
      },
      {
        "name": "Folhas de rúcula fresca",
        "amount": 0.5,
        "unit": "xícara",
        "notes": "higienizadas"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Bater a Massa",
        "description": "Em uma tigela pequena, bata o ovo com a goma de tapioca, a cúrcuma e a pitada de sal até formar um líquido liso e dourado.",
        "timerSeconds": 60
      },
      {
        "step": 2,
        "title": "Cozinhar a Crepioca",
        "description": "Aqueça uma frigideira antiaderente untada em fogo médio. Despeje a massa e cozinhe por 2 minutos até firmar; vire e deixe mais 1 minuto.",
        "timerSeconds": 180
      },
      {
        "step": 3,
        "title": "Rechear",
        "description": "Distribua a ricota fresca amassada, as tiras de tomate seco e as folhas de rúcula sobre uma das metades da crepioca.",
        "timerSeconds": 60
      },
      {
        "step": 4,
        "title": "Dobrar e Servir",
        "description": "Dobre ao meio em formato de meia-lua e sirva imediatamente enquanto a massa está bem macia e aromática.",
        "timerSeconds": 30
      }
    ],
    "tips": "A cúrcuma adicionada à massa não apenas realça a cor dourada vibrante como atua como um potente anti-inflamatório matinal."
  },
  {
    "id": "lanche-11-pao-queijo-mandioquinha",
    "pageNumber": 11,
    "title": "11 - Pão de Queijo de Mandioquinha",
    "subtitle": "Crosta crocante dourada com interior elástico, queijudo e sem glúten",
    "category": "lanches-cafes",
    "prepTime": "15 min",
    "bakeTime": "30 min",
    "totalTime": "45 min",
    "servings": 20,
    "servingUnit": "unidades",
    "difficulty": "Fácil",
    "image": "./images/lanches_cafes/11_pao_queijo_mandioquinha.jpg",
    "badge": "Pão de Queijo Especial",
    "tags": [
      "Café da Manhã",
      "Pão de Queijo",
      "Mandioquinha",
      "Sem Glúten",
      "Fácil"
    ],
    "verse": "Salmos 23:2",
    "verseText": "Ele me faz repousar em pastos verdejantes e guia-me mansamente a águas tranquilas.",
    "ingredients": [
      {
        "name": "Mandioquinha (batata-baroa)",
        "amount": 300,
        "unit": "g",
        "notes": "cozida e amassada morna"
      },
      {
        "name": "Polvilho azedo",
        "amount": 0.5,
        "unit": "xícara",
        "notes": "traz expansão e aeração"
      },
      {
        "name": "Polvilho doce",
        "amount": 0.5,
        "unit": "xícara",
        "notes": "traz elasticidade"
      },
      {
        "name": "Azeite de oliva extra virgem",
        "amount": 3,
        "unit": "colheres de sopa",
        "notes": "gordura boa"
      },
      {
        "name": "Queijo minas curado ralado",
        "amount": 0.5,
        "unit": "xícara",
        "notes": "ou parmesão ralado"
      },
      {
        "name": "Sal marinho",
        "amount": 1,
        "unit": "colher de chá",
        "notes": "a gosto"
      },
      {
        "name": "Ovo caipira",
        "amount": 1,
        "unit": "unidade",
        "notes": "fresco"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Base da Massa",
        "description": "Pré-aqueça o forno a 200°C. Em uma tigela grande, misture o purê de mandioquinha ainda morno com o azeite, o ovo e o sal marinho.",
        "timerSeconds": 120
      },
      {
        "step": 2,
        "title": "Adicionar Polvilhos e Queijo",
        "description": "Incorpore o polvilho doce, o polvilho azedo e o queijo ralado. Sove com as mãos até obter uma massa lisa, brilhante e que não grude.",
        "timerSeconds": 300
      },
      {
        "step": 3,
        "title": "Modelar as Bolinhas",
        "description": "Com as mãos untadas com um pingo de azeite, molde 20 bolinhas uniformes e disponha em uma assadeira untada com espaço entre elas.",
        "timerSeconds": 300
      },
      {
        "step": 4,
        "title": "Assar até Dourar",
        "description": "Leve ao forno a 200°C por cerca de 25 a 30 minutos, até que cresçam, fiquem com a base firme e levemente dourados por fora. Sirva quentinho!",
        "timerSeconds": 1800
      }
    ],
    "tips": "A mandioquinha confere umidade natural e elasticidade única à massa, dispensando escalda pesada de óleo e leite."
  },
  {
    "id": "lanche-12-vitamina-banana-aveia-mel",
    "pageNumber": 12,
    "title": "12 - Vitamina de Banana com Aveia e Mel",
    "subtitle": "Cremosa, encorpada e revitalizante para dias que exigem foco e energia rápida",
    "category": "lanches-cafes",
    "prepTime": "5 min",
    "bakeTime": "0 min",
    "totalTime": "5 min",
    "servings": 1,
    "servingUnit": "copo alto (350ml)",
    "difficulty": "Muito Fácil",
    "image": "./images/lanches_cafes/12_vitamina_banana_aveia_mel.jpg",
    "badge": "Shake Revitalizante",
    "tags": [
      "Café da Manhã",
      "Vitamina",
      "Banana",
      "Aveia",
      "Sem Lactose Opcional"
    ],
    "verse": "Salmos 23:2",
    "verseText": "Ele me faz repousar em pastos verdejantes.",
    "ingredients": [
      {
        "name": "Banana madura congelada",
        "amount": 1,
        "unit": "unidade",
        "notes": "em rodelas"
      },
      {
        "name": "Leite integral ou vegetal",
        "amount": 1,
        "unit": "xícara",
        "notes": "leite de amêndoas ou aveia"
      },
      {
        "name": "Aveia em flocos",
        "amount": 2,
        "unit": "colheres de sopa",
        "notes": "fibras puras"
      },
      {
        "name": "Mel puro de abelha",
        "amount": 1,
        "unit": "colher de chá",
        "notes": "energia natural"
      },
      {
        "name": "Canela em pó",
        "amount": 1,
        "unit": "colher de café",
        "notes": "termogênico e perfumado"
      },
      {
        "name": "Cubos de gelo",
        "amount": 4,
        "unit": "cubos",
        "notes": "a gosto"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Adicionar ao Liquidificador",
        "description": "Coloque a banana congelada em rodelas, o leite, a aveia em flocos, o mel, os cubos de gelo e metade da canela no liquidificador.",
        "timerSeconds": 60
      },
      {
        "step": 2,
        "title": "Bater até Homogeneizar",
        "description": "Bata em velocidade alta por 1 a 2 minutos ininterruptos até triturar todo o gelo e formar um creme aveludado e espesso.",
        "timerSeconds": 90
      },
      {
        "step": 3,
        "title": "Servir em Copo Alto",
        "description": "Despeje em copo alto, polvilhe o restante da canela em pó por cima e beba imediatamente bem gelado.",
        "timerSeconds": 30
      }
    ],
    "tips": "Congelar a banana já descascada e fatiada substitui sorvetes ou espessantes industriais, garantindo textura de milkshake natural."
  },
  {
    "id": "lanche-15-chips-batata-doce",
    "pageNumber": 15,
    "title": "15 - Chips de Batata-Doce Temperada",
    "subtitle": "Crocância perfeita assada no forno com páprica defumada e cúrcuma",
    "category": "lanches-cafes",
    "prepTime": "10 min",
    "bakeTime": "25 min",
    "totalTime": "35 min",
    "servings": 2,
    "servingUnit": "porções",
    "difficulty": "Fácil",
    "image": "./images/lanches_cafes/15_chips_batata_doce.jpg",
    "badge": "Snack Crocante",
    "tags": [
      "Lanches",
      "Batata-Doce",
      "Chips",
      "Vegano",
      "Sem Glúten"
    ],
    "verse": "1 Coríntios 6:19",
    "verseText": "Ou não sabeis que o vosso corpo é templo do Espírito Santo?",
    "ingredients": [
      {
        "name": "Batata-doce grande",
        "amount": 1,
        "unit": "unidade",
        "notes": "bem higienizada com casca"
      },
      {
        "name": "Azeite de oliva extra virgem",
        "amount": 1,
        "unit": "colher de sopa",
        "notes": "para envolver"
      },
      {
        "name": "Cúrcuma em pó",
        "amount": 1,
        "unit": "colher de chá",
        "notes": "antioxidante"
      },
      {
        "name": "Páprica defumada",
        "amount": 0.5,
        "unit": "colher de chá",
        "notes": "aroma defumado irresistível"
      },
      {
        "name": "Sal marinho",
        "amount": 1,
        "unit": "a gosto",
        "notes": "moído fino"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Fatiar Ultrafino",
        "description": "Pré-aqueça o forno a 180°C. Com auxílio de um mandoline ou faca bem amolada, fatie a batata-doce em lâminas translúcidas.",
        "timerSeconds": 300
      },
      {
        "step": 2,
        "title": "Secar e Temperar",
        "description": "Seque as fatias com papel toalha para retirar a água superficial. Misture com o azeite, cúrcuma, páprica defumada e sal.",
        "timerSeconds": 120
      },
      {
        "step": 3,
        "title": "Dispor na Assadeira",
        "description": "Distribua as fatias sobre uma assadeira forrada com papel manteiga em camada única, sem sobrepor nenhuma fatia.",
        "timerSeconds": 180
      },
      {
        "step": 4,
        "title": "Assar até Estalar",
        "description": "Asse a 180°C por 20 a 25 minutos, virando as fatias na metade do tempo. Deixe esfriar completamente na assadeira para ficarem ultra crocantes.",
        "timerSeconds": 1500
      }
    ],
    "tips": "Secar bem as lâminas de batata-doce antes de assar é o segredo absoluto para que fiquem estaladiças em vez de murchas."
  },
  {
    "id": "lanche-16-snack-grao-de-bico-crocante",
    "pageNumber": 16,
    "title": "16 - Snack de Grão-de-Bico Crocante",
    "subtitle": "Petisco proteico assado com blend de especiarias orientais e azeite",
    "category": "lanches-cafes",
    "prepTime": "10 min",
    "bakeTime": "25 min",
    "totalTime": "35 min",
    "servings": 4,
    "servingUnit": "porções",
    "difficulty": "Fácil",
    "image": "./images/lanches_cafes/16_snack_grao_de_bico.jpg",
    "badge": "Snack Proteico",
    "tags": [
      "Lanches",
      "Grão-de-Bico",
      "Proteína Vegetal",
      "Crocante",
      "Sem Glúten"
    ],
    "verse": "1 Coríntios 6:19",
    "verseText": "Glorificai, pois, a Deus no vosso corpo e no vosso espírito, os quais pertencem a Deus.",
    "ingredients": [
      {
        "name": "Grão-de-bico cozido",
        "amount": 2,
        "unit": "xícaras",
        "notes": "al dente e bem escorrido"
      },
      {
        "name": "Azeite de oliva extra virgem",
        "amount": 2,
        "unit": "colheres de sopa",
        "notes": "envolve as especiarias"
      },
      {
        "name": "Cúrcuma em pó",
        "amount": 1,
        "unit": "colher de chá",
        "notes": "cor e saúde"
      },
      {
        "name": "Cominho em pó",
        "amount": 1,
        "unit": "colher de chá",
        "notes": "sabor marcante"
      },
      {
        "name": "Páprica doce ou defumada",
        "amount": 0.5,
        "unit": "colher de chá",
        "notes": "toque especial"
      },
      {
        "name": "Sal e pimenta-do-reino",
        "amount": 1,
        "unit": "a gosto",
        "notes": "ajuste ao paladar"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Secagem Profunda",
        "description": "Pré-aqueça o forno a 200°C. Espalhe os grãos cozidos sobre folhas de papel toalha e esfregue com suavidade para retirar peles soltas e toda a umidade.",
        "timerSeconds": 300
      },
      {
        "step": 2,
        "title": "Temperar os Grãos",
        "description": "Transfira os grãos bem secos para uma tigela e envolva no azeite, cúrcuma, cominho, páprica, sal e pimenta-do-reino.",
        "timerSeconds": 120
      },
      {
        "step": 3,
        "title": "Assar no Forno Quente",
        "description": "Espalhe os grãos em assadeira ampla sem amontoar. Asse a 200°C por 20 a 25 minutos, chacoalhando a assadeira a cada 10 minutos.",
        "timerSeconds": 1500
      },
      {
        "step": 4,
        "title": "Esfriar para Crocância Máxima",
        "description": "Desligue o forno e deixe os grãos esfriarem totalmente em temperatura ambiente antes de guardar em pote de vidro com fechamento hermético.",
        "timerSeconds": 600
      }
    ],
    "tips": "Quanto mais secos os grãos de bico entrarem no forno, mais crocantes e crocantes eles permanecerão por até 5 dias."
  },
  {
    "id": "lanche-17-aveioca-abacate-frango",
    "pageNumber": 17,
    "title": "17 - Aveioca com Recheio de Abacate e Frango",
    "subtitle": "Wrap de aveia funcional com recheio cremoso de peito de frango e guacamole",
    "category": "lanches-cafes",
    "prepTime": "12 min",
    "bakeTime": "4 min",
    "totalTime": "16 min",
    "servings": 1,
    "servingUnit": "porção",
    "difficulty": "Fácil",
    "image": "./images/lanches_cafes/17_aveioca_abacate_frango.jpg",
    "badge": "Almoço & Lanche",
    "tags": [
      "Lanches",
      "Aveioca",
      "Frango",
      "Abacate",
      "Hiperproteico"
    ],
    "verse": "1 Coríntios 6:19",
    "verseText": "Ou não sabeis que o vosso corpo é santuário do Espírito Santo?",
    "ingredients": [
      {
        "name": "Aveia em flocos finos",
        "amount": 0.5,
        "unit": "xícara",
        "notes": "base rica em betaglucanas"
      },
      {
        "name": "Água filtrada",
        "amount": 0.5,
        "unit": "xícara",
        "notes": "para hidratação"
      },
      {
        "name": "Sal marinho",
        "amount": 1,
        "unit": "pitada",
        "notes": "para a massa"
      },
      {
        "name": "Frango cozido e desfiado",
        "amount": 100,
        "unit": "g",
        "notes": "peito de frango temperado"
      },
      {
        "name": "Abacate maduro",
        "amount": 0.5,
        "unit": "unidade",
        "notes": "amassado com garfo"
      },
      {
        "name": "Suco de limão fresco, sal e pimenta",
        "amount": 1,
        "unit": "a gosto",
        "notes": "para o guacamole"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Hidratar a Aveia",
        "description": "Em um prato fundo ou tigela, misture a aveia com a água e o sal. Deixe repousar por 10 minutos até a aveia absorver o líquido e formar uma pasta gelatinosa.",
        "timerSeconds": 600
      },
      {
        "step": 2,
        "title": "Cozinhar a Aveioca",
        "description": "Aqueça uma frigideira antiaderente untada com um fio de azeite. Espalhe a massa em disco e cozinhe por 2 minutos até firmar; vire e asse por mais 2 minutos.",
        "timerSeconds": 240
      },
      {
        "step": 3,
        "title": "Misturar o Recheio",
        "description": "Amasse o abacate com o suco de limão, sal e pimenta. Misture o frango desfiado aquecido.",
        "timerSeconds": 120
      },
      {
        "step": 4,
        "title": "Rechear e Dobrar",
        "description": "Coloque o recheio sobre a aveioca quentinha, dobre em meia-lua ou enrole como burrito e sirva imediatamente.",
        "timerSeconds": 60
      }
    ],
    "tips": "A aveia hidratada forma um disco elástico e macio sem quebrar, sendo uma alternativa com menos carboidrato que o trigo tradicional."
  },
  {
    "id": "lanche-18-humus-caseiro-pao-sirio",
    "pageNumber": 18,
    "title": "18 - Húmus Caseiro com Pão Sírio Integral",
    "subtitle": "O clássico patê do Oriente Médio à base de gergelim, alho e azeite perfumado",
    "category": "lanches-cafes",
    "prepTime": "10 min",
    "bakeTime": "0 min",
    "totalTime": "10 min",
    "servings": 4,
    "servingUnit": "porções",
    "difficulty": "Fácil",
    "image": "./images/lanches_cafes/18_humus_caseiro_pao_sirio.jpg",
    "badge": "Patê Bíblico",
    "tags": [
      "Lanches",
      "Húmus",
      "Grão-de-Bico",
      "Tahine",
      "Vegano"
    ],
    "verse": "1 Coríntios 6:19",
    "verseText": "Porque fostes comprados por bom preço; glorificai a Deus no vosso corpo.",
    "ingredients": [
      {
        "name": "Grão-de-bico cozido",
        "amount": 2,
        "unit": "xícaras",
        "notes": "reserve ½ xícara do caldo"
      },
      {
        "name": "Tahine (pasta de gergelim)",
        "amount": 2,
        "unit": "colheres de sopa",
        "notes": "100% puro"
      },
      {
        "name": "Dentes de alho",
        "amount": 2,
        "unit": "unidades",
        "notes": "sem o miolo verde"
      },
      {
        "name": "Suco de limão fresco",
        "amount": 1,
        "unit": "unidade",
        "notes": "espremido na hora"
      },
      {
        "name": "Azeite de oliva extra virgem",
        "amount": 3,
        "unit": "colheres de sopa",
        "notes": "sabor refinado"
      },
      {
        "name": "Sal marinho",
        "amount": 1,
        "unit": "colher de chá",
        "notes": "a gosto"
      },
      {
        "name": "Páprica e grãos de bico",
        "amount": 1,
        "unit": "para decorar",
        "notes": "finalização tradicional"
      },
      {
        "name": "Pão sírio integral",
        "amount": 4,
        "unit": "unidades",
        "notes": "aquecidos na frigideira"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Bater a Base",
        "description": "No processador ou liquidificador, bata o grão-de-bico morno com o alho, tahine, suco de limão, azeite e sal.",
        "timerSeconds": 120
      },
      {
        "step": 2,
        "title": "Emulsionar com Caldo",
        "description": "Vá acrescentando o caldo do cozimento do grão-de-bico aos poucos e bata por 3 minutos até ficar sedoso, leve e aveludado.",
        "timerSeconds": 180
      },
      {
        "step": 3,
        "title": "Montar no Bowl",
        "description": "Transfira para um prato raso ou tigela, faça um sulco espiralado com as costas da colher e regue generosamente com azeite extra virgem.",
        "timerSeconds": 60
      },
      {
        "step": 4,
        "title": "Servir com Pão Sírio",
        "description": "Salpique a páprica e grãos inteiros reservados. Sirva acompanhado do pão sírio integral quentinho.",
        "timerSeconds": 60
      }
    ],
    "tips": "Bater o grão-de-bico ainda morno e adicionar água gelada ou gelo na emulsão cria a consistência leve e brilhante dos restaurantes de Beirute."
  },
  {
    "id": "lanche-19-requeijao-caseiro-ervas",
    "pageNumber": 19,
    "title": "19 - Requeijão Caseiro com Ervas",
    "subtitle": "Cremosidade pura feita do leite talhado naturalmente, manteiga e ervas finas",
    "category": "lanches-cafes",
    "prepTime": "15 min",
    "bakeTime": "0 min",
    "totalTime": "15 min",
    "servings": 1,
    "servingUnit": "pote (300g)",
    "difficulty": "Fácil",
    "image": "./images/lanches_cafes/19_requeijao_caseiro_ervas.jpg",
    "badge": "Cremoso Caseiro",
    "tags": [
      "Lanches",
      "Requeijão",
      "Sem Conservantes",
      "Ervas Finas",
      "Sem Glúten"
    ],
    "verse": "1 Coríntios 6:19",
    "verseText": "Cuidar do corpo é honrar o templo do Senhor.",
    "ingredients": [
      {
        "name": "Leite integral tipo A",
        "amount": 1,
        "unit": "litro",
        "notes": "pasteurizado fresco"
      },
      {
        "name": "Suco de limão fresco",
        "amount": 2,
        "unit": "colheres de sopa",
        "notes": "ou vinagre de maçã"
      },
      {
        "name": "Manteiga de leite",
        "amount": 25,
        "unit": "g",
        "notes": "em temperatura ambiente"
      },
      {
        "name": "Sal marinho",
        "amount": 0.5,
        "unit": "colher de chá",
        "notes": "a gosto"
      },
      {
        "name": "Ervas finas frescas picadas",
        "amount": 1,
        "unit": "colher de sopa",
        "notes": "cebolinha, salsinha, orégano"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Ferver o Leite",
        "description": "Leve o leite ao fogo até abrir fervura. Reserve ½ xícara do leite bem quente num copo e desligue o fogo.",
        "timerSeconds": 480
      },
      {
        "step": 2,
        "title": "Talhar com Limão",
        "description": "Adicione o suco de limão na panela, mexa delicadamente e aguarde 5 minutos até que a coalhada sólida se separe nitidamente do soro líquido.",
        "timerSeconds": 300
      },
      {
        "step": 3,
        "title": "Coar a Coalhada",
        "description": "Despeje em um escorredor forrado com pano de algodão fino (voil), deixando o soro escorrer sem apertar com força.",
        "timerSeconds": 180
      },
      {
        "step": 4,
        "title": "Bater até Ficar Sedoso",
        "description": "Bata a massa de queijo no liquidificador com a manteiga, o sal e o leite quente reservado aos poucos até formar um creme liso e brilhante.",
        "timerSeconds": 180
      },
      {
        "step": 5,
        "title": "Adicionar Ervas e Resfriar",
        "description": "Misture as ervas finas com uma espátula, coloque em pote de vidro com tampa e refrigere por 2 horas até adquirir consistência firme.",
        "timerSeconds": 120
      }
    ],
    "tips": "Ao refrigerar, o requeijão adquire a consistência exata do produto de copo tradicional, mas 100% puro, sem gomas ou amido de milho."
  },
  {
    "id": "lanche-20-mix-castanhas-frutas-secas",
    "pageNumber": 20,
    "title": "20 - Mix de Castanhas com Frutas Secas",
    "subtitle": "Fonte nobre de selênio, gorduras monoinsaturadas, energia limpa e crocância",
    "category": "lanches-cafes",
    "prepTime": "5 min",
    "bakeTime": "3 min",
    "totalTime": "8 min",
    "servings": 4,
    "servingUnit": "porções",
    "difficulty": "Muito Fácil",
    "image": "./images/lanches_cafes/20_mix_castanhas_frutas_secas.jpg",
    "badge": "Crocante & Prático",
    "tags": [
      "Lanches",
      "Oleaginosas",
      "Castanhas",
      "Sem Glúten",
      "Prático"
    ],
    "verse": "1 Coríntios 6:19",
    "verseText": "Glorificai a Deus com o vosso corpo.",
    "ingredients": [
      {
        "name": "Castanhas-do-brasil picadas",
        "amount": 0.5,
        "unit": "xícara",
        "notes": "riquíssima em selênio"
      },
      {
        "name": "Castanhas de caju torradas",
        "amount": 0.5,
        "unit": "xícara",
        "notes": "crocantes"
      },
      {
        "name": "Amêndoas cruas",
        "amount": 0.25,
        "unit": "xícara",
        "notes": "vitamina E pura"
      },
      {
        "name": "Nozes em metades",
        "amount": 0.25,
        "unit": "xícara",
        "notes": "ômega-3 vegetal"
      },
      {
        "name": "Uvas-passas pretas",
        "amount": 0.25,
        "unit": "xícara",
        "notes": "sem sementes"
      },
      {
        "name": "Damasco seco picadinho",
        "amount": 0.25,
        "unit": "xícara",
        "notes": "fibras e betacaroteno"
      },
      {
        "name": "Mel puro de abelha",
        "amount": 1,
        "unit": "colher de chá",
        "notes": "para envolver"
      },
      {
        "name": "Canela em pó e sal marinho",
        "amount": 1,
        "unit": "pitada",
        "notes": "equilíbrio aromático"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Tostar as Castanhas",
        "description": "Em uma frigideira seca em fogo baixo, toste as castanhas, amêndoas e nozes por 3 minutos para liberar seus óleos aromáticos. Deixe esfriar.",
        "timerSeconds": 180
      },
      {
        "step": 2,
        "title": "Juntar as Frutas Secas",
        "description": "Em uma tigela, misture as oleaginosas já frias com as passas pretas e os cubos de damasco seco.",
        "timerSeconds": 60
      },
      {
        "step": 3,
        "title": "Temperar com Canela e Mel",
        "description": "Adicione a canela em pó, a pitada de sal marinho e o mel, misturando suavemente com as mãos ou colher.",
        "timerSeconds": 60
      },
      {
        "step": 4,
        "title": "Armazenar",
        "description": "Guarde em potes herméticos de vidro para ter à mão durante toda a semana.",
        "timerSeconds": 30
      }
    ],
    "tips": "Apenas duas castanhas-do-brasil por dia fornecem toda a dose diária recomendada de selênio para a tireoide e imunidade."
  },
  {
    "id": "lanche-21-bolinha-queijo-ervas",
    "pageNumber": 21,
    "title": "21 - Bolinha de Queijo e Ervas",
    "subtitle": "Petisco assado de ricota, queijo minas e farinha de aveia, dourado e leve",
    "category": "lanches-cafes",
    "prepTime": "10 min",
    "bakeTime": "20 min",
    "totalTime": "30 min",
    "servings": 15,
    "servingUnit": "bolinhas",
    "difficulty": "Fácil",
    "image": "./images/lanches_cafes/21_bolinha_queijo_ervas.jpg",
    "badge": "Assado & Saudável",
    "tags": [
      "Lanches",
      "Bolinhas de Queijo",
      "Ricota",
      "Sem Fritura",
      "Proteico"
    ],
    "verse": "1 Coríntios 6:19",
    "verseText": "Honrai a Deus em tudo o que fazeis.",
    "ingredients": [
      {
        "name": "Ricota fresca amassada",
        "amount": 200,
        "unit": "g",
        "notes": "esfarelada com o garfo"
      },
      {
        "name": "Queijo minas curado ralado",
        "amount": 100,
        "unit": "g",
        "notes": "sabor acentuado"
      },
      {
        "name": "Ovo caipira",
        "amount": 1,
        "unit": "unidade",
        "notes": "liga a massa"
      },
      {
        "name": "Farinha de aveia",
        "amount": 2,
        "unit": "colheres de sopa",
        "notes": "substitui farinha branca"
      },
      {
        "name": "Sal marinho e pimenta-do-reino",
        "amount": 1,
        "unit": "a gosto",
        "notes": "temperos nobres"
      },
      {
        "name": "Ervas frescas picadas",
        "amount": 2,
        "unit": "colheres de sopa",
        "notes": "salsinha, cebolinha, manjericão"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Pré-aquecer Forno",
        "description": "Pré-aqueça o forno a 180°C e unte levemente uma assadeira com azeite ou papel manteiga.",
        "timerSeconds": 120
      },
      {
        "step": 2,
        "title": "Preparar a Massa",
        "description": "Em uma tigela grande, misture a ricota amassada, o queijo minas ralado, o ovo e a farinha de aveia. Tempere com o sal, a pimenta e as ervas frescas até formar uma massa modelável.",
        "timerSeconds": 180
      },
      {
        "step": 3,
        "title": "Moldar as Bolinhas",
        "description": "Unte as mãos com um pingo de azeite e faça 15 bolinhas redondinhas do tamanho de nozes.",
        "timerSeconds": 240
      },
      {
        "step": 4,
        "title": "Assar até Dourar",
        "description": "Asse a 180°C por 20 minutos até que fiquem firmes e com a superfície levemente dourada. Sirva quentinhas.",
        "timerSeconds": 1200
      }
    ],
    "tips": "Substituir a farinha de trigo por farinha de aveia e assar em vez de fritar reduz 70% das calorias sem perder a textura queijuda."
  },
  {
    "id": "lanche-22-wrap-tapioca-atum-legumes",
    "pageNumber": 22,
    "title": "22 - Wrap de Tapioca com Atum e Legumes",
    "subtitle": "Lanche completo e portátil com ômega-3, alface crocante, tomate e pepino",
    "category": "lanches-cafes",
    "prepTime": "8 min",
    "bakeTime": "3 min",
    "totalTime": "11 min",
    "servings": 1,
    "servingUnit": "wrap",
    "difficulty": "Muito Fácil",
    "image": "./images/lanches_cafes/22_wrap_tapioca_atum_legumes.jpg",
    "badge": "Lanche Portátil",
    "tags": [
      "Lanches",
      "Tapioca",
      "Atum",
      "Ômega 3",
      "Sem Glúten"
    ],
    "verse": "1 Coríntios 6:19",
    "verseText": "Portanto, quer comais, quer bebais ou façais qualquer outra coisa, fazei tudo para a glória de Deus.",
    "ingredients": [
      {
        "name": "Goma de tapioca hidratada",
        "amount": 3,
        "unit": "colheres de sopa",
        "notes": "peneirada"
      },
      {
        "name": "Atum sólido em água",
        "amount": 1,
        "unit": "lata",
        "notes": "bem escorrido"
      },
      {
        "name": "Tomate picadinho",
        "amount": 0.5,
        "unit": "unidade",
        "notes": "sem sementes"
      },
      {
        "name": "Pepino picadinho",
        "amount": 0.25,
        "unit": "unidade",
        "notes": "em cubos bem finos"
      },
      {
        "name": "Folhas de alface ou rúcula",
        "amount": 3,
        "unit": "folhas",
        "notes": "frescas e crocantes"
      },
      {
        "name": "Suco de limão, azeite e sal",
        "amount": 1,
        "unit": "a gosto",
        "notes": "emulsão temperada"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Fazer o Disco de Tapioca",
        "description": "Aqueça uma frigideira grande em fogo médio, espalhe a goma de tapioca em disco fino e deixe firmar por 1 minuto de cada lado sem ressecar.",
        "timerSeconds": 120
      },
      {
        "step": 2,
        "title": "Temperar o Atum",
        "description": "Em uma tigela, desfie o atum escorrido com um garfo e misture o tomate picado, o pepino, o suco de limão, o azeite e o sal.",
        "timerSeconds": 120
      },
      {
        "step": 3,
        "title": "Montar as Camadas",
        "description": "Sobre o disco de tapioca morno, coloque as folhas de alface e distribua o atum temperado no centro.",
        "timerSeconds": 60
      },
      {
        "step": 4,
        "title": "Enrolar e Servir",
        "description": "Enrole a tapioca firmemente como um wrap, corte ao meio na diagonal e sirva em seguida ou embale para viagem.",
        "timerSeconds": 60
      }
    ],
    "tips": "Não deixe a tapioca ressecar demais na frigideira; retirar logo que firmar permite enrolar sem que a massa rache."
  },
  {
    "id": "lanche-23-pao-inhame-gergelim",
    "pageNumber": 23,
    "title": "23 - Pão de Inhame com Gergelim",
    "subtitle": "Pãezinhos macios e nutritivos com alto valor imunológico e sementes douradas",
    "category": "lanches-cafes",
    "prepTime": "15 min",
    "bakeTime": "30 min",
    "totalTime": "45 min",
    "servings": 25,
    "servingUnit": "unidades",
    "difficulty": "Fácil",
    "image": "./images/lanches_cafes/23_pao_inhame_gergelim.jpg",
    "badge": "Imunidade & Fé",
    "tags": [
      "Lanches",
      "Inhame",
      "Gergelim",
      "Sem Glúten",
      "Pãozinho"
    ],
    "verse": "Salmos 107:9",
    "verseText": "Pois ele sacia a alma sedenta e farta de bens a alma faminta.",
    "ingredients": [
      {
        "name": "Inhames cozidos",
        "amount": 3,
        "unit": "unidades médias",
        "notes": "amassados ainda quentes"
      },
      {
        "name": "Polvilho azedo",
        "amount": 0.5,
        "unit": "xícara",
        "notes": "expansão"
      },
      {
        "name": "Polvilho doce",
        "amount": 0.5,
        "unit": "xícara",
        "notes": "maciez"
      },
      {
        "name": "Azeite de oliva extra virgem",
        "amount": 3,
        "unit": "colheres de sopa",
        "notes": "textura sedosa"
      },
      {
        "name": "Queijo minas padrão ralado",
        "amount": 0.5,
        "unit": "xícara",
        "notes": "sabor caseiro"
      },
      {
        "name": "Sal marinho",
        "amount": 1,
        "unit": "colher de chá",
        "notes": "a gosto"
      },
      {
        "name": "Sementes de gergelim",
        "amount": 3,
        "unit": "colheres de sopa",
        "notes": "para decorar e empanar"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Purê de Inhame",
        "description": "Pré-aqueça o forno a 200°C. Amasse bem os inhames cozidos enquanto ainda estiverem mornos até formar um purê macio.",
        "timerSeconds": 180
      },
      {
        "step": 2,
        "title": "Sovar com Polvilhos",
        "description": "Acrescente o azeite, o queijo ralado, o sal e os polvilhos doce e azedo. Sove com as mãos até obter uma massa lisa e homogênea.",
        "timerSeconds": 300
      },
      {
        "step": 3,
        "title": "Empanar no Gergelim",
        "description": "Molde cerca de 25 bolinhas e passe cada uma num pratinho com as sementes de gergelim para cobrir a superfície.",
        "timerSeconds": 300
      },
      {
        "step": 4,
        "title": "Assar até Dourar",
        "description": "Distribua na assadeira e asse a 200°C por 30 minutos até dourarem e formarem uma casquinha crocante.",
        "timerSeconds": 1800
      }
    ],
    "tips": "O inhame é um depurativo sanguíneo natural excepcional e, combinado com o gergelim, fornece cálcio e minerais vitais."
  },
  {
    "id": "lanche-24-salada-frutas-hortela-limao",
    "pageNumber": 24,
    "title": "24 - Salada de Frutas com Hortelã e Limão",
    "subtitle": "Frescor revigorante em cubos coloridos com calda cítrica perfumada",
    "category": "lanches-cafes",
    "prepTime": "10 min",
    "bakeTime": "0 min",
    "totalTime": "10 min",
    "servings": 4,
    "servingUnit": "taças",
    "difficulty": "Muito Fácil",
    "image": "./images/lanches_cafes/24_salada_frutas_hortela_limao.jpg",
    "badge": "Refrescância Pura",
    "tags": [
      "Lanches",
      "Frutas",
      "Hortelã",
      "Vitamina C",
      "Sem Açúcar"
    ],
    "verse": "Gênesis 1:29",
    "verseText": "E disse Deus: Eis que vos tenho dado toda a árvore frutífera para vos servir de mantimento.",
    "ingredients": [
      {
        "name": "Manga madura em cubos",
        "amount": 1,
        "unit": "unidade",
        "notes": "firme e doce"
      },
      {
        "name": "Morangos frescos cortados",
        "amount": 1,
        "unit": "xícara",
        "notes": "em quatro partes"
      },
      {
        "name": "Melão em cubos",
        "amount": 1,
        "unit": "xícara",
        "notes": "fresco"
      },
      {
        "name": "Banana fatiada",
        "amount": 1,
        "unit": "unidade",
        "notes": "em rodelas"
      },
      {
        "name": "Uvas sem sementes",
        "amount": 1,
        "unit": "xícara",
        "notes": "cortadas ao meio"
      },
      {
        "name": "Suco de limão fresco",
        "amount": 1,
        "unit": "unidade",
        "notes": "impede escurecimento"
      },
      {
        "name": "Mel puro de abelha",
        "amount": 2,
        "unit": "colheres de sopa",
        "notes": "adoçante natural"
      },
      {
        "name": "Folhas de hortelã fresca picadas",
        "amount": 2,
        "unit": "colheres de sopa",
        "notes": "toque refrescante"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Picar as Frutas",
        "description": "Corte manga, morangos, melão, banana e uvas em cubinhos uniformes e deposite numa tigela funda.",
        "timerSeconds": 420
      },
      {
        "step": 2,
        "title": "Calda Cítrica de Mel",
        "description": "Em um potinho, emulsione o suco de limão com o mel puro até dissolver completamente.",
        "timerSeconds": 60
      },
      {
        "step": 3,
        "title": "Envolver Delicadamente",
        "description": "Despeje a calda sobre as frutas picadas e mexa com delicadeza usando uma colher de silicone.",
        "timerSeconds": 60
      },
      {
        "step": 4,
        "title": "Finalizar e Gelar",
        "description": "Salpique as folhas de hortelã fresca e leve à geladeira por 15 minutos antes de servir em taças transparentes.",
        "timerSeconds": 60
      }
    ],
    "tips": "A acidez do suco de limão conserva as frutas como a maçã e a banana sem escurecer, além de equilibrar o dulçor natural."
  },
  {
    "id": "lanche-25-bolinho-banana-aveia",
    "pageNumber": 25,
    "title": "25 - Bolinho de Banana com Aveia (Sem Farinha)",
    "subtitle": "Muffins funcionais adoçados naturalmente com banana e uvas-passas",
    "category": "lanches-cafes",
    "prepTime": "10 min",
    "bakeTime": "20 min",
    "totalTime": "30 min",
    "servings": 8,
    "servingUnit": "bolinhos",
    "difficulty": "Fácil",
    "image": "./images/lanches_cafes/25_bolinho_banana_aveia.jpg",
    "badge": "Zero Farinha Branca",
    "tags": [
      "Lanches",
      "Banana",
      "Aveia",
      "Sem Farinha",
      "Sem Açúcar"
    ],
    "verse": "1 Coríntios 10:31",
    "verseText": "Portanto, quer comais, quer bebais ou façais qualquer outra coisa, fazei tudo para a glória de Deus.",
    "ingredients": [
      {
        "name": "Bananas nanicas maduras",
        "amount": 2,
        "unit": "unidades",
        "notes": "bem maduras"
      },
      {
        "name": "Aveia em flocos finos",
        "amount": 1,
        "unit": "xícara",
        "notes": "rica em fibras"
      },
      {
        "name": "Ovo caipira",
        "amount": 1,
        "unit": "unidade",
        "notes": "fresco"
      },
      {
        "name": "Canela em pó",
        "amount": 1,
        "unit": "colher de chá",
        "notes": "perfume acolhedor"
      },
      {
        "name": "Mel puro de abelha",
        "amount": 1,
        "unit": "colher de sopa",
        "notes": "opcional"
      },
      {
        "name": "Uvas-passas pretas",
        "amount": 1,
        "unit": "colher de sopa",
        "notes": "pedaços doces"
      },
      {
        "name": "Sal marinho",
        "amount": 1,
        "unit": "pitada",
        "notes": "realce"
      },
      {
        "name": "Fermento em pó para bolo",
        "amount": 1,
        "unit": "colher de café",
        "notes": "para crescer"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Purê de Banana",
        "description": "Pré-aqueça o forno a 180°C. Amasse as bananas com o garfo até formar um purê macio.",
        "timerSeconds": 120
      },
      {
        "step": 2,
        "title": "Formar a Massa",
        "description": "Adicione o ovo batido, a aveia, a canela, o mel, as uvas-passas, o sal e por último o fermento, misturando bem.",
        "timerSeconds": 120
      },
      {
        "step": 3,
        "title": "Enformar",
        "description": "Distribua a massa em forminhas de muffin untadas ou de silicone preenchendo ¾ da capacidade.",
        "timerSeconds": 120
      },
      {
        "step": 4,
        "title": "Assar",
        "description": "Asse a 180°C por cerca de 20 minutos até dourarem e passarem no teste do palito. Espere esfriar antes de desenformar.",
        "timerSeconds": 1200
      }
    ],
    "tips": "Quanto mais madura a banana (com casca cheia de pintinhas pretas), mais doce e aromático ficará o bolinho sem precisar de açúcar."
  },
  {
    "id": "lanche-26-iogurte-grego-granola-castanhas",
    "pageNumber": 26,
    "title": "26 - Iogurte Grego com Granola de Castanhas",
    "subtitle": "Cremosidade densa e aveludada com granola caseira de nozes, aveia e mel",
    "category": "lanches-cafes",
    "prepTime": "8 min",
    "bakeTime": "15 min",
    "totalTime": "23 min",
    "servings": 2,
    "servingUnit": "porções",
    "difficulty": "Fácil",
    "image": "./images/lanches_cafes/26_iogurte_grego_granola_castanhas.jpg",
    "badge": "Alta Proteína",
    "tags": [
      "Lanches",
      "Iogurte Grego",
      "Castanhas",
      "Probiótico",
      "Granola"
    ],
    "verse": "1 Coríntios 10:31",
    "verseText": "Alimentando o templo do Espírito com beleza, sabor e discernimento.",
    "ingredients": [
      {
        "name": "Iogurte grego natural",
        "amount": 1,
        "unit": "pote (200g)",
        "notes": "sem açúcar e denso"
      },
      {
        "name": "Mix de castanhas picadas",
        "amount": 0.5,
        "unit": "xícara",
        "notes": "caju, pará e amêndoas"
      },
      {
        "name": "Aveia em flocos grossos",
        "amount": 0.25,
        "unit": "xícara",
        "notes": "crocância"
      },
      {
        "name": "Mel puro de abelha",
        "amount": 2,
        "unit": "colheres de sopa",
        "notes": "para caramelizar"
      },
      {
        "name": "Manteiga derretida",
        "amount": 1,
        "unit": "colher de sopa",
        "notes": "traz sabor e brilho"
      },
      {
        "name": "Canela em pó",
        "amount": 1,
        "unit": "pitada",
        "notes": "aroma"
      },
      {
        "name": "Frutas frescas a gosto",
        "amount": 0.5,
        "unit": "xícara",
        "notes": "morangos ou mirtilos"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Misturar a Granola",
        "description": "Pré-aqueça o forno a 160°C. Misture as castanhas picadas com a aveia, a manteiga derretida, o mel e a canela.",
        "timerSeconds": 180
      },
      {
        "step": 2,
        "title": "Assar a Granola",
        "description": "Espalhe em assadeira pequena e asse a 160°C por 15 minutos mexendo na metade do tempo. Deixe esfriar completamente para ficar crocante.",
        "timerSeconds": 900
      },
      {
        "step": 3,
        "title": "Servir o Iogurte",
        "description": "Divida o iogurte grego gelado em dois bowls ou taças elegantes.",
        "timerSeconds": 60
      },
      {
        "step": 4,
        "title": "Montar e Finalizar",
        "description": "Cubra o iogurte com porções fartas da granola de castanhas e frutas frescas fatiadas, regando com um fio de mel.",
        "timerSeconds": 60
      }
    ],
    "tips": "A granola caseira pode ser guardada em frasco de vidro bem fechado por até 15 dias, mantendo a textura ultraestaladiça."
  },
  {
    "id": "lanche-27-tapioca-banana-canela",
    "pageNumber": 27,
    "title": "27 - Tapioca de Banana com Canela",
    "subtitle": "O sabor clássico da infância brasileira com banana fatiada macia e canela em pó",
    "category": "lanches-cafes",
    "prepTime": "3 min",
    "bakeTime": "4 min",
    "totalTime": "7 min",
    "servings": 1,
    "servingUnit": "unidade",
    "difficulty": "Muito Fácil",
    "image": "./images/lanches_cafes/27_tapioca_banana_canela.jpg",
    "badge": "Doce do Bem",
    "tags": [
      "Lanches",
      "Tapioca",
      "Banana",
      "Canela",
      "Sem Glúten"
    ],
    "verse": "1 Coríntios 10:31",
    "verseText": "Fazei tudo para a glória de Deus.",
    "ingredients": [
      {
        "name": "Goma de tapioca hidratada",
        "amount": 3,
        "unit": "colheres de sopa",
        "notes": "peneirada"
      },
      {
        "name": "Banana madura em rodelas",
        "amount": 1,
        "unit": "unidade",
        "notes": "nanica ou prata"
      },
      {
        "name": "Canela em pó",
        "amount": 1,
        "unit": "colher de chá",
        "notes": "perfume acolhedor"
      },
      {
        "name": "Mel puro de abelha",
        "amount": 1,
        "unit": "colher de chá",
        "notes": "para regar"
      },
      {
        "name": "Manteiga para untar",
        "amount": 1,
        "unit": "pingo",
        "notes": "opcional para dourar"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Preparar o Disco",
        "description": "Aqueça a frigideira antiaderente em fogo médio e espalhe a tapioca peneirada. Quando as bordas soltarem (1 min e meio), vire e cozinhe por mais 30 segundos.",
        "timerSeconds": 120
      },
      {
        "step": 2,
        "title": "Dispor a Banana",
        "description": "Acomode as fatias de banana sobre a metade do disco ainda no calor da frigideira.",
        "timerSeconds": 60
      },
      {
        "step": 3,
        "title": "Temperar com Canela e Mel",
        "description": "Polvilhe a canela em pó e regue com um fio de mel puro sobre a banana.",
        "timerSeconds": 30
      },
      {
        "step": 4,
        "title": "Dobrar e Servir",
        "description": "Dobre a tapioca ao meio em formato de meia-lua e sirva imediatamente enquanto está quentinha e macia.",
        "timerSeconds": 30
      }
    ],
    "tips": "Se preferir a banana ainda mais caramelizada, doure as rodelas na frigideira com uma ponta de manteiga antes de rechear."
  },
  {
    "id": "lanche-28-crepioca-frango-legumes",
    "pageNumber": 28,
    "title": "28 - Crepioca de Frango Desfiado com Legumes",
    "subtitle": "Massa leve de ovo e tapioca recheada com peito de frango refogado e cenoura",
    "category": "lanches-cafes",
    "prepTime": "10 min",
    "bakeTime": "5 min",
    "totalTime": "15 min",
    "servings": 1,
    "servingUnit": "porção",
    "difficulty": "Fácil",
    "image": "./images/lanches_cafes/28_crepioca_frango_legumes.jpg",
    "badge": "Proteico & Completo",
    "tags": [
      "Lanches",
      "Crepioca",
      "Frango",
      "Legumes",
      "Sem Glúten"
    ],
    "verse": "1 Coríntios 10:31",
    "verseText": "Fazei tudo com coração agradecido e consagrado.",
    "ingredients": [
      {
        "name": "Goma de tapioca hidratada",
        "amount": 3,
        "unit": "colheres de sopa",
        "notes": "peneirada"
      },
      {
        "name": "Ovo caipira fresco",
        "amount": 1,
        "unit": "unidade",
        "notes": "fresco"
      },
      {
        "name": "Frango cozido e desfiado",
        "amount": 100,
        "unit": "g",
        "notes": "temperado"
      },
      {
        "name": "Cenoura ralada fininha",
        "amount": 0.5,
        "unit": "unidade",
        "notes": "traz doçura e umidade"
      },
      {
        "name": "Cebola picada e alho triturado",
        "amount": 1,
        "unit": "colher de sopa",
        "notes": "para refogar"
      },
      {
        "name": "Azeite, cúrcuma e sal",
        "amount": 1,
        "unit": "a gosto",
        "notes": "temperos nobres"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Refogar o Frango com Cenoura",
        "description": "Em uma panelinha, doure a cebola e o alho no azeite. Adicione o frango desfiado, a cenoura ralada, sal e cúrcuma, cozinhando por 5 minutos.",
        "timerSeconds": 300
      },
      {
        "step": 2,
        "title": "Bater a Massa da Crepioca",
        "description": "Em um bowl, bata o ovo com a goma de tapioca, uma pitada de sal e cúrcuma até ficar uniforme.",
        "timerSeconds": 60
      },
      {
        "step": 3,
        "title": "Dourar o Disco",
        "description": "Despeje a massa em frigideira quente untada e cozinhe até firmar; vire e doure o outro lado por 1 minuto.",
        "timerSeconds": 180
      },
      {
        "step": 4,
        "title": "Rechear e Servir",
        "description": "Espalhe o refogado de frango com legumes na crepioca, dobre em meia-lua e sirva bem quente.",
        "timerSeconds": 60
      }
    ],
    "tips": "A cenoura ralada adiciona doçura e umidade ao frango desfiado, evitando que o recheio fique seco."
  },
  {
    "id": "lanche-29-panqueca-milho-requeijao",
    "pageNumber": 29,
    "title": "29 - Panqueca de Milho com Requeijão",
    "subtitle": "Massa aromática de milho e erva-doce recheada com requeijão cremoso caseiro",
    "category": "lanches-cafes",
    "prepTime": "8 min",
    "bakeTime": "8 min",
    "totalTime": "16 min",
    "servings": 4,
    "servingUnit": "panquecas",
    "difficulty": "Fácil",
    "image": "./images/lanches_cafes/29_panqueca_milho_requeijao.jpg",
    "badge": "Puro Aconchego",
    "tags": [
      "Lanches",
      "Milho",
      "Erva-Doce",
      "Requeijão",
      "Sem Glúten"
    ],
    "verse": "Lamentações 3:22-23",
    "verseText": "As misericórdias do Senhor não têm fim; renovam-se cada manhã. Grande é a tua fidelidade.",
    "ingredients": [
      {
        "name": "Farinha de milho flocada (flocão)",
        "amount": 1,
        "unit": "xícara",
        "notes": "flocão de milho"
      },
      {
        "name": "Aveia em flocos finos",
        "amount": 0.5,
        "unit": "xícara",
        "notes": "dá maciez e liga"
      },
      {
        "name": "Água filtrada",
        "amount": 1,
        "unit": "xícara",
        "notes": "aproximadamente para consistência de mingau"
      },
      {
        "name": "Sal marinho",
        "amount": 1,
        "unit": "pitada",
        "notes": "para a massa"
      },
      {
        "name": "Sementes de erva-doce",
        "amount": 1,
        "unit": "colher de café",
        "notes": "digestivo e perfumado"
      },
      {
        "name": "Requeijão caseiro cremoso",
        "amount": 4,
        "unit": "colheres de sopa",
        "notes": "para rechear"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Massa de Milho Aromática",
        "description": "Em uma tigela, misture a farinha de milho, a aveia, o sal e as sementes de erva-doce. Adicione a água aos poucos até a textura de um mingau espesso. Deixe descansar 5 minutos.",
        "timerSeconds": 300
      },
      {
        "step": 2,
        "title": "Cozinhar na Frigideira",
        "description": "Aqueça uma frigideira antiaderente em fogo médio-baixo. Despeje pequenas conchas de massa em formato circular.",
        "timerSeconds": 60
      },
      {
        "step": 3,
        "title": "Virar e Dourar",
        "description": "Cozinhe até firmar e soltar da frigideira. Vire delicadamente com espátula e cozinhe o outro lado por mais 2 minutos.",
        "timerSeconds": 240
      },
      {
        "step": 4,
        "title": "Rechear com Requeijão",
        "description": "Coloque uma colherada de requeijão caseiro cremoso sobre cada panqueca quente, dobre ao meio e sirva imediatamente.",
        "timerSeconds": 60
      }
    ],
    "tips": "A semente de erva-doce combinada com o milho perfuma toda a cozinha e proporciona alívio digestivo imediato."
  }
];
