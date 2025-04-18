// A tester Alex 5/02/25
/* v8 ignore start */

const Texte = {
  /** Suppression des accents pour comparaison de chaines stricte */
  normalise: (texte: string): string =>
    texte
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
} as const;

export default Texte;
/* v8 ignore end */
