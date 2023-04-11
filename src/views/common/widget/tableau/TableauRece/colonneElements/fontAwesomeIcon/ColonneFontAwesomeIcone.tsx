import React from "react";
import { TableauTypeColumn } from "../../TableauTypeColumn";
import {
  getConteneurAvecElement,
  IConteneurElementPropsPartielles
} from "../ConteneurElement";
import {
  IBaseColonneElementsParams,
  TMouseEventSurSVGSVGElement
} from "../IColonneElementsParams";
import {
  CelluleFontAwesomeIcone,
  ICelluleFontAwesomeIconeProps
} from "./CelluleFontAwesomeIcone";

export type IColonneFontAwesomeIcone<TData, TIdentifiant> = Omit<
  IBaseColonneElementsParams<TData, TIdentifiant>,
  "identifiantsSelectionnes" | "setIdentifiantsSelectionnes"
>;

export function getColonneFontAwesomeIcone<
  TData,
  TIdentifiant,
  TEvenement extends TMouseEventSurSVGSVGElement
>(
  colonneParams: IColonneFontAwesomeIcone<TData, TIdentifiant>,
  iconProps: ICelluleFontAwesomeIconeProps,
  conteneurPropsPartielles?: IConteneurElementPropsPartielles<
    TData,
    TIdentifiant,
    TEvenement
  >
) {
  const getElement = getConteneurAvecElement.bind<
    null,
    IConteneurElementPropsPartielles<TData, TIdentifiant, TEvenement>,
    (data: TData) => TIdentifiant,
    (data: TData) => boolean,
    React.ReactElement<ICelluleFontAwesomeIconeProps>,
    [TData],
    JSX.Element
  >(
    null,
    { ...conteneurPropsPartielles },
    colonneParams.getIdentifiant,
    colonneParams.filtreAffichageElement ?? ((data: TData) => true),
    <CelluleFontAwesomeIcone<TData, TIdentifiant> {...iconProps} />
  );

  return new TableauTypeColumn({
    keys: ["colonne-icone"],
    getTitle: () => <></>,
    getElement,
    style: colonneParams.style
  });
}
