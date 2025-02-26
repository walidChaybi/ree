import { mappingOfficier } from "@model/agent/IOfficier";
import { mapHabilitationsUtilisateur } from "@model/agent/IUtilisateur";
import EspaceCreationPage from "@pages/requeteCreation/espaceCreation/EspaceCreationPage";
import { URL_REQUETES_CREATION_SERVICE } from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { expect, test } from "vitest";
import IHabilitationDto from "../../../../../dto/etatcivil/agent/IHabilitationDto";
import { createTestingRouter, elementAvecContexte } from "../../../../__tests__utils__/testsUtil";
import {
  resultatHeaderUtilistateurLeBiannic,
  resultatRequeteUtilistateurLeBiannic
} from "../../../../mock/data/mockConnectedUserAvecDroit";

test("renders creationPage", async () => {
  const utilisateurCourant = mappingOfficier(resultatHeaderUtilistateurLeBiannic, resultatRequeteUtilistateurLeBiannic.data);
  utilisateurCourant.habilitations = mapHabilitationsUtilisateur(
    resultatRequeteUtilistateurLeBiannic.data.habilitations as unknown as IHabilitationDto[]
  );

  const router = createTestingRouter(
    [
      {
        path: URL_REQUETES_CREATION_SERVICE,
        element: <EspaceCreationPage selectedTab={0} />
      }
    ],
    [URL_REQUETES_CREATION_SERVICE]
  );

  render(elementAvecContexte(<RouterProvider router={router} />, utilisateurCourant));
  const title = "Espace création";
  const mesRequetes = screen.getByText(/Mes requêtes de création/i);
  const requetesService = screen.getByText(/Les requêtes de création de mon service/i);

  waitFor(() => {
    expect(document.title).toBe(title);
    expect(mesRequetes).toBeDefined();
  });

  fireEvent.click(requetesService);

  const attribueA = screen.getByText(/Attribuée à/i);

  waitFor(() => {
    expect(document.title).toBe(title);
    expect(mesRequetes).toBeDefined();
    expect(requetesService).toBeDefined();
    expect(attribueA).toBeDefined();
  });
});
