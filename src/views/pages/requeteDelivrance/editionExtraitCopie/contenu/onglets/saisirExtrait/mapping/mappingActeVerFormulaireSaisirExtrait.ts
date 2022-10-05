import {
  AGE,
  ANNEE,
  ARRONDISSEMENT,
  DATE,
  DATE_EVENEMENT,
  DATE_NAISSANCE_OU_AGE_DE,
  DECLARATION_CONJOINTE,
  DERNIER_CONJOINT,
  ETRANGER_FRANCE,
  EVENEMENT,
  JOUR,
  LIEU_COMPLET,
  LIEU_EVENEMENT,
  LIEU_NAISSANCE,
  MOIS,
  NB_HEURE,
  NB_MINUTE,
  NOM_NAISSANCE,
  NOM_PARTIE1,
  NOM_PARTIE2,
  NOM_SECABLE,
  PARENT_NAISS,
  PARENT_NAISS1,
  PARENT_NAISS2,
  PAYS,
  PRENOMS,
  PRENOM_1,
  PRENOM_2,
  PRENOM_3,
  REGION_DEPARTEMENT,
  SECABLE,
  SEXE,
  TITULAIRE_EVT_1,
  TITULAIRE_EVT_2,
  TYPE,
  VILLE
} from "@composant/formulaire/ConstantesNomsForm";
import { IEvenement } from "@model/etatcivil/acte/IEvenement";
import { FicheActe, IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IFiliation } from "@model/etatcivil/acte/IFiliation";
import {
  ITitulaireActe,
  TitulaireActe
} from "@model/etatcivil/acte/ITitulaireActe";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { TypeDeclarationConjointe } from "@model/etatcivil/enum/TypeDeclarationConjointe";
import { getDateComposeFromDate, IDateCompose } from "@util/DateUtils";
import {
  ABSENCE_VALIDEE,
  DEUX,
  getValeurOuVide,
  numberToString,
  rempliAGaucheAvecZero,
  UN,
  ZERO
} from "@util/Utils";
import { FRANCE, LieuxUtils } from "@utilMetier/LieuxUtils";

export interface ISaisieExtraitForm {
  [EVENEMENT]?: IEvenementForm;
  [DERNIER_CONJOINT]?: IDernierConjointForm;
  [TITULAIRE_EVT_1]: ITitulaireEvtForm;
  [TITULAIRE_EVT_2]?: ITitulaireEvtForm;
}

export interface IDernierConjointForm {
  [NOM_NAISSANCE]: string;
  [PRENOMS]: string;
}
export interface IEvenementForm {
  [DATE_EVENEMENT]: IDateCompleteForm;
  [LIEU_EVENEMENT]: ILieuEvenementForm;
}

export interface ITitulaireEvtForm {
  [NOM_NAISSANCE]: string;
  [NOM_SECABLE]: INomSecableForm;
  [DECLARATION_CONJOINTE]: IDeclarationConjointeForm;
  [PRENOMS]: IPrenomsForm;
  [SEXE]?: string;
  [EVENEMENT]: IEvenementForm;
  [PARENT_NAISS1]: IParentNaissanceForm;
  [PARENT_NAISS2]: IParentNaissanceForm;
}

export interface INomSecableForm {
  [SECABLE]: string[];
  [NOM_PARTIE1]: string;
  [NOM_PARTIE2]: string;
}

export interface IDeclarationConjointeForm {
  [TYPE]: string;
  [DATE]: IDateJourMoisAnneForm;
}

export interface IDateCompleteForm {
  [JOUR]: string;
  [MOIS]: string;
  [ANNEE]: string;
  [NB_HEURE]?: string;
  [NB_MINUTE]?: string;
}

export interface IDateJourMoisAnneForm {
  [JOUR]: string;
  [MOIS]: string;
  [ANNEE]: string;
}

export interface IPrenomsForm {
  [PRENOM_1]: string;
  [PRENOM_2]: string;
  [PRENOM_3]: string;
}

