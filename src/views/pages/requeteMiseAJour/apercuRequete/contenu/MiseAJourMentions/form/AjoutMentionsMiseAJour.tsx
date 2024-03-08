import {
  LISTES_TYPES_MENTION,
  TEXTE_MENTION
} from "@composant/formulaire/ConstantesNomsForm";
import { MiseAJourMentionsContext } from "@pages/requeteMiseAJour/apercuRequete/ApercuRequeteMiseAJourPage";
import { getLibelle } from "@util/Utils";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { FormikComponentProps } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useContext } from "react";
import ListesTypesMentionForm from "./ListesTypesMentionForm";

interface AJoutMentionsMiseAJourProps {
  libelleTitreFormulaire: string;
}

const AjoutMentionsMiseAJour: React.FC<
  AJoutMentionsMiseAJourProps & FormikComponentProps
> = ({ formik, libelleTitreFormulaire }) => {
  const { listeMentions } = useContext(MiseAJourMentionsContext);
  return (
    <div>
      <h3>{getLibelle(libelleTitreFormulaire)}</h3>
      <ListesTypesMentionForm nom={LISTES_TYPES_MENTION} />
      <div className="texte-mention">
        <InputField
          name={TEXTE_MENTION}
          component="textarea"
          placeholder={getLibelle("Texte mention à ajouter")}
          disabled={!formik.dirty}
        />
        <div className="boutons-mention">
          <Bouton disabled={!formik.dirty} onClick={() => formik.resetForm()}>
            Annuler
          </Bouton>
          <Bouton disabled={!formik.dirty || !formik.isValid} type="submit">
            Ajouter mention
          </Bouton>
        </div>
      </div>
      <Bouton disabled={!listeMentions.length || formik.dirty}>
        {getLibelle("Actualiser et visualiser")}
      </Bouton>
    </div>
  );
};

export default connect<AJoutMentionsMiseAJourProps & FormikComponentProps>(
  AjoutMentionsMiseAJour
);
