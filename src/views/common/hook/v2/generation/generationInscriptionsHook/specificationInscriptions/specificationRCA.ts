import { IFicheRcRca } from "../../../../../../../model/etatcivil/rcrca/IFicheRcRca";
import {
  getDateFormatJasper,
  getDateFromTimestamp
} from "../../../../../util/DateUtils";
import { getLibelle } from "../../../../../widget/Text";
import { IElementsJasperCertificatRCA } from "../GenerationCertificatRCAHook";
import { getDecisionExequatur } from "./specificationCommunes";

const DECRET_RCA = getLibelle("Article 4-1 du décret 65-422 du 1er juin 1965");

function getParagrapheFin(informationsRCA: IFicheRcRca) {
  let paragrapheFin = `Conformément à l'article ${DECRET_RCA},`;

  if (informationsRCA.decision?.instructionProcureur) {
    const procureur = informationsRCA.decision?.instructionProcureur;

    paragrapheFin += ` et sur instruction du procureur de la République de ${procureur.ville}`;
    paragrapheFin += procureur.arrondissement
      ? ` Arr.${procureur.arrondissement}`
      : "";
    paragrapheFin += procureur.departement ? ` (${procureur.departement})` : "";

    const dateInstruction = getDateFormatJasper(
      getDateFromTimestamp(procureur.dateInstruction)
    );

    paragrapheFin += ` (N° réf. ${procureur.numeroRef}) du ${dateInstruction},`;
  }

  const dateInscription = informationsRCA.dateInscription
    ? getDateFormatJasper(informationsRCA.dateInscription)
    : "";

  paragrapheFin += ` une inscription a été prise au répertoire civil annexe le ${dateInscription} sous la référence : RCA n°${informationsRCA.annee} - ${informationsRCA.numero}`;

  return paragrapheFin;
}

/////////////////////////////////////////////////////////////////////
class SpecificationRCA {
  getElementsJasper(informationsRCA: IFicheRcRca) {
    const elementsJasper = {} as IElementsJasperCertificatRCA;

    if (informationsRCA) {
      elementsJasper.anneeInscription = informationsRCA.annee;
      elementsJasper.numeroInscription = informationsRCA.numero;
      elementsJasper.decisionRecue = "TODO US 452"; // TODO US 452
      elementsJasper.interesseDecision = "TODO US 398"; // TODO US 398
      elementsJasper.decisionExequatur = getDecisionExequatur(informationsRCA);
      elementsJasper.paragrapheFin = getParagrapheFin(informationsRCA);
    }

    return elementsJasper;
  }
}

export const specificationRCA = new SpecificationRCA();
