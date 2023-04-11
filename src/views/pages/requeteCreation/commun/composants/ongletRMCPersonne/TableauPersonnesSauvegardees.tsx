import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import {
  getColonnesTableauPersonnes,
  getLigneTableauVide
} from "@pages/rechercheMultiCriteres/personne/TableauRMCPersonneUtils";
import { getLibelle } from "@util/Utils";
import { IConteneurElementPropsPartielles } from "@widget/tableau/TableauRece/colonneElements/ConteneurElement";
import { ICelluleFontAwesomeIconeProps } from "@widget/tableau/TableauRece/colonneElements/fontAwesomeIcon/CelluleFontAwesomeIcone";
import {
  getColonneFontAwesomeIcone,
  IColonneFontAwesomeIcone
} from "@widget/tableau/TableauRece/colonneElements/fontAwesomeIcon/ColonneFontAwesomeIcone";
import { TMouseEventSurSVGSVGElement } from "@widget/tableau/TableauRece/colonneElements/IColonneElementsParams";
import {
  NB_LIGNES_PAR_APPEL_PERSONNE,
  NB_LIGNES_PAR_PAGE_PERSONNE
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
import React from "react";
import { IDataTableauPersonneSelectionnee } from "./IDataTableauPersonneSauvegardee";

interface ITableauPersonnesSelectionneesProps {
  getIdentifiantPersonne: (data: IDataTableauPersonneSelectionnee) => string;
  dataPersonnesSelectionnees: IDataTableauPersonneSelectionnee[];
  onClickBoutonRetirerPersonne: (
    event: TMouseEventSurSVGSVGElement,
    data: IDataTableauPersonneSelectionnee,
    cle?: string | undefined
  ) => void;
}

export const TableauPersonnesSelectionnees: React.FC<
  ITableauPersonnesSelectionneesProps
> = props => {
  const colonneIconeRetirerPersonneParams: IColonneFontAwesomeIcone<
    IDataTableauPersonneSelectionnee,
    string
  > = {
    getIdentifiant: props.getIdentifiantPersonne,
    style: {
      width: "3rem"
    }
  };

  const iconeRetirerPersonneProps: ICelluleFontAwesomeIconeProps = {
    icon: faTrashAlt,
    title: getLibelle("Retirer cette personne du projet"),
    size: "lg",
    className: "IconePoubelle"
  };

  const conteneurIconeRetirerPersonneProps: IConteneurElementPropsPartielles<
    IDataTableauPersonneSelectionnee,
    string,
    TMouseEventSurSVGSVGElement
  > = {
    handleInteractionUtilisateur: props.onClickBoutonRetirerPersonne
  };

  const columnHeaderTableauPersonnes: TableauTypeColumn[] = [
    ...getColonnesTableauPersonnes(),
    getColonneFontAwesomeIcone(
      colonneIconeRetirerPersonneParams,
      iconeRetirerPersonneProps,
      conteneurIconeRetirerPersonneProps
    )
  ];

  return (
    <div className="PersonnesSelectionneesProjet">
      <div className="sousTitre">
        <span>{getLibelle("Personnes sélectionnées pour le projet")}</span>
      </div>
      <TableauRece
        idKey={"idPersonne"}
        columnHeaders={columnHeaderTableauPersonnes}
        dataState={props.dataPersonnesSelectionnees}
        paramsTableau={{}}
        onClickOnLine={() => {}}
        noRows={getLigneTableauVide(
          getLibelle("Aucune personne sélectionnée pour le projet.")
        )}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_PERSONNE}
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_PERSONNE}
      />
    </div>
  );
};
