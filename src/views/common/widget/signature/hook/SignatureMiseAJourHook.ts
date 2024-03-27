import { IInfosCarteSignature } from "@model/signature/IInfosCarteSignature";
import messageManager from "@util/messageManager";
import { useState } from "react";
import {
  IComposerDocumentMentionsUlterieuresParams,
  useComposerDocumentMentionsUlterieuresApiHook
} from "../../../hook/acte/mentions/ComposerDocumentMentionsUlterieuresApiHook";
import useComposerEtIntegrerDocumentFinalHook, {
  IResultatComposerDocumentFinalHook,
  ISuccesSignatureEtAppelApi
} from "./ComposerEtIntegrerDocumentFinalHook";

const useSignatureMiseAJourHook = (
  idActe?: string
): IResultatComposerDocumentFinalHook => {
  const [
    composerDocumentMentionFinalParams,
    setComposerDocumentMentionFinalParams
  ] = useState<IComposerDocumentMentionsUlterieuresParams>();
  const [
    composerDocumentMentionsUlterieuresResultat,
    reinitialiserComposerDocumentMentionsUlterieuresResultat
  ] = useComposerDocumentMentionsUlterieuresApiHook(
    composerDocumentMentionFinalParams
  );

  const handleComposerDocumentFinal = (
    document: string,
    informationsCarte: IInfosCarteSignature
  ) => {
    setComposerDocumentMentionFinalParams({
      idActe,
      issuerCertificat: informationsCarte.issuerCertificat,
      entiteCertificat: informationsCarte.entiteCertificat
    });
  };

  const composerDocumentApresSignature: ISuccesSignatureEtAppelApi<
    Exclude<typeof composerDocumentMentionsUlterieuresResultat, undefined>
  > = {
    onSuccesSignatureAppNative: handleComposerDocumentFinal,
    reinitialiserParamsApiHook:
      reinitialiserComposerDocumentMentionsUlterieuresResultat,
    resultatApiHook: composerDocumentMentionsUlterieuresResultat
  };

  // TODO: A faire avec l'US RECE-2552
  const integrerDocumentApresSignature: ISuccesSignatureEtAppelApi<number> = {
    onSuccesSignatureAppNative: (
      document: string,
      informationCarte: IInfosCarteSignature
    ): void => {
      messageManager.showInfo(
        "Le document recomposé est signé, mais la suite du processus de signature n'est pas implémenté. Voir RECE-2252 et RECE-2553."
      );
    },
    reinitialiserParamsApiHook: (): void => {
      throw new Error("Function not implemented.");
    }
  };

  return useComposerEtIntegrerDocumentFinalHook(
    composerDocumentApresSignature,
    integrerDocumentApresSignature,
    () => {}
  );
};

export default useSignatureMiseAJourHook;
