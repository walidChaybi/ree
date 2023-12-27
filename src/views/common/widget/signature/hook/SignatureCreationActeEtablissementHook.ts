import { HTTP_STATUS_OK } from "@api/ApiManager";
import {
  IComposerDocumentFinalApiHookParams,
  useComposerDocumentFinalApiHook
} from "@hook/acte/ComposerDocumentFinalApiHook";
import {
  IEnregistrerActeSigneApiHookParams,
  useEnregistrerActeSigneApiHook
} from "@hook/acte/EnregistrerActeSigneApiHook";
import { useEffect, useState } from "react";
import { IInfosCarteSignature } from "../types";
import { DOCUMENT_VIDE_A_SIGNER } from "./SignatureHookUtil";

export const useSignatureCreationEtablisementHook = (idActe?: string) => {
  const [traitementSignatureTermine, setTraitementSignatureTermine] =
    useState(false);
  const [documentASigner, setDocumentASigner] = useState<string>(
    DOCUMENT_VIDE_A_SIGNER
  );
  const [composerDocumentFinalParams, setComposerDocumentFinalParams] =
    useState<IComposerDocumentFinalApiHookParams>();
  const [enregistrerActeSigneParams, setEnregistrerActeSigneParams] =
    useState<IEnregistrerActeSigneApiHookParams>();

  const composerDocumentFinalResultat = useComposerDocumentFinalApiHook(
    composerDocumentFinalParams
  );
  const codeReponseEnregistrerActeSigne = useEnregistrerActeSigneApiHook(
    enregistrerActeSigneParams
  );

  useEffect(() => {
    if (composerDocumentFinalResultat) {
      setDocumentASigner(
        composerDocumentFinalResultat.documentRecomposeASigner
      );
      if (composerDocumentFinalResultat.codeReponse !== HTTP_STATUS_OK) {
        setTraitementSignatureTermine(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [composerDocumentFinalResultat]);

  useEffect(() => {
    if (codeReponseEnregistrerActeSigne) {
      setTraitementSignatureTermine(true);
    }
  }, [codeReponseEnregistrerActeSigne]);

  const onSuccesSignature = (
    document: string,
    informationsCarte: IInfosCarteSignature
  ): void => {
    if (idActe) {
      if (!composerDocumentFinalParams) {
        setComposerDocumentFinalParams({
          idActe,
          issuerCertificat: informationsCarte.issuerCertificat,
          entiteCertificat: informationsCarte.entiteCertificat
        });
      } else {
        setEnregistrerActeSigneParams({
          idActe,
          document,
          infosCarteSignature: informationsCarte
        });
      }
    }
  };

  return {
    documentASigner,
    onSuccesSignature,
    traitementSignatureTermine
  };
};
