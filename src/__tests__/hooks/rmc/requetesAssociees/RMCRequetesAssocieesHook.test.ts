import { CONFIG_POST_RMC_REQUETE } from "@api/configurations/requete/rmc/PostRMCRequeteConfigApi";
import { MockApi } from "@mock/appelsApi/MockApi";
import { MOCK_REQUETE_TABLEAU_RMC_CREATION } from "@mock/data/RMCRequete";
import { EStatutRequete } from "@model/requete/enum/StatutRequete";
import { ICriteresRMCRequete } from "@model/rmc/requete/ICriteresRMCRequete";
import RequeteAssociee from "@model/rmc/requete/RequeteAssociee";
import { act, renderHook, waitFor } from "@testing-library/react";
import { NB_LIGNES_PAR_APPEL_REQUETE_ASSOCIEES } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { describe, expect, test, vi } from "vitest";
import { useRMCRequetesAssociees } from "../../../../hooks/rmc/requetesAssociees/RMCRequetesAssocieesHook";
import AfficherMessage from "../../../../utils/AfficherMessage";
import TableauUtils from "../../../../utils/TableauUtils";

const MOCK_CRITERES_RECHERCHE_REQUETE: ICriteresRMCRequete = {
  range: `0-${NB_LIGNES_PAR_APPEL_REQUETE_ASSOCIEES}`,
  valeurs: {
    datesDebutFinAnnee: { dateDebut: { annee: "", mois: "", jour: "" }, dateFin: { annee: "", mois: "", jour: "" } },
    requete: {
      numeroRequete: "",
      typeRequete: "",
      sousTypeRequete: "",
      statutRequete: "" as keyof typeof EStatutRequete,
      numeroTeledossier: "",
      numeroDossierNational: ""
    },
    titulaire: {
      nom: "Rossi",
      prenom: "",
      paysNaissance: "",
      dateNaissance: {}
    },
    requerant: {}
  }
};

describe("RMCRequetesAssocieesHook", () => {
  let setTableauRMC = vi.fn();

  beforeEach(() => {
    setTableauRMC = vi.fn();
  });

  test("DOIT suite à l'appel API remplir le tableau QUAND la requete contient un titulaire", async () => {
    const headers = { "content-range": "0/" + [MOCK_REQUETE_TABLEAU_RMC_CREATION].length };
    MockApi.deployer(
      CONFIG_POST_RMC_REQUETE,
      {
        query: { range: MOCK_CRITERES_RECHERCHE_REQUETE.range }
      },
      {
        data: [MOCK_REQUETE_TABLEAU_RMC_CREATION],
        headers
      }
    );

    const { result } = renderHook(() => useRMCRequetesAssociees(setTableauRMC));

    act(() => {
      result.current.setCriteresRechercheRequete({
        range: MOCK_CRITERES_RECHERCHE_REQUETE.range,
        valeurs: MOCK_CRITERES_RECHERCHE_REQUETE.valeurs
      });
    });

    expect(result.current.enAttenteDeReponseApiRmcRequete).toBe(true);
    await waitFor(() => {
      expect(result.current.enAttenteDeReponseApiRmcRequete).toBe(false);
    });

    expect(setTableauRMC).toHaveBeenCalledWith({
      requetesAssociees: [MOCK_REQUETE_TABLEAU_RMC_CREATION]
        ?.map(requete => RequeteAssociee.depuisDto(requete))
        .filter(requete => requete !== null),
      nombreTotalLignes: TableauUtils.recupererNombreTotalLignesDepuisHeaders(headers)
    });

    MockApi.stopMock();
  });

  test("DOIT afficher un message d'erreur et ne pas modifier le tableau QUAND l'appel API échoue", async () => {
    const onErreur = vi.fn();
    const afficherErreurSpy = vi.spyOn(AfficherMessage, "erreur").mockImplementation(() => {});

    MockApi.deployer(
      CONFIG_POST_RMC_REQUETE,
      {
        query: { range: MOCK_CRITERES_RECHERCHE_REQUETE.range }
      },
      {
        codeHttp: 500
      }
    );

    const { result } = renderHook(() => useRMCRequetesAssociees(setTableauRMC));

    act(() => {
      result.current.setCriteresRechercheRequete({
        range: MOCK_CRITERES_RECHERCHE_REQUETE.range,
        valeurs: MOCK_CRITERES_RECHERCHE_REQUETE.valeurs,
        onErreur
      });
    });

    expect(result.current.enAttenteDeReponseApiRmcRequete).toBe(true);
    await waitFor(() => {
      expect(result.current.enAttenteDeReponseApiRmcRequete).toBe(false);
    });

    expect(setTableauRMC).not.toHaveBeenCalled();

    expect(afficherErreurSpy).toHaveBeenCalledWith(
      "Impossible de récupérer les requetes de la recherche multi-critères",
      expect.any(Object)
    );

    expect(onErreur).toHaveBeenCalled();

    MockApi.stopMock();
    afficherErreurSpy.mockRestore();
  });

  test("DOIT ouvrir la popin QUAND on appelle gererClicNouvelleRMC", () => {
    const { result } = renderHook(() => useRMCRequetesAssociees(setTableauRMC));

    expect(result.current.estPopinOuverte).toBe(false);

    act(() => {
      result.current.gererClicNouvelleRMC();
    });

    expect(result.current.estPopinOuverte).toBe(true);
  });

  test("DOIT ouvrir la popin QUAND on appelle gererClicNouvelleRMC", () => {
    const { result } = renderHook(() => useRMCRequetesAssociees(setTableauRMC));

    act(() => {
      result.current.gererClicNouvelleRMC();
    });
    expect(result.current.estPopinOuverte).toBe(true);
  });

  test("DOIT fermer la popin QUAND on appelle onFermeturePopin", () => {
    const { result } = renderHook(() => useRMCRequetesAssociees(setTableauRMC));

    act(() => {
      result.current.gererClicNouvelleRMC();
    });
    expect(result.current.estPopinOuverte).toBe(true);

    act(() => {
      result.current.onFermeturePopin(false);
    });
    expect(result.current.estPopinOuverte).toBe(false);
  });
});
