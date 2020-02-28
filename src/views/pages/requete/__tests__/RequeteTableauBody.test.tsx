import React from "react";
import * as renderer from "react-test-renderer";
import { RequeteTableauBody } from "../RequeteTableauBody";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";

const DONNEES = [
  {
    idSagaDila: 100,
    sousTypeRequete: "DELIVRANCE_COURRIER",
    provenance: "DILA",
    natureActe: "NAISSANCE",
    requerant: "TRIBUNAL NANTES",
    dateCreation: "20/02/2020",
    dateStatut: "25/02/2020",
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
    dateStatut: "27/02/2020",
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
    dateStatut: "18/02/2020",
    statut: "A_SIGNER",
    prioriteRequete: ""
  }
];

test("renders body tableau des requêtes de l'application", () => {
  const component = renderer.create(
    <>
      <Router>
        <RequeteTableauBody data={DONNEES}></RequeteTableauBody>
      </Router>
    </>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test("test des prioritées des requêtes", () => {
  const { getByTestId } = render(
    <>
      <Router>
        <RequeteTableauBody data={DONNEES}></RequeteTableauBody>
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
