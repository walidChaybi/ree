import {
  ANALYSE_MARGINALE,
  NOM,
  NOM_PARTIE1,
  NOM_PARTIE2,
  NOM_SECABLE,
  SECABLE
} from "@composant/formulaire/ConstantesNomsForm";
import { Checkbox } from "@mui/material";
import { MiseAJourMentionsContext } from "@pages/requeteMiseAJour/apercuRequete/ApercuRequeteMiseAJourPage";
import { getLibelle } from "@util/Utils";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import {
  FormikComponentProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import { useContext, useEffect } from "react";
import "./scss/MiseAJourAnalyseMarginaleForm.scss";

const MiseAJourAnalyseMarginaleNomSecableForm: React.FC<
  FormikComponentProps
> = ({ formik }) => {
  const { derniereAnalyseMarginaleResultat } = useContext(
    MiseAJourMentionsContext
  );
  const nomComplet = formik
    .getFieldProps(withNamespace(ANALYSE_MARGINALE, NOM))
    .value?.trim();

  const checkboxEstDesactive =
    derniereAnalyseMarginaleResultat &&
    !(
      derniereAnalyseMarginaleResultat?.titulaire.nomPartie1 &&
      derniereAnalyseMarginaleResultat?.titulaire.nomPartie2
    ) &&
    formik
      .getFieldProps(withNamespace(ANALYSE_MARGINALE, NOM))
      .value?.trim()
      .indexOf(" ") === -1;

  useEffect(() => {
    if (checkboxEstDesactive) {
      formik.setFieldValue(withNamespace(NOM_SECABLE, SECABLE), false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkboxEstDesactive]);

  const onClickCheckboxNomSecable = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const nouveauStatutCheckBox = !formik.getFieldProps(
      withNamespace(NOM_SECABLE, SECABLE)
    ).value;
    formik.setFieldValue(
      withNamespace(NOM_SECABLE, SECABLE),
      nouveauStatutCheckBox
    );
    if (nouveauStatutCheckBox && nomComplet.includes(" ")) {
      const [nomPartie1, ...resteDeNom] = nomComplet.split(/\s+/);
      const nomPartie2 = resteDeNom.join(" ");
      formik.setFieldValue(withNamespace(NOM_SECABLE, NOM_PARTIE1), nomPartie1);
      formik.setFieldValue(withNamespace(NOM_SECABLE, NOM_PARTIE2), nomPartie2);
    }
  };

  return (
    <>
      <div className="blocNomSecable">
        <div className="bandeauSection">
          <p>
            {getLibelle("Gestion nom sécable pour la délivrance des extraits")}
          </p>
        </div>
      </div>
      <div className="formWrapperNomSecable">
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

        {formik.getFieldProps(withNamespace(NOM_SECABLE, SECABLE)).value &&
          !checkboxEstDesactive && (
            <>
              <InputField
                label={getLibelle("1re partie")}
                name={withNamespace(NOM_SECABLE, NOM_PARTIE1)}
              />
              <InputField
                label={getLibelle("2nde partie")}
                name={withNamespace(NOM_SECABLE, NOM_PARTIE2)}
              />
            </>
          )}
      </div>
    </>
  );
};

export default connect<FormikComponentProps>(
  MiseAJourAnalyseMarginaleNomSecableForm
);
