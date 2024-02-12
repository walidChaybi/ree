import { TUuidSuiviDossierParams } from "@model/params/TUuidSuiviDossierParams";
import { CodeErreurFonctionnelle } from "@model/requete/CodeErreurFonctionnelle";
import { URL_REQUETES_CREATION_SERVICE_ETABLISSEMENT_APERCU_ACTE_REGISTRE_ID } from "@router/ReceUrls";
import { replaceUrl } from "@util/route/UrlUtil";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();
  const { idRequeteParam, idSuiviDossierParam } =
    useParams<TUuidSuiviDossierParams>();

  const [estOuvertPopinConfirmation, setEstOuvertPopinConfirmation] =
    useState<boolean>(false);

  const redirectionApresSuccesTraitementSignature = () => {
    if (idActe) {
      const url =
        URL_REQUETES_CREATION_SERVICE_ETABLISSEMENT_APERCU_ACTE_REGISTRE_ID.replace(
          ":idRequeteParam",
          idRequeteParam || ""
        ).replace(":idActeParam", idActe);
      replaceUrl(navigate, url);
    }
  };

  const {
    documentASigner,
    onSuccesSignatureAppNative,
    etatTraitementSignature,
    onTraitementSignatureTermine
  } = useSignatureCreationEtablisementHook(
    redirectionApresSuccesTraitementSignature,
    idActe,
    idRequeteParam,
    idSuiviDossierParam
  );

  useEffect(() => {
    setEstOuvertPopinConfirmation(
      etatTraitementSignature.erreur?.code ===
        CodeErreurFonctionnelle.FCT_PLAGE_HORAIRE_SIGNATURE
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [etatTraitementSignature]);

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
        onSuccesSignature={onSuccesSignatureAppNative}
        texte={TEXTE_POPIN}
        etatTraitementSignature={etatTraitementSignature}
        onTraitementSignatureTermine={onTraitementSignatureTermine}
        timeoutTraitementSignature={TRAITEMENT_SIGNATURE_TIMEOUT_MS}
      />
      <ConfirmationPopin
        messages={
          etatTraitementSignature.erreur?.message
            ? [etatTraitementSignature.erreur.message]
            : undefined
        }
        isOpen={estOuvertPopinConfirmation}
        boutons={boutonsPopinConfirmation}
      />
    </>
  );
};
