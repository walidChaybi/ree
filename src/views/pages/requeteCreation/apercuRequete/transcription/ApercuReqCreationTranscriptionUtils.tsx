import { QualiteFamille } from "@model/requete/enum/QualiteFamille";
import { TypeObjetTitulaire } from "@model/requete/enum/TypeObjetTitulaire";
import { Requete } from "@model/requete/IRequete";
import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { NatureActeTranscription } from "@model/requete/NatureActeTranscription";
import { IPieceJustificativeCreation } from "@model/requete/pieceJointe/IPieceJustificativeCreation";
import { SANS_PRENOM_CONNU, SPC } from "@util/Utils";
import React from "react";
import { ResumeRequeteCreationTranscriptionNaissanceMineureMajeure } from "./composants/ResumeReqCreationTranscriptionNaissanceMineureMajeure";

export function onRenommePieceJustificative(
  idPieceJustificative: string,
  nouveauLibelle: string,
  requete: IRequeteCreationTranscription | undefined,
  setRequete: any
) {
  const pjARenommer = Requete.getPieceJustificative(
    requete,
    idPieceJustificative
  ) as IPieceJustificativeCreation;
  if (pjARenommer) {
    pjARenommer.libelle = nouveauLibelle;
    setRequete({ ...requete } as IRequeteCreationTranscription);
  }
}
export function getComposantResumeRequeteEnFonctionNatureActe(
  requete?: IRequeteCreation
): JSX.Element {
  const natureActe = requete?.natureActeTranscrit;

  if (NatureActeTranscription.estNaissanceMineureOuMajeure(natureActe)) {
    return getComposantResumeRequeteEnfantMineureMajeure(requete);
  } else {
    // TODO Rajouter resumes requete autre (DECES, ENFANT SANS VIE....)
    return <></>;
  }
}

function getComposantResumeRequeteEnfantMineureMajeure(
  requete?: IRequeteCreation
): JSX.Element {
  return (
    <ResumeRequeteCreationTranscriptionNaissanceMineureMajeure
      requete={requete}
    />
  );
}

export function formatPrenoms(prenoms: string[]): string {
  let lignePrenomsFormates;
  if (prenoms) {
    if (prenoms?.[0] === SPC) {
      lignePrenomsFormates = SANS_PRENOM_CONNU;
    } else {
      lignePrenomsFormates = prenoms.join(", ");
    }
  } else {
    lignePrenomsFormates = "";
  }

  return lignePrenomsFormates;
}

export function formatDateLieuResumeRequete(
  date?: string,
  lieu?: string
): string | undefined {
  let dateLieu;

  dateLieu = date || "";
  dateLieu += lieu && date ? ", " : "";
  dateLieu += lieu || "";

  return dateLieu;
}

export function getParents(
  titulaires?: ITitulaireRequeteCreation[]
): ITitulaireRequeteCreation[] | undefined {
  return titulaires?.filter(
    titulaires =>
      titulaires.typeObjetTitulaire === TypeObjetTitulaire.FAMILLE &&
      titulaires.qualite === QualiteFamille.PARENT
  );
}

export function getTitulaires(
  titulaires?: ITitulaireRequeteCreation[]
): ITitulaireRequeteCreation[] | undefined {
  return titulaires?.filter(
    titulaires =>
      titulaires.typeObjetTitulaire ===
      TypeObjetTitulaire.TITULAIRE_ACTE_TRANSCRIT_DRESSE
  );
}
