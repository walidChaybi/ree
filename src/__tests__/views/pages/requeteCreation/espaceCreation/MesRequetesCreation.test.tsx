import { IQueryParametersPourRequetes } from "@api/appels/requeteApi";
import { MesRequetesCreation } from "@pages/requeteCreation/espaceCreation/MesRequetesCreation";
import { statutsRequetesCreation } from "@pages/requeteCreation/espaceCreation/params/EspaceCreationParams";
import { URL_MES_REQUETES_CREATION } from "@router/ReceUrls";
import { render, screen, waitFor } from "@testing-library/react";
import { NB_LIGNES_PAR_APPEL_DEFAUT } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { RouterProvider } from "react-router-dom";
import { expect, test } from "vitest";
import { createTestingRouter, elementAvecContexte } from "../../../../__tests__utils__/testsUtil";
import { userDroitCreerActeTranscritPerimetreTousRegistres } from "../../../../mock/data/mockConnectedUserAvecDroit";

const queryParametersPourRequetes = {
  statuts: statutsRequetesCreation,
  tri: "alerte",
  sens: "ASC",
  range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
} as IQueryParametersPourRequetes;

test("Doit rendre le tableau des requêtes création", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_CREATION,
        element: <MesRequetesCreation queryParametersPourRequetes={queryParametersPourRequetes} />
      }
    ],
    [URL_MES_REQUETES_CREATION]
  );

  render(elementAvecContexte(elementAvecContexte(<RouterProvider router={router} />, userDroitCreerActeTranscritPerimetreTousRegistres)));

  waitFor(() => {
    expect(screen.getByText("Alerte")).toBeDefined();
    expect(screen.getByText("N°")).toBeDefined();
    expect(screen.getByText("Sous-type")).toBeDefined();
    expect(screen.getByText("Postulant/Déclarant")).toBeDefined();
    expect(screen.getByText("Requérant")).toBeDefined();
    expect(screen.getByText("Initialisation")).toBeDefined();
    expect(screen.getByText("Dernière action")).toBeDefined();
    expect(screen.getByText("Statut")).toBeDefined();
  });
});
