import { Decret } from "../../../../../../../model/etatcivil/commun/IDecret";
import { LienParente } from "../../../../../../../model/etatcivil/enum/LienParente";
import {
  TypeDecision,
  TypeDecisionUtil
} from "../../../../../../../model/etatcivil/enum/TypeDecision";
import { TypeFiche } from "../../../../../../../model/etatcivil/enum/TypeFiche";
import { IFicheRcRca } from "../../../../../../../model/etatcivil/rcrca/IFicheRcRca";
import { IInteresse } from "../../../../../../../model/etatcivil/rcrca/IInteresse";
import { IMariageInteresse } from "../../../../../../../model/etatcivil/rcrca/IMariageInteresse";
import { IParent } from "../../../../../../../model/etatcivil/rcrca/IParent";
import { LieuxUtils } from "../../../../../../../model/LieuxUtils";
import {
  getDateFormatJasper,
  getDateFormatJasperFromCompose,
  getDateFromTimestamp
} from "../../../../../util/DateUtils";
import { storeRece } from "../../../../../util/storeRece";
import {
  enMajuscule,
  premiereLettreEnMajusculeLeResteEnMinuscule,
  triListeObjetsSurPropriete
} from "../../../../../util/Utils";

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

export function getDecisionJuridiction(
  infos: IFicheRcRca,
  dateDecision: string,
  localite: string
) {
  let decisionRecue = "";
  let typeDecision = "";

  switch (infos.decision?.type) {
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
  decisionRecue += `du ${infos.decision?.autorite.typeJuridiction} de ${localite}, `;
  decisionRecue += `en date du ${dateDecision}`;

  return decisionRecue;
}

export function getDecisionNotaire(
  infos: IFicheRcRca,
  dateDecision: string,
  localite: string
) {
  let decisionRecue = "";
  // décision de Notaire de type "Convention"
  if (infos.decision?.type === TypeDecision.CONVENTION) {
    decisionRecue = `Le service central d'état civil a reçu la convention déposée au rang des minutes de Maitre `;
  }
  // décision de Notaire de type "Requete"
  else if (infos.decision?.type === TypeDecision.REQUETE) {
    const localiteJuridictionExecutante = LieuxUtils.getLieu(
      infos.decision?.juridictionExecutante?.ville,
      infos.decision?.juridictionExecutante?.region,
      infos.decision?.juridictionExecutante?.pays,
      infos.decision?.juridictionExecutante?.arrondissement
    );
    decisionRecue = `Le service central d'état civil a reçu un extrait de la requête présentée auprès du ${infos.decision?.juridictionExecutante?.typeJuridiction} `;
    decisionRecue += `de ${localiteJuridictionExecutante} afin d'obtenir homologation de l'acte reçu par Maitre `;
  }
  // décision de Notaire autre que de type "Convention" ou "Requete"
  else {
    decisionRecue = `Le service central d'état civil a reçu un acte établi par Maitre `;
  }

  decisionRecue += `${infos.decision?.autorite.prenomNotaire} ${infos.decision?.autorite.nomNotaire}, `;
  decisionRecue += `notaire à ${localite}, `;

  if (infos.decision?.autorite.numeroCrpcen) {
    decisionRecue += `office notarial n°${infos.decision?.autorite.numeroCrpcen}, `;
  }

  decisionRecue += `le ${dateDecision}`;

  return decisionRecue;
}

export function getParagrapheFin(infosRcRca: IFicheRcRca) {
  let paragrapheFin = `Conformément à l'article`;

  if (infosRcRca.categorie === TypeFiche.RCA) {
    const decret = Decret.getDecretInscriptionRCA(storeRece.decrets)?.libelle;
    paragrapheFin += ` ${decret},`;
  } else if (infosRcRca.categorie === TypeFiche.RC) {
    const decret = Decret.getDecretInscriptionRC(storeRece.decrets)?.libelle;
    paragrapheFin += ` ${decret},`;
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

function addPhrase(phrase: string, phraseSuivante: string) {
  if (phrase === "") {
    return `${phraseSuivante}`;
  } else {
    return `${phrase}\n${phraseSuivante}`;
  }
}

function getLignesPrenomsNomNaissance(data: IInteresse | IParent) {
  // Partie Prenoms/Nom
  let prenoms = "";
  if (data.prenoms) {
    prenoms = triListeObjetsSurPropriete([...data.prenoms], "numeroOrdre")
      .map(prenom =>
        enMajuscule(prenom.valeur) === "SPC"
          ? "Sans prénom connu"
          : premiereLettreEnMajusculeLeResteEnMinuscule(prenom.valeur)
      )
      .join(", ");
    prenoms += " ";
  }
  let result = `${prenoms}${
    enMajuscule(data.nomFamille) === "SNP"
      ? "Sans nom patronymique"
      : enMajuscule(data.nomFamille)
  }`;

  // Partie Naissance
  result = addPhrase(
    result,
    `Date de naissance: ${getDateFormatJasperFromCompose(data.dateNaissance)}`
  );
  result = addPhrase(
    result,
    `Lieu de naissance: ${LieuxUtils.getLieu(
      data.villeNaissance,
      data.regionNaissance,
      data.paysNaissance,
      data.arrondissementNaissance
    )}`
  );
  return result;
}

function getLignesParentsInteresse(data: IParent[]) {
  let parents = "";
  data.forEach(parent => {
    if (parents !== "") {
      parents = addPhrase(parents, "et");
    }
    parents = addPhrase(parents, getLignesPrenomsNomNaissance(parent));
  });
  return parents;
}

function getLignesInteresseDecision(data: IInteresse, showDeces: boolean) {
  // Partie Prenoms/Nom/Naissance
  let interesse = `${getLignesPrenomsNomNaissance(data)}`;

  // Partie Deces
  if (showDeces && data.dateDeces) {
    interesse = addPhrase(
      interesse,
      `Date de décès: ${getDateFormatJasperFromCompose(data.dateDeces)}`
    );
    interesse = addPhrase(
      interesse,
      `Lieu de décès: ${LieuxUtils.getLieu(
        data.villeDeces,
        data.regionDeces,
        data.paysDeces,
        data.arrondissementDeces
      )}`
    );
  }

  // Partie Parents
  // Filtre pour n'afficher que les parents "adoptant" ou "adoptant conjoint du parent"
  const parents = data.parents?.filter(el => {
    return (
      el.lienParente === LienParente.ADOPTANT ||
      el.lienParente === LienParente.ADOPTANT_CONJOINT_DU_PARENT
    );
  });
  if (parents && parents?.length > 0) {
    interesse = addPhrase(interesse, "par");
    interesse = addPhrase(interesse, getLignesParentsInteresse(parents));
  }
  return interesse;
}

function getLignesMariageInteresses(data: IMariageInteresse) {
  let mariageInteresses = "Mariés";

  mariageInteresses +=
    !data.aletranger && !LieuxUtils.isPaysFrance(data.paysMariage)
      ? ` devant les autorités consulaires de ${data.paysMariage} en France`
      : ` à ${LieuxUtils.getLieu(
          data.villeMariage,
          data.regionMariage,
          data.paysMariage,
          data.arrondissementMariage
        )}`;
  mariageInteresses +=
    data.dateMariage.jour && data.dateMariage.mois && data.dateMariage.annee
      ? " le"
      : " en";
  mariageInteresses += ` ${getDateFormatJasperFromCompose(data.dateMariage)}`;
  return mariageInteresses;
}

export function getInteressesDecision(data: IFicheRcRca) {
  let interesses = "";

  const showDeces =
    data.categorie === TypeFiche.RCA &&
    data.decision?.type === TypeDecision.ONAC;
  // Partie Interesses
  data.interesses.forEach(interesse => {
    if (interesses !== "") {
      interesses = addPhrase(interesses, "et");
    }
    interesses = addPhrase(
      interesses,
      getLignesInteresseDecision(interesse, showDeces)
    );
  });

  // Partie Mariage
  if (data.mariageInteresses) {
    interesses = addPhrase(
      interesses,
      getLignesMariageInteresses(data.mariageInteresses)
    );
  }

  return interesses;
}
