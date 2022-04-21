import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IDocumentReponse } from "../../../../model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "../../../../model/requete/IRequeteDelivrance";
import { IUuidRequeteParams } from "../../../../model/requete/IUuidRequeteParams";
import {
  IActeApiHookParams,
  useInformationsActeApiHook
} from "../../../common/hook/repertoires/ActeApiHook";
import { getLibelle } from "../../../common/util/Utils";
import { BoutonOperationEnCours } from "../../../common/widget/attente/BoutonOperationEnCours";
import { OperationEnCours } from "../../../common/widget/attente/OperationEnCours";
import { receUrl } from "../../../router/ReceUrls";
import { BoutonsTerminer } from "../apercuRequete/apercuRequeteEnTraitement/contenu/BoutonsTerminer";
import { useDetailRequeteApiHook } from "../detailRequete/hook/DetailRequeteHook";
import { VoletEdition } from "./contenu/onglets/VoletEdition";
import { VoletVisualisation } from "./contenu/onglets/VoletVisualisation";
import { OngletDocumentsEdites } from "./contenu/OngletsDocumentsEdites";
import {
  boutonModifierCopiePresent,
  checkDirty
} from "./EditionExtraitCopieUtils";
import "./scss/EditionExtraitCopie.scss";

export const EditionECContext = React.createContext({
  isDirty: false,
  setIsDirty: (isDirty: boolean) => {},
  setOperationEnCours: (operationEnCours: boolean) => {}
});

export const EditionExtraitCopiePage: React.FC = () => {
  const history = useHistory();
  const { idRequeteParam } = useParams<IUuidRequeteParams>();
  const [requete, setRequete] = useState<IRequeteDelivrance>();
  const [documents, setDocuments] = useState<IDocumentReponse[]>();
  const [documentEdite, setDocumentEdite] = useState<IDocumentReponse>();
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [hookParams, setHookParams] = useState<IActeApiHookParams>();
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const dataHistory = history.location.state;

  const { detailRequeteState } = useDetailRequeteApiHook(idRequeteParam);

  const acte = useInformationsActeApiHook(hookParams);

  const ajouteDocument = (typeDocument: any) => {
    if (checkDirty(isDirty, setIsDirty)) {
      return 0;
    }
  };

  useEffect(() => {
    if (detailRequeteState) {
      setRequete(detailRequeteState as IRequeteDelivrance);
    }
  }, [detailRequeteState]);

  useEffect(() => {
    if (requete) {
      setDocuments(requete.documentsReponses);
    }
  }, [requete]);

  useEffect(() => {
    if (dataHistory && documents && !documentEdite) {
      setDocumentEdite(documents.find(doc => doc.id === dataHistory));
    }
  }, [dataHistory, documents, documentEdite]);

  useEffect(() => {
    if (documentEdite && documentEdite.idActe) {
      setHookParams({ idActe: documentEdite.idActe });
    }
  }, [documentEdite]);

  const changementDocEdite = (id: string) => {
    if (documents) {
      setDocumentEdite(
        documents.find(doc => {
          return doc.id === id;
        })
      );
    }
  };

  const goBack = () => {
    if (checkDirty(isDirty, setIsDirty)) {
      receUrl.goBack(history);
    }
  };

  function sauvegarderDocument(document: IDocumentReponse) {
    if (requete && documentEdite) {
      const temp = { ...requete };
      const index = temp.documentsReponses.findIndex(
        el => el.id === documentEdite.id
      );
      temp.documentsReponses[index] = document;
      setRequete(temp);
      setDocumentEdite(document);
      setOperationEnCours(false);
    }
  }

  return (
    <div className="EditionExtraitCopie">
      <EditionECContext.Provider
        value={{ isDirty, setIsDirty, setOperationEnCours }}
      >
        <title>{getLibelle("Édition extrait copie")}</title>
        {requete && (
          <>
            <OperationEnCours visible={operationEnCours} />
            <OngletDocumentsEdites
              documents={requete.documentsReponses}
              idDocumentEdite={documentEdite?.id}
              ajouterDocument={ajouteDocument}
              setDocumentEdite={changementDocEdite}
            />
            <div className="contenu-edition">
              {documentEdite && acte?.acte && (
                <>
                  <VoletVisualisation
                    requete={requete}
                    document={documentEdite}
                    acte={acte?.acte}
                  ></VoletVisualisation>
                  <div className="Separateur"></div>
                  <VoletEdition
                    requete={requete}
                    document={documentEdite}
                    acte={acte?.acte}
                    sauvegarderDocument={sauvegarderDocument}
                  />
                </>
              )}
            </div>
            <div className="BoutonsEdition">
              <div className="Gauche">
                <BoutonOperationEnCours
                  title={getLibelle("Retour aperçu traitement")}
                  onClick={goBack}
                >
                  {getLibelle("Retour aperçu traitement")}
                </BoutonOperationEnCours>
              </div>
              <div className="Droite">
                {boutonModifierCopiePresent(acte?.acte, documentEdite) && (
                  <BoutonOperationEnCours
                    title={getLibelle("Modifier la copie à délivrer")}
                    onClick={goBack}
                  >
                    Modifier la copie à délivrer
                  </BoutonOperationEnCours>
                )}
                <BoutonsTerminer requete={requete} />
              </div>
            </div>
          </>
        )}
      </EditionECContext.Provider>
    </div>
  );
};
