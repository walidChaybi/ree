import { CodeErreurFonctionnelle } from "@model/requete/CodeErreurFonctionnelle";
import { IEtatTraitementSignature } from "@model/signature/IEtatTraitementSignature";
import { getLibelle } from "@util/Utils";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import { useEffect, useState } from "react";

interface IPopinPlageHoraireNonAutoriseeProps {
  etatTraitementSignature: IEtatTraitementSignature;
}

export const PopinPlageHoraireNonAutorisee: React.FC<
  IPopinPlageHoraireNonAutoriseeProps
> = ({ etatTraitementSignature }) => {
  const [estOuvert, setEstOuvert] = useState<boolean>(false);
  const [messages, setMessages] = useState<string[]>();

  const boutons = [
    {
      label: getLibelle("Fermer"),
      action: () => {
        setEstOuvert(false);
        setMessages(undefined);
      },
      color: "primary"
    }
  ];

  useEffect(() => {
    if (
      etatTraitementSignature.erreur?.code ===
      CodeErreurFonctionnelle.FCT_PLAGE_HORAIRE_SIGNATURE
    ) {
      setEstOuvert(true);
      setMessages([etatTraitementSignature.erreur.message]);
    }
  }, [etatTraitementSignature]);

  return (
    <ConfirmationPopin
      estOuvert={estOuvert}
      messages={messages}
      boutons={boutons}
    />
  );
};
