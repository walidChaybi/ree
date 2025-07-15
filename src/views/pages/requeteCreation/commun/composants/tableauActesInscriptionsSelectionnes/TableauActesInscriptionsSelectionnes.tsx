import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import {
  getColonnesTableauDocuments,
  getColonnesTableauPersonnes,
  getLigneTableauVide
} from "@pages/rechercheMultiCriteres/personne/TableauRMCPersonneUtils";
import { DEUX, UN, ZERO, getLibelle } from "@util/Utils";
import { NB_LIGNES_PAR_APPEL_PERSONNE, NB_LIGNES_PAR_PAGE_PERSONNE } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
import { IConteneurElementPropsPartielles } from "@widget/tableau/TableauRece/colonneElements/ConteneurElement";
import { TMouseEventSurSVGSVGElement } from "@widget/tableau/TableauRece/colonneElements/IColonneElementsParams";
import { ICelluleFontAwesomeIconeProps } from "@widget/tableau/TableauRece/colonneElements/fontAwesomeIcon/CelluleFontAwesomeIcone";
import {
  IColonneFontAwesomeIcone,
  getColonneFontAwesomeIcone
} from "@widget/tableau/TableauRece/colonneElements/fontAwesomeIcon/ColonneFontAwesomeIcone";
import React from "react";
import PageChargeur from "../../../../../../composants/commun/chargeurs/PageChargeur";
import { IDataTableauActeInscriptionSelectionne } from "./IDataTableauActeInscriptionSelectionne";

interface ITableauActesInscriptionsSelectionnesProps {
  dataActesInscriptionsSelectionnes: IDataTableauActeInscriptionSelectionne[];
  onClickBoutonRetirerActeInscription: (
    event: TMouseEventSurSVGSVGElement,
    data: IDataTableauActeInscriptionSelectionne,
    cle?: string | undefined
  ) => void;
  enChargement: boolean;
}

export const TableauActesInscriptionsSelectionnes: React.FC<ITableauActesInscriptionsSelectionnesProps> = props => {
  const colonneIconeRetirerActeInscriptionParams: IColonneFontAwesomeIcone<IDataTableauActeInscriptionSelectionne, string> = {
    getIdentifiant: data => data.idActeInscription,
    style: {
      width: "3rem"
    }
  };

  const iconeRetirerActeInscriptionProps: ICelluleFontAwesomeIconeProps = {
    icon: faTrashAlt,
    title: getLibelle("Retirer cet acte ou inscription du projet"),
    size: "lg",
    className: "IconePoubelle"
  };

  const conteneurIconeRetirerActeInscriptionProps: IConteneurElementPropsPartielles<
    IDataTableauActeInscriptionSelectionne,
    string,
    TMouseEventSurSVGSVGElement
  > = {
    handleInteractionUtilisateur: props.onClickBoutonRetirerActeInscription
  };

  const columnHeaderTableauActesInscriptionsSelectionnes: TableauTypeColumn[] = [
    ...getColonnesTableauPersonnes().slice(ZERO, -UN),
    ...getColonnesTableauDocuments().slice(ZERO, DEUX),
    ...getColonnesTableauDocuments().splice(-UN, UN),
    getColonneFontAwesomeIcone(
      colonneIconeRetirerActeInscriptionParams,
      iconeRetirerActeInscriptionProps,
      conteneurIconeRetirerActeInscriptionProps
    )
  ];

  return (
    <div className="ActesInscriptionsSelectionnesProjet">
      <div className="sousTitre">
        <span>{getLibelle("Actes et inscriptions sélectionnés pour le projet")}</span>
      </div>
      {props.enChargement ? (
        <PageChargeur />
      ) : (
        <TableauRece
          idKey={"idActeInscription"}
          columnHeaders={columnHeaderTableauActesInscriptionsSelectionnes}
          dataState={props.dataActesInscriptionsSelectionnes}
          paramsTableau={{}}
          onClickOnLine={() => {}}
          noRows={getLigneTableauVide("Aucun acte ou inscription sélectionné pour le projet.")}
          nbLignesParPage={NB_LIGNES_PAR_PAGE_PERSONNE}
          nbLignesParAppel={NB_LIGNES_PAR_APPEL_PERSONNE}
        />
      )}
    </div>
  );
};
