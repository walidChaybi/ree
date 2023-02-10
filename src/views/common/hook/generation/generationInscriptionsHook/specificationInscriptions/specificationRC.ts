import { IElementsJasperCertificatRC } from "@model/composition/ICertificatRCComposition";
import { NatureRc } from "@model/etatcivil/enum/NatureRc";
import { TypeAutoriteUtil } from "@model/etatcivil/enum/TypeAutorite";
import {
  InscriptionRcUtil,
  TypeInscriptionRc
} from "@model/etatcivil/enum/TypeInscriptionRc";
import { IFicheRcRca } from "@model/etatcivil/rcrca/IFicheRcRca";
import { IInscriptionRc } from "@model/etatcivil/rcrca/IInscriptionRC";
import { getDateFormatJasper, getDateFromTimestamp } from "@util/DateUtils";
import { formatDe } from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import {
  getDecisionExequatur,
  getDecisionJuridiction,
  getDecisionNotaire,
  getInteressesDecision,
  getParagrapheFin
} from "./specificationCommunes";

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
    resume = `sous le régime ${formatDe(data.nature.libelle)}${
      data.nature.libelle
    }`;
  }
  return resume;
}

export function getRenouvellementModification(
  data?: IFicheRcRca,
  inscriptionsRcRadiation?: IInscriptionRc
): string | undefined {
  let renouvellementModification;
  if (data) {
    if (
      inscriptionsRcRadiation &&
      InscriptionRcUtil.estDeTypeModification(data.typeInscription)
    ) {
      renouvellementModification = getModificationJasper(
        data,
        inscriptionsRcRadiation
      );
    } else if (
      InscriptionRcUtil.estDeTypeRenouvellement(data.typeInscription)
    ) {
      renouvellementModification = getRenouvellementJasper(data);
    }
  }

  return renouvellementModification;
}

export function getModificationJasper(
  data: IFicheRcRca,
  inscriptionRcRadiation: IInscriptionRc
): string {
  const typeInscription = InscriptionRcUtil.getLibelle(data.typeInscription);
  let modificationTexte = `prononçant la ${typeInscription.toLocaleLowerCase()}`;

  modificationTexte += ` de la mesure de ${inscriptionRcRadiation.nature.libelle}`;

  modificationTexte += ` en ${data.nature.libelle}`;

  return modificationTexte;
}

export function getRenouvellementJasper(inscription: IFicheRcRca) {
  const typeInscription = InscriptionRcUtil.getLibelle(
    inscription.typeInscription
  );
  const natureInscriptionImpactee = NatureRc.getEnumFor(
    inscription.inscriptionsImpactees[0].nature
  ).libelle as string;

  let renouvellementTexte = `prononçant le ${typeInscription.toLocaleLowerCase()}`;
  renouvellementTexte += ` de la mesure ${formatDe(
    natureInscriptionImpactee.toUpperCase()
  )}${natureInscriptionImpactee.toLocaleLowerCase()} RC n°`;
  renouvellementTexte += ` ${inscription.inscriptionsImpactees[0].annee} - ${inscription.inscriptionsImpactees[0].numero}`;

  return renouvellementTexte;
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
  getElementsJasper(
    infosRC: IFicheRcRca,
    inscriptionsRcRadiation?: IInscriptionRc
  ) {
    const elementsJasper = {} as IElementsJasperCertificatRC;

    if (infosRC) {
      elementsJasper.anneeInscription = infosRC.annee;
      elementsJasper.numeroInscription = infosRC.numero;
      elementsJasper.decisionRecue1 = getParagrapheDecisionRecue1(infosRC);
      elementsJasper.decisionRecue2 = getParagrapheDecisionRecue2(infosRC);
      elementsJasper.interesseDecision = getInteressesDecision(infosRC);
      elementsJasper.regime = getResume(infosRC);
      elementsJasper.renouvellementModification = getRenouvellementModification(
        infosRC,
        inscriptionsRcRadiation
      );
      elementsJasper.decisionExequatur = getDecisionExequatur(infosRC);
      elementsJasper.duree = getDuree(infosRC);
      elementsJasper.paragrapheFin = getParagrapheFin(infosRC);
    }

    return elementsJasper;
  }
}

export const specificationRC = new SpecificationRC();
