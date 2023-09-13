import {
  ADOPTE_PAR,
  AGE,
  ANALYSE_MARGINALE,
  ANNEE,
  ARRONDISSEMENT_NAISSANCE,
  DATE,
  DATE_NAISSANCE,
  DEPARTEMENT_NAISSANCE,
  ETAT_CANTON_PROVINCE,
  FRANCISATION_POSTULANT,
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
  PARENT1,
  PARENT2,
  PARENTS,
  PAS_DE_PRENOM_CONNU,
  PAYS_NAISSANCE,
  PRENOM,
  PRENOMS,
  PROJET,
  REGION_NAISSANCE,
  SECABLE,
  SEXE,
  TITULAIRE,
  TYPE,
  VILLE_NAISSANCE
} from "@composant/formulaire/ConstantesNomsForm";
import { EtrangerFrance } from "@model/etatcivil/enum/EtrangerFrance";
import {
  ISaisieAnalyseMarginale,
  ISaisieDateNaissance,
  ISaisieDateNaissanceOuAgeDe,
  ISaisieFrancisationPostulantSousForm,
  ISaisieLieuNaissance,
  ISaisieLieuNaissanceParent,
  ISaisieNomSecable,
  ISaisiePostulantSousForm,
  ISaisiePrenoms,
  ISaisieProjetPostulantForm,
  ISaisieProjetSousForm
} from "@model/form/creation/etablissement/ISaisiePostulantForm";
import { NatureProjetEtablissement } from "@model/requete/enum/NatureProjetEtablissement";
import { QualiteFamille } from "@model/requete/enum/QualiteFamille";
import { IPrenomOrdonnes } from "@model/requete/IPrenomOrdonnes";
import { IRetenueSdanf } from "@model/requete/IRetenueSdanf";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { getPrenomsOrdonneVersPrenomsDefaultValues } from "@pages/requeteDelivrance/saisirRequete/hook/mappingCommun";
import {
  formatMajusculesMinusculesMotCompose,
  formatPremieresLettresMajusculesNomCompose,
  getValeurOuVide,
  joint,
  numberToString,
  rempliAGaucheAvecZero
} from "@util/Utils";
import {
  estJourMoisVide,
  filtrePrenomsFrancises,
  filtrePrenomsNonFrancises,
  getNomSecable
} from "../SaisiePostulantFormUtils";

export function mappingTitulairesVersSaisieProjetPostulant(
  titulaire: ITitulaireRequeteCreation,
  parentsTitulaire: ITitulaireRequeteCreation[]
): ISaisieProjetPostulantForm {
  return {
    [PROJET]: mapSaisieProjet(titulaire),
    [TITULAIRE]: mapSaisiePostulant(titulaire),
    [FRANCISATION_POSTULANT]: mapFrancisationPostulant(titulaire),
    [PARENTS]: {
      [PARENT1]: mapSaisieParent(parentsTitulaire[0]),
      [PARENT2]: mapSaisieParent(parentsTitulaire[1])
    }
  };
}

function mapSaisieProjet(
  titulaire: ITitulaireRequeteCreation
): ISaisieProjetSousForm {
  return {
    [TYPE]: getValeurOuVide(
      QualiteFamille.getEnumFromTitulaire(titulaire)?.libelle
    ),
    [NATURE_ACTE]: NatureProjetEtablissement.NAISSANCE.libelle
  };
}

function mapSaisiePostulant(
  titulaire: ITitulaireRequeteCreation
): ISaisiePostulantSousForm {
  const retenueSdanf = titulaire.retenueSdanf || {};
  const nom = getValeurOuVide(retenueSdanf.nomNaissance);
  return {
    [NOM]: nom.toUpperCase(),
    [NOM_SECABLE]: mapSaisieNomSecable(retenueSdanf),
    [PRENOMS]: mapSaisiePrenoms(retenueSdanf.prenomsRetenu || []),
    [ANALYSE_MARGINALE]: mapAnalyseMarginale(retenueSdanf),
    [IDENTITE]: "",
    [SEXE]: titulaire.sexe,
    [DATE_NAISSANCE]: mapSaisieDateNaissance(retenueSdanf),
    [LIEU_DE_NAISSANCE]: mapSaisieLieuNaissance(retenueSdanf),
    [ADOPTE_PAR]: []
  };
}

