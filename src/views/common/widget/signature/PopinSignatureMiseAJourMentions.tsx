import { TUuidActeParams } from "@model/params/TUuidActeParams";
import { TypePopinSignature } from "@model/signature/ITypePopinSignature";
import { getLibelle } from "@util/Utils";
import { useParams } from "react-router";
import { PopinSignature, PopinSignatureProps } from "./PopinSignature";
import useSignatureMiseAJourHook from "./hook/SignatureMiseAJourHook";
import { PopinPlageHoraireNonAutorisee } from "./messages/PopinPlageHoraireNonAutorisee";

type PopinSignatureMiseAJourMentionsProps = Pick<PopinSignatureProps, "estOuvert" | "setEstOuvert"> & {
  actionApresSignatureReussie: () => void;
};

const TRAITEMENT_SIGNATURE_TIMEOUT_MS = 45000;

export const PopinSignatureMiseAJourMentions: React.FC<PopinSignatureMiseAJourMentionsProps> = ({
  estOuvert,
  setEstOuvert,
  actionApresSignatureReussie
}) => {
  const { idRequeteParam, idActeParam } = useParams<TUuidActeParams>();
  const { documentASigner, onSuccesSignatureAppNative, etatTraitementSignature, onTraitementSignatureTermine } = useSignatureMiseAJourHook(
    idActeParam,
    idRequeteParam
  );

  const onTraitementTermine = () => {
    onTraitementSignatureTermine();
    if (etatTraitementSignature.termine && !etatTraitementSignature.erreur) {
      actionApresSignatureReussie();
    }
  };

  return (
    <>
      <PopinSignature
        titre={getLibelle("Signature des mentions")}
        estOuvert={estOuvert}
        setEstOuvert={setEstOuvert}
        documentASigner={documentASigner}
        texte={TypePopinSignature.getTextePopinSignatureMentions() || ""}
        onSuccesSignature={onSuccesSignatureAppNative}
        etatTraitementSignature={etatTraitementSignature}
        onTraitementSignatureTermine={onTraitementTermine}
        timeoutTraitementSignature={TRAITEMENT_SIGNATURE_TIMEOUT_MS}
      />
      <PopinPlageHoraireNonAutorisee etatTraitementSignature={etatTraitementSignature} />
    </>
  );
};
