import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IUuidEditionParams } from "../../../../model/params/IUuidEditionParams";
import { DocumentDelivrance } from "../../../../model/requete/enum/DocumentDelivrance";
import { ACTE_NON_TROUVE } from "../../../../model/requete/enum/DocumentDelivranceConstante";
import {
  DocumentReponse,
  IDocumentReponse
} from "../../../../model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "../../../../model/requete/IRequeteDelivrance";
import { RetoucheImage } from "../../../common/composant/retoucheImage/RetoucheImage";
import {
  IActeApiHookParams,
  useInformationsActeApiHook
} from "../../../common/hook/acte/ActeApiHook";
import {
  IGetImagesDeLActeParams,
  useGetImagesDeLActe
} from "../../../common/hook/acte/GetImagesDeLActeApiHook";
import {
  IGenerationECParams,
  useGenerationEC
} from "../../../common/hook/generation/generationECHook/generationECHook";
import { checkDirty, getLibelle } from "../../../common/util/Utils";
import { OperationEnCours } from "../../../common/widget/attente/OperationEnCours";
import { RECEContext } from "../../../core/body/Body";
import {
  IDetailRequeteParams,
  useAvecRejeuDetailRequeteApiHook
} from "../detailRequete/hook/DetailRequeteHook";
import { VoletEdition } from "./contenu/onglets/VoletEdition";
import { VoletVisualisation } from "./contenu/onglets/VoletVisualisation";
import { OngletDocumentsEdites } from "./contenu/OngletsDocumentsEdites";
import {
  choisirDocumentEdite,
  getBoutonsEdition,
  retoucheImage
} from "./EditionExtraitCopieUtils";
import { DocumentEC } from "./enum/DocumentEC";
import "./scss/EditionExtraitCopie.scss";

export const EditionExtraitCopiePageContext = React.createContext({
  operationEnCours: false,
  setOperationEnCours: (operationEnCours: boolean) => {}
});

