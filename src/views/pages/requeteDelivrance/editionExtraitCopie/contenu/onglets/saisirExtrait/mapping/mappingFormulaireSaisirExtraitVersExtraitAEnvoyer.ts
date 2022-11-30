import { IExtraitSaisiAEnvoyer } from "@hook/acte/MajEtatCivilSuiteSaisieExtraitApiHook";
import { IEvenement } from "@model/etatcivil/acte/IEvenement";
import { FicheActe, IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IFiliation } from "@model/etatcivil/acte/IFiliation";
import { ITitulaireActe } from "@model/etatcivil/acte/ITitulaireActe";
import { EtrangerFrance } from "@model/etatcivil/enum/EtrangerFrance";
import { ExistenceContratMariage } from "@model/etatcivil/enum/ExistenceContratMariage";
import { LienParente } from "@model/etatcivil/enum/LienParente";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { getDateDebutFromDateCompose } from "@util/DateUtils";
import {
  DEUX,
  estNonRenseigne,
  estRenseigne,
  getNombreOuUndefined,
  getTableauAPartirElementsNonVides,
  getValeurOuUndefined,
  getValeurOuVide,
  UN
} from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import {
  IContratMariageForm,
  IDateCompleteForm,
  IDonneesComplementairesPlurilingueForm,
  IEvenementForm,
  IParentNaissanceForm,
  IPrenomsForm,
  ISaisieExtraitForm,
  ITitulaireEvtForm
} from "./mappingActeVerFormulaireSaisirExtrait";

export function mappingFormulaireSaisirExtraitVersExtraitAEnvoyer(
  saisiExtrait: ISaisieExtraitForm,
  acte: IFicheActe
): IExtraitSaisiAEnvoyer {
  const extraitSaisiAEnvoyer = {} as IExtraitSaisiAEnvoyer;

  extraitSaisiAEnvoyer.natureActe = NatureActe.getKey(acte.nature);
  //@ts-ignore non null
  extraitSaisiAEnvoyer.titulaire1 = mapTitulaireNaissanceEtParents(
    acte,
    saisiExtrait.titulaireEvt1
  );

  if (FicheActe.estActeMariage(acte) && saisiExtrait.titulaireEvt2) {
    extraitSaisiAEnvoyer.titulaire2 = mapTitulaireNaissanceEtParents(
      acte,
      saisiExtrait.titulaireEvt2
    );
  }

  if (FicheActe.estActeNaissance(acte)) {
    //@ts-ignore non null
    extraitSaisiAEnvoyer.evenementActe =
      extraitSaisiAEnvoyer.titulaire1.naissance;
  } else {
    extraitSaisiAEnvoyer.evenementActe = mapEvenement(
      saisiExtrait.evenement,
      true
    );
  }

  if (FicheActe.estActeDeces(acte)) {
    extraitSaisiAEnvoyer.titulaire1.nomDernierConjoint =
      saisiExtrait.dernierConjoint?.nomNaissance;
    extraitSaisiAEnvoyer.titulaire1.prenomsDernierConjoint =
      saisiExtrait.dernierConjoint?.prenoms;
  }

  if (FicheActe.estActeMariage(acte)) {
    extraitSaisiAEnvoyer.detailMariage = mapDetailMariage(
      saisiExtrait.evenement?.contratMariage
    );
    extraitSaisiAEnvoyer.titulaire1.nomApresMariage =
      mapDonneesComplementairesPlurilingueNomApresMariage(
        Sexe.getEnumFor(extraitSaisiAEnvoyer.titulaire1.sexe as any as string),
        saisiExtrait.donneesComplementairesPlurilingues
      );
    if (extraitSaisiAEnvoyer.titulaire2) {
      extraitSaisiAEnvoyer.titulaire2.nomApresMariage =
        mapDonneesComplementairesPlurilingueNomApresMariage(
          Sexe.getEnumFor(
            extraitSaisiAEnvoyer.titulaire2.sexe as any as string
          ),
          saisiExtrait.donneesComplementairesPlurilingues
        );
    }
  }

  const analyseMarginaleLaPlusRecente =
    FicheActe.getAnalyseMarginaleLaPlusRecente(acte);
  if (analyseMarginaleLaPlusRecente) {
    extraitSaisiAEnvoyer.idAnalyseMarginale = analyseMarginaleLaPlusRecente.id;
  }

  return extraitSaisiAEnvoyer;
}

