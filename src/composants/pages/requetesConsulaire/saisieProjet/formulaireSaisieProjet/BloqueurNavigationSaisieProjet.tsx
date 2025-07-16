import {
  EActionFormulaireProjetActeTranscrit,
  IProjetActeTranscritForm
} from "@model/form/creation/transcription/IProjetActeTranscritForm";
import { useFormikContext } from "formik";
import { useEffect } from "react";
import { useBlocker } from "react-router";
import { useModaleConfirmation } from "../../commun/ConfirmationModale";

import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import UndoIcon from "@mui/icons-material/Undo";

const BloqueurNavigationSaisieProjet: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { dirty, setFieldValue, submitForm } = useFormikContext<IProjetActeTranscritForm>();

  const { ouvrir, ModaleAlerte } = useModaleConfirmation();

  const blocker = useBlocker(dirty);

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
              setFieldValue("soumissionFormulaire", {
                action: EActionFormulaireProjetActeTranscrit.ENREGISTRER,
                avecEnregistrement: true,
                apresEnregistrement: () => blocker.proceed()
              }).then(() => {
                submitForm();
              });
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
  }, [blocker, ouvrir]);

  return (
    <>
      {children}
      {ModaleAlerte}
    </>
  );
};

export default BloqueurNavigationSaisieProjet;
