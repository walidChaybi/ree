import { getColonnesTableauPersonnes, getLigneTableauVide } from "@pages/rechercheMultiCriteres/personne/TableauRMCPersonneUtils";
import { getLibelle } from "@util/Utils";
import { NB_LIGNES_PAR_APPEL_PERSONNE, NB_LIGNES_PAR_PAGE_PERSONNE } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
import { IConteneurElementPropsPartielles } from "@widget/tableau/TableauRece/colonneElements/ConteneurElement";
import { TMouseEventSurSVGSVGElement } from "@widget/tableau/TableauRece/colonneElements/IColonneElementsParams";
import {
  IColonneFontAwesomeIcone,
  getColonneFontAwesomeIcone
} from "@widget/tableau/TableauRece/colonneElements/fontAwesomeIcon/ColonneFontAwesomeIcone";
import React from "react";
import { IDataTableauPersonneSelectionnee } from "./IDataTableauPersonneSelectionne";

interface ITableauPersonnesSelectionneesProps {
  dataPersonnesSelectionnees: IDataTableauPersonneSelectionnee[];
  onClickBoutonRetirerPersonne: (
    event: TMouseEventSurSVGSVGElement,
    data: IDataTableauPersonneSelectionnee,
    cle?: string | undefined
  ) => void;
  enChargement: boolean;
}

export const TableauPersonnesSelectionnees: React.FC<ITableauPersonnesSelectionneesProps> = props => {
  const colonneIconeRetirerPersonneParams: IColonneFontAwesomeIcone<IDataTableauPersonneSelectionnee, string> = {
    getIdentifiant: data => data.idPersonne,
    style: {
      width: "3rem"
    }
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
    getColonneFontAwesomeIcone(colonneIconeRetirerPersonneParams, conteneurIconeRetirerPersonneProps)
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
        messageAucunResultat={getLigneTableauVide("Aucune personne sélectionnée pour le projet.")}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_PERSONNE}
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_PERSONNE}
      />
    </div>
  );
};
