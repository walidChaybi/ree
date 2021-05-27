/* istanbul ignore file */

import { MandataireRc } from "../../../../../../model/etatcivil/enum/MandataireRc";
import { NatureRc } from "../../../../../../model/etatcivil/enum/NatureRc";

export const ficheInscriptionRepertoireCivil = {
  nature: new NatureRc("CURATELLE_AMENAGEE"),
  mandataires: [
    new MandataireRc(
      "Mandataire judiciaire à la protection des majeurs association"
    ),
    new MandataireRc(
      "Mandataire judiciaire à la protection des majeurs  individuel"
    )
  ],
  typeInscription: "RENOUVELLEMENT",
  inscriptionsImpactees: [
    { id: "0", annee: "2015", numero: "36547" },
    { id: "1", annee: "2020", numero: "36548" }
  ],
  inscriptionsLiees: [
    {
      typeInscription: "Modification",
      numeroRc: "2017 - 145235",
      idInscription: ""
    },
    {
      typeInscription: "Radiation",
      numeroRc: "2019 - 48596",
      idInscription: ""
    }
  ],
  dateInscription: new Date(1518652800000),
  duree: {
    nombreDuree: 2,
    uniteDuree: "années",
    autreDuree: "Viager",
    dateFinDeMesure: 1581724800
  }
};

export const ficheInscriptionRepertoireCivilSansInscriptionsLieesInscriptionsImpactes = {
  nature: new NatureRc("CURATELLE_AMENAGEE"),
  mandataires: [
    "Mandataire judiciaire à la protection des majeurs association",
    "Préposé d'établissement"
  ],
  typeInscription: "RENOUVELLEMENT",
  inscriptionsImpactees: [],
  inscriptionsLiees: [],
  dateInscription: new Date(1518652800000),
  duree: {
    nombreDuree: 2,
    autreDuree: "Viager",
    dateFinDeMesure: 1581724800
  }
};

export const ficheInscriptionRepertoireCivilSansUniteDureeInscription = {
  nature: new NatureRc("CURATELLE_AMENAGEE"),
  mandataires: [
    "Mandataire judiciaire à la protection des majeurs association",
    "Préposé d'établissement"
  ],
  typeInscription: "RENOUVELLEMENT",
  inscriptionsImpactees: [],
  inscriptionsLiees: [],
  dateInscription: new Date(1518652800000),
  duree: {
    autreDuree: "Viager",
    dateFinDeMesure: 1581724800
  }
};
