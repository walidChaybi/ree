import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import {
  IRequeteCreationEtablissement,
  RequeteCreationEtablissement
} from "@model/requete/IRequeteCreationEtablissement";
import { OngletPiecesJustificatives } from "@pages/requeteCreation/commun/composants/OngletPiecesJustificatives";
import Labels from "@pages/requeteCreation/commun/Labels";
import { getLibelle } from "@util/Utils";
import ConteneurRetractable from "@widget/conteneurRetractable/ConteneurRetractable";
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
  ) => void
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
      />
    </ConteneurRetractable>
  );
}
