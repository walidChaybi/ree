import {
  IIntegrerDocumentMentionsUlterieuresParams,
  useIntegrerDocumentMentionsUlterieuresApiHook
} from "@hook/acte/mentions/IntegrerDocumentMentionsUlterieuresApiHook";
import { IOfficier } from "@model/agent/IOfficier";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IInfosCarteSignature } from "@model/signature/IInfosCarteSignature";
import { useState } from "react";
import {
  IComposerDocumentMentionsUlterieuresParams,
  useComposerDocumentMentionsUlterieuresApiHook
} from "../../../hook/acte/mentions/ComposerDocumentMentionsUlterieuresApiHook";
import {
  IModifierStatutRequeteMiseAJourParams,
  useModifierStatutRequeteMiseAJourApiHook
} from "./../../../hook/requete/miseajour/ModifierStatutRequeteMiseAJourApiHook";
import useComposerEtIntegrerDocumentFinalHook, {
  IMettreAJourStatutRequeteApresIntegration,
  IResultatComposerDocumentFinalHook,
  ISuccesSignatureEtAppelApi
} from "./ComposerEtIntegrerDocumentFinalHook";

const useSignatureMiseAJourHook = (
  idActe?: string,
  idRequete?: string
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
    modifierStatutRequeteMiseAJourParams,
    setModifierStatutRequeteMiseAJourParams
  ] = useState<IModifierStatutRequeteMiseAJourParams>();

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
  const mettreAJourStatutApresSignatureResultat =
    useModifierStatutRequeteMiseAJourApiHook(
      modifierStatutRequeteMiseAJourParams
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
    informationsCarte: IInfosCarteSignature,
    utilisateurConnecte: IOfficier
  ) => {
    if (idActe && utilisateurConnecte) {
      setIntegrerDocumentMentionsUlterieuresParams({
        idActe,
        document,
        infosCarteSignature: informationsCarte,
        modeAuthentification: utilisateurConnecte.modeAuthentification
      });
    }
  };

  const handleMiseAJourStatutRequeteApresIntegration = () => {
    if (idRequete) {
      setModifierStatutRequeteMiseAJourParams({
        idRequete,
        statutRequete: StatutRequete.TRAITEE_MIS_A_JOUR
      });
    }
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

  const mettreAJourStatutApresIntegration: IMettreAJourStatutRequeteApresIntegration =
    {
      resultatApiHook: mettreAJourStatutApresSignatureResultat,
      handleSetParamsApiHook: handleMiseAJourStatutRequeteApresIntegration
    };

  return useComposerEtIntegrerDocumentFinalHook(
    composerDocumentApresSignature,
    integrerDocumentApresSignature,
    mettreAJourStatutApresIntegration
  );
};

export default useSignatureMiseAJourHook;
