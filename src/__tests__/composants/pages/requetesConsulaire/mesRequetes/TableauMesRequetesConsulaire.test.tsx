import { getTableauRequetesConsulaires } from "@api/appels/requeteApi";
import { mesRequetesConsulaire } from "@mock/data/requeteCreationTranscription";
import {
  URL_MES_REQUETES_CONSULAIRE_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_CONSULAIRE_TRANSCRIPTION_APERCU_REQUETE_SAISIE_PROJET_ID
} from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import messageManager from "@util/messageManager";
import { beforeEach, describe, expect, test, vi } from "vitest";
import TableauMesRequetesConsulaire from "../../../../../composants/pages/requetesConsulaire/mesRequetes/TableauMesRequetesConsulaire";

vi.mock("@util/messageManager", () => ({
  default: {
    showErrorAndClose: vi.fn()
  }
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

const mockNavigate = vi.fn();

vi.mock("@api/appels/requeteApi", async () => {
  return {
    usePostCreationActionEtMiseAjourStatut: () => ({
      postCreationActionEtMiseAjourStatut: vi.fn().mockResolvedValue({ data: "" }),
      enAttenteDeReponseApi: false
    }),
    getTableauRequetesConsulaires: vi.fn()
  };
});

describe("TableauMesRequetesConsulaire ", () => {
  beforeEach(() => {
    vi.mocked(getTableauRequetesConsulaires).mockResolvedValue({
      body: { data: mesRequetesConsulaire },
      headers: { "content-range": "0/4" }
    });
  });

  test("doit appeler l'API et naviguer lorsque le statut est 'À Traiter'", async () => {
    render(<TableauMesRequetesConsulaire />);

    await waitFor(() => expect(getTableauRequetesConsulaires).toHaveBeenCalled());

    const numeroDossier = await waitFor(() => screen.getByText("111111"));
    expect(numeroDossier).toBeDefined();

    const requeteATraiter = screen.getByText(/À traiter/).closest("tr");
    fireEvent.click(requeteATraiter!);
  });

  test("doit appeler l'API et naviguer lorsque le statut est 'En Traitement'", async () => {
    render(<TableauMesRequetesConsulaire />);

    await waitFor(() => {
      const numeroDossier = screen.getByText("777777");
      expect(numeroDossier).toBeDefined();

      const requeteEnTraitement = screen.getByText(/En traitement/).closest("tr");
      fireEvent.click(requeteEnTraitement!);

      expect(mockNavigate).toHaveBeenCalledWith(
        URL_MES_REQUETES_CONSULAIRE_TRANSCRIPTION_APERCU_REQUETE_SAISIE_PROJET_ID.replace(
          ":idRequeteParam",
          "91d13aad-c023-4a6d-b88c-18f277061ca3"
        )
      );
    });
  });

  test("doit naviguer immédiatement lorsque le statut est 'Prise en charge'", async () => {
    render(<TableauMesRequetesConsulaire />);

    await waitFor(() => {
      const numeroDossier = screen.getByText("888888");
      expect(numeroDossier).toBeDefined();

      const requetePriseEnCharge = screen.getAllByText("Prise en charge")[0].closest("tr");
      fireEvent.click(requetePriseEnCharge!);

      expect(mockNavigate).toHaveBeenCalledWith(
        URL_MES_REQUETES_CONSULAIRE_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID.replace(
          ":idRequeteParam",
          "91d13aad-c023-4a6d-b88c-18f277061ca2"
        )
      );
    });
  });

  test("doit afficher un message d'erreur en cas de status non reconnu", async () => {
    const mockShowErrorAndClose = vi.fn();
    vi.mocked(messageManager.showErrorAndClose).mockImplementation(mockShowErrorAndClose);

    render(<TableauMesRequetesConsulaire />);

    await waitFor(() => {
      const numeroDossier = screen.getByText("000000");
      expect(numeroDossier).toBeDefined();

      const requetePriseEnCharge = screen.getByText("000000").closest("tr");
      fireEvent.click(requetePriseEnCharge!);

      expect(mockShowErrorAndClose).toHaveBeenCalledWith('Statut non reconnu: "undefined"');
    });
  });
});
