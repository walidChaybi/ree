import { TableauTypeColumn } from "../../TableauTypeColumn";
import { getConteneurAvecElement, IConteneurElementPropsPartielles } from "../ConteneurElement";
import { IBaseColonneElementsParams, TMouseEventSurSVGSVGElement } from "../IColonneElementsParams";

export type IColonneFontAwesomeIcone<TData, TIdentifiant> = Omit<
  IBaseColonneElementsParams<TData, TIdentifiant>,
  "identifiantsSelectionnes" | "setIdentifiantsSelectionnes"
>;

export const getColonneFontAwesomeIcone = <TData, TIdentifiant, TEvenement extends TMouseEventSurSVGSVGElement>(
  colonneParams: IColonneFontAwesomeIcone<TData, TIdentifiant>,
  conteneurPropsPartielles?: IConteneurElementPropsPartielles<TData, TIdentifiant, TEvenement>
) => {
  const getElement = getConteneurAvecElement(
    { ...conteneurPropsPartielles },
    colonneParams.getIdentifiant,
    colonneParams.filtreAffichageElement ?? ((data: TData) => true),
    colonneParams.getElement ?? ((data: TData) => <></>),
    conteneurPropsPartielles?.data as TData
  );

  return new TableauTypeColumn({
    keys: ["colonne-icone"],
    getTitle: () => <></>,
    getElement: () => getElement,
    style: colonneParams.style
  });
};
