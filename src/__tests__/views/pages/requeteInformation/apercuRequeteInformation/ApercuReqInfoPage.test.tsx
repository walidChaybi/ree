import { IOfficier } from "@model/agent/IOfficier";
import EspaceDelivrancePage from "@pages/requeteDelivrance/espaceDelivrance/EspaceDelivrancePage";
import { ApercuReqInfoPage } from "@pages/requeteInformation/apercuRequeteInformation/ApercuReqInfoPage";
import EspaceInformationPage from "@pages/requeteInformation/espaceInformation/EspaceReqInfoPage";
import { URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID, URL_MES_REQUETES_DELIVRANCE, URL_MES_REQUETES_INFORMATION } from "@router/ReceUrls";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { RouterProvider } from "react-router";
import { describe, expect, test, vi } from "vitest";
import { createTestingRouter, elementAvecContexte, mockFenetreFicheTestFunctions } from "../../../../__tests__utils__/testsUtil";
import { ReponseAppelDetailRequeteInformationSansCorbeilleAgent } from "../../../../mock/data/DetailRequeteInformation";
import { LISTE_UTILISATEURS } from "../../../../mock/data/ListeUtilisateurs";
import { NOMENCLATURE_REPONSE } from "../../../../mock/data/NomenclatureReponse";
import { userDroitConsulterPerimetreTousRegistres } from "../../../../mock/data/mockConnectedUserAvecDroit";
import { NORESULT, configRequetesInformation } from "../../../../mock/superagent-config/superagent-mock-requetes-information";

