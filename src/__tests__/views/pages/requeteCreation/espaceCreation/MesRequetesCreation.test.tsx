import { IQueryParametersPourRequetes } from "@api/appels/requeteApi";
import { userDroitCreerActeTranscritPerimetreMEAE } from "@mock/data/connectedUserAvecDroit";
import { MesRequetesCreation } from "@pages/requeteCreation/espaceCreation/MesRequetesCreation";
import { statutsRequetesCreation } from "@pages/requeteCreation/espaceCreation/params/EspaceCreationParams";
import { URL_MES_REQUETES_CREATION } from "@router/ReceUrls";
import { render, screen, waitFor } from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { NB_LIGNES_PAR_APPEL_DEFAUT } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { RouterProvider } from "react-router-dom";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";

storeRece.utilisateurCourant = userDroitCreerActeTranscritPerimetreMEAE;

const queryParametersPourRequetes = {
  statuts: statutsRequetesCreation,
  tri: "dateCreation",
  sens: "ASC",
  range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
} as IQueryParametersPourRequetes;

test("Doit rendre le tableau des requêtes création", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_CREATION,
        element: (
          <MesRequetesCreation
            queryParametersPourRequetes={queryParametersPourRequetes}
          />
        )
      }
    ],
    [URL_MES_REQUETES_CREATION]
  );

  render(<RouterProvider router={router} />);

  await waitFor(() => {
    expect(screen.getByText("N°")).toBeDefined();
    expect(screen.getByText("Sous-type")).toBeDefined();
    expect(screen.getByText("Postulant/Déclarant")).toBeDefined();
    expect(screen.getByText("Requérant")).toBeDefined();
    expect(screen.getByText("Initialisation")).toBeDefined();
    expect(screen.getByText("Dernière action")).toBeDefined();
    expect(screen.getByText("Statut")).toBeDefined();
  });
});
