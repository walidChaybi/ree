import { TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { FichePage } from "@pages/fiche/FichePage";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { UN, ZERO } from "@util/Utils";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { RouterProvider } from "react-router";
import { beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import { createTestingRouter, elementAvecContexte } from "../../../__tests__utils__/testsUtil";
import { idFicheActe1 } from "../../../mock/data/ficheActe";
import { userDroitCOMEDEC, userDroitConsulterPerimetreTUNIS } from "../../../mock/data/mockConnectedUserAvecDroit";

describe("Test du composant Fiche page", () => {
  const fct = vi.fn();

  beforeAll(() => {
    window.addEventListener("refreshStyles", fct);
  });

  beforeEach(() => {
    expect(gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES)).toBeTruthy();
  });

  test("Le render d'une RC via fichePage se fait correctement", async () => {
    const router = createTestingRouter(
      [
        {
          path: "/",
          element: (
            <FichePage
              index={{ value: ZERO }}
              dataFicheIdentifiant={"7566e16c-2b0e-11eb-adc1-0242ac120002"}
              nbLignesTotales={UN}
              nbLignesParAppel={UN}
              datasFiches={[
                {
                  identifiant: "7566e16c-2b0e-11eb-adc1-0242ac120002",
                  categorie: TypeFiche.RC
                }
              ]}
            />
          )
        }
      ],
      ["/"]
    );

    render(<RouterProvider router={router} />);
    await waitFor(() => {
      expect(fct).toHaveBeenCalledTimes(UN);
    });
  });

  test("Attendu: le bouton 'demander la délivrance' est affiché et le clic effectue le traitement demandé'", async () => {
    const utilisateurConnecte = userDroitCOMEDEC;
    const router = createTestingRouter(
      [
        {
          path: "/",
          element: (
            <FichePage
              index={{ value: ZERO }}
              dataFicheIdentifiant={idFicheActe1}
              nbLignesTotales={UN}
              nbLignesParAppel={UN}
              datasFiches={[
                {
                  identifiant: idFicheActe1,
                  categorie: TypeFiche.ACTE
                }
              ]}
            />
          )
        }
      ],
      ["/"]
    );

    render(elementAvecContexte(<RouterProvider router={router} />, utilisateurConnecte));

    await expect.poll(() => screen.getByLabelText("Demander la délivrance")).toBeDefined();
    fireEvent.click(screen.getByLabelText("Demander la délivrance"));

    let okButton: HTMLElement | null;
    await waitFor(() => {
      okButton = screen.getByText(/Oui/);
      expect(okButton).toBeDefined();
    });

    fireEvent.click(okButton!);

    await waitFor(() => {
      okButton = screen.queryByText(/Oui/);
      expect(okButton).toBeNull();
    });
  });

  test("Attendu: le bouton 'demander la délivrance' n'est pas affiché lorsque l'utilisateur est habilité", async () => {
    const utilisateurConnecte = userDroitConsulterPerimetreTUNIS;

    const router = createTestingRouter(
      [
        {
          path: "/",
          element: (
            <FichePage
              index={{ value: ZERO }}
              dataFicheIdentifiant={idFicheActe1}
              nbLignesTotales={UN}
              nbLignesParAppel={UN}
              datasFiches={[
                {
                  identifiant: idFicheActe1,
                  categorie: TypeFiche.ACTE
                }
              ]}
            />
          )
        }
      ],
      ["/"]
    );

    render(elementAvecContexte(<RouterProvider router={router} />, utilisateurConnecte));

    const boutonDemanderDelivrance = screen.queryByLabelText("Demander la délivrance") as HTMLButtonElement;

    await waitFor(() => {
      expect(boutonDemanderDelivrance).toBeNull();
    });
  });
});
