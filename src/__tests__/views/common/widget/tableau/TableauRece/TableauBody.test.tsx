import { render, screen } from "@testing-library/react";
import { RenderIconePrioriteRequeteRMC } from "@util/tableauRequete/TableauRequeteUtils";
import { TableauBody } from "@widget/tableau/TableauRece/TableauBody";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
import { BrowserRouter as Router } from "react-router";
import { expect, test } from "vitest";

const subData = {
  sousTypeRequete: "RDC",
  provenance: "DILA",
  natureActe: "NAISSANCE",
  requerant: "TRIBUNAL NANTES"
};

const DONNEES = [
  {
    idRequete: 100,
    idSagaDila: 100,
    ...subData,
    dateCreation: "20/02/2020",
    dateStatut: "25/06/2020",
    statut: "A_SIGNER",
    priorite: "MOYENNE"
  },
  {
    idRequete: 101,
    idSagaDila: 101,
    ...subData,
    dateCreation: "20/02/2020",
    dateStatut: "20/03/2020",
    statut: "A_SIGNER",
    priorite: "BASSE"
  },
  {
    idRequete: 102,
    idSagaDila: 102,
    ...subData,
    dateCreation: "15/02/2020",
    dateStatut: "15/03/2020",
    statut: "A_SIGNER",
    priorite: "HAUTE"
  }
];

test("test des prioritées des requêtes", () => {
  render(
    <>
      <Router>
        <table>
          <TableauBody
            data={DONNEES}
            idKey={"idRequete"}
            columnHeaders={[
              new TableauTypeColumn({
                keys: ["idSagaDila"],
                title: "idSagaDila"
              }),
              new TableauTypeColumn({
                keys: ["sousTypeRequete"],
                title: "Sous Type"
              }),
              new TableauTypeColumn({
                keys: ["provenance"],
                title: "Provenance"
              }),
              new TableauTypeColumn({
                keys: ["natureActe"],
                title: "Nature Acte"
              }),
              new TableauTypeColumn({
                keys: ["requerant", "libelleRequerant"],
                title: "Requerant"
              }),
              new TableauTypeColumn({
                keys: ["dateCreation"],
                title: "Date requête"
              }),
              new TableauTypeColumn({
                keys: ["dateStatut"],
                title: "Date Statut"
              }),
              new TableauTypeColumn({
                keys: ["statut"],
                title: "Statut"
              }),
              new TableauTypeColumn({
                keys: ["priorite"],
                title: "Priorité",
                getElement: RenderIconePrioriteRequeteRMC
              })
            ]}
            onClickOnLine={(identifiant: string) => "urlBack"}
          ></TableauBody>
        </table>
      </Router>
    </>
  );

  let colonnePrioriteElement = screen.getByTestId("100");

  let element = (colonnePrioriteElement.lastChild as HTMLTableCellElement).innerHTML;

  expect(element.indexOf("Priorité moyenne")).toBeGreaterThan(-1);

  colonnePrioriteElement = screen.getByTestId("101");

  element = (colonnePrioriteElement.lastChild as HTMLTableCellElement).innerHTML;

  expect(element.indexOf("Priorité basse")).toBeGreaterThan(-1);

  colonnePrioriteElement = screen.getByTestId("102");

  element = (colonnePrioriteElement.lastChild as HTMLTableCellElement).innerHTML;

  expect(element.indexOf("Priorité haute")).toBeGreaterThan(-1);
});
