import {
  NOM_PARTIE1,
  NOM_PARTIE2,
  NOM_SECABLE,
  SECABLE
} from "@composant/formulaire/ConstantesNomsForm";
import { Checkbox } from "@mui/material";
import { MiseAJourMentionsContext } from "@pages/requeteMiseAJour/apercuRequete/ApercuRequeteMiseAJourPage";
import { getLibelle } from "@util/Utils";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import {
  FormikComponentProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import { useContext } from "react";
import "./scss/MiseAJourAnalyseMarginaleForm.scss";

const MiseAJourAnalyseMarginaleForm: React.FC<FormikComponentProps> = ({
  formik
}) => {
  const { derniereAnalyseMarginaleResultat } = useContext(
    MiseAJourMentionsContext
  );
  const checkboxEstDesactive =
    derniereAnalyseMarginaleResultat &&
    !(
      derniereAnalyseMarginaleResultat?.titulaire.nomPartie1 &&
      derniereAnalyseMarginaleResultat?.titulaire.nomPartie2
    ) &&
    derniereAnalyseMarginaleResultat?.titulaire.nom.indexOf(" ") === -1;

  const handleInputReset = () => {
    formik.setFieldValue(withNamespace(NOM_SECABLE, NOM_PARTIE1), "");
    formik.setFieldValue(withNamespace(NOM_SECABLE, NOM_PARTIE2), "");
  };

  const onClickCheckboxNomSecable = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    formik.setFieldValue(withNamespace(NOM_SECABLE, SECABLE), e.target.value);
  };

  return (
    <div className="formWrapper">
      <div className="caseACocherWrapper">
        <label htmlFor="">{getLibelle("Nom sécable")}</label>
        <Checkbox
          disabled={checkboxEstDesactive}
          size="medium"
          checked={
            formik.getFieldProps(withNamespace(NOM_SECABLE, SECABLE)).value
          }
          inputProps={{ "aria-label": getLibelle("Nom sécable") }}
          name={withNamespace(NOM_SECABLE, SECABLE)}
          onChange={onClickCheckboxNomSecable}
        />
      </div>

      {formik.getFieldProps(withNamespace(NOM_SECABLE, SECABLE)).value && (
        <>
          <InputField
            label={getLibelle("1re partie")}
            name={withNamespace(NOM_SECABLE, NOM_PARTIE1)}
          />
          <InputField
            label={getLibelle("2nde partie")}
            name={withNamespace(NOM_SECABLE, NOM_PARTIE2)}
          />
          <div className="boutonWrapper">
            <Bouton onClick={handleInputReset}>
              {getLibelle("Annuler la saisie en cours")}
            </Bouton>
          </div>
        </>
      )}
    </div>
  );
};

export default connect<FormikComponentProps>(MiseAJourAnalyseMarginaleForm);
