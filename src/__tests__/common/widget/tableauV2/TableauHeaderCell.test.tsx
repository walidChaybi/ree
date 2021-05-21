import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { TableauHeaderCell } from "../../../../views/common/widget/tableau/v2/TableauHeaderCell";
import { TableauTypeColumn } from "../../../../views/common/widget/tableau/v2/TableauTypeColumn";

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
                title: "N°"
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
