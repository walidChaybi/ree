import { connect } from "formik";
import React, { useEffect } from "react";
import { FormikComponentProps } from "./FormUtil";

interface IFormikEffectProps {
  onChange: (dirty: boolean) => void;
}

const FormikEffect: React.FC<
  IFormikEffectProps & FormikComponentProps
> = props => {
  const { values } = props.formik;

  useEffect(() => {
    if (values) {
      props.onChange(props.formik.dirty);
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [values]);

  return null;
};

export default connect<IFormikEffectProps>(FormikEffect);
