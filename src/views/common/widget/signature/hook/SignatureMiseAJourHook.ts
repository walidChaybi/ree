import {
  IIntegrerDocumentMentionsUlterieuresParams,
  useIntegrerDocumentMentionsUlterieuresApiHook
} from "@hook/acte/mentions/IntegrerDocumentMentionsUlterieuresApiHook";
import { IEtatTraitementSignature } from "@model/signature/IEtatTraitementSignature";
import { IInfosCarteSignature } from "@model/signature/IInfosCarteSignature";
import { storeRece } from "@util/storeRece";
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
    composerDocumentMentionsUlterieuresParams,
    setComposerDocumentMentionsUlterieuresParams
  ] = useState<IComposerDocumentMentionsUlterieuresParams>();
  const [
    integrerDocumentMentionsUlterieuresParams,
    setIntegrerDocumentMentionsUlterieuresParams
  ] = useState<IIntegrerDocumentMentionsUlterieuresParams>();

  const [
    composerDocumentMentionsUlterieuresResultat,
    reinitialiserComposerDocumentMentionsUlterieuresResultat
  ] = useComposerDocumentMentionsUlterieuresApiHook(
    composerDocumentMentionsUlterieuresParams
  );
  const {
    codeReponseResultat: codeReponseIntegrerDocumentMentionsUlterieures,
    reinitialiserParamsApiHook:
      reinitialiserCodeReponseIntegrerDocumentMentionsUlterieures
  } = useIntegrerDocumentMentionsUlterieuresApiHook(
    integrerDocumentMentionsUlterieuresParams
  );

  const handleComposerDocumentMentionsUlterieures = (
    document: string,
    informationsCarte: IInfosCarteSignature
  ) => {
    setComposerDocumentMentionsUlterieuresParams({
      idActe,
      issuerCertificat: informationsCarte.issuerCertificat,
      entiteCertificat: informationsCarte.entiteCertificat
    });
  };

  const handleIntegrerDocumentMentionsUlterieures = (
    document: string,
    informationsCarte: IInfosCarteSignature
  ) => {
    if (idActe && storeRece.utilisateurCourant) {
      setIntegrerDocumentMentionsUlterieuresParams({
        idActe,
        document,
        infosCarteSignature: informationsCarte,
        modeAuthentification: storeRece.utilisateurCourant.modeAuthentification
      });
    }
  };

  const handleMiseAJourStatutRequeteApresIntegration = (
    setEtatTraitementSignature?: React.Dispatch<
      React.SetStateAction<IEtatTraitementSignature>
    >
  ) => {
    setEtatTraitementSignature && setEtatTraitementSignature({ termine: true });
  };

  const composerDocumentApresSignature: ISuccesSignatureEtAppelApi<
    Exclude<typeof composerDocumentMentionsUlterieuresResultat, undefined>
  > = {
    onSuccesSignatureAppNative: handleComposerDocumentMentionsUlterieures,
    reinitialiserParamsApiHook:
      reinitialiserComposerDocumentMentionsUlterieuresResultat,
    resultatApiHook: composerDocumentMentionsUlterieuresResultat
  };

  const integrerDocumentApresSignature: ISuccesSignatureEtAppelApi<number> = {
    onSuccesSignatureAppNative: handleIntegrerDocumentMentionsUlterieures,
    reinitialiserParamsApiHook:
      reinitialiserCodeReponseIntegrerDocumentMentionsUlterieures,
    resultatApiHook: codeReponseIntegrerDocumentMentionsUlterieures
  };

  return useComposerEtIntegrerDocumentFinalHook(
    composerDocumentApresSignature,
    integrerDocumentApresSignature,
    handleMiseAJourStatutRequeteApresIntegration
  );
};

export default useSignatureMiseAJourHook;
