import { CONFIG_GET_COMMUNES } from "@api/configurations/adresse/GetCommunesConfigApi";
import { MockApi } from "@mock/appelsApi/MockApi";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form, Formik } from "formik";
import { useState } from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import ChampRechercheDepartement from "../../../../../composants/commun/champs/geoApi/ChampRechercheDepartement";
import ChampRechercheVille from "../../../../../composants/commun/champs/geoApi/ChampRechercheVille";
import CacheDonneesApiGeo from "../../../../../utils/CacheDonneesApiGeo";

vi.mock("../../../../../hooks/utilitaires/UseDelai", () => ({
  useDelai: (initialValue: string) => useState(initialValue)
}));

const mockVilles = [
  { nom: "Nantes", code: "44109", _score: 0.8142543771862568, departement: { code: "44", nom: "Loire-Atlantique" } },
  { nom: "Nancy", code: "54395", _score: 0.3411251264384351, departement: { code: "54", nom: "Meurthe-et-Moselle" } },
  { nom: "Nanterre", code: "92050", _score: 0.2757295399495975, departement: { code: "92", nom: "Hauts-de-Seine" } },
  { nom: "Nangis", code: "77327", _score: 0.22199695736995792, departement: { code: "77", nom: "Seine-et-Marne" } },
  { nom: "Nandy", code: "77326", _score: 0.21677544246106986, departement: { code: "77", nom: "Seine-et-Marne" } }
];

const MockForm = ({ initialValues }: any) => (
  <Formik
    initialValues={initialValues}
    onSubmit={() => {}}
  >
    <Form>
      <ChampRechercheVille
        name="ville"
        libelle="ville"
      />
    </Form>
  </Formik>
);

describe("Fonctionnalités de recherche", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    CacheDonneesApiGeo.clearCommunes();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("DOIT lancer la recherche après la saisie de 1 caractère", async () => {
    render(<MockForm initialValues={{ ville: "" }}></MockForm>);

    MockApi.deployer(
      CONFIG_GET_COMMUNES,
      {
        query: { nom: "p" }
      },
      { data: [] }
    );

    const mockApi = MockApi.getMock();

    const input = screen.getByRole("combobox");

    await userEvent.type(input, "p");

    await waitFor(() => {
      expect(mockApi.history.get.length).toBe(1);
    });

    MockApi.stopMock();
  });

  test("DOIT afficher les villes retournées par l'API Geo", async () => {
    vi.spyOn(CacheDonneesApiGeo, "setCommunes");
    render(<MockForm initialValues={{ ville: "" }}></MockForm>);

    MockApi.deployer(
      CONFIG_GET_COMMUNES,
      {
        query: { nom: "nan" }
      },
      { data: mockVilles }
    );

    const mockApi = MockApi.getMock();

    const input: HTMLSelectElement = screen.getByRole("combobox");

    fireEvent.change(input, { target: { value: "nan" } });

    await waitFor(() => {
      expect(mockApi.history.get.length).toBe(1);
    });

    await waitFor(() => {
      const options = screen.queryAllByRole("option");
      expect(options).toHaveLength(5);
    });

    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });

    await waitFor(() => {
      expect(input.value).toBe("Nantes");
      expect(CacheDonneesApiGeo.setCommunes).toHaveBeenCalledWith("nan", mockVilles);
    });

    MockApi.stopMock();
  });

  test("DOIT déclencher la recherche au focus", async () => {
    render(<MockForm initialValues={{ ville: "par" }}></MockForm>);

    MockApi.deployer(
      CONFIG_GET_COMMUNES,
      {
        query: { nom: "par" }
      },
      { data: mockVilles }
    );

    const mockApi = MockApi.getMock();

    const input: HTMLSelectElement = screen.getByRole("combobox");

    act(() => {
      input.focus();
    });

    await waitFor(() => {
      expect(mockApi.history.get.length).toBe(1);
      expect(mockApi.history.get[0].url).toContain("nom=par");
    });

    MockApi.stopMock();
  });

  test("DOIT utiliser les données du cache QUAND les données sont disponibles", async () => {
    vi.spyOn(CacheDonneesApiGeo, "getCommunes");
    CacheDonneesApiGeo.setCommunes("nan", mockVilles);
    render(<MockForm initialValues={{ ville: "" }}></MockForm>);

    const mockApi = MockApi.getMock();
    const input: HTMLInputElement = screen.getByRole("combobox");

    fireEvent.change(input, { target: { value: "nan" } });

    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });

    await waitFor(() => {
      expect(CacheDonneesApiGeo.getCommunes).toHaveBeenCalledWith("nan");
    });

    await waitFor(() => {
      expect(mockApi.history.get.length).toBe(0);
    });

    MockApi.stopMock();
  });

  test("DOIT automatiquement remplir le champs département QUAND une ville est séléctionnée", async () => {
    const villesMockTou = [
      { nom: "Toulouse", code: "31555", _score: 0.48482283213382976, departement: { code: "31", nom: "Haute-Garonne" } },
      { nom: "Toulon", code: "83137", _score: 0.3170377138494204, departement: { code: "83", nom: "Var" } },
      { nom: "Tours", code: "37261", _score: 0.2449368779312922, departement: { code: "37", nom: "Indre-et-Loire" } },
      { nom: "Tourcoing", code: "59599", _score: 0.15682135463334024, departement: { code: "59", nom: "Nord" } },
      { nom: "Toul", code: "54528", _score: 0.1341932996281351, departement: { code: "54", nom: "Meurthe-et-Moselle" } }
    ];

    render(
      <Formik
        initialValues={{ ville: "", departement: "" }}
        onSubmit={() => {}}
      >
        <Form>
          <ChampRechercheVille
            name="ville"
            libelle="ville"
            cheminChampDepartement="departement"
          />

          <ChampRechercheDepartement
            name="departement"
            libelle="departement"
          />
        </Form>
      </Formik>
    );

    MockApi.deployer(
      CONFIG_GET_COMMUNES,
      {
        query: { nom: "tou" }
      },
      { data: villesMockTou }
    );

    const mockApi = MockApi.getMock();

    const [villeInput, deptInput] = screen.getAllByRole("combobox") as HTMLInputElement[];

    fireEvent.change(villeInput, { target: { value: "tou" } });

    await waitFor(() => {
      const options = screen.queryAllByRole("option");
      expect(options).toHaveLength(5);
    });

    fireEvent.keyDown(villeInput, { key: "ArrowDown" });
    fireEvent.keyDown(villeInput, { key: "Enter" });

    await waitFor(() => {
      expect(villeInput.value).toBe("Toulouse");
      expect(deptInput.value).toBe("Haute-Garonne");
      expect(mockApi.history.get.length).toBe(1);
    });

    MockApi.stopMock();
  });
});
