import { TypeAutoriteUtil } from "../../../../../../../model/etatcivil/enum/TypeAutorite";
import { TypeDecision } from "../../../../../../../model/etatcivil/enum/TypeDecision";
import { TypeInscriptionRc } from "../../../../../../../model/etatcivil/enum/TypeInscriptionRc";
import { IFicheRcRca } from "../../../../../../../model/etatcivil/rcrca/IFicheRcRca";
import { LieuxUtils } from "../../../../../../../model/LieuxUtils";
import {
  getDateFormatJasper,
  getDateFromTimestamp
} from "../../../../../util/DateUtils";
import { IElementsJasperCertificatRCA } from "../GenerationCertificatRCAHook";
import {
  getDecisionExequatur,
  getParagrapheFin
} from "./specificationCommunes";

function getParagrapheDecisionRecue(infosRCA: IFicheRcRca) {
  let decisionRecue = "";

  if (infosRCA.decision) {
    const dateDecision = getDateFormatJasper(
      getDateFromTimestamp(infosRCA.decision?.dateDecision)
    );
    const localite = LieuxUtils.getLieu(
      infosRCA.decision?.autorite.ville,
      infosRCA.decision?.autorite.region,
      infosRCA.decision?.autorite.pays,
      infosRCA.decision?.autorite.arrondissement
    );
    // Si la décision au RCA est une décision ONAC et de type inscription "Inscription",
    if (
      infosRCA.decision?.type === TypeDecision.ONAC &&
      infosRCA.typeInscription === TypeInscriptionRc.INSCRIPTION
    ) {
      decisionRecue = getDecisionONACInscription(infosRCA, dateDecision);
    }
    // Si la décision au RCA est une décision de Juridiction et de type inscription "Inscription"
    else if (
      TypeAutoriteUtil.isJuridiction(
        infosRCA.decision?.autorite.typeAutorite
      ) &&
      infosRCA.typeInscription === TypeInscriptionRc.INSCRIPTION
    ) {
      decisionRecue = getDecisionJuridictionInscription(
        infosRCA,
        dateDecision,
        localite
      );
    }
    // Si la décision au RCA est une décision de Notaire et de type inscription "Inscription"
    else if (
      TypeAutoriteUtil.isNotaire(infosRCA.decision?.autorite.typeAutorite) &&
      infosRCA.typeInscription === TypeInscriptionRc.INSCRIPTION
    ) {
      decisionRecue = getDecisionNotaireInscription(
        infosRCA,
        dateDecision,
        localite
      );
    }
  }
  return decisionRecue;
}

function getDecisionONACInscription(
  infosRCA: IFicheRcRca,
  dateDecision: string
) {
  let decisionRecue = "";
  const titreOnac = infosRCA.decision?.autorite.titreOnac;

  decisionRecue += "Le service central d'état civil a reçu la décision ";

  decisionRecue +=
    titreOnac && titreOnac === "Directrice générale"
      ? `de la ${titreOnac} `
      : `du ${titreOnac} `;

  decisionRecue += `de l'Office national des anciens combattants et victimes de guerre en date du ${dateDecision} `;
  decisionRecue += `concernant la mention ${infosRCA.nature.libelle} attribuée à :`;
  return decisionRecue;
}

function getDecisionJuridictionInscription(
  infosRCA: IFicheRcRca,
  dateDecision: string,
  localite: string
) {
  let decisionRecue = "";
  let typeDecision = "";

  switch (infosRCA.decision?.type) {
    case TypeDecision.JUGEMENT:
      typeDecision = "le jugement";
      break;
    case TypeDecision.ORDONNANCE:
      typeDecision = "l'ordonnance";
      break;
    case TypeDecision.JUDICIAIRE:
      typeDecision = "la décision judicaire";
      break;
    default:
      typeDecision = "";
      break;
  }

  decisionRecue = `Le service central d'état civil a reçu ${typeDecision} `;
  decisionRecue += `du ${infosRCA.decision?.autorite.typeJuridiction} de ${localite}, `;

  decisionRecue += `en date du ${dateDecision} concernant ${infosRCA.nature.article} ${infosRCA.nature.libelle} de :  `;
  return decisionRecue;
}

function getDecisionNotaireInscription(
  infosRCA: IFicheRcRca,
  dateDecision: string,
  localite: string
) {
  let decisionRecue = "";
  // décision de Notaire de type "Convention"
  if (infosRCA.decision?.type === TypeDecision.CONVENTION) {
    decisionRecue = `Le service central d'état civil a reçu la convention déposée au rang des minutes de Maitre `;
  }
  // décision de Notaire autre que de type "Convention"
  else {
    decisionRecue = `Le service central d'état civil a reçu l'acte établi par Maitre `;
  }

  decisionRecue += `${infosRCA.decision?.autorite.prenomNotaire} ${infosRCA.decision?.autorite.nomNotaire}, `;
  decisionRecue += `notaire à ${localite}, `;

  if (infosRCA.decision?.autorite.numeroCrpcen) {
    decisionRecue += `office notarial n°${infosRCA.decision?.autorite.numeroCrpcen}, `;
  }

  decisionRecue += `le ${dateDecision} concernant ${infosRCA.nature.article} ${infosRCA.nature.libelle} de : `;
  return decisionRecue;
}

/////////////////////////////////////////////////////////////////////
class SpecificationRCA {
  getElementsJasper(infosRCA: IFicheRcRca) {
    const elementsJasper = {} as IElementsJasperCertificatRCA;

    if (infosRCA) {
      elementsJasper.anneeInscription = infosRCA.annee;
      elementsJasper.numeroInscription = infosRCA.numero;
      elementsJasper.decisionRecue = getParagrapheDecisionRecue(infosRCA);
      elementsJasper.interesseDecision = "TODO US 398"; // TODO US 398
      elementsJasper.decisionExequatur = getDecisionExequatur(infosRCA);
      elementsJasper.paragrapheFin = getParagrapheFin(infosRCA);
    }
    return elementsJasper;
  }
}

export const specificationRCA = new SpecificationRCA();
