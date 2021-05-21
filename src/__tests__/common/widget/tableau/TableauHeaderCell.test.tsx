import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import * as renderer from "react-test-renderer";
import { TableauHeaderCell } from "../../../../views/common/widget/tableau/v1/TableauHeaderCell";
import { TableauTypeColumn } from "../../../../views/common/widget/tableau/v1/TableauRece";

test("renders header tableau des requêtes de l'application", () => {
  const func = jest.fn();
  const component = renderer.create(
    <table>
      <TableauHeaderCell
        sortHandler={func}
        order="ASC"
        orderBy="idSagaDila"
        column={
          new TableauTypeColumn({
            keys: ["idSagaDila"],
            title: "pages.delivrance.mesRequetes.tableau.header.idSagaDila"
          })
        }
      />
    </table>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test("renders click sur header tableau des requêtes de l'application", () => {
  const handleRequestSort = jest.fn();
  const { getByText } = render(
    <table>
      <tbody>
        <tr>
          <TableauHeaderCell
            sortHandler={handleRequestSort}
            order="DESC"
            orderBy="idSagaDila"
            column={
              new TableauTypeColumn({
                keys: ["idSagaDila"],
                title: "pages.delivrance.mesRequetes.tableau.header.idSagaDila"
              })
            }
          />
        </tr>
      </tbody>
    </table>
  );
  const colonneElement = getByText(/N°/i);
  expect(colonneElement).toBeDefined();
  fireEvent.click(colonneElement);
  waitFor(() => {
    expect(handleRequestSort).toBeCalled();
  });
});

afterEach(cleanup);
