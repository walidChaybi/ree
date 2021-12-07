import { render, waitFor } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import request from "superagent";
import { configEtatcivil } from "../../../../mock/superagent-config/superagent-mock-etatcivil";
import { IFicheActe } from "../../../../model/etatcivil/acte/IFicheActe";
import { useInformationsActeApiHook } from "../../../../views/common/hook/repertoires/ActeApiHook";

const superagentMock = require("superagent-mock")(request, configEtatcivil);

const HookConsummerActe: React.FC = () => {
  const informationsActe = useInformationsActeApiHook(
    "923a10fb-0b15-452d-83c0-d24c76d1d19d"
  ) as IFicheActe;

  return (
    <>
      {informationsActe && (
        <div data-testid={"test-fiche-hook-acte"}>{informationsActe.id}</div>
      )}
    </>
  );
};

test("l'appel au WS fonctionne correctement pour une fiche acte", async () => {
  await act(async () => {
    const { getByTestId } = render(<HookConsummerActe />);

    await waitFor(() => {
      expect(getByTestId("test-fiche-hook-acte").textContent).toEqual(
        "923a10fb-0b15-452d-83c0-d24c76d1d19d"
      );
    });
  });
});

afterAll(() => {
  superagentMock.unset();
});
