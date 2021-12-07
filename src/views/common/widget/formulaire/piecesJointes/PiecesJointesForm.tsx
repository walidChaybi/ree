import { connect } from "formik";
import React, { useEffect } from "react";
import { TypePieceJustificative } from "../../../../../model/requete/enum/TypePieceJustificative";
import { PieceJointe } from "../../../util/FileUtils";
import { Options } from "../../../util/Type";
import "../scss/PiecesJointesForm.scss";
import { SousFormulaire } from "../SousFormulaire";
import { SubFormProps } from "../utils/FormUtil";
import { PiecesJointes } from "./PiecesJointes";

const PiecesJointesForm: React.FC<SubFormProps> = props => {
  const [menuItemsState, setMenuItemsState] = React.useState<Options>([]);

  const piecesJointes: PieceJointe[] =
    props.formik.getFieldProps(props.nom).value || [];

  const setPiecesJointes = (nouvellesPiecesJointes: PieceJointe[]) => {
    props.formik.setFieldValue(props.nom, nouvellesPiecesJointes);
  };

  const getPiecesJustificatives = async () => {
    const piecesJustificatives = TypePieceJustificative.getAllEnumsAsOptions();
    setMenuItemsState(piecesJustificatives);
  };

  useEffect(() => {
    getPiecesJustificatives();
  }, []);

  return (
    <SousFormulaire titre={props.titre}>
      <PiecesJointes
        menuItem={menuItemsState}
        piecesJointes={piecesJointes}
        setPiecesJointes={setPiecesJointes}
      />
    </SousFormulaire>
  );
};

export default connect(PiecesJointesForm);
