import React from "react";
import { render, waitFor, act } from "@testing-library/react";
import { FichePage } from "../../../views/pages/fiche/FichePage";
import request from "superagent";
import { configEtatcivil } from "../../../api/mock/superagent-config/superagent-mock-etatcivil";

const superagentMock = require("superagent-mock")(request, configEtatcivil);

const fct = jest.fn();

beforeEach(() => {
  window.addEventListener("refreshStyles", fct);
});

test("rendersFichePage render correcty", async () => {
  await act(async () => {
    render(
      <FichePage
        dataFiche={{
          identifiant: "7566e16c-2b0e-11eb-adc1-0242ac120002",
          categorie: "rc"
        }}
      />
    );

    await waitFor(() => {
      expect(fct).toHaveBeenCalledTimes(1);
    });
  });
});

afterAll(() => {
  superagentMock.unset();
});
