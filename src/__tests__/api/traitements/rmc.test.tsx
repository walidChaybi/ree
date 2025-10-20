import { CONFIG_POST_RMC_ACTE } from "@api/configurations/etatCivil/acte/PostRMCActeConfigApi";
import { CONFIG_POST_RMC_AUTO_ACTE } from "@api/configurations/etatCivil/acte/PostRMCAutoActeConfigApi";
import { CONFIG_POST_RMC_AUTO_INSCRIPTION } from "@api/configurations/etatCivil/acte/PostRMCAutoInscriptionConfigApi";
import { CONFIG_POST_RMC_INSCRIPTION } from "@api/configurations/etatCivil/acte/PostRMCInscriptionConfigApi";
import TRAITEMENT_RMC_ACTES_INSCRIPTIONS from "@api/traitements/rmc/TraitementRMCActesInscriptions";
import TRAITEMENT_RMC_AUTO_ACTES_INSCRIPTIONS from "@api/traitements/rmc/TraitementRMCAutoActesInscriptions";
import { MockApi } from "@mock/appelsApi/MockApi";
import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { RMCActeInscriptionForm } from "@model/form/rmc/RMCActeInscriptionForm";
import { ITitulaireRequete } from "@model/requete/ITitulaireRequete";
import { ICriteresRMC } from "@model/rmc/commun/IRMCFormulaire";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { NB_LIGNES_PAR_APPEL_ACTE, NB_LIGNES_PAR_APPEL_INSCRIPTION } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import React, { useState } from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import useTraitementApi from "../../../hooks/api/TraitementApiHook";
import AfficherMessage from "../../../utils/AfficherMessage";

describe("Test TraitementRMCAutoActesInscriptions", () => {
  const ComposantAvecTraitement: React.FC<{ titulaires: ITitulaireRequete[] }> = ({ titulaires }) => {
    const { lancerTraitement } = useTraitementApi(TRAITEMENT_RMC_AUTO_ACTES_INSCRIPTIONS);
    const [etatDuTraitement, setEtatDuTraitement] = useState<"enCours" | "succes" | "erreur">("enCours");

    return (
      <>
        <button
          onClick={() =>
            lancerTraitement({
              parametres: { titulairesRequete: titulaires },
              apresSucces: _ => setEtatDuTraitement("succes"),
              apresErreur: _ => setEtatDuTraitement("erreur")
            })
          }
        >
          Lancer le traitement
        </button>
        {etatDuTraitement === "succes" && <span>Succès</span>}
        {etatDuTraitement === "erreur" && <span>Erreur</span>}
      </>
    );
  };

  const titulairesRequete: ITitulaireRequete[] = [
    {
      id: "idTitulaire1",
      position: 1,
      sexe: "",
      nationalite: Nationalite.INCONNUE,
      nomNaissance: "titulaire1"
    },
    {
      id: "idTitulaire2",
      position: 2,
      sexe: "",
      nationalite: Nationalite.INCONNUE,
      nomNaissance: "titulaire2"
    }
  ];

  test("DOIT appeler la RMC auto QUAND les critères sont remplis", async () => {
    MockApi.deployer(
      CONFIG_POST_RMC_AUTO_ACTE,
      { query: { range: `0-${NB_LIGNES_PAR_APPEL_ACTE}` } },
      {
        data: []
      }
    ).deployer(
      CONFIG_POST_RMC_AUTO_INSCRIPTION,
      { query: { range: `0-${NB_LIGNES_PAR_APPEL_INSCRIPTION}` } },
      {
        data: []
      }
    );
    render(<ComposantAvecTraitement titulaires={titulairesRequete} />);

    fireEvent.click(screen.getByText("Lancer le traitement"));

    await waitFor(() => {
      expect(screen.getByText("Succès")).toBeDefined();
    });
    expect(MockApi.getMock().history.post.length).toStrictEqual(2);

    MockApi.stopMock();
  });

  test("DOIT être en erreur QUAND les appels échouent", async () => {
    MockApi.deployer(
      CONFIG_POST_RMC_AUTO_ACTE,
      { query: { range: `0-${NB_LIGNES_PAR_APPEL_ACTE}` } },
      {
        codeHttp: 500
      }
    ).deployer(
      CONFIG_POST_RMC_AUTO_INSCRIPTION,
      { query: { range: `0-${NB_LIGNES_PAR_APPEL_INSCRIPTION}` } },
      {
        codeHttp: 500
      }
    );
    render(<ComposantAvecTraitement titulaires={titulairesRequete} />);

    fireEvent.click(screen.getByText("Lancer le traitement"));

    await waitFor(() => {
      expect(screen.getByText("Erreur")).toBeDefined();
    });
    expect(MockApi.getMock().history.post.length).toStrictEqual(2);

    MockApi.stopMock();
  });

  test("NE DOIT PAS effectuer d'appel API QUAND aucun titulaire n'est renseigné", async () => {
    MockApi.deployer(
      CONFIG_POST_RMC_AUTO_ACTE,
      { query: { range: `0-${NB_LIGNES_PAR_APPEL_ACTE}` } },
      {
        data: []
      }
    ).deployer(
      CONFIG_POST_RMC_AUTO_INSCRIPTION,
      { query: { range: `0-${NB_LIGNES_PAR_APPEL_INSCRIPTION}` } },
      {
        data: []
      }
    );
    render(<ComposantAvecTraitement titulaires={[]} />);

    fireEvent.click(screen.getByText("Lancer le traitement"));

    await waitFor(() => {
      expect(screen.getByText("Succès")).toBeDefined();
    });
    expect(MockApi.getMock().history.post.length).toStrictEqual(0);

    MockApi.stopMock();
  });

  test("DOIT afficher un seul message d'info QUAND trop de résultats sont remontés", async () => {
    const afficherErreur = vi.fn();
    AfficherMessage.info = afficherErreur;

    MockApi.deployer(
      CONFIG_POST_RMC_AUTO_ACTE,
      { query: { range: `0-${NB_LIGNES_PAR_APPEL_ACTE}` } },
      {
        codeHttp: 413
      }
    ).deployer(
      CONFIG_POST_RMC_AUTO_INSCRIPTION,
      { query: { range: `0-${NB_LIGNES_PAR_APPEL_INSCRIPTION}` } },
      {
        codeHttp: 413
      }
    );
    render(<ComposantAvecTraitement titulaires={titulairesRequete} />);

    fireEvent.click(screen.getByText("Lancer le traitement"));

    await waitFor(() => {
      expect(screen.getByText("Erreur")).toBeDefined();
    });
    expect(MockApi.getMock().history.post.length).toStrictEqual(2);
    expect(afficherErreur).toHaveBeenCalledOnce();
    MockApi.stopMock();
  });
});

