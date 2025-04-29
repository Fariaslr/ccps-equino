export const checkList = [
    {
      title: "🏗️ Capítulo II – Exigências Físicas",
      sections: [
        {
          title: "1. Condições Gerais",
          items: [
            { title: "Cerca perimetral ou barreira", done: true, route: "/exigencias/gerais/cerca" },
            { title: "Localização livre de alagamentos", done: false, route: "/exigencias/gerais/localizacao" },
          ],
        },
        {
          title: "2. Instalações Obrigatórias",
          items: [
            { title: "Sala de Manipulação de Sêmen", done: false, route: "/exigencias/laboratorio/semen" },
            { title: "Sala de Lavagem e Esterilização", done: false, route: "/exigencias/laboratorio/lavagem" },
            { title: "Área de coleta de sêmen", done: false, route: "/exigencias/coleta/area" },
            { title: "Alojamento dos doadores", done: false, route: "/exigencias/alojamento" },
            { title: "Instalação administrativa", done: false, route: "/exigencias/administrativo" },
            { title: "Vestiários e Banheiros", done: false, route: "/exigencias/vestiario" },
            { title: "Armazenamento de sêmen", done: false, route: "/exigencias/armazenamento" },
          ],
        },
      ],
    },
  ];