import { render } from "@testing-library/react";
import { TableauBodyCell } from "@widget/tableau/TableauRece/TableauBodyCell";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
import { expect, test } from "vitest";

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
                title: "idSagaDila"
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
                title: "idSagaDila",
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
