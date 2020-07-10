import React from "react";
import { TableauBody } from "../../../common/widget/tableau/TableauBody";
import { TableauTypeColumn } from "../../../common/widget/tableau/TableauRece";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import moment from "moment";
import { FormatDate } from "../../../../ressources/FormatDate";
import {
  prioriteDeLaRequete,
  getMessagePrioriteDeLaRequete
} from "../RequetesUtils";
import LabelIcon from "@material-ui/icons/Label";
import { Box } from "@material-ui/core";

const DONNEES = [
  {
    idSagaDila: 100,
    sousTypeRequete: "DELIVRANCE_COURRIER",
    provenance: "DILA",
    natureActe: "NAISSANCE",
    requerant: "TRIBUNAL NANTES",
    dateCreation: "20/02/2020",
    dateStatut: moment()
      .subtract(3, "day")
      .format(FormatDate.DDMMYYYY),
    statut: "A_SIGNER",
    prioriteRequete: ""
  },
  {
    idSagaDila: 101,
    sousTypeRequete: "DELIVRANCE_COURRIER",
    provenance: "DILA",
    natureActe: "NAISSANCE",
    requerant: "TRIBUNAL NANTES",
    dateCreation: "20/02/2020",
    dateStatut: moment().format(FormatDate.DDMMYYYY),
    statut: "A_SIGNER",
    prioriteRequete: ""
  },
  {
    idSagaDila: 102,
    sousTypeRequete: "DELIVRANCE_COURRIER",
    provenance: "DILA",
    natureActe: "NAISSANCE",
    requerant: "TRIBUNAL NANTES",
    dateCreation: "15/02/2020",
    dateStatut: moment()
      .subtract(6, "day")
      .format(FormatDate.DDMMYYYY),
    statut: "A_SIGNER",
    prioriteRequete: ""
  }
];

test("test des prioritées des requêtes", () => {
  const { getByTestId } = render(
    <>
      <Router>
        <TableauBody
          data={DONNEES}
          idKey={"idRequete"}
          columnHeaders={[
            new TableauTypeColumn(
              ["idSagaDila"],
              false,
              "pages.delivrance.mesRequetes.tableau.header"
            ),
            new TableauTypeColumn(
              ["sousTypeRequete"],
              true,
              "pages.delivrance.mesRequetes.tableau.header",
              "referentiel.sousTypeRequete"
            ),
            new TableauTypeColumn(
              ["provenance"],
              true,
              "pages.delivrance.mesRequetes.tableau.header",
              "referentiel.provenance"
            ),
            new TableauTypeColumn(
              ["natureActe"],
              true,
              "pages.delivrance.mesRequetes.tableau.header",
              "referentiel.natureActe"
            ),
            new TableauTypeColumn(
              ["requerant", "nomOuRaisonSociale"],
              false,
              "pages.delivrance.mesRequetes.tableau.header"
            ),
            new TableauTypeColumn(
              ["dateCreation"],
              false,
              "pages.delivrance.mesRequetes.tableau.header"
            ),
            new TableauTypeColumn(
              ["dateStatut"],
              false,
              "pages.delivrance.mesRequetes.tableau.header"
            ),
            new TableauTypeColumn(
              ["statut"],
              true,
              "pages.delivrance.mesRequetes.tableau.header",
              "referentiel.statutRequete"
            ),
            new TableauTypeColumn(
              ["prioriteRequete"],
              false,
              "pages.delivrance.mesRequetes.tableau.header",
              "",
              (row: any) => {
                return (
                  <Box
                    title={getMessagePrioriteDeLaRequete(row.dateStatut)}
                    aria-label={getMessagePrioriteDeLaRequete(row.dateStatut)}
                    aria-hidden={true}
                  >
                    <LabelIcon
                      className={prioriteDeLaRequete(row.dateStatut)}
                    />
                  </Box>
                );
              }
            )
          ]}
          onClickOnLine={(identifiant: string) => "urlBack"}
        ></TableauBody>
      </Router>
    </>
  );
  let colonnePrioriteElement = getByTestId("100");
  let element = (colonnePrioriteElement.lastChild as HTMLTableCellElement)
    .innerHTML;
  expect(element.indexOf("Priorité moyenne")).toBeGreaterThan(-1);
  colonnePrioriteElement = getByTestId("101");
  element = (colonnePrioriteElement.lastChild as HTMLTableCellElement)
    .innerHTML;
  expect(element.indexOf("Priorité basse")).toBeGreaterThan(-1);
  colonnePrioriteElement = getByTestId("102");
  element = (colonnePrioriteElement.lastChild as HTMLTableCellElement)
    .innerHTML;
  expect(element.indexOf("Priorité haute")).toBeGreaterThan(-1);
});
