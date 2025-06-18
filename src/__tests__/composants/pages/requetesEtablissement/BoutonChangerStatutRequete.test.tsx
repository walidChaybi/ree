import { CONFIG_PATCH_STATUT_REQUETE_CREATION } from "@api/configurations/requete/creation/PatchStatutRequeteCreationConfigApi";
import { MockApi } from "@mock/appelsApi/MockApi";
import { IDroit, IHabilitation, IProfil } from "@model/agent/Habilitation";
import { IOfficier } from "@model/agent/IOfficier";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import messageManager from "@util/messageManager";
import { RouterProvider } from "react-router";
import { describe, expect, test, vi } from "vitest";
import { ConteneurParentModales } from "../../../../composants/commun/conteneurs/modale/ConteneurModale";
import { BoutonChangerStatutRequete } from "../../../../composants/pages/requetesEtablissement/BoutonChangerStatutRequete";
import { createTestingRouter, elementAvecContexte } from "../../../__tests__utils__/testsUtil";

describe("Test de la fonctionnalité de changement de statut d'une requête", () => {
  const utilisateurAvecDroit = {
    habilitations: [
      {
        profil: {
          droits: [{ nom: "FORCER_STATUT_REQUETE_ETABLISSEMENT" }, { nom: "CREER_ACTE_ETABLI" }] as IDroit[]
        } as IProfil
      }
    ] as IHabilitation[]
  } as IOfficier;

  const utilisateurSansDroit = {
    habilitations: [
      {
        profil: {
          droits: [] as IDroit[]
        } as IProfil
      }
    ] as IHabilitation[]
  } as IOfficier;

  const requete = { id: "3ed9aa4e-921b-489f-b8fe-531dd703c60c" };

  const routerBoutonChangerStatutAvecDroit = (utilisateur?: IOfficier) =>
    createTestingRouter(
      [
        {
          path: "/",
          element: elementAvecContexte(
            <div>
              <BoutonChangerStatutRequete idRequete={requete.id} />
              <ConteneurParentModales />
            </div>,
            utilisateur
          )
        }
      ],
      ["/"]
    );

  test("LORSQUE l'utilisateur ne possède pas les bons droits ALORS le bouton n'apparait pas", () => {
    render(<RouterProvider router={routerBoutonChangerStatutAvecDroit(utilisateurSansDroit)} />);

    const boutonChangerStatut: HTMLButtonElement | null = screen.queryByRole<HTMLButtonElement>("button", { name: /Changer Statut/i });

    expect(boutonChangerStatut).toBeNull();
  });

  test("LORSQUE l'utilisateur possède les bons droits ALORS le bouton apparait", async () => {
    render(<RouterProvider router={routerBoutonChangerStatutAvecDroit(utilisateurAvecDroit)} />);

    const boutonChangerStatut: HTMLButtonElement = await screen.findByRole("button", { name: /Changer Statut/i });

    expect(boutonChangerStatut).toBeDefined();
  });

  test("LORSQUE l'utilisateur click sur le bouton ALORS la modal s'ouvre", async () => {
    render(<RouterProvider router={routerBoutonChangerStatutAvecDroit(utilisateurAvecDroit)} />);

    await waitFor(() => {
      expect(screen.queryByRole("button", { name: /Changer Statut/i })).toBeDefined();
    });

    await userEvent.click(screen.getByRole("button", { name: /Changer Statut/i }));

    await waitFor(() => {
      expect(screen.queryByText("Changement du statut de la requête")).toBeDefined();
      expect(screen.queryByText("Statut à appliquer")).toBeDefined();
      expect(screen.queryByText("Motif du changement")).toBeDefined();
      expect(screen.queryByRole("button", { name: /Annuler/i })).toBeDefined();
      expect(screen.queryByRole("button", { name: /Valider/i })).toBeDefined();
    });
  });

  test("LORSQUE l'utilisateur annule le formulaire ALORS la modal se ferme", async () => {
    render(<RouterProvider router={routerBoutonChangerStatutAvecDroit(utilisateurAvecDroit)} />);

    await waitFor(() => {
      expect(screen.queryByRole("button", { name: /Changer Statut/i })).toBeDefined();
    });

    await userEvent.click(screen.getByRole("button", { name: /Changer Statut/i }));

    await waitFor(() => {
      expect(screen.queryByRole("button", { name: /Annuler/i })).toBeDefined();
    });

    await userEvent.click(screen.getByRole("button", { name: /Annuler/i }));

    await waitFor(() => {
      expect(screen.queryByRole("button", { name: /Annuler/i })).toBeNull();
    });
  });

  test("LORSQUE l'utilisateur clique sur le champ de selection des statut ALORS tous les statuts disponible s'affiche en options", async () => {
    render(<RouterProvider router={routerBoutonChangerStatutAvecDroit(utilisateurAvecDroit)} />);

    await waitFor(() => {
      expect(screen.queryByRole("button", { name: /Changer Statut/i })).toBeDefined();
    });

    await userEvent.click(screen.getByRole("button", { name: /Changer Statut/i }));

    await waitFor(() => {
      expect(screen.queryByLabelText("Statut à appliquer")).toBeDefined();
      expect(screen.queryByRole("option", { name: "" })).toBeDefined();
      expect(screen.queryByRole("option", { name: StatutRequete.A_TRAITER.libelle })).toBeDefined();
      expect(screen.queryByRole("option", { name: StatutRequete.PRISE_EN_CHARGE.libelle })).toBeDefined();
      expect(screen.queryByRole("option", { name: StatutRequete.RETOUR_SDANF.libelle })).toBeDefined();
      expect(screen.queryByRole("option", { name: StatutRequete.PROJET_VALIDE.libelle })).toBeDefined();
      expect(screen.queryByRole("option", { name: StatutRequete.BI_VALIDE.libelle })).toBeDefined();
      expect(screen.queryByRole("option", { name: StatutRequete.A_SIGNER.libelle })).toBeDefined();
      expect(screen.queryByRole("option", { name: StatutRequete.TRAITE_A_TRANSMETTRE.libelle })).toBeDefined();
      expect(screen.queryByRole("option", { name: StatutRequete.TRAITE_TRANSMIS.libelle })).toBeDefined();
    });
  });

  test("LORSQUE l'utilisateur valide le formulaire sans l'avoir rempli ALORS pas de soumission", async () => {
    render(<RouterProvider router={routerBoutonChangerStatutAvecDroit(utilisateurAvecDroit)} />);

    await waitFor(() => {
      expect(screen.queryByRole("button", { name: /Changer Statut/i })).toBeDefined();
    });

    await userEvent.click(screen.getByRole("button", { name: /Changer Statut/i }));

    await waitFor(() => {
      expect(screen.queryByLabelText("Statut à appliquer")).toBeDefined();
      expect(screen.queryByLabelText("Motif du changement")).toBeDefined();
      expect(screen.queryByRole("button", { name: /Valider/i })).toBeDefined();
    });

    await userEvent.click(screen.getByRole("button", { name: /Valider/i }));

    await waitFor(() => {
      expect(screen.queryAllByText("⚠ La saisie du champ est obligatoire").length).toBe(2);
    });
  });

  test("LORSQUE l'utilisateur soumet le formulaire avec des données valide ALORS l'appel de changement de statut est effectué", async () => {
    MockApi.deployer(
      CONFIG_PATCH_STATUT_REQUETE_CREATION,
      { path: { idRequete: requete.id }, query: { statut: "A_TRAITER", raisonStatut: "MOTIF_DE_CHANGEMENT", force: true } },
      {}
    );
    const mockApi = MockApi.getMock();

    render(<RouterProvider router={routerBoutonChangerStatutAvecDroit(utilisateurAvecDroit)} />);
    const logMessageSucces = vi.fn();
    messageManager.showSuccessAndClose = logMessageSucces;

    await waitFor(() => {
      expect(screen.queryByRole("button", { name: /Changer Statut/i })).toBeDefined();
    });

    await userEvent.click(screen.getByRole("button", { name: /Changer Statut/i }));

    await waitFor(() => {
      expect(screen.queryByLabelText("Statut à appliquer")).toBeDefined();
      expect(screen.queryByLabelText("Motif du changement")).toBeDefined();
      expect(screen.queryByRole("button", { name: /Valider/i })).toBeDefined();
    });

    fireEvent.change(screen.getByLabelText("Statut à appliquer"), { target: { value: StatutRequete.A_TRAITER.nom } });
    await userEvent.type(screen.getByLabelText("Motif du changement"), "MOTIF_DE_CHANGEMENT");

    await waitFor(() => {
      expect((screen.queryByLabelText("Statut à appliquer") as HTMLSelectElement).value).toBe(StatutRequete.A_TRAITER.nom);
      expect((screen.queryByLabelText("Motif du changement") as HTMLTextAreaElement).value).toBe("MOTIF_DE_CHANGEMENT");
    });

    await userEvent.click(screen.getByRole("button", { name: /Valider/i }));

    await waitFor(() => {
      expect(screen.queryByText("Changement du statut de la requête")).toBeNull();
      expect(screen.queryByText("Statut à appliquer")).toBeNull();
      expect(screen.queryByText("Motif du changement")).toBeNull();
      expect(screen.queryByRole("button", { name: /Annuler/i })).toBeNull();
      expect(screen.queryByRole("button", { name: /Valider/i })).toBeNull();
      expect(logMessageSucces).toHaveBeenCalledWith("Le statut a bien été mise à jour");
    });

    await waitFor(() => {
      expect(mockApi.history.patch.length).toBe(1);
    });

    MockApi.stopMock();
  });

  test("LORSQUE l'api requete renvoi une erreur ALORS on reste sur la modale", async () => {
    const logMessageErreur = vi.fn();
    messageManager.showErrorAndClose = logMessageErreur;

    MockApi.deployer(
      CONFIG_PATCH_STATUT_REQUETE_CREATION,
      { path: { idRequete: requete.id }, query: { statut: "A_TRAITER", raisonStatut: "MOTIF_DE_CHANGEMENT", force: true } },
      { codeHttp: 400 }
    );
    const mockApi = MockApi.getMock();

    render(<RouterProvider router={routerBoutonChangerStatutAvecDroit(utilisateurAvecDroit)} />);

    await waitFor(() => {
      expect(screen.queryByRole("button", { name: /Changer Statut/i })).toBeDefined();
    });

    await userEvent.click(screen.getByRole("button", { name: /Changer Statut/i }));

    await waitFor(() => {
      expect(screen.queryByLabelText("Statut à appliquer")).toBeDefined();
      expect(screen.queryByLabelText("Motif du changement")).toBeDefined();
      expect(screen.queryByRole("button", { name: /Valider/i })).toBeDefined();
    });

    fireEvent.change(screen.getByLabelText("Statut à appliquer"), { target: { value: StatutRequete.A_TRAITER.nom } });
    await userEvent.type(screen.getByLabelText("Motif du changement"), "MOTIF_DE_CHANGEMENT");

    await waitFor(() => {
      expect((screen.queryByLabelText("Statut à appliquer") as HTMLSelectElement).value).toBe(StatutRequete.A_TRAITER.nom);
      expect((screen.queryByLabelText("Motif du changement") as HTMLTextAreaElement).value).toBe("MOTIF_DE_CHANGEMENT");
    });

    await userEvent.click(screen.getByRole("button", { name: /Valider/i }));

    await waitFor(() => {
      expect(screen.queryByText("Changement du statut de la requête")).toBeDefined();
      expect(screen.queryByText("Statut à appliquer")).toBeDefined();
      expect(screen.queryByText("Motif du changement")).toBeDefined();
      expect(screen.queryByRole("button", { name: /Annuler/i })).toBeDefined();
      expect(screen.queryByRole("button", { name: /Valider/i })).toBeDefined();
      expect(logMessageErreur).toHaveBeenCalledWith("Une erreur s'est produite lors de la mise à jour du statut de la requête");
    });

    await waitFor(() => {
      expect(mockApi.history.patch.length).toBe(1);
    });

    MockApi.stopMock();
  });
});
