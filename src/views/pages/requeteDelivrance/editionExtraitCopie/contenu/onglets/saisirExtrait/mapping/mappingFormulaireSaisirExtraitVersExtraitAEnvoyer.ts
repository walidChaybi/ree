import { IExtraitSaisiAEnvoyer } from "@hook/acte/MajEtatCivilSuiteSaisieExtraitApiHook";
import { IDetailMariageDto } from "@model/etatcivil/acte/DetailMariage";
import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { IFiliationDto } from "@model/etatcivil/acte/Filiation";
import { IEvenement } from "@model/etatcivil/acte/IEvenement";
import { ITitulaireActeDto, TitulaireActe } from "@model/etatcivil/acte/TitulaireActe";
import EExistenceContratMariage from "@model/etatcivil/enum/EExistenceContratMariage";
import { ELienParente } from "@model/etatcivil/enum/ELienParente";
import { EtrangerFrance } from "@model/etatcivil/enum/EtrangerFrance";
import { ESexe } from "@model/etatcivil/enum/Sexe";
import {
  IContratMariageForm,
  IDateCompleteForm,
  IDonneesComplementairesPlurilingueForm,
  IEvenementForm,
  ILieuEvenementForm,
  IParentNaissanceForm,
  ISaisieExtraitForm,
  ITitulaireEvtForm
} from "@model/form/delivrance/ISaisieExtraitForm";
import { Prenoms } from "@model/form/delivrance/ISaisirRequetePageForm";
import DateUtils from "@util/DateUtils";
import { DEUX, UN, estNonRenseigne, estRenseigne, getNombreOuUndefined } from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";

function retirePrenomVide(prenomsSaisie?: Prenoms) {
  const prenoms = [];
  for (const prenom in prenomsSaisie) {
    if (prenomsSaisie[prenom] !== "") {
      prenoms.push(prenomsSaisie[prenom]);
    }
  }

  return prenoms;
}

export function mappingFormulaireSaisirExtraitVersExtraitAEnvoyer(
  saisiExtrait: ISaisieExtraitForm,
  acte: FicheActe
): IExtraitSaisiAEnvoyer {
  const extraitSaisiAEnvoyer = {} as IExtraitSaisiAEnvoyer;

  extraitSaisiAEnvoyer.natureActe = acte.nature;

  //@ts-ignore non null
  extraitSaisiAEnvoyer.titulaire1 = mapTitulaireNaissanceEtParents(acte, saisiExtrait.titulaireEvt1);
  // Alimentation des titulaires d'origine pour la recherche des personnes
  //  => Sert dans le cas de changement de nom et de sexe (la recherche des personnes s'effectue par le nom et le sexe)
  const titulairesAM = acte.getTitulairesAMDansLOrdreAvecMajDonneesTitulaireActe();
  extraitSaisiAEnvoyer.titulaireOrigine1 = mapNomSexeDuTitulaireActeEtParents(titulairesAM[0]);

  if (acte.nature === "MARIAGE" && saisiExtrait.titulaireEvt2) {
    extraitSaisiAEnvoyer.titulaire2 = mapTitulaireNaissanceEtParents(acte, saisiExtrait.titulaireEvt2);
    if (titulairesAM[1]) {
      extraitSaisiAEnvoyer.titulaireOrigine2 = mapNomSexeDuTitulaireActeEtParents(titulairesAM[1]);
    }
  }

  if (acte.nature === "NAISSANCE") {
    //@ts-ignore non null
    extraitSaisiAEnvoyer.evenementActe = extraitSaisiAEnvoyer.titulaire1.naissance;
  } else {
    extraitSaisiAEnvoyer.evenementActe = mapEvenement(saisiExtrait.evenement, true);
  }

  if (acte.nature === "DECES") {
    extraitSaisiAEnvoyer.titulaire1.nomDernierConjoint = saisiExtrait.dernierConjoint?.nomNaissance;
    extraitSaisiAEnvoyer.titulaire1.prenomsDernierConjoint = saisiExtrait.dernierConjoint?.prenoms;
  }

  if (acte.nature === "MARIAGE") {
    extraitSaisiAEnvoyer.detailMariage = mapDetailMariage(saisiExtrait.evenement?.contratMariage);
    extraitSaisiAEnvoyer.titulaire1.nomApresMariage = mapDonneesComplementairesPlurilingueNomApresMariage(
      extraitSaisiAEnvoyer.titulaire1.sexe,
      saisiExtrait.donneesComplementairesPlurilingues
    );
    if (extraitSaisiAEnvoyer.titulaire2) {
      extraitSaisiAEnvoyer.titulaire2.nomApresMariage = mapDonneesComplementairesPlurilingueNomApresMariage(
        extraitSaisiAEnvoyer.titulaire2.sexe,
        saisiExtrait.donneesComplementairesPlurilingues
      );
    }
  }

  const analyseMarginaleLaPlusRecente = acte.getAnalyseMarginaleLaPlusRecente();
  if (analyseMarginaleLaPlusRecente) {
    extraitSaisiAEnvoyer.idAnalyseMarginale = analyseMarginaleLaPlusRecente.id;
  }

  return extraitSaisiAEnvoyer;
}

