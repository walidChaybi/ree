import {
  ANALYSE_MARGINALE,
  MOTIF,
  NOM,
  PRENOMS
} from "@composant/formulaire/ConstantesNomsForm";
import PrenomsForm from "@composant/formulaire/nomsPrenoms/PrenomsForm";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import {
  compteNombreDePrenoms,
  FormikComponentProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";

const MiseAJourAnalyseMarginaleNomForm: React.FC<FormikComponentProps> = ({
  formik
}) => {
  return (
    <div className="MiseAJourAnalyseMarginaleNomForm">
      <InputField label={"Nom"} name={withNamespace(ANALYSE_MARGINALE, NOM)} />
      <PrenomsForm
        nom={withNamespace(ANALYSE_MARGINALE, PRENOMS)}
        nbPrenoms={0}
        nbPrenomsAffiche={compteNombreDePrenoms(
          formik.values.analyseMarginale.prenoms
        )}
      />
      <InputField
        label={"Motif"}
        name={withNamespace(ANALYSE_MARGINALE, MOTIF)}
      />
    </div>
  );
};

export default connect<FormikComponentProps>(MiseAJourAnalyseMarginaleNomForm);
