import { RetoucheImage } from "@composant/retoucheImage/RetoucheImage";
import { RECEContext } from "@core/body/RECEContext";
import { useTitreDeLaFenetre } from "@core/document/TitreDeLaFenetreHook";
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
import {
  DocumentReponse,
  IDocumentReponse
} from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import { checkDirty } from "@util/Utils";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { OperationLocaleEnCoursSimple } from "@widget/attente/OperationLocaleEnCoursSimple";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { DocumentEC } from "../../../../model/requete/enum/DocumentEC";
import {
  IDetailRequeteParams,
  useAvecRejeuDetailRequeteApiHook
} from "../../../common/hook/requete/DetailRequeteHook";
import {
  choisirDocumentEdite,
  filtrerDocumentComplementaireASupprimer,
  getBoutonsEdition,
  getContenuEdition,
  getDocumentEditeDefaut,
  getOngletsDocumentsEdites,
  getParamsCreationEC,
  retoucheImage
} from "./EditionExtraitCopieUtils";
import "./scss/EditionExtraitCopie.scss";

export const EditionExtraitCopiePageContext = React.createContext({
  operationEnCours: false,
  setOperationEnCours: (operationEnCours: boolean) => {},
  rafraichirRequete: (index?: DocumentEC) => {}
});

export interface ISuppressionDocumentComplementaireParams {
  idDocumentReponse: string;
  idRequete: string;
}

export const EditionExtraitCopiePage: React.FC = () => {
  // Params
  useTitreDeLaFenetre("Édition extrait copie");
  const history = useHistory();
  const { isDirty, setIsDirty } = useContext(RECEContext);
  const { idRequeteParam, idActeParam } = useParams<IUuidEditionParams>();

  // States
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);

  const [requete, setRequete] = useState<IRequeteDelivrance>();
  const [detailRequeteParams, setDetailRequeteParams] =
    useState<IDetailRequeteParams>();

  const [creationECParams, setCreationECParams] =
    useState<IGenerationECParams>();
  const [generationEcParams, setGenerationEcParams] =
    useState<IGenerationECParams>();

  const [documents, setDocuments] = useState<IDocumentReponse[]>();
  const [documentEdite, setDocumentEdite] = useState<IDocumentReponse>();
  const [supprimerDocument, setSupprimerDocument] =
    useState<ISuppressionDocumentComplementaireParams>();

  const [informationsActeApiHookParams, setInformationsActeApiHookParams] =
    useState<IActeApiHookParams>();

  const [indexDocEdite, setIndexDocEdite] = useState<DocumentEC>(
    DocumentEC.Courrier
  );
  const [indexDocEditeDemande, setIndexDocEditeDemande] =
    useState<DocumentEC>();

  const [imagesDeLActe, setImagesDeLActe] = useState<string[]>([]);
  const [imagesDeLActeModifiees, setImagesDeLActeModifiees] = useState<
    string[]
  >([]);
  const [recuperationImagesDeLActeParams, setRecuperationImagesDeLActeParams] =
    useState<IGetImagesDeLActeParams>();

  // Hooks
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
      setCreationECParams(
        getParamsCreationEC(
          typeDocument,
          requete,
          resultatInformationsActeApiHook
        )
      );
    }
  };

  const retirerDocument = () => {
    const documentASupprimer = filtrerDocumentComplementaireASupprimer(
      requete?.documentsReponses
    );
    if (requete && checkDirty(isDirty, setIsDirty) && documentASupprimer) {
      setOperationEnCours(true);
      setSupprimerDocument({
        idDocumentReponse: documentASupprimer.id,
        idRequete: requete.id
      });
    }
  };

  useEffect(() => {
    resulatEC && rafraichirRequete(DocumentEC.Complementaire);
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
    idRequeteParam &&
      setDetailRequeteParams({
        idRequete: idRequeteParam,
        estConsultation: history.location.pathname.includes(
          URL_RECHERCHE_REQUETE
        )
      });
  }, [idRequeteParam, history.location.pathname]);

  useEffect(() => {
    detailRequeteState && setRequete(detailRequeteState as IRequeteDelivrance);
  }, [detailRequeteState]);

  useEffect(() => {
    requete &&
      requete.choixDelivrance &&
      setDocuments(
        DocumentReponse.attribuerOrdreDocuments(
          requete.documentsReponses,
          requete.choixDelivrance
        ).sort((a, b) => (a.ordre ? a.ordre : 0) - (b.ordre ? b.ordre : 0))
      );
  }, [requete]);

  useEffect(() => {
    setDocumentEdite(
      documents && documents.length === 0
        ? getDocumentEditeDefaut(idActeParam)
        : documents?.[indexDocEdite]
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documents, idActeParam]);

  useEffect(() => {
    if (documentEdite && documentEdite.idActe) {
      setInformationsActeApiHookParams({ idActe: documentEdite.idActe });
    } else if (!documentEdite && idActeParam) {
      setInformationsActeApiHookParams({ idActe: idActeParam });
    }
  }, [documentEdite, idActeParam]);

  useEffect(() => {
    (resultatGenerationEC ||
      resulatSuppressionDocumentComplementaire?.suppressionOk) &&
      rafraichirRequete(DocumentEC.Principal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatGenerationEC, resulatSuppressionDocumentComplementaire]);

  useEffect(() => {
    resultatGetImagesDeLActe &&
      setImagesDeLActe(resultatGetImagesDeLActe.imagesBase64);
  }, [resultatGetImagesDeLActe]);

  const changementDocEdite = (id: string) => {
    documents &&
      setDocumentEdite(
        documents.find(doc => {
          return doc.id === id;
        })
      );
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
    [documentEdite, requete, resultatInformationsActeApiHook]
  );

  return (
    <>
      <OperationEnCours
        visible={operationEnCours}
        onTimeoutEnd={() => setOperationEnCours(false)}
        onClick={() => setOperationEnCours(false)}
      />
      <RetoucheImage
        images={imagesDeLActe}
        onRetoucheTerminee={onRetoucheTerminee}
      />
      <EditionExtraitCopiePageContext.Provider
        value={{ operationEnCours, setOperationEnCours, rafraichirRequete }}
      >
        <div className="EditionExtraitCopie">
          {requete ? (
            <>
              {getOngletsDocumentsEdites(
                requete,
                ajouteDocument,
                retirerDocument,
                changementDocEdite,
                documents,
                documentEdite,
                resultatInformationsActeApiHook
              )}
              {getContenuEdition(
                requete,
                documentEdite,
                resultatInformationsActeApiHook
              )}
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
          ) : (
            <OperationLocaleEnCoursSimple />
          )}
        </div>
      </EditionExtraitCopiePageContext.Provider>
    </>
  );
};
