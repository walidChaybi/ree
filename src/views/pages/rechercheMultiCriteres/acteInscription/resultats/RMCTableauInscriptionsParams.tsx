import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { HeaderTableauRMCInscription } from "@model/rmc/acteInscription/HeaderTableauRMC";
import { IResultatRMCInscription } from "@model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { getLibelle } from "@util/Utils";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
import React from "react";
import { CheckboxColumn } from "./checkboxColumn/CheckboxColumn";
import {
  commonHeadersTableauRMC,
  natureHeadersTableauRMC,
  TypeRMC
} from "./RMCTableauCommun";

const columnsTableauRmc = [
  ...commonHeadersTableauRMC,
  ...natureHeadersTableauRMC,
  new TableauTypeColumn({
    keys: [HeaderTableauRMCInscription.NumeroRef],
    title: "N° Réf.",
    getElement: getCellNumeroRef,
    align: "left",
    style: { width: "150px" }
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRMCInscription.Type],
    title: "Type"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRMCInscription.Statut],
    title: "Statut fiche",
    style: { width: "50px" }
  })
];

export const NB_INSCRIPTION_PAR_PAGE = 5;

export function determinerColonnes(
  typeRMC: TypeRMC,
  isDisabled: (data: IResultatRMCInscription) => boolean,
  onClickCheckbox: (
    index: number,
    isChecked: boolean,
    data: IResultatRMCInscription
  ) => void,
  typeRequete?: TypeRequete
) {
  // Les checkbox s'affichent que pour la RMC Auto d'une requête de délivrance
  if (typeRMC === "Auto" && typeRequete === TypeRequete.DELIVRANCE) {
    return [
      ...columnsTableauRmc,
      new TableauTypeColumn({
        keys: [HeaderTableauRMCInscription.Checkbox],
        title: "",
        getElement: getCheckBoxElement.bind(null, isDisabled, onClickCheckbox),
        style: { width: "50px" }
      })
    ];
  }
  return columnsTableauRmc;
}

function getCheckBoxElement(
  isDisabledCallBack: (data: IResultatRMCInscription) => boolean,
  onClickCheckboxCallBack: (
    index: number,
    isChecked: boolean,
    data: IResultatRMCInscription
  ) => void,
  data: any,
  index: number
): JSX.Element {
  return (
    <CheckboxColumn
      index={index}
      data={data}
      disabledMessage={getLibelle(
        "Ce résultat ne correspond pas au document demandé par le requérant"
      )}
      isDisabledCallBack={isDisabledCallBack}
      onClickCheckboxCallBack={onClickCheckboxCallBack}
    />
  );
}

function getCellNumeroRef(data: IResultatRMCInscription): JSX.Element {
  const numeroRef = `${data?.categorie?.toUpperCase()} - ${
    data?.anneeInscription
  } - ${data?.numeroInscription}`;
  return (
    <div className="TableauFontBody ColOverflow" title={numeroRef}>
      {numeroRef}
    </div>
  );
}
