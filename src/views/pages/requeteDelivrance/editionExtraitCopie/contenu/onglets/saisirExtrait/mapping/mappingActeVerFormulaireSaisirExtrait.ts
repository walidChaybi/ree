import {
  ADOPTE_PAR,
  AGE,
  ANNEE,
  ARRONDISSEMENT,
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
  PAYS,
  PRENOMS,
  REGION_DEPARTEMENT,
  SECABLE,
  SEXE,
  TEXTE,
  TITULAIRE_EVT_1,
  TITULAIRE_EVT_2,
  TYPE,
  VILLE
} from "@composant/formulaire/ConstantesNomsForm";
import { DetailMariage } from "@model/etatcivil/acte/DetailMariage";
import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { Filiation } from "@model/etatcivil/acte/Filiation";
import { Evenement, IEvenement } from "@model/etatcivil/acte/IEvenement";
import { TitulaireActe } from "@model/etatcivil/acte/TitulaireActe";
import { ELienParente } from "@model/etatcivil/enum/ELienParente";
import { ENatureActe } from "@model/etatcivil/enum/NatureActe";
import {
  IContratMariageForm,
  IDateNaissanceAgeDe,
  IDonneesComplementairesPlurilingueForm,
  IEvenementForm,
  ILieuEvenementForm,
  IParentNaissanceForm,
  ISaisieExtraitForm,
  ITitulaireEvtForm
} from "@model/form/delivrance/ISaisieExtraitForm";
import { Prenoms } from "@model/form/delivrance/ISaisirRequetePageForm";
import DateUtils, { IDateCompose } from "@util/DateUtils";
import { ABSENCE_VALIDEE, QUINZE, rempliAGaucheAvecZero } from "@util/Utils";
import { FRANCE, LieuxUtils } from "@utilMetier/LieuxUtils";

export function mappingActeVerFormulaireSaisirExtrait(acte: FicheActe, titulairesAMs: (TitulaireActe | undefined)[]): ISaisieExtraitForm {
  // Titulaire 1
  const saisieForm: ISaisieExtraitForm = {
    [TITULAIRE_EVT_1]: saisieTitulaireEvtForm(
      acte.nature,
      titulairesAMs[0],
      (acte.nature === "NAISSANCE" ? acte.evenement : acte.titulaires[0].naissance) ?? undefined
    )
  };

  // Evenement (ne sert que pour les actes de décès et mariage)
  saisieForm[EVENEMENT] = {
    dateEvenement: saisieDateEvt(acte.evenement ?? undefined),
    lieuEvenement: saisieLieuEvt(acte.evenement ?? undefined),
    contratMariage: saisieContratMariage(acte.detailMariage)
  };

  // Dernier conjoint (ne sert que pour les actes de décès)
  saisieForm[DERNIER_CONJOINT] = {
    nomNaissance: acte.titulaires[0].nomDernierConjoint ?? "",
    prenoms: acte.titulaires[0].prenomsDernierConjoint ?? ""
  };

  // Parents titulaire 1
  saisieForm[TITULAIRE_EVT_1] = {
    ...saisieForm[TITULAIRE_EVT_1],
    ...saisieParentsForm(acte.titulaires[0], acte.nature),
    ...saisieParentsAdoptantsForm(acte.titulaires[0])
  };

  // Titulaire 2 (cas mariage)
  if (acte.nature === "MARIAGE" && acte.titulaires[1]) {
    saisieForm[TITULAIRE_EVT_2] = titulairesAMs[1]
      ? saisieTitulaireEvtForm(acte.nature, titulairesAMs[1], acte.titulaires[1]?.naissance ?? undefined)
      : undefined;
    // Parents titulaire 2
    saisieForm[TITULAIRE_EVT_2] = {
      ...saisieForm[TITULAIRE_EVT_2],
      ...saisieParentsForm(acte.titulaires[1], acte.nature),
      ...saisieParentsAdoptantsForm(acte.titulaires[1])
    };
  }

  //Données complémetaires plurilingues (ne sert que pour les actes de mariage dans le cas d'un document plurilingue)
  saisieForm[DONNEES_COMPLEMENTAIRES_PLURILINGUE] = saisieDonneesComplementairesPlurilingues(acte);

  return saisieForm;
}

