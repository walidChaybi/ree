import React from "react";
import { render } from "@testing-library/react";
import { TableauBodyCell } from "../../../../views/common/widget/tableau/TableauBodyCell";
import { TableauTypeColumn } from "../../../../views/common/widget/tableau/TableauRece";

test("test des prioritées des requêtes", () => {
  const { getByText } = render(
    <table>
      <tbody>
        <tr>
          <TableauBodyCell
            valueAtKey={"data"}
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

  expect(getByText("data")).toBeDefined();
});

test("test des prioritées des requêtes", () => {
  const { getByText } = render(
    <table>
      <tbody>
        <tr>
          <TableauBodyCell
            valueAtKey={["data1", "data2"]}
            column={
              new TableauTypeColumn({
                keys: ["idSagaDila"],
                title: "pages.delivrance.mesRequetes.tableau.header.idSagaDila",
                dataIsArray: true
              })
            }
          />
        </tr>
      </tbody>
    </table>
  );

  expect(getByText("data1")).toBeDefined();
  expect(getByText("data2")).toBeDefined();
});