export const EditionExtraitCopiePage: React.FC = () => {
  const { isDirty, setIsDirty } = useContext(RECEContext);

  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);

  const { idRequeteParam, idActeParam } = useParams<IUuidEditionParams>();
  const [idRequete, setIdRequete] = useState<IDetailRequeteParams>();
  const [requete, setRequete] = useState<IRequeteDelivrance>();
  const [documents, setDocuments] = useState<IDocumentReponse[]>();
  const [documentEdite, setDocumentEdite] = useState<IDocumentReponse>();
  const [informationsActeApiHookParams, setInformationsActeApiHookParams] =
    useState<IActeApiHookParams>();
  const [indexDocEdite, setIndexDocEdite] = useState<DocumentEC>(
    DocumentEC.Courrier
  );
  const [indexDocEditeDemande, setIndexDocEditeDemande] =
    useState<DocumentEC>();
  const [generationEcParams, setGenerationEcParams] =
    useState<IGenerationECParams>();
  const [imagesDeLActe, setImagesDeLActe] = useState<string[]>([]);
  const [imagesDeLActeModifiees, setImagesDeLActeModifiees] = useState<
    string[]
  >([]);
  const [recuperationImagesDeLActeParams, setRecuperationImagesDeLActeParams] =
    useState<IGetImagesDeLActeParams>();

  const { detailRequeteState } = useAvecRejeuDetailRequeteApiHook(idRequete);

  const resultatInformationsActeApiHook = useInformationsActeApiHook(
    informationsActeApiHookParams
  );

  // Pour la retouche d'image
  const resultatGenerationEC = useGenerationEC(generationEcParams);
  const resultatGetImagesDeLActe = useGetImagesDeLActe(
    recuperationImagesDeLActeParams
  );

  const ajouteDocument = (typeDocument: string) => {
    if (checkDirty(isDirty, setIsDirty)) {
      // TODO ajout d'un document complémentaire
    }
  };

  useEffect(() => {
    choisirDocumentEdite(indexDocEditeDemande, setIndexDocEdite, requete);
  }, [requete, indexDocEditeDemande]);

  function rafraichirRequete(index: DocumentEC) {
    setOperationEnCours(false);
    setIdRequete({ idRequete: idRequeteParam });
    setIndexDocEditeDemande(index);
    setIsDirty(false);
  }

  useEffect(() => {
    if (idRequeteParam) {
      setIdRequete({ idRequete: idRequeteParam });
    }
  }, [idRequeteParam]);

  useEffect(() => {
    if (detailRequeteState) {
      setRequete(detailRequeteState as IRequeteDelivrance);
    }
  }, [detailRequeteState]);

  useEffect(() => {
    if (requete && requete.choixDelivrance) {
      setDocuments(
        DocumentReponse.attribuerOrdreDocuments(
          requete.documentsReponses,
          requete.choixDelivrance
        ).sort((a, b) => (a.ordre ? a.ordre : 0) - (b.ordre ? b.ordre : 0))
      );
    }
  }, [requete]);

  useEffect(() => {
    if (documents && documents.length === 0) {
      setDocumentEdite({
        id: "COURRIER",
        idActe: idActeParam,
        typeDocument: DocumentDelivrance.getUuidFromCode(ACTE_NON_TROUVE),
        nbPages: 0
      } as IDocumentReponse);
    } else {
      setDocumentEdite(documents?.[indexDocEdite]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documents, idActeParam]);

  useEffect(() => {
    if (documentEdite) {
      if (documentEdite.idActe) {
        setInformationsActeApiHookParams({ idActe: documentEdite.idActe });
      } else if (idActeParam) {
        setInformationsActeApiHookParams({ idActe: idActeParam });
      }
    }
  }, [documentEdite, idActeParam]);

  const changementDocEdite = (id: string) => {
    if (documents) {
      setDocumentEdite(
        documents.find(doc => {
          return doc.id === id;
        })
      );
    }
  };

  const onRetoucheTerminee = useCallback(
    (imagesModifieesBase64?: string[]) => {
      retoucheImage(
        imagesModifieesBase64,
        requete,
        resultatInformationsActeApiHook,
        documentEdite,
        setImagesDeLActeModifiees,
        setGenerationEcParams,
        setOperationEnCours
      );
    },
    [
      documentEdite,
      requete,
      resultatInformationsActeApiHook,
      setOperationEnCours
    ]
  );

  useEffect(() => {
    if (resultatGenerationEC) {
      rafraichirRequete(DocumentEC.Principal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatGenerationEC]);

  useEffect(() => {
    if (resultatGetImagesDeLActe) {
      setImagesDeLActe(resultatGetImagesDeLActe.imagesBase64);
    }
  }, [resultatGetImagesDeLActe]);

  return (
    <>
      <OperationEnCours visible={operationEnCours} />
      <RetoucheImage
        images={imagesDeLActe}
        onRetoucheTerminee={onRetoucheTerminee}
      />
      <EditionExtraitCopiePageContext.Provider
        value={{ operationEnCours, setOperationEnCours }}
      >
        <div className="EditionExtraitCopie">
          <title>{getLibelle("Édition extrait copie")}</title>
          {requete && (
            <>
              <OngletDocumentsEdites
                documents={requete.documentsReponses}
                idDocumentEdite={documentEdite?.id}
                ajouterDocument={ajouteDocument}
                setDocumentEdite={changementDocEdite}
                requete={requete}
              />
              <div className="contenu-edition">
                {documentEdite && (
                  <>
                    <VoletVisualisation
                      requete={requete}
                      document={documentEdite}
                      acte={resultatInformationsActeApiHook?.acte}
                    ></VoletVisualisation>
                    <div className="Separateur"></div>
                    <VoletEdition
                      requete={requete}
                      document={documentEdite}
                      acte={resultatInformationsActeApiHook?.acte}
                      handleDocumentEnregistre={rafraichirRequete}
                    />
                  </>
                )}
              </div>
              {getBoutonsEdition(
                requete,
                resultatInformationsActeApiHook,
                documentEdite,
                setOperationEnCours,
                imagesDeLActeModifiees,
                setImagesDeLActe,
                setRecuperationImagesDeLActeParams
              )}
            </>
          )}
        </div>
      </EditionExtraitCopiePageContext.Provider>
    </>
  );
};


