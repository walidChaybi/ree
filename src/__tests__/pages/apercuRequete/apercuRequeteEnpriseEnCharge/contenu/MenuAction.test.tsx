import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { SousTypeDelivrance } from "../../../../../model/requete/v2/enum/SousTypeDelivrance";
import { IActionOption } from "../../../../../model/requete/v2/IActionOption";
import { MenuAction } from "../../../../../views/common/widget/menu/MenuAction";

test("renders d'un menu choix des actions", () => {
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
      sousTypes: [SousTypeDelivrance.RDC],
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

  const action1 = getByText("Action de test");
  expect(action1).not.toBeNull();
  const action2 = getByText("Action de test 2");
  expect(action2).not.toBeNull();
});
