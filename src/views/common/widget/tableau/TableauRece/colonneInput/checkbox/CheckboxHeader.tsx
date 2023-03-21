import { Checkbox } from "@mui/material";
import { ZERO } from "@util/Utils";
import React from "react";

interface ICheckboxHeader {
  identifiantsDeLaPage: string[];
  identifiantsSelectionnes: string[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  taille?: "small" | "medium";
}

export const CheckboxHeader: React.FC<ICheckboxHeader> = props => {
  function identifiantEstSelectionne(identifiant: string): boolean {
    return props.identifiantsSelectionnes.includes(identifiant);
  }

  function estVerrouillee(): boolean {
    return props.identifiantsDeLaPage.length === ZERO;
  }

  function estCochee(): boolean {
    return props.identifiantsDeLaPage.every(identifiantEstSelectionne);
  }

  function estIndeterminee(): boolean {
    return (
      props.identifiantsDeLaPage.some(identifiantEstSelectionne) && !estCochee()
    );
  }

  return (
    <Checkbox
      className="checkbox-header"
      disabled={estVerrouillee()}
      checked={!estVerrouillee() && estCochee()}
      indeterminate={estIndeterminee()}
      onChange={props.handleChange}
      inputProps={{ "aria-label": "checkbox-header" }}
      size={props.taille}
      style={{ padding: 0 }}
    />
  );
};
