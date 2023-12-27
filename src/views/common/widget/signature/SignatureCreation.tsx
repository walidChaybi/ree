import React from "react";
import { useSignatureCreationEtablisementHook } from "./hook/SignatureCreationActeEtablissementHook";
import { PopinSignature, PopinSignatureProps } from "./PopinSignature";
import "./scss/PopinSignature.scss";

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
  const { documentASigner, onSuccesSignature, traitementSignatureTermine } =
    useSignatureCreationEtablisementHook(idActe);

  return (
    <PopinSignature
      titre="Signature du document"
      estOuvert={estOuvert}
      setEstOuvert={setEstOuvert}
      documentASigner={documentASigner}
      onSuccesSignature={onSuccesSignature}
      texte={TEXTE_POPIN}
      traitementSignatureTermine={traitementSignatureTermine}
    />
  );
};
