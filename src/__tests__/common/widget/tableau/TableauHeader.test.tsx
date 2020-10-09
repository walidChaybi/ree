import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react";
import * as renderer from "react-test-renderer";
import { TableauHeader } from "../../../../views/common/widget/tableau/TableauHeader";
import { TableauTypeColumn } from "../../../../views/common/widget/tableau/TableauRece";

test("renders header tableau des requêtes de l'application", () => {
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: any
  ) => {};
  const component = renderer.create(
    <>
      <TableauHeader
        onRequestSort={handleRequestSort}
        order="ASC"
        orderBy="idSagaDila"
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
            ""
          )
        ]}
      ></TableauHeader>
    </>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test("renders click sur header tableau des requêtes de l'application", () => {
  const handleRequestSort = jest.fn();
  const { getByText } = render(
    <>
      <TableauHeader
        onRequestSort={handleRequestSort}
        order="ASC"
        orderBy="idSagaDila"
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
            ""
          )
        ]}
      ></TableauHeader>
    </>
  );
  const colonneElement = getByText(/N°/i);
  fireEvent.click(colonneElement);
  expect(handleRequestSort).toHaveBeenCalledTimes(1);
  expect(handleRequestSort).not.toHaveBeenCalledTimes(2);
});

afterEach(cleanup);
