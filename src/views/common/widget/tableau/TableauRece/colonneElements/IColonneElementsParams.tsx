import { ChangeEvent, MouseEvent } from "react";

export type TChangeEventSurHTMLInputElement = ChangeEvent<HTMLInputElement>;
export type TMouseEventSurHTMLButtonElement = MouseEvent<HTMLButtonElement>;
export type TMouseEventSurSVGSVGElement = MouseEvent<SVGSVGElement>;

export interface IBaseColonneElementsParams<TData, TIdentifiant> {
  identifiantsSelectionnes: TIdentifiant[];
  setIdentifiantsSelectionnes: React.Dispatch<
    React.SetStateAction<TIdentifiant[]>
  >;
  getIdentifiant: (data: TData) => TIdentifiant;
  filtreAffichageElement?: (data: TData) => boolean;
  getElement?: (data: TData) => JSX.Element;
  contientHeader?: boolean;
  style?: React.CSSProperties;
}
