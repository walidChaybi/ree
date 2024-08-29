import { Form, Formik } from "formik";
import React from "react";
import FormulaireExtraitCopieDelivrance from "../../composants/pages/requetesDelivrance/saisirRequete/FormulaireExtraitCopieDelivrance";

const PageSaisirRequeteDelivrance: React.FC = () => {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      <Form>
        <FormulaireExtraitCopieDelivrance />
      </Form>
    </Formik>
  );
};

export default PageSaisirRequeteDelivrance;
