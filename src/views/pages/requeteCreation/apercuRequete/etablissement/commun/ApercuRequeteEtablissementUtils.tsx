import {
  ANALYSE_MARGINALE,
  ANNEE,
  DATE_NAISSANCE,
  ETAT_CANTON_PROVINCE,
  JOUR,
  LIEU_DE_NAISSANCE,
  MOIS,
  NOM,
  PAYS_NAISSANCE,
  PRENOMS,
  SEXE,
  TITULAIRE,
  VILLE_NAISSANCE
} from "@composant/formulaire/ConstantesNomsForm";
import { IDecretNaturalisation } from "@model/etatcivil/acte/IDecretNaturalisation";
import { IRegistre } from "@model/etatcivil/acte/IRegistre";
import { IProjetAnalyseMarginale } from "@model/etatcivil/acte/projetActe/IAnalyseMarginaleProjetActe";
import { IProjetActe } from "@model/etatcivil/acte/projetActe/IProjetActe";
import { ITitulaireProjetActe } from "@model/etatcivil/acte/projetActe/ITitulaireProjetActe";
import { TypeFamille } from "@model/etatcivil/enum/TypeFamille";
import {
  ISaisieAnalyseMarginale,
  ISaisieDate,
  ISaisieLieuNaissance,
  ISaisieProjetPostulantForm
} from "@model/form/creation/etablissement/ISaisiePostulantForm";
import { Prenoms } from "@model/form/delivrance/ISaisirRequetePageForm";
import { AvancementProjetActe } from "@model/requete/enum/AvancementProjetActe";
import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import {
  IRequeteCreationEtablissement,
  RequeteCreationEtablissement
} from "@model/requete/IRequeteCreationEtablissement";
import { OngletPiecesJustificatives } from "@pages/requeteCreation/commun/composants/OngletPiecesJustificatives";
import Labels from "@pages/requeteCreation/commun/Labels";
import { getDateActuelle } from "@util/DateUtils";
import {
  getLibelle,
  getValeurOuVide,
  jointAvec,
  rempliAGaucheAvecZero, UN
} from "@util/Utils";
import ConteneurRetractable from "@widget/conteneurRetractable/ConteneurRetractable";
import { FormikHelpers } from "formik";
import mappingIRequeteCreationVersResumeRequeteCreationProps from "./resumeRequeteCreationEtablissement/mappingIRequeteCreationVersResumeRequeteCreationProps";
import ResumeRequeteCreationEtablissement from "./resumeRequeteCreationEtablissement/ResumeRequeteCreationEtablissement";

export function onRenommePieceJustificativeEtablissement(
  requete: IRequeteCreationEtablissement | undefined,
  setRequete: React.Dispatch<
    React.SetStateAction<IRequeteCreationEtablissement | undefined>
  >,
  idPieceJustificative: string,
  nouveauLibelle: string,
  idDocumentPJ?: string
) {
  const pjARenommer = RequeteCreationEtablissement.getPieceJustificative(
    requete,
    idDocumentPJ,
    idPieceJustificative
  );
  if (pjARenommer) {
    pjARenommer.libelle = nouveauLibelle;
    setRequete({ ...requete } as IRequeteCreationEtablissement);
  }
}

export function getConteneurResumeRequete(
  requete: IRequeteCreation,
  conteneurFerme = false
): JSX.Element {
  return (
    <ConteneurRetractable
      titre={Labels.resume.requete.description}
      className="ResumeRequeteCreation"
      initConteneurFerme={conteneurFerme}
      estADroite={false}
    >
      <ResumeRequeteCreationEtablissement
        {...mappingIRequeteCreationVersResumeRequeteCreationProps(requete)}
      />
    </ConteneurRetractable>
  );
}

export function getConteneurPieceJustificative(
  requete: IRequeteCreation,
  onRenommePieceJustificative: (
    idPieceJustificative: string,
    nouveauLibelle: string,
    idDocumentPJ?: string
  ) => void,
  rechargerRequete: () => void
): JSX.Element {
  return (
    <ConteneurRetractable
      titre={getLibelle("Pièces justificatives")}
      className="FocusPieceJustificative"
      estADroite={true}
    >
      <OngletPiecesJustificatives
        requete={requete}
        onRenommePieceJustificative={onRenommePieceJustificative}
        rechargerRequete={rechargerRequete}
      />
    </ConteneurRetractable>
  );
}

