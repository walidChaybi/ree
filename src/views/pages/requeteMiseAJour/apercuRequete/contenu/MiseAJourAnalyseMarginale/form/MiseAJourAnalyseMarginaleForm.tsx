import {
  ANALYSE_MARGINALE,
  MOTIF,
  NOM,
  NOM_SECABLE,
  PRENOMS,
  SECABLE
} from "@composant/formulaire/ConstantesNomsForm";
import PrenomsForm from "@composant/formulaire/nomsPrenoms/PrenomsForm";
import { getLibelle } from "@util/Utils";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import {
  FormikComponentProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import MiseAJourAnalyseMarginaleNomSecableForm from "./MiseAJourAnalyseMarginaleNomSecableForm";
import "./scss/MiseAJourAnalyseMarginaleForm.scss";

const MiseAJourAnalyseMarginaleForm: React.FC<FormikComponentProps> = ({
  formik
}) => {
  const onClickCheckboxNomSecable = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    formik.setFieldValue(withNamespace(NOM_SECABLE, SECABLE), e.target.value);
  };

  return (
    <div className="formWrapper">
      <InputField label={"Nom"} name={withNamespace(ANALYSE_MARGINALE, NOM)} />
      <PrenomsForm
        nom={withNamespace(ANALYSE_MARGINALE, PRENOMS)}
        nbPrenoms={0}
      />
      <InputField
        label={"Motif"}
        name={withNamespace(ANALYSE_MARGINALE, MOTIF)}
      />

      <MiseAJourAnalyseMarginaleNomSecableForm />
      <div className="boutonWrapper">
        <Bouton disabled={!formik.dirty} onClick={() => formik.resetForm()}>
          {getLibelle("Annuler la saisie en cours")}
        </Bouton>
      </div>
    </div>
  );
};

export default connect<FormikComponentProps>(MiseAJourAnalyseMarginaleForm);
