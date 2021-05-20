import React from "react";
import {
  fireEvent,
  render,
  waitFor,
  act,
  screen
} from "@testing-library/react";
import {
  MenuAction,
  IActionOption
} from "../../../../views/pages/apercuRequete/actions/MenuAction";
import { BrowserRouter as Router } from "react-router-dom";
import { IDataDetailRequeteApi } from "../../../../views/pages/detailRequete/hook/DetailRequeteHook";
import { SousTypeDelivrance } from "../../../../model/requete/v2/enum/SousTypeDelivrance";

test("renders d'un menu choix des actions", () => {
  let requete: IDataDetailRequeteApi;
  requete = { data: { sousType: SousTypeDelivrance.RDCSC } };

  const testOptions: IActionOption[] = [
    {
      value: 0,
      label: "Action de test",
      sousTypes: [SousTypeDelivrance.RDCSC.nom]
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
  let requete: IDataDetailRequeteApi;
  requete = { data: { sousType: SousTypeDelivrance.RDCSC } };

  const testOptions: IActionOption[] = [
    {
      value: 0,
      label: "Action de test",
      sousTypes: [SousTypeDelivrance.RDCSC.nom]
    },
    {
      value: 1,
      label: "Action de test 2",
      sousTypes: ["test"]
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
  const action2 = screen.queryByText("Action de test 2");
  expect(action2).toBeNull();
});
