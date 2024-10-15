import { getLibelle } from "@util/Utils";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import { useEffect, useMemo, useState } from "react";
import { useBlocker } from "react-router-dom";

interface IBlockerNavigationParams {
  messages: string[];
  executerApresConfirmation: () => void;
  titre?: string;
  executerSiRedirectionAvecBlocageSansPopin?: () => void;
}

export const useCreateBlocker = ({
  messages,
  executerApresConfirmation,
  titre,
  executerSiRedirectionAvecBlocageSansPopin
}: IBlockerNavigationParams) => {
  const [estNavigationBloquee, setEstNavigationBloquee] = useState({
    estBloquee: true,
    estPopinAffichee: false
  });

  const blocker = useBlocker(() => estNavigationBloquee.estBloquee);

  useEffect(() => {
    switch (true) {
      case blocker.state !== "blocked":
        break;
      case !estNavigationBloquee.estBloquee:
        blocker.proceed?.();
        break;
      case !estNavigationBloquee.estPopinAffichee:
        executerSiRedirectionAvecBlocageSansPopin?.();
        gestionBlocker.desactiverBlocker();
        break;
      default:
        break;
    }
  }, [estNavigationBloquee, executerSiRedirectionAvecBlocageSansPopin]);

  const gestionBlocker = useMemo(
    () => ({
      activerBlockerSansConfirmation: () => {
        setEstNavigationBloquee({ estBloquee: true, estPopinAffichee: false });
      },
      activerBlockerAvecConfirmation: () => {
        setEstNavigationBloquee({ estBloquee: true, estPopinAffichee: true });
      },
      desactiverBlocker: () => {
        setEstNavigationBloquee({ estBloquee: false, estPopinAffichee: false });
      }
    }),
    []
  );

  const BlockerNavigation = () => (
    <ConfirmationPopin
      boutons={[
        {
          label: getLibelle("OK"),
          action: () => {
            executerApresConfirmation();
            blocker.proceed?.();
          }
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

  return {
    gestionBlocker,
    BlockerNavigation
  };
};
