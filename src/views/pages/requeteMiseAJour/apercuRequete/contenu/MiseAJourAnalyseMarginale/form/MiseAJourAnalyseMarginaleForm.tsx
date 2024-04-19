import {
  ANALYSE_MARGINALE,
  MOTIF,
  NOM,
  NOM_PARTIE1,
  NOM_PARTIE2,
  NOM_SECABLE,
  PRENOM,
  SECABLE
} from "@composant/formulaire/ConstantesNomsForm";
import { MiseAJourMentionsContext } from "@pages/requeteMiseAJour/apercuRequete/ApercuRequeteMiseAJourPage";
import { getLibelle } from "@util/Utils";
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
  const { derniereAnalyseMarginaleResultat, setAnalyseMarginale } = useContext(
    MiseAJourMentionsContext
  );
  useEffect(() => {
    const secabilite = getValeurFormik(
      formik,
      withNamespace(NOM_SECABLE, SECABLE)
    );

    if (derniereAnalyseMarginaleResultat) {
      setAnalyseMarginale({
        motif: getValeurFormik(formik, withNamespace(ANALYSE_MARGINALE, MOTIF)),
        nom: getValeurFormik(formik, withNamespace(ANALYSE_MARGINALE, NOM)),
        prenom: getValeurFormik(
          formik,
          withNamespace(ANALYSE_MARGINALE, PRENOM)
        ),
        nomPartie1: secabilite
          ? getValeurFormik(formik, withNamespace(NOM_SECABLE, NOM_PARTIE1))
          : undefined,
        nomPartie2: secabilite
          ? getValeurFormik(formik, withNamespace(NOM_SECABLE, NOM_PARTIE2))
          : undefined
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [derniereAnalyseMarginaleResultat, formik.values]);

  return (
    <div className="formWrapper">
      <MiseAJourAnalyseMarginaleNomForm />
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
