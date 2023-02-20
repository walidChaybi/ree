import React from "react";
import { TableauTypeColumn } from "../../TableauTypeColumn";
import { getElementCheckboxBody } from "./CheckboxBody";
import { CheckboxHeader } from "./CheckboxHeader";

export const getColonneCheckbox = (
  identifiantsSelectionnes: string[],
  setIdentifiantsSelectionnes: React.Dispatch<React.SetStateAction<string[]>>,
  getIdentifiant: (data: any) => string,
  contientHeader = false,
  allIdentifiants?: string[],
  filtreAffichageCell?: (data: any) => boolean
): TableauTypeColumn => {
  if (!filtreAffichageCell) {
    filtreAffichageCell = (data: any) => true;
  }

  const handleChangeCheckboxHeader = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    allIdentifiants &&
      setIdentifiantsSelectionnes(event.target.checked ? allIdentifiants : []);
  };

  const handleChangeCheckboxBody = (
    event: React.ChangeEvent<HTMLInputElement>,
    identifiant: string
  ) => {
    let selection: string[] = [...identifiantsSelectionnes];

    if (event.target.checked) {
      selection.push(identifiant);
    } else {
      selection = selection.filter(idCourant => idCourant !== identifiant);
    }
    setIdentifiantsSelectionnes(selection);
  };

  const title =
    contientHeader && allIdentifiants && allIdentifiants.length > 0 ? (
      <CheckboxHeader
        identifiantsSelectionnes={identifiantsSelectionnes}
        allIdentifiants={allIdentifiants}
        handleChange={handleChangeCheckboxHeader}
      />
    ) : (
      ""
    );

  return new TableauTypeColumn({
    keys: [],
    title,
    getElement: getElementCheckboxBody.bind(
      null,
      identifiantsSelectionnes,
      handleChangeCheckboxBody,
      getIdentifiant,
      filtreAffichageCell
    ),
    style: { width: "3rem" }
  });
};
