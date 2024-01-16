import { HTTP_STATUS_OK } from "@api/ApiManager";
import {
  IComposerDocumentFinalApiHookParams,
  useComposerDocumentFinalApiHook
} from "@hook/acte/ComposerDocumentFinalApiHook";
import {
  IIntegrerActeSigneApiHookParams,
  useIntegrerActeSigneApiHook
} from "@hook/acte/IntegrerActeSigneApiHook";
import useMettreAJourStatutApresSignatureApiHook, {
  IMettreAJourStatutApresSignatureParams
} from "@hook/requete/MettreAJourStatutApresSignatureApiHook";
import { IEtatTraitementSignature } from "@model/signature/IEtatTraitementSignature";
import { IInfosCarteSignature } from "@model/signature/IInfosCarteSignature";
import { storeRece } from "@util/storeRece";
import { useEffect, useState } from "react";
import { HTTP_BAD_REQUEST } from "./../../../../../api/ApiManager";
import { DOCUMENT_VIDE_A_SIGNER } from "./SignatureHookUtil";

export const useSignatureCreationEtablisementHook = (
  redirectionApresSuccesTraitementSignature: () => void,
  idActe?: string,
  idRequete?: string,
  idSuiviDossier?: string
) => {
  const [etatTraitementSignature, setEtatTraitementSignature] =
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

  const [
    composerDocumentFinalResultat,
    reinitialiserComposerDocumentFinalResultat
  ] = useComposerDocumentFinalApiHook(composerDocumentFinalParams);
  const [
    codeReponseIntegrerActeSigne,
    reinitialiserCodeReponseIntegrerActeSigne
  ] = useIntegrerActeSigneApiHook(integrerActeSigneParams);
  const mettreAJourStatutApresSignatureResultat =
    useMettreAJourStatutApresSignatureApiHook(
      mettreAJourStatutApresSignatureParams
    );

  useEffect(() => {
    if (composerDocumentFinalResultat) {
      if (composerDocumentFinalResultat.codeReponse !== HTTP_STATUS_OK) {
        setEtatTraitementSignature({
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
      if (codeReponseIntegrerActeSigne === HTTP_STATUS_OK) {
        setMettreAJourStatutApresSignatureParams({
          idRequete,
          idSuiviDossier
        });
      } else {
        setEtatTraitementSignature({
          termine: true,
          erreur: {
            code:
              codeReponseIntegrerActeSigne?.toString() ||
              HTTP_BAD_REQUEST.toString(),
            message: ""
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeReponseIntegrerActeSigne]);

  useEffect(() => {
    if (mettreAJourStatutApresSignatureResultat) {
      setEtatTraitementSignature({
        termine: true,
        erreur: mettreAJourStatutApresSignatureResultat.erreur
      });
    }
  }, [mettreAJourStatutApresSignatureResultat]);

  const onSuccesSignatureAppNative = (
    document: string,
    informationsCarte: IInfosCarteSignature
  ): void => {
    if (idActe) {
      if (!composerDocumentFinalResultat) {
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

  const onTraitementSignatureTermine = () => {
    if (!etatTraitementSignature.erreur) {
      redirectionApresSuccesTraitementSignature();
    }
    setEtatTraitementSignature({ termine: false });
    reinitialiserComposerDocumentFinalResultat();
    reinitialiserCodeReponseIntegrerActeSigne();
  };

  return {
    documentASigner,
    onSuccesSignatureAppNative,
    etatTraitementSignature,
    onTraitementSignatureTermine
  };
};
