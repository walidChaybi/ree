import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { SousTypeDelivrance } from "../../../../model/requete/v2/enum/SousTypeDelivrance";
import { TRequete } from "../../../../model/requete/v2/IRequete";
import {
  IActionOption,
  MenuAction
} from "../../../../views/common/widget/menu/MenuAction";

test("renders d'un menu choix des actions", () => {
  let requete: TRequete;
  requete = { sousType: SousTypeDelivrance.RDCSC } as TRequete;

  const testOptions: IActionOption[] = [
    {
      value: 0,
      label: "Action de test",
      sousTypes: [SousTypeDelivrance.RDCSC],
      ref: undefined
    }
  ];
  const { getByText } = render(
    <Router>
      <MenuAction
        titre={"titre"}
        listeActions={testOptions}
        onSelect={() => {}}
        requete={requete}
      />
    </Router>
  );
  expect(getByText("titre")).not.toBeNull();

  const menu = screen.getByText(/titre/i);
  fireEvent.click(menu);
  expect(getByText("Action de test")).not.toBeNull();
});

test("renders d'un menu choix des actions avec filtre", () => {
  const testOptions: IActionOption[] = [
    {
      value: 0,
      label: "Action de test",
      sousTypes: [SousTypeDelivrance.RDCSC],
      ref: undefined
    },
    {
      value: 1,
      label: "Action de test 2",
      sousTypes: ["test"],
      ref: undefined
    }
  ];
  const { getByText } = render(
    <Router>
      <MenuAction
        titre={"titre"}
        listeActions={testOptions}
        onSelect={() => {}}
      />
    </Router>
  );
  expect(getByText("titre")).not.toBeNull();

  const menu = screen.getByText(/titre/i);
  fireEvent.click(menu);
  expect(getByText("Action de test")).not.toBeNull();
  const action2 = screen.queryByText("Action de test 2");
  expect(getByText("Action de test 2")).not.toBeNull();
});
