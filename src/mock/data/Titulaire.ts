export const titulaireSexeInconnu = {
  ordre: 1,
  nom: "Michel de lavandière du grand-large",
  prenoms: ["lolita"],
  autresNoms: null,
  autresPrenoms: null,
  sexe: "INCONNU",
  naissance: {
    minute: null,
    heure: null,
    jour: 17,
    mois: 4,
    annee: 1970,
    voie: null,
    ville: "Sitka",
    arrondissement: null,
    region: "Alaska",
    pays: "États-Unis",
    lieuReprise: null
  },
  profession: "DEVELOPPEUR",
  age: null,
  domicile: {
    voie: "Ilot du Héron",
    ville: "Djibouti",
    arrondissement: null,
    region: null,
    pays: "DJIBOUTI"
  },
  filiations: [
    {
      lienParente: "PARENT",
      ordre: 1,
      nom: "Rodriguez",
      sexe: "FEMININ",
      naissance: null,
      profession: "Technicien",
      age: null,
      domicile: {
        voie: "40 place de la République",
        ville: "Nantes",
        arrondissement: null,
        region: null,
        pays: "France"
      },
      prenoms: ["Constance"]
    }
  ]
};

export const titulaireParentsDeMemeSexe = {
  ordre: 1,
  nom: "Michel de lavandière du grand-large",
  prenoms: ["lolita"],
  autresNoms: null,
  autresPrenoms: null,
  sexe: "FEMININ",
  naissance: {
    minute: null,
    heure: null,
    jour: 17,
    mois: 4,
    annee: 1970,
    voie: null,
    ville: "Sitka",
    arrondissement: null,
    region: "Alaska",
    pays: "États-Unis",
    lieuReprise: null
  },
  profession: "DEVELOPPEUR",
  age: null,
  domicile: {
    voie: "Ilot du Héron",
    ville: "Djibouti",
    arrondissement: null,
    region: null,
    pays: "DJIBOUTI"
  },
  filiations: [
    {
      lienParente: "PARENT",
      ordre: 1,
      nom: "Rodriguez",
      sexe: "FEMININ",
      naissance: null,
      profession: "Technicien",
      age: null,
      domicile: {
        voie: "40 place de la République",
        ville: "Nantes",
        arrondissement: null,
        region: null,
        pays: "France"
      },
      prenoms: ["Constance"]
    },
    {
      lienParente: "PARENT",
      ordre: 2,
      nom: "Durant",
      sexe: "FEMININ",
      naissance: null,
      profession: "Technicien",
      age: null,
      domicile: {
        voie: "40 place de la République",
        ville: "Nantes",
        arrondissement: null,
        region: null,
        pays: "France"
      },
      prenoms: ["Martine"]
    }
  ]
};

export const titulaireClassique = {
  ordre: 1,
  nom: "Michel de lavandière du grand-large",
  prenoms: ["lolita"],
  autresNoms: null,
  autresPrenoms: null,
  sexe: "FEMININ",
  naissance: {
    minute: null,
    heure: null,
    jour: 17,
    mois: 4,
    annee: 1970,
    voie: null,
    ville: "Sitka",
    arrondissement: null,
    region: "Alaska",
    pays: "États-Unis",
    lieuReprise: null
  },
  profession: "DEVELOPPEUR",
  age: null,
  domicile: {
    voie: "Ilot du Héron",
    ville: "Djibouti",
    arrondissement: null,
    region: null,
    pays: "DJIBOUTI"
  },
  filiations: [
    {
      lienParente: "PARENT",
      ordre: 1,
      nom: "Rodriguez",
      sexe: "MASCULIN",
      naissance: null,
      profession: "Technicien",
      age: null,
      domicile: {
        voie: "40 place de la République",
        ville: "Nantes",
        arrondissement: null,
        region: null,
        pays: "France"
      },
      prenoms: ["Thomas"]
    },
    {
      lienParente: "PARENT",
      ordre: 2,
      nom: "Durant",
      sexe: "FEMININ",
      naissance: null,
      profession: "Technicien",
      age: null,
      domicile: {
        voie: "40 place de la République",
        ville: "Nantes",
        arrondissement: null,
        region: null,
        pays: "France"
      },
      prenoms: ["Martine"]
    }
  ]
};

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