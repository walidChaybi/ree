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
import { IOfficier } from "@model/agent/IOfficier";
import { IInfosCarteSignature } from "@model/signature/IInfosCarteSignature";
import { useState } from "react";
import useComposerEtIntegrerDocumentFinalHook, {
  IMettreAJourStatutRequeteApresIntegration,
  IResultatComposerDocumentFinalHook,
  ISuccesSignatureEtAppelApi
} from "./ComposerEtIntegrerDocumentFinalHook";

export const useSignatureCreationEtablisementHook = (
  redirectionApresSuccesTraitementSignature: () => void,
  idActe?: string,
  idRequete?: string,
  idSuiviDossier?: string
): IResultatComposerDocumentFinalHook => {
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
  const {
    codeReponseResultat: codeReponseIntegrerActeSigne,
    reinitialiserParamsApiHook: reinitialiserCodeReponseIntegrerActeSigne
  } = useIntegrerActeSigneApiHook(integrerActeSigneParams);
  const mettreAJourStatutApresSignatureResultat =
    useMettreAJourStatutApresSignatureApiHook(
      mettreAJourStatutApresSignatureParams
    );

  const handleComposerDocumentFinal = (
    document: string,
    informationsCarte: IInfosCarteSignature
  ): void => {
    setComposerDocumentFinalParams({
      idActe,
      issuerCertificat: informationsCarte.issuerCertificat,
      entiteCertificat: informationsCarte.entiteCertificat
    });
  };

  const handleIntegrerDocumentSigne = (
    document: string,
    informationsCarte: IInfosCarteSignature,
    utilisateurConnecte: IOfficier
  ) => {
    if (idActe && utilisateurConnecte) {
      setIntegrerActeSigneParams({
        idActe,
        document,
        infosCarteSignature: informationsCarte,
        modeAuthentification: utilisateurConnecte.modeAuthentification
      });
    }
  };

  const handleMiseAJourStatutRequeteApresIntegration = () => {
    setMettreAJourStatutApresSignatureParams({
      idRequete,
      idSuiviDossier
    });
  };

  const composerDocumentApresSignature: ISuccesSignatureEtAppelApi<
    Exclude<typeof composerDocumentFinalResultat, undefined>
  > = {
    onSuccesSignatureAppNative: handleComposerDocumentFinal,
    reinitialiserParamsApiHook: reinitialiserComposerDocumentFinalResultat,
    resultatApiHook: composerDocumentFinalResultat
  };

  const integrerDocumentApresSignature: ISuccesSignatureEtAppelApi<
    Exclude<typeof codeReponseIntegrerActeSigne, undefined>
  > = {
    onSuccesSignatureAppNative: handleIntegrerDocumentSigne,
    reinitialiserParamsApiHook: reinitialiserCodeReponseIntegrerActeSigne,
    resultatApiHook: codeReponseIntegrerActeSigne
  };

  const mettreAJourStatutApresIntegration: IMettreAJourStatutRequeteApresIntegration =
    {
      resultatApiHook: mettreAJourStatutApresSignatureResultat,
      handleSetParamsApiHook: handleMiseAJourStatutRequeteApresIntegration,
      handleMiseAJourReussie: redirectionApresSuccesTraitementSignature
    };

  return useComposerEtIntegrerDocumentFinalHook(
    composerDocumentApresSignature,
    integrerDocumentApresSignature,
    mettreAJourStatutApresIntegration
  );
};
