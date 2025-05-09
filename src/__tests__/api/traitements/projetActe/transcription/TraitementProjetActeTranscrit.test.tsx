import { CONFIG_PATCH_ID_ACTE_SUIVI_DOSSIER } from "@api/configurations/etatCivil/acte/transcription/PatchIdActeSuiviDossierConfigApi";
import { CONFIG_PATCH_PROJET_ACTE_TRANSCRIPTION } from "@api/configurations/etatCivil/acte/transcription/PatchProjetActeTranscriptionConfigApi";
import { CONFIG_POST_PROJET_ACTE_TRANSCRIPTION } from "@api/configurations/etatCivil/acte/transcription/PostProjetActeTranscriptionConfigApi";
import { CONFIG_PATCH_STATUT_REQUETE_CREATION } from "@api/configurations/requete/creation/PatchStatutRequeteCreationConfigApi";
import TRAITEMENT_ENREGISTRER_PROJET_ACTE_TRANSCRIT from "@api/traitements/projetActe/transcription/TraitementEnregistrerProjetActeTranscrit";
import { MockApi } from "@mock/appelsApi/MockApi";
import { IProjetActeTranscritFormDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/IProjetActeTranscritFormDto";
import { IProjetActeTranscritDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/ProjetActeTranscrit";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach } from "node:test";
import { afterEach, describe, expect, test, vi } from "vitest";

describe("TRAITEMENT_ENREGISTRER_PROJET_ACTE_TRANSCRIT", () => {
  const terminerTraitement = vi.fn();
  const appelPostProjetActeTranscription = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });
  test("DOIT terminer sans appeler les API QUAND l'id de la requête n'est pas présent", () => {
    const { result } = renderHook(() => TRAITEMENT_ENREGISTRER_PROJET_ACTE_TRANSCRIT.Lancer(terminerTraitement));

    act(() => {
      result.current.lancer({
        idSuiviDossier: "123",
        idRequete: "",
        projetActe: {} as IProjetActeTranscritFormDto,
        statutRequete: StatutRequete.EN_TRAITEMENT
      });
    });

    expect(appelPostProjetActeTranscription).not.toHaveBeenCalled();
    expect(terminerTraitement).toHaveBeenCalled();
  });

  test("DOIT appeler la méthode patch QUAND le statut de la requête est à signer", async () => {
    const { result } = renderHook(() => TRAITEMENT_ENREGISTRER_PROJET_ACTE_TRANSCRIT.Lancer(terminerTraitement));
    const projetActeMock = { id: "Projet Test" } as IProjetActeTranscritFormDto;

    MockApi.deployer(CONFIG_PATCH_PROJET_ACTE_TRANSCRIPTION, { body: projetActeMock }, { data: { id: "4448" } as IProjetActeTranscritDto });

    const mockApi = MockApi.getMock();

    act(() => {
      result.current.lancer({
        idRequete: "12345",
        idSuiviDossier: "123",
        projetActe: { idActe: "345" } as IProjetActeTranscritFormDto,
        statutRequete: StatutRequete.A_SIGNER
      });
    });

    await waitFor(() => {
      expect(mockApi.history.patch.length).toBe(1);
    });

    MockApi.stopMock();
  });

  test.skip("DOIT lancer le post du projet d'acte", async () => {
    const { result } = renderHook(() => TRAITEMENT_ENREGISTRER_PROJET_ACTE_TRANSCRIT.Lancer(terminerTraitement));
    const projetActeFormMock = { idActe: "Projet Test" } as IProjetActeTranscritFormDto;

    MockApi.deployer(
      CONFIG_POST_PROJET_ACTE_TRANSCRIPTION,
      { body: projetActeFormMock },
      { data: { id: "4448" } as IProjetActeTranscritDto }
    );

    MockApi.deployer(CONFIG_PATCH_STATUT_REQUETE_CREATION, {
      path: { idRequete: "789" },
      query: { statut: "A_SIGNER" }
    });

    MockApi.deployer(CONFIG_PATCH_ID_ACTE_SUIVI_DOSSIER);

    const mockApi = MockApi.getMock();

    act(() => {
      result.current.lancer({
        idSuiviDossier: "12563",
        projetActe: projetActeFormMock,
        idRequete: "789",
        statutRequete: StatutRequete.EN_TRAITEMENT
      });
    });

    await waitFor(() => {
      expect(mockApi.history.post.length).toBe(1);
      expect(mockApi.history.patch.length).toBe(2);

      expect(mockApi.history.patch[0].url).toContain(`statut=A_SIGNER`);
      expect(mockApi.history.patch[1].url).toContain(`/suiviDossier/12563`);
      expect(mockApi.history.patch[1].url).toContain(`/acte/4448`);
    });

    MockApi.stopMock();
  });
});
