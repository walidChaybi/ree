import React from "react";
import { TableauTypeColumn } from "../../TableauTypeColumn";
import { getInputBodyConteneur } from "../InputBodyConteneur";
import { IColonneInputParams } from "../InputParams";
import { CheckboxBody } from "./CheckboxBody";
import { CheckboxHeader } from "./CheckboxHeader";

export function getColonneCheckbox(
  params: IColonneInputParams
): TableauTypeColumn {
  function getIdentifiantsDeLaPageCourante(
    datasDeLaPageCourante: any[]
  ): string[] {
    const identifiants: string[] = [];
    // Pour ne pas avoir d'erreur ts quand on appel la fonction dans le if.
    const handleEstDesactive = params.handleEstDesactive;
    if (handleEstDesactive) {
      identifiants.push(
        ...datasDeLaPageCourante.reduce((acc, current) => {
          !handleEstDesactive(current) &&
            acc.push(params.getIdentifiant(current));
          return acc;
        }, [])
      );
    } else {
      identifiants.push(
        ...datasDeLaPageCourante.map(data => params.getIdentifiant(data))
      );
    }
    return identifiants;
  }

  function handleChangeCheckboxHeader(
    event: React.ChangeEvent<HTMLInputElement>,
    datasDeLaPageCourante: any[]
  ) {
    params.setIdentifiantsSelectionnes(
      event.target.checked
        ? getIdentifiantsDeLaPageCourante(datasDeLaPageCourante)
        : []
    );
  }

  function handleChangeCheckboxBody(
    event: React.ChangeEvent<HTMLInputElement>,
    data: any
  ) {
    const identifiant: string = params.getIdentifiant(data);
    let selection: string[] = [...params.identifiantsSelectionnes];

    if (event.target.checked) {
      selection.push(identifiant);
    } else {
      selection = selection.filter(idCourant => idCourant !== identifiant);
    }
    params.setIdentifiantsSelectionnes(selection);

    params.handleClickInput &&
      params.handleClickInput(event.target.checked, data);
  }

  function getTitle(datasDeLaPageCourante: any[]) {
    return params.contientHeader && datasDeLaPageCourante.length > 0 ? (
      <CheckboxHeader
        identifiantsSelectionnes={params.identifiantsSelectionnes}
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
    align: "left",
    getTitle,
    getElement: getInputBodyConteneur.bind(
      null,
      {
        identifiantsSelectionnes: params.identifiantsSelectionnes,
        getIdentifiant: params.getIdentifiant,
        handleEstDesactive: params.handleEstDesactive,
        messageEstDesactive: params.messageEstDesactive,
        handleAfficheAvertissement: params.handleAfficheAvertissement,
        handleChildChange: handleChangeCheckboxBody
      },
      <CheckboxBody />
    ),
    style: {
      width:
        params.handleAfficheAvertissement || params.handleEstDesactive
          ? "4rem"
          : "2rem"
    }
  });
}
