import {
  LISTES_TYPES_MENTION,
  MENTION_NIVEAU_DEUX,
  MENTION_NIVEAU_TROIS,
  MENTION_NIVEAU_UN,
  TEXTE_MENTION
} from "@composant/formulaire/ConstantesNomsForm";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { IMiseAJourMentionsForm } from "@model/form/miseAJour/IMiseAJourMentionsForm";
import { UN, triListeObjetsSurPropriete } from "@util/Utils";
import { Formulaire } from "@widget/formulaire/Formulaire";
import { FormikProps, FormikValues } from "formik";
import { useContext } from "react";
import { T } from "vitest/dist/chunks/environment.0M5R1SX_";
import * as Yup from "yup";
import { EditionMiseAJourContext } from "../../../../../contexts/EditionMiseAJourContextProvider";
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
    [MENTION_NIVEAU_UN]: Yup.string().required("Selectionnez le type de la mention"),
    [MENTION_NIVEAU_DEUX]: Yup.string().when(MENTION_NIVEAU_UN, {
      is: (mentionNiveauUn: string) => TypeMention.getTypeMentionById(mentionNiveauUn)?.sousTypes,
      then: Yup.string().required("Selectionnez le sous-type de la mention")
    }),
    [MENTION_NIVEAU_TROIS]: Yup.string().when(MENTION_NIVEAU_DEUX, {
      is: (mentionNiveauDeux: string) => TypeMention.getTypeMentionById(mentionNiveauDeux)?.sousTypes,
      then: Yup.string().required("Selectionnez le sous-type de la mention")
    })
  }),
  [TEXTE_MENTION]: Yup.string().required("Veuillez saisir le texte de la mention")
});

interface IMiseAJourMentionsFormProps {
  libelleTitreFormulaire: string;
  refFormulaire?: React.MutableRefObject<FormikProps<T & FormikValues> | null>;
}

export const MiseAJourMentionsForm: React.FC<IMiseAJourMentionsFormProps> = ({ libelleTitreFormulaire, refFormulaire }) => {
  const { listeMentions, indexMentionModifiee } = useContext(EditionMiseAJourContext.Valeurs);
  const { setListeMentions, setIndexMentionModifiee } = useContext(EditionMiseAJourContext.Actions);
  const ajouterOuModifierMention = (values: IMiseAJourMentionsForm) => {
    indexMentionModifiee !== undefined ? modifierMention(values, indexMentionModifiee + UN) : ajouterMention(values);

    const mentionSelectionne = TypeMention.getTypeMentionById(
      values.listesTypesMention.mentionNiveauTrois ||
        values.listesTypesMention.mentionNiveauDeux ||
        values.listesTypesMention.mentionNiveauUn
    );
    if (mentionSelectionne?.affecteAnalyseMarginale) {
      window.alert(
        "Veuillez vérifier s'il y a lieu de mettre à jour l'analyse marginale" // TOREFACTO: CHANGER DE MODALE POUR DEGAGER WINDOW.ALERT
      );
    }
  };

  const ajouterMention = (values: IMiseAJourMentionsForm) => {
    setListeMentions([
      ...listeMentions,
      {
        texte: values.texteMention.trim().endsWith(".") ? values.texteMention.trim() : `${values.texteMention.trim()}.`,
        typeMention: {
          idMentionNiveauUn: values.listesTypesMention.mentionNiveauUn,
          idMentionNiveauDeux: values.listesTypesMention.mentionNiveauDeux,
          idMentionNiveauTrois: values.listesTypesMention.mentionNiveauTrois
        },
        numeroOrdre: Number(listeMentions.length) + UN
      }
    ]);
  };

  const modifierMention = (values: IMiseAJourMentionsForm, idAModifier: number) => {
    setListeMentions(
      triListeObjetsSurPropriete(
        [
          ...listeMentions.filter(mention => mention.numeroOrdre !== idAModifier),
          {
            numeroOrdre: idAModifier,
            typeMention: {
              idMentionNiveauUn: values.listesTypesMention.mentionNiveauUn,
              idMentionNiveauDeux: values.listesTypesMention.mentionNiveauDeux,
              idMentionNiveauTrois: values.listesTypesMention.mentionNiveauTrois
            },
            texte: values.texteMention.trim().endsWith(".") ? values.texteMention.trim() : `${values.texteMention.trim()}.`
          }
        ],
        "numeroOrdre"
      )
    );
    setIndexMentionModifiee(undefined);
  };

  return (
    <Formulaire
      formDefaultValues={MISE_A_JOUR_MENTIONS_VALEURS_DEFAUT}
      formValidationSchema={ValidationSchema}
      onSubmit={(values, formik) => {
        ajouterOuModifierMention(values as unknown as IMiseAJourMentionsForm);
        formik?.resetForm();
      }}
      refFormulaire={refFormulaire}
    >
      <AjoutMentionsMiseAJour libelleTitreFormulaire={libelleTitreFormulaire} />
    </Formulaire>
  );
};
