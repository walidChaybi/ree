import {
  LISTES_TYPES_MENTION,
  MENTION_NIVEAU_DEUX,
  MENTION_NIVEAU_TROIS,
  MENTION_NIVEAU_UN,
  TEXTE_MENTION
} from "@composant/formulaire/ConstantesNomsForm";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { IMiseAJourMentionsForm } from "@model/form/miseAJour/IMiseAJourMentionsForm";
import { MiseAJourMentionsContext } from "@pages/requeteMiseAJour/apercuRequete/ApercuRequeteMiseAJourPage";
import { UN } from "@util/Utils";
import { Formulaire } from "@widget/formulaire/Formulaire";
import { CARACTERES_AUTORISES_MESSAGE } from "@widget/formulaire/FormulaireMessages";
import { useContext } from "react";
import * as Yup from "yup";
import { CaracteresAutorises } from "../../../../../../../ressources/Regex";
import AjoutMentionsMiseAJour from "./AjoutMentionsMiseAJour";
import "./scss/MiseAJourMentionsForm.scss";

const MISE_A_JOUR_MENTIONS_VALEURS_DEFAUT: IMiseAJourMentionsForm = {
  [LISTES_TYPES_MENTION]: {
    [MENTION_NIVEAU_UN]: "",
    [MENTION_NIVEAU_DEUX]: "",
    [MENTION_NIVEAU_TROIS]: ""
  },
  [TEXTE_MENTION]: ""
};

const ValidationSchema = Yup.object({
  [LISTES_TYPES_MENTION]: Yup.object({
    [MENTION_NIVEAU_UN]: Yup.string().required(
      "Selectionnez le type de la mention"
    ),
    [MENTION_NIVEAU_DEUX]: Yup.string().when(MENTION_NIVEAU_UN, {
      is: (mentionNiveauUn: string) =>
        TypeMention.getMentionsById(mentionNiveauUn, true)?.sousTypes,
      then: Yup.string().required("Selectionnez le sous-type de la mention")
    }),
    [MENTION_NIVEAU_TROIS]: Yup.string().when(MENTION_NIVEAU_DEUX, {
      is: (mentionNiveauDeux: string) =>
        TypeMention.getMentionsById(mentionNiveauDeux, true)?.sousTypes,
      then: Yup.string().required("Selectionnez le sous-type de la mention")
    })
  }),
  [TEXTE_MENTION]: Yup.string()
    .matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE)
    .required("Veuillez saisir le texte de la mention")
});

interface IMiseAJourMentionsFormProps {
  libelleTitreFormulaire: string;
}

export const MiseAJourMentionsForm: React.FC<IMiseAJourMentionsFormProps> = ({
  libelleTitreFormulaire
}) => {
  const { listeMentions, setListeMentions } = useContext(
    MiseAJourMentionsContext
  );

  function ajouterMentions(values: IMiseAJourMentionsForm) {
    setListeMentions([
      ...listeMentions,
      {
        texte: values.texteMention,
        typeMention: {
          idMentionNiveauUn: values.listesTypesMention.mentionNiveauUn,
          idMentionNiveauDeux: values.listesTypesMention.mentionNiveauDeux,
          idMentionNiveauTrois: values.listesTypesMention.mentionNiveauTrois
        },
        numeroOrdre: Number(listeMentions.length) + UN
      }
    ]);
  }

  return (
    <Formulaire
      formDefaultValues={MISE_A_JOUR_MENTIONS_VALEURS_DEFAUT}
      formValidationSchema={ValidationSchema}
      onSubmit={(values, formik) => {
        ajouterMentions(values as IMiseAJourMentionsForm);
        formik?.resetForm();
      }}
    >
      <AjoutMentionsMiseAJour libelleTitreFormulaire={libelleTitreFormulaire} />
    </Formulaire>
  );
};
