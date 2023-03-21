import { Checkbox } from "@mui/material";
import React from "react";
import { InputBodyConteneurContext } from "../InputBodyConteneur";

interface CheckboxBodyProps {
  taille?: "small" | "medium";
}

export const CheckboxBody: React.FC<CheckboxBodyProps> = props => {
  const inputBodyConteneurContext = React.useContext(InputBodyConteneurContext);

  return (
    <Checkbox
      className="checkbox-body"
      checked={inputBodyConteneurContext.estCochee}
      disabled={inputBodyConteneurContext.estDesactive}
      onClick={event => event.stopPropagation()}
      onChange={event =>
        inputBodyConteneurContext.handleChildChange(
          event,
          inputBodyConteneurContext.data
        )
      }
      inputProps={{ "aria-label": "checkbox-body" }}
      size={props.taille}
      style={{ padding: 0 }}
    />
  );
};
