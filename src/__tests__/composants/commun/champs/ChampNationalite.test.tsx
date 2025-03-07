import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Formik } from "formik";
import { describe, expect, test, vi } from "vitest";
import ChampNationalite from "../../../../composants/commun/champs/ChampNationalite";

describe("Test du composant ChampNationalite", () => {
  const valeurInitiale = { nationalite: "française" };

  const afficherChampNationalite = (props = {}) => {
    return render(
      <Formik
        initialValues={valeurInitiale}
        onSubmit={() => {}}
      >
        <ChampNationalite
          nom="nationalite"
          libelle="Nationalité"
          {...props}
        />
      </Formik>
    );
  };

  test("Doit afficher correctement le champ nationalité", async () => {
    await act(async () => afficherChampNationalite());

    const champNationalite = screen.getByLabelText("Nationalité");
    expect(champNationalite).toBeDefined();
    expect((champNationalite as HTMLInputElement).value).toBe("française");
  });

  test("Doit être désactivé quand la propriété desactive est true", async () => {
    await act(async () => afficherChampNationalite({ desactive: true }));

    const champNationalite = screen.getByLabelText("Nationalité");
    expect(champNationalite.getAttribute("disabled")).not.toBeNull();
  });

  test("Doit afficher le bouton de suppression quand afficherBoutonSupprimer est true", async () => {
    await act(async () => afficherChampNationalite({ afficherBoutonSupprimer: true }));

    const boutonSupprimer = screen.getByTitle("Supprimer cette nationalité");
    expect(boutonSupprimer).toBeDefined();
  });

  test("Ne doit pas afficher le bouton de suppression par défaut", async () => {
    await act(async () => afficherChampNationalite());

    const boutonSupprimer = screen.queryByTitle("Supprimer cette nationalité");
    expect(boutonSupprimer).toBeNull();
  });

  test("Doit appeler onSupprimer quand le bouton de suppression est cliqué", async () => {
    const fonctionSuppression = vi.fn();

    await act(async () =>
      afficherChampNationalite({
        afficherBoutonSupprimer: true,
        onSupprimer: fonctionSuppression
      })
    );

    const boutonSupprimer = screen.getByTitle("Supprimer cette nationalité");
    fireEvent.click(boutonSupprimer);

    await waitFor(() => {
      expect(fonctionSuppression).toHaveBeenCalledTimes(1);
    });
  });

  test("Le bouton de suppression doit être désactivé quand boutonSupprimerDesactive est true", async () => {
    await act(async () =>
      afficherChampNationalite({
        afficherBoutonSupprimer: true,
        boutonSupprimerDesactive: true
      })
    );

    const boutonSupprimer = screen.getByTitle("Supprimer cette nationalité");
    expect(boutonSupprimer.getAttribute("disabled")).not.toBeNull();
  });

  test("Doit permettre la saisie de données", async () => {
    await act(async () => afficherChampNationalite());

    const champNationalite = screen.getByLabelText("Nationalité");
    fireEvent.change(champNationalite, { target: { value: "italienne" } });

    await waitFor(() => {
      expect((champNationalite as HTMLInputElement).value).toBe("italienne");
    });
  });
});
