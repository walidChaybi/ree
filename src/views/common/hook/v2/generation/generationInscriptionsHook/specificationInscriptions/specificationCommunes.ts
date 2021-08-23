import {
  TypeDecision,
  TypeDecisionUtil
} from "../../../../../../../model/etatcivil/enum/TypeDecision";
import { TypeFiche } from "../../../../../../../model/etatcivil/enum/TypeFiche";
import { IFicheRcRca } from "../../../../../../../model/etatcivil/rcrca/IFicheRcRca";
import {
  getDateFormatJasper,
  getDateFromTimestamp
} from "../../../../../util/DateUtils";

export function getDecisionExequatur(data: IFicheRcRca) {
  let decision = undefined;
  if (
    TypeDecisionUtil.isDecisionJuridiction(
      data.decision?.type as TypeDecision
    ) &&
    data.decision?.dateDecisionEtrangere
  ) {
    const dateDecisionEtrangere = getDateFormatJasper(
      getDateFromTimestamp(data.decision?.dateDecisionEtrangere)
    );
    decision = `prise en exequatur de la décision étrangère en date du ${dateDecisionEtrangere}`;
  }
  return decision;
}

export function getParagrapheFin(infosRcRca: IFicheRcRca) {
  let paragrapheFin = `Conformément à l'article`;

  if (infosRcRca.categorie === TypeFiche.RCA) {
    paragrapheFin += ` Article 4-1 du décret 65-422 du 1er juin 1965,`;
  } else if (infosRcRca.categorie === TypeFiche.RC) {
    paragrapheFin += ` Article 4 du décret 65-422 du 1er juin 1965,`;
  }

  if (infosRcRca.decision?.instructionProcureur) {
    const procureur = infosRcRca.decision?.instructionProcureur;

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

  const dateInscription = infosRcRca.dateInscription
    ? getDateFormatJasper(infosRcRca.dateInscription)
    : "";

  if (infosRcRca.categorie === TypeFiche.RCA) {
    paragrapheFin += ` une inscription a été prise au répertoire civil annexe le ${dateInscription} sous la référence : RCA n°${infosRcRca.annee} - ${infosRcRca.numero}`;
  } else if (infosRcRca.categorie === TypeFiche.RC) {
    paragrapheFin += ` une inscription a été prise au répertoire civil le ${dateInscription} sous la référence : RC n°${infosRcRca.annee} - ${infosRcRca.numero}`;
  }

  return paragrapheFin;
}
