import React from "react";
import { TableauBody } from "../../../../views/common/widget/tableau/TableauBody";
import { TableauTypeColumn } from "../../../../views/common/widget/tableau/TableauRece";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import moment from "moment";
import { FormatDate } from "../../../../views/common/util/DateUtils";
import LabelIcon from "@material-ui/icons/Label";
import { Box } from "@material-ui/core";
import {
  getMessagePrioriteDeLaRequete,
  prioriteDeLaRequete
} from "../../../../views/common/util/RequetesUtils";

const subData = {
  sousTypeRequete: "RDC",
  provenance: "DILA",
  natureActe: "NAISSANCE",
  requerant: "TRIBUNAL NANTES"
};

const SIX = 6;
const TROIS = 3;
const DONNEES = [
  {
    idRequete: 100,
    idSagaDila: 100,
    ...subData,
    dateCreation: "20/02/2020",
    dateStatut: moment().subtract(TROIS, "day").format(FormatDate.DDMMYYYY),
    statut: "A_SIGNER",
    prioriteRequete: ""
  },
  {
    idRequete: 101,
    idSagaDila: 101,
    ...subData,
    dateCreation: "20/02/2020",
    dateStatut: moment().format(FormatDate.DDMMYYYY),
    statut: "A_SIGNER",
    prioriteRequete: ""
  },
  {
    idRequete: 102,
    idSagaDila: 102,
    ...subData,
    dateCreation: "15/02/2020",
    dateStatut: moment().subtract(SIX, "day").format(FormatDate.DDMMYYYY),
    statut: "A_SIGNER",
    prioriteRequete: ""
  }
];

test("test des prioritées des requêtes", () => {
  const renderResult = render(
    <>
      <Router>
        <table>
          <TableauBody
            data={DONNEES}
            idKey={"idRequete"}
            columnHeaders={[
              new TableauTypeColumn({
                keys: ["idSagaDila"],
                title: "pages.delivrance.mesRequetes.tableau.header.idSagaDila"
              }),
              new TableauTypeColumn({
                keys: ["sousTypeRequete"],
                title:
                  "pages.delivrance.mesRequetes.tableau.header.sousTypeRequete",
                rowLibelle: "referentiel.sousTypeRequete.court"
              }),
              new TableauTypeColumn({
                keys: ["provenance"],
                title: "pages.delivrance.mesRequetes.tableau.header.provenance",
                rowLibelle: "referentiel.provenance"
              }),
              new TableauTypeColumn({
                keys: ["natureActe"],
                title: "pages.delivrance.mesRequetes.tableau.header.natureActe",
                rowLibelle: "referentiel.natureActe"
              }),
              new TableauTypeColumn({
                keys: ["requerant", "libelleRequerant"],

                title: "pages.delivrance.mesRequetes.tableau.header.requerant"
              }),
              new TableauTypeColumn({
                keys: ["dateCreation"],

                title:
                  "pages.delivrance.mesRequetes.tableau.header.dateCreation"
              }),
              new TableauTypeColumn({
                keys: ["dateStatut"],

                title: "pages.delivrance.mesRequetes.tableau.header.dateStatut"
              }),
              new TableauTypeColumn({
                keys: ["statut"],
                title: "pages.delivrance.mesRequetes.tableau.header.statut",
                rowLibelle: "referentiel.statutRequete"
              }),
              new TableauTypeColumn({
                keys: ["prioriteRequete"],

                title: "pages.delivrance.mesRequetes.tableau.header",
                getElement: (row: any) => {
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
              })
            ]}
            onClickOnLine={(identifiant: string) => "urlBack"}
          ></TableauBody>
        </table>
      </Router>
    </>
  );
  let colonnePrioriteElement = renderResult.getByTestId("100");
  let element = (colonnePrioriteElement.lastChild as HTMLTableCellElement)
    .innerHTML;
  expect(element.indexOf("Priorité moyenne")).toBeGreaterThan(-1);
  colonnePrioriteElement = renderResult.getByTestId("101");
  element = (colonnePrioriteElement.lastChild as HTMLTableCellElement)
    .innerHTML;
  expect(element.indexOf("Priorité basse")).toBeGreaterThan(-1);
  colonnePrioriteElement = renderResult.getByTestId("102");
  element = (colonnePrioriteElement.lastChild as HTMLTableCellElement)
    .innerHTML;
  expect(element.indexOf("Priorité haute")).toBeGreaterThan(-1);
});
