import { getLibelle } from "@util/Utils";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import { useEffect } from "react";
import { useBlocker } from "react-router-dom";

type BlockerNavigationProps = {
  messages: string[];
  onConfirmation: () => void;
  estNavigationBloquee: boolean;
  estNavigationDebloquee?: boolean;
  titre?: string;
};
export const BlockerNavigation: React.FC<BlockerNavigationProps> = ({
  onConfirmation,
  estNavigationBloquee,
  estNavigationDebloquee,
  titre,
  messages
}) => {
  const blocker = useBlocker(() => estNavigationBloquee);

  useEffect(() => {
    if (blocker.state === "blocked" && estNavigationDebloquee) {
      blocker.proceed?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estNavigationDebloquee]);

  return (
    <ConfirmationPopin
      boutons={[
        {
          label: getLibelle("OK"),
          action: onConfirmation
        },
        {
          label: getLibelle("Annuler"),
          action: () => {
            blocker.reset?.();
          }
        }
      ]}
      estOuvert={blocker.state === "blocked"}
      messages={messages}
      titre={titre}
    />
  );
};
