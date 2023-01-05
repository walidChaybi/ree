import {
  ADOPTE_PAR,
  AGE,
  ANNEE,
  ARRONDISSEMENT,
  CONTRAT_MARIAGE,
  DATE,
  DATE_EVENEMENT,
  DATE_NAISSANCE_OU_AGE_DE,
  DECLARATION_CONJOINTE,
  DERNIER_CONJOINT,
  DONNEES_COMPLEMENTAIRES_PLURILINGUE,
  ETRANGER_FRANCE,
  EVENEMENT,
  EXISTENCE,
  JOUR,
  LIEU_COMPLET,
  LIEU_EVENEMENT,
  LIEU_NAISSANCE,
  MOIS,
  NB_HEURE,
  NB_MINUTE,
  NOM_APRES_MARIAGE_EPOUSE,
  NOM_APRES_MARIAGE_EPOUX,
  NOM_NAISSANCE,
  NOM_PARTIE1,
  NOM_PARTIE2,
  NOM_SECABLE,
  PARENT_ADOPTANT_NAISS,
  PARENT_ADOPTANT_NAISS1,
  PARENT_ADOPTANT_NAISS2,
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
  TEXTE,
  TITULAIRE_EVT_1,
  TITULAIRE_EVT_2,
  TYPE,
  VILLE,
  VILLE_EST_AFFICHEE
} from "@composant/formulaire/ConstantesNomsForm";
import { IDetailMariage } from "@model/etatcivil/acte/IDetailMariage";
import { Evenement, IEvenement } from "@model/etatcivil/acte/IEvenement";
import { FicheActe, IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IFiliation } from "@model/etatcivil/acte/IFiliation";
import {
  ITitulaireActe,
  TitulaireActe
} from "@model/etatcivil/acte/ITitulaireActe";
import { ExistenceContratMariage } from "@model/etatcivil/enum/ExistenceContratMariage";
import { LienParente } from "@model/etatcivil/enum/LienParente";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
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
  [DONNEES_COMPLEMENTAIRES_PLURILINGUE]?: IDonneesComplementairesPlurilingueForm;
}

export interface IDernierConjointForm {
  [NOM_NAISSANCE]: string;
  [PRENOMS]: string;
}
export interface IEvenementForm {
  [DATE_EVENEMENT]?: IDateCompleteForm;
  [DATE_NAISSANCE_OU_AGE_DE]?: IDateNaissanceAgeDe;
  [LIEU_EVENEMENT]?: ILieuEvenementForm;
  [CONTRAT_MARIAGE]?: IContratMariageForm;
}

export interface IContratMariageForm {
  [EXISTENCE]?: string;
  [TEXTE]?: string;
}

export interface ITitulaireEvtForm {
  [NOM_NAISSANCE]: string;
  [NOM_SECABLE]: INomSecableForm;
  [DECLARATION_CONJOINTE]: IDeclarationConjointeForm;
  [PRENOMS]: IPrenomsForm;
  [SEXE]?: string;
  [EVENEMENT]: IEvenementForm;
  [ADOPTE_PAR]?: string[];
  [PARENT_NAISS1]: IParentNaissanceForm;
  [PARENT_NAISS2]: IParentNaissanceForm;
  [PARENT_ADOPTANT_NAISS1]: IParentNaissanceForm;
  [PARENT_ADOPTANT_NAISS2]: IParentNaissanceForm;
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
  [VILLE_EST_AFFICHEE]?: boolean;
}

export interface IParentNaissanceForm {
  [NOM_NAISSANCE]: string;
  [PRENOMS]: IPrenomsForm;
  [SEXE]?: string;
  [DATE_NAISSANCE_OU_AGE_DE]: IDateNaissanceAgeDe;
  [LIEU_NAISSANCE]: ILieuEvenementForm;
}

export interface IDateNaissanceAgeDe {
  [AGE]: string;
  [DATE]: IDateJourMoisAnneForm;
}

export interface IDonneesComplementairesPlurilingueForm {
  [NOM_APRES_MARIAGE_EPOUX]?: string;
  [NOM_APRES_MARIAGE_EPOUSE]?: string;
}

