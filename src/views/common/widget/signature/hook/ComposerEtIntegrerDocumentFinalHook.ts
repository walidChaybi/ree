import { HTTP_BAD_REQUEST, HTTP_STATUS_OK } from "@api/ApiManager";
import { IModifierStatutRequeteApresSignature } from "@model/requete/IModifierStatutRequeteApresSignature";
import { IComposerDocumentFinalApiHookResultat } from "@model/signature/IComposerDocumentFinalApiHookResultat";
import { IEtatTraitementSignature } from "@model/signature/IEtatTraitementSignature";
import { IInfosCarteSignature } from "@model/signature/IInfosCarteSignature";
import { useEffect, useState } from "react";
import { DOCUMENT_VIDE_A_SIGNER } from "./SignatureHookUtil";

export interface IResultatComposerDocumentFinalHook {
  documentASigner: string;
  etatTraitementSignature: IEtatTraitementSignature;
  onSuccesSignatureAppNative: (
    document: string,
    informationsCarte: IInfosCarteSignature
  ) => void;
  onTraitementSignatureTermine: () => void;
}

export interface ISuccesSignatureEtAppelApi<
  TResultat extends IComposerDocumentFinalApiHookResultat | number
> {
  onSuccesSignatureAppNative: (
    document: string,
    informationCarte: IInfosCarteSignature
  ) => void;
  reinitialiserParamsApiHook: () => void;
  resultatApiHook?: TResultat;
}

export interface IMettreAJourStatutRequeteApresIntegration {
  handleSetParamsApiHook: () => void;
  resultatApiHook?: IModifierStatutRequeteApresSignature;
  handleMiseAJourReussie?: () => void;
}

const useComposerEtIntegrerDocumentFinalHook = (
  composerDocumentApresSignature: ISuccesSignatureEtAppelApi<IComposerDocumentFinalApiHookResultat>,
  integrerDocumentApresSignature: ISuccesSignatureEtAppelApi<number>,
  mettreAJourStatutRequeteApresIntegration: IMettreAJourStatutRequeteApresIntegration
): IResultatComposerDocumentFinalHook => {
  const [etatTraitementSignature, setEtatTraitementSignature] =
    useState<IEtatTraitementSignature>({ termine: false });

  // On initialise le state avec un document "vide", dans le but de récupérer
  // les informations de la carte de signature lors d'une première signature "fictive".
  const [documentASigner, setDocumentASigner] = useState<string>(
    DOCUMENT_VIDE_A_SIGNER
  );

  // Une fois le document final recomposé, on met à jour le state "documentASigner"
  // afin de signer notre document final.
  useEffect(() => {
    if (composerDocumentApresSignature.resultatApiHook) {
      if (
        composerDocumentApresSignature.resultatApiHook.codeReponse !==
        HTTP_STATUS_OK
      ) {
        setEtatTraitementSignature({
          termine: true,
          erreur: composerDocumentApresSignature.resultatApiHook.erreur
        });
      } else {
        setDocumentASigner(
          composerDocumentApresSignature.resultatApiHook
            .documentRecomposeASigner
        );
      }
    }
  }, [composerDocumentApresSignature.resultatApiHook]);

  // Une fois le document final signé puis intégré,
  // on déclenche le changement de statut de la requête.
  useEffect(() => {
    if (integrerDocumentApresSignature.resultatApiHook) {
      if (integrerDocumentApresSignature.resultatApiHook === HTTP_STATUS_OK) {
        mettreAJourStatutRequeteApresIntegration.handleSetParamsApiHook();
      } else {
        setEtatTraitementSignature({
          termine: true,
          erreur: {
            code:
              integrerDocumentApresSignature.resultatApiHook.toString() ||
              HTTP_BAD_REQUEST.toString(),
            message: ""
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [integrerDocumentApresSignature.resultatApiHook]);

  useEffect(() => {
    if (mettreAJourStatutRequeteApresIntegration.resultatApiHook) {
      if (
        !mettreAJourStatutRequeteApresIntegration.resultatApiHook.erreur &&
        mettreAJourStatutRequeteApresIntegration.handleMiseAJourReussie
      ) {
        mettreAJourStatutRequeteApresIntegration.handleMiseAJourReussie();
      }
      setEtatTraitementSignature({
        termine: true,
        erreur: mettreAJourStatutRequeteApresIntegration.resultatApiHook.erreur
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mettreAJourStatutRequeteApresIntegration.resultatApiHook]);

  // Si aucun résultat n'a été reçu de l'appel à la composition du document final,
  // c'est qu'on n'est pas passé par l'étape de composition.
  // Sinon, nous sommes à l'étape de l'intégration du document
  const onSuccesSignatureAppNative = (
    document: string,
    informationsCarte: IInfosCarteSignature
  ): void => {
    if (!composerDocumentApresSignature.resultatApiHook) {
      composerDocumentApresSignature.onSuccesSignatureAppNative(
        document,
        informationsCarte
      );
    } else {
      integrerDocumentApresSignature.onSuccesSignatureAppNative(
        document,
        informationsCarte
      );
    }
  };

  // Dès que 'etatTraitementSignature.termine' passe à 'true',
  // cette fonction sera appelée dans PopinSignature.
  const onTraitementSignatureTermine = () => {
    setEtatTraitementSignature({ termine: false });
    composerDocumentApresSignature.resultatApiHook &&
      composerDocumentApresSignature.reinitialiserParamsApiHook();
    integrerDocumentApresSignature.resultatApiHook &&
      integrerDocumentApresSignature.reinitialiserParamsApiHook();
  };

  return {
    documentASigner,
    etatTraitementSignature,
    onSuccesSignatureAppNative,
    onTraitementSignatureTermine
  };
};

export default useComposerEtIntegrerDocumentFinalHook;
