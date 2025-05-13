import { CONFIG_PATCH_ID_ACTE_SUIVI_DOSSIER } from "@api/configurations/etatCivil/acte/transcription/PatchIdActeSuiviDossierConfigApi";
import { CONFIG_PATCH_PROJET_ACTE_TRANSCRIPTION } from "@api/configurations/etatCivil/acte/transcription/PatchProjetActeTranscriptionConfigApi";
import { CONFIG_POST_PROJET_ACTE_TRANSCRIPTION } from "@api/configurations/etatCivil/acte/transcription/PostProjetActeTranscriptionConfigApi";
import { CONFIG_PATCH_STATUT_REQUETE_CREATION } from "@api/configurations/requete/creation/PatchStatutRequeteCreationConfigApi";
import TRAITEMENT_ENREGISTRER_PROJET_ACTE_TRANSCRIT from "@api/traitements/projetActe/transcription/TraitementEnregistrerProjetActeTranscrit";
import { MockApi } from "@mock/appelsApi/MockApi";
import { IProjetActeTranscritDto, ProjetActeTranscrit } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/ProjetActeTranscrit";
import { IProjetActeTranscritForm, ProjetTranscriptionForm } from "@model/form/creation/transcription/IProjetActeTranscritForm";
import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach } from "node:test";
import { afterEach, describe, expect, test, vi } from "vitest";

describe.skip("TRAITEMENT_ENREGISTRER_PROJET_ACTE_TRANSCRIT", () => {
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
        projetActe: { acteEtranger: {} } as any as ProjetActeTranscrit,
        valeursSaisies: {} as IProjetActeTranscritForm
      });
    });

    expect(appelPostProjetActeTranscription).not.toHaveBeenCalled();
    expect(terminerTraitement).toHaveBeenCalled();
  });

  test("DOIT appeler la méthode patch QUAND le statut de la requête est à signer", async () => {
    const { result } = renderHook(() => TRAITEMENT_ENREGISTRER_PROJET_ACTE_TRANSCRIT.Lancer(terminerTraitement));
    const projetActeMock = { id: "Projet Test" } as IProjetActeTranscritDto;

    MockApi.deployer(CONFIG_PATCH_PROJET_ACTE_TRANSCRIPTION, { body: projetActeMock }, { data: { id: "4448" } as IProjetActeTranscritDto });

    const mockApi = MockApi.getMock();

    act(() => {
      result.current.lancer({
        idRequete: "12345",
        idSuiviDossier: "123",
        projetActe: { id: "345" } as any as ProjetActeTranscrit,
        valeursSaisies: {} as IProjetActeTranscritForm
      });
    });

    await waitFor(() => {
      expect(mockApi.history.patch.length).toBe(1);
    });

    MockApi.stopMock();
  });

  test.skip("DOIT lancer le post du projet d'acte", async () => {
    const { result } = renderHook(() => TRAITEMENT_ENREGISTRER_PROJET_ACTE_TRANSCRIT.Lancer(terminerTraitement));
    const projetActeFormMock = { acteEtranger: {} } as IProjetActeTranscritForm;
    const projetActeFormMock2 = { acteEtranger: {} } as ProjetActeTranscrit;

    MockApi.deployer(
      CONFIG_POST_PROJET_ACTE_TRANSCRIPTION,
      { body: ProjetTranscriptionForm.versDtoPost(projetActeFormMock) },
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
        projetActe: projetActeFormMock2,
        valeursSaisies: {} as IProjetActeTranscritForm,
        idRequete: "789"
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
