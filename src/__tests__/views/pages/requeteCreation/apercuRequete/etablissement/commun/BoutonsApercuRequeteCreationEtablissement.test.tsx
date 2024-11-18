import { requeteCreationEtablissement } from "@mock/data/requeteCreation";
import { AvancementProjetActe } from "@model/requete/enum/AvancementProjetActe";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { RMCRequetePage } from "@pages/rechercheMultiCriteres/requete/RMCRequetePage";
import { BoutonsApercuRequeteCreationEtablissement } from "@pages/requeteCreation/apercuRequete/etablissement/commun/BoutonsApercuRequeteCreationEtablissement";
import EspaceCreationPage from "@pages/requeteCreation/espaceCreation/EspaceCreationPage";
import {
  PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE,
  URL_MES_REQUETES_CREATION,
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID,
  URL_RECHERCHE_REQUETE,
  URL_REQUETES_CREATION_SERVICE
} from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { describe, expect, test } from "vitest";
import { createTestingRouter } from "../../../../../../__tests__utils__/testsUtil";
import { localStorageFeatureFlagMock } from "../../../../../../setupTests";

describe("BoutonsApercuCreationEtablissement - ", () => {
  test("DOIT rediriger vers Mes requêtes de création QUAND le bouton affiche Retour mes requêtes", async () => {
    const requete = {
      ...requeteCreationEtablissement,
      statutCourant: { statut: StatutRequete.A_TRAITER, dateEffet: 0 }
    };
    const router = createTestingRouter(
      [
        {
          path: `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE}`,
          element: <BoutonsApercuRequeteCreationEtablissement requete={requete} />
        },
        {
          path: URL_MES_REQUETES_CREATION,
          element: <EspaceCreationPage />
        }
      ],
      [`${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE}`]
    );

    render(<RouterProvider router={router} />);

    const boutonRetour: HTMLButtonElement = screen.getByText("Retour mes requêtes de création");
    fireEvent.click(boutonRetour);

    await waitFor(() => {
      expect(router.state.location.pathname).toBe(URL_MES_REQUETES_CREATION);
    });
  });

  test("DOIT rediriger vers Requêtes de création de mon service QUAND le bouton affiche Retour requêtes de service", async () => {
    const requete = {
      ...requeteCreationEtablissement,
      statutCourant: { statut: StatutRequete.A_TRAITER, dateEffet: 0 }
    };
    const router = createTestingRouter(
      [
        {
          path: `${URL_REQUETES_CREATION_SERVICE}/${PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE}`,
          element: <BoutonsApercuRequeteCreationEtablissement requete={requete} />
        },
        {
          path: URL_REQUETES_CREATION_SERVICE,
          element: <EspaceCreationPage />
        }
      ],
      [`${URL_REQUETES_CREATION_SERVICE}/${PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE}`]
    );

    render(<RouterProvider router={router} />);

    const boutonRetour: HTMLButtonElement = screen.getByText("Retour requêtes de création de mon service");
    fireEvent.click(boutonRetour);

    await waitFor(() => {
      expect(router.state.location.pathname).toBe(URL_REQUETES_CREATION_SERVICE);
    });
  });

  test("DOIT rediriger vers Rechercher une requête QUAND le bouton affiche Retour recherche requêtes", async () => {
    const requete = {
      ...requeteCreationEtablissement,
      statutCourant: { statut: StatutRequete.A_TRAITER, dateEffet: 0 }
    };
    const router = createTestingRouter(
      [
        {
          path: `${URL_RECHERCHE_REQUETE}/${PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE}`,
          element: <BoutonsApercuRequeteCreationEtablissement requete={requete} />
        },
        {
          path: URL_RECHERCHE_REQUETE,
          element: <RMCRequetePage />
        }
      ],
      [`${URL_RECHERCHE_REQUETE}/${PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE}`]
    );

    render(<RouterProvider router={router} />);

    const boutonRetour: HTMLButtonElement = screen.getByText("Retour recherche requête");
    fireEvent.click(boutonRetour);

    await waitFor(() => {
      expect(router.state.location.pathname).toBe(URL_RECHERCHE_REQUETE);
    });
  });

  test("NE DOIT PAS afficher le bouton 'SIGNER' QUAND le feature flag est désactivé.", async () => {
    localStorageFeatureFlagMock.setItem("FF_SIGNER_ACTE_ETABLISSEMENT", "false");

    const mockRequete = {
      ...requeteCreationEtablissement,
      statutCourant: { statut: StatutRequete.A_TRAITER, dateEffet: 0 }
    };
    const router = createTestingRouter(
      [
        {
          path: `${URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID}/${PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE}`,
          element: (
            <BoutonsApercuRequeteCreationEtablissement
              requete={mockRequete}
              conditionAffichageBoutonsApercuActe={true}
              avancement={AvancementProjetActe.ACTE_A_SIGNER}
              estRegistreOuvert={true}
              estFormulaireModifie={false}
            />
          )
        }
      ],
      [`${URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID}/${PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE}`]
    );

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.queryByTitle("SIGNER")).toBeNull();
    });
    localStorageFeatureFlagMock.setItem("FF_SIGNER_ACTE_ETABLISSEMENT", "true");
  });

  test.each([
    {
      avancement: AvancementProjetActe.A_SAISIR,
      afficherBoutonSigner: false
    },
    {
      avancement: AvancementProjetActe.EN_COURS,
      afficherBoutonSigner: false
    },
    {
      avancement: AvancementProjetActe.VALIDE,
      afficherBoutonSigner: false
    },
    {
      avancement: AvancementProjetActe.ACTE_A_SIGNER,
      afficherBoutonSigner: true
    }
  ])("DOIT afficher le bouton 'SIGNER' QUAND l'avancement du projet est '$avancement'.", async params => {
    const mockRequete = {
      ...requeteCreationEtablissement,
      statutCourant: { statut: StatutRequete.A_TRAITER, dateEffet: 0 }
    };
    const router = createTestingRouter(
      [
        {
          path: `${URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID}/${PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE}`,
          element: (
            <BoutonsApercuRequeteCreationEtablissement
              requete={mockRequete}
              conditionAffichageBoutonsApercuActe={true}
              avancement={params.avancement}
              estRegistreOuvert={true}
              estFormulaireModifie={false}
            />
          )
        }
      ],
      [`${URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID}/${PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE}`]
    );

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      const boutonSigner = screen.queryByTitle("SIGNER");
      if (params.afficherBoutonSigner) {
        expect(boutonSigner).toBeDefined();
      } else {
        expect(boutonSigner).toBeNull();
      }
    });
  });

  test.each([
    {
      avancement: AvancementProjetActe.A_SAISIR,
      afficherBoutonValideLeProjet: false
    },
    {
      avancement: AvancementProjetActe.EN_COURS,
      afficherBoutonValideLeProjet: true
    },
    {
      avancement: AvancementProjetActe.VALIDE,
      afficherBoutonValideLeProjet: false
    },
    {
      avancement: AvancementProjetActe.ACTE_A_SIGNER,
      afficherBoutonValideLeProjet: false
    }
  ])("DOIT afficher le bouton 'VALIDER LE PROJET' QUAND l'avancement du projet est '$avancement'.", async params => {
    const mockRequete = {
      ...requeteCreationEtablissement,
      statutCourant: { statut: StatutRequete.A_TRAITER, dateEffet: 0 }
    };
    const router = createTestingRouter(
      [
        {
          path: `${URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID}/${PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE}`,
          element: (
            <BoutonsApercuRequeteCreationEtablissement
              requete={mockRequete}
              conditionAffichageBoutonsApercuActe={true}
              avancement={params.avancement}
              estRegistreOuvert={true}
              estFormulaireModifie={false}
            />
          )
        }
      ],
      [`${URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID}/${PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE}`]
    );

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      const boutonValiderLeProjet = screen.queryByTitle("Valider le projet d'acte");
      if (params.afficherBoutonValideLeProjet) {
        expect(boutonValiderLeProjet).toBeDefined();
      } else {
        expect(boutonValiderLeProjet).toBeNull();
      }
    });
  });

  test("NE DOIT PAS afficher le bouton SIGNER QUAND le projet n'est pas a signer", async () => {
    const mockRequete = {
      ...requeteCreationEtablissement,
      statutCourant: { statut: StatutRequete.A_TRAITER, dateEffet: 0 }
    };
    const router = createTestingRouter(
      [
        {
          path: `${URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID}/${PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE}`,
          element: (
            <BoutonsApercuRequeteCreationEtablissement
              requete={mockRequete}
              conditionAffichageBoutonsApercuActe={true}
              avancement={AvancementProjetActe.EN_COURS}
              estRegistreOuvert={true}
              estFormulaireModifie={false}
            />
          )
        }
      ],
      [`${URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID}/${PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE}`]
    );

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.queryByTitle("SIGNER")).toBeNull();
    });
  });

  test("DOIT avoir le bouton SIGNER clickable QUAND le registre est ouvert et que le document n'est pas modifie", async () => {
    const mockRequete = {
      ...requeteCreationEtablissement,
      statutCourant: { statut: StatutRequete.A_TRAITER, dateEffet: 0 }
    };
    const router = createTestingRouter(
      [
        {
          path: `${URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID}/${PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE}`,
          element: (
            <BoutonsApercuRequeteCreationEtablissement
              requete={mockRequete}
              conditionAffichageBoutonsApercuActe={true}
              avancement={AvancementProjetActe.ACTE_A_SIGNER}
              estRegistreOuvert={true}
              estFormulaireModifie={false}
            />
          )
        }
      ],
      [`${URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID}/${PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE}`]
    );

    render(<RouterProvider router={router} />);

    const boutonSigner = screen.queryByTitle("SIGNER") as HTMLInputElement;

    await waitFor(() => {
      expect(boutonSigner.disabled).not.toBeTruthy();
    });
  });

  test("NE DOIT PAS avoir le bouton SIGNER cliquable QUAND le registre n'est pas ouvert", async () => {
    const mockRequete = {
      ...requeteCreationEtablissement,
      statutCourant: { statut: StatutRequete.A_TRAITER, dateEffet: 0 }
    };
    const router = createTestingRouter(
      [
        {
          path: `${URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID}/${PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE}`,
          element: (
            <BoutonsApercuRequeteCreationEtablissement
              requete={mockRequete}
              conditionAffichageBoutonsApercuActe={true}
              avancement={AvancementProjetActe.ACTE_A_SIGNER}
              estRegistreOuvert={false}
              estFormulaireModifie={false}
            />
          )
        }
      ],
      [`${URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID}/${PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE}`]
    );

    render(<RouterProvider router={router} />);

    const boutonSigner = screen.queryByTitle("SIGNER") as HTMLInputElement;

    await waitFor(() => {
      expect(boutonSigner.disabled).toBeTruthy();
      expect(screen.getByText("Le registre n'est pas ouvert. Vous ne pouvez pas signer l'acte.")).toBeDefined();
    });
  });

  test("NE DOIT PAS avoir le bouton SIGNER cliquable QUAND le formulaire est modifié", async () => {
    const mockRequete = {
      ...requeteCreationEtablissement,
      statutCourant: { statut: StatutRequete.A_TRAITER, dateEffet: 0 }
    };
    const router = createTestingRouter(
      [
        {
          path: `${URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID}/${PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE}`,
          element: (
            <BoutonsApercuRequeteCreationEtablissement
              requete={mockRequete}
              conditionAffichageBoutonsApercuActe={true}
              avancement={AvancementProjetActe.ACTE_A_SIGNER}
              estRegistreOuvert={true}
              estFormulaireModifie={true}
            />
          )
        }
      ],
      [`${URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID}/${PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE}`]
    );

    render(<RouterProvider router={router} />);

    const boutonSigner = screen.queryByTitle("SIGNER") as HTMLInputElement;

    await waitFor(() => {
      expect(boutonSigner.disabled).toBeTruthy();
      expect(screen.getByText('Des données ont été modifiées. Veuillez cliquer sur le bouton "Actualiser et Visualiser".')).toBeDefined();
    });
  });
});
