import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import { ENatureActeTranscrit } from "@model/requete/NatureActeTranscription";
import { ResumeRequeteCreationTranscriptionNaissanceMineureMajeure } from "./composants/ResumeReqCreationTranscriptionNaissanceMineureMajeure";

export const getComposantResumeRequeteEnFonctionNatureActe = (requete?: IRequeteCreation): JSX.Element => {
  const natureActe = requete?.natureActeTranscrit;

  const estNaissanceMineureOuMajeure =
    natureActe === ENatureActeTranscrit.NAISSANCE_MINEUR || natureActe === ENatureActeTranscrit.NAISSANCE_MAJEUR;

  if (estNaissanceMineureOuMajeure) {
    return getComposantResumeRequeteEnfantMineureMajeure(requete);
  } else {
    // TODO Rajouter resumes requete autre (DECES, ENFANT SANS VIE....)
    return <></>;
  }
};

const getComposantResumeRequeteEnfantMineureMajeure = (requete?: IRequeteCreation): JSX.Element => {
  return <ResumeRequeteCreationTranscriptionNaissanceMineureMajeure requete={requete} />;
};
