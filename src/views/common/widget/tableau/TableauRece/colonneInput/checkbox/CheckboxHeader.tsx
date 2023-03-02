import { Checkbox } from "@mui/material";
import React from "react";
import "../../scss/ColonneBoutons.scss";

interface ICheckboxHeader {
  identifiantsSelectionnes: string[];
  identifiantsDeLaPage: string[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxHeader: React.FC<ICheckboxHeader> = props => {
  function estSelectionne(identifiantDeLaPage: string): boolean {
    return props.identifiantsSelectionnes.includes(identifiantDeLaPage);
  }

  function estCochee(): boolean {
    return props.identifiantsDeLaPage.every(estSelectionne);
  }

  function estIndeterminee(): boolean {
    return props.identifiantsDeLaPage.some(estSelectionne) && !estCochee();
  }

  return (
    <Checkbox
      className="checkbox-header"
      checked={estCochee()}
      indeterminate={estIndeterminee()}
      onChange={props.handleChange}
      inputProps={{ "aria-label": "checkbox-header" }}
    />
  );
};
