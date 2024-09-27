import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import React from "react";
import {
  ConteneurElementContext,
  IConteneurElementContext
} from "../ConteneurElementContext";
import { TChangeEventSurHTMLInputElement } from "../IColonneElementsParams";

export type ICelluleCaseACocherProps = CheckboxProps;

export const CelluleCaseACocher = <TData, TIdentifiant>(
  props: ICelluleCaseACocherProps
): React.ReactElement => {
  const conteneurContext = React.useContext<
    IConteneurElementContext<
      TData,
      TIdentifiant,
      TChangeEventSurHTMLInputElement
    >
  >(ConteneurElementContext);

  return (
    <Checkbox
      {...props}
      className={`case-a-cocher ${props.className}`}
      checked={conteneurContext.estSelectionne}
      disabled={conteneurContext.estDesactive}
      onClick={event => event.stopPropagation()}
      onChange={event =>
        conteneurContext.handleInteractionUtilisateur(
          event,
          conteneurContext.data
        )
      }
      inputProps={{ "aria-label": "checkbox-body" }}
      style={{ padding: 0 }}
    />
  );
};
