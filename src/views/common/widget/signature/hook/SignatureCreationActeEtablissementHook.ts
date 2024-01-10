import { HTTP_STATUS_OK } from "@api/ApiManager";
import {
  IComposerDocumentFinalApiHookParams,
  IErreurCompositionDocumentSigne,
  useComposerDocumentFinalApiHook
} from "@hook/acte/ComposerDocumentFinalApiHook";
import {
  IEnregistrerActeSigneApiHookParams,
  useEnregistrerActeSigneApiHook
} from "@hook/acte/EnregistrerActeSigneApiHook";
import useModifierStatutRequeteEtAvancementProjetApresSignatureApiHook, {
  IModifierStatutRequeteEtAvancementProjetApresSignatureParams
} from "@hook/requete/ModifierStatutRequeteEtAvancementProjetActeApresSignatureApiHook";
import { useEffect, useState } from "react";
import { IInfosCarteSignature } from "../types";
import { storeRece } from "./../../../util/storeRece";
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
  const [enregistrerActeSigneParams, setEnregistrerActeSigneParams] =
    useState<IEnregistrerActeSigneApiHookParams>();
  const [
    modifierStatutRequeteEtAvancementProjetApresSignatureParams,
    setModifierStatutRequeteEtAvancementProjetApresSignatureParams
  ] = useState<IModifierStatutRequeteEtAvancementProjetApresSignatureParams>();

  const composerDocumentFinalResultat = useComposerDocumentFinalApiHook(
    composerDocumentFinalParams
  );
  const codeReponseEnregistrerActeSigne = useEnregistrerActeSigneApiHook(
    enregistrerActeSigneParams
  );
  useModifierStatutRequeteEtAvancementProjetApresSignatureApiHook(
    modifierStatutRequeteEtAvancementProjetApresSignatureParams
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
    if (codeReponseEnregistrerActeSigne) {
      setTraitementSignatureTermine({ termine: true });
      setModifierStatutRequeteEtAvancementProjetApresSignatureParams({
        idRequete,
        idSuiviDossier
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        storeRece.utilisateurCourant &&
          setEnregistrerActeSigneParams({
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
