import React, { useContext } from "react";
import { ChoixDelivrance } from "../../../../../model/requete/enum/ChoixDelivrance";
import {
  DocumentReponse,
  IDocumentReponse
} from "../../../../../model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "../../../../../model/requete/IRequeteDelivrance";
import { checkDirty } from "../../../../common/util/Utils";
import { OngletsDynamique } from "../../../../common/widget/ongletsDynamique/OngletsDynamique";
import { RECEContext } from "../../../../core/body/Body";

interface OngletsDocumentsProps {
  documents?: IDocumentReponse[];
  requete: IRequeteDelivrance;
  idDocumentEdite?: string;
  setDocumentEdite: (document: string) => void;
  ajouterDocument: (document: any) => void;
}

const NB_DOCUMENT_MAX = 3;

export const OngletDocumentsEdites: React.FC<OngletsDocumentsProps> = ({
  documents,
  idDocumentEdite,
  setDocumentEdite,
  ajouterDocument,
  requete
}) => {
  const { isDirty, setIsDirty } = useContext(RECEContext);
  const listePlus = [{ label: "Copie plurilingue", value: 0 }];

  const handleSelect = (event: any) => {
    if (checkDirty(isDirty, setIsDirty)) {
      // TODO ajout d'un document complémentaire
    }
  };

  const handleClick = (idDoc: string) => {
    if (idDoc !== idDocumentEdite && checkDirty(isDirty, setIsDirty)) {
      setDocumentEdite(idDoc);
    }
  };

  function getListeOnglets() {
    let res: any[] = [];
    if (documents) {
      if (documents.length === 0) {
        res = [
          {
            id: "COURRIER",
            libelle: "Courrier"
          }
        ];
      } else {
        res = documents.map(doc => ({
          id: doc.id,
          libelle: DocumentReponse.getLibelle(doc)
        }));
      }
    }
    return res;
  }

  return (
    <>
      <OngletsDynamique
        actionClick={handleClick}
        actionPlus={handleSelect}
        ongletSelectionne={idDocumentEdite}
        listeOnglets={getListeOnglets()}
        afficherPlus={
          documents?.length !== 0 ||
          ChoixDelivrance.estReponseSansDelivrance(requete.choixDelivrance)
        }
        listePlus={listePlus}
        nombreOngletsMax={NB_DOCUMENT_MAX}
      />
    </>
  );
};
