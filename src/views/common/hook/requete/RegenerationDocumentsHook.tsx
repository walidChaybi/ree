import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import {
  documentDejaCreer,
  IDocumentReponse
} from "@model/requete/IDocumentReponse";
import {
  IRequeteDelivrance,
  RequeteDelivrance
} from "@model/requete/IRequeteDelivrance";
import { useEffect, useState } from "react";
import {
  IGenerationECParams,
  useGenerationEC
} from "../generation/generationECHook/generationECHook";

export interface IRegenerationDocumentsParams {
  requete: IRequeteDelivrance;
  regenererCourrier: boolean;
  callBack?: () => void;
}

interface IRegenerationParams {
  documentsARegenerer: IDocumentReponse[];
}

export function useRegenerationDocumentsHook(
  params?: IRegenerationDocumentsParams
) {
  const [generationECParams, setGenerationECParams] =
    useState<IGenerationECParams>();

  const [regenerationParams, setRegenerationParams] =
    useState<IRegenerationParams>();

  const resultatGenerationEC = useGenerationEC(generationECParams);

  // 1 - Sauvegarde des données de l'acte
  useEffect(() => {
    if (params) {
      const docARegenerer = RequeteDelivrance.getExtraitsCopies(params.requete);
      if (docARegenerer.length) {
        setRegenerationParams({
          documentsARegenerer: docARegenerer
        });
      } else if (params.callBack) {
        params.callBack();
      }
    }
  }, [params]);

  // 2 - Regénérer tous les fichiers
  useEffect(() => {
    RegenererDocument(
      regenerationParams,
      setRegenerationParams,
      params,
      setGenerationECParams
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatGenerationEC, regenerationParams]);

  useEffect(() => {
    if (
      regenerationParams?.documentsARegenerer.length === 0 &&
      resultatGenerationEC &&
      params?.callBack
    ) {
      params.callBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatGenerationEC]);
}
function RegenererDocument(
  regenerationParams: IRegenerationParams | undefined,
  setRegenerationParams: any,
  params: IRegenerationDocumentsParams | undefined,
  setGenerationECParams: any
) {
  let document;
  if (
    regenerationParams &&
    regenerationParams.documentsARegenerer.length !== 0
  ) {
    const documentsARegenerer = regenerationParams.documentsARegenerer;
    document = documentsARegenerer.pop();
    setRegenerationParams({
      documentsARegenerer
    });
  }
  if (params && document) {
    setGenerationECParams({
      idActe: document.idActe,
      requete: params.requete,
      validation: document.validation,
      mentionsRetirees: document.mentionsRetirees
        ? document.mentionsRetirees?.map(el => el.idMention)
        : [],
      pasDAction: documentDejaCreer(
        params.requete.documentsReponses,
        params.requete.choixDelivrance
      ),
      choixDelivrance: DocumentDelivrance.getChoixDelivranceFromUUID(
        document.typeDocument
      )
    });
  }
}
