import { TypePopinSignature } from "@model/signature/ITypePopinSignature";
import { getLibelle } from "@util/Utils";
import { useParams } from "react-router-dom";
import useSignatureMiseAJourHook from "./hook/SignatureMiseAJourHook";
import { PopinSignature, PopinSignatureProps } from "./PopinSignature";

type PopinSignatureMiseAJourMentionsProps = Pick<
  PopinSignatureProps,
  "estOuvert" | "setEstOuvert"
> & { actionApresSignatureReussie: () => void };

export const PopinSignatureMiseAJourMentions: React.FC<
  PopinSignatureMiseAJourMentionsProps
> = ({ estOuvert, setEstOuvert, actionApresSignatureReussie }) => {
  const { idActeParam } = useParams();
  const {
    documentASigner,
    onSuccesSignatureAppNative,
    etatTraitementSignature,
    onTraitementSignatureTermine
  } = useSignatureMiseAJourHook(idActeParam);

  const onTraitementTermine = () => {
    onTraitementSignatureTermine();
    if (etatTraitementSignature.termine && !etatTraitementSignature.erreur) {
      actionApresSignatureReussie();
    }
  };

  return (
    <PopinSignature
      titre={getLibelle("Signature des mentions")}
      estOuvert={estOuvert}
      setEstOuvert={setEstOuvert}
      documentASigner={documentASigner}
      texte={TypePopinSignature.getTextePopinSignatureMentions() || ""}
      onSuccesSignature={onSuccesSignatureAppNative}
      etatTraitementSignature={etatTraitementSignature}
      onTraitementSignatureTermine={onTraitementTermine}
    />
  );
};
