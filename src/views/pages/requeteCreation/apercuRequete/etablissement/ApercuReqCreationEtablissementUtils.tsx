import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import {
  IRequeteCreationEtablissement,
  RequeteCreationEtablissement
} from "@model/requete/IRequeteCreationEtablissement";
import Labels from "@pages/requeteCreation/commun/Labels";
import { OngletPiecesJustificatives } from "@pages/requeteCreation/commun/composants/OngletPiecesJustificatives";
import { getLibelle } from "@util/Utils";
import ConteneurRetractable from "@widget/conteneurRetractable/ConteneurRetractable";
import ResumeRequeteCreation from "./composants/ResumeRequeteCreation";
import mappingIRequeteCreationVersResumeRequeteCreationProps from "./mappingIRequeteCreationVersResumeRequeteCreationProps";

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
  requete: IRequeteCreation
): JSX.Element {
  return (
    <ConteneurRetractable
      titre={Labels.resume.requete.description}
      className="ResumeRequeteCreation"
      initConteneurFerme={false}
      estADroite={false}
    >
      <ResumeRequeteCreation
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
