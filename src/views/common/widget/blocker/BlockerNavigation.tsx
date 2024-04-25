import { getLibelle } from "@util/Utils";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import { useEffect } from "react";
import { useBlocker } from "react-router-dom";

export type BlocageNavigationDetail = {
  estBloquee: boolean;
  estPopinAffichee: boolean;
};

type BlockerNavigationProps = {
  messages: string[];
  onConfirmation: () => void;
  estNavigationBloquee: BlocageNavigationDetail;
  titre?: string;
  fonctionAExecuterAvantRedirection?: () => void;
};
export const BlockerNavigation: React.FC<BlockerNavigationProps> = ({
  messages,
  onConfirmation,
  estNavigationBloquee,
  titre,
  fonctionAExecuterAvantRedirection
}) => {
  const blocker = useBlocker(() => estNavigationBloquee.estBloquee);

  useEffect(() => {
    if (blocker.state === "blocked" && !estNavigationBloquee.estBloquee) {
      blocker.proceed?.();
    } else if (
      blocker.state === "blocked" &&
      !estNavigationBloquee.estPopinAffichee &&
      fonctionAExecuterAvantRedirection
    ) {
      fonctionAExecuterAvantRedirection();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estNavigationBloquee, blocker]);

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
      estOuvert={
        blocker.state === "blocked" && estNavigationBloquee.estPopinAffichee
      }
      messages={messages}
      titre={titre}
    />
  );
};
