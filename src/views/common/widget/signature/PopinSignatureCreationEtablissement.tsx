import { TUuidSuiviDossierParams } from "@model/params/TUuidSuiviDossierParams";
import { TypePopinSignature } from "@model/signature/ITypePopinSignature";
import { URL_REQUETES_CREATION_SERVICE_ETABLISSEMENT_APERCU_ACTE_REGISTRE_ID } from "@router/ReceUrls";
import { replaceUrl } from "@util/route/UrlUtil";
import { useNavigate, useParams } from "react-router-dom";
import { useSignatureCreationEtablisementHook } from "./hook/SignatureCreationActeEtablissementHook";
import { PopinPlageHoraireNonAutorisee } from "./messages/PopinPlageHoraireNonAutorisee";
import { PopinSignature, PopinSignatureProps } from "./PopinSignature";
import "./scss/PopinSignature.scss";

type PopinSignatureCreationEtablissementProps = {
  idActe?: string;
} & Pick<PopinSignatureProps, "estOuvert" | "setEstOuvert">;

const TRAITEMENT_SIGNATURE_TIMEOUT_MS = 45000;

export const PopinSignatureCreationEtablissement: React.FC<
  PopinSignatureCreationEtablissementProps
> = ({ idActe, estOuvert, setEstOuvert }) => {
  const navigate = useNavigate();
  const { idRequeteParam, idSuiviDossierParam } =
    useParams<TUuidSuiviDossierParams>();

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

  return (
    <>
      <PopinSignature
        titre="Signature du document"
        estOuvert={estOuvert}
        setEstOuvert={setEstOuvert}
        documentASigner={documentASigner}
        onSuccesSignature={onSuccesSignatureAppNative}
        texte={TypePopinSignature.getTextePopinSignatureActe()}
        etatTraitementSignature={etatTraitementSignature}
        onTraitementSignatureTermine={onTraitementSignatureTermine}
        timeoutTraitementSignature={TRAITEMENT_SIGNATURE_TIMEOUT_MS}
      />
      <PopinPlageHoraireNonAutorisee
        etatTraitementSignature={etatTraitementSignature}
      />
    </>
  );
};
