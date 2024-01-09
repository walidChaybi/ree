import { IUuidSuiviDossierParams } from "@model/params/IUuidSuiviDossierParams";
import React from "react";
import { useParams } from "react-router";
import { useSignatureCreationEtablisementHook } from "./hook/SignatureCreationActeEtablissementHook";
import { PopinSignature, PopinSignatureProps } from "./PopinSignature";
import "./scss/PopinSignature.scss";

type PopinSignatureCreationEtablissementProps = {
  idActe?: string;
} & Pick<PopinSignatureProps, "estOuvert" | "setEstOuvert">;

const TEXTE_POPIN =
  "En cliquant sur VALIDER, vous acceptez de signer électroniquement un document qui comportera les données suivantes insérées automatiquement : un numéro d’ordre, constitutif " +
  "de la référence de l’acte dans le RECE, informatiquement attribué selon une numérotation chronologique annuelle ; la formule de désignation de l’officier de l’état civil, " +
  "comprenant ses nom et prénom usuel contenus dans le dispositif de création de signature qualifiée, ses fonctions, et le nom de la ville où il exerce ; la date de signature.";

const TRAITEMENT_SIGNATURE_TIMEOUT_MS = 45000;

export const PopinSignatureCreationEtablissement: React.FC<
  PopinSignatureCreationEtablissementProps
> = ({ idActe, estOuvert, setEstOuvert }) => {
  const { idRequeteParam, idSuiviDossierParam } =
    useParams<IUuidSuiviDossierParams>();
  const { documentASigner, onSuccesSignature, traitementSignatureTermine } =
    useSignatureCreationEtablisementHook(
      idActe,
      idRequeteParam,
      idSuiviDossierParam
    );

  return (
    <PopinSignature
      titre="Signature du document"
      estOuvert={estOuvert}
      setEstOuvert={setEstOuvert}
      documentASigner={documentASigner}
      onSuccesSignature={onSuccesSignature}
      texte={TEXTE_POPIN}
      traitementSignatureTermine={traitementSignatureTermine}
      timeoutTraitementSignature={TRAITEMENT_SIGNATURE_TIMEOUT_MS}
    />
  );
};
