import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { NatureMention } from "@model/etatcivil/enum/NatureMention";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router";
import { describe, expect, test } from "vitest";
import PageEditionRequeteMiseAJour from "../../../pages/requetesMiseAJour/PageEditionRequeteMiseAJour";
import LiensRECE from "../../../router/LiensRECE";
import { URL_ACCUEIL } from "../../../router/infoPages/InfoPagesBase";
import { INFO_PAGE_MISE_A_JOUR_ANALYSE_MARGINALE } from "../../../router/infoPages/InfoPagesEspaceMiseAJour";
import { INFO_PAGE_RECHERCHE_ACTE_INSCRIPTION } from "../../../router/infoPages/InfoPagesEspaceRecherche";
import { createTestingRouter } from "../../__tests__utils__/testsUtil";
import { NATURE_MENTION } from "../../mock/data/NomenclatureNatureMention";
import { TYPE_MENTION } from "../../mock/data/NomenclatureTypeMention";

const idActe = "b41079a5-9e8d-478c-b04c-c4c4ey86537g";
const idRequete = "931c715b-ede1-4895-ad70-931f2ac4e43d";

describe("Test de la page aperçu requête mise à jour analyse marginale", () => {
  NatureMention.init(NATURE_MENTION);
  TypeMention.init(TYPE_MENTION);

  test("La page s'affiche correctement", async () => {
    const router = createTestingRouter(
      [
        {
          path: `${URL_ACCUEIL}${INFO_PAGE_MISE_A_JOUR_ANALYSE_MARGINALE.url}`,
          element: <PageEditionRequeteMiseAJour />
        }
      ],
      [LiensRECE.genererLien(INFO_PAGE_MISE_A_JOUR_ANALYSE_MARGINALE.url, { idActeParam: idActe, idRequeteParam: idRequete })]
    );

    render(<RouterProvider router={router} />);
    await waitFor(() => {
      expect(screen.getByText("Acte registre")).toBeDefined();
      expect(screen.getByText("Analyse Marginale")).toBeDefined();
    });
  });

  test("La page est redirigé sans confirmation si aucun changement", async () => {
    const router = createTestingRouter(
      [
        {
          path: `${URL_ACCUEIL}${INFO_PAGE_MISE_A_JOUR_ANALYSE_MARGINALE.url}`,
          element: <PageEditionRequeteMiseAJour />
        },
        {
          path: LiensRECE.genererLien(INFO_PAGE_RECHERCHE_ACTE_INSCRIPTION.url),
          element: <div>Redirigé</div>
        }
      ],
      [LiensRECE.genererLien(INFO_PAGE_MISE_A_JOUR_ANALYSE_MARGINALE.url, { idActeParam: idActe, idRequeteParam: idRequete })]
    );

    render(<RouterProvider router={router} />);
    fireEvent.click(screen.getByText("Abandonner"));
    await waitFor(() => expect(router.state.location.pathname).toBe(LiensRECE.genererLien(INFO_PAGE_RECHERCHE_ACTE_INSCRIPTION.url)));
  });

  test("La page est redirigé si pas d'id acte ou idParam", () => {
    const router = createTestingRouter(
      [
        {
          path: "/",
          element: <PageEditionRequeteMiseAJour />
        },
        {
          path: URL_ACCUEIL,
          element: <div>Redirigé</div>
        }
      ],
      ["/"]
    );

    render(<RouterProvider router={router} />);
    expect(router.state.location.pathname).toBe(URL_ACCUEIL);
  });
});
