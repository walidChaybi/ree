import {
  EActionFormulaireProjetActeTranscrit,
  IProjetActeTranscritForm
} from "@model/form/creation/transcription/IProjetActeTranscritForm";
import { useFormikContext } from "formik";
import { useEffect } from "react";
import { MdClose, MdDone, MdUndo } from "react-icons/md";
import { useBlocker } from "react-router";
import { useModaleConfirmation } from "../../commun/ConfirmationModale";

interface IBloqueurNavigationSaisieProjetProps {
  doitBloquer: boolean;
  children: React.ReactNode;
}

const BloqueurNavigationSaisieProjet: React.FC<IBloqueurNavigationSaisieProjetProps> = ({ children, doitBloquer }) => {
  const { dirty, setFieldValue, submitForm } = useFormikContext<IProjetActeTranscritForm>();

  const { ouvrir, ModaleAlerte } = useModaleConfirmation();

  const blocker = useBlocker(doitBloquer && dirty);

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
            icone: (
              <MdDone
                className="text-md"
                aria-hidden
              />
            ),
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
            icone: (
              <MdClose
                className="text-md"
                aria-hidden
              />
            ),
            action: async () => {
              blocker.proceed();
            }
          },
          {
            libelle: "Annuler",
            variante: "secondaire",
            icone: (
              <MdUndo
                className="text-md"
                aria-hidden
              />
            ),
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
