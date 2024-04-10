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
import { IInfosCarteSignature } from "@model/signature/IInfosCarteSignature";
import { storeRece } from "@util/storeRece";
import { useEffect, useState } from "react";
import useComposerEtIntegrerDocumentFinalHook, {
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
    informationsCarte: IInfosCarteSignature
  ) => {
    if (idActe && storeRece.utilisateurCourant) {
      setIntegrerActeSigneParams({
        idActe,
        document,
        infosCarteSignature: informationsCarte,
        modeAuthentification: storeRece.utilisateurCourant.modeAuthentification
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

  const composerEtIntegrerDocumentFinal =
    useComposerEtIntegrerDocumentFinalHook(
      composerDocumentApresSignature,
      integrerDocumentApresSignature,
      handleMiseAJourStatutRequeteApresIntegration
    );

  useEffect(() => {
    if (mettreAJourStatutApresSignatureResultat) {
      if (!mettreAJourStatutApresSignatureResultat.erreur) {
        redirectionApresSuccesTraitementSignature();
      } else {
        composerEtIntegrerDocumentFinal.setEtatTraitementSignature({
          termine: true,
          erreur: mettreAJourStatutApresSignatureResultat.erreur
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mettreAJourStatutApresSignatureResultat]);

  return composerEtIntegrerDocumentFinal;
};
