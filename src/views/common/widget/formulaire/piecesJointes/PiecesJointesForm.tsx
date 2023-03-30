import { TypeRedactionActe } from "@model/etatcivil/enum/TypeRedactionActe";
import { TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { PieceJointe } from "@util/FileUtils";
import { Options } from "@util/Type";
import { connect } from "formik";
import React, { useEffect } from "react";
import "../scss/PiecesJointesForm.scss";
import { SousFormulaire } from "../SousFormulaire";
import { ISubForm, SubFormProps } from "../utils/FormUtil";
import { PiecesJointes } from "./PiecesJointes";

export interface PiecesJointesFormProps {
  typeRequete: TypeRequete;
  typeRedactionActe?: TypeRedactionActe;
}

export type PiecesJointesSubFormProps = SubFormProps & PiecesJointesFormProps;

const PiecesJointesForm: React.FC<PiecesJointesSubFormProps> = props => {
  const [menuItemsState, setMenuItemsState] = React.useState<Options>([]);

  const piecesJointes: PieceJointe[] =
    props.formik.getFieldProps(props.nom).value || [];

  const setPiecesJointes = (nouvellesPiecesJointes: PieceJointe[]) => {
    props.formik.setFieldValue(props.nom, nouvellesPiecesJointes);
  };

  const getPiecesJustificatives = async () => {
    const piecesJustificatives =
      TypePieceJustificative.getAllEnumsByTypeRequeteAsOptions(
        props.typeRequete,
        props.typeRedactionActe
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

export default connect<ISubForm & PiecesJointesFormProps>(PiecesJointesForm);
