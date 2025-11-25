import React from "react";
import { TableauTypeColumn } from "../../TableauTypeColumn";
import { getConteneurAvecElement, IConteneurElementPropsPartielles } from "../ConteneurElement";
import { IBaseColonneElementsParams, TMouseEventSurHTMLButtonElement } from "../IColonneElementsParams";
import { CelluleBoutonMenu, ICelluleBoutonMenuProps } from "./CelluleBoutonMenu";

export type IColonneBoutonMenuParams<TData, TIdentifiant> = Omit<
  IBaseColonneElementsParams<TData, TIdentifiant>,
  "identifiantsSelectionnes" | "setIdentifiantsSelectionnes"
>;

export const getColonneBoutonMenu = <TData, TIdentifiant, TEvenement extends TMouseEventSurHTMLButtonElement>(
  colonneBoutonMenuParams: IColonneBoutonMenuParams<TData, TIdentifiant>,
  boutonMenuProps?: ICelluleBoutonMenuProps,
  conteneurPropsPartielles?: IConteneurElementPropsPartielles<TData, TIdentifiant, TEvenement>
): TableauTypeColumn => {
  const getElement = getConteneurAvecElement.bind<
    null,
    IConteneurElementPropsPartielles<TData, TIdentifiant, TEvenement>,
    (data: TData) => TIdentifiant,
    (data: TData) => boolean,
    (data: TData) => React.ReactElement<ICelluleBoutonMenuProps>,
    [TData],
    JSX.Element
  >(
    null,
    { ...conteneurPropsPartielles },
    colonneBoutonMenuParams.getIdentifiant,
    colonneBoutonMenuParams.filtreAffichageElement ?? ((data: TData) => true),
    colonneBoutonMenuParams.getElement ??
      ((data: TData) => (
        <CelluleBoutonMenu<TData, TIdentifiant>
          boutonLibelle=""
          options={[]}
          {...boutonMenuProps}
        />
      ))
  );

  return new TableauTypeColumn({
    keys: ["bouton-menu"],
    getTitle: () => <></>,
    getElement,
    style: colonneBoutonMenuParams.style
  });
};
