import { TypePopinSignature } from "@model/signature/ITypePopinSignature";
import { getLibelle } from "@util/Utils";
import { useParams } from "react-router-dom";
import useSignatureMiseAJourHook from "./hook/SignatureMiseAJourHook";
import { PopinSignature, PopinSignatureProps } from "./PopinSignature";

type PopinSignatureMiseAJourMentionsProps = Pick<
  PopinSignatureProps,
  "estOuvert" | "setEstOuvert"
>;

export const PopinSignatureMiseAJourMentions: React.FC<
  PopinSignatureMiseAJourMentionsProps
> = ({ estOuvert, setEstOuvert }) => {
  const { idActeParam } = useParams();
  const {
    documentASigner,
    onSuccesSignatureAppNative,
    etatTraitementSignature,
    onTraitementSignatureTermine
  } = useSignatureMiseAJourHook(idActeParam);

  return (
    <PopinSignature
      titre={getLibelle("Signature des mentions")}
      estOuvert={estOuvert}
      setEstOuvert={setEstOuvert}
      documentASigner={documentASigner}
      texte={TypePopinSignature.getTextePopinSignatureMentions() || ""}
      onSuccesSignature={onSuccesSignatureAppNative}
      etatTraitementSignature={etatTraitementSignature}
      onTraitementSignatureTermine={onTraitementSignatureTermine}
    />
  );
};
