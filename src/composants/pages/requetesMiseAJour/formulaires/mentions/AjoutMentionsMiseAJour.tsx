import {
  LISTES_TYPES_MENTION,
  MENTION_NIVEAU_DEUX,
  MENTION_NIVEAU_TROIS,
  MENTION_NIVEAU_UN,
  TEXTE_MENTION
} from "@composant/formulaire/ConstantesNomsForm";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { IMiseAJourMentionsForm } from "@model/form/miseAJour/IMiseAJourMentionsForm";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import { withNamespace } from "@widget/formulaire/utils/FormUtil";
import { useFormikContext } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { EditionMiseAJourContext } from "../../../../../contexts/EditionMiseAJourContextProvider";
import ListesTypesMentionForm from "./ListesTypesMentionForm";

interface IAjoutMentionsMiseAJourProps {
  libelleTitreFormulaire: string;
}

const AjoutMentionsMiseAJour: React.FC<IAjoutMentionsMiseAJourProps> = ({ libelleTitreFormulaire }) => {
  const { listeMentions, indexMentionModifiee } = useContext(EditionMiseAJourContext.Valeurs);
  const { setEstMentionEnCoursDeSaisie, setIndexMentionModifiee } = useContext(EditionMiseAJourContext.Actions);

  const { dirty, isValid, setFieldValue, resetForm } = useFormikContext<IMiseAJourMentionsForm>();

  const [estTypeMentionSelectionne, setEstTypeMentionSelectionne] = useState(false);

  useEffect(() => setEstMentionEnCoursDeSaisie(dirty), [dirty]);

  useEffect(() => {
    if (indexMentionModifiee !== undefined) {
      const { texte, typeMention } = listeMentions[indexMentionModifiee];
      setFieldValue(withNamespace(LISTES_TYPES_MENTION, MENTION_NIVEAU_UN), typeMention.idMentionNiveauUn);
      setFieldValue(withNamespace(LISTES_TYPES_MENTION, MENTION_NIVEAU_DEUX), typeMention.idMentionNiveauDeux);
      setFieldValue(withNamespace(LISTES_TYPES_MENTION, MENTION_NIVEAU_TROIS), typeMention.idMentionNiveauTrois);
      setFieldValue(TEXTE_MENTION, texte);
    }
  }, [indexMentionModifiee]);

  const annulerEnAjoutOuModification = () => {
    resetForm();
    setIndexMentionModifiee(undefined);
    setEstTypeMentionSelectionne(false);
  };

  const boutonAJouterModifier = indexMentionModifiee !== undefined ? "Modifier mention" : "Ajouter mention";

  return (
    <div>
      <h3>{libelleTitreFormulaire}</h3>
      <ListesTypesMentionForm
        natureActe={NatureActe.NAISSANCE}
        nom={LISTES_TYPES_MENTION}
        estTypeMentionSelectionne={estTypeMentionSelectionne}
        setEstTypeMentionSelectionne={setEstTypeMentionSelectionne}
      />
      {estTypeMentionSelectionne && (
        <div className="boutons-mention">
          <BoutonDoubleSubmit
            disabled={!dirty || !isValid}
            type="submit"
          >
            {boutonAJouterModifier}
          </BoutonDoubleSubmit>
          <BoutonDoubleSubmit
            disabled={!dirty}
            onClick={annulerEnAjoutOuModification}
          >
            Annuler
          </BoutonDoubleSubmit>
        </div>
      )}
    </div>
  );
};

export default AjoutMentionsMiseAJour;
