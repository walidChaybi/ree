import { UtilisateurConnecte } from "@model/agent/Utilisateur";
import { IInfosCarteSignature } from "@model/signature/IInfosCarteSignature";
import { IComposerDocumentFinalApiHookParams, useComposerDocumentFinalApiHook } from "@views/common/hook/acte/ComposerDocumentFinalApiHook";
import { IIntegrerActeSigneApiHookParams, useIntegrerActeSigneApiHook } from "@views/common/hook/acte/IntegrerActeSigneApiHook";
import useMettreAJourStatutApresSignatureApiHook, {
  IMettreAJourStatutApresSignatureParams
} from "@views/common/hook/requete/MettreAJourStatutApresSignatureApiHook";
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
  const [composerDocumentFinalParams, setComposerDocumentFinalParams] = useState<IComposerDocumentFinalApiHookParams>();
  const [integrerActeSigneParams, setIntegrerActeSigneParams] = useState<IIntegrerActeSigneApiHookParams>();
  const [mettreAJourStatutApresSignatureParams, setMettreAJourStatutApresSignatureParams] =
    useState<IMettreAJourStatutApresSignatureParams>();

  const [composerDocumentFinalResultat, reinitialiserComposerDocumentFinalResultat] =
    useComposerDocumentFinalApiHook(composerDocumentFinalParams);
  const { codeReponseResultat: codeReponseIntegrerActeSigne, reinitialiserParamsApiHook: reinitialiserCodeReponseIntegrerActeSigne } =
    useIntegrerActeSigneApiHook(integrerActeSigneParams);
  const mettreAJourStatutApresSignatureResultat = useMettreAJourStatutApresSignatureApiHook(mettreAJourStatutApresSignatureParams);

  const handleComposerDocumentFinal = (document: string, informationsCarte: IInfosCarteSignature): void => {
    setComposerDocumentFinalParams({
      idActe,
      issuerCertificat: informationsCarte.issuerCertificat,
      entiteCertificat: informationsCarte.entiteCertificat
    });
  };

  const handleIntegrerDocumentSigne = (
    document: string,
    informationsCarte: IInfosCarteSignature,
    utilisateurConnecte: UtilisateurConnecte
  ) => {
    if (idActe && utilisateurConnecte) {
      setIntegrerActeSigneParams({
        idActe,
        document,
        infosCarteSignature: informationsCarte,
        modeAuthentification: "AROBAS_MDP"
      });
    }
  };

  const handleMiseAJourStatutRequeteApresIntegration = () => {
    setMettreAJourStatutApresSignatureParams({
      idRequete,
      idSuiviDossier
    });
  };

  const composerDocumentApresSignature: ISuccesSignatureEtAppelApi<Exclude<typeof composerDocumentFinalResultat, undefined>> = {
    onSuccesSignatureAppNative: handleComposerDocumentFinal,
    reinitialiserParamsApiHook: reinitialiserComposerDocumentFinalResultat,
    resultatApiHook: composerDocumentFinalResultat
  };

  const integrerDocumentApresSignature: ISuccesSignatureEtAppelApi<Exclude<typeof codeReponseIntegrerActeSigne, undefined>> = {
    onSuccesSignatureAppNative: handleIntegrerDocumentSigne,
    reinitialiserParamsApiHook: reinitialiserCodeReponseIntegrerActeSigne,
    resultatApiHook: codeReponseIntegrerActeSigne
  };

  const mettreAJourStatutApresIntegration: IMettreAJourStatutRequeteApresIntegration = {
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