function saisieDonneesComplementairesPlurilingues(acte: FicheActe): IDonneesComplementairesPlurilingueForm {
  const titulaireMasculin = acte.titulaires.find(titulaire => titulaire.sexe === "MASCULIN");
  const titulaireFeminin = acte.titulaires.find(titulaire => titulaire.sexe === "FEMININ");

  return {
    [NOM_APRES_MARIAGE_EPOUX]: titulaireMasculin?.nomApresMariage ?? "",
    [NOM_APRES_MARIAGE_EPOUSE]: titulaireFeminin?.nomApresMariage ?? ""
  };
}

function saisieParentsForm(titulaireActe: TitulaireActe | undefined, natureActe: keyof typeof ENatureActe): any {
  const parents = {};
  titulaireActe?.filiations
    .filter(filiation => filiation.lienParente === "PARENT")
    .forEach((parent: Filiation, index: number) => {
      //@ts-ignore
      parents[`${PARENT_NAISS}${index + 1}`] = saisieParentForm(parent, natureActe);
    });
  return parents;
}

function saisieParentsAdoptantsForm(titulaireActe?: TitulaireActe): any {
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
  titulaireActe?.filiations
    .filter(filiation => filiation.lienParente === "PARENT_ADOPTANT")
    ?.forEach((parentAdoptant: Filiation, index: number) => {
      //@ts-ignore
      parentsAdoptants[`${PARENT_ADOPTANT_NAISS}${index + 1}`] = saisieParentForm(parentAdoptant);
    });
  return parentsAdoptants;
}

function saisieParentPaysInconnu(natureActe?: keyof typeof ENatureActe, parent?: Filiation): boolean {
  if (parent?.naissance && parent?.lienParente === ELienParente.PARENT) {
    return LieuxUtils.estPaysInconnu(parent?.naissance.pays) && "NAISSANCE" === natureActe;
  } else {
    return false;
  }
}

function saisieParentForm(parent?: Filiation, natureActe?: keyof typeof ENatureActe): IParentNaissanceForm {
  const estNaissancePaysInconnu = saisieParentPaysInconnu(natureActe, parent);
  return {
    [NOM_NAISSANCE]: parent?.nom ?? "",
    [PRENOMS]: saisiePrenomForm(parent?.prenoms),
    [DATE_NAISSANCE_OU_AGE_DE]: saisieDateOuAgeDe(parent?.age ?? null, parent?.naissance ?? undefined),
    [SEXE]: parent?.sexe ?? "INCONNU",
    [LIEU_NAISSANCE]: saisieLieuEvt(parent?.naissance ?? undefined, false, estNaissancePaysInconnu) // Pour les parents le lieu de naissance est france par défaut
  };
}

function saisieDateOuAgeDe(age: number | null, dateEvt?: IEvenement): IDateNaissanceAgeDe {
  return {
    [AGE]: Evenement.estPartiellementRenseigne(dateEvt) ? "" : (age?.toString() ?? ""),
    [DATE]: saisieDateEvt(dateEvt)
  };
}

function saisieTitulaireEvtForm(
  natureActe: keyof typeof ENatureActe,
  titulaire?: TitulaireActe,
  evenement?: IEvenement
): ITitulaireEvtForm {
  return {
    [NOM_NAISSANCE]: titulaire?.nom ?? "",
    [NOM_SECABLE]: saisieNomSecable(titulaire),
    [DECLARATION_CONJOINTE]: saisieDeclarationConjointe(titulaire),
    [PRENOMS]: saisiePrenomForm(titulaire?.prenoms),
    [SEXE]: titulaire?.sexe ?? "INCONNU",
    [EVENEMENT]: saisieDateAgeDeLieuEvt(natureActe, titulaire?.age ?? null, evenement, titulaire, natureActe === "NAISSANCE"),

    [ADOPTE_PAR]: titulaire?.filiations?.find(filiation => filiation.lienParente === "PARENT_ADOPTANT") ? ["true"] : []
  } as ITitulaireEvtForm;
}

function saisieDateAgeDeLieuEvt(
  natureActe: keyof typeof ENatureActe,
  age: number | null,
  evenement?: IEvenement,
  titulaire?: TitulaireActe,
  etrangerParDefaut = true
): IEvenementForm {
  const estNaissancePaysInconnu = saisiePaysInconnuTitulaire(natureActe, titulaire);
  return {
    // Pour la naissance la date contient également l'heure, pour le décès il n'a pas d'heure
    //  (pour le mariage c'est "DATE_NAISSANCE_OU_AGE_DE" qui est utilisé: voir ci-dessous)
    [DATE_EVENEMENT]: saisieDateHeureEvt(evenement),
    // Pour le mariage la date de naissance est suivi du champ "Agé de"
    [DATE_NAISSANCE_OU_AGE_DE]: saisieDateOuAgeDe(age, evenement),
    [LIEU_EVENEMENT]: saisieLieuEvt(evenement, etrangerParDefaut, estNaissancePaysInconnu)
  };
}

