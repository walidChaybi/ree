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
import { IMajAnalyseMarginale } from "@hook/acte/EnregistrerMentionsApiHook";
import { getPrenomsOrdonneVersPrenomsDefaultValues } from "@pages/requeteDelivrance/saisirRequete/hook/mappingCommun";
import { MiseAJourMentionsContext } from "@pages/requeteMiseAJour/apercuRequete/ApercuRequeteMiseAJourPage";
import {
  getLibelle,
  mapPrenomsVersPrenomsOrdonnes,
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
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import MiseAJourAnalyseMarginaleNomForm from "./MiseAJourAnalyseMarginaleNomForm";
import MiseAJourAnalyseMarginaleNomSecableForm from "./MiseAJourAnalyseMarginaleNomSecableForm";
import "./scss/MiseAJourAnalyseMarginaleForm.scss";

type MiseAJourAnalyseMarginaleFormProps = {
  onClickAbandonnerDerniereAnalyseMarginaleNonValide: () => void;
  resetForm: boolean;
  setResetForm: Dispatch<SetStateAction<boolean>>;
};

const MiseAJourAnalyseMarginaleForm: React.FC<
  FormikComponentProps & MiseAJourAnalyseMarginaleFormProps
> = ({
  formik,
  onClickAbandonnerDerniereAnalyseMarginaleNonValide,
  resetForm,
  setResetForm
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

  useEffect(() => {
    if (!shallowEgal(analyseMarginale, analyseMarginaleEnregistree)) {
      setFormAvecValeursAnalyseMarginaleEnCours(analyseMarginale);
    }
  }, []);

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

  const setFormAvecValeursAnalyseMarginaleEnCours = (
    analyseMarginaleEnCoursDeSaisie: IMajAnalyseMarginale | undefined
  ) => {
    formik.setFieldValue(
      withNamespace(ANALYSE_MARGINALE, NOM),
      analyseMarginaleEnCoursDeSaisie?.nom,
      true
    );
    formik.setFieldValue(
      withNamespace(ANALYSE_MARGINALE, PRENOMS),
      getPrenomsOrdonneVersPrenomsDefaultValues(
        mapPrenomsVersPrenomsOrdonnes(analyseMarginaleEnCoursDeSaisie?.prenoms)
      ),
      true
    );
    formik.setFieldValue(
      withNamespace(ANALYSE_MARGINALE, MOTIF),
      analyseMarginaleEnCoursDeSaisie?.motif,
      true
    );
    formik.setFieldValue(
      withNamespace(NOM_SECABLE, NOM_PARTIE1),
      analyseMarginaleEnCoursDeSaisie?.nomPartie1,
      true
    );
    formik.setFieldValue(
      withNamespace(NOM_SECABLE, NOM_PARTIE2),
      analyseMarginaleEnCoursDeSaisie?.nomPartie2,
      true
    );
  };

  useEffect(() => {
    if (resetForm) {
      formik.resetForm();
      setResetForm(false);
    }
  }, [resetForm]);

  return (
    <div className="formWrapper">
      <MiseAJourAnalyseMarginaleNomForm />
      <MiseAJourAnalyseMarginaleNomSecableForm />
      <div className="boutonWrapper">
        <Bouton
          disabled={!formik.dirty}
          onClick={() => {
            setAnalyseMarginale(undefined);
            formik.resetForm();
          }}
        >
          {getLibelle("ANNULER LA SAISIE EN COURS")}
        </Bouton>
        {analyseMarginaleEnregistree && (
          <span
            className="titre"
            title={
              "Abandonne toutes les modifications de l'analyse marginale et recharge l’analyse marginale à son état initial avant mise à jour"
            }
          >
            <Bouton
              onClick={onClickAbandonnerDerniereAnalyseMarginaleNonValide}
            >
              {getLibelle("ABANDONNER LA MODIFICATION")}
            </Bouton>
          </span>
        )}
      </div>
    </div>
  );
};

export default connect<
  FormikComponentProps & MiseAJourAnalyseMarginaleFormProps
>(MiseAJourAnalyseMarginaleForm);
