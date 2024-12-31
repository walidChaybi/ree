import { ITypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { IMiseAJourMentionsForm } from "@model/form/miseAJour/IMiseAJourMentionsForm";
import { useFormikContext } from "formik";
import React, { useContext, useEffect } from "react";
import { EditionMiseAJourContext } from "../../../../../contexts/EditionMiseAJourContextProvider";
import Bouton from "../../../../commun/bouton/Bouton";
import SaisieMentionForm from "./SaisieMentionForm";

interface IAjoutMentionsMiseAJourProps {
  typeMentionSelectionne: ITypeMention | null;
  typeMentionAModifier?: IListeTypeMentionSelectionne;
  onResetFormulaire?: () => void;
}

export interface IListeTypeMentionSelectionne {
  niveau1: ITypeMention | null;
  niveau2: ITypeMention | null;
  niveau3: ITypeMention | null;
}

const AjoutMentionsMiseAJour: React.FC<IAjoutMentionsMiseAJourProps> = ({
  typeMentionSelectionne,
  typeMentionAModifier,
  onResetFormulaire
}) => {
  const { indexMentionModifiee } = useContext(EditionMiseAJourContext.Valeurs);
  const { setIndexMentionModifiee } = useContext(EditionMiseAJourContext.Actions);

  const { dirty, resetForm, isValid } = useFormikContext<IMiseAJourMentionsForm>();

  useEffect(() => {
    !typeMentionSelectionne && resetFormulaireMention();
  }, [typeMentionSelectionne]);

  const resetFormulaireMention = () => {
    resetForm();
    setIndexMentionModifiee(undefined);
    onResetFormulaire?.();
  };

  return (
    <div>
      <SaisieMentionForm
        typeMentionSelectionne={typeMentionSelectionne}
        typesMentionsAModifier={typeMentionAModifier}
      />
      {typeMentionSelectionne && (
        <div className="boutons-mention mt-8 gap-5 pr-8">
          <Bouton
            styleBouton="principal"
            disabled={!dirty || !isValid}
            type="submit"
          >
            {indexMentionModifiee !== undefined ? "Modifier mention" : "Ajouter mention"}
          </Bouton>
          <Bouton
            styleBouton="secondaire"
            onClick={resetFormulaireMention}
          >
            Annuler
          </Bouton>
        </div>
      )}
    </div>
  );
};

export default AjoutMentionsMiseAJour;