function paysSaisieEtrangerActiveEtPasRenseigneEtAuMoinsVilleOuRegionSaisie(
  titulaireEvtSaisi?: IEvenementForm,
  parentEvtSaisi?: IParentNaissanceForm
): boolean {
  const lieuOuEvenementNaissance = titulaireEvtSaisi?.lieuEvenement || parentEvtSaisi?.lieuNaissance;

  return (
    !estRenseigne(lieuOuEvenementNaissance?.pays) &&
    villeOuRegionEstSaisie(lieuOuEvenementNaissance) &&
    paysEtrangerActive(lieuOuEvenementNaissance)
  );
}

function paysEtrangerActive(lieuEvenementOuNaissance?: ILieuEvenementForm): boolean {
  return lieuEvenementOuNaissance?.EtrangerFrance === EtrangerFrance.getKey(EtrangerFrance.ETRANGER);
}

function villeOuRegionEstSaisie(lieuEvenementOuNaissance?: ILieuEvenementForm): boolean {
  return estRenseigne(lieuEvenementOuNaissance?.ville) || estRenseigne(lieuEvenementOuNaissance?.regionDepartement);
}

function mapDonneesComplementairesPlurilingueNomApresMariage(
  sexe: keyof typeof ESexe | undefined,
  donneesComplementairesPlurilingueSaisies?: IDonneesComplementairesPlurilingueForm
): string {
  if (sexe === "MASCULIN") {
    return donneesComplementairesPlurilingueSaisies?.nomApresMariageEpoux ?? "";
  } else if (sexe === "FEMININ") {
    return donneesComplementairesPlurilingueSaisies?.nomApresMariageEpouse ?? "";
  }
  return "";
}

function mapTitulaireNaissanceEtParents(acte: FicheActe, titulaireEvtSaisi?: ITitulaireEvtForm): ITitulaireActeDto | undefined {
  let titulaireAEnvoyer: ITitulaireActeDto | undefined;

  if (titulaireEvtSaisi) {
    titulaireAEnvoyer = mapTitulaire(titulaireEvtSaisi);

    titulaireAEnvoyer.naissance = mapEvenementNaissanceTitulaire(acte, titulaireEvtSaisi.evenement);

    titulaireAEnvoyer.filiations = [];
    if (parentRenseigne(titulaireEvtSaisi.parentNaiss1)) {
      titulaireAEnvoyer.filiations.push(mapParent(UN, titulaireEvtSaisi.parentNaiss1, ELienParente.PARENT, acte.nature === "NAISSANCE"));
    }
    if (parentRenseigne(titulaireEvtSaisi.parentNaiss2)) {
      titulaireAEnvoyer.filiations.push(mapParent(DEUX, titulaireEvtSaisi.parentNaiss2, ELienParente.PARENT, acte.nature === "NAISSANCE"));
    }

    if (["DECES", "MARIAGE"].includes(acte.nature)) {
      saisirPaysNaissanceInconnu(titulaireAEnvoyer, titulaireEvtSaisi);
    }

    if (acte.nature === "MARIAGE") {
      if (parentRenseigne(titulaireEvtSaisi.parentAdoptantNaiss1)) {
        titulaireAEnvoyer.filiations.push(mapParentAdoptant(titulaireEvtSaisi.parentAdoptantNaiss1, UN));
      }
      if (parentRenseigne(titulaireEvtSaisi.parentAdoptantNaiss2)) {
        titulaireAEnvoyer.filiations.push(mapParentAdoptant(titulaireEvtSaisi.parentAdoptantNaiss2, DEUX));
      }
    }
  }
  return titulaireAEnvoyer;
}

function saisirPaysNaissanceInconnu(titulaireAEnvoyer: ITitulaireActeDto, titulaireEvtSaisi?: ITitulaireEvtForm): ITitulaireActeDto {
  const copieTitulaireAEnvoyer = { ...titulaireAEnvoyer };
  const saisirPaysInconnu = paysSaisieEtrangerActiveEtPasRenseigneEtAuMoinsVilleOuRegionSaisie(titulaireEvtSaisi?.evenement);

  if (saisirPaysInconnu && copieTitulaireAEnvoyer.naissance) {
    copieTitulaireAEnvoyer.naissance.pays = EtrangerFrance.getKey(EtrangerFrance.INCONNU);
  }

  return copieTitulaireAEnvoyer;
}

