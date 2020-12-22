import React from "react";
import { render } from "@testing-library/react";
import { TableauBodyCell } from "../../../../views/common/widget/tableau/TableauBodyCell";
import { TableauTypeColumn } from "../../../../views/common/widget/tableau/TableauRece";

test("test des prioritées des requêtes", () => {
  const func = jest.fn();
  const { getByText } = render(
    <table>
      <tbody>
        <tr>
          <TableauBodyCell
            data={"data"}
            formater={func}
            column={
              new TableauTypeColumn({
                keys: ["idSagaDila"],
                colLibelle:
                  "pages.delivrance.mesRequetes.tableau.header.idSagaDila"
              })
            }
          />
        </tr>
      </tbody>
    </table>
  );

  expect(func).toBeCalled();
});

test("test des prioritées des requêtes", () => {
  const { getByText } = render(
    <table>
      <tbody>
        <tr>
          <TableauBodyCell
            data={"data"}
            column={
              new TableauTypeColumn({
                keys: ["idSagaDila"],
                colLibelle:
                  "pages.delivrance.mesRequetes.tableau.header.idSagaDila"
              })
            }
          />
        </tr>
      </tbody>
    </table>
  );

  expect(getByText("data")).toBeDefined();
});
