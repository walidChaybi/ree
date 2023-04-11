import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { RolePersonneSauvegardee } from "@model/requete/enum/RolePersonneSauvegardee";
import { getLibelle } from "@util/Utils";
import { ICelluleBoutonMenuProps } from "@widget/tableau/TableauRece/colonneElements/boutonMenu/CelluleBoutonMenu";
import { IColonneBoutonMenuParams } from "@widget/tableau/TableauRece/colonneElements/boutonMenu/ColonneBoutonMenu";
import { IConteneurElementPropsPartielles } from "@widget/tableau/TableauRece/colonneElements/ConteneurElement";
import { TMouseEventSurHTMLButtonElement } from "@widget/tableau/TableauRece/colonneElements/IColonneElementsParams";
import {
  NB_LIGNES_PAR_APPEL_PERSONNE,
  NB_LIGNES_PAR_PAGE_PERSONNE
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
import React from "react";
import {
  DataTableauRMCPersonne,
  IDataTableauRMCPersonne
} from "../../requeteCreation/commun/composants/ongletRMCPersonne/IDataTableauRMCPersonne";
import "./scss/TableauRMCPersonne.scss";
import {
  getColonnesTableauRMCAutoPersonne,
  getLigneTableauVide
} from "./TableauRMCPersonneUtils";

interface TableauRMCPersonneProps {
  dataTableauRMCPersonne: IDataTableauRMCPersonne[];
  identifiantsPersonnesSelectionnees: string[];
  getIdentifiantPersonne: (data: IDataTableauRMCPersonne) => string;
  onClickBoutonAjouterPersonne: (
    event: TMouseEventSurHTMLButtonElement,
    data: IDataTableauRMCPersonne,
    cle?: string
  ) => void;
  natureActeRequete: NatureActeRequete;
}

export const TableauRMCPersonne: React.FC<TableauRMCPersonneProps> = props => {
  function getLigneClassName(data: IDataTableauRMCPersonne): string {
    return DataTableauRMCPersonne.estPersonne(data)
      ? "lignePersonne"
      : DataTableauRMCPersonne.estStatutAnnuleOuInactif(data)
      ? "ligneAnnuleInactif"
      : DataTableauRMCPersonne.estActe(data)
      ? "ligneActe"
      : "ligneRcRcaPacs";
  }

  const colonneBoutonAjouterPersonneParams: IColonneBoutonMenuParams<
    IDataTableauRMCPersonne,
    string
  > = {
    getIdentifiant: props.getIdentifiantPersonne,
    filtreAffichageElement: (data: IDataTableauRMCPersonne) =>
      data.idPersonne !== ""
  };

  const conteneurBoutonAjouterPersonneProps: IConteneurElementPropsPartielles<
    IDataTableauRMCPersonne,
    string,
    TMouseEventSurHTMLButtonElement
  > = {
    handleInteractionUtilisateur: props.onClickBoutonAjouterPersonne,
    handleEstDesactive: (data: IDataTableauRMCPersonne) =>
      props.identifiantsPersonnesSelectionnees.includes(
        props.getIdentifiantPersonne(data)
      )
  };

  const boutonMenuAjouterPersonneProps: ICelluleBoutonMenuProps = {
    boutonLibelle: getLibelle("+"),
    listeItems:
      RolePersonneSauvegardee.getRolesPersonnesSauvegardeesEnFonctionNatureActeRequete(
        props.natureActeRequete
      ).map(roleCourant => ({
        key: roleCourant.nom,
        libelle: roleCourant.libelle
      })),
    titreBouton: getLibelle("Ajouter cette personne au projet"),
    anchorOrigin: { vertical: "top", horizontal: "left" },
    transformOrigin: { vertical: "top", horizontal: "right" },
    openOnMouseClick: true
  };

  const columnHeaders: TableauTypeColumn[] = getColonnesTableauRMCAutoPersonne(
    colonneBoutonAjouterPersonneParams,
    conteneurBoutonAjouterPersonneProps,
    boutonMenuAjouterPersonneProps
  );

  return (
    <div className="resultatsRMCPersonne">
      {
        <TableauRece
          idKey="idPersonneOuActeInscriptionLie"
          columnHeaders={columnHeaders}
          dataState={props.dataTableauRMCPersonne}
          paramsTableau={{}}
          onClickOnLine={() => {}}
          nbLignesParPage={NB_LIGNES_PAR_PAGE_PERSONNE}
          nbLignesParAppel={NB_LIGNES_PAR_APPEL_PERSONNE}
          noRows={getLigneTableauVide(
            getLibelle("Aucun résultat trouvé pour ces critères de recherche.")
          )}
          getRowClassName={getLigneClassName}
          stickyHeader={true}
        />
      }
    </div>
  );
};
