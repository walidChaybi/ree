// A tester Alex 5/02/25
/* v8 ignore start */
const Texte = {
  /** Suppression des accents pour comparaison de chaines stricte */
  normalise: (texte: string): string =>
    texte
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim(),

  premiereLettreMajuscule: (texte: string): string => texte && `${texte.charAt(0).toLocaleUpperCase()}${texte.slice(1)}`,

  nomPropre: (texte: string) =>
    texte
      ? texte
          .split(" ")
          .map(partieTexte => Texte.premiereLettreMajuscule(partieTexte))
          .join(" ")
          .split("-")
          .map(partieTexte => Texte.premiereLettreMajuscule(partieTexte))
          .join("-")
      : ""
} as const;

export default Texte;
/* v8 ignore end */