export interface ILieuEvenementForm {
  [LIEU_COMPLET]: string;
  [VILLE]: string;
  [ARRONDISSEMENT]: string;
  [REGION_DEPARTEMENT]: string;
  [PAYS]: string;
  [ETRANGER_FRANCE]: string;
}

export interface IParentNaissanceForm {
  [NOM_NAISSANCE]: string;
  [PRENOMS]: IPrenomsForm;
  [SEXE]?: string;
  [DATE_NAISSANCE_OU_AGE_DE]: IDateNAissanceAgeDe;
  [LIEU_NAISSANCE]: ILieuEvenementForm;
}

export interface IDateNAissanceAgeDe {
  [AGE]: string;
  [DATE]: IDateJourMoisAnneForm;
}

export function mappingActeVerFormulaireSaisirExtrait(
  acte: IFicheActe,
  titulairesAMs: (ITitulaireActe | undefined)[]
): ISaisieExtraitForm {
  const titulairesActes = FicheActe.getTitulairesActeDansLOrdre(acte);

  // Titulaire 1
  const saisieForm: ISaisieExtraitForm = {
    [TITULAIRE_EVT_1]: saisieTitulaireEvtForm(
      titulairesAMs[0],
      FicheActe.estActeNaissance(acte)
        ? acte.evenement
        : titulairesActes.titulaireActe1.naissance
    )
  };

  if (!FicheActe.estActeNaissance(acte)) {
    // Evenement
    saisieForm[EVENEMENT] = {
      dateEvenement: saisieDateEvt(acte.evenement),
      lieuEvenement: saisieLieuEvt(acte.evenement)
    };

    saisieForm[DERNIER_CONJOINT] = {
      nomNaissance: getValeurOuVide(
        titulairesActes.titulaireActe1.nomDernierConjoint
      ),
      prenoms: getValeurOuVide(
        titulairesActes.titulaireActe1.prenomsDernierConjoint
      )
    };
  }

  // Parents titulaire 1
  TitulaireActe.getAuMoinsDeuxParentsDirects(
    titulairesActes.titulaireActe1
  ).forEach((parent: IFiliation, index: number) => {
    //@ts-ignore
    saisieForm[TITULAIRE_EVT_1][`${PARENT_NAISS}${index + 1}`] =
      saisieParentForm(parent);
  });

  // Titulaire 2 (cas mariage)
  if (titulairesActes.titulaireActe2) {
    saisieForm[TITULAIRE_EVT_2] = titulairesAMs[1]
      ? saisieTitulaireEvtForm(
          titulairesAMs[1],
          titulairesActes.titulaireActe2.naissance
        )
      : undefined;
    // TODO Parent du titulaire 2
  }

  return saisieForm;
}

function saisieParentForm(parent: IFiliation): IParentNaissanceForm {
  return {
    [NOM_NAISSANCE]: getValeurOuVide(parent?.nom),
    [PRENOMS]: saisiePrenomForm(parent?.prenoms),
    [DATE_NAISSANCE_OU_AGE_DE]: {
      [AGE]: getValeurOuVide(parent?.age),
      [DATE]: saisieDateEvt(parent?.naissance)
    },
    [SEXE]: parent?.sexe ? Sexe.getKey(parent.sexe) : Sexe.getKey(Sexe.INCONNU),
    [LIEU_NAISSANCE]: saisieLieuEvt(parent.naissance, false) // Pour les parents le lieu de naissance est france par défaut
  };
}

function saisieTitulaireEvtForm(
  titulaire?: ITitulaireActe,
  evenement?: IEvenement
): ITitulaireEvtForm {
  return {
    [NOM_NAISSANCE]: getValeurOuVide(titulaire?.nom),
    [NOM_SECABLE]: saisieNomSecable(titulaire),
    [DECLARATION_CONJOINTE]: saisieDeclarationConjointe(titulaire),
    [PRENOMS]: saisiePrenomForm(titulaire?.prenoms),
    [SEXE]: titulaire?.sexe
      ? Sexe.getKey(titulaire.sexe)
      : Sexe.getKey(Sexe.INCONNU),
    [EVENEMENT]: saisieDateLieuEvt(evenement)
  } as ITitulaireEvtForm;
}

