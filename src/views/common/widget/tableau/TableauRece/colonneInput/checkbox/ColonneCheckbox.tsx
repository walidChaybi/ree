import React from "react";
import { TableauTypeColumn } from "../../TableauTypeColumn";
import { getElementCheckboxBody } from "./CheckboxBody";
import { CheckboxHeader } from "./CheckboxHeader";

export function getColonneCheckbox(
  identifiantsSelectionnes: string[],
  setIdentifiantsSelectionnes: React.Dispatch<React.SetStateAction<string[]>>,
  getIdentifiant: (data: any) => string,
  contientHeader = false,
  filtreAffichageCell = (data: any) => true
): TableauTypeColumn {
  function getIdentifiantsDeLaPageCourante(
    datasDeLaPageCourante: any[]
  ): string[] {
    return datasDeLaPageCourante.map(data => getIdentifiant(data));
  }

  function handleChangeCheckboxHeader(
    event: React.ChangeEvent<HTMLInputElement>,
    datasDeLaPageCourante: any[]
  ) {
    setIdentifiantsSelectionnes(
      event.target.checked
        ? getIdentifiantsDeLaPageCourante(datasDeLaPageCourante)
        : []
    );
  }

  function handleChangeCheckboxBody(
    event: React.ChangeEvent<HTMLInputElement>,
    identifiant: string
  ) {
    let selection: string[] = [...identifiantsSelectionnes];

    if (event.target.checked) {
      selection.push(identifiant);
    } else {
      selection = selection.filter(idCourant => idCourant !== identifiant);
    }
    setIdentifiantsSelectionnes(selection);
  }

  function getTitle(datasDeLaPageCourante: any[]) {
    return contientHeader && datasDeLaPageCourante.length > 0 ? (
      <CheckboxHeader
        identifiantsSelectionnes={identifiantsSelectionnes}
        identifiantsDeLaPage={getIdentifiantsDeLaPageCourante(
          datasDeLaPageCourante
        )}
        handleChange={e => handleChangeCheckboxHeader(e, datasDeLaPageCourante)}
      />
    ) : (
      <></>
    );
  }

  return new TableauTypeColumn({
    keys: ["checkbox"],
    getTitle,
    getElement: getElementCheckboxBody.bind(
      null,
      identifiantsSelectionnes,
      handleChangeCheckboxBody,
      getIdentifiant,
      filtreAffichageCell
    ),
    style: { width: "3rem" }
  });
}
