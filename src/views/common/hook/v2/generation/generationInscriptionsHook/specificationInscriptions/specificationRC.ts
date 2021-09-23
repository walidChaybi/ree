import { NatureRc } from "../../../../../../../model/etatcivil/enum/NatureRc";
import { TypeAutoriteUtil } from "../../../../../../../model/etatcivil/enum/TypeAutorite";
import {
  InscriptionRcUtil,
  TypeInscriptionRc
} from "../../../../../../../model/etatcivil/enum/TypeInscriptionRc";
import { IFicheRcRca } from "../../../../../../../model/etatcivil/rcrca/IFicheRcRca";
import { LieuxUtils } from "../../../../../../../model/LieuxUtils";
import {
  getDateFormatJasper,
  getDateFromTimestamp
} from "../../../../../util/DateUtils";
import {
  getDecisionExequatur,
  getDecisionJuridiction,
  getDecisionNotaire,
  getInteressesDecision,
  getParagrapheFin
} from "./specificationCommunes";

export interface IElementsJasperCertificatRC {
  anneeInscription?: string;
  numeroInscription?: string;
  decisionRecue1?: string;
  decisionRecue2?: string;
  interesseDecision?: string;
  regime?: string;
  renouvellementModification?: string;
  decisionExequatur?: string;
  duree?: string;
  paragrapheFin?: string;
}

function getParagrapheDecisionRecue1(infosRC: IFicheRcRca) {
  let decisionRecue = "";

  if (infosRC.decision) {
    const dateDecision = getDateFormatJasper(
      getDateFromTimestamp(infosRC.decision?.dateDecision)
    );
    const localite = LieuxUtils.getLocalisationAutorite(
      infosRC.decision?.autorite.ville,
      infosRC.decision?.autorite.libelleDepartement,
      infosRC.decision?.autorite.region,
      infosRC.decision?.autorite.pays,
      infosRC.decision?.autorite.arrondissement
    );
    // Si la décision au RC est une décision de Juridiction
    if (
      TypeAutoriteUtil.isJuridiction(infosRC.decision?.autorite.typeAutorite)
    ) {
      decisionRecue = getDecisionJuridiction(infosRC, dateDecision, localite);
    }
    // Si la décision au RC est une décision de Notaire
    else if (
      TypeAutoriteUtil.isNotaire(infosRC.decision?.autorite.typeAutorite)
    ) {
      decisionRecue = getDecisionNotaire(infosRC, dateDecision, localite);
    }
  }
  return decisionRecue;
}

function getParagrapheDecisionRecue2(infosRC: IFicheRcRca) {
  let decisionRecue = "";
  if (infosRC.decision) {
    if (
      infosRC.typeInscription === TypeInscriptionRc.RENOUVELLEMENT ||
      infosRC.typeInscription === TypeInscriptionRc.MODIFICATION
    ) {
      decisionRecue = "concernant : ";
    } else if (infosRC.typeInscription === TypeInscriptionRc.INSCRIPTION) {
      if (infosRC.nature.type === "Protection des majeurs") {
        decisionRecue = `concernant le placement de : `;
      } else {
        decisionRecue =
          infosRC.nature.article === "l'"
            ? `concernant ${infosRC.nature.article}${infosRC.nature.libelle} de : `
            : `concernant ${infosRC.nature.article} ${infosRC.nature.libelle} de : `;
      }
    }
  }
  return decisionRecue;
}

export function getResume(data: IFicheRcRca) {
  let resume = undefined;
  if (
    data.typeInscription === TypeInscriptionRc.INSCRIPTION &&
    data.nature.type === "Protection des majeurs"
  ) {
    resume = `sous le régime de ${data.nature.libelle}`;
  }
  return resume;
}

export function getRenouvellementModification(data: IFicheRcRca) {
  let renouvellementModification = undefined;

  if (
    data.typeInscription === TypeInscriptionRc.RENOUVELLEMENT ||
    data.typeInscription === TypeInscriptionRc.MODIFICATION
  ) {
    const typeInscription = InscriptionRcUtil.getLibelle(data.typeInscription);
    const natureInscriptionImpactee = NatureRc.getEnumFor(
      data.inscriptionsImpactees[0].nature
    ).libelle as string;

    renouvellementModification = `prononçant le ${typeInscription.toLocaleLowerCase()} de la mesure de ${natureInscriptionImpactee.toLocaleLowerCase()} RC n°`;
    renouvellementModification += ` ${data.inscriptionsImpactees[0].annee} - ${data.inscriptionsImpactees[0].numero}`;
    renouvellementModification +=
      data.typeInscription === TypeInscriptionRc.MODIFICATION
        ? ` en ${data.nature.libelle}`
        : "";
  }

  return renouvellementModification;
}

export function getDuree(data: IFicheRcRca) {
  let duree = undefined;
  if (data.duree) {
    duree = `pour une durée de ${data.duree.nombreDuree} ${data.duree.uniteDuree}`;
  }
  return duree;
}

/////////////////////////////////////////////////////////////////////
class SpecificationRC {
  getElementsJasper(infosRC: IFicheRcRca) {
    const elementsJasper = {} as IElementsJasperCertificatRC;

    if (infosRC) {
      elementsJasper.anneeInscription = infosRC.annee;
      elementsJasper.numeroInscription = infosRC.numero;
      elementsJasper.decisionRecue1 = getParagrapheDecisionRecue1(infosRC);
      elementsJasper.decisionRecue2 = getParagrapheDecisionRecue2(infosRC);
      elementsJasper.interesseDecision = getInteressesDecision(infosRC);
      elementsJasper.regime = getResume(infosRC);
      elementsJasper.renouvellementModification = getRenouvellementModification(
        infosRC
      );
      elementsJasper.decisionExequatur = getDecisionExequatur(infosRC);
      elementsJasper.duree = getDuree(infosRC);
      elementsJasper.paragrapheFin = getParagrapheFin(infosRC);
    }

    return elementsJasper;
  }
}

export const specificationRC = new SpecificationRC();