export function mappingActeVerFormulaireSaisirExtrait(
  acte: IFicheActe,
  titulairesAMs: (ITitulaireActe | undefined)[]
): ISaisieExtraitForm {
  const titulairesActes = FicheActe.getTitulairesActeDansLOrdre(acte);
  // Titulaire 1
  const saisieForm: ISaisieExtraitForm = {
    [TITULAIRE_EVT_1]: saisieTitulaireEvtForm(
      acte.nature,
      titulairesAMs[0],
      FicheActe.estActeNaissance(acte)
        ? acte.evenement
        : titulairesActes.titulaireActe1.naissance
    )
  };

  // Evenement (ne sert que pour les actes de décès et mariage)
  saisieForm[EVENEMENT] = {
    dateEvenement: saisieDateEvt(acte.evenement),
    lieuEvenement: saisieLieuEvt(acte.evenement),
    contratMariage: saisieContratMariage(acte.detailMariage)
  };

  // Dernier conjoint (ne sert que pour les actes de décès)
  saisieForm[DERNIER_CONJOINT] = {
    nomNaissance: getValeurOuVide(
      titulairesActes.titulaireActe1.nomDernierConjoint
    ),
    prenoms: getValeurOuVide(
      titulairesActes.titulaireActe1.prenomsDernierConjoint
    )
  };

  // Parents titulaire 1
  saisieForm[TITULAIRE_EVT_1] = {
    ...saisieForm[TITULAIRE_EVT_1],
    ...saisieParentsForm(titulairesActes.titulaireActe1, acte.nature),
    ...saisieParentsAdoptantsForm(titulairesActes.titulaireActe1)
  };

  // Titulaire 2 (cas mariage)
  if (FicheActe.estActeMariage(acte) && titulairesActes.titulaireActe2) {
    saisieForm[TITULAIRE_EVT_2] = titulairesAMs[1]
      ? saisieTitulaireEvtForm(
          acte.nature,
          titulairesAMs[1],
          titulairesActes.titulaireActe2.naissance
        )
      : undefined;
    // Parents titulaire 2
    saisieForm[TITULAIRE_EVT_2] = {
      ...saisieForm[TITULAIRE_EVT_2],
      ...saisieParentsForm(titulairesActes.titulaireActe2, acte.nature),
      ...saisieParentsAdoptantsForm(titulairesActes.titulaireActe2)
    };
  }

  //Données complémetaires plurilingues (ne sert que pour les actes de mariage dans le cas d'un document plurilingue)
  saisieForm[DONNEES_COMPLEMENTAIRES_PLURILINGUE] =
    saisieDonneesComplementairesPlurilingues(acte);

  return saisieForm;
}

function saisieDonneesComplementairesPlurilingues(
  acte: IFicheActe
): IDonneesComplementairesPlurilingueForm {
  const titulaireMasculin = FicheActe.getTitulaireMasculin(acte);
  const titulaireFeminin = FicheActe.getTitulaireFeminin(acte);

  return {
    [NOM_APRES_MARIAGE_EPOUX]: getValeurOuVide(
      titulaireMasculin?.nomApresMariage
    ),
    [NOM_APRES_MARIAGE_EPOUSE]: getValeurOuVide(
      titulaireFeminin?.nomApresMariage
    )
  };
}

function saisieParentsForm(
  titulaireActe: ITitulaireActe,
  natureActe: NatureActe
): any {
  const parents = {};
  TitulaireActe.getAuMoinsDeuxParentsDirects(titulaireActe).forEach(
    (parent: IFiliation, index: number) => {
      //@ts-ignore
      parents[`${PARENT_NAISS}${index + 1}`] = saisieParentForm(
        parent,
        natureActe
      );
    }
  );
  return parents;
}

function saisieParentsAdoptantsForm(titulaireActe: ITitulaireActe): any {
  const parentsAdoptants = {
    [PARENT_ADOPTANT_NAISS1]: {
      nomNaissance: "",
      prenoms: saisiePrenomForm([])
    },
    [PARENT_ADOPTANT_NAISS2]: {
      nomNaissance: "",
      prenoms: saisiePrenomForm([])
    }
  };
  TitulaireActe.getDeuxParentsAdoptantsOuVide(titulaireActe).forEach(
    (parentAdoptant: IFiliation, index: number) => {
      //@ts-ignore
      parentsAdoptants[`${PARENT_ADOPTANT_NAISS}${index + 1}`] =
        saisieParentForm(parentAdoptant);
    }
  );
  return parentsAdoptants;
}

export function saisieParentPaysInconnu(
  natureActe?: NatureActe,
  parent?: IFiliation
): boolean {
  if (parent?.naissance && parent?.lienParente === LienParente.PARENT) {
    return (
      LieuxUtils.estPaysInconnu(parent?.naissance.pays) &&
      NatureActe.NAISSANCE === natureActe
    );
  } else {
    return false;
  }
}

