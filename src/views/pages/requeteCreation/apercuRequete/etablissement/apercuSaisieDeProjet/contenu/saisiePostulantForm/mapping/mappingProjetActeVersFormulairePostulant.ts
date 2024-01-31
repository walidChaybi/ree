import {
  ACQUISITION,
  ADOPTE_PAR,
  ADRESSE,
  AGE,
  ANALYSE_MARGINALE,
  ANNEE,
  ARRONDISSEMENT,
  ARRONDISSEMENT_NAISSANCE,
  AUTRES,
  AUTRE_DECLARANT,
  DATE,
  DATE_NAISSANCE,
  DECLARANT,
  DEPARTEMENT,
  DEPARTEMENT_NAISSANCE,
  ETAT_CANTON_PROVINCE,
  FRANCISATION_POSTULANT,
  IDENTITE,
  JOUR,
  LIEU_DE_NAISSANCE,
  MOIS,
  NATURE,
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
  PAYS,
  PAYS_NAISSANCE,
  PRENOM,
  PRENOMS,
  PROJET,
  RECONNAISSANCE,
  REGION_NAISSANCE,
  SECABLE,
  SEXE,
  TITULAIRE,
  TYPE,
  VILLE,
  VILLE_NAISSANCE
} from "@composant/formulaire/ConstantesNomsForm";
import { IAdresse } from "@model/etatcivil/acte/IAdresse";
import { IDeclarant } from "@model/etatcivil/acte/IDeclarant";
import { IDecretNaturalisation } from "@model/etatcivil/acte/IDecretNaturalisation";
import { IEvenement } from "@model/etatcivil/acte/IEvenement";
import { IProjetAnalyseMarginale } from "@model/etatcivil/acte/projetActe/IAnalyseMarginaleProjetActe";
import { IProjetFiliation } from "@model/etatcivil/acte/projetActe/IFiliationProjetActe";
import { IProjetActe } from "@model/etatcivil/acte/projetActe/IProjetActe";
import { ITitulaireProjetActe } from "@model/etatcivil/acte/projetActe/ITitulaireProjetActe";
import { EtrangerFrance } from "@model/etatcivil/enum/EtrangerFrance";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import {
  ISaisieAcquisitionSousForm,
  ISaisieAnalyseMarginale,
  ISaisieAutresSousForm,
  ISaisieDate,
  ISaisieDateNaissanceOuAgeDe,
  ISaisieLieuNaissance,
  ISaisieParentSousForm,
  ISaisiePostulantSousForm,
  ISaisiePrenoms,
  ISaisieProjetPostulantForm
} from "@model/form/creation/etablissement/ISaisiePostulantForm";
import { Prenoms } from "@model/form/delivrance/ISaisirRequetePageForm";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { QualiteFamille } from "@model/requete/enum/QualiteFamille";
import { TypeDeclarant } from "@model/requete/enum/TypeDeclarant";
import { TypeNature } from "@model/requete/enum/TypeNature";
import { TypeReconnaissance } from "@model/requete/enum/TypeReconnaissance";
import { getDateComposeFromDate } from "@util/DateUtils";
import {
  DEUX,
  SPC,
  UN,
  ZERO,
  formatPremieresLettresMajusculesNomCompose,
  getValeurOuVide,
  numberToString,
  rempliAGaucheAvecZero
} from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { ISaisieLieuNaissanceParent } from "./../../../../../../../../../model/form/creation/etablissement/ISaisiePostulantForm";
import { mapFrancisationPostulant } from "./mappingTitulaireVersFormulairePostulant";

export const mappingProjetActeVersFormulairePostulant = (
  titulaireRequete: ITitulaireRequeteCreation,
  projetActe?: IProjetActe
): ISaisieProjetPostulantForm => {
  const titulaireProjetActe = projetActe?.titulaires.find(
    titulaire => titulaire.ordre === UN
  );

  const parentUn = titulaireProjetActe?.filiations.find(
    parent => parent.ordre === UN
  );
  const parentDeux = titulaireProjetActe?.filiations.find(
    parent => parent.ordre === DEUX
  );

  const estOrdreInverseParentsFormulaire =
    (!parentUn || !Sexe.estMasculin(Sexe.getEnumFor(parentUn.sexe))) &&
    (!parentDeux || !Sexe.estFeminin(Sexe.getEnumFor(parentDeux.sexe)));

  return {
    [PROJET]: {
      [TYPE]: QualiteFamille.POSTULANT.libelle,
      [NATURE_ACTE]: projetActe?.nature || NatureActe.NAISSANCE.libelle
    },
    [TITULAIRE]: mapSaisiePostulant(
      titulaireProjetActe,
      projetActe?.analyseMarginales,
      projetActe?.evenement
    ),
    [FRANCISATION_POSTULANT]: mapFrancisationPostulant(titulaireRequete),
    [PARENTS]: {
      [PARENT1]: mapSaisieParent(
        estOrdreInverseParentsFormulaire ? parentDeux : parentUn
      ),
      [PARENT2]: mapSaisieParent(
        estOrdreInverseParentsFormulaire ? parentUn : parentDeux
      )
    },
    [AUTRES]: mapSaisieAutres(
      titulaireProjetActe?.domicile,
      projetActe?.declarant,
      projetActe?.titulaires[0].reconnuPar
    ),
    [ACQUISITION]: mapSaisieAcquisition(
      titulaireProjetActe?.decretNaturalisation
    )
  };
};

