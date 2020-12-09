import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { LienFiche } from "../../../views/pages/fiche/LienFiche";
import request from "superagent";
import { configEtatcivil } from "../../../api/mock/superagent-config/superagent-mock-etatcivil";

const superagentMock = require("superagent-mock")(request, configEtatcivil);

test("renders Lien fiche fonctionne correctement", async () => {
  global.open = () => {
    return { ...window };
  };
  global.close = jest.fn();

  const { getByText } = render(
    <LienFiche
      identifiant={"7566e16c-2b0e-11eb-adc1-0242ac120002"}
      categorie={"rc"}
      numero={"56533"}
      title={"titre"}
    />
  );

  const link = getByText("56533");
  fireEvent.click(
    link,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true
    })
  );

  await waitFor(() => {
    const numeroRc = getByText("RC N° 2018 - 56533");
    expect(numeroRc).toBeDefined();

    const vueRc = getByText("Vue du RC");
    expect(vueRc).toBeDefined();
  });
});

afterAll(() => {
  superagentMock.unset();
});
