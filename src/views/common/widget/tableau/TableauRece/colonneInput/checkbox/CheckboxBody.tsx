import { Checkbox } from "@mui/material";
import React from "react";
import "../../scss/ColonneBoutons.scss";

interface ICheckboxBody {
  identifiant: string;
  identifiantsSelectionnes: string[];
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
}

const CheckboxBody: React.FC<ICheckboxBody> = props => {
  return (
    <Checkbox
      className="checkbox-body"
      checked={props.identifiantsSelectionnes.includes(props.identifiant)}
      onClick={event => event.stopPropagation()}
      onChange={event => props.handleChange(event, props.identifiant)}
      inputProps={{ "aria-label": "checkbox-body" }}
    />
  );
};

export const getElementCheckboxBody = (
  identifiantsSelectionnes: string[],
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void,
  getIdentifiant: (data: any) => string,
  filtreCellCheckbox: (data: any) => boolean,
  data: any
): JSX.Element => {
  const element: JSX.Element = (
    <CheckboxBody
      identifiant={getIdentifiant(data)}
      identifiantsSelectionnes={identifiantsSelectionnes}
      handleChange={handleChange}
    />
  );

  return filtreCellCheckbox(data) ? element : <></>;
};
