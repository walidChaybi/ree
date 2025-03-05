/* istanbul ignore file */

import { FicheRcDecisionNotaire } from "@mock/data/ficheRC";
import { IFicheRcDto } from "@model/etatcivil/rcrca/FicheRcRca";

export const ficheInscriptionRepertoireCivil: IFicheRcDto = {
  ...FicheRcDecisionNotaire,
  nature: {
    id: "058a436b-330d-4c3c-83e0-e49d27390127",
    nom: "NATURE_RC",
    code: "CURATELLE_AMENAGEE",
    libelle: "curatelle aménagée",
    estActif: true,
    type: "Protection des majeurs",
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "CURATELLE"
  },
  mandataires: [
    { id: "", libelle: "Mandataire judiciaire à la protection des majeurs association", nom: "", code: "", estActif: true },
    { id: "", nom: "", code: "", estActif: true, libelle: "Mandataire judiciaire à la protection des majeurs  individuel" }
  ],
  typeInscription: "RENOUVELLEMENT",
  inscriptionsImpactees: [
    { id: "0", annee: "2015", numero: "36547", typeInscription: "MODIFICATION", nature: "" },
    { id: "1", annee: "2020", numero: "36548", typeInscription: "RADIATION", nature: "" }
  ],
  inscriptionsLiees: [
    {
      typeInscription: "MODIFICATION",
      numero: "2017 - 145235",
      annee: "2017",
      id: "2",
      nature: ""
    },
    {
      typeInscription: "RADIATION",
      numero: "2019 - 48596",
      annee: "2019",
      id: "3",
      nature: ""
    }
  ],
  dateInscription: [2018, 2, 15],
  duree: {
    nombreDuree: 2,
    uniteDuree: "années",
    dateFinDeMesure: [2020, 2, 15]
  },
  statutsFiche: [
    {
      statut: "ACTIF",
      statutFicheEvenement: {
        id: "",
        date: {
          annee: "2020"
        },
        ville: "nantes",
        region: "Pays de la Loire",
        pays: "France"
      },
      motif: "",
      complementMotif: "",
      dateStatut: 1581724800000
    }
  ]
};

export const ficheInscriptionRepertoireCivilSansInscriptionsLieesInscriptionsImpactes: IFicheRcDto = {
  ...ficheInscriptionRepertoireCivil,
  mandataires: [
    { id: "", libelle: "Mandataire judiciaire à la protection des majeurs association", nom: "", code: "", estActif: true },
    { id: "", nom: "", code: "", estActif: true, libelle: "Préposé d'établissement" }
  ],
  inscriptionsImpactees: [],
  inscriptionsLiees: []
};

export const ficheInscriptionRepertoireCivilSansUniteDureeInscription: IFicheRcDto = {
  ...ficheInscriptionRepertoireCivilSansInscriptionsLieesInscriptionsImpactes,
  duree: {
    dateFinDeMesure: [2020, 2, 15]
  }
};
