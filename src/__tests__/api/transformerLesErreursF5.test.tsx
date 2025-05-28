import { act, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { AGENT_API } from "@api/ApiDisponibles";

import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { useEffect, useState } from "react";
import useFetchApi from "../../hooks/api/FetchApiHook";

const ComposantDeTestHtmlGestionnaireApi: React.FC<any> = () => {
  const { appelApi } = useFetchApi({ api: AGENT_API, methode: "GET", uri: "/testhtml" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    appelApi({
      parametres: {},
      apresErreur: (erreur, status) => {
        setMessage(`${erreur[0].message} HTTP Status: ${status}`);
      }
    });
  }, []);

  return <>{message}</>;
};

const ComposantDeTestHtmlAppelApi: React.FC<any> = () => {
  const { appelApi } = useFetchApi({ api: AGENT_API, methode: "GET", uri: "/testhtml", avecAxios: true });
  const [message, setMessage] = useState("");

  useEffect(() => {
    appelApi({
      parametres: {},
      apresErreur: (erreur, status) => {
        setMessage(`${erreur[0].message} HTTP Status: ${status}`);
      }
    });
  }, []);

  return <>{message}</>;
};

describe("Fetch Html", () => {
  test("Doit transformer le status 200 à 500 -- Avec Gestionnaire Api", async () => {
    await act(async () => render(<ComposantDeTestHtmlGestionnaireApi />));
    expect(screen.getByText("Réponse HTML inattendue du serveur. HTTP Status: 500")).toBeDefined();
  });

  test("Doit transformer le status 200 à 500 -- Avec Appel Api", async () => {
    const baseUrl = `${window.location.protocol}//${window.location.hostname}/rece/${AGENT_API.nom}/${AGENT_API.version}`;
    const uriTest = `${baseUrl}/testhtml`;
    const mockHtml = new AxiosMockAdapter(axios, { onNoMatch: "throwException" });

    mockHtml.onGet(uriTest).reply(200, "<html>test html<html/>");
    await act(async () => render(<ComposantDeTestHtmlAppelApi />));
    expect(screen.getByText("Réponse HTML inattendue du serveur. HTTP Status: 500")).toBeDefined();
    mockHtml.restore();
  });
});
