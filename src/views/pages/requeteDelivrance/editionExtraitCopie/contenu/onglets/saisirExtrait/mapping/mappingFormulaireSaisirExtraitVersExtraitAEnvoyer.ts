import { IExtraitSaisiAEnvoyer } from "@hook/acte/MajEtatCivilSuiteSaisieExtraitApiHook";
import { IEvenement } from "@model/etatcivil/acte/IEvenement";
import { FicheActe, IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IFiliation } from "@model/etatcivil/acte/IFiliation";
import { ITitulaireActe } from "@model/etatcivil/acte/ITitulaireActe";
import { EtrangerFrance } from "@model/etatcivil/enum/EtrangerFrance";
import { LienParente } from "@model/etatcivil/enum/LienParente";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { getDateDebutFromDateCompose } from "@util/DateUtils";
import {
  DEUX,
  getNombreOuUndefined,
  getTableauAPartirElementsNonVides,
  getValeurOuUndefined,
  getValeurOuVide,
  UN
} from "@util/Utils";
import {
  IDateCompleteForm,
  IEvenementForm,
  IParentNaissanceForm,
  IPrenomsForm,
  ISaisieExtraitForm,
  ITitulaireEvtForm
} from "./mappingActeVerFormulaireSaisirExtrait";

export function mappingFormulaireSaisirExtraitVersExtraitAEnvoyer(
  extraitSaisi: ISaisieExtraitForm,
  acte: IFicheActe
): IExtraitSaisiAEnvoyer {
  const extraitSaisiAEnvoyer = {} as IExtraitSaisiAEnvoyer;

  extraitSaisiAEnvoyer.natureActe = NatureActe.getKey(acte.nature);
  extraitSaisiAEnvoyer.titulaire1 = mapTitulaire(extraitSaisi.titulaireEvt1);

  const evenementNaissance = mapEvenement(extraitSaisi.titulaireEvt1.evenement);

  if (FicheActe.estActeNaissance(acte)) {
    extraitSaisiAEnvoyer.titulaire1.naissance = evenementNaissance;
    extraitSaisiAEnvoyer.evenementActe = evenementNaissance;
  } else {
    extraitSaisiAEnvoyer.titulaire1.naissance = evenementNaissance;
    const evenement = mapEvenement(extraitSaisi.evenement);
    extraitSaisiAEnvoyer.evenementActe = evenement;
  }

  if (FicheActe.estActeDeces(acte)) {
    extraitSaisiAEnvoyer.titulaire1.nomDernierConjoint =
      extraitSaisi.dernierConjoint?.nomNaissance;
    extraitSaisiAEnvoyer.titulaire1.prenomsDernierConjoint =
      extraitSaisi.dernierConjoint?.prenoms;
  }

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

function mapEvenement(evenementSaisi?: IEvenementForm): IEvenement {
  let lieuReprise = getValeurOuVide(evenementSaisi?.lieuEvenement.lieuComplet);
  let ville = getValeurOuVide(evenementSaisi?.lieuEvenement.ville);
  let arrondissement = getValeurOuVide(
    evenementSaisi?.lieuEvenement.arrondissement
  );
  let region = getValeurOuVide(evenementSaisi?.lieuEvenement.regionDepartement);
  let pays = getValeurOuVide(evenementSaisi?.lieuEvenement.pays);

  if (
    evenementSaisi?.lieuEvenement.EtrangerFrance ===
    EtrangerFrance.getKey(EtrangerFrance.INCONNU)
  ) {
    lieuReprise = "";
    ville = "";
    arrondissement = "";
    region = "";
    pays = "";
  }

  if (
    evenementSaisi?.lieuEvenement.EtrangerFrance ===
    EtrangerFrance.getKey(EtrangerFrance.FRANCE)
  ) {
    pays = "";
  }

  if (
    evenementSaisi?.lieuEvenement.EtrangerFrance ===
    EtrangerFrance.getKey(EtrangerFrance.ETRANGER)
  ) {
    arrondissement = "";
  }

  return {
    lieuReprise,
    ville,
    arrondissement,
    region,
    pays,

    annee: getNombreOuUndefined(evenementSaisi?.dateEvenement?.annee),
    mois: getNombreOuUndefined(evenementSaisi?.dateEvenement?.mois),
    jour: getNombreOuUndefined(evenementSaisi?.dateEvenement?.jour),

    heure: getNombreOuUndefined(evenementSaisi?.dateEvenement?.nbHeure),
    minute: getNombreOuUndefined(evenementSaisi?.dateEvenement?.nbMinute)
  };
}
