import { TypeRequete } from "@model/requete/enum/TypeRequete";
import BoutonPrendreEnChargeRequeteSuivanteCreation from "@pages/requeteCreation/espaceCreation/BoutonPrendreEnChargeRequeteSuivanteCreation";
import { URL_MES_REQUETES_CREATION, URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID } from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { RouterProvider } from "react-router-dom";
import { expect, test } from "vitest";
import { createTestingRouter, elementAvecContexte } from "../../../../__tests__utils__/testsUtil";
import { userDroitCreerActeEtabliPerimetreTousRegistres } from "../../../../mock/data/mockConnectedUserAvecDroit";

test("Attendu: BoutonPrendreEnChargeAleatoirement fonctionne correctement dans l'espace création", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_CREATION,
        element: <BoutonPrendreEnChargeRequeteSuivanteCreation typeRequete={TypeRequete.CREATION} />
      }
    ],
    [URL_MES_REQUETES_CREATION]
  );

  render(elementAvecContexte(<RouterProvider router={router} />, userDroitCreerActeEtabliPerimetreTousRegistres));

  const bouttonPrendreEnCharge = screen.getByText("Prendre en charge requête suivante") as HTMLButtonElement;

  waitFor(() => {
    expect(bouttonPrendreEnCharge.disabled).toBeFalsy();
  });

  fireEvent.click(bouttonPrendreEnCharge);

  waitFor(() => {
    expect(router.state.location.pathname).toBe(
      getUrlWithParam(URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID, "54ddf213-d9b7-4747-8e92-68c220f66de3")
    );
  });
});
