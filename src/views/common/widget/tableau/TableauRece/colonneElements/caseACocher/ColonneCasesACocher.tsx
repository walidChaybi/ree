import React from "react";
import { TableauTypeColumn } from "../../TableauTypeColumn";
import { getIdentifiantsDeLaPageCourante } from "../ColonneElementsUtils";
import { getConteneurAvecElement, IConteneurElementPropsPartielles } from "../ConteneurElement";
import { IBaseColonneElementsParams } from "../IColonneElementsParams";
import { CelluleCaseACocher, ICelluleCaseACocherProps } from "./CelluleCaseACocher";
import { CelluleEnteteCaseACocher } from "./CelluleEnteteCaseACocher";

export type IColonneCaseACocherParams<TData, TIdentifiant> = IBaseColonneElementsParams<TData, TIdentifiant>;

export const getColonneCasesACocher = <TData, TIdentifiant, TEvenement extends React.ChangeEvent<HTMLInputElement>>(
  colonneCaseACocherParams: IColonneCaseACocherParams<TData, TIdentifiant>,
  caseACocherProps?: ICelluleCaseACocherProps,
  conteneurPropsPartielles?: IConteneurElementPropsPartielles<TData, TIdentifiant, TEvenement>
): TableauTypeColumn => {
  const handleChangeEnteteCaseACocher = (event: React.ChangeEvent<HTMLInputElement>, datasDeLaPageCourante: TData[]): void => {
    colonneCaseACocherParams.setIdentifiantsSelectionnes(
      event.target.checked
        ? getIdentifiantsDeLaPageCourante(
            datasDeLaPageCourante,
            colonneCaseACocherParams.getIdentifiant,
            conteneurPropsPartielles?.handleEstDesactive
          )
        : []
    );
  };

  const handleChangeCaseACocher = (event: TEvenement, data: TData, cle?: string): void => {
    const identifiant: TIdentifiant = colonneCaseACocherParams.getIdentifiant(data);
    let selection: TIdentifiant[] = [...colonneCaseACocherParams.identifiantsSelectionnes];

    if (event.target.checked) {
      selection.push(identifiant);
    } else {
      selection = selection.filter(idCourant => idCourant !== identifiant);
    }
    colonneCaseACocherParams.setIdentifiantsSelectionnes(selection);

    conteneurPropsPartielles?.handleInteractionUtilisateur && conteneurPropsPartielles.handleInteractionUtilisateur(event, data, cle);
  };

  const handleEstSelectionne = (data: TData): boolean => {
    return colonneCaseACocherParams.identifiantsSelectionnes.includes(colonneCaseACocherParams.getIdentifiant(data));
  };

  const getTitle = (datasDeLaPageCourante: TData[]): JSX.Element => {
    return colonneCaseACocherParams.contientHeader && datasDeLaPageCourante.length > 0 ? (
      <CelluleEnteteCaseACocher<TIdentifiant>
        {...caseACocherProps}
        identifiantsSelectionnes={colonneCaseACocherParams.identifiantsSelectionnes}
        identifiantsDeLaPage={getIdentifiantsDeLaPageCourante(
          datasDeLaPageCourante,
          colonneCaseACocherParams.getIdentifiant,
          conteneurPropsPartielles?.handleEstDesactive
        )}
        handleChange={e => handleChangeEnteteCaseACocher(e, datasDeLaPageCourante)}
      />
    ) : (
      <></>
    );
  };

  const getElement = getConteneurAvecElement.bind<
    null,
    IConteneurElementPropsPartielles<TData, TIdentifiant, TEvenement>,
    (data: TData) => TIdentifiant,
    (data: TData) => boolean,
    (data: TData) => React.ReactElement<ICelluleCaseACocherProps>,
    [TData],
    JSX.Element
  >(
    null,
    {
      ...conteneurPropsPartielles,
      handleEstSelectionne,
      handleInteractionUtilisateur: handleChangeCaseACocher
    },
    colonneCaseACocherParams.getIdentifiant,
    colonneCaseACocherParams.filtreAffichageElement ?? ((data: TData) => true),
    colonneCaseACocherParams.getElement ?? ((data: TData) => <CelluleCaseACocher<TData, TIdentifiant> {...caseACocherProps} />)
  );

  colonneCaseACocherParams.style = {
    ...colonneCaseACocherParams.style,
    width: conteneurPropsPartielles?.handleAfficheAvertissement || conteneurPropsPartielles?.handleEstDesactive ? "4rem" : "2rem"
  };

  return new TableauTypeColumn({
    keys: ["checkbox"],
    align: "left",
    getTitle,
    getElement,
    style: colonneCaseACocherParams.style
  });
};
