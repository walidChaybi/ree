export const getTitulairesActeAPI = {
  errors: [],
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-etatcivil-api/v1/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134f/titulaire",
  data: [
    {
      nom: "PAPADOPOULOS",
      prenoms: ["Ronna"],
      autresNoms: null,
      autresPrenoms: null,
      ordre: 796,
      sexe: "FEMININ",
      naissance: {
        minute: null,
        heure: null,
        jour: 10,
        mois: 7,
        annee: 1965,
        voie: null,
        ville: "Skopje",
        arrondissement: null,
        region: "Skopje",
        pays: "République de Macédoine",
        lieuReprise: null
      },
      profession: "VENDEUR",
      age: null,
      domicile: {
        voie: "7 Rue du Noyer",
        ville: "Bruxelles",
        arrondissement: null,
        region: "Flandre",
        pays: "BELGIQUE"
      },
      filiations: [
        {
          lienParente: "PARENT",
          ordre: 752,
          nom: "De La Vega",
          sexe: "FEMININ",
          naissance: null,
          profession: "CHIMISTE",
          age: null,
          domicile: {
            voie: "50 route d'amboli",
            ville: "Djibouti",
            arrondissement: null,
            region: null,
            pays: "DJIBOUTI"
          },
          prenoms: ["Madeleine"]
        },
        {
          lienParente: "PARENT",
          ordre: 752,
          nom: "De La Vega",
          sexe: "MASCULIN",
          naissance: null,
          profession: "Scrum Master",
          age: null,
          domicile: {
            voie: "La belle Hacienda",
            ville: "Mexico",
            arrondissement: null,
            region: null,
            pays: "Mexique"
          },
          prenoms: ["Diego"]
        }
      ],
      typeDeclarationConjointe: null,
      dateDeclarationConjointe: null,
      nomPartie1: null,
      nomPartie2: null,
      nomAvantMariage: null,
      nomApresMariage: null,
      nomDernierConjoint: null,
      prenomsDernierConjoint: null
    }
  ]
};
