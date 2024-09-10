import { IRMCAutoParams, useRMCAutoHook } from "@hook/rmcAuto/RMCAutoHook";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import {
  URL_MES_REQUETES_DELIVRANCE,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID,
  URL_RECHERCHE_REQUETE,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_REQUETES_DELIVRANCE_SERVICE,
  URL_REQUETES_DELIVRANCE_SERVICE_APERCU_REQUETE_PRISE_EN_CHARGE_ID
} from "@router/ReceUrls";
import { render, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import React from "react";
import { expect, test } from "vitest";

const paramsRequete: IRMCAutoParams = {
  requete: {
    idRequete: ":idRequeteParam",
    document: "123456",
    titulaires: [{ nom: "George" }]
  } as IRequeteTableauDelivrance,
  urlCourante: URL_MES_REQUETES_DELIVRANCE
};

const paramsRequeteService = {
  ...paramsRequete,
  urlCourante: URL_REQUETES_DELIVRANCE_SERVICE
};

const paramsRechercheRequete = {
  ...paramsRequete,
  urlCourante: URL_RECHERCHE_REQUETE
};

const paramsApercuRequete = {
  ...paramsRequete,
  urlCourante: getUrlWithParam(
    URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
    "34da88e2-c5c7-4324-ac8e-b35193352e64"
  )
};

const paramsApercuRequeteTraitement: IRMCAutoParams = {
  requete: {
    idRequete: ":idRequeteParam",
    document: "123456",
    statut: "Prise en charge"
  } as IRequeteTableauDelivrance,
  urlCourante: getUrlWithParam(
    URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID,
    "34da88e2-c5c7-4324-ac8e-b35193352e64"
  ),
  pasDeTraitementAuto: true
};

const HookConsummerRequete: React.FC = () => {
  const urlData = useRMCAutoHook(paramsRequete);
  return <div data-testid="urlRedirection">{urlData ? urlData.url : ""}</div>;
};

const HookConsummerRequeteService: React.FC = () => {
  const urlData = useRMCAutoHook(paramsRequeteService);
  return <div data-testid="urlRedirection">{urlData ? urlData.url : ""}</div>;
};

const HookConsummerRechercheRequete: React.FC = () => {
  const urlData = useRMCAutoHook(paramsRechercheRequete);
  return <div data-testid="urlRedirection">{urlData ? urlData.url : ""}</div>;
};

const HookConsummerApercuRequete: React.FC = () => {
  const urlData = useRMCAutoHook(paramsApercuRequete);
  return <div data-testid="urlRedirection">{urlData ? urlData.url : ""}</div>;
};

const HookConsummerApercuTraitement: React.FC = () => {
  const urlData = useRMCAutoHook(paramsApercuRequeteTraitement);
  return <div data-testid="urlRedirection">{urlData ? urlData.url : ""}</div>;
};

test('Test useRMCAutoHook : redirection à partir de "Mes Requêtes"', () => {
  const { getByTestId } = render(<HookConsummerRequete />);

  waitFor(() => {
    expect(getByTestId("urlRedirection").textContent).toBe(
      URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID
    );
  });
});

test('Test useRMCAutoHook : redirection à partir de "Requêtes Service"', () => {
  const { getByTestId } = render(<HookConsummerRequeteService />);
  waitFor(() => {
    expect(getByTestId("urlRedirection").textContent).toBe(
      URL_REQUETES_DELIVRANCE_SERVICE_APERCU_REQUETE_PRISE_EN_CHARGE_ID
    );
  });
});

test('Test useRMCAutoHook : redirection à partir de "Recherche Requêtes"', () => {
  const { getByTestId } = render(<HookConsummerRechercheRequete />);

  waitFor(() => {
    expect(getByTestId("urlRedirection").textContent).toBe(
      URL_RECHERCHE_REQUETE_APERCU_REQUETE_PRISE_EN_CHARGE_ID
    );
  });
});

test('Test useRMCAutoHook : redirection à partir de "Apercu Requêtes (prise en charge)"', () => {
  const { getByTestId } = render(<HookConsummerApercuRequete />);

  waitFor(() => {
    expect(getByTestId("urlRedirection").textContent).toBe(
      URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID
    );
  });
});

test('Test useRMCAutoHook : redirection à partir de "Apercu Requêtes Traitement" vers "Aperçu requete prise en charge" suite modifictaion traitement', () => {
  const { getByTestId } = render(<HookConsummerApercuTraitement />);

  waitFor(() =>
    expect(getByTestId("urlRedirection").textContent).toBe(
      URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID
    )
  );
});


