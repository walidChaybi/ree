import { CONFIG_GET_ADRESSES } from "@api/configurations/adresse/GetAdressesConfigApi";
import { MockApi } from "@mock/appelsApi/MockApi";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form, Formik } from "formik";
import { useState } from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import ChampRechercheAdresse from "../../../../../composants/commun/champs/geoApi/ChampRechercheAdresse";
import ChampRechercheDepartement from "../../../../../composants/commun/champs/geoApi/ChampRechercheDepartement";
import ChampRechercheVille from "../../../../../composants/commun/champs/geoApi/ChampRechercheVille";
import CacheDonneesApiGeo from "../../../../../utils/CacheDonneesApiGeo";

vi.mock("../../../../../hooks/utilitaires/UseDelai", () => ({
  useDelai: (initialValue: string) => useState(initialValue)
}));

const mockAdresses = [
  {
    properties: {
      label: "10 Avenue des Champs-Élysées 75008 Paris",
      id: "75108_0009_00010",
      name: "10 Avenue des Champs-Élysées",
      city: "Paris",
      context: "75, Paris, Île-de-France",
      type: "housenumber"
    }
  },
  {
    properties: {
      label: "Avenue des Champs-Élysées 75008 Paris",
      id: "75108_0009",
      name: "Avenue des Champs-Élysées",
      city: "Paris",
      context: "75, Paris, Île-de-France",
      type: "street"
    }
  },
  {
    properties: {
      label: "12 Rue de la Paix 75002 Paris",
      id: "75102_0123_00012",
      name: "12 Rue de la Paix",
      city: "Paris",
      context: "75, Paris, Île-de-France",
      type: "housenumber"
    }
  },
  {
    properties: {
      label: "Place de la République 69001 Lyon",
      id: "69381_0456_place",
      name: "Place de la République",
      city: "Lyon",
      context: "69, Rhône, Auvergne-Rhône-Alpes",
      type: "locality"
    }
  },
  {
    properties: {
      label: "Nantes 44000",
      id: "44109",
      name: "Nantes",
      city: "Nantes",
      context: "44, Loire-Atlantique, Pays de la Loire",
      type: "municipality"
    }
  }
];

const MockForm = ({ initialValues }: any) => (
  <Formik
    initialValues={initialValues}
    onSubmit={() => {}}
  >
    <Form>
      <ChampRechercheAdresse
        name="adresse"
        libelle="adresse"
      />
    </Form>
  </Formik>
);

