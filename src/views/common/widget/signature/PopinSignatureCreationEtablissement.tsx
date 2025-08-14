import { TUuidSuiviDossierParams } from "@model/params/TUuidSuiviDossierParams";
import { TypePopinSignature } from "@model/signature/ITypePopinSignature";
import { useNavigate, useParams } from "react-router";
import LiensRECE from "../../../../router/LiensRECE";
import { INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_ACTE_REGISTRE } from "../../../../router/infoPages/InfoPagesEspaceEtablissement";
import { PopinSignature, PopinSignatureProps } from "./PopinSignature";
import { useSignatureCreationEtablisementHook } from "./hook/SignatureCreationActeEtablissementHook";
import { PopinPlageHoraireNonAutorisee } from "./messages/PopinPlageHoraireNonAutorisee";
import "./scss/PopinSignature.scss";

type PopinSignatureCreationEtablissementProps = {
  idActe?: string;
} & Pick<PopinSignatureProps, "estOuvert" | "setEstOuvert">;

const TRAITEMENT_SIGNATURE_TIMEOUT_MS = 45000;

export const PopinSignatureCreationEtablissement: React.FC<PopinSignatureCreationEtablissementProps> = ({
  idActe,
  estOuvert,
  setEstOuvert
}) => {
  const navigate = useNavigate();
  const { idRequeteParam, idSuiviDossierParam } = useParams<TUuidSuiviDossierParams>();

  const redirectionApresSuccesTraitementSignature = () => {
    if (idActe) {
      navigate(
        LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_ACTE_REGISTRE.url, {
          idRequeteParam: idRequeteParam || "",
          idActeParam: idActe
        }),
        { replace: true }
      );
    }
  };

  const { documentASigner, onSuccesSignatureAppNative, etatTraitementSignature, onTraitementSignatureTermine } =
    useSignatureCreationEtablisementHook(redirectionApresSuccesTraitementSignature, idActe, idRequeteParam, idSuiviDossierParam);

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
      <PopinPlageHoraireNonAutorisee etatTraitementSignature={etatTraitementSignature} />
    </>
  );
};
