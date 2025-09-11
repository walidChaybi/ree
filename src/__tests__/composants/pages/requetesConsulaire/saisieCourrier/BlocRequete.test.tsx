import { CONFIG_GET_POCOPAS_PAR_FAMILLE_REGISTRE } from "@api/configurations/etatCivil/pocopa/GetPocopasParFamilleRegistreConfigApi";
import { CONFIG_GET_POSTES } from "@api/configurations/etatCivil/pocopa/GetPostesConfigApi";
import { MockApi } from "@mock/appelsApi/MockApi";
import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { Perimetre } from "@model/agent/enum/Perimetre";
import { render, waitFor } from "@testing-library/react";
import { Form, Formik } from "formik";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import BlocRequete from "../../../../../composants/pages/requetesConsulaire/saisieCourrier/BlocRequete";
import CacheOptionsPoste from "../../../../../utils/CacheOptionsPoste";

describe("Test rendu du bloc requete en saisie courrier", async () => {
  beforeEach(() => {
    vi.clearAllMocks();
    CacheOptionsPoste.clearPostes();
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
    MockApi.deployer(CONFIG_GET_POSTES, {}, { data: [{ id: "123", poste: "Test 1" }] });

    const { container } = render(
      <MockRECEContextProvider
        utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte()
          .avecDroit(Droit.SAISIR_REQUETE, { perimetres: ["ABIDJAN"] })
          .generer()}
      >
        <Formik
          initialValues={{
            requete: {
              typeRegistre: {
                idTypeRegistre: "",
                poste: ""
              }
            }
          }}
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

  test("DOIT afficher un message d'erreur QUAND l'utilisateur n'a aucun poste", async () => {
    MockApi.deployer(CONFIG_GET_POSTES, {}, { data: [] });

    const { container } = render(
      <MockRECEContextProvider
        utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.SAISIR_REQUETE, { perimetres: [] }).generer()}
      >
        <Formik
          initialValues={{
            requete: {
              typeRegistre: {
                idTypeRegistre: "",
                poste: ""
              }
            }
          }}
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

    expect(container.firstChild).toMatchSnapshot();

    MockApi.stopMock();
  });
});
