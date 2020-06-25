import React from "react";
import { RequeteTableauBody } from "../RequeteTableauBody";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import moment from "moment";
import { FormatDate } from "../../../../ressources/FormatDate";

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
  render(
    <>
      <Router>
        <RequeteTableauBody data={DONNEES}></RequeteTableauBody>
      </Router>
    </>
  );
  let colonnePrioriteElement = screen.getByTestId("100");
  let element = (colonnePrioriteElement.lastChild as HTMLTableCellElement)
    .innerHTML;
  expect(element.indexOf("Priorité moyenne")).toBeGreaterThan(-1);
  colonnePrioriteElement = screen.getByTestId("101");
  element = (colonnePrioriteElement.lastChild as HTMLTableCellElement)
    .innerHTML;
  expect(element.indexOf("Priorité basse")).toBeGreaterThan(-1);
  colonnePrioriteElement = screen.getByTestId("102");
  element = (colonnePrioriteElement.lastChild as HTMLTableCellElement)
    .innerHTML;
  expect(element.indexOf("Priorité haute")).toBeGreaterThan(-1);
});
