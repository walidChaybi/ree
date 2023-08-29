import { requeteCreationEtablissementSaisieProjet } from "@mock/data/requeteCreationEtablissement";
import "@mock/element/IntersectionObserver";
import { Postulant } from "@pages/requeteCreation/apercuRequete/etablissement/apercuSaisieDeProjet/contenu/postulant/Postulant";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("Test du bloc Postulant de l'onglet Postulant", () => {
  test("DOIT afficher et renseigner les champs du bloc postulant QUAND le formulaire est affiché", async () => {
    const titulaire = requeteCreationEtablissementSaisieProjet.titulaires![0];
    render(<Postulant titulaire={titulaire} />);

    const champNom = screen.getAllByLabelText("Nom") as HTMLInputElement[];
    const champPrenom = screen.getAllByLabelText(
      "Prénom"
    ) as HTMLInputElement[];
    const champIdentite = screen.getByLabelText(
      "Identité avant décret"
    ) as HTMLInputElement;
    const champSexe = screen.getByLabelText("Masculin") as HTMLInputElement;
    const champJourNaissance = screen.getByText("Date de naissance")
      .nextElementSibling as HTMLInputElement;
    const champMoisNaissance = champJourNaissance.nextElementSibling
      ?.nextElementSibling as HTMLInputElement;
    const champAnneeNaissance = champMoisNaissance.nextElementSibling
      ?.nextElementSibling as HTMLInputElement;
    const champVille = screen.getByLabelText("Ville") as HTMLInputElement;
    const champEtat = screen.getByLabelText(
      "Etat, canton, province"
    ) as HTMLInputElement;
    const champPays = screen.getByLabelText("Pays") as HTMLInputElement;
    const champNeMariage = screen.getByLabelText("Non") as HTMLInputElement;

    await waitFor(() => {
      expect(champNom[0].value).toBe("NOMNAISSANCE");
      expect(screen.getByText("Nom sécable")).toBeDefined();
      expect(screen.queryByText("1re partie")).toBeNull();
      expect(screen.getByText("Pas de prénom")).toBeDefined();
      expect(champPrenom[0].value).toBe("Prenom");
      expect(champNom[1].value).toBe("NOMFRANCISATION");
      expect(champPrenom[1].value).toBe("Prenomfrancisation");
      expect(champIdentite.value).toBe("");
      expect(champSexe.checked).toBeTruthy();
      expect(champJourNaissance.value).toBe("01");
      expect(champMoisNaissance.value).toBe("02");
      expect(champAnneeNaissance.value).toBe("2000");
      expect(champVille.value).toBe("Villeetrangerenaissance");
      expect(champEtat.value).toBe("");
      expect(champPays.value).toBe("Paysnaissance");
      expect(champNeMariage.checked).toBeTruthy();
      expect(screen.getByText("Adopté par")).toBeDefined();
    });
  });
  test("DOIT afficher un message d'attention QUAND le sexe est indéterminé", async () => {
    const titulaire = requeteCreationEtablissementSaisieProjet.titulaires![0];
    render(<Postulant titulaire={titulaire} />);

    await waitFor(() => {
      expect(screen.queryByText("Attention, sexe indéterminé")).toBeNull();
    });

    fireEvent.click(screen.getByLabelText("Indéterminé"));

    await waitFor(() => {
      expect(screen.getByText("Attention, sexe indéterminé")).toBeDefined();
    });
  });
  test("DOIT afficher un message d'attention QUAND le postulant n'a pas de jour et mois de naissance", async () => {
    const titulaire = {
      ...requeteCreationEtablissementSaisieProjet.titulaires![0]
    };
    titulaire.retenueSdanf!.jourNaissance = undefined;
    titulaire.retenueSdanf!.moisNaissance = undefined;
    render(<Postulant titulaire={titulaire} />);

    const champJourNaissance = screen.getByText("Date de naissance")
      .nextElementSibling as HTMLInputElement;

    await waitFor(() => {
      expect(
        screen.getByText("Jour et mois valorisés par défaut")
      ).toBeDefined();
    });

    fireEvent.input(champJourNaissance, {
      target: {
        value: "1"
      }
    });

    await waitFor(() => {
      expect(
        screen.queryByText("Jour et mois valorisés par défaut")
      ).toBeNull();
    });
  });
  test("DOIT rendre la sécabilité du nom sans message d'attention QUAND il y a seulement 2 vocables", async () => {
    const titulaire = {
      ...requeteCreationEtablissementSaisieProjet.titulaires![0]
    };
    titulaire.retenueSdanf!.nomNaissance = "Test1 Test2";
    titulaire.retenueSdanf!.paysNaissance = "Cuba";
    render(<Postulant titulaire={titulaire} />);

    const champNomPartie1 = screen.getByLabelText(
      "1re partie"
    ) as HTMLInputElement;
    const champNomPartie2 = screen.getByLabelText(
      "2nde partie"
    ) as HTMLInputElement;

    await waitFor(() => {
      expect(champNomPartie1.value).toBe("Test1");
      expect(champNomPartie2.value).toBe("Test2");
      expect(screen.queryByText("Nom avec plus de deux vocables")).toBeNull();
    });
  });
  test("DOIT afficher un message d'attention QUAND le pays de naissance est sécable et que le nom a plus de 2 vocables", async () => {
    const titulaire = {
      ...requeteCreationEtablissementSaisieProjet.titulaires![0]
    };
    titulaire.retenueSdanf!.nomNaissance = "Test1 Test2 Test3";
    titulaire.retenueSdanf!.paysNaissance = "Cuba";
    render(<Postulant titulaire={titulaire} />);

    const champNomPartie1 = screen.getByLabelText(
      "1re partie"
    ) as HTMLInputElement;
    const champNomPartie2 = screen.getByLabelText(
      "2nde partie"
    ) as HTMLInputElement;

    await waitFor(() => {
      expect(champNomPartie1.value).toBe("Test1");
      expect(champNomPartie2.value).toBe("Test2 Test3");
      expect(screen.getByText("Nom avec plus de deux vocables")).toBeDefined();
    });
  });
});