describe("ChampRechercheAdresse - Fonctionnalités de recherche", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    CacheDonneesApiGeo.clearAdresses?.();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("NE DOIT PAS lancer la recherche avec moins de 3 caractères", async () => {
    render(<MockForm initialValues={{ adresse: "" }}></MockForm>);

    const mockApi = MockApi.getMock();
    const input = screen.getByRole("combobox");

    await userEvent.type(input, "pa");

    await new Promise(resolve => setTimeout(resolve, 400));

    expect(mockApi.history.get.length).toBe(0);

    MockApi.stopMock();
  });

  test("DOIT lancer la recherche après la saisie de 3 caractères", async () => {
    render(<MockForm initialValues={{ adresse: "" }}></MockForm>);

    MockApi.deployer(
      CONFIG_GET_ADRESSES,
      {
        query: { q: "par", limit: 10 }
      },
      { data: { features: [] } }
    );

    const mockApi = MockApi.getMock();
    const input = screen.getByRole("combobox");

    await userEvent.type(input, "par");

    await waitFor(() => {
      expect(mockApi.history.get.length).toBe(1);
    });

    MockApi.stopMock();
  });

  test("DOIT afficher les adresses retournées par l'API Adresse", async () => {
    vi.spyOn(CacheDonneesApiGeo, "setAdresses");
    render(<MockForm initialValues={{ adresse: "" }}></MockForm>);

    MockApi.deployer(
      CONFIG_GET_ADRESSES,
      {
        query: { q: "par", limit: 10 }
      },
      { data: { features: mockAdresses } }
    );

    const mockApi = MockApi.getMock();
    const input: HTMLSelectElement = screen.getByRole("combobox");

    fireEvent.change(input, { target: { value: "par" } });

    await waitFor(() => {
      expect(mockApi.history.get.length).toBe(1);
    });

    await waitFor(() => {
      const options = screen.queryAllByRole("option");
      expect(options).toHaveLength(4);
    });

    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });

    await waitFor(() => {
      expect(input.value).toBe("10 Avenue des Champs-Élysées");
      expect(CacheDonneesApiGeo.setAdresses).toHaveBeenCalledWith(
        "par",
        mockAdresses.filter(addr => addr.properties.type !== "municipality")
      );
    });

    MockApi.stopMock();
  });

  test("DOIT déclencher la recherche au focus QUAND la valeur a au moins 3 caractères", async () => {
    render(<MockForm initialValues={{ adresse: "paris" }}></MockForm>);

    MockApi.deployer(
      CONFIG_GET_ADRESSES,
      {
        query: { q: "paris", limit: 10 }
      },
      { data: { features: mockAdresses } }
    );

    const mockApi = MockApi.getMock();
    const input: HTMLSelectElement = screen.getByRole("combobox");

    act(() => {
      input.focus();
    });

    await waitFor(() => {
      expect(mockApi.history.get.length).toBe(1);
      expect(mockApi.history.get[0].url).toContain("q=paris");
    });

    MockApi.stopMock();
  });

  test("NE DOIT PAS déclencher la recherche au focus QUAND la valeur a moins de 3 caractères", async () => {
    render(<MockForm initialValues={{ adresse: "pa" }}></MockForm>);

    const mockApi = MockApi.getMock();
    const input: HTMLSelectElement = screen.getByRole("combobox");

    act(() => {
      input.focus();
    });

    expect(mockApi.history.get.length).toBe(0);

    MockApi.stopMock();
  });

  test("DOIT utiliser les données du cache QUAND les données sont disponibles", async () => {
    vi.spyOn(CacheDonneesApiGeo, "getAdresses");
    CacheDonneesApiGeo.setAdresses?.("par", mockAdresses);
    render(<MockForm initialValues={{ adresse: "" }}></MockForm>);

    const mockApi = MockApi.getMock();
    const input: HTMLInputElement = screen.getByRole("combobox");

    fireEvent.change(input, { target: { value: "par" } });

    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });

    await waitFor(() => {
      expect(CacheDonneesApiGeo.getAdresses).toHaveBeenCalledWith("par");
    });

    await waitFor(() => {
      expect(mockApi.history.get.length).toBe(0);
    });

    MockApi.stopMock();
  });

  test("DOIT automatiquement remplir les champs ville et département QUAND une adresse est sélectionnée", async () => {
    const adressesMockLyon = [
      {
        properties: {
          label: "Place Bellecour 69002 Lyon",
          id: "69382_0123_place",
          name: "Place Bellecour",
          city: "Lyon",
          context: "69, Rhône, Auvergne-Rhône-Alpes",
          type: "locality"
        }
      },
      {
        properties: {
          label: "Rue de la République 69002 Lyon",
          id: "69382_0456_rue",
          name: "Rue de la République",
          city: "Lyon",
          context: "69, Rhône, Auvergne-Rhône-Alpes",
          type: "street"
        }
      }
    ];

    render(
      <Formik
        initialValues={{ adresse: "", ville: "", departement: "" }}
        onSubmit={() => {}}
      >
        <Form>
          <ChampRechercheAdresse
            name="adresse"
            libelle="adresse"
            cheminChampVille="ville"
            cheminChampDepartement="departement"
          />

          <ChampRechercheVille
            name="ville"
            libelle="ville"
          />

          <ChampRechercheDepartement
            name="departement"
            libelle="departement"
          />
        </Form>
      </Formik>
    );

    MockApi.deployer(
      CONFIG_GET_ADRESSES,
      {
        query: { q: "lyon", limit: 10 }
      },
      { data: { features: adressesMockLyon } }
    );

    const mockApi = MockApi.getMock();
    const [adresseInput, villeInput, departementInput] = screen.getAllByRole<HTMLInputElement>("combobox");

    fireEvent.change(adresseInput, { target: { value: "lyon" } });

    await waitFor(() => {
      const options = screen.queryAllByRole("option");
      expect(options).toHaveLength(2);
    });

    fireEvent.keyDown(adresseInput, { key: "ArrowDown" });
    fireEvent.keyDown(adresseInput, { key: "Enter" });

    await waitFor(() => {
      expect(adresseInput.value).toBe("Place Bellecour");
      expect(villeInput.value).toBe("Lyon");
      expect(departementInput.value).toBe("Rhône");
      expect(mockApi.history.get.length).toBe(1);
    });

    MockApi.stopMock();
  });

  test("DOIT afficher le bon message QUAND aucune adresse n'est trouvée", async () => {
    render(<MockForm initialValues={{ adresse: "" }}></MockForm>);

    MockApi.deployer(
      CONFIG_GET_ADRESSES,
      {
        query: { q: "adresseinexistante", limit: 10 }
      },
      { data: { features: [] } }
    );

    const input: HTMLInputElement = screen.getByRole("combobox");

    fireEvent.change(input, { target: { value: "adresseinexistante" } });

    await waitFor(() => {
      expect(screen.getByText("Aucune adresse trouvée pour adresseinexistante")).toBeDefined();
    });

    MockApi.stopMock();
  });

  test("DOIT afficher le message pour saisir au moins 3 caractères QUAND la recherche est trop courte", async () => {
    render(<MockForm initialValues={{ adresse: "" }}></MockForm>);

    const input: HTMLInputElement = screen.getByRole("combobox");

    fireEvent.change(input, { target: { value: "pa" } });

    fireEvent.click(input);

    await waitFor(() => {
      expect(screen.getByText("Saisissez au moins 3 caractères")).toBeDefined();
    });
  });

  test("DOIT afficher les types d'adresse correctement", async () => {
    render(<MockForm initialValues={{ adresse: "" }}></MockForm>);

    MockApi.deployer(
      CONFIG_GET_ADRESSES,
      {
        query: { q: "par", limit: 10 }
      },
      { data: { features: mockAdresses } }
    );

    const input: HTMLInputElement = screen.getByRole("combobox");

    fireEvent.change(input, { target: { value: "par" } });

    await waitFor(() => {
      expect(screen.getByText("Voie")).toBeDefined();
    });

    MockApi.stopMock();
  });
});
