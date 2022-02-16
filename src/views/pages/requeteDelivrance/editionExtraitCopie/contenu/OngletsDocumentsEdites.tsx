import React from "react";
import {
  DocumentReponse,
  IDocumentReponse
} from "../../../../../model/requete/IDocumentReponse";
import { OngletsDynamique } from "../../../../common/widget/ongletsDynamique/OngletsDynamique";

interface OngletsDocumentsProps {
  documents?: IDocumentReponse[];
  idDocumentEdite?: string;
  setDocumentEdite: (document: string) => void;
  ajouterDocument: (document: any) => void;
}

const NB_DOCUMENT_MAX = 3;

export const OngletDocumentsEdites: React.FC<OngletsDocumentsProps> = ({
  documents,
  idDocumentEdite,
  setDocumentEdite,
  ajouterDocument
}) => {
  const listePlus = [{ label: "Copie plurilingue", value: 0 }];

  const handleSelect = (event: any) => {
    ajouterDocument(event.current.target);
  };

  const handleClick = (idDoc: string) => {
    if (idDoc !== idDocumentEdite) {
      setDocumentEdite(idDoc);
    }
  };

  return (
    <OngletsDynamique
      actionClick={handleClick}
      actionPlus={handleSelect}
      ongletSelectionne={idDocumentEdite}
      listeOnglets={documents?.map(doc => {
        return { id: doc.id, libelle: DocumentReponse.getLibelle(doc) };
      })}
      listePlus={listePlus}
      nombreOngletsMax={NB_DOCUMENT_MAX}
    />
  );
};
