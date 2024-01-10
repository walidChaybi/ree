import { HTTP_STATUS_OK } from "@api/ApiManager";
import {
  IComposerDocumentFinalApiHookParams,
  IErreurCompositionDocumentSigne,
  useComposerDocumentFinalApiHook
} from "@hook/acte/ComposerDocumentFinalApiHook";
import {
  IIntegrerActeSigneApiHookParams,
  useIntegrerActeSigneApiHook
} from "@hook/acte/IntegrerActeSigneApiHook";
import useMettreAJourStatutApresSignatureApiHook, {
  IMettreAJourStatutApresSignatureParams
} from "@hook/requete/MettreAJourStatutApresSignatureApiHook";
import { storeRece } from "@util/storeRece";
import { useEffect, useState } from "react";
import { IInfosCarteSignature } from "../types";
import { DOCUMENT_VIDE_A_SIGNER } from "./SignatureHookUtil";

export interface IEtatTraitementSignature {
  termine: boolean;
  erreur?: IErreurCompositionDocumentSigne;
}

export const useSignatureCreationEtablisementHook = (
  idActe?: string,
  idRequete?: string,
  idSuiviDossier?: string
) => {
  const [traitementSignatureTermine, setTraitementSignatureTermine] =
    useState<IEtatTraitementSignature>({ termine: false });
  const [documentASigner, setDocumentASigner] = useState<string>(
    DOCUMENT_VIDE_A_SIGNER
  );
  const [composerDocumentFinalParams, setComposerDocumentFinalParams] =
    useState<IComposerDocumentFinalApiHookParams>();
  const [integrerActeSigneParams, setIntegrerActeSigneParams] =
    useState<IIntegrerActeSigneApiHookParams>();
  const [
    mettreAJourStatutApresSignatureParams,
    setMettreAJourStatutApresSignatureParams
  ] = useState<IMettreAJourStatutApresSignatureParams>();

  const composerDocumentFinalResultat = useComposerDocumentFinalApiHook(
    composerDocumentFinalParams
  );
  const codeReponseIntegrerActeSigne = useIntegrerActeSigneApiHook(
    integrerActeSigneParams
  );
  useMettreAJourStatutApresSignatureApiHook(
    mettreAJourStatutApresSignatureParams
  );

  useEffect(() => {
    if (composerDocumentFinalResultat) {
      if (composerDocumentFinalResultat.codeReponse !== HTTP_STATUS_OK) {
        setTraitementSignatureTermine({
          termine: true,
          erreur: composerDocumentFinalResultat.erreur
        });
      } else {
        setDocumentASigner(
          composerDocumentFinalResultat.documentRecomposeASigner
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [composerDocumentFinalResultat]);

  useEffect(() => {
    if (codeReponseIntegrerActeSigne) {
      setTraitementSignatureTermine({ termine: true });
      setMettreAJourStatutApresSignatureParams({
        idRequete,
        idSuiviDossier
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeReponseIntegrerActeSigne]);

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
        storeRece.utilisateurCourant &&
          setIntegrerActeSigneParams({
            idActe,
            document,
            infosCarteSignature: informationsCarte,
            modeAuthentification:
              storeRece.utilisateurCourant?.modeAuthentification
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
