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
import { Mention } from "@model/etatcivil/acte/mention/IMention";
import { IUuidEditionParams } from "@model/params/IUuidEditionParams";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
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
import { gestionnaireMentionsRetireesAuto } from "@utilMetier/mention/GestionnaireMentionsRetireesAuto";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { OperationLocaleEnCoursSimple } from "@widget/attente/OperationLocaleEnCoursSimple";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { DocumentEC } from "../../../../model/requete/enum/DocumentEC";
import {
  IDetailRequeteParams,
  useAvecRejeuDetailRequeteApiHook
} from "../../../common/hook/requete/DetailRequeteHook";
import { VoletEdition } from "./contenu/onglets/VoletEdition";
import { VoletVisualisation } from "./contenu/onglets/VoletVisualisation";
import { OngletsDocumentsEdites } from "./contenu/OngletsDocumentsEdites";
import {
  choisirDocumentEdite,
  filtrerDocumentComplementaireASupprimer,
  getBoutonsEdition,
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
      if (DocumentDelivrance.estCopieIntegrale(typeDocument)) {
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
        let mentions = resultatInformationsActeApiHook?.acte?.mentions
          ? resultatInformationsActeApiHook?.acte?.mentions
          : [];
        const choixDelivrance =
          DocumentDelivrance.getChoixDelivranceFromUUID(typeDocument);
        if (ChoixDelivrance.estPlurilingue(choixDelivrance)) {
          mentions = Mention.filtrerFormaterEtTrierMentionsPlurilingues(
            resultatInformationsActeApiHook?.acte?.mentions
              ? resultatInformationsActeApiHook?.acte?.mentions
              : [],
            resultatInformationsActeApiHook?.acte?.nature
          );
        }

        setCreationECParams({
          acte: resultatInformationsActeApiHook?.acte,
          requete,
          validation: Validation.O,
          pasDAction: true,
          mentionsRetirees:
            gestionnaireMentionsRetireesAuto.getIdsMentionsRetirees(
              mentions,
              choixDelivrance,
              resultatInformationsActeApiHook?.acte?.nature
            ),
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
          <title>{getLibelle("Édition extrait copie")}</title>
          {requete ? (
            <>
              <OngletsDocumentsEdites
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
          ) : (
            <OperationLocaleEnCoursSimple />
          )}
        </div>
      </EditionExtraitCopiePageContext.Provider>
    </>
  );
};
