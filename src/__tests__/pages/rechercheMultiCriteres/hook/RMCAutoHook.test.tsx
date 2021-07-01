import { act, render, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configEtatcivil } from "../../../../mock/superagent-config/superagent-mock-etatcivil";
import { IRequeteTableau } from "../../../../model/requete/v2/IRequeteTableau";
import {
  IRMCAutoParams,
  useRMCAutoHook
} from "../../../../views/pages/rechercheMultiCriteres/autoActesInscriptions/hook/RMCAutoHook";
import {
  URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_V2,
  URL_RECHERCHE_REQUETE,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_REQUETES_SERVICE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_REQUETES_SERVICE_V2
} from "../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configEtatcivil);

let params: IRMCAutoParams = {
  requete: { idRequete: ":idRequete", document: "123456" } as IRequeteTableau,
  dataRequetes: [],
  urlCourante: URL_MES_REQUETES_V2
};

const HookConsummerRequete: React.FC = () => {
  const { url } = useRMCAutoHook(params);
  return <div data-testid="urlRedirection">{url}</div>;
};

const HookConsummerRequeteService: React.FC = () => {
  const urlWithParam = URL_REQUETES_SERVICE_V2;
  params = { ...params, urlCourante: urlWithParam };
  const { url } = useRMCAutoHook(params);
  return <div data-testid="urlRedirection">{url}</div>;
};

const HookConsummerRechercheRequete: React.FC = () => {
  const urlWithParam = URL_RECHERCHE_REQUETE;
  params = { ...params, urlCourante: urlWithParam };
  const { url } = useRMCAutoHook(params);
  return <div data-testid="urlRedirection">{url}</div>;
};

test('Test useRMCAutoHook : redirection à partir de "Mes Requêtes"', async () => {
  await act(async () => {
    const { getByTestId } = render(<HookConsummerRequete />);
    await waitFor(() =>
      expect(getByTestId("urlRedirection").textContent).toBe(
        URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID
      )
    );
  });
});

test('Test useRMCAutoHook : redirection à partir de "Requêtes Service"', async () => {
  await act(async () => {
    const { getByTestId } = render(<HookConsummerRequeteService />);
    await waitFor(() =>
      expect(getByTestId("urlRedirection").textContent).toBe(
        URL_REQUETES_SERVICE_APERCU_REQUETE_PRISE_EN_CHARGE_ID
      )
    );
  });
});

test('Test useRMCAutoHook : redirection à partir de "Recherche Requêtes"', async () => {
  await act(async () => {
    const { getByTestId } = render(<HookConsummerRechercheRequete />);
    await waitFor(() =>
      expect(getByTestId("urlRedirection").textContent).toBe(
        URL_RECHERCHE_REQUETE_APERCU_REQUETE_PRISE_EN_CHARGE_ID
      )
    );
  });
});

afterAll(() => {
  superagentMock.unset();
});