export const estOuvertRegistrePapier = (
  decretNaturalisaton?: IDecretNaturalisation | null,
  registrePapier?: IRegistre
): boolean => {
  let estOuvert = false;

  if (decretNaturalisaton && registrePapier) {
    const [support1, annee] = decretNaturalisaton?.numeroDecret.split("/");
    const dateActuelle = getDateActuelle();
    estOuvert =
      registrePapier.dateOuverture <= dateActuelle &&
      (registrePapier.dateFermeture
        ? registrePapier.dateFermeture > dateActuelle
        : true) &&
      TypeFamille.estACQ(TypeFamille.getEnumFor(registrePapier.famille)) &&
      registrePapier.pocopa === "X" &&
      Number(registrePapier.annee) === Number(annee) &&
      registrePapier.support1 === support1;
  }

  return estOuvert;
};

export function estModifieBulletinIdentification(
  saisieProjetPostulant: ISaisieProjetPostulantForm,
  projetActe?: IProjetActe
): boolean {
  return projetActe
    ? estModifieBulletinIdentificationCompareAvecProjetActe(
        saisieProjetPostulant,
        projetActe
      )
    : false;
}

function estModifieBulletinIdentificationCompareAvecProjetActe(
  saisieProjetPostulant: ISaisieProjetPostulantForm,
  projetActe: IProjetActe
): boolean {
  const postulantProjetActe = getPostulantProjetActe(projetActe);
  const analyseMarginalePostulant = getPostulantAnalyseMarginale(
    projetActe.analyseMarginales
  );

  return (
    estModifieAnalyseMarginale(
      saisieProjetPostulant.titulaire.analyseMarginale,
      analyseMarginalePostulant?.nom,
      analyseMarginalePostulant?.prenoms
    ) ||
    estModifieSexe(
      saisieProjetPostulant.titulaire.sexe,
      postulantProjetActe?.sexe
    ) ||
    estModifieDateDeNaissance(
      saisieProjetPostulant.titulaire.dateNaissance,
      postulantProjetActe.naissance?.jour,
      postulantProjetActe.naissance?.mois,
      postulantProjetActe.naissance?.annee
    ) ||
    estModifieLieuDeNaissance(
      saisieProjetPostulant.titulaire.lieuNaissance,
      postulantProjetActe.naissance?.pays,
      postulantProjetActe.naissance?.region,
      postulantProjetActe.naissance?.ville
    )
  );
}

function getPostulantProjetActe(projetActe: IProjetActe): ITitulaireProjetActe {
  return projetActe.titulaires[0];
}

function getPostulantAnalyseMarginale(
  analysesMarginales?: IProjetAnalyseMarginale[]
): ITitulaireProjetActe | undefined {
  return analysesMarginales?.find(analyseMarginale => !analyseMarginale.dateFin)
    ?.titulaires[0];
}

function estModifieAnalyseMarginale(
  valeurs: ISaisieAnalyseMarginale,
  nomBI?: string,
  prenomBI?: string[]
): boolean {
  const saisiePrenoms = Object.values(valeurs.prenoms).filter(
    prenom => prenom !== ""
  );

  return Boolean(
    valeurs.nom !== nomBI || saisiePrenoms.toString() !== prenomBI?.toString()
  );
}

function estModifieSexe(sexeSaisie: string, sexeBI?: string): boolean {
  return sexeSaisie !== sexeBI;
}

function estModifieDateDeNaissance(
  saisieDate: ISaisieDate,
  jourBI?: number,
  moisBI?: number,
  anneeBI?: number
): boolean {
  return (
    Boolean(saisieDate.annee && anneeBI !== Number(saisieDate.annee)) ||
    Boolean(saisieDate.mois && moisBI !== Number(saisieDate.mois)) ||
    Boolean(saisieDate.jour && jourBI !== Number(saisieDate.jour))
  );
}

