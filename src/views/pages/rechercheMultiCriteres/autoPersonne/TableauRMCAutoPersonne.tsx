import { IRMCAutoPersonneResultat } from "@model/rmc/personne/IRMCAutoPersonneResultat";
import {
  NB_LIGNES_PAR_APPEL_PERSONNE,
  NB_LIGNES_PAR_PAGE_PERSONNE
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
import React from "react";
import {
  colonnesTableauRMCAutoPersonne,
  getMessageAucunResultat
} from "./TableauRMCAutoPersonneUtils";

import "./scss/TableauRMCAutoPersonne.scss";

interface TableauRMCAutoPersonneProps {
  data: IRMCAutoPersonneResultat[];
}

export const TableauRMCAutoPersonne: React.FC<
  TableauRMCAutoPersonneProps
> = props => {
  // Tableau
  function getColonnesTableau(): TableauTypeColumn[] {
    return [...colonnesTableauRMCAutoPersonne];
  }

  function getLigneClassName(data: IRMCAutoPersonneResultat): string {
    return data.hasOwnProperty("idPersonne")
      ? "lignePersonne"
      : data.statut === "ANNULE" || data.statut === "INACTIF"
      ? "ligneAnnuleInactif"
      : data.categorieRepertoire === ""
      ? "ligneActe"
      : "ligneRcRcaPacs";
  }

  return (
    <div className="RMCAutoPersonne">
      {
        <>
          <TableauRece
            idKey="idPersonne"
            columnHeaders={getColonnesTableau()}
            dataState={props.data}
            paramsTableau={{}}
            onClickOnLine={function (value: string): void {
              throw new Error("Function not implemented.");
            }}
            nbLignesParPage={NB_LIGNES_PAR_PAGE_PERSONNE}
            nbLignesParAppel={NB_LIGNES_PAR_APPEL_PERSONNE}
            noRows={getMessageAucunResultat()}
            getRowClassName={getLigneClassName}
            stickyHeader={true}
          />
        </>
      }
    </div>
  );
};
