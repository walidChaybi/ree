import { MENTION_NIVEAU_DEUX, MENTION_NIVEAU_TROIS, MENTION_NIVEAU_UN, TEXTE_MENTION } from "@composant/formulaire/ConstantesNomsForm";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { Options } from "@util/Type";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { OptionVide, SelectField } from "@widget/formulaire/champsSaisie/SelectField";
import { ISubForm, SubFormProps, withNamespace } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import { useContext, useEffect, useState } from "react";
import { EditionMiseAJourContext } from "../../../../../contexts/EditionMiseAJourContextProvider";
import "./scss/MiseAJourMentionsForm.scss";

interface IListesTypesMentionForm {
  natureActe: NatureActe;
  setEstTypeMentionSelectionne: React.Dispatch<React.SetStateAction<boolean>>;
}

const TYPE_MENTION_INFORMATISE_MOCK = true;

const ListesTypesMentionForm: React.FC<IListesTypesMentionForm & SubFormProps> = ({
  formik,
  nom,
  natureActe,
  setEstTypeMentionSelectionne
}) => {
  const listeNiveau1 = TypeMention.getTypeMentionAsOptions([...TypeMention.getTypeMentionParNatureActe(natureActe)]);
  const [listeNiveau2, setListeNiveau2] = useState<Options>();
  const [listeNiveau3, setListeNiveau3] = useState<Options>();

  const { indexMentionModifiee } = useContext(EditionMiseAJourContext.Valeurs);

  const NOM_CHAMP_MENTION_NIVEAU_UN = withNamespace(nom, MENTION_NIVEAU_UN);
  const NOM_CHAMP_MENTION_NIVEAU_DEUX = withNamespace(nom, MENTION_NIVEAU_DEUX);
  const NOM_CHAMP_MENTION_NIVEAU_TROIS = withNamespace(nom, MENTION_NIVEAU_TROIS);

  const formikValueInputUn = formik.getFieldMeta(NOM_CHAMP_MENTION_NIVEAU_UN).value;
  const formikValueInputDeux = formik.getFieldMeta(NOM_CHAMP_MENTION_NIVEAU_DEUX).value;
  const formikValueInputTrois = formik.getFieldMeta(NOM_CHAMP_MENTION_NIVEAU_TROIS).value;

  useEffect(() => {
    if (indexMentionModifiee !== undefined) {
      setListeNiveau2([]);
      setListeNiveau3([]);
    }
  }, [indexMentionModifiee]);

  const resetFormikInput = (namespaceToReset: string[]) => {
    namespaceToReset.forEach(namespace => {
      formik.setFieldValue(namespace, "");
    });
    setListeNiveau2(undefined);
    setListeNiveau3(undefined);
  };

  useEffect(() => {
    if (formikValueInputUn) {
      setEstTypeMentionSelectionne(true);
      const mentionsSelectionne = TypeMention.getTypesMention().find(mention => mention.id === formikValueInputUn);
      if (mentionsSelectionne?.sousTypes) {
        setListeNiveau2(TypeMention.getTypeMentionAsOptions(mentionsSelectionne.sousTypes));
      }
    } else {
      setEstTypeMentionSelectionne(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik]);

  // change les valeurs de la liste de 3eme niveau quand le sous-type mentions est selectionné
  useEffect(() => {
    if (formikValueInputDeux !== "") {
      const mentionSelectionneNiveauUn = TypeMention.getTypesMention().find(mention => mention.id === formikValueInputUn);
      const mentionSelectionneNiveauDeux = mentionSelectionneNiveauUn?.sousTypes?.find(mention => mention.id === formikValueInputDeux);
      if (mentionSelectionneNiveauDeux?.sousTypes) {
        setListeNiveau3(TypeMention.getTypeMentionAsOptions(mentionSelectionneNiveauDeux?.sousTypes));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik]);

  const getConditionDesaffichageTexteMention = () => {
    if (listeNiveau3 && listeNiveau3.length > 0) {
      return !Boolean(formikValueInputTrois);
    } else if (listeNiveau2 && listeNiveau2.length > 0) {
      return !Boolean(formikValueInputDeux);
    } else {
      return !Boolean(formikValueInputUn);
    }
  };

  return (
    <div className="ListesTypesMentionForm">
      <div className="selectFieldMentions">
        <SelectField
          name={NOM_CHAMP_MENTION_NIVEAU_UN}
          options={listeNiveau1}
          label={"Type"}
          onChange={() => {
            resetFormikInput([NOM_CHAMP_MENTION_NIVEAU_DEUX, NOM_CHAMP_MENTION_NIVEAU_TROIS]);
          }}
        />
      </div>

      {listeNiveau2 && listeNiveau2.length > 0 && formik.getFieldMeta(NOM_CHAMP_MENTION_NIVEAU_UN).value !== "" ? (
        <div className="selectFieldMentions">
          <SelectField
            name={NOM_CHAMP_MENTION_NIVEAU_DEUX}
            options={listeNiveau2}
            optionVide={OptionVide.SELECTIONNABLE}
            onChange={() => resetFormikInput([NOM_CHAMP_MENTION_NIVEAU_TROIS])}
            label={""}
          />
        </div>
      ) : undefined}

      {listeNiveau3 && listeNiveau3.length > 0 && formik.getFieldMeta(NOM_CHAMP_MENTION_NIVEAU_DEUX).value !== "" ? (
        <div className="selectFieldMentions">
          <SelectField
            name={NOM_CHAMP_MENTION_NIVEAU_TROIS}
            options={listeNiveau3}
            optionVide={OptionVide.SELECTIONNABLE}
            label={""}
          />
        </div>
      ) : undefined}
      {/*FF : la récupération du TypeMention nécessite de récupérer les mentions sur un nouvel endpoint : getMetamodeleAideASaisie, à faire dans une prochaine US */}
      {!!formik.getFieldMeta(NOM_CHAMP_MENTION_NIVEAU_UN).value &&
        (gestionnaireFeatureFlag.estActif(FeatureFlag.FF_AIDE_A_LA_SAISIE_MENTION) && TYPE_MENTION_INFORMATISE_MOCK ? (
          <p className="py-12 text-center text-red-500">Aide à la saisie en cours de développement</p>
        ) : (
          <div className="selectFieldMentions">
            <InputField
              label={""}
              name={TEXTE_MENTION}
              component="textarea"
              placeholder={"Texte mention à ajouter"}
              disabled={getConditionDesaffichageTexteMention()}
              onChange={event => {
                formik.setFieldTouched(TEXTE_MENTION);
                formik.setFieldValue(TEXTE_MENTION, event.target.value, true);
              }}
            />
          </div>
        ))}
    </div>
  );
};

export default connect<IListesTypesMentionForm & ISubForm>(ListesTypesMentionForm);
