import { CONFIG_GET_TOUS_SERVICES } from "@api/configurations/agent/services/GetServicesConfigApi";
import { CONFIG_GET_TOUS_UTILISATEURS } from "@api/configurations/agent/utilisateur/GetUtilisateursConfigApi";
import { CONFIG_GET_DECRETS } from "@api/configurations/etatCivil/repertoireCivil/GetDecretsConfigApi";
import { TCodesFct } from "@api/TCodesFct";
import { TRAITEMENT_GET_DONNEES_CONTEXT } from "@api/traitements/RECEContext/TraitementGetDonneesContext";
import { MockApi } from "@mock/appelsApi/MockApi";
import { NOMENCLATURE_DECRETS } from "@mock/data/NomenclatureEtatCivilDecrets";
import { IUtilisateurDto } from "@model/agent/Utilisateur";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import useTraitementApi from "../../../../hooks/api/TraitementApiHook";
import AfficherMessage from "../../../../utils/AfficherMessage";

describe("Test du traitement de récupération des données du context RECE", () => {
  const EN_COURS = "en-cours";
  const PAS_EN_COURS = "pas-en-cours";
  const LANCER = "lancer";

  const ComposantTest: React.FC = () => {
    const { lancerTraitement, traitementEnCours } = useTraitementApi(TRAITEMENT_GET_DONNEES_CONTEXT);

    return (
      <div>
        <div>{traitementEnCours ? EN_COURS : PAS_EN_COURS}</div>
        <button
          type="button"
          onClick={() => lancerTraitement()}
        >
          {LANCER}
        </button>
      </div>
    );
  };

  test("Le traitement s'effectue correctement", async () => {
    MockApi.deployer(
      CONFIG_GET_TOUS_UTILISATEURS,
      { query: { range: "0-100" } },
      { data: [{ idUtilisateur: "test-id-utilisateur" }] as IUtilisateurDto[] }
    )
      .deployer(CONFIG_GET_TOUS_SERVICES, { query: { range: "0-100" } }, { data: [{ idService: "test-id-service" }] })
      .deployer(CONFIG_GET_DECRETS, undefined, { data: NOMENCLATURE_DECRETS });

    render(<ComposantTest />);

    await waitFor(() => {
      expect(screen.getByText(PAS_EN_COURS)).toBeDefined();
    });

    fireEvent.click(screen.getByText(LANCER));

    await waitFor(() => expect(screen.getByText(PAS_EN_COURS)).toBeDefined());

    MockApi.stopMock();
  });

  test("Les appels n'aboutissent pas", async () => {
    MockApi.deployer(
      CONFIG_GET_TOUS_UTILISATEURS,
      { query: { range: "0-100" } },
      {
        codeHttp: 500,
        erreurs: [{ message: "Appel utilisateurs en echec", code: "FCT_TEST" as unknown as TCodesFct, type: "BusinessException" }]
      }
    )
      .deployer(
        CONFIG_GET_TOUS_SERVICES,
        { query: { range: "0-100" } },
        {
          codeHttp: 500,
          erreurs: [{ message: "Appel services en echec", code: "FCT_TEST" as unknown as TCodesFct, type: "BusinessException" }]
        }
      )
      .deployer(CONFIG_GET_DECRETS, undefined, {
        codeHttp: 500,
        erreurs: [{ message: "Appel decrets en echec", code: "FCT_TEST" as unknown as TCodesFct, type: "BusinessException" }]
      });

    const afficherErreur = vi.fn();
    AfficherMessage.erreur = afficherErreur;

    render(<ComposantTest />);

    await waitFor(() => {
      expect(screen.getByText(PAS_EN_COURS)).toBeDefined();
    });

    fireEvent.click(screen.getByText(LANCER));

    await waitFor(() => expect(screen.getByText(PAS_EN_COURS)).toBeDefined());

    expect(afficherErreur).toHaveBeenCalledTimes(3);
    MockApi.stopMock();
  });
});