function saisiePaysInconnuTitulaire(natureActe: keyof typeof ENatureActe, titulaire?: TitulaireActe): boolean {
  return LieuxUtils.estPaysInconnu(titulaire?.naissance?.pays) && ["MARIAGE", "DECES"].includes(natureActe);
}

function saisiePrenomForm(prenoms?: string[]): Prenoms {
  const prenomsObj: Prenoms = {};
  if (prenoms) {
    for (let i = 0; i < QUINZE; i++) {
      const prenomKey = `prenom${i + 1}`;
      prenomsObj[prenomKey] = prenoms[i] ?? "";
    }
  }
  return prenomsObj;
}

function saisieNomSecable(titulaire?: TitulaireActe) {
  return {
    [SECABLE]: titulaire?.nomPartie1 && titulaire?.nomPartie1 !== ABSENCE_VALIDEE ? ["true"] : [],
    [NOM_PARTIE1]: titulaire?.nomPartie1 === ABSENCE_VALIDEE ? "" : (titulaire?.nomPartie1 ?? ""),
    [NOM_PARTIE2]: titulaire?.nomPartie2 === ABSENCE_VALIDEE ? "" : (titulaire?.nomPartie2 ?? "")
  };
}

function saisieDeclarationConjointe(titulaire?: TitulaireActe) {
  const dateDeclarationConjointeCompose: IDateCompose = DateUtils.getDateComposeFromDate(
    titulaire?.dateDeclarationConjointe ? new Date(titulaire?.dateDeclarationConjointe?.versTimestamp()) : undefined
  );
  return {
    [TYPE]: titulaire?.typeDeclarationConjointe ?? "",
    [DATE]: saisieDateForm(dateDeclarationConjointeCompose)
  };
}

function saisieDateHeureEvt(evenement?: IEvenement) {
  return {
    ...saisieDateEvt(evenement),
    [NB_HEURE]: evenement?.heure?.toString() ?? undefined,
    [NB_MINUTE]: evenement?.minute?.toString() ?? undefined
  };
}

function saisieDateEvt(evenement?: IEvenement) {
  return saisieDateForm({
    jour: rempliAGaucheAvecZero(evenement?.jour?.toString() ?? ""),
    mois: rempliAGaucheAvecZero(evenement?.mois?.toString() ?? ""),
    annee: rempliAGaucheAvecZero(evenement?.annee?.toString() ?? "")
  });
}

function saisieDateForm(date?: IDateCompose) {
  return {
    [JOUR]: date?.jour ?? "",
    [MOIS]: date?.mois ?? "",
    [ANNEE]: date?.annee ?? ""
  };
}

function saisieLieuEvt(evenement?: IEvenement, etrangerParDefaut = true, estNaissancePaysInconnu = false): ILieuEvenementForm {
  let pays;
  if (estNaissancePaysInconnu) {
    pays = "";
  } else {
    pays = evenement?.pays || (etrangerParDefaut || LieuxUtils.estVilleJerusalem(evenement?.ville) ? "" : FRANCE);
  }

  return {
    [LIEU_COMPLET]: evenement?.lieuReprise
      ? (evenement?.lieuReprise ?? "")
      : LieuxUtils.getLocalisationEtrangerOuFrance(evenement?.ville, evenement?.region, pays, evenement?.arrondissement),
    [VILLE]: evenement?.ville ?? "",
    [ARRONDISSEMENT]: evenement?.arrondissement ?? "",
    [REGION_DEPARTEMENT]: evenement?.region ?? "",
    [PAYS]: (LieuxUtils.estPaysFrance(evenement?.pays) || estNaissancePaysInconnu ? "" : evenement?.pays) ?? "",
    [ETRANGER_FRANCE]: getEtrangerOuFrance(evenement, etrangerParDefaut),
    villeEstAffichee: false
  };
}

function getEtrangerOuFrance(evenement?: IEvenement, etrangerParDefaut = true): string {
  return LieuxUtils.getEtrangerOuFranceOuInconnuEnMajuscule(evenement, etrangerParDefaut);
}

function saisieContratMariage(detailMariage: DetailMariage | null): IContratMariageForm {
  return {
    [EXISTENCE]: detailMariage?.existenceContrat,
    [TEXTE]: detailMariage?.contrat
  };
}
