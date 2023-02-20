import { Checkbox } from "@mui/material";
import React from "react";
import "../../scss/ColonneBoutons.scss";

interface ICheckboxHeader {
  identifiantsSelectionnes: string[];
  allIdentifiants: string[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxHeader: React.FC<ICheckboxHeader> = props => {
  const estCochee = (): boolean => {
    return (
      props.allIdentifiants.length === props.identifiantsSelectionnes.length
    );
  };

  const estIndeterminee = (): boolean => {
    return !estCochee() && props.identifiantsSelectionnes.length > 0;
  };

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
