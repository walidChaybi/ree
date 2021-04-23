import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react";
import * as renderer from "react-test-renderer";
import { TableauHeader } from "../../../../views/common/widget/tableau/TableauHeader";
import { TableauTypeColumn } from "../../../../views/common/widget/tableau/TableauRece";

const UN = 1;
const DEUX = 2;

test("renders header tableau des requêtes de l'application", () => {
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: any
  ) => {};
  const component = renderer.create(
    <table>
      <TableauHeader
        onRequestSort={handleRequestSort}
        order="ASC"
        orderBy="idSagaDila"
        columnHeaders={[
          new TableauTypeColumn({
            keys: ["idSagaDila"],
            title: "pages.delivrance.mesRequetes.tableau.header.idSagaDila"
          }),
          new TableauTypeColumn({
            keys: ["sousTypeRequete"],
            title:
              "pages.delivrance.mesRequetes.tableau.header.sousTypeRequete",
            rowLibelle: "referentiel.sousTypeRequete"
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
            keys: ["requerant", "nomOuRaisonSociale"],
            title: "pages.delivrance.mesRequetes.tableau.header.requerant"
          }),
          new TableauTypeColumn({
            keys: ["dateCreation"],
            title: "pages.delivrance.mesRequetes.tableau.header.dateCreation"
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
            title: "pages.delivrance.mesRequetes.tableau.header.prioriteRequete"
          })
        ]}
      ></TableauHeader>
    </table>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

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
            title: "pages.delivrance.mesRequetes.tableau.header.idSagaDila"
          }),
          new TableauTypeColumn({
            keys: ["sousTypeRequete"],
            title:
              "pages.delivrance.mesRequetes.tableau.header.sousTypeRequete",
            rowLibelle: "referentiel.sousTypeRequete"
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
            keys: ["requerant", "nomOuRaisonSociale"],
            title: "pages.delivrance.mesRequetes.tableau.header.requerant"
          }),
          new TableauTypeColumn({
            keys: ["dateCreation"],
            title: "pages.delivrance.mesRequetes.tableau.header.dateCreation"
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
            title: "pages.delivrance.mesRequetes.tableau.header.prioriteRequete"
          })
        ]}
      ></TableauHeader>
    </table>
  );
  const colonneElement = getByText(/N°/i);
  fireEvent.click(colonneElement);
  expect(handleRequestSort).toHaveBeenCalledTimes(UN);

  expect(handleRequestSort).not.toHaveBeenCalledTimes(DEUX);
});

afterEach(cleanup);
