import {
  IComposerDocumentFinalApiHookParams,
  useComposerDocumentFinalApiHook
} from "@hook/acte/ComposerDocumentFinalApiHook";
import React, { useEffect, useState } from "react";
import { DOCUMENT_VIDE_A_SIGNER } from "./hook/SignatureHookUtil";
import { PopinSignature, PopinSignatureProps } from "./PopinSignature";
import "./scss/PopinSignature.scss";
import { IInfosCarteSignature } from "./types";

type SignatureCreationProps = {
  idActe?: string;
} & Pick<PopinSignatureProps, "estOuvert" | "setEstOuvert">;

const TEXTE_POPIN =
  "En cliquant sur VALIDER, vous acceptez de signer électroniquement un document qui comportera les données suivantes insérées automatiquement : un numéro d’ordre, constitutif " +
  "de la référence de l’acte dans le RECE, informatiquement attribué selon une numérotation chronologique annuelle ; la formule de désignation de l’officier de l’état civil, " +
  "comprenant ses nom et prénom usuel contenus dans le dispositif de création de signature qualifiée, ses fonctions, et le nom de la ville où il exerce ; la date de signature.";

export const SignatureCreation: React.FC<SignatureCreationProps> = ({
  idActe,
  estOuvert,
  setEstOuvert
}) => {
  const [composerDocumentFinalParams, setComposerDocumentFinalParams] =
    useState<IComposerDocumentFinalApiHookParams>();
  const composerDocumentFinalResultat = useComposerDocumentFinalApiHook(
    composerDocumentFinalParams
  );

  useEffect(() => {
    // TODO: A déplacer autre part quand on aura complètement terminé le pipeline de signature.
    if (composerDocumentFinalResultat) {
      setEstOuvert(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [composerDocumentFinalResultat]);

  function onSuccesSignature(
    document: string,
    informationsCarte: IInfosCarteSignature
  ) {
    console.log("onSuccesSignature", informationsCarte);
    setComposerDocumentFinalParams({
      idActe,
      issuerCertificat: informationsCarte.issuerCertificat,
      nomDansCertificat: informationsCarte.nomDansCertificat
    });
  }

  return (
    <PopinSignature
      titre="Signature du document"
      estOuvert={estOuvert}
      setEstOuvert={setEstOuvert}
      documentASigner={DOCUMENT_VIDE_A_SIGNER}
      onSuccesSignature={onSuccesSignature}
      texte={TEXTE_POPIN}
    />
  );
};
