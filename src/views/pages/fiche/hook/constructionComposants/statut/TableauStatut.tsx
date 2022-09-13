import { IStatutFiche } from "@model/etatcivil/fiche/IStatutFiche";
import {
  getDateFromTimestamp,
  getDateString,
  getDateStringFromDateCompose
} from "@util/DateUtils";
import { getLibelle } from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import {
  TableauSimple,
  TableauSimpleProps
} from "@widget/tableau/TableauSimple/TableauSimple";
import { processDataStorting } from "@widget/tableau/TableUtils";
import React from "react";
import "./scss/TableauStatut.scss";
interface TableauStatutProps {
  statutsFiche: IStatutFiche[];
}

export const TableauStatut: React.FC<TableauStatutProps> = ({
  statutsFiche
}) => {
  return (
    <div className="TableauStatut">
      {statutsFiche.length > 0 && getTableauStatut(statutsFiche)}
    </div>
  );
};

/** Construction du tableau des pièces jointes */
function getTableauStatut(statuts: IStatutFiche[]): JSX.Element {
  const tableauSimpleProps: TableauSimpleProps = {
    entetes: [
      { className: "EnteteStatut", libelle: getLibelle("Statut") },
      { className: "EnteteDateStatut", libelle: getLibelle("Date statut") },
      {
        className: "EnteteDateEvenement",
        libelle: getLibelle("Date événement")
      },
      { className: "EnteteMotif", libelle: getLibelle("Motif") },
      { className: "EnteteLieu", libelle: getLibelle("Lieu") },
      {
        className: "EnteteComplementMotif",
        libelle: getLibelle("Complément motif")
      }
    ],
    lignes: processDataStorting(statuts, "DESC", "dateStatut").map(statut => ({
      key: statut.statut,
      colonnes: [
        {
          contenu: statut.statut
        },
        {
          contenu: getColonneDateStatut(statut)
        },
        {
          contenu: getColonneDateEvenement(statut)
        },
        {
          contenu: statut.motif ? statut.motif : ""
        },
        {
          contenu: getColonneLieu(statut)
        },
        {
          contenu: statut.complementMotif ? statut.complementMotif : ""
        }
      ]
    }))
  };
  return <TableauSimple {...tableauSimpleProps} />;
}

function getColonneDateStatut(statut: IStatutFiche): string | JSX.Element {
  return getDateString(getDateFromTimestamp(statut.dateStatut));
}

function getColonneDateEvenement(statut: IStatutFiche): string | JSX.Element {
  return statut.statutFicheEvenement
    ? getDateStringFromDateCompose(statut.statutFicheEvenement.date)
    : "";
}

function getColonneLieu(statut: IStatutFiche): string | JSX.Element {
  return statut.statutFicheEvenement
    ? LieuxUtils.getLieu(
        statut.statutFicheEvenement.ville,
        statut.statutFicheEvenement.region,
        statut.statutFicheEvenement.pays
      )
    : "";
}
