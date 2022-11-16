import { RetoucheImage } from "@composant/retoucheImage/RetoucheImage";
import { RECEContext } from "@core/body/RECEContext";
import {
  IActeApiHookParams,
  useInformationsActeApiHook
} from "@hook/acte/ActeApiHook";
import {
  IGetImagesDeLActeParams,
  useGetImagesDeLActe
} from "@hook/acte/GetImagesDeLActeApiHook";
import {
  IGenerationECParams,
  useGenerationEC
} from "@hook/generation/generationECHook/generationECHook";
import { useSupprimerDocumentComplementaireApi } from "@hook/requete/SupprimerDocumentComplementaireHook";
import { IUuidEditionParams } from "@model/params/IUuidEditionParams";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { ACTE_NON_TROUVE } from "@model/requete/enum/DocumentDelivranceConstante";
import { Validation } from "@model/requete/enum/Validation";
import {
  DocumentReponse,
  IDocumentReponse
} from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import { checkDirty, getLibelle } from "@util/Utils";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  IDetailRequeteParams,
  useAvecRejeuDetailRequeteApiHook
} from "../detailRequete/hook/DetailRequeteHook";
import { VoletEdition } from "./contenu/onglets/VoletEdition";
import { VoletVisualisation } from "./contenu/onglets/VoletVisualisation";
import { OngletDocumentsEdites } from "./contenu/OngletsDocumentsEdites";
import {
  choisirDocumentEdite,
  estDocumentComplementaireDeTypeCopieIntegrale,
  filtrerDocumentComplementaireASupprimer,
  getBoutonsEdition,
  retoucheImage
} from "./EditionExtraitCopieUtils";
import { DocumentEC } from "./enum/DocumentEC";
import "./scss/EditionExtraitCopie.scss";

export const EditionExtraitCopiePageContext = React.createContext({
  operationEnCours: false,
  setOperationEnCours: (operationEnCours: boolean) => {}
});

export interface ISuppressionDocumentComplementaireParams {
  idDocumentReponse: string;
  idRequete: string;
}

export const EditionExtraitCopiePage: React.FC = () => {
  const { isDirty, setIsDirty } = useContext(RECEContext);

  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [creationECParams, setCreationECParams] =
    useState<IGenerationECParams>();

  const [supprimerDocument, setSupprimerDocument] =
    useState<ISuppressionDocumentComplementaireParams>();

  const { idRequeteParam, idActeParam } = useParams<IUuidEditionParams>();
  const [detailRequeteParams, setDetailRequeteParams] =
    useState<IDetailRequeteParams>();
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
  const history = useHistory();

  const { detailRequeteState } =
    useAvecRejeuDetailRequeteApiHook(detailRequeteParams);

  const resulatEC = useGenerationEC(creationECParams);

  const resultatInformationsActeApiHook = useInformationsActeApiHook(
    informationsActeApiHookParams
  );

  const resulatSuppressionDocumentComplementaire =
    useSupprimerDocumentComplementaireApi(supprimerDocument);

  // Pour la retouche d'image
  const resultatGenerationEC = useGenerationEC(generationEcParams);
  const resultatGetImagesDeLActe = useGetImagesDeLActe(
    recuperationImagesDeLActeParams
  );

  const ajouteDocument = (typeDocument: string) => {
    if (checkDirty(isDirty, setIsDirty) && requete) {
      setOperationEnCours(true);
      if (estDocumentComplementaireDeTypeCopieIntegrale(typeDocument)) {
        setCreationECParams({
          idActe: resultatInformationsActeApiHook?.acte?.id,
          requete,
          validation: Validation.O,
          pasDAction: true,
          mentionsRetirees: [],
          choixDelivrance:
            DocumentDelivrance.getChoixDelivranceFromUUID(typeDocument)
        });
      } else {
        setCreationECParams({
          acte: resultatInformationsActeApiHook?.acte,
          requete,
          validation: Validation.O,
          pasDAction: true,
          mentionsRetirees: [],
          choixDelivrance:
            DocumentDelivrance.getChoixDelivranceFromUUID(typeDocument)
        });
      }
    }
  };

  const retirerDocument = () => {
    if (requete) {
      const documentASupprimer = filtrerDocumentComplementaireASupprimer(
        requete.documentsReponses
      );

      if (checkDirty(isDirty, setIsDirty) && documentASupprimer) {
        setOperationEnCours(true);
        setSupprimerDocument({
          idDocumentReponse: documentASupprimer.id,
          idRequete: requete.id
        });
      }
    }
  };

  useEffect(() => {
    if (resulatEC) {
      rafraichirRequete(DocumentEC.Complementaire);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resulatEC]);

  useEffect(() => {
    choisirDocumentEdite(indexDocEditeDemande, setIndexDocEdite, requete);
  }, [requete, indexDocEditeDemande]);

  function rafraichirRequete(index?: DocumentEC) {
    setOperationEnCours(false);
    setDetailRequeteParams({ idRequete: idRequeteParam });
    setIndexDocEditeDemande(
      index !== undefined
        ? index
        : requete?.documentsReponses.findIndex(
            doc => doc.id === documentEdite?.id
          )
    );
    setIsDirty(false);
  }

  useEffect(() => {
    if (idRequeteParam) {
      setDetailRequeteParams({
        idRequete: idRequeteParam,
        estConsultation: history.location.pathname.includes(
          URL_RECHERCHE_REQUETE
        )
      });
    }
  }, [idRequeteParam, history.location.pathname]);

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
    if (
      resultatGenerationEC ||
      resulatSuppressionDocumentComplementaire?.suppressionOk
    ) {
      rafraichirRequete(DocumentEC.Principal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatGenerationEC, resulatSuppressionDocumentComplementaire]);

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
                documents={documents}
                idDocumentEdite={documentEdite?.id}
                acte={resultatInformationsActeApiHook?.acte}
                ajouterDocument={ajouteDocument}
                retirerDocument={retirerDocument}
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
