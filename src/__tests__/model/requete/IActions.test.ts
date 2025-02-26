import { Action } from "@model/requete/IActions";
import { expect, test } from "vitest";
import { actions } from "../../mock/data/Actions";

test("Action.getActionAvantActionsASigner DOIT retourner l'action avant les actions 'a signer' ou la dernière action si pas d'action 'a signer'", () => {
  expect(Action.getActionAvantActionsASigner([])).toBe(undefined);

  expect(Action.getActionAvantActionsASigner(actions)).toBe(actions[5]);

  const actions2 = [
    ...actions,
    {
      id: "",
      numeroOrdre: 7,
      libelle: "À signer",
      dateAction: 123,
      idUtilisateur: "",
      trigramme: ""
    }
  ];

  expect(Action.getActionAvantActionsASigner(actions2)).toBe(actions2[5]);

  expect(Action.getActionAvantActionsASigner([actions[0]])).toBe(actions[0]);
});