function estModifieLieuDeNaissance(
  saisieLieuNaissance: ISaisieLieuNaissance,
  paysSaisie?: string,
  regionSaisie?: string,
  villeSaisie?: string
): boolean {
  const { paysNaissance, villeNaissance, etatCantonProvince } =
    saisieLieuNaissance;
  return (
    getValeurOuVide(paysNaissance.toUpperCase()) !==
      getValeurOuVide(paysSaisie?.toUpperCase()) ||
    getValeurOuVide(villeNaissance?.toUpperCase()) !==
      getValeurOuVide(villeSaisie?.toUpperCase()) ||
    getValeurOuVide(etatCantonProvince?.toUpperCase()) !==
      getValeurOuVide(regionSaisie?.toUpperCase())
  );
}

export function estModificationsDonneesBIAAnnuler(
  avancement: AvancementProjetActe,
  projetActe: IProjetActe,
  saisieProjetPostulant: ISaisieProjetPostulantForm
): boolean {
  return (
    (AvancementProjetActe.estProjetValide(avancement) ||
      AvancementProjetActe.estASigner(avancement)) &&
    estModifieBulletinIdentification(saisieProjetPostulant, projetActe) &&
    !window.confirm(
      getLibelle(
        `Attention ! Vous avez modifié des données des cinq items après validation du BI ou après publication du décret.\n\nVoulez-vous continuer ?`
      )
    )
  );
}

export function annulerModificationBulletinIdentification(
  formikHelpers: FormikHelpers<ISaisieProjetPostulantForm>,
  projetActe: IProjetActe
): void {
  const modifierChampAvecValeur = (
    nomsChamp: string[],
    valeur?: string | number | Prenoms
  ) => {
    formikHelpers.setFieldValue(jointAvec(nomsChamp, "."), valeur);
  };

  const postulantProjetActe = getPostulantProjetActe(projetActe);
  const analyseMarginalePostulant = getPostulantAnalyseMarginale(
    projetActe.analyseMarginales
  );

  const champsPrenoms = analyseMarginalePostulant?.prenoms
    ? analyseMarginalePostulant?.prenoms.reduce<Prenoms>(
        (formPrenoms, prenom, index) => ({
          ...formPrenoms,
          [`prenom${index + UN}`]: prenom
        }),
        {}
      )
    : {};

  modifierChampAvecValeur(
    [TITULAIRE, ANALYSE_MARGINALE, NOM],
    analyseMarginalePostulant?.nom ?? ""
  );
  modifierChampAvecValeur(
    [TITULAIRE, ANALYSE_MARGINALE, PRENOMS],
    champsPrenoms
  );
  modifierChampAvecValeur([TITULAIRE, SEXE], postulantProjetActe.sexe);
  modifierChampAvecValeur(
    [TITULAIRE, DATE_NAISSANCE, JOUR],
    postulantProjetActe.naissance?.jour
      ? rempliAGaucheAvecZero(postulantProjetActe.naissance?.jour)
      : undefined
  );
  modifierChampAvecValeur(
    [TITULAIRE, DATE_NAISSANCE, MOIS],
    postulantProjetActe.naissance?.mois
      ? rempliAGaucheAvecZero(postulantProjetActe.naissance?.mois)
      : undefined
  );
  modifierChampAvecValeur(
    [TITULAIRE, DATE_NAISSANCE, ANNEE],
    postulantProjetActe.naissance?.annee
  );
  modifierChampAvecValeur(
    [TITULAIRE, LIEU_DE_NAISSANCE, VILLE_NAISSANCE],
    postulantProjetActe.naissance?.ville ?? ""
  );
  modifierChampAvecValeur(
    [TITULAIRE, LIEU_DE_NAISSANCE, ETAT_CANTON_PROVINCE],
    postulantProjetActe.naissance?.region ?? ""
  );
  modifierChampAvecValeur(
    [TITULAIRE, LIEU_DE_NAISSANCE, PAYS_NAISSANCE],
    postulantProjetActe.naissance?.pays ?? ""
  );
}
