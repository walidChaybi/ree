import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test } from "vitest";

import { Droit } from "@model/agent/enum/Droit";

import { CONFIG_GET_NOMBRE_REQUETES } from "@api/configurations/requete/GetNombreRequetesConfigApi";
import { CONFIG_GET_NOMBRE_REQUETES_INFORMATION } from "@api/configurations/requete/GetNombreRequetesInformationConfigApi";
import { MockApi } from "@mock/appelsApi/MockApi";
import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { BrowserRouter } from "react-router";
import PageAccueil from "../../../pages/accueil/PageAccueil";

describe("Test page d'accueil", () => {
  const renderSnapshot = async (contextDroit: Droit[]): Promise<ChildNode | null> => {
    const { container } = await act(async () =>
      render(
        <MockRECEContextProvider utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroits(contextDroit).generer()}>
          <BrowserRouter>
            <PageAccueil />
          </BrowserRouter>
        </MockRECEContextProvider>
      )
    );

    return container.firstChild;
  };

  beforeEach(() => {
    //MockApi.debugAppels();
    MockApi.deployer(
      CONFIG_GET_NOMBRE_REQUETES_INFORMATION,
      { query: { statuts: [StatutRequete.PRISE_EN_CHARGE.nom, StatutRequete.TRANSFEREE.nom].join(",") } },
      {
        data: 11
      }
    );

    MockApi.deployer(
      CONFIG_GET_NOMBRE_REQUETES,
      { query: { statuts: StatutRequete.TRAITE_REPONDU.nom } },
      {
        data: 4
      }
    );
  });

  afterEach(() => {
    MockApi.stopMock();
  });

  test("il faut afficher les rubriques / boutons si l'utilisateur a les droits nécessaires", async () => {
    const snapshot = await renderSnapshot([Droit.DELIVRER]);
    expect(snapshot).toMatchSnapshot();
  });

  test("il ne faut pas afficher les rubriques / boutons si l'utilisateur n'a pas les droits nécessaires", async () => {
    const snapshot = await renderSnapshot([]);
    expect(snapshot).toMatchSnapshot();
  });
});