function mapSaisiePostulant(
  titulaire?: ITitulaireProjetActe,
  analysesMarginales?: IProjetAnalyseMarginale[],
  evenement?: IEvenement
): ISaisiePostulantSousForm {
  return {
    [NOM]: titulaire?.nom?.toUpperCase() || "",
    [NOM_SECABLE]: {
      [SECABLE]: titulaire?.nomPartie1 || titulaire?.nomPartie2 ? ["true"] : [],
      [NOM_PARTIE1]: titulaire?.nomPartie1 || "",
      [NOM_PARTIE2]: titulaire?.nomPartie2 || ""
    },
    [PRENOMS]: mapSaisiePrenoms(titulaire?.prenoms || []),
    [ANALYSE_MARGINALE]: mapAnalyseMarginale(analysesMarginales),
    [IDENTITE]: titulaire?.identiteAvantDecret || "",
    [SEXE]: titulaire?.sexe || "",
    [DATE_NAISSANCE]: mapSaisieDateNaissance(evenement),
    [LIEU_DE_NAISSANCE]: mapSaisieLieuNaissance(
      evenement,
      titulaire?.naissance?.neDansLeMariage
    ),
    [ADOPTE_PAR]:
      titulaire?.filiations.find(
        filiation => filiation.naissance?.neDansLeMariage
      )?.naissance?.neDansLeMariage || false
  };
}

function mapSaisieParent(
  parent?: IProjetFiliation
): ISaisieParentSousForm | undefined {
  return parent
    ? {
        [NOM]: getValeurOuVide(parent.nom).toUpperCase(),
        [PRENOM]: mapSaisiePrenoms(parent.prenoms || []),
        [SEXE]: parent.sexe,
        [DATE_NAISSANCE]: mapSaisieDateNaissanceEtAgeDe(
          parent.naissance || ({} as IEvenement),
          parent.age || undefined
        ),
        [LIEU_DE_NAISSANCE]: mapSaisieLieuNaissanceParent(
          parent.naissance || ({} as IEvenement)
        )
      }
    : {
        [NOM]: "",
        [PRENOM]: mapSaisiePrenoms([]),
        [SEXE]: "",
        [DATE_NAISSANCE]: mapSaisieDateNaissanceEtAgeDe(),
        [LIEU_DE_NAISSANCE]: mapSaisieLieuNaissanceParent()
      };
}

function mapSaisieAutres(
  domicile?: IAdresse,
  declarant?: IDeclarant | null,
  reconnuPar?: string
): ISaisieAutresSousForm {
  return {
    [ADRESSE]: EtrangerFrance.getKey(
      EtrangerFrance.getEnumFromPays(domicile?.pays)
    ),
    [VILLE]: formatPremieresLettresMajusculesNomCompose(domicile?.ville),
    [ARRONDISSEMENT]: domicile?.arrondissement || "",
    [DEPARTEMENT]: domicile?.region || "",
    [PAYS]: formatPremieresLettresMajusculesNomCompose(domicile?.pays),
    [RECONNAISSANCE]: TypeReconnaissance.getKey(
      TypeReconnaissance.getEnumFor(reconnuPar || "")
    ),
    [DECLARANT]: TypeDeclarant.getKey(
      TypeDeclarant.getEnumFor(declarant?.identiteDeclarant || "")
    ),
    [AUTRE_DECLARANT]: declarant?.complementDeclarant || ""
  };
}

function mapSaisieAcquisition(
  decretNaturalisation?: IDecretNaturalisation | null
): ISaisieAcquisitionSousForm {
  const dateCompose = getDateComposeFromDate(
    decretNaturalisation?.dateSignature
  );

  return {
    [NATURE]:
      decretNaturalisation && decretNaturalisation.natureDecret
        ? TypeNature.getKey(
            TypeNature.getEnumFor(decretNaturalisation.natureDecret)
          )
        : "",
    [DATE]: {
      [JOUR]: dateCompose.jour || "",
      [MOIS]: dateCompose.mois || "",
      [ANNEE]: dateCompose.annee || ""
    }
  };
}

