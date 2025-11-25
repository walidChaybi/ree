import { CONFIG_GET_MES_REQUETES_CONSULAIRES } from "@api/configurations/requete/consulaire/GetMesRequetesConsulairesConfigApi";
import { MockApi } from "@mock/appelsApi/MockApi";
import { mesRequetesConsulaire } from "@mock/data/requeteCreationTranscription";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import TableauMesRequetesConsulaire from "../../../../../composants/pages/requetesConsulaire/mesRequetes/TableauMesRequetesConsulaire";
import LiensRECE from "../../../../../router/LiensRECE";
import {
  INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_PRISE_EN_CHARGE,
  INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_SAISIE_PROJET
} from "../../../../../router/infoPages/InfoPagesEspaceConsulaire";
import AfficherMessage from "../../../../../utils/AfficherMessage";

vi.mock("@util/messageManager", () => ({
  default: {
    showErrorAndClose: vi.fn()
  }
}));

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
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
    MockApi.deployer(
      CONFIG_GET_MES_REQUETES_CONSULAIRES,
      { regexp: true },
      {
        data: mesRequetesConsulaire,
        headers: { "content-range": "0/4" }
      }
    );
  });

  afterEach(() => {
    MockApi.stopMock();
  });

  test("doit appeler l'API et naviguer lorsque le statut est 'À Traiter'", async () => {
    render(<TableauMesRequetesConsulaire />);

    await waitFor(() => expect(MockApi.getMock().history.get.length).toStrictEqual(1));

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
        LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_SAISIE_PROJET.url, {
          idRequeteParam: "91d13aad-c023-4a6d-b88c-18f277061ca3"
        })
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
        LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_PRISE_EN_CHARGE.url, {
          idRequeteParam: "91d13aad-c023-4a6d-b88c-18f277061ca2"
        })
      );
    });
  });

  test("doit afficher un message d'erreur en cas de status non reconnu", async () => {
    AfficherMessage.erreur = vi.fn();

    render(<TableauMesRequetesConsulaire />);

    await waitFor(() => {
      const numeroDossier = screen.getByText("000000");
      expect(numeroDossier).toBeDefined();

      const requetePriseEnCharge = screen.getByText("000000").closest("tr");
      fireEvent.click(requetePriseEnCharge!);

      expect(AfficherMessage.erreur).toHaveBeenCalledWith('Statut non reconnu: "undefined"', { fermetureAuto: true });
    });
  });
});