function parentRenseigne(parentAdoptant?: IParentNaissanceForm): boolean {
  return estRenseigne(parentAdoptant?.nomNaissance) || estRenseigne(parentAdoptant?.prenoms.prenom1);
}

function mapEvenementNaissanceTitulaire(acte: FicheActe, evenementNaissanceSaisi?: IEvenementForm): IEvenement | undefined {
  if (evenementNaissanceSaisi) {
    const evenementNaissanceTitulaire =
      acte.nature === "MARIAGE"
        ? {
            lieuEvenement: evenementNaissanceSaisi.lieuEvenement,
            dateEvenement: evenementNaissanceSaisi.dateNaissanceOuAgeDe?.date as IDateCompleteForm
          }
        : evenementNaissanceSaisi;

    return mapEvenement(evenementNaissanceTitulaire, acte.nature === "NAISSANCE");
  }
}

function mapDetailMariage(contratMariageSaisi?: IContratMariageForm): IDetailMariageDto {
  return {
    contrat: contratMariageSaisi?.texte ?? "",
    existenceContrat: (contratMariageSaisi?.existence as keyof typeof EExistenceContratMariage) || "NON"
  };
}

function mapParentAdoptant(parentSaisi: IParentNaissanceForm, ordre: number): IFiliationDto {
  return mapParent(ordre, parentSaisi, ELienParente.PARENT_ADOPTANT);
}

function mapParent(
  ordre: number,
  parentSaisi?: IParentNaissanceForm,
  lienParente = ELienParente.PARENT,
  estActeNaissance = false
): IFiliationDto {
  const estPaysInconnu = paysSaisieEtrangerActiveEtPasRenseigneEtAuMoinsVilleOuRegionSaisie(undefined, parentSaisi);

  const parent = {
    nom: parentSaisi?.nomNaissance,
    prenoms: retirePrenomVide(parentSaisi?.prenoms),
    sexe: parentSaisi?.sexe ?? undefined,
    age: getNombreOuUndefined(parentSaisi?.dateNaissanceOuAgeDe?.age),
    naissance: mapEvenement(
      {
        lieuEvenement: parentSaisi?.lieuNaissance,
        dateEvenement: parentSaisi?.dateNaissanceOuAgeDe?.date as IDateCompleteForm
      },
      false
    ),
    lienParente,
    ordre
  };

  if (estActeNaissance && estPaysInconnu) {
    parent.naissance.pays = EtrangerFrance.getKey(EtrangerFrance.INCONNU);
  }

  return parent as IFiliationDto;
}

function mapTitulaire(titulaireSaisi: ITitulaireEvtForm): ITitulaireActeDto {
  return {
    nom: titulaireSaisi.nomNaissance,
    nomPartie1: titulaireSaisi.nomSecable?.nomPartie1,
    nomPartie2: titulaireSaisi.nomSecable?.nomPartie2,
    typeDeclarationConjointe: titulaireSaisi.declarationConjointe?.type,
    dateDeclarationConjointe: DateUtils.getDateDebutFromDate(titulaireSaisi.declarationConjointe?.date),
    prenoms: retirePrenomVide(titulaireSaisi.prenoms),
    sexe: titulaireSaisi.sexe ?? undefined,
    age: titulaireSaisi.evenement?.dateNaissanceOuAgeDe?.age ?? undefined
  } as ITitulaireActeDto;
}

function mapEvenement(evenementSaisi: IEvenementForm | undefined, lieuEvenementEstObligatoire: boolean): IEvenement {
  let lieuReprise = evenementSaisi?.lieuEvenement?.lieuComplet ?? "";
  let ville = evenementSaisi?.lieuEvenement?.ville ?? "";
  let arrondissement = evenementSaisi?.lieuEvenement?.arrondissement ?? "";
  let region = evenementSaisi?.lieuEvenement?.regionDepartement ?? "";
  let pays = evenementSaisi?.lieuEvenement?.pays ?? "";

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

function mapNomSexeDuTitulaireActeEtParents(titulaireActe: TitulaireActe | null): ITitulaireActeDto {
  return {
    nom: titulaireActe?.nom,
    sexe: titulaireActe?.sexe ?? "INCONNU",
    filiations: titulaireActe?.filiations?.map(filiation => ({
      nom: filiation.nom,
      sexe: filiation.sexe,
      lienParente: filiation.lienParente,
      ordre: filiation.ordre
    }))
  } as ITitulaireActeDto;
}
