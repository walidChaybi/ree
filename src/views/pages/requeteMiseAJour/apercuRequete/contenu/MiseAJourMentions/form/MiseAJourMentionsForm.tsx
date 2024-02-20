import {
  LISTES_TYPES_MENTION,
  MENTION_NIVEAU_DEUX,
  MENTION_NIVEAU_TROIS,
  MENTION_NIVEAU_UN,
  TEXTE_MENTION
} from "@composant/formulaire/ConstantesNomsForm";
import { IMiseAJourMentionsForm } from "@model/form/miseAJour/IMiseAJourMentionsForm";
import { getLibelle } from "@util/Utils";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { Formulaire } from "@widget/formulaire/Formulaire";
import { FormikHelpers } from "formik";
import ListesTypesMentionForm from "./ListesTypesMentionForm";
import "./scss/MiseAJourMentionsForm.scss";

const MISE_A_JOUR_MENTIONS_VALEURS_DEFAUT: IMiseAJourMentionsForm = {
  [LISTES_TYPES_MENTION]: {
    [MENTION_NIVEAU_UN]: "",
    [MENTION_NIVEAU_DEUX]: "",
    [MENTION_NIVEAU_TROIS]: ""
  },
  [TEXTE_MENTION]: ""
};

interface IMiseAJourMentionsFormProps {
  libelleTitreFormulaire: string;
}

export const MiseAJourMentionsForm: React.FC<IMiseAJourMentionsFormProps> = ({
  libelleTitreFormulaire
}) => {
  return (
    <Formulaire
      formDefaultValues={MISE_A_JOUR_MENTIONS_VALEURS_DEFAUT}
      formValidationSchema={undefined}
      onSubmit={(values: unknown, formikHelpers?: FormikHelpers<unknown>) => {
        throw new Error("Function not implemented.");
      }}
    >
      <h3>{getLibelle(libelleTitreFormulaire)}</h3>
      <ListesTypesMentionForm nom={LISTES_TYPES_MENTION} />
      <div className="texte-mention">
        <InputField
          name={TEXTE_MENTION}
          component="textarea"
          disabled={true}
          placeholder={getLibelle("Texte mention à ajouter")}
        />
        <div className="boutons-mention">
          <Bouton disabled={true}>Annuler</Bouton>
          <Bouton disabled={true}>Ajouter mention</Bouton>
        </div>
      </div>
      <Bouton type="submit" disabled={true}>
        {getLibelle("Actualiser et visualiser")}
      </Bouton>
    </Formulaire>
  );
};
