import { IElementsJasperCertificatRC } from "@model/composition/ICertificatRCComposition";
import { IDecret } from "@model/etatcivil/commun/IDecret";
import { ETypeInscriptionRc } from "@model/etatcivil/enum/ETypeInscriptionRc";
import { NatureRc } from "@model/etatcivil/enum/NatureRc";
import { TypeAutoriteUtil } from "@model/etatcivil/enum/TypeAutorite";
import { FicheRcRca } from "@model/etatcivil/rcrca/FicheRcRca";
import { IInscriptionRc } from "@model/etatcivil/rcrca/IInscriptionRC";
import DateUtils from "@util/DateUtils";
import { formatDe } from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import {
  getDecisionExequatur,
  getDecisionJuridiction,
  getDecisionNotaire,
  getInteressesDecision,
  getParagrapheFin
} from "./specificationCommunes";

function getParagrapheDecisionRecue1(infosRC: FicheRcRca) {
  let decisionRecue = "";

  if (infosRC.decision) {
    const dateDecision = DateUtils.getDateFormatJasper(DateUtils.getDateFromTimestamp(infosRC.decision?.dateDecision));
    const localite = LieuxUtils.getLocalisationAutorite(
      infosRC.decision?.autorite.ville,
      infosRC.decision?.autorite.libelleDepartement,
      infosRC.decision?.autorite.region,
      infosRC.decision?.autorite.pays,
      infosRC.decision?.autorite.arrondissement
    );
    // Si la décision au RC est une décision de Juridiction
    if (TypeAutoriteUtil.isJuridiction(infosRC.decision?.autorite.typeAutorite)) {
      decisionRecue = getDecisionJuridiction(infosRC, dateDecision, localite);
    }
    // Si la décision au RC est une décision de Notaire
    else if (TypeAutoriteUtil.isNotaire(infosRC.decision?.autorite.typeAutorite)) {
      decisionRecue = getDecisionNotaire(infosRC, dateDecision, localite);
    }
  }
  return decisionRecue;
}

function getParagrapheDecisionRecue2(infosRC: FicheRcRca) {
  let decisionRecue = "";
  if (infosRC.decision) {
    if (infosRC.typeInscription === ETypeInscriptionRc.RENOUVELLEMENT || infosRC.typeInscription === ETypeInscriptionRc.MODIFICATION) {
      decisionRecue = "concernant : ";
    } else if (infosRC.typeInscription === ETypeInscriptionRc.INSCRIPTION) {
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

function getResume(data: FicheRcRca) {
  let resume = undefined;
  if (data.typeInscription === ETypeInscriptionRc.INSCRIPTION && data.nature.type === "Protection des majeurs") {
    resume = `sous le régime ${formatDe(data.nature.libelle)}${data.nature.libelle}`;
  }
  return resume;
}

function getRenouvellementModification(data?: FicheRcRca, inscriptionsRcRadiation?: IInscriptionRc): string | undefined {
  let renouvellementModification;
  if (data) {
    if (inscriptionsRcRadiation && data.typeInscription === ETypeInscriptionRc.MODIFICATION) {
      renouvellementModification = getModificationJasper(data, inscriptionsRcRadiation);
    } else if (data.typeInscription === ETypeInscriptionRc.RENOUVELLEMENT) {
      renouvellementModification = getRenouvellementJasper(data);
    }
  }

  return renouvellementModification;
}

function getModificationJasper(data: FicheRcRca, inscriptionRcRadiation: IInscriptionRc): string {
  const typeInscription = data.typeInscription ?? "";
  let modificationTexte = `prononçant la ${typeInscription.toLocaleLowerCase()}`;

  modificationTexte += ` de la mesure de ${inscriptionRcRadiation.nature.libelle}`;

  modificationTexte += ` en ${data.nature.libelle}`;

  return modificationTexte;
}

function getRenouvellementJasper(inscription: FicheRcRca) {
  const typeInscription = inscription.typeInscription ?? "";
  const natureInscriptionImpactee = NatureRc.depuisId(inscription.inscriptionsImpactees[0].nature)?.libelle ?? "";

  let renouvellementTexte = `prononçant le ${typeInscription.toLocaleLowerCase()}`;
  renouvellementTexte += ` de la mesure ${formatDe(
    natureInscriptionImpactee.toUpperCase()
  )}${natureInscriptionImpactee.toLocaleLowerCase()} RC n°`;
  renouvellementTexte += ` ${inscription.inscriptionsImpactees[0].annee} - ${inscription.inscriptionsImpactees[0].numero}`;

  return renouvellementTexte;
}

function getDuree(data: FicheRcRca) {
  let duree = undefined;
  if (data.duree) {
    duree = `pour une durée de ${data.duree.nombreDuree} ${data.duree.uniteDuree}`;
  }
  return duree;
}

/////////////////////////////////////////////////////////////////////
const SpecificationRC = {
  getElementsJasper: (infosRC: FicheRcRca, decrets: IDecret[], inscriptionsRcRadiation?: IInscriptionRc) => {
    const elementsJasper = {} as IElementsJasperCertificatRC;

    if (infosRC) {
      elementsJasper.anneeInscription = infosRC.annee;
      elementsJasper.numeroInscription = infosRC.numero;
      elementsJasper.decisionRecue1 = getParagrapheDecisionRecue1(infosRC);
      elementsJasper.decisionRecue2 = getParagrapheDecisionRecue2(infosRC);
      elementsJasper.interesseDecision = getInteressesDecision(infosRC);
      elementsJasper.regime = getResume(infosRC);
      elementsJasper.renouvellementModification = getRenouvellementModification(infosRC, inscriptionsRcRadiation);
      elementsJasper.decisionExequatur = getDecisionExequatur(infosRC);
      elementsJasper.duree = getDuree(infosRC);
      elementsJasper.paragrapheFin = getParagrapheFin(infosRC, decrets);
    }

    return elementsJasper;
  }
};

export default SpecificationRC;