function mapDonneesComplementairesPlurilingueNomApresMariage(
  sexe: Sexe | undefined,
  donneesComplementairesPlurilingueSaisies?: IDonneesComplementairesPlurilingueForm
): string {
  let nomApresMariage = "";
  if (sexe === Sexe.MASCULIN) {
    nomApresMariage = getValeurOuVide(
      donneesComplementairesPlurilingueSaisies?.nomApresMariageEpoux
    );
  } else if (sexe === Sexe.FEMININ) {
    nomApresMariage = getValeurOuVide(
      donneesComplementairesPlurilingueSaisies?.nomApresMariageEpouse
    );
  }
  return nomApresMariage;
}

function mapTitulaireNaissanceEtParents(
  acte: IFicheActe,
  titulaireEvtSaisi?: ITitulaireEvtForm
): ITitulaireActe | undefined {
  let titulaireAEnvoyer: ITitulaireActe | undefined;
  if (titulaireEvtSaisi) {
    titulaireAEnvoyer = mapTitulaire(titulaireEvtSaisi);

    titulaireAEnvoyer.naissance = mapEvenementNaissanceTitulaire(
      acte,
      titulaireEvtSaisi.evenement
    );

    titulaireAEnvoyer.filiations = [];
    if (parentRenseigne(titulaireEvtSaisi.parentNaiss1)) {
      titulaireAEnvoyer.filiations.push(
        mapParent(UN, titulaireEvtSaisi.parentNaiss1)
      );
    }
    if (parentRenseigne(titulaireEvtSaisi.parentNaiss2)) {
      titulaireAEnvoyer.filiations.push(
        mapParent(DEUX, titulaireEvtSaisi.parentNaiss2)
      );
    }

    if (FicheActe.estActeMariage(acte)) {
      if (parentRenseigne(titulaireEvtSaisi.parentAdoptantNaiss1)) {
        titulaireAEnvoyer.filiations.push(
          mapParentAdoptant(titulaireEvtSaisi.parentAdoptantNaiss1, UN)
        );
      }
      if (parentRenseigne(titulaireEvtSaisi.parentAdoptantNaiss2)) {
        titulaireAEnvoyer.filiations.push(
          mapParentAdoptant(titulaireEvtSaisi.parentAdoptantNaiss2, DEUX)
        );
      }
    }
  }
  return titulaireAEnvoyer;
}

function parentRenseigne(parentAdoptant?: IParentNaissanceForm): boolean {
  return (
    estRenseigne(parentAdoptant?.nomNaissance) ||
    estRenseigne(parentAdoptant?.prenoms.prenom1)
  );
}

function mapEvenementNaissanceTitulaire(
  acte: IFicheActe,
  evenementNaissanceSaisi?: IEvenementForm
): IEvenement | undefined {
  if (evenementNaissanceSaisi) {
    const evenementNaissanceTitulaire = FicheActe.estActeMariage(acte)
      ? {
          lieuEvenement: evenementNaissanceSaisi.lieuEvenement,
          dateEvenement: evenementNaissanceSaisi.dateNaissanceOuAgeDe
            ?.date as IDateCompleteForm
        }
      : evenementNaissanceSaisi;

    return mapEvenement(
      evenementNaissanceTitulaire,
      FicheActe.estActeNaissance(acte)
    );
  }
}

function mapDetailMariage(contratMariageSaisi?: IContratMariageForm): any {
  return {
    contrat: getValeurOuVide(contratMariageSaisi?.texte),
    existenceContrat:
      contratMariageSaisi?.existence ||
      ExistenceContratMariage.getKey(ExistenceContratMariage.NON)
  };
}

