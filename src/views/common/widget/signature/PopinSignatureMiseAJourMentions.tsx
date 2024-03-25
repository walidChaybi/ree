import { TypePopinSignature } from "@model/signature/ITypePopinSignature";
import { getLibelle } from "@util/Utils";
import { PopinSignature, PopinSignatureProps } from "./PopinSignature";

type PopinSignatureMiseAJourMentionsProps = Pick<
  PopinSignatureProps,
  "estOuvert" | "setEstOuvert"
>;

export const PopinSignatureMiseAJourMentions: React.FC<
  PopinSignatureMiseAJourMentionsProps
> = ({ estOuvert, setEstOuvert }) => {
  return (
    <PopinSignature
      titre={getLibelle("Signature des mentions")}
      estOuvert={estOuvert}
      setEstOuvert={setEstOuvert}
      documentASigner={""}
      texte={TypePopinSignature.getTextePopinSignatureMentions() || ""}
      onSuccesSignature={() => console.log("success signature")}
      etatTraitementSignature={{
        termine: true
      }}
    />
  );
};
