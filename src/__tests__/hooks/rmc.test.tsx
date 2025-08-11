import { CONFIG_POST_RMC_ACTE } from "@api/configurations/etatCivil/acte/PostRMCActeConfigApi";
import { CONFIG_POST_RMC_INSCRIPTION } from "@api/configurations/etatCivil/acte/PostRMCInscriptionConfigApi";
import * as RMCUtils from "@hook/rmcActeInscription/RMCActeInscriptionUtils";
import { MockApi } from "@mock/appelsApi/MockApi";
import { ReponseAppelRMCActe } from "@mock/data/RMCActe";
import { act, render, renderHook, screen, waitFor } from "@testing-library/react";
import { PARAMS_TABLEAU_VIDE } from "@util/GestionDesLiensApi";
import { NB_LIGNES_PAR_APPEL_ACTE } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { describe, expect, test, vi } from "vitest";
import { useRMCActeApiHook } from "../../hooks/rmc/RMCActeApiHook";
import { useRmcInscriptionApi } from "../../pages/rmc/useRmcInscriptionApi";
import AfficherMessage from "../../utils/AfficherMessage";
import { formulaireValideMaisNonAutorise_1, formulaireValideMaisNonAutorise_2 } from "./donneesRmcInscription";

describe("Test RMCAutoApiHook", () => {
  const criteres: RMCUtils.ICriteresRechercheActeInscription = {
    valeurs: {
      titulaire: {
        nom: "Nom",
        prenom: "Prénom",
        paysNaissance: "France",
        dateNaissance: { jour: "10", mois: "01", annee: "2020" }
      },
      datesDebutFinAnnee: {
        dateDebut: { jour: "", mois: "", annee: "" },
        dateFin: { jour: "", mois: "", annee: "" }
      }
    },
    range: `0-${NB_LIGNES_PAR_APPEL_ACTE}`
  };

  const HookConsummerRMCActe: React.FC = () => {
    const resultatRMCActe = useRMCActeApiHook(criteres);
    return (
      <>
        {resultatRMCActe.resultat?.dataRMCActe && resultatRMCActe.resultat.dataRMCActe.length > 0 && (
          <div data-testid="test-rmc-acte-hook">{resultatRMCActe.resultat.dataRMCActe[0].id}</div>
        )}
      </>
    );
  };

  test("l'appel au WS fonctionne correctement pour la Recherche Multi Critères Acte", async () => {
    MockApi.deployer(CONFIG_POST_RMC_ACTE, { query: { range: "0-100" } }, { data: ReponseAppelRMCActe.data });
    render(<HookConsummerRMCActe />);

    await waitFor(() => {
      expect(screen.getByTestId("test-rmc-acte-hook").textContent).toEqual("d8708d77-a359-4553-be72-1eb5f246d4da");
    });

    MockApi.stopMock();
  });

  const criteresRechecheNonAutorise: RMCUtils.ICriteresRechercheActeInscription = {
    valeurs: {
      titulaire: {
        nom: "Nom",
        prenom: "Prénom",
        paysNaissance: "France",
        dateNaissance: { jour: "10", mois: "01", annee: "2020" }
      },
      datesDebutFinAnnee: {
        dateDebut: { jour: "", mois: "", annee: "" },
        dateFin: { jour: "", mois: "", annee: "" }
      },
      registreRepertoire: {
        repertoire: {
          typeRepertoire: "RC"
        }
      }
    },
    range: `0-${NB_LIGNES_PAR_APPEL_ACTE}`
  };

  const HookConsummerRMCActeRechecheNonAutorise: React.FC = () => {
    const resultatRMCActe = useRMCActeApiHook(criteresRechecheNonAutorise);

    return (
      <>
        {resultatRMCActe.resultat?.dataRMCActe && resultatRMCActe.resultat.dataRMCActe.length === 0 && (
          <div data-testid="test-rmc-acte-hook">Recherche non autorisée</div>
        )}
      </>
    );
  };

  test("l'appel au WS fonctionne correctement pour la Recherche Multi Critères Acte", async () => {
    render(<HookConsummerRMCActeRechecheNonAutorise />);

    await waitFor(() => {
      expect(screen.getByTestId("test-rmc-acte-hook").textContent).toEqual("Recherche non autorisée");
    });
  });
});

describe("useRmcInscriptionApi", () => {
  test("doit vider les résultats si rmcInscriptionAutorisee retourne false", () => {
    vi.spyOn(RMCUtils, "rmcActeAutorisee").mockReturnValue(false);

    const setDataRMCInscription = vi.fn();
    const setDataTableauRMCInscription = vi.fn();
    const setIdFicheActe = vi.fn();

    const { result } = renderHook(() => useRmcInscriptionApi(setDataRMCInscription, setDataTableauRMCInscription, setIdFicheActe));

    act(() => {
      result.current.appellerRmcInscriptionApi(formulaireValideMaisNonAutorise_1, "0-10");
    });

    expect(setDataRMCInscription).toHaveBeenCalledWith([]);
    expect(setDataTableauRMCInscription).toHaveBeenCalledWith(PARAMS_TABLEAU_VIDE);
    expect(setIdFicheActe).not.toHaveBeenCalled();
  });

  test("doit tester l'apresErreur", async () => {
    AfficherMessage.erreur = vi.fn();

    vi.spyOn(RMCUtils, "rmcActeAutorisee").mockReturnValue(true);

    const setDataRMCInscription = vi.fn();
    const setDataTableauRMCInscription = vi.fn();
    const setIdFicheActe = vi.fn();

    MockApi.deployer(
      CONFIG_POST_RMC_INSCRIPTION,
      {},
      { codeHttp: 500, erreurs: [{ message: "Erreur simulée", type: "BusinessException", code: "FCT_16108" }] }
    );

    const { result } = renderHook(() => useRmcInscriptionApi(setDataRMCInscription, setDataTableauRMCInscription, setIdFicheActe));

    act(() => {
      result.current.appellerRmcInscriptionApi(formulaireValideMaisNonAutorise_2, "0-10");
    });

    await waitFor(() => {
      expect(AfficherMessage.erreur).toHaveBeenCalledWith("Impossible de récupérer les inscriptions via la recherche multi-critères", {
        fermetureAuto: true,
        erreurs: undefined
      });
    });

    MockApi.debugAppels();
    MockApi.stopMock();
    vi.clearAllMocks();
  });
});
