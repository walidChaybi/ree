import { PiecesJointes } from "@widget/formulaire/piecesJointes/PiecesJointes";
import { ISubForm, SubFormProps } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";
import { PieceJointe } from "../../../../../../utils/FileUtils";
import "./scss/PiecesJointesReqInfo.scss";

const NOMBRE_PIECE_MAX = 2;

const PiecesJointesReqInfoForm: React.FC<SubFormProps> = props => {
  const getPiecesJointes = (): PieceJointe[] => {
    return props.formik.getFieldProps(props.nom).value || [];
  };

  const setPiecesJointes = (nouvellesPiecesJointes: PieceJointe[]) => {
    props.formik.setFieldValue(props.nom, nouvellesPiecesJointes);
  };

  const quotaDePiecesJointesAtteint = (): boolean => {
    return getPiecesJointes().length >= NOMBRE_PIECE_MAX;
  };

  return (
    <>
      {props.visible && (
        <div className="PiecesJointesReqInfo">
          <PiecesJointes
            piecesJointes={getPiecesJointes()}
            setPiecesJointes={setPiecesJointes}
            libelleBouton="Ajouter une pièce jointe"
            disabled={props.disabled || quotaDePiecesJointesAtteint()}
          />
        </div>
      )}
    </>
  );
};

export default connect<ISubForm>(PiecesJointesReqInfoForm);