function saisieParentForm(
  parent?: IFiliation,
  natureActe?: NatureActe
): IParentNaissanceForm {
  const estNaissancePaysInconnu = saisieParentPaysInconnu(natureActe, parent);
  return {
    [NOM_NAISSANCE]: getValeurOuVide(parent?.nom),
    [PRENOMS]: saisiePrenomForm(parent?.prenoms),
    [DATE_NAISSANCE_OU_AGE_DE]: saisieDateOuAgeDe(
      parent?.naissance,
      parent?.age
    ),
    [SEXE]: parent?.sexe ? Sexe.getKey(parent.sexe) : Sexe.getKey(Sexe.INCONNU),
    [LIEU_NAISSANCE]: saisieLieuEvt(
      parent?.naissance,
      false,
      estNaissancePaysInconnu
    ) // Pour les parents le lieu de naissance est france par défaut
  };
}

function saisieDateOuAgeDe(
  dateEvt?: IEvenement,
  age?: number
): IDateNaissanceAgeDe {
  return {
    [AGE]: Evenement.estPartiellementRenseigne(dateEvt)
      ? ""
      : getValeurOuVide(age),
    [DATE]: saisieDateEvt(dateEvt)
  };
}

function saisieTitulaireEvtForm(
  natureActe: NatureActe,
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
    [EVENEMENT]: saisieDateAgeDeLieuEvt(
      natureActe,
      evenement,
      titulaire?.age,
      titulaire,
      natureActe === NatureActe.NAISSANCE
    ),
    [ADOPTE_PAR]: TitulaireActe.ilExisteUnParentAdoptant(titulaire)
      ? ["true"]
      : []
  } as ITitulaireEvtForm;
}

function saisieDateAgeDeLieuEvt(
  natureActe: NatureActe,
  evenement?: IEvenement,
  age?: number,
  titulaire?: ITitulaireActe,
  etrangerParDefaut = true
): IEvenementForm {
  const estNaissancePaysInconnu = saisiePaysInconnuTitulaire(
    natureActe,
    titulaire
  );
  return {
    // Pour la naissance la date contient également l'heure, pour le décès il n'a pas d'heure
    //  (pour le mariage c'est "DATE_NAISSANCE_OU_AGE_DE" qui est utilisé: voir ci-dessous)
    [DATE_EVENEMENT]: saisieDateHeureEvt(evenement),
    // Pour le mariage la date de naissance est suivi du champ "Agé de"
    [DATE_NAISSANCE_OU_AGE_DE]: saisieDateOuAgeDe(evenement, age),
    [LIEU_EVENEMENT]: saisieLieuEvt(
      evenement,
      etrangerParDefaut,
      estNaissancePaysInconnu
    )
  };
}

export function saisiePaysInconnuTitulaire(
  natureActe: NatureActe,
  titulaire?: ITitulaireActe
): boolean {
  return (
    LieuxUtils.estPaysInconnu(titulaire?.naissance?.pays) &&
    (NatureActe.MARIAGE === natureActe || NatureActe.DECES === natureActe)
  );
}

function saisiePrenomForm(prenoms?: string[]) {
  return {
    [PRENOM_1]: prenoms ? getValeurOuVide(prenoms[ZERO]) : "",
    [PRENOM_2]: prenoms ? getValeurOuVide(prenoms[UN]) : "",
    [PRENOM_3]: prenoms ? getValeurOuVide(prenoms[DEUX]) : ""
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
  etrangerParDefaut = true,
  estNaissancePaysInconnu = false
): ILieuEvenementForm {
  let pays;
  if (estNaissancePaysInconnu) {
    pays = "";
  } else {
    pays =
      evenement?.pays ||
      (etrangerParDefaut || LieuxUtils.estVilleJerusalem(evenement?.ville)
        ? ""
        : FRANCE);
  }

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
      LieuxUtils.estPaysFrance(evenement?.pays) || estNaissancePaysInconnu
        ? ""
        : evenement?.pays
    ),
    [ETRANGER_FRANCE]: getEtrangerOuFrance(evenement, etrangerParDefaut),
    villeEstAffichee: false
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

function saisieContratMariage(
  detailMariage?: IDetailMariage
): IContratMariageForm {
  return {
    [EXISTENCE]: ExistenceContratMariage.getKey(
      detailMariage?.existenceContrat
    ),
    [TEXTE]: detailMariage?.contrat
  };
}
