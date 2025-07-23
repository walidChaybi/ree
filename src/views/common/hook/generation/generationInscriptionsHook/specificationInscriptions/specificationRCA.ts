import { IElementsJasperCertificatRCA } from "@model/composition/ICertificatRCAComposition";
import { IDecret } from "@model/etatcivil/commun/IDecret";
import { ETypeDecision } from "@model/etatcivil/enum/ETypeDecision";
import { ETypeInscriptionRca } from "@model/etatcivil/enum/ETypeInscriptionRca";
import { TypeAutoriteUtil } from "@model/etatcivil/enum/TypeAutorite";
import { FicheRcRca } from "@model/etatcivil/rcrca/FicheRcRca";
import DateUtils from "@util/DateUtils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import {
  getDecisionExequatur,
  getDecisionJuridiction,
  getDecisionNotaire,
  getInteressesDecision,
  getParagrapheFin
} from "./specificationCommunes";

function getParagrapheDecisionRecue(infosRCA: FicheRcRca) {
  let decisionRecue = "";

  if (infosRCA.decision) {
    const dateDecision = DateUtils.getDateFormatJasper(DateUtils.getDateFromTimestamp(infosRCA.decision?.dateDecision));
    const localite = LieuxUtils.getLocalisationAutorite(
      infosRCA.decision?.autorite.ville,
      infosRCA.decision?.autorite.libelleDepartement,
      infosRCA.decision?.autorite.region,
      infosRCA.decision?.autorite.pays,
      infosRCA.decision?.autorite.arrondissement
    );
    // Si la décision au RCA est une décision ONAC et de type inscription "Inscription",
    if (infosRCA.decision?.type === ETypeDecision.ONAC && infosRCA.typeInscription === ETypeInscriptionRca.INSCRIPTION) {
      decisionRecue = getDecisionONACInscription(infosRCA, dateDecision);
    }
    // Si la décision au RCA est une décision de Juridiction et de type inscription "Inscription"
    else if (
      TypeAutoriteUtil.isJuridiction(infosRCA.decision?.autorite.typeAutorite) &&
      infosRCA.typeInscription === ETypeInscriptionRca.INSCRIPTION
    ) {
      decisionRecue = getDecisionJuridiction(infosRCA, dateDecision, localite);
      decisionRecue += ` concernant ${infosRCA.nature.article} ${infosRCA.nature.libelle} de : `;
    }
    // Si la décision au RCA est une décision de Notaire et de type inscription "Inscription"
    else if (
      TypeAutoriteUtil.isNotaire(infosRCA.decision?.autorite.typeAutorite) &&
      infosRCA.typeInscription === ETypeInscriptionRca.INSCRIPTION
    ) {
      decisionRecue = getDecisionNotaire(infosRCA, dateDecision, localite);
      decisionRecue += ` concernant ${infosRCA.nature.article} ${infosRCA.nature.libelle} de : `;
    }
  }
  return decisionRecue;
}

function getDecisionONACInscription(infosRCA: FicheRcRca, dateDecision: string) {
  let decisionRecue = "";
  const titreOnac = infosRCA.decision?.autorite.titreOnac;

  decisionRecue += "Le Service central d'état civil a reçu la décision ";

  decisionRecue += titreOnac && titreOnac === "Directrice générale" ? `de la ${titreOnac} ` : `du ${titreOnac} `;

  decisionRecue += `de l'Office national des anciens combattants et victimes de guerre en date du ${dateDecision} `;
  decisionRecue += `concernant la mention ${infosRCA.nature.libelle} attribuée à :`;
  return decisionRecue;
}

/////////////////////////////////////////////////////////////////////
class SpecificationRCA {
  getElementsJasper(infosRCA: FicheRcRca, decrets: IDecret[]) {
    const elementsJasper = {} as IElementsJasperCertificatRCA;

    if (infosRCA) {
      elementsJasper.anneeInscription = infosRCA.annee;
      elementsJasper.numeroInscription = infosRCA.numero;
      elementsJasper.decisionRecue = getParagrapheDecisionRecue(infosRCA);
      elementsJasper.interesseDecision = getInteressesDecision(infosRCA);
      elementsJasper.decisionExequatur = getDecisionExequatur(infosRCA);
      elementsJasper.paragrapheFin = getParagrapheFin(infosRCA, decrets);
    }
    return elementsJasper;
  }
}

export const specificationRCA = new SpecificationRCA();
