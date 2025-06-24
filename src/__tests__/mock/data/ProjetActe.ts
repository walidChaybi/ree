export const ReponseEnregistrementProjetActe = {
  errors: [],
  data: {
    id: "dcd70ce9-1bb4-45b1-b672-a94dc152c339",
    dateCreation: 1698153110423,
    modeCreation: "ETABLI",
    statut: "BROUILLON",
    dateStatut: 1698153110423,
    nature: "NAISSANCE",
    numero: "0",
    dateDerniereMaj: 1698153110423,
    visibiliteArchiviste: "NON",
    evenement: {
      id: "dcd7d061-a935-4745-8f87-b2e071c28967",
      jour: 5,
      mois: 1,
      annee: 1991,
      ville: "Inc",
      region: "",
      pays: "Cuba"
    },
    titulaires: [
      {
        nom: "PLAGNE",
        prenoms: ["Sylvie"],
        ordre: 1,
        sexe: "MASCULIN",
        naissance: {
          jour: 5,
          mois: 1,
          annee: 1991,
          ville: "Inc",
          region: "",
          pays: "Cuba",
          neDansLeMariage: false
        },
        age: 0,
        domicile: { ville: "Courbevoie", region: "95", pays: "France" },
        filiations: [
          {
            lienParente: "PARENT",
            ordre: 2,
            nom: "PLAGNE",
            sexe: "MASCULIN",
            naissance: {
              jour: 31,
              mois: 12,
              annee: 1963,
              ville: "La Havane",
              arrondissement: "",
              region: "",
              pays: "Cuba"
            },
            age: 0,
            prenoms: ["Paul"]
          },
          {
            lienParente: "PARENT",
            ordre: 1,
            nom: "ANBDE",
            sexe: "FEMININ",
            naissance: {
              jour: 31,
              mois: 12,
              annee: 1962,
              ville: "La Havane",
              arrondissement: "",
              region: "",
              pays: "Cuba"
            },
            age: 0,
            prenoms: ["Anne"]
          }
        ],
        identiteAvantDecret: "",
        decretNaturalisation: {}
      }
    ],
    corpsTexte: {
      id: "dcd72a7d-4a95-475f-b63c-2f30b7108257",
      texte:
        "Nom                : PLAGNE\nPrénoms            : Sylvie\nSexe               : masculin\nÂgé de             : 0\nLieu de naissance  : Inc (Cuba)\n\nNom de la mère     : ANBDE\nPrénoms            : Anne\nÂgée de            : 0\nLieu de naissance  : La Havane (Cuba)\n\nNom du père        : PLAGNE\nPrénoms            : Paul\nÂgé de             : 0\nLieu de naissance  : La Havane (Cuba)\n\nDéclarant          : null\n\nAdresse            : Courbevoie (95)\nFrançais par       : décret de réintégration du\n\n"
    },
    analyseMarginales: [
      {
        id: "dcd74fbf-a30e-4530-a756-099538f4f7d0",
        dateDebut: 1698153110423,
        titulaires: [{ nom: "PLAGNE", prenoms: ["Sylvie"], ordre: 1 }]
      }
    ],
    type: "TEXTE",
    declarant: { identiteDeclarant: "ABSCENCE_DE_VALEUR" },
    numeroDossierNational: "2022X 200150"
  }
};
