import { CONFIG_GET_POCOPAS } from "@api/configurations/etatCivil/pocopa/GetPocopasConfigApi";
import { CONFIG_GET_POCOPAS_PAR_FAMILLE_REGISTRE } from "@api/configurations/etatCivil/pocopa/GetPocopasParFamilleRegistreConfigApi";
import { MockApi } from "@mock/appelsApi/MockApi";
import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { Perimetre } from "@model/agent/enum/Perimetre";
import { render, screen, waitFor } from "@testing-library/react";
import { Form, Formik } from "formik";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import BlocRequete from "../../../../../composants/pages/requetesConsulaire/saisieCourrier/BlocRequete";
import CacheDonneesPocopa from "../../../../../utils/CacheDonneesPocopa";

describe("Test rendu du bloc requete en saisie courrier", async () => {
  beforeEach(() => {
    vi.clearAllMocks();
    CacheDonneesPocopa.clearPocopas();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });
  test("DOIT afficher le composant bloc requete de saisie de courrier", () => {
    MockApi.deployer(CONFIG_GET_POCOPAS_PAR_FAMILLE_REGISTRE, { path: { familleRegistre: "CSL" }, query: { seulementPocopaOuvert: true } });

    const { container } = render(
      <MockRECEContextProvider
        utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte()
          .avecDroit(Droit.SAISIR_REQUETE, { perimetres: [Perimetre.TOUS_REGISTRES] })
          .generer()}
      >
        <Formik
          initialValues={{}}
          onSubmit={() => {}}
        >
          <Form>
            <BlocRequete />
          </Form>
        </Formik>
      </MockRECEContextProvider>
    );

    expect(container.firstChild).toMatchSnapshot();
    MockApi.stopMock();
  });

  test("DOIT afficher le champ select QUAND l'utilisateur n'éxerce pas sur le pémimètre TOUS_REGISTRE", async () => {
    MockApi.deployer(CONFIG_GET_POCOPAS, {}, { data: [{ id: "123", pocopa: "Test 1" }] });

    const { container } = render(
      <MockRECEContextProvider
        utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte()
          .avecDroit(Droit.SAISIR_REQUETE, { perimetres: ["ABIDJAN"] })
          .generer()}
      >
        <Formik
          initialValues={{ requete: { villeRegistre: "" } }}
          onSubmit={() => {}}
        >
          <Form>
            <BlocRequete />
          </Form>
        </Formik>
      </MockRECEContextProvider>
    );

    const mockApi = MockApi.getMock();

    await waitFor(() => {
      expect(mockApi.history.get.length).toBe(1);
    });

    expect(container.firstChild).toMatchSnapshot();

    MockApi.stopMock();
  });

  test("DOIT afficher un message d'erreur QUAND l'utilisateur n'a aucun pocopa", async () => {
    MockApi.deployer(CONFIG_GET_POCOPAS, {}, { data: [] });

    render(
      <MockRECEContextProvider
        utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.SAISIR_REQUETE, { perimetres: [] }).generer()}
      >
        <Formik
          initialValues={{ requete: { villeRegistre: "" } }}
          onSubmit={() => {}}
          initialTouched={{ requete: { villeRegistre: true } }}
        >
          <Form>
            <BlocRequete />
          </Form>
        </Formik>
      </MockRECEContextProvider>
    );

    const mockApi = MockApi.getMock();

    await waitFor(() => {
      expect(mockApi.history.get.length).toBe(1);
    });

    expect(screen.getByText("Aucun pocopa disponible, veuillez contacter votre administrateur.")).toBeDefined();

    MockApi.stopMock();
  });
});