describe("Test ApercuReqInfoPage", () => {
  const utilisateurConnecte = {
    idUtilisateur: LISTE_UTILISATEURS[3].idUtilisateur
  } as IOfficier;

  configRequetesInformation[0].compteurRequeteInformation = 0;

  mockFenetreFicheTestFunctions();

  test("renders ApercuReqInfoPage", async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
          element: <ApercuReqInfoPage />
        },
        {
          path: URL_MES_REQUETES_INFORMATION,
          element: <EspaceInformationPage />
        }
      ],
      [getUrlWithParam(URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID, "bbd05aed-8ea9-45ba-a7d7-b8d55ad10856")]
    );

    render(elementAvecContexte(<RouterProvider router={router} />, utilisateurConnecte, LISTE_UTILISATEURS));

    await waitFor(() => {
      expect(screen.getByText(/Requête transférée à Benoît TANGUY - Le : 20\/10\/2021/i)).toBeDefined();
      expect(screen.getByText(/Résumé de la requête d'information/i)).toBeDefined();
      expect(screen.getByText(/Choix de la réponse/i)).toBeDefined();
      expect(screen.getByText(/Votre réponse/i)).toBeDefined();
      expect(screen.getByText(/Libellé de la réponse/i)).toBeDefined();
      expect(screen.getByText(/Mail de la réponse/i)).toBeDefined();
      // expect(screen.getByText(/Retour espace information/i)).toBeDefined();  TOREFACTO Faux positifs
      expect(screen.getByText(/Envoyer la réponse/i)).toBeDefined();
    });

    // Alimentation Résumé de la requête d'information
    const sousType = screen.getAllByText(/Sous-type/i);
    const sousTypeMajuscule = screen.getAllByText(/Sous-Type/i);
    const valeurSousType = screen.getByText("Information");
    const objet = screen.getByText("Objet");
    const valeurObjet = screen.getAllByText(/Divorce et\/ou séparation de corps/i);
    const complementObjet = screen.getByText(/Complément d'objet/i);
    const valeurComplementObjet = screen.getByText(/Je souhaite mettre à jour mes actes de l'état civil/i);
    const dateCreation = screen.getByText(/Date de création/i);
    const valeurDateCreation = screen.getByText("20/10/2021");
    const numeroReq = screen.getByText(/N° de la requête liée/i);
    const valeurNumeroReq = screen.getByText(/LRU1A5/i);
    const typeRequerant = screen.getByText(/Type requérant/i);
    const valeurTypeRequerant = screen.getByText(/Mandataire habilité/i);
    const identiteRequerant = screen.getByText(/Identité du requérant/i);
    const valeurIdentiteRequerant = screen.getByText(/TINE Clément/i);
    const titulaire = screen.getByText(/Identité du titulaire/i);
    const valeurTitulaire = screen.getByText(/BLANCHARD Mehdi/i);
    const dateNaissance = screen.getByText(/Date de naissance du titulaire/i);
    const valeurDateNaissance = screen.getByText(/11\/03\/2000/i);
    const lieuNaissance = screen.getByText(/Lieu de naissance du titulaire/i);
    const valeurLieuNaissance = screen.getByText(/Londres/i);
    const commentaire = screen.getByText(/Commentaire libre de l'usager/i);
    const valeurCommentaire = screen.getByText(
      "Je pense avoir oublier de mettre mon pays de naissance qui est l'espagne. Est-ce trop tard ? Monsieur XXX"
    );

    await waitFor(() => {
      expect(sousType.length).toEqual(1);
      expect(sousTypeMajuscule.length).toEqual(1);
      expect(valeurSousType).toBeDefined();
      expect(objet).toBeDefined();
      expect(valeurObjet.length).toEqual(2);
      expect(complementObjet).toBeDefined();
      expect(valeurComplementObjet).toBeDefined();
      expect(dateCreation).toBeDefined();
      expect(valeurDateCreation).toBeDefined();
      expect(numeroReq).toBeDefined();
      expect(valeurNumeroReq).toBeDefined();
      expect(typeRequerant).toBeDefined();
      expect(valeurTypeRequerant).toBeDefined();
      expect(identiteRequerant).toBeDefined();
      expect(valeurIdentiteRequerant).toBeDefined();
      expect(titulaire).toBeDefined();
      expect(valeurTitulaire).toBeDefined();
      expect(dateNaissance).toBeDefined();
      expect(valeurDateNaissance).toBeDefined();
      expect(lieuNaissance).toBeDefined();
      expect(valeurLieuNaissance).toBeDefined();
      expect(commentaire).toBeDefined();
      expect(valeurCommentaire).toBeDefined();
    });

    const boutonReponsesFiltrees = screen.getByText(/Réponses proposées/i);

    await waitFor(() => {
      expect(boutonReponsesFiltrees).toBeDefined();
    });

    fireEvent.click(boutonReponsesFiltrees);

    const boutonReponse1 = screen.getByText(NOMENCLATURE_REPONSE[0].libelle);
    const boutonReponse2 = screen.getByText(NOMENCLATURE_REPONSE[1].libelle);

    await waitFor(() => {
      expect(boutonReponse1).toBeDefined();
      expect(boutonReponse2).toBeDefined();
    });

    fireEvent.click(boutonReponse1);

    const libelleReponseChoisie = screen.getByText(NOMENCLATURE_REPONSE[0].libelle);
    const mailReponseChoisie = screen.getByText(NOMENCLATURE_REPONSE[0].corpsMail);

    await waitFor(() => {
      expect(libelleReponseChoisie).toBeDefined();
      expect(mailReponseChoisie).toBeDefined();
    });

    fireEvent.click(screen.getByText(/Envoyer la réponse/i));

    await waitFor(() => {
      expect(router.state.location.pathname).toBe(URL_MES_REQUETES_INFORMATION);
    });
  });

  test("bouton annuler", async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
          element: <ApercuReqInfoPage />
        },
        {
          path: URL_MES_REQUETES_INFORMATION,
          element: <EspaceInformationPage />
        }
      ],
      [URL_MES_REQUETES_INFORMATION, getUrlWithParam(URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID, "bbd05aed-8ea9-45ba-a7d7-b8d55ad10856")]
    );

    render(elementAvecContexte(<RouterProvider router={router} />, utilisateurConnecte, LISTE_UTILISATEURS));

    await waitFor(() => {
      expect(screen.getByText(/Retour espace information/i)).toBeDefined();
    });

    fireEvent.click(screen.getByText(/Retour espace information/i));

    await waitFor(() => {
      expect(router.state.location.pathname).toBe(URL_MES_REQUETES_INFORMATION);
    });
  });

  test("clic requête liée", async () => {
    const nouvelleFenetreSpy = vi.spyOn(window, "open");

    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
          element: <ApercuReqInfoPage />
        },
        {
          path: URL_MES_REQUETES_DELIVRANCE,
          element: <EspaceDelivrancePage />
        }
      ],
      [getUrlWithParam(URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID, "bbd05aed-8ea9-45ba-a7d7-b8d55ad10856")]
    );

    render(elementAvecContexte(<RouterProvider router={router} />, utilisateurConnecte, LISTE_UTILISATEURS));

    await waitFor(() => expect(screen.getByText(/LRU1A5/i)).toBeDefined());

    fireEvent.click(screen.getByText(/LRU1A5/i));

    await waitFor(() => expect(nouvelleFenetreSpy).toHaveBeenCalled());

    nouvelleFenetreSpy.mockRestore();
  });

  test("bouton saisie libre", async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
          element: <ApercuReqInfoPage />
        }
      ],
      [getUrlWithParam(URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID, "bbd05aed-8ea9-45ba-a7d7-b8d55ad10856")]
    );

    render(elementAvecContexte(<RouterProvider router={router} />, utilisateurConnecte, LISTE_UTILISATEURS));

    await waitFor(() => screen.getByPlaceholderText("Mail de la réponse"));

    fireEvent.change(screen.getByPlaceholderText("Mail de la réponse"), {
      target: { text: "Salut les amies" }
    });

    const boutonSaisieLibre = screen.getByText(/Réponse libre/i);

    await waitFor(() => expect(boutonSaisieLibre).toBeDefined());

    fireEvent.click(boutonSaisieLibre);

    await waitFor(() => expect(screen.getByPlaceholderText("Mail de la réponse").textContent).toBe(""));
  });

  test("complétion en cours", async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
          element: <ApercuReqInfoPage />
        }
      ],
      [getUrlWithParam(URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID, "bbd05aed-8ea9-45ba-a7d7-b8d55ad10557")]
    );

    render(elementAvecContexte(<RouterProvider router={router} />, utilisateurConnecte, LISTE_UTILISATEURS));

    await waitFor(() => expect(screen.getByDisplayValue("Réponse libre agent")).toBeDefined());
  });

  test("renders ApercuReqInfoPage Double Menu", async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
          element: <ApercuReqInfoPage />
        }
      ],
      [getUrlWithParam(URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID, "bbd05aed-8ea9-45ba-a7d7-b8d55ad10856")]
    );

    render(elementAvecContexte(<RouterProvider router={router} />, utilisateurConnecte, LISTE_UTILISATEURS));

    await waitFor(() => {
      const boutonReponses = screen.getByText(/Toutes les réponses disponibles/i);
      expect(boutonReponses).toBeDefined();
    });

    fireEvent.click(screen.getByText(/Toutes les réponses disponibles/i));

    const boutonSousMenu = screen.getByText(/Problème technique/i);

    await waitFor(() => expect(boutonSousMenu).toBeDefined());

    fireEvent.mouseOver(boutonSousMenu);

    const boutonReponse1 = screen.getByText(NOMENCLATURE_REPONSE[2].libelle);
    const boutonReponse2 = screen.getByText(NOMENCLATURE_REPONSE[3].libelle);

    await waitFor(() => {
      expect(boutonReponse1).toBeDefined();
      expect(boutonReponse2).toBeDefined();
    });

    fireEvent.click(boutonReponse1);

    const libelleReponseChoisie = screen.getByText(NOMENCLATURE_REPONSE[2].libelle);
    const mailReponseChoisie = screen.getByText(NOMENCLATURE_REPONSE[2].corpsMail);

    await waitFor(() => {
      expect(libelleReponseChoisie).toBeDefined();
      expect(mailReponseChoisie).toBeDefined();
    });
  });

  test("render ApercuReqInfoPage : RMC état civil manuelle ", async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
          element: <ApercuReqInfoPage />
        }
      ],
      [getUrlWithParam(URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID, "bbd05aed-8ea9-45ba-a7d7-b8d55ad10856")]
    );

    await act(async () => render(elementAvecContexte(<RouterProvider router={router} />, utilisateurConnecte, LISTE_UTILISATEURS)));

    await expect.poll(() => screen.getByText("Nouvelle recherche multi-critères")).toBeDefined();

    act(() => fireEvent.click(screen.getByText("Nouvelle recherche multi-critères")));

    // const nomTitulaire = screen.getByLabelText(
    //   "titulaire.nom"
    // ) as HTMLInputElement;

    await waitFor(
      () => {
        const boutonRechercher: HTMLButtonElement = screen.getByText("Rechercher");
        expect(screen.getByRole("dialog")).toBeDefined();
        expect(screen.getByLabelText("titulaire.nom")).toBeDefined();
        expect(boutonRechercher).toBeDefined();
        expect(boutonRechercher.disabled).toBeTruthy();
      },
      { timeout: 2500 }
    );

    act(() =>
      fireEvent.change(screen.getByLabelText("titulaire.nom"), {
        target: { value: NORESULT }
      })
    );

    await waitFor(
      () => {
        const nomTitulaire: HTMLInputElement = screen.getByLabelText("titulaire.nom");
        const boutonRechercher: HTMLButtonElement = screen.getByText("Rechercher");
        expect(nomTitulaire.value).toEqual(NORESULT);
        expect(boutonRechercher.disabled).toBeFalsy();
      },
      { timeout: 2500 }
    );

    act(() => fireEvent.click(screen.getByText("Rechercher")));

    await waitFor(
      () => {
        expect(screen.queryByRole("dialog")).toBeNull();
        expect(screen.getByText("Aucun acte n'a été trouvé.")).toBeDefined();
        expect(screen.getByText("Aucune inscription n'a été trouvée.")).toBeDefined();
      },
      { timeout: 2500 }
    );
  });

  /////////////////////// Tests concernant la prise en charge //////////////////////////////////////

  const Labels = {
    prendreEnCharge: "Prendre en charge",
    autresRequetesAssocieesAuTitulaire: "Autres requêtes associées au titulaire",
    nouvelleRMC: "Nouvelle recherche multi-critères",
    ajouterUnePieceJointe: "Ajouter une pièce jointe"
  };
  const renduApercuReqInfoPage = () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
          element: <ApercuReqInfoPage />
        }
      ],
      [getUrlWithParam(URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID, ReponseAppelDetailRequeteInformationSansCorbeilleAgent.data.id)]
    );

    render(elementAvecContexte(<RouterProvider router={router} />, userDroitConsulterPerimetreTousRegistres, LISTE_UTILISATEURS));
  };

  test("Attendu: le bouton 'prendre en charge' est affiché, si la requête n'appartient pas à l'utilisateur, mais à son Service", async () => {
    renduApercuReqInfoPage();

    await waitFor(() => expect(screen.getByLabelText(Labels.prendreEnCharge)).toBeDefined());
  });

  test.skip("Attendu: le bouton 'prendre en charge' disparait une fois qu'on a cliqué dessus", async () => {
    renduApercuReqInfoPage();

    let boutonPrendreEnCharge = await screen.findByLabelText<HTMLButtonElement>(Labels.prendreEnCharge);

    expect(boutonPrendreEnCharge).not.toBeNull();

    act(() => fireEvent.click(boutonPrendreEnCharge));

    await waitFor(() => expect(boutonPrendreEnCharge).not.toBeDefined());
  });

  test.skip("Attendu: les blocs non présents sur l'aperçu de requête sont bien absents si la requête n'appartient pas à l'utilisateur, mais à son Service", async () => {
    renduApercuReqInfoPage();

    await waitFor(() => {
      const titreAutresRequetesAssocieesAuTitulaire = screen.queryByText(Labels.autresRequetesAssocieesAuTitulaire);
      expect(titreAutresRequetesAssocieesAuTitulaire?.innerHTML).toBeNull();

      const BoutonNouvelleRMC = screen.queryByText(Labels.nouvelleRMC);
      expect(BoutonNouvelleRMC).toBeNull();

      const BoutonAjouterUnePieceJointe = screen.queryByText(Labels.ajouterUnePieceJointe);
      expect(BoutonAjouterUnePieceJointe).toBeNull();
    });
  });

  test("Attendu: le bouton 'prendre en charge' ne s'affiche pas lorsqu'on se trouve sur une fenêtre externe", async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
          element: <ApercuReqInfoPage idRequeteAAfficher={ReponseAppelDetailRequeteInformationSansCorbeilleAgent.data.id} />
        }
      ],
      [URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID]
    );

    render(elementAvecContexte(<RouterProvider router={router} />, userDroitConsulterPerimetreTousRegistres, LISTE_UTILISATEURS));

    await waitFor(() => expect(screen.queryByLabelText(Labels.prendreEnCharge)).toBeNull());
  });
});
