import { IEvenement } from "../../../../../../../../model/etatcivil/acte/IEvenement";
import {
  FicheActe,
  IFicheActe
} from "../../../../../../../../model/etatcivil/acte/IFicheActe";
import { IFiliation } from "../../../../../../../../model/etatcivil/acte/IFiliation";
import { ITitulaireActe } from "../../../../../../../../model/etatcivil/acte/ITitulaireActe";
import { LienParente } from "../../../../../../../../model/etatcivil/enum/LienParente";
import { NatureActe } from "../../../../../../../../model/etatcivil/enum/NatureActe";
import { IExtraitSaisiAEnvoyer } from "../../../../../../../common/hook/acte/MajEtatCivilSuiteSaisieExtraitApiHook";
import { getDateDebutFromDateCompose } from "../../../../../../../common/util/DateUtils";
import {
  DEUX,
  getNombreOuUndefined,
  getTableauAPartirElementsNonVides,
  getValeurOuUndefined,
  UN
} from "../../../../../../../common/util/Utils";
import {
  IDateCompleteForm,
  ILieuEvenementForm,
  IParentNaissanceForm,
  IPrenomsForm,
  ISaisieExtraitForm,
  ITitulaireEvtForm
} from "./mappingActeVerFormulaireSaisirExtrait";

export function mappingFormulaireSaisirExtraitNaissanceVersExtraitAEnvoyer(
  extraitSaisi: ISaisieExtraitForm,
  acte: IFicheActe
): IExtraitSaisiAEnvoyer {
  const extraitSaisiAEnvoyer: IExtraitSaisiAEnvoyer =
    {} as IExtraitSaisiAEnvoyer;

  extraitSaisiAEnvoyer.natureActe = NatureActe.getKey(NatureActe.NAISSANCE);

  extraitSaisiAEnvoyer.evenementActe = mapEvenement({
    lieuEvenement: extraitSaisi.titulaireEvt1.lieuEvenement,
    dateEvenement: extraitSaisi.titulaireEvt1.dateEvenement
  });

  extraitSaisiAEnvoyer.titulaire1 = mapTitulaire(extraitSaisi.titulaireEvt1);
  extraitSaisiAEnvoyer.titulaire1.naissance =
    extraitSaisiAEnvoyer.evenementActe;

  extraitSaisiAEnvoyer.titulaire1.filiations = [];
  extraitSaisiAEnvoyer.titulaire1.filiations[0] = mapParent(
    extraitSaisi.titulaireEvt1.parentNaiss1,
    UN
  );
  extraitSaisiAEnvoyer.titulaire1.filiations[1] = mapParent(
    extraitSaisi.titulaireEvt1.parentNaiss2,
    DEUX
  );

  const analyseMarginaleLaPlusRecente =
    FicheActe.getAnalyseMarginaleLaPlusRecente(acte);
  if (analyseMarginaleLaPlusRecente) {
    extraitSaisiAEnvoyer.idAnalyseMarginale = analyseMarginaleLaPlusRecente.id;
  }

  return extraitSaisiAEnvoyer;
}

function mapParent(
  parentSaisi: IParentNaissanceForm,
  ordre: number
): IFiliation {
  return {
    nom: parentSaisi.nomNaissance,
    prenoms: mapPrenoms(parentSaisi.prenoms),
    sexe: mapSexe(parentSaisi.sexe),
    age: getNombreOuUndefined(parentSaisi.dateNaissanceOuAgeDe.age),
    naissance: mapEvenement({
      lieuEvenement: parentSaisi.lieuNaissance,
      dateEvenement: parentSaisi.dateNaissanceOuAgeDe.date as IDateCompleteForm
    }),
    lienParente: LienParente.PARENT,
    ordre
  } as any as IFiliation;
}

function mapSexe(sexeSaisi?: string) {
  return getValeurOuUndefined(sexeSaisi);
}

function mapTitulaire(titulaireSaisi: ITitulaireEvtForm) {
  return {
    nom: titulaireSaisi.nomNaissance,
    nomPartie1: titulaireSaisi.nomSequable.nomPartie1,
    nomPartie2: titulaireSaisi.nomSequable.nomPartie2,
    typeDeclarationConjointe: titulaireSaisi.declarationConjointe.type,
    dateDeclarationConjointe: getDateDebutFromDateCompose(
      titulaireSaisi.declarationConjointe.date
    ),
    prenoms: mapPrenoms(titulaireSaisi.prenoms),
    sexe: mapSexe(titulaireSaisi.sexe)
  } as any as ITitulaireActe;
}

function mapPrenoms(prenomSaisis: IPrenomsForm) {
  return getTableauAPartirElementsNonVides(
    prenomSaisis.prenom1,
    prenomSaisis.prenom2,
    prenomSaisis.prenom3
  );
}

function mapEvenement(saisie: {
  lieuEvenement: ILieuEvenementForm;
  dateEvenement: IDateCompleteForm;
}): IEvenement {
  return {
    lieuReprise: saisie.lieuEvenement.lieuComplet,
    ville: saisie.lieuEvenement.ville,
    arrondissement: saisie.lieuEvenement.arrondissement,
    region: saisie.lieuEvenement.regionDepartement,
    pays: saisie.lieuEvenement.pays,

    annee: getNombreOuUndefined(saisie.dateEvenement?.annee),
    mois: getNombreOuUndefined(saisie.dateEvenement?.mois),
    jour: getNombreOuUndefined(saisie.dateEvenement?.jour),

    heure: getNombreOuUndefined(saisie.dateEvenement?.nbHeure),
    minute: getNombreOuUndefined(saisie.dateEvenement?.nbMinute)
  };
}
