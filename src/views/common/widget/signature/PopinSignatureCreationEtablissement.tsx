import { IUuidSuiviDossierParams } from "@model/params/IUuidSuiviDossierParams";
import { Erreurs } from "@model/requete/Erreurs";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { PopinSignature, PopinSignatureProps } from "./PopinSignature";
import { useSignatureCreationEtablisementHook } from "./hook/SignatureCreationActeEtablissementHook";
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
  const [estOuvertPopinConfirmation, setEstOuvertPopinConfirmation] =
    useState<boolean>(false);
  const { idRequeteParam, idSuiviDossierParam } =
    useParams<IUuidSuiviDossierParams>();
  const { documentASigner, onSuccesSignature, traitementSignatureTermine } =
    useSignatureCreationEtablisementHook(
      idActe,
      idRequeteParam,
      idSuiviDossierParam
    );

  useEffect(() => {
    setEstOuvertPopinConfirmation(
      traitementSignatureTermine.erreur?.code ===
        Erreurs.FCT_PLAGE_HORAIRE_SIGNATURE
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [traitementSignatureTermine]);

  const boutonsPopinConfirmation = [
    {
      label: "Fermer",
      action: () => {
        setEstOuvertPopinConfirmation(false);
      },
      color: "primary"
    }
  ];

  return (
    <>
      <PopinSignature
        titre="Signature du document"
        estOuvert={estOuvert}
        setEstOuvert={setEstOuvert}
        documentASigner={documentASigner}
        onSuccesSignature={onSuccesSignature}
        texte={TEXTE_POPIN}
        traitementSignatureTermine={traitementSignatureTermine.termine}
        timeoutTraitementSignature={TRAITEMENT_SIGNATURE_TIMEOUT_MS}
      />
      <ConfirmationPopin
        messages={
          traitementSignatureTermine.erreur?.message
            ? [traitementSignatureTermine.erreur.message]
            : undefined
        }
        isOpen={estOuvertPopinConfirmation}
        boutons={boutonsPopinConfirmation}
      />
    </>
  );
};



