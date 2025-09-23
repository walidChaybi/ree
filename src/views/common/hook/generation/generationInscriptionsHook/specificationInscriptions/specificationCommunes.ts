import { Decret, IDecret } from "@model/etatcivil/commun/IDecret";
import { ELienParente } from "@model/etatcivil/enum/ELienParente";
import { DECISIONS_JURIDICTION, ETypeDecision } from "@model/etatcivil/enum/ETypeDecision";
import { ETypeFiche } from "@model/etatcivil/enum/ETypeFiche";
import { FicheRcRca } from "@model/etatcivil/rcrca/FicheRcRca";
import { IMariageInteresse } from "@model/etatcivil/rcrca/IMariageInteresse";
import { IParent } from "@model/etatcivil/rcrca/IParent";
import { Interesse } from "@model/etatcivil/rcrca/Interesse";
import DateUtils from "@util/DateUtils";
import { compareNombre, formatNom, triListeObjetsSurPropriete } from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";

export function getDecisionExequatur(data: FicheRcRca): string | undefined {
  let decision = undefined;
  if (DECISIONS_JURIDICTION.includes(data.decision?.type as ETypeDecision) && data.decision?.dateDecisionEtrangere) {
    const dateDecisionEtrangere = DateUtils.getDateFormatJasper(DateUtils.getDateFromTimestamp(data.decision?.dateDecisionEtrangere));
    decision = `prise en exequatur de la décision étrangère en date du ${dateDecisionEtrangere}`;
  }
  return decision;
}

export function getDecisionJuridiction(infos: FicheRcRca, dateDecision: string, localite: string) {
  let typeDecision: string;

  switch (infos.decision?.type) {
    case ETypeDecision.JUGEMENT:
      typeDecision = "le jugement";
      break;
    case ETypeDecision.ORDONNANCE:
      typeDecision = "l'ordonnance";
      break;
    case ETypeDecision.DECISION_JUDICIAIRE:
      typeDecision = "la décision";
      break;
    default:
      typeDecision = "";
      break;
  }

  let decisionRecue = `Le Service central d'état civil a reçu ${typeDecision} `;
  decisionRecue += `du ${infos.decision?.autorite.typeJuridiction} de ${localite}, `;
  decisionRecue += `en date du ${dateDecision}`;

  return decisionRecue;
}

export function getDecisionNotaire(infos: FicheRcRca, dateDecision: string, localite: string) {
  let decisionRecue = "";
  // décision de Notaire de type "Convention"
  if (infos.decision?.type === ETypeDecision.CONVENTION) {
    decisionRecue = `Le Service central d'état civil a reçu la convention déposée au rang des minutes de Maître `;
  }
  // décision de Notaire de type "Requete"
  else if (infos.decision?.type === ETypeDecision.REQUETE) {
    const localiteJuridictionExecutante = LieuxUtils.getLocalisationAutorite(
      infos.decision?.juridictionExecutante?.ville,
      infos.decision?.juridictionExecutante?.libelleDepartement,
      infos.decision?.juridictionExecutante?.region,
      infos.decision?.juridictionExecutante?.pays,
      infos.decision?.juridictionExecutante?.arrondissement
    );
    decisionRecue = `Le Service central d'état civil a reçu un extrait de la requête présentée auprès du ${infos.decision?.juridictionExecutante?.typeJuridiction} `;
    decisionRecue += `de ${localiteJuridictionExecutante} afin d'obtenir homologation de l'acte reçu par Maître `;
  }
  // décision de Notaire autre que de type "Convention" ou "Requete"
  else {
    decisionRecue = `Le Service central d'état civil a reçu un acte établi par Maître `;
  }

  decisionRecue += `${infos.decision?.autorite.prenomNotaire} ${infos.decision?.autorite.nomNotaire}, `;
  decisionRecue += `notaire à ${localite}, `;

  if (infos.decision?.autorite.numeroCrpcen) {
    decisionRecue += `office notarial n°${infos.decision?.autorite.numeroCrpcen}, `;
  }

  decisionRecue += `le ${dateDecision}`;

  return decisionRecue;
}

export function getParagrapheFin(infosRcRca: FicheRcRca, decrets: IDecret[]) {
  let paragrapheFin = `Conformément à l'`;

  if (infosRcRca.categorie === ETypeFiche.RCA) {
    const decret = Decret.getDecretInscriptionRCA(decrets)?.libelle;
    paragrapheFin += `${decret},`;
  } else if (infosRcRca.categorie === ETypeFiche.RC) {
    const decret = Decret.getDecretInscriptionRC(decrets)?.libelle;
    paragrapheFin += `${decret},`;
  }

  if (infosRcRca.decision?.instructionProcureur) {
    const procureur = infosRcRca.decision?.instructionProcureur;

    paragrapheFin += ` et sur instruction du procureur de la République de ${procureur.ville}`;
    paragrapheFin += procureur.arrondissement ? ` ${LieuxUtils.formateArrondissement(procureur.arrondissement, true)}` : "";
    paragrapheFin += procureur.departement ? ` (${procureur.departement})` : "";

    const dateInstruction = DateUtils.getDateFormatJasper(DateUtils.getDateFromTimestamp(procureur.dateInstruction));

    paragrapheFin += ` (N° réf. ${procureur.numeroRef}) du ${dateInstruction},`;
  }

  const dateInscription = infosRcRca.dateInscription ? DateUtils.getDateFormatJasper(infosRcRca.dateInscription) : "";

  if (infosRcRca.categorie === ETypeFiche.RCA) {
    paragrapheFin += ` une inscription a été prise au répertoire civil annexe le ${dateInscription} sous la référence : RCA n°${infosRcRca.annee} - ${infosRcRca.numero}.`;
  } else if (infosRcRca.categorie === ETypeFiche.RC) {
    paragrapheFin += ` une inscription a été prise au répertoire civil le ${dateInscription} sous la référence : RC n°${infosRcRca.annee} - ${infosRcRca.numero}.`;
  }

  return paragrapheFin;
}

