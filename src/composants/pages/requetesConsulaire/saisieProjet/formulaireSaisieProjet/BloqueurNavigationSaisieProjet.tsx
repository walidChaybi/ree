import { IProjetActeTranscritForm } from "@model/form/creation/transcription/IProjetActeTranscritForm";
import messageManager from "@util/messageManager";
import { useFormikContext } from "formik";
import { useCallback, useEffect } from "react";
import { useBeforeUnload, useBlocker } from "react-router";
import { useModaleConfirmation } from "../../commun/ConfirmationModale";

import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import UndoIcon from "@mui/icons-material/Undo";

interface GestionnaireNavigationProps {
  onEnregistrer: (valeurs: IProjetActeTranscritForm) => Promise<void>;
  children: React.ReactNode;
}

export const BloqueurNavigationSaisieProjet = ({ children, onEnregistrer }: GestionnaireNavigationProps) => {
  const { values: valeurs, dirty, validateForm } = useFormikContext<IProjetActeTranscritForm>();

  const { ouvrir, ModaleAlerte } = useModaleConfirmation();

  const blocker = useBlocker(() => dirty);

  useBeforeUnload(
    useCallback(
      e => {
        if (dirty) {
          e.preventDefault();
        }
      },
      [dirty]
    )
  );

  useEffect(() => {
    if (blocker.state === "blocked") {
      ouvrir({
        titre: "Modifications à enregistrer",
        messages: ["Des modifications ont été apportées au projet. Que souhaitez-vous faire ?"],
        typePopin: "alerte",
        tailleFenetre: "grande",
        boutons: [
          {
            libelle: "Enregistrer et quitter",
            variante: "primaire",
            icone: <DoneIcon fontSize="small" />,
            action: async () => {
              try {
                const erreurs = await validateForm();
                if (!erreurs || Object.keys(erreurs).length === 0) {
                  await onEnregistrer(valeurs);

                  blocker.proceed();
                } else {
                  messageManager.showError("Veuillez corriger les erreurs du formulaire avant de continuer");
                  blocker.reset();
                }
              } catch (error) {
                console.error("Erreur lors de la sauvegarde:", error);
                messageManager.showError("Une erreur est survenue lors de la sauvegarde");
                blocker.reset();
              }
            }
          },
          {
            libelle: "Quitter sans enregistrer",
            variante: "danger",
            icone: <CloseIcon fontSize="small" />,
            action: async () => {
              blocker.proceed();
            }
          },
          {
            libelle: "Annuler",
            variante: "secondaire",
            icone: <UndoIcon fontSize="small" />,
            action: async () => {
              blocker.reset();
            }
          }
        ]
      });
    }
  }, [blocker, ouvrir, validateForm, valeurs]);

  return (
    <>
      {children}
      {ModaleAlerte}
    </>
  );
};
