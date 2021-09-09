import { NatureRc } from "../../../../../../../model/etatcivil/enum/NatureRc";
import {
  InscriptionRcUtil,
  TypeInscriptionRc
} from "../../../../../../../model/etatcivil/enum/TypeInscriptionRc";
import { IFicheRcRca } from "../../../../../../../model/etatcivil/rcrca/IFicheRcRca";
import { IElementsJasperCertificatRC } from "../GenerationCertificatRCHook";
import {
  getDecisionExequatur,
  getInteressesDecision,
  getParagrapheFin
} from "./specificationCommunes";

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
    const natureInscriptionLiee = NatureRc.getEnumFor(
      data.inscriptionsLiees[0].nature
    ).libelle as string;

    renouvellementModification = `prononçant le ${typeInscription.toLocaleLowerCase()} de la mesure de ${natureInscriptionLiee.toLocaleLowerCase()} RC n°`;
    renouvellementModification += ` ${data.inscriptionsLiees[0].annee} - ${data.inscriptionsLiees[0].numero}`;
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
      elementsJasper.decisionRecue1 = "TODO US 499"; // TODO US 499
      elementsJasper.decisionRecue2 = "TODO US 499"; // TODO US 499
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
