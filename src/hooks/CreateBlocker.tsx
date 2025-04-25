import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import { useEffect, useMemo, useState } from "react";
import { useBlocker } from "react-router";

interface IBlockerNavigationParams {
  messages: string[];
  executerApresConfirmation?: (debloquer: () => void) => void;
  titre?: string;
  executerSiRedirectionAvecBlocageSansPopin?: (debloquer: () => void) => void;
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
  const [estConfirme, setEstConfirme] = useState<boolean>(false);

  const blocker = useBlocker(() => estNavigationBloquee.estBloquee);

  useEffect(() => {
    switch (true) {
      case blocker.state !== "blocked":
        break;
      case !estNavigationBloquee.estBloquee:
        blocker.proceed?.();
        break;
      case !estNavigationBloquee.estPopinAffichee:
        if (executerSiRedirectionAvecBlocageSansPopin) {
          executerSiRedirectionAvecBlocageSansPopin?.(gestionBlocker.desactiverBlocker);

          break;
        }

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
          label: "OK",
          action: () => {
            setEstConfirme(true);
            if (executerApresConfirmation) {
              executerApresConfirmation(() => blocker.proceed?.());

              return;
            }

            blocker.proceed?.();
          }
        },
        {
          label: "Annuler",
          action: () => {
            blocker.reset?.();
          }
        }
      ]}
      estOuvert={blocker.state === "blocked" && estNavigationBloquee.estPopinAffichee && !estConfirme}
      messages={messages}
      titre={titre}
    />
  );

  return {
    gestionBlocker,
    BlockerNavigation
  };
};
