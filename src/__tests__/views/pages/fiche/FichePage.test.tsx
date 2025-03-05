import { mappingOfficier } from "@model/agent/IOfficier";
import { mapHabilitationsUtilisateur } from "@model/agent/IUtilisateur";
import { TypeAlerte } from "@model/etatcivil/enum/TypeAlerte";
import { TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { FichePage } from "@pages/fiche/FichePage";
import ApercuRequeteMiseAJourPage from "@pages/requeteMiseAJour/apercuRequete/ApercuRequeteMiseAJourPage";
import { URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS } from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { DEUX, UN, ZERO } from "@util/Utils";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { RouterProvider } from "react-router-dom";
import { beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import IHabilitationDto from "../../../../dto/etatcivil/agent/IHabilitationDto";
import { createTestingRouter, elementAvecContexte } from "../../../__tests__utils__/testsUtil";
import { idFicheActe1 } from "../../../mock/data/ficheActe";
import {
  resultatHeaderUtilistateurLeBiannic,
  resultatRequeteUtilistateurLeBiannic,
  userDroitCOMEDEC,
  userDroitConsulterPerimetreTUNIS
} from "../../../mock/data/mockConnectedUserAvecDroit";
import { ReponseAppelNomenclatureTypeAlerte } from "../../../mock/data/nomenclatures";

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

  test("Le render d'un ACTE via fichePage se fait correctement", async () => {
    const utilisateurConnecte = mappingOfficier(resultatHeaderUtilistateurLeBiannic, resultatRequeteUtilistateurLeBiannic.data);

    utilisateurConnecte.habilitations = mapHabilitationsUtilisateur(
      resultatRequeteUtilistateurLeBiannic.data.habilitations as unknown as IHabilitationDto[]
    );

    TypeAlerte.init(ReponseAppelNomenclatureTypeAlerte.data);
    const router = createTestingRouter(
      [
        {
          path: "/",
          element: (
            <FichePage
              index={{ value: ZERO }}
              dataFicheIdentifiant={"2748bb45-22cd-41ea-90db-0483b8ffc8a9"}
              nbLignesTotales={UN}
              nbLignesParAppel={UN}
              datasFiches={[
                {
                  identifiant: "b41079a5-9e8d-478c-b04c-c4c2ac67134f",
                  categorie: TypeFiche.ACTE
                }
              ]}
            />
          )
        },
        {
          path: `${URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS}/6e89c1c1-16c4-4e40-9b72-7b567270b26f/b41079a5-9e8d-478c-b04c-c4c2ac67134f`,
          element: <ApercuRequeteMiseAJourPage />
        }
      ],
      ["/"]
    );

    render(elementAvecContexte(<RouterProvider router={router} />, utilisateurConnecte));

    await waitFor(() => {
      // fct est appelé une fois quand le test est lancé tt seul
      // et est appelé 2 fois lorsque les test sont successifs
      expect(fct).toHaveBeenCalledTimes(DEUX);
      expect(screen.getByText("Apposer mention(s) suite à avis")).toBeDefined();
      expect(screen.getByText("Apposer mention(s) autre")).toBeDefined();
    });

    fireEvent.click(screen.getByText("Apposer mention(s) suite à avis"));

    await waitFor(() => {
      expect(router.state.matches[ZERO].pathname).toBe(
        `${URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS}/6e89c1c1-16c4-4e40-9b72-7b567270b26f/b41079a5-9e8d-478c-b04c-c4c2ac67134f`
      );
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