function mapParentAdoptant(
  parentSaisi: IParentNaissanceForm,
  ordre: number
): IFiliation {
  return mapParent(ordre, parentSaisi, LienParente.PARENT_ADOPTANT);
}

function mapParent(
  ordre: number,
  parentSaisi?: IParentNaissanceForm,
  lienParente = LienParente.PARENT
): IFiliation {
  return {
    nom: parentSaisi?.nomNaissance,
    prenoms: mapPrenoms(parentSaisi?.prenoms),
    sexe: mapSexe(parentSaisi?.sexe),
    age: getNombreOuUndefined(parentSaisi?.dateNaissanceOuAgeDe?.age),
    naissance: mapEvenement(
      {
        lieuEvenement: parentSaisi?.lieuNaissance,
        dateEvenement: parentSaisi?.dateNaissanceOuAgeDe
          ?.date as IDateCompleteForm
      },
      false
    ),
    lienParente,
    ordre
  } as any as IFiliation;
}

function mapSexe(sexeSaisi?: string) {
  return getValeurOuUndefined(sexeSaisi);
}

function mapTitulaire(titulaireSaisi: ITitulaireEvtForm) {
  return {
    nom: titulaireSaisi.nomNaissance,
    nomPartie1: titulaireSaisi.nomSecable?.nomPartie1,
    nomPartie2: titulaireSaisi.nomSecable?.nomPartie2,
    typeDeclarationConjointe: titulaireSaisi.declarationConjointe?.type,
    dateDeclarationConjointe: getDateDebutFromDateCompose(
      titulaireSaisi.declarationConjointe?.date
    ),
    prenoms: mapPrenoms(titulaireSaisi.prenoms),
    sexe: mapSexe(titulaireSaisi.sexe),
    age: getValeurOuUndefined(
      titulaireSaisi.evenement?.dateNaissanceOuAgeDe?.age
    )
  } as any as ITitulaireActe;
}

function mapPrenoms(prenomSaisis?: IPrenomsForm) {
  return getTableauAPartirElementsNonVides(
    prenomSaisis?.prenom1,
    prenomSaisis?.prenom2,
    prenomSaisis?.prenom3
  );
}

function mapEvenement(
  evenementSaisi: IEvenementForm | undefined,
  lieuEvenementEstObligatoire: boolean
): IEvenement {
  let lieuReprise = getValeurOuVide(evenementSaisi?.lieuEvenement?.lieuComplet);
  let ville = getValeurOuVide(evenementSaisi?.lieuEvenement?.ville);
  let arrondissement = getValeurOuVide(
    evenementSaisi?.lieuEvenement?.arrondissement
  );
  let region = getValeurOuVide(
    evenementSaisi?.lieuEvenement?.regionDepartement
  );
  let pays = getValeurOuVide(evenementSaisi?.lieuEvenement?.pays);

  switch (evenementSaisi?.lieuEvenement?.EtrangerFrance) {
    case EtrangerFrance.getKey(EtrangerFrance.INCONNU):
      if (!lieuEvenementEstObligatoire) {
        lieuReprise = "";
        ville = "";
        arrondissement = "";
        region = "";
        pays = "";
      }
      break;
    case EtrangerFrance.getKey(EtrangerFrance.FRANCE):
      pays = EtrangerFrance.getKey(EtrangerFrance.FRANCE);
      if (LieuxUtils.estVilleParis(ville)) {
        region = "";
      }
      if (!LieuxUtils.estVilleAvecArrondissement(ville)) {
        arrondissement = "";
      }
      break;
    case EtrangerFrance.getKey(EtrangerFrance.ETRANGER):
      arrondissement = "";
      break;

    default:
      break;
  }

  if (evenementSaisi?.lieuEvenement?.villeEstAffichee) {
    lieuReprise = "";
  } else if (estNonRenseigne(lieuReprise) && !lieuEvenementEstObligatoire) {
    lieuReprise = "";
    ville = "";
    arrondissement = "";
    region = "";
    pays = "";
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
