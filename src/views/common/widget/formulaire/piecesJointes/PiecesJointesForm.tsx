import { ETypeRedactionActe } from "@model/etatcivil/enum/ETypeRedactionActe";
import { TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { Options } from "@util/Type";
import { connect } from "formik";
import React, { useEffect } from "react";
import { PieceJointe } from "../../../../../utils/FileUtils";
import { SousFormulaire } from "../SousFormulaire";
import "../scss/PiecesJointesForm.scss";
import { ISubForm, SubFormProps } from "../utils/FormUtil";
import { PiecesJointes } from "./PiecesJointes";

interface PiecesJointesFormProps {
  typeRequete: TypeRequete;
  typeRedactionActe?: ETypeRedactionActe;
  maxPiecesJointes?: number;
}

type PiecesJointesSubFormProps = SubFormProps & PiecesJointesFormProps;

const PiecesJointesForm: React.FC<PiecesJointesSubFormProps> = props => {
  const [menuItemsState, setMenuItemsState] = React.useState<Options>([]);

  const piecesJointes: PieceJointe[] = props.formik.getFieldProps(props.nom).value || [];

  const setPiecesJointes = (nouvellesPiecesJointes: PieceJointe[]) => {
    props.formik.setFieldValue(props.nom, nouvellesPiecesJointes);
  };

  const getPiecesJustificatives = async () => {
    const piecesJustificatives = TypePieceJustificative.versOptions(props.typeRequete, props.typeRedactionActe);
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
        maxPiecesJointes={props.maxPiecesJointes}
      />
    </SousFormulaire>
  );
};

export default connect<ISubForm & PiecesJointesFormProps>(PiecesJointesForm);
