import { cleanup, fireEvent, render } from "@testing-library/react";
import { TableauHeader } from "@widget/tableau/TableauRece/TableauHeader";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
import React from "react";

const UN = 1;
const DEUX = 2;

test("renders click sur header tableau des requêtes de l'application", () => {
  const handleRequestSort = jest.fn();
  const { getByText } = render(
    <table>
      <TableauHeader
        onRequestSort={handleRequestSort}
        order="ASC"
        orderBy="idSagaDila"
        columnHeaders={[
          new TableauTypeColumn({
            keys: ["idSagaDila"],
            title: "N°",
            sortable: true
          }),
          new TableauTypeColumn({
            keys: ["sousTypeRequete"],
            title: "sousTypeRequete"
          }),
          new TableauTypeColumn({
            keys: ["provenance"],
            title: "provenance"
          }),
          new TableauTypeColumn({
            keys: ["natureActe"],
            title: "natureActe"
          }),
          new TableauTypeColumn({
            keys: ["requerant", "nomOuRaisonSociale"],
            title: "requerant"
          }),
          new TableauTypeColumn({
            keys: ["dateCreation"],
            title: "dateCreation"
          }),
          new TableauTypeColumn({
            keys: ["dateStatut"],
            title: "dateStatut"
          }),
          new TableauTypeColumn({
            keys: ["statut"],
            title: "statut"
          }),
          new TableauTypeColumn({
            keys: ["prioriteRequete"],
            title: "prioriteRequete"
          })
        ]}
        dataBody={[]}
      ></TableauHeader>
    </table>
  );
  const colonneElement = getByText(/N°/i);
  fireEvent.click(colonneElement);
  expect(handleRequestSort).toHaveBeenCalledTimes(UN);

  expect(handleRequestSort).not.toHaveBeenCalledTimes(DEUX);
});

afterEach(cleanup);
