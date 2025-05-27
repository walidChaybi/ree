import { CONFIG_GET_DEPARTEMENT } from "@api/configurations/adresse/GetDepartementsConfigApi";
import { MockApi } from "@mock/appelsApi/MockApi";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form, Formik } from "formik";
import { useState } from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import ChampRechercheDepartement from "../../../../../composants/commun/champs/geoApi/ChampRechercheDepartement";
import CacheDonneesApiGeo from "../../../../../utils/CacheDonneesApiGeo";

const mockDepartement = [
  { nom: "Loiret", code: "45", codeRegion: "24", _score: 0.6680453268093459 },
  { nom: "Loire", code: "42", codeRegion: "84", _score: 0.4577302020000409 },
  { nom: "Eure-et-Loir", code: "28", codeRegion: "24", _score: 0.379394848369805 },
  { nom: "Loir-et-Cher", code: "41", codeRegion: "24", _score: 0.379394848369805 },
  { nom: "Haute-Loire", code: "43", codeRegion: "84", _score: 0.3358139168454123 }
];

vi.mock("../../../hooks/utilitaires/UseDelai", () => ({
  useDelai: (initialValue: string) => useState(initialValue)
}));

const MockForm = ({ initialValues }: any) => (
  <Formik
    initialValues={initialValues}
    onSubmit={() => {}}
  >
    <Form>
      <ChampRechercheDepartement
        name="departement"
        libelle="departement"
      />
    </Form>
  </Formik>
);

describe("Fonctionnalités de recherche", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("DOIT afficher le message 'Saisissez au moins 2 caractères' QUAND la valeur est < 2", async () => {
    render(<MockForm initialValues={{ departement: "" }}></MockForm>);

    const input = screen.getByRole("combobox");

    await userEvent.type(input, "p");

    const message = screen.getByText("Saisissez au moins 2 caractères");
    expect(message).toBeDefined();
  });

  test("DOIT lancer la recherche après saisie de 2 caractères", async () => {
    render(<MockForm initialValues={{ departement: "" }}></MockForm>);

    MockApi.deployer(
      CONFIG_GET_DEPARTEMENT,
      {
        query: { nom: "" }
      },
      { data: [] }
    );

    const mockApi = MockApi.getMock();

    const input = screen.getByRole("combobox");

    await userEvent.type(input, "pa");

    await waitFor(() => {
      expect(mockApi.history.get.length).toBe(1);
    });

    MockApi.stopMock();
  });

  test("DOIT afficher les départements retournés par l'API Geo", async () => {
    vi.spyOn(CacheDonneesApiGeo, "setDepartements");
    render(<MockForm initialValues={{ departement: "" }}></MockForm>);

    MockApi.deployer(
      CONFIG_GET_DEPARTEMENT,
      {
        query: { nom: "loi" }
      },
      { data: mockDepartement }
    );

    const mockApi = MockApi.getMock();

    const input: HTMLSelectElement = screen.getByRole("combobox");

    await userEvent.type(input, "loi");

    await waitFor(() => {
      expect(mockApi.history.get.length).toBe(1);
    });

    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });

    await waitFor(() => {
      expect(input.value).toBe("Loiret");
      expect(CacheDonneesApiGeo.setDepartements).toHaveBeenCalledWith("loi", mockDepartement);
    });

    MockApi.stopMock();
  });

  test("DOIT déclencher la recherche au focus", async () => {
    render(<MockForm initialValues={{ departement: "hau" }}></MockForm>);

    MockApi.deployer(
      CONFIG_GET_DEPARTEMENT,
      {
        query: { nom: "hau" }
      },
      { data: mockDepartement }
    );

    const mockApi = MockApi.getMock();

    const input: HTMLSelectElement = screen.getByRole("combobox");

    act(() => {
      input.focus();
    });

    await waitFor(() => {
      expect(mockApi.history.get.length).toBe(1);
      expect(mockApi.history.get[0].url).toContain("nom=hau");
    });

    MockApi.stopMock();
  });

  test("DOIT utiliser les données du cache QUAND les données sont disponibles", async () => {
    vi.spyOn(CacheDonneesApiGeo, "getDepartements");
    render(<MockForm initialValues={{ departement: "" }}></MockForm>);

    const mockApi = MockApi.getMock();
    const input: HTMLInputElement = screen.getByRole("combobox");

    await userEvent.type(input, "loi");

    await waitFor(() => {
      expect(mockApi.history.get.length).toBe(0);
    });

    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });

    await waitFor(() => {
      expect(CacheDonneesApiGeo.getDepartements).toHaveBeenCalledWith("loi");
    });

    await waitFor(() => {
      expect(mockApi.history.get.length).toBe(0);
    });

    MockApi.stopMock();
  });
});
