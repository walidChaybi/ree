import {
  ADOPTE_PAR,
  ANALYSE_MARGINALE,
  ANNEE,
  DATE_NAISSANCE,
  ETAT_CANTON_PROVINCE,
  IDENTITE,
  JOUR,
  LIEU_DE_NAISSANCE,
  MOIS,
  NATURE_ACTE,
  NE_DANS_MARIAGE,
  NOM,
  NOM_PARTIE1,
  NOM_PARTIE2,
  NOM_SECABLE,
  PAS_DE_PRENOM_CONNU,
  PAYS_NAISSANCE,
  PRENOM,
  PRENOMS,
  PROJET,
  SECABLE,
  SEXE,
  TITULAIRE,
  TYPE,
  VILLE_NAISSANCE
} from "@composant/formulaire/ConstantesNomsForm";
import { IPrenomOrdonnes } from "@model/requete/IPrenomOrdonnes";
import { IRetenueSdanf } from "@model/requete/IRetenueSdanf";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { NatureProjetEtablissement } from "@model/requete/enum/NatureProjetEtablissement";
import { QualiteFamille } from "@model/requete/enum/QualiteFamille";
import { getPrenomsOrdonneVersPrenomsDefaultValues } from "@pages/requeteDelivrance/saisirRequete/hook/mappingCommun";
import {
  formatMajusculesMinusculesMotCompose,
  formatPremieresLettresMajusculesNomCompose,
  getValeurOuVide,
  numberToString,
  rempliAGaucheAvecZero
} from "@util/Utils";

export function mappingTitulaireVersSaisieProjetPostulant(
  titulaire: ITitulaireRequeteCreation
) {
  return {
    [PROJET]: mapSaisieProjet(titulaire),
    [TITULAIRE]: mapSaisiePostulant(titulaire)
  };
}

export function estJourMoisVide(retenueSdanf?: IRetenueSdanf) {
  return (
    !retenueSdanf?.jourNaissance &&
    !retenueSdanf?.moisNaissance &&
    !!retenueSdanf?.anneeNaissance
  );
}

export function getPrenomsNonFrancises(prenoms: IPrenomOrdonnes[] = []) {
  return prenoms.filter(prenom => !prenom.estPrenomFrRetenuSdanf);
}

export function getPrenomsFrancises(prenoms: IPrenomOrdonnes[] = []) {
  return prenoms.filter(prenom => prenom.estPrenomFrRetenuSdanf);
}

function mapSaisieProjet(titulaire: ITitulaireRequeteCreation) {
  return {
    [TYPE]: getValeurOuVide(
      QualiteFamille.getEnumFromTitulaire(titulaire)?.libelle
    ),
    [NATURE_ACTE]: NatureProjetEtablissement.NAISSANCE.libelle
  };
}

function mapSaisiePostulant(titulaire: ITitulaireRequeteCreation) {
  const retenueSdanf = titulaire.retenueSdanf || {};
  const nom = getValeurOuVide(retenueSdanf.nomNaissance);
  return {
    [NOM]: nom.toUpperCase(),
    [NOM_SECABLE]: mapSaisieNomSecable(),
    [PRENOM]: mapSaisiePrenoms(retenueSdanf.prenomsRetenu || []),
    [ANALYSE_MARGINALE]: mapAnalyseMarginale(retenueSdanf),
    [IDENTITE]: "",
    [SEXE]: titulaire.sexe,
    [DATE_NAISSANCE]: mapSaisieDateNaissance(retenueSdanf),
    [LIEU_DE_NAISSANCE]: mapSaisieLieuNaissance(retenueSdanf),
    [ADOPTE_PAR]: []
  };
}

function mapSaisieNomSecable() {
  return {
    [SECABLE]: [],
    [NOM_PARTIE1]: "",
    [NOM_PARTIE2]: ""
  };
}

function mapSaisiePrenoms(prenoms: IPrenomOrdonnes[]) {
  prenoms = formatPrenoms(getPrenomsNonFrancises(prenoms));
  return {
    [PAS_DE_PRENOM_CONNU]:
      prenoms.length === 0 ? [PAS_DE_PRENOM_CONNU] : "false",
    [PRENOMS]: getPrenomsOrdonneVersPrenomsDefaultValues(prenoms)
  };
}

function mapAnalyseMarginale(retenueSdanf: IRetenueSdanf) {
  const nom =
    retenueSdanf.nomDemandeFrancisation ||
    getValeurOuVide(retenueSdanf.nomNaissance);
  let prenoms = getPrenomsFrancises(retenueSdanf.prenomsRetenu);
  if (prenoms.length === 0) {
    prenoms = getPrenomsNonFrancises(retenueSdanf.prenomsRetenu);
  }
  prenoms = formatPrenoms(prenoms);
  return {
    [NOM]: nom.toUpperCase(),
    [PRENOMS]: getPrenomsOrdonneVersPrenomsDefaultValues(prenoms)
  };
}

function mapSaisieDateNaissance(retenueSdanf: IRetenueSdanf) {
  let mois;
  let jour;
  if (estJourMoisVide(retenueSdanf)) {
    jour = "31";
    mois = "12";
  } else {
    jour = numberToString(retenueSdanf.jourNaissance);
    mois = numberToString(retenueSdanf.moisNaissance);
  }
  return {
    [JOUR]: rempliAGaucheAvecZero(jour),
    [MOIS]: rempliAGaucheAvecZero(mois),
    [ANNEE]: numberToString(retenueSdanf.anneeNaissance)
  };
}

function mapSaisieLieuNaissance(retenueSdanf: IRetenueSdanf) {
  return {
    [VILLE_NAISSANCE]: formatPremieresLettresMajusculesNomCompose(
      retenueSdanf.villeEtrangereNaissance
    ),
    [ETAT_CANTON_PROVINCE]: "",
    [PAYS_NAISSANCE]: formatPremieresLettresMajusculesNomCompose(
      retenueSdanf.paysNaissance
    ),
    [NE_DANS_MARIAGE]: "NON"
  };
}

function formatPrenoms(prenoms: IPrenomOrdonnes[]) {
  return prenoms.map(prenom => ({
    prenom: formatMajusculesMinusculesMotCompose(prenom.prenom),
    numeroOrdre: prenom.numeroOrdre
  }));
}