import { TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { PieceJointe } from "@util/FileUtils";
import { Options } from "@util/Type";
import { connect } from "formik";
import React, { useEffect } from "react";
import "../scss/PiecesJointesForm.scss";
import { SousFormulaire } from "../SousFormulaire";
import { SubFormProps } from "../utils/FormUtil";
import { PiecesJointes } from "./PiecesJointes";

export interface PiecesJointesFormProps extends SubFormProps {
  typeRequete?: TypeRequete;
}

const PiecesJointesForm: React.FC<PiecesJointesFormProps> = props => {
  const [menuItemsState, setMenuItemsState] = React.useState<Options>([]);

  const piecesJointes: PieceJointe[] =
    props.formik.getFieldProps(props.nom).value || [];

  const setPiecesJointes = (nouvellesPiecesJointes: PieceJointe[]) => {
    props.formik.setFieldValue(props.nom, nouvellesPiecesJointes);
  };

  const getPiecesJustificatives = async () => {
    const piecesJustificatives =
      TypePieceJustificative.getAllEnumsByTypeRequeteAsOptions(
        props.typeRequete
      );
    setMenuItemsState(piecesJustificatives);
  };

  useEffect(() => {
    getPiecesJustificatives();
    // eslint-disable-next-line
  }, [props.typeRequete]);

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
