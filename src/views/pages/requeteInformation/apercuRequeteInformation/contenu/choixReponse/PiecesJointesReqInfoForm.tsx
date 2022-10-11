import { PieceJointe } from "@util/FileUtils";
import { PiecesJointes } from "@widget/formulaire/piecesJointes/PiecesJointes";
import { ISubForm, SubFormProps } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";
import "./scss/PiecesJointesReqInfo.scss";

const NOMBRE_PIECE_MAX = 2;

const PiecesJointesReqInfoForm: React.FC<SubFormProps> = props => {
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

  function getPiecesJointes(): PieceJointe[] {
    return props.formik.getFieldProps(props.nom).value || [];
  }

  function setPiecesJointes(nouvellesPiecesJointes: PieceJointe[]) {
    props.formik.setFieldValue(props.nom, nouvellesPiecesJointes);
  }

  function quotaDePiecesJointesAtteint(): boolean {
    return getPiecesJointes().length >= NOMBRE_PIECE_MAX;
  }
};

export default connect<ISubForm>(PiecesJointesReqInfoForm);
