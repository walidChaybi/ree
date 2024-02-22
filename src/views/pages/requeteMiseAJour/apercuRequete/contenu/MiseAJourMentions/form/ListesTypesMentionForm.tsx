import {
  MENTION_NIVEAU_DEUX,
  MENTION_NIVEAU_TROIS,
  MENTION_NIVEAU_UN
} from "@composant/formulaire/ConstantesNomsForm";
import { Options } from "@util/Type";
import { getLibelle } from "@util/Utils";
import { SelectField } from "@widget/formulaire/champsSaisie/SelectField";
import {
  ISubForm,
  SubFormProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import "./scss/MiseAJourMentionsForm.scss";

const ListesTypesMentionForm: React.FC<SubFormProps> = ({ formik, nom }) => {
  const NOM_CHAMP_MENTION_NIVEAU_UN = withNamespace(nom, MENTION_NIVEAU_UN);
  const NOM_CHAMP_MENTION_NIVEAU_DEUX = withNamespace(nom, MENTION_NIVEAU_DEUX);
  const NOM_CHAMP_MENTION_NIVEAU_TROIS = withNamespace(
    nom,
    MENTION_NIVEAU_TROIS
  );
  const listeMentions: Options = [];

  return (
    <>
      <div className="selectFieldMentions">
        <SelectField
          name={NOM_CHAMP_MENTION_NIVEAU_UN}
          options={listeMentions}
          label={getLibelle("Type")}
        />
      </div>

      {formik.getFieldMeta(NOM_CHAMP_MENTION_NIVEAU_UN).value !== "" && (
        <div className="selectFieldMentions">
          <SelectField
            name={NOM_CHAMP_MENTION_NIVEAU_DEUX}
            options={listeMentions}
          />
        </div>
      )}

      {formik.getFieldMeta(NOM_CHAMP_MENTION_NIVEAU_DEUX).value !== "" && (
        <div className="selectFieldMentions">
          <SelectField
            name={NOM_CHAMP_MENTION_NIVEAU_TROIS}
            options={listeMentions}
          />
        </div>
      )}
    </>
  );
};

export default connect<ISubForm>(ListesTypesMentionForm);
