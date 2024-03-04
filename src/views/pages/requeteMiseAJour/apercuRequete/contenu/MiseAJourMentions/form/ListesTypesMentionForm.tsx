import {
  MENTION_NIVEAU_DEUX,
  MENTION_NIVEAU_TROIS,
  MENTION_NIVEAU_UN
} from "@composant/formulaire/ConstantesNomsForm";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { Options } from "@util/Type";
import { getLibelle } from "@util/Utils";
import {
  OptionVide,
  SelectField
} from "@widget/formulaire/champsSaisie/SelectField";
import {
  ISubForm,
  SubFormProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import { useEffect, useState } from "react";
import "./scss/MiseAJourMentionsForm.scss";

const ListesTypesMentionForm: React.FC<SubFormProps> = ({ formik, nom }) => {
  const listeNiveau1 = TypeMention.getMentionsAsOptions();
  const [listeNiveau2, setListeNiveau2] = useState<Options>();
  const [listeNiveau3, setListeNiveau3] = useState<Options>();

  const NOM_CHAMP_MENTION_NIVEAU_UN = withNamespace(nom, MENTION_NIVEAU_UN);
  const NOM_CHAMP_MENTION_NIVEAU_DEUX = withNamespace(nom, MENTION_NIVEAU_DEUX);
  const NOM_CHAMP_MENTION_NIVEAU_TROIS = withNamespace(
    nom,
    MENTION_NIVEAU_TROIS
  );

  const formikValueInputUn = formik.getFieldMeta(
    NOM_CHAMP_MENTION_NIVEAU_UN
  ).value;
  const formikValueInputDeux = formik.getFieldMeta(
    NOM_CHAMP_MENTION_NIVEAU_DEUX
  ).value;

  function resetFormikInput(namespaceToReset: string[]) {
    namespaceToReset.forEach(namespace => {
      formik.setFieldValue(namespace, "");
    });
    setListeNiveau2(undefined);
    setListeNiveau3(undefined);
  }

  // change les valeurs de la liste de 2nd niveau quand le type mentions est selectionné
  useEffect(() => {
    if (formikValueInputUn !== "") {
      const mentionsSelectionne = TypeMention.getTypesMention().find(
        mention => mention.id === formikValueInputUn
      );
      if (mentionsSelectionne?.sousTypes) {
        setListeNiveau2(
          TypeMention.getMentionsAsOptions(mentionsSelectionne.sousTypes)
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik]);

  // change les valeurs de la liste de 3eme niveau quand le sous-type mentions est selectionné
  useEffect(() => {
    if (formikValueInputDeux !== "") {
      const mentionSelectionneNiveauUn = TypeMention.getTypesMention().find(
        mention => mention.id === formikValueInputUn
      );
      const mentionSelectionneNiveauDeux =
        mentionSelectionneNiveauUn?.sousTypes?.find(
          mention => mention.id === formikValueInputDeux
        );
      if (mentionSelectionneNiveauDeux?.sousTypes) {
        setListeNiveau3(
          TypeMention.getMentionsAsOptions(
            mentionSelectionneNiveauDeux?.sousTypes
          )
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik]);

  return (
    <>
      <div className="selectFieldMentions">
        <SelectField
          name={NOM_CHAMP_MENTION_NIVEAU_UN}
          options={listeNiveau1}
          label={getLibelle("Type")}
          onChange={() => {
            resetFormikInput([
              NOM_CHAMP_MENTION_NIVEAU_DEUX,
              NOM_CHAMP_MENTION_NIVEAU_TROIS
            ]);
          }}
        />
      </div>

      {listeNiveau2 &&
      formik.getFieldMeta(NOM_CHAMP_MENTION_NIVEAU_UN).value !== "" ? (
        <div className="selectFieldMentions">
          <SelectField
            name={NOM_CHAMP_MENTION_NIVEAU_DEUX}
            options={listeNiveau2}
            optionVide={OptionVide.SELECTIONNABLE}
            onChange={() => resetFormikInput([NOM_CHAMP_MENTION_NIVEAU_TROIS])}
          />
        </div>
      ) : undefined}

      {listeNiveau3 &&
      formik.getFieldMeta(NOM_CHAMP_MENTION_NIVEAU_DEUX).value !== "" ? (
        <div className="selectFieldMentions">
          <SelectField
            name={NOM_CHAMP_MENTION_NIVEAU_TROIS}
            options={listeNiveau3}
            optionVide={OptionVide.SELECTIONNABLE}
          />
        </div>
      ) : undefined}
    </>
  );
};

export default connect<ISubForm>(ListesTypesMentionForm);