function mapSaisiePrenoms(prenoms: string[]): ISaisiePrenoms {
  return {
    [PAS_DE_PRENOM_CONNU]:
      prenoms.length === ZERO || prenoms[ZERO] === SPC
        ? [PAS_DE_PRENOM_CONNU]
        : "false",
    [PRENOMS]: mapPrenoms(prenoms) || {}
  };
}

function mapPrenoms(prenoms?: string[]): Prenoms | undefined {
  return prenoms?.reduce(
    (valeursForm: Prenoms, prenomCourant: string, index: number) => ({
      ...valeursForm,
      [`prenom${index + UN}`]: prenomCourant
    }),
    {}
  );
}

function mapAnalyseMarginale(
  analysesMarginales?: IProjetAnalyseMarginale[]
): ISaisieAnalyseMarginale {
  let titulaire: ITitulaireProjetActe | undefined = undefined;
  if (analysesMarginales && analysesMarginales[0]?.titulaires) {
    titulaire = analysesMarginales[ZERO].titulaires[ZERO];
  }
  return {
    [NOM]: titulaire?.nom?.toUpperCase() || "",
    [PRENOMS]: mapPrenoms(titulaire?.prenoms) || {}
  };
}

function mapSaisieDateNaissance(naissance?: IEvenement): ISaisieDate {
  return {
    [JOUR]: rempliAGaucheAvecZero(numberToString(naissance?.jour)),
    [MOIS]: rempliAGaucheAvecZero(numberToString(naissance?.mois)),
    [ANNEE]: numberToString(naissance?.annee)
  };
}

function mapSaisieDateNaissanceEtAgeDe(
  evenement?: IEvenement,
  age?: number
): ISaisieDateNaissanceOuAgeDe {
  const mapSaisieNaissance = mapSaisieDateNaissance(evenement);
  return {
    [DATE]: mapSaisieNaissance
      ? {
          ...mapSaisieNaissance
        }
      : null,
    [AGE]: age ? `${age}` : ""
  };
}

function mapSaisieLieuNaissance(
  naissance?: IEvenement,
  neDansLeMariage = false
): ISaisieLieuNaissance {
  return {
    [VILLE_NAISSANCE]: formatPremieresLettresMajusculesNomCompose(
      naissance?.ville
    ),
    [ETAT_CANTON_PROVINCE]: formatPremieresLettresMajusculesNomCompose(
      naissance?.region
    ),
    [PAYS_NAISSANCE]: formatPremieresLettresMajusculesNomCompose(
      naissance?.pays
    ),
    [NE_DANS_MARIAGE]: neDansLeMariage ? "OUI" : "NON"
  };
}

function mapSaisieLieuNaissanceParent(
  naissance?: IEvenement
): ISaisieLieuNaissanceParent {
  const saisieLieuNaissanceParent = {
    [LIEU_DE_NAISSANCE]: "",
    [VILLE_NAISSANCE]: formatPremieresLettresMajusculesNomCompose(
      naissance?.ville
    ),
    [REGION_NAISSANCE]: "",
    [DEPARTEMENT_NAISSANCE]: "",
    [ARRONDISSEMENT_NAISSANCE]: "",
    [PAYS_NAISSANCE]: formatPremieresLettresMajusculesNomCompose(
      naissance?.pays
    )
  };

  if (LieuxUtils.estPaysFrance(naissance?.pays)) {
    saisieLieuNaissanceParent[LIEU_DE_NAISSANCE] = EtrangerFrance.getKey(
      EtrangerFrance.FRANCE
    );
    saisieLieuNaissanceParent[DEPARTEMENT_NAISSANCE] = naissance?.region || "";
    saisieLieuNaissanceParent[ARRONDISSEMENT_NAISSANCE] =
      naissance?.arrondissement || "";
  } else if (LieuxUtils.estPaysEtranger(naissance?.pays)) {
    saisieLieuNaissanceParent[LIEU_DE_NAISSANCE] = EtrangerFrance.getKey(
      EtrangerFrance.ETRANGER
    );
    saisieLieuNaissanceParent[REGION_NAISSANCE] = naissance?.region || "";
  } else {
    saisieLieuNaissanceParent[LIEU_DE_NAISSANCE] = EtrangerFrance.getKey(
      EtrangerFrance.INCONNU
    );
  }

  return saisieLieuNaissanceParent;
}
