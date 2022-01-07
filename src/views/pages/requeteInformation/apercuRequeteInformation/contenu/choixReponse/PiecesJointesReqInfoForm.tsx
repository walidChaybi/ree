import { connect } from "formik";
import React, { useEffect, useState } from "react";
import { PieceJointe } from "../../../../../common/util/FileUtils";
import { PiecesJointes } from "../../../../../common/widget/formulaire/piecesJointes/PiecesJointes";
import { SubFormProps } from "../../../../../common/widget/formulaire/utils/FormUtil";
import "./scss/PiecesJointesReqInfo.scss";

const NOMBRE_PIECE_MAX = 2;

const PiecesJointesReqInfoForm: React.FC<SubFormProps> = props => {
  const [estDisabled, setEstDisabled] = useState(false);
  const piecesJointes: PieceJointe[] =
    props.formik.getFieldProps(props.nom).value || [];

  const setPiecesJointes = (nouvellesPiecesJointes: PieceJointe[]) => {
    props.formik.setFieldValue(props.nom, nouvellesPiecesJointes);
  };

  useEffect(() => {
    if (props.disabled) {
      setEstDisabled(true);
    } else if (props.formik.getFieldProps(props.nom).value) {
      setEstDisabled(
        props.formik.getFieldProps(props.nom).value.length >= NOMBRE_PIECE_MAX
      );
    }
  }, [props.formik, props.nom, props.disabled]);

  return (
    <>
      {props.visible && (
        <div className="PiecesJointesReqInfo">
          <PiecesJointes
            piecesJointes={piecesJointes}
            setPiecesJointes={setPiecesJointes}
            libelleBouton="Ajouter une pièce jointe"
            disabled={estDisabled}
          />
        </div>
      )}
    </>
  );
};

export default connect(PiecesJointesReqInfoForm);