describe("Test TraitementRMCActesInscriptions", () => {
  beforeEach(() => {
    MockApi.deployer(
      CONFIG_POST_RMC_ACTE,
      { query: { range: `0-${NB_LIGNES_PAR_APPEL_ACTE}` } },
      {
        data: []
      }
    ).deployer(
      CONFIG_POST_RMC_INSCRIPTION,
      { query: { range: `0-${NB_LIGNES_PAR_APPEL_INSCRIPTION}` } },
      {
        data: []
      }
    );
  });

  afterEach(() => {
    MockApi.stopMock();
  });

  const ComposantAvecTraitement: React.FC<{ valeursFormulaire: ICriteresRMC }> = ({ valeursFormulaire }) => {
    const { lancerTraitement } = useTraitementApi(TRAITEMENT_RMC_ACTES_INSCRIPTIONS);
    const [etatDuTraitement, setEtatDuTraitement] = useState<"enCours" | "succes" | "erreur">("enCours");

    return (
      <>
        <button
          onClick={() =>
            lancerTraitement({
              parametres: { valeursFormulaire },
              apresSucces: _ => setEtatDuTraitement("succes"),
              apresErreur: _ => setEtatDuTraitement("erreur")
            })
          }
        >
          Lancer le traitement
        </button>
        {etatDuTraitement === "succes" && <span>Succès</span>}
        {etatDuTraitement === "erreur" && <span>Erreur</span>}
      </>
    );
  };

  test("DOIT appeler la RMC QUAND les critères sont remplis", async () => {
    render(<ComposantAvecTraitement valeursFormulaire={RMCActeInscriptionForm.valeursInitiales()} />);

    fireEvent.click(screen.getByText("Lancer le traitement"));

    await waitFor(() => {
      expect(screen.getByText("Succès")).toBeDefined();
    });
    expect(MockApi.getMock().history.post.length).toStrictEqual(2);
  });
});