function mapFrancisationPostulant(
  titulaire: ITitulaireRequeteCreation
): ISaisieFrancisationPostulantSousForm {
  const nomFrancise = titulaire.retenueSdanf?.nomDemandeFrancisation;

  // TODO: A modifier lorsque le refacto sur les deux listes de prénoms francisés / non-francisés renvoyé par le back aura été fait.
  const prenomsFrancises = filtrePrenomsFrancises(
    titulaire.retenueSdanf?.prenomsRetenu
  );
  const prenomsNonFrancises = filtrePrenomsNonFrancises(
    titulaire.retenueSdanf?.prenomsRetenu
  );
  const prenoms = joint(
    prenomsNonFrancises.map(
      prenomNonFrancise =>
        prenomsFrancises.find(
          prenomFrancise =>
            prenomFrancise.numeroOrdre === prenomNonFrancise.numeroOrdre
        )?.prenom || prenomNonFrancise.prenom
    )
  );

  return {
    [NOM]: nomFrancise,
    [PRENOMS]: prenoms
  };
}

function mapSaisieParent(parent: ITitulaireRequeteCreation) {
  const retenueSdanf = parent.retenueSdanf || {};
  const nom = getValeurOuVide(retenueSdanf.nomNaissance).toUpperCase();
  return {
    [NOM]: nom,
    [PRENOM]: mapSaisiePrenoms(retenueSdanf.prenomsRetenu || []),
    [SEXE]: parent.sexe,
    [DATE_NAISSANCE]: mapSaisieDateNaissanceEtAgeDe(retenueSdanf),
    [LIEU_DE_NAISSANCE]: mapSaisieLieuNaissanceParent(retenueSdanf)
  };
}

function mapSaisieNomSecable(retenueSdanf: IRetenueSdanf): ISaisieNomSecable {
  const nomSecable = getNomSecable(retenueSdanf);
  return {
    [SECABLE]: nomSecable.nomPartie1 ? ["true"] : [],
    [NOM_PARTIE1]: nomSecable.nomPartie1,
    [NOM_PARTIE2]: nomSecable.nomPartie2
  };
}

function mapSaisiePrenoms(prenoms: IPrenomOrdonnes[]): ISaisiePrenoms {
  prenoms = formatPrenoms(filtrePrenomsNonFrancises(prenoms));
  return {
    [PAS_DE_PRENOM_CONNU]:
      prenoms.length === 0 ? [PAS_DE_PRENOM_CONNU] : "false",
    [PRENOMS]: getPrenomsOrdonneVersPrenomsDefaultValues(prenoms)
  };
}

function mapAnalyseMarginale(
  retenueSdanf: IRetenueSdanf
): ISaisieAnalyseMarginale {
  const nom =
    retenueSdanf.nomDemandeFrancisation ||
    getValeurOuVide(retenueSdanf.nomNaissance);
  let prenoms = filtrePrenomsFrancises(retenueSdanf.prenomsRetenu);
  if (prenoms.length === 0) {
    prenoms = filtrePrenomsNonFrancises(retenueSdanf.prenomsRetenu);
  }
  prenoms = formatPrenoms(prenoms);
  return {
    [NOM]: nom.toUpperCase(),
    [PRENOMS]: getPrenomsOrdonneVersPrenomsDefaultValues(prenoms)
  };
}

function mapSaisieDateNaissance(
  retenueSdanf: IRetenueSdanf
): ISaisieDateNaissance {
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

function mapSaisieDateNaissanceEtAgeDe(
  retenueSdanf: IRetenueSdanf
): ISaisieDateNaissanceOuAgeDe {
  const mapSaisieNaissance = mapSaisieDateNaissance(retenueSdanf);
  return {
    [DATE]: {
      ...mapSaisieNaissance
    },
    // TODO: remplir avec les données nécéssaires pour le calcul de l'age
    [AGE]: ""
  };
}

function mapSaisieLieuNaissance(
  retenueSdanf: IRetenueSdanf
): ISaisieLieuNaissance {
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

function mapSaisieLieuNaissanceParent(
  retenueSdanf: IRetenueSdanf
): ISaisieLieuNaissanceParent {
  return {
    [LIEU_DE_NAISSANCE]: EtrangerFrance.getEnumFromPays(
      retenueSdanf.paysNaissance
    ).libelle.toUpperCase(),
    [VILLE_NAISSANCE]: formatPremieresLettresMajusculesNomCompose(
      retenueSdanf.villeNaissance
    ),
    [ARRONDISSEMENT_NAISSANCE]: "",
    [DEPARTEMENT_NAISSANCE]: "",
    [REGION_NAISSANCE]: "",
    [PAYS_NAISSANCE]: formatPremieresLettresMajusculesNomCompose(
      retenueSdanf.paysNaissance
    )
  };
}

function formatPrenoms(prenoms: IPrenomOrdonnes[]): IPrenomOrdonnes[] {
  return prenoms.map(prenom => ({
    prenom: formatMajusculesMinusculesMotCompose(prenom.prenom),
    numeroOrdre: prenom.numeroOrdre
  }));
}
