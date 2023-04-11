import React from "react";
import { TableauTypeColumn } from "../../TableauTypeColumn";
import {
  getConteneurAvecElement,
  IConteneurElementPropsPartielles
} from "../ConteneurElement";
import {
  IBaseColonneElementsParams,
  TMouseEventSurHTMLButtonElement
} from "../IColonneElementsParams";
import {
  CelluleBoutonMenu,
  ICelluleBoutonMenuProps
} from "./CelluleBoutonMenu";

export type IColonneBoutonMenuParams<TData, TIdentifiant> = Omit<
  IBaseColonneElementsParams<TData, TIdentifiant>,
  "identifiantsSelectionnes" | "setIdentifiantsSelectionnes"
>;

export function getColonneBoutonMenu<
  TData,
  TIdentifiant,
  TEvenement extends TMouseEventSurHTMLButtonElement
>(
  colonneBoutonMenuParams: IColonneBoutonMenuParams<TData, TIdentifiant>,
  boutonMenuProps: ICelluleBoutonMenuProps,
  conteneurPropsPartielles?: IConteneurElementPropsPartielles<
    TData,
    TIdentifiant,
    TEvenement
  >
): TableauTypeColumn {
  const getElement = getConteneurAvecElement.bind<
    null,
    IConteneurElementPropsPartielles<TData, TIdentifiant, TEvenement>,
    (data: TData) => TIdentifiant,
    (data: TData) => boolean,
    React.ReactElement<ICelluleBoutonMenuProps>,
    [TData],
    JSX.Element
  >(
    null,
    { ...conteneurPropsPartielles },
    colonneBoutonMenuParams.getIdentifiant,
    colonneBoutonMenuParams.filtreAffichageElement ?? ((data: TData) => true),
    <CelluleBoutonMenu<TData, TIdentifiant>
      {...boutonMenuProps}
      className="colonne-bouton-menu"
    />
  );

  return new TableauTypeColumn({
    keys: ["bouton-menu"],
    getTitle: () => <></>,
    getElement,
    style: colonneBoutonMenuParams.style
  });
}
