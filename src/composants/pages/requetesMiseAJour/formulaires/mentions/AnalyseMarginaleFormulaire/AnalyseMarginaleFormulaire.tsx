import { Form, Formik } from "formik";

import AnalyseMarginaleForm from "@model/form/AnalyseMarginale/AnalyseMarginaleForm";
import ComposantChargeur from "../../../../../commun/chargeurs/ComposantChargeur";
import { IAnalyseMarginaleMiseAJour } from "../../../PartieFormulaire";
import ChampsAnalyseMarginaleFormulaire from "./ChampsAnalyseMarginaleFormulaire";

interface IAnalyseMarginaleFormProps {
  setDonneesAnalyseMarginale: (data: IAnalyseMarginaleMiseAJour) => void;
  setAnalyseMarginaleModifiee: (estModifiee: boolean) => void;
  valeursInitiales: IAnalyseMarginaleMiseAJour | null;
  motif: string | null;
}

const AnalyseMarginaleFormulaire: React.FC<IAnalyseMarginaleFormProps> = ({
  setDonneesAnalyseMarginale,
  setAnalyseMarginaleModifiee,
  valeursInitiales,
  motif
}) => (
  <>
    {valeursInitiales === null ? (
      <ComposantChargeur />
    ) : (
      <Formik<IAnalyseMarginaleMiseAJour>
        initialValues={valeursInitiales}
        validationSchema={AnalyseMarginaleForm.schemaValidation()}
        enableReinitialize
        onSubmit={(values, helpers) => {
          setDonneesAnalyseMarginale(values);
          helpers.resetForm({ values });
        }}
      >
        <Form>
          <ChampsAnalyseMarginaleFormulaire
            setAnalyseMarginaleModifiee={setAnalyseMarginaleModifiee}
            motif={motif}
            nombreDeTitulaires={valeursInitiales.titulaires.length}
          />
        </Form>
      </Formik>
    )}
  </>
);

export default AnalyseMarginaleFormulaire;
