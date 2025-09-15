import { CONFIG_GET_POCOPAS_PAR_FAMILLE_REGISTRE } from "@api/configurations/etatCivil/pocopa/GetPocopasParFamilleRegistreConfigApi";
import { MockApi } from "@mock/appelsApi/MockApi";
import { ITypeRegistrePocopaDto } from "@model/etatcivil/acte/TypeRegistre";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Form, Formik } from "formik";
import { useState } from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import ChampRecherchePocopas from "../../../../composants/commun/champs/ChampRecherchePocopas";
import CacheOptionsPoste from "../../../../utils/CacheOptionsPoste";

vi.mock("../../../../../hooks/utilitaires/UseDelai", () => ({
  useDelai: (initialValue: string) => useState(initialValue)
}));

const mockPostesDto: ITypeRegistrePocopaDto[] = [
  { poste: "TUNIS", id: "1", pocopa: "" },
  { poste: "TURIN", id: "12", pocopa: "" },
  { poste: "TURIN ET GENES", id: "123", pocopa: "" }
];

const MockForm: React.FC<{ villeRegistre: string }> = ({ villeRegistre }) => (
  <Formik
    initialValues={{ villeRegistre }}
    onSubmit={() => {}}
  >
    <Form>
      <ChampRecherchePocopas
        name="villeRegistre"
        libelle="Poste"
        optionsRecherchePocopa={{ familleRegistre: "CSL", seulementPocopaOuvert: true }}
      />
    </Form>
  </Formik>
);

describe("Test ChampRecherche pocopa", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    CacheOptionsPoste.clearPostes();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("La recherche poste fonctionne correctement", async () => {
    MockApi.deployer(
      CONFIG_GET_POCOPAS_PAR_FAMILLE_REGISTRE,
      { path: { familleRegistre: "CSL" }, query: { seulementPocopaOuvert: true } },
      { data: mockPostesDto }
    );

    render(<MockForm villeRegistre={""} />);

    const mockApi = MockApi.getMock();

    const input: HTMLSelectElement = screen.getByRole("combobox");

    await waitFor(() => {
      expect(mockApi.history.get.length).toBe(1);
    });

    fireEvent.change(input, { target: { value: "t" } });

    await waitFor(() => {
      const options = screen.queryAllByRole("option");
      expect(options).toHaveLength(3);
    });

    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });

    await waitFor(() => {
      expect(input.value).toBe("TUNIS");
    });

    MockApi.stopMock();
  });

  test("DOIT utiliser les données du cache QUAND les données sont disponibles", async () => {
    vi.spyOn(CacheOptionsPoste, "getPostesFamilleRegistre");
    CacheOptionsPoste.setPostesFamilleRegistre("CSL", mockPostesDto);
    render(<MockForm villeRegistre={""}></MockForm>);

    const mockApi = MockApi.getMock();
    const input: HTMLInputElement = screen.getByRole("combobox");

    fireEvent.change(input, { target: { value: "t" } });

    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });

    await waitFor(() => {
      expect(CacheOptionsPoste.getPostesFamilleRegistre).toHaveBeenCalledWith("CSL");
    });

    await waitFor(() => {
      expect(mockApi.history.get.length).toBe(0);
    });

    MockApi.stopMock();
  });
});