function saisieDateLieuEvt(evenement?: IEvenement): IEvenementForm {
  return {
    [DATE_EVENEMENT]: saisieDateHeureEvt(evenement),
    [LIEU_EVENEMENT]: saisieLieuEvt(evenement)
  };
}

function saisiePrenomForm(prenoms?: string[]) {
  return {
    [PRENOM_1]: prenoms ? prenoms[ZERO] : "",
    [PRENOM_2]: prenoms ? prenoms[UN] : "",
    [PRENOM_3]: prenoms ? prenoms[DEUX] : ""
  };
}

function saisieNomSecable(titulaire?: ITitulaireActe) {
  return {
    [SECABLE]:
      titulaire?.nomPartie1 && titulaire?.nomPartie1 !== ABSENCE_VALIDEE
        ? ["true"]
        : [],
    [NOM_PARTIE1]:
      titulaire?.nomPartie1 === ABSENCE_VALIDEE
        ? ""
        : getValeurOuVide(titulaire?.nomPartie1),
    [NOM_PARTIE2]:
      titulaire?.nomPartie2 === ABSENCE_VALIDEE
        ? ""
        : getValeurOuVide(titulaire?.nomPartie2)
  };
}

function saisieDeclarationConjointe(titulaire?: ITitulaireActe) {
  const dateDeclarationConjointeCompose: IDateCompose = getDateComposeFromDate(
    titulaire?.dateDeclarationConjointe
  );
  return {
    [TYPE]: titulaire?.typeDeclarationConjointe
      ? TypeDeclarationConjointe.getKey(titulaire.typeDeclarationConjointe)
      : "",
    [DATE]: saisieDateForm(dateDeclarationConjointeCompose)
  };
}

function saisieDateHeureEvt(evenement?: IEvenement) {
  return {
    ...saisieDateEvt(evenement),
    [NB_HEURE]: getValeurOuVide(evenement?.heure),
    [NB_MINUTE]: getValeurOuVide(evenement?.minute)
  };
}

function saisieDateEvt(evenement?: IEvenement) {
  return saisieDateForm({
    jour: rempliAGaucheAvecZero(numberToString(evenement?.jour)),
    mois: rempliAGaucheAvecZero(numberToString(evenement?.mois)),
    annee: rempliAGaucheAvecZero(numberToString(evenement?.annee))
  });
}

function saisieDateForm(date?: IDateCompose) {
  return {
    [JOUR]: getValeurOuVide(date?.jour),
    [MOIS]: getValeurOuVide(date?.mois),
    [ANNEE]: getValeurOuVide(date?.annee)
  };
}

function saisieLieuEvt(
  evenement?: IEvenement,
  etrangerParDefaut = true
): ILieuEvenementForm {
  const pays =
    evenement?.pays ||
    (etrangerParDefaut || LieuxUtils.estVilleJerusalem(evenement?.ville)
      ? ""
      : FRANCE);
  return {
    [LIEU_COMPLET]: evenement?.lieuReprise
      ? getValeurOuVide(evenement?.lieuReprise)
      : LieuxUtils.getLocalisationEtrangerOuFrance(
          evenement?.ville,
          evenement?.region,
          pays,
          evenement?.arrondissement
        ),
    [VILLE]: getValeurOuVide(evenement?.ville),
    [ARRONDISSEMENT]: getValeurOuVide(evenement?.arrondissement),
    [REGION_DEPARTEMENT]: getValeurOuVide(evenement?.region),
    [PAYS]: getValeurOuVide(
      LieuxUtils.isPaysFrance(evenement?.pays) ? "" : evenement?.pays
    ),
    [ETRANGER_FRANCE]: getEtrangerOuFrance(evenement, etrangerParDefaut)
  };
}
function getEtrangerOuFrance(
  evenement?: IEvenement,
  etrangerParDefaut = true
): string {
  return LieuxUtils.getEtrangerOuFranceOuInconnuEnMajuscule(
    evenement,
    etrangerParDefaut
  );
}
