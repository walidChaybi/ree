import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { TableauHeaderCell } from "@widget/tableau/TableauRece/TableauHeaderCell";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";

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
