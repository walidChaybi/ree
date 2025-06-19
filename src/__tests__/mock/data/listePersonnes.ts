const listePersonneAlpha = [
  {
    idPersonne: "e7114c54-d00d-48ad-bbee-af2b01e2da7a",
    nom: "PHILIPS",
    autresNoms: null,
    prenoms: "Yann",
    dateNaissance: "13/04/1980",
    lieuNaissance: "Barcelone (Espagne)",
    sexe: "MASCULIN"
  }
];

const listePersonneBeta = [
  {
    idPersonne: "e7114c54-d00d-48ad-bbee-af2b01e2da7c",
    nom: "Coscas",
    autresNoms: null,
    prenoms: "Mathilde, Murielle",
    dateNaissance: "01/01/1990",
    lieuNaissance: "Dunkerque (France)",
    sexe: "FEMININ"
  }
];

export const listeDeuxPersonnes = [...listePersonneAlpha, ...listePersonneBeta];