function addPhrase(phrase: string, phraseSuivante: string) {
  if (phrase === "") {
    return `${phraseSuivante}`;
  } else {
    return `${phrase}\n${phraseSuivante}`;
  }
}

function getPrenomsParents(data: IParent) {
  let prenoms = "";

  if (data.prenomsParents) {
    prenoms = triListeObjetsSurPropriete([...data.prenomsParents], "numeroOrdre")
      .map(prenom => prenom.valeur)
      .join(", ");
    prenoms += " ";
  }
  return prenoms;
}

function getLignesPrenomsNomNaissance(data: Interesse | IParent, isParent: boolean) {
  // Partie Prenoms/Nom
  const prenoms = isParent ? getPrenomsParents(data as IParent) : (data as Interesse).prenoms.concat(" ");

  let result = `${prenoms}${formatNom(data.nomFamille)}`;

  // Partie Naissance
  result = addPhrase(result, `Date de naissance: ${DateUtils.getDateFormatJasperFromCompose(data.dateNaissance)}`);
  result = addPhrase(
    result,
    `Lieu de naissance: ${LieuxUtils.getLieu(data.villeNaissance, data.regionNaissance, data.paysNaissance, data.arrondissementNaissance)}`
  );
  return result;
}

function getLignesParentsInteresse(data: IParent[]) {
  let parents = "";
  data.forEach(parent => {
    if (parents !== "") {
      parents = addPhrase(parents, "et");
    }
    parents = addPhrase(parents, getLignesPrenomsNomNaissance(parent, true));
  });
  return parents;
}

function getLignesInteresseDecision(data: Interesse, showDeces: boolean) {
  // Partie Prenoms/Nom/Naissance
  let interesse = `${getLignesPrenomsNomNaissance(data, false)}`;

  // Partie Deces
  if (showDeces && data.dateDeces) {
    interesse = addPhrase(interesse, `Date de décès: ${DateUtils.getDateFormatJasperFromCompose(data.dateDeces)}`);
    interesse = addPhrase(
      interesse,
      `Lieu de décès: ${LieuxUtils.getLieu(data.villeDeces, data.regionDeces, data.paysDeces, data.arrondissementDeces)}`
    );
  }

  // Partie Parents
  // Filtre pour n'afficher que les parents "adoptant" ou "adoptant conjoint du parent"
  const parents = data.parents?.filter(el => {
    return el.lienParente === ELienParente.PARENT_ADOPTANT || el.lienParente === ELienParente.ADOPTANT_CONJOINT_DU_PARENT;
  });
  if (parents && parents?.length > 0) {
    interesse = addPhrase(interesse, "par");
    interesse = addPhrase(interesse, getLignesParentsInteresse(parents));
  }
  return interesse;
}

function getLignesMariageInteresses(data: IMariageInteresse): string {
  let mariageInteresses = "\nmariés";

  mariageInteresses +=
    !data.aletranger && !LieuxUtils.estPaysFrance(data.paysMariage)
      ? ` devant les autorités consulaires de ${data.paysMariage} en France`
      : ` à ${LieuxUtils.getLieu(data.villeMariage, data.regionMariage, data.paysMariage, data.arrondissementMariage)}`;
  mariageInteresses += data.dateMariage.jour && data.dateMariage.mois && data.dateMariage.annee ? " le" : " en";
  mariageInteresses += ` ${DateUtils.getDateFormatJasperFromCompose(data.dateMariage)}`;
  return mariageInteresses;
}

export function getInteressesDecision(data: FicheRcRca): string {
  let interesses = "";

  const showDeces = data.categorie === ETypeFiche.RCA && data.decision?.type === ETypeDecision.ONAC;
  // Partie Interesses
  data.interesses.sort((n1, n2) => compareNombre(n1.numeroOrdreSaisi, n2.numeroOrdreSaisi));
  data.interesses.forEach(interesse => {
    if (interesses !== "") {
      interesses = addPhrase(interesses, "\net\n");
    }
    interesses = addPhrase(interesses, getLignesInteresseDecision(interesse, showDeces));
  });

  // Partie Mariage
  if (data.mariageInteresses) {
    interesses = addPhrase(interesses, getLignesMariageInteresses(data.mariageInteresses));
  }

  return interesses;
}
