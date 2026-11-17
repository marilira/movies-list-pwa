const LIST = [
  {
    data: [
      {
        id: "1",
        title: "Oppenheimer",
        description:
          "Um filme tão bonito que me deu fome enquanto eu assistia e fazia esse layout para o projeto...",
        cover: "require(/path/to/image)",
        thumbnail: "require(/path/to/image)",
        genre: ["comédia;", "romance;", "terror;"],
      },
      {
        id: "2",
        title: "Soul",
        description:
          "Os ingredientes desse hambúrguer mudam toda semana, então você sempre terá uma surpresa...",
        cover: "require(/path/to/image)",
        thumbnail: "require(/path/to/image)",
        genre: ["Pão brioche;"],
      },
      {
        id: "3",
        title: "RED - Crescer é uma fera",
        description:
          "Aquele hambúrguer que não podemos tirar do cardápio devido aos clientes mais antigos da hamburgueria...",
        cover: "require(/path/to/image)",
        thumbnail: "require(/path/to/image)",
        genre: [
          "Pão brioche;",
          "2x carnes smash (blend da casa) de 80g;",
        ],
      },
    ],
  },
];

const MOVIES = LIST.map((item) => item.data).flat();

const CATEGORIES = ["Salvos", "Assistidos"];

type MovieProps = (typeof MOVIES)[0];

export { LIST, MOVIES, CATEGORIES, type MovieProps };