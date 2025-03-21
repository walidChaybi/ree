import { Requete } from "@model/requete/IRequete";
import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { ENatureActeTranscrit } from "@model/requete/NatureActeTranscription";
import { IPieceJustificativeCreation } from "@model/requete/pieceJointe/IPieceJustificativeCreation";
import { ResumeRequeteCreationTranscriptionNaissanceMineureMajeure } from "./composants/ResumeReqCreationTranscriptionNaissanceMineureMajeure";

export function onRenommePieceJustificative(
  idPieceJustificative: string,
  nouveauLibelle: string,
  requete: IRequeteCreationTranscription | undefined,
  setRequete: any
) {
  const pjARenommer = Requete.getPieceJustificative(requete, idPieceJustificative) as IPieceJustificativeCreation;
  if (pjARenommer) {
    pjARenommer.libelle = nouveauLibelle;
    setRequete({ ...requete } as IRequeteCreationTranscription);
  }
}
export function getComposantResumeRequeteEnFonctionNatureActe(requete?: IRequeteCreation): JSX.Element {
  const natureActe = requete?.natureActeTranscrit;

  const estNaissanceMineureOuMajeure =
    natureActe === ENatureActeTranscrit.NAISSANCE_MINEUR || natureActe === ENatureActeTranscrit.NAISSANCE_MAJEUR;

  if (estNaissanceMineureOuMajeure) {
    return getComposantResumeRequeteEnfantMineureMajeure(requete);
  } else {
    // TODO Rajouter resumes requete autre (DECES, ENFANT SANS VIE....)
    return <></>;
  }
}

function getComposantResumeRequeteEnfantMineureMajeure(requete?: IRequeteCreation): JSX.Element {
  return <ResumeRequeteCreationTranscriptionNaissanceMineureMajeure requete={requete} />;
}
