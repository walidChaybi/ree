import {
  FontAwesomeIcon,
  FontAwesomeIconProps
} from "@fortawesome/react-fontawesome";
import React from "react";
import {
  ConteneurElementContext,
  IConteneurElementContext
} from "../ConteneurElementContext";
import { TMouseEventSurSVGSVGElement } from "../IColonneElementsParams";
import "./../../../../../../common/widget/icones/scss/Icones.scss";

export type ICelluleFontAwesomeIconeProps = FontAwesomeIconProps;

export const CelluleFontAwesomeIcone = <TData, TIdentifiant>(
  props: ICelluleFontAwesomeIconeProps
): React.ReactElement => {
  const conteneurContext = React.useContext<
    IConteneurElementContext<TData, TIdentifiant, TMouseEventSurSVGSVGElement>
  >(ConteneurElementContext);

  return (
    <FontAwesomeIcon
      {...props}
      onClick={event =>
        conteneurContext.handleInteractionUtilisateur(
          event,
          conteneurContext.data
        )
      }
    />
  );
};
