import {
  ANALYSE_MARGINALE,
  MOTIF,
  NOM,
  NOM_PARTIE1,
  NOM_PARTIE2,
  NOM_SECABLE,
  PRENOMS,
  SECABLE
} from "@composant/formulaire/ConstantesNomsForm";
import { MiseAJourMentionsContext } from "@pages/requeteMiseAJour/apercuRequete/ApercuRequeteMiseAJourPage";
import {
  getLibelle,
  mapPrenomsVersTableauString,
  shallowEgal
} from "@util/Utils";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import {
  FormikComponentProps,
  getValeurFormik,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import { useContext, useEffect } from "react";
import MiseAJourAnalyseMarginaleNomForm from "./MiseAJourAnalyseMarginaleNomForm";
import MiseAJourAnalyseMarginaleNomSecableForm from "./MiseAJourAnalyseMarginaleNomSecableForm";
import "./scss/MiseAJourAnalyseMarginaleForm.scss";

const MiseAJourAnalyseMarginaleForm: React.FC<FormikComponentProps> = ({
  formik
}) => {
  const {
    analyseMarginale,
    setAnalyseMarginale,
    estFormulaireDirty,
    setEstFormulaireDirty,
    estFormulaireValide,
    setEstFormulaireValide,
    analyseMarginaleEnregistree,
    derniereAnalyseMarginaleResultat
  } = useContext(MiseAJourMentionsContext);

  const estBoutonAnnulerSaisieDesactivé =
    shallowEgal(analyseMarginale, analyseMarginaleEnregistree) && !formik.dirty;

  useEffect(() => {
    setEstFormulaireDirty({
      ...estFormulaireDirty,
      analyseMarginaleFormEstDirty: formik.dirty
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.dirty]);

  useEffect(() => {
    setEstFormulaireValide({
      ...estFormulaireValide,
      analyseMarginaleFormEstValide: formik.isValid
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.isValid]);

  useEffect(() => {
    formik.setFieldTouched(withNamespace(ANALYSE_MARGINALE, NOM), true, false);
    formik.setFieldTouched(
      withNamespace(ANALYSE_MARGINALE, PRENOMS),
      true,
      true
    );
    formik.setFieldTouched(withNamespace(ANALYSE_MARGINALE, MOTIF), true, true);
    formik.setFieldTouched(withNamespace(NOM_SECABLE, NOM_PARTIE1), true, true);
    formik.setFieldTouched(withNamespace(NOM_SECABLE, NOM_PARTIE2), true, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.errors]);

  useEffect(() => {
    const secabilite = getValeurFormik(
      formik,
      withNamespace(NOM_SECABLE, SECABLE)
    );
    if (derniereAnalyseMarginaleResultat) {
      setAnalyseMarginale({
        motif: getValeurFormik(formik, withNamespace(ANALYSE_MARGINALE, MOTIF)),
        nom: getValeurFormik(formik, withNamespace(ANALYSE_MARGINALE, NOM)),
        prenoms: mapPrenomsVersTableauString(
          getValeurFormik(formik, withNamespace(ANALYSE_MARGINALE, PRENOMS))
        ),
        secable: secabilite,
        nomPartie1: secabilite
          ? getValeurFormik(formik, withNamespace(NOM_SECABLE, NOM_PARTIE1))
          : null,
        nomPartie2: secabilite
          ? getValeurFormik(formik, withNamespace(NOM_SECABLE, NOM_PARTIE2))
          : null
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [derniereAnalyseMarginaleResultat, formik.values]);

  return (
    <div className="formWrapper">
      <MiseAJourAnalyseMarginaleNomForm />
      <MiseAJourAnalyseMarginaleNomSecableForm />
      <div className="boutonWrapper">
        <Bouton
          disabled={estBoutonAnnulerSaisieDesactivé}
          onClick={() => formik.resetForm()}
        >
          {getLibelle("Annuler la saisie en cours")}
        </Bouton>
      </div>
    </div>
  );
};

export default connect<FormikComponentProps>(MiseAJourAnalyseMarginaleForm);
