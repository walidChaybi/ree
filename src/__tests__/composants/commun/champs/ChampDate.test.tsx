import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Formik } from "formik";
import { describe, expect, test } from "vitest";
import ChampDate from "../../../../composants/commun/champs/ChampDate";

describe("ChampDate", () => {
  const renderComponent = (avecBoutonReinitialiser?: boolean) => {
    return render(
      <Formik
        initialValues={{ test: { jour: "", mois: "", annee: "" } }}
        onSubmit={() => {}}
      >
        <ChampDate
          name={"test"}
          libelle={"Date"}
          avecBoutonReinitialiser={avecBoutonReinitialiser}
        />
      </Formik>
    );
  };

  test("Les champs jour, mois et année sont remplissables correctement", async () => {
    await act(async () => renderComponent());

    // Render du composant correct
    expect(screen.getByLabelText("Date")).toBeDefined();

    // Vérifie l'abscence des champs heure et minute
    expect(screen.queryByPlaceholderText("HH")).toBeNull();
    expect(screen.queryByPlaceholderText("MN")).toBeNull();

    const jourInput: HTMLInputElement = screen.getByPlaceholderText("JJ");
    fireEvent.change(jourInput, { target: { value: "12" } });
    fireEvent.blur(jourInput);

    const moisInput: HTMLInputElement = screen.getByPlaceholderText("MM");
    fireEvent.change(moisInput, { target: { value: "06" } });
    fireEvent.blur(moisInput);

    const anneeInput: HTMLInputElement = screen.getByPlaceholderText("AAAA");
    fireEvent.change(anneeInput, { target: { value: "2024" } });
    fireEvent.blur(anneeInput);

    await waitFor(() => {
      expect(jourInput.value).toBe("12");
      expect(moisInput.value).toBe("06");
      expect(anneeInput.value).toBe("2024");
    });
  });

  test("Change le focus du champ lorsque les deux chiffres sont entrés", async () => {
    renderComponent();
    const moisInput = screen.getByPlaceholderText("MM");
    await userEvent.type(moisInput, "06");
    fireEvent.blur(moisInput);

    await waitFor(() => {
      const anneeInput = screen.getByPlaceholderText("AAAA");
      expect(document.activeElement).toBe(anneeInput);
    });
  });

  test("LORSQUE le bouton reset est cliqué, ALORS les champs sont vidés", async () => {
    await act(async () => renderComponent(true));

    expect(screen.getByLabelText("Date")).toBeDefined();

    const jourInput: HTMLInputElement = screen.getByPlaceholderText("JJ");
    fireEvent.change(jourInput, { target: { value: "12" } });

    const moisInput: HTMLInputElement = screen.getByPlaceholderText("MM");
    fireEvent.change(moisInput, { target: { value: "06" } });

    const anneeInput: HTMLInputElement = screen.getByPlaceholderText("AAAA");
    fireEvent.change(anneeInput, { target: { value: "2024" } });

    const boutonReinitialiser: HTMLButtonElement = screen.getByTitle("Réinitialiser la date");
    fireEvent.click(boutonReinitialiser);

    await waitFor(() => {
      expect(jourInput.value).toBe("");
      expect(moisInput.value).toBe("");
      expect(anneeInput.value).toBe("");
    });
  });
});

describe("ChampHeure", () => {
  const renderComponent = (name = "test", libelle = "Date de naissance") => {
    return render(
      <Formik
        initialValues={{ test: { jour: "", mois: "", annee: "", heure: "", minute: "" } }}
        onSubmit={() => {}}
      >
        <ChampDate
          name={name}
          libelle={libelle}
          avecHeure={true}
        />
      </Formik>
    );
  };

  test("Les champs minute et heure sont remplissables correctement", async () => {
    renderComponent();

    // Render du composant correct
    await waitFor(() => {
      expect(screen.getByLabelText("Date de naissance")).toBeDefined();
    });

    const heureInput: HTMLInputElement = screen.getByPlaceholderText("HH");
    fireEvent.change(heureInput, { target: { value: "12" } });
    fireEvent.blur(heureInput);

    const minuteInput: HTMLInputElement = screen.getByPlaceholderText("MN");
    fireEvent.change(minuteInput, { target: { value: "5" } });
    fireEvent.blur(minuteInput);

    await waitFor(() => {
      expect(minuteInput.value).toBe("05");
      expect(heureInput.value).toBe("12");
    });
  });

  test("Change le focus du champ année lorsque les 4 chiffres sont entrés", async () => {
    renderComponent();
    const anneeInput = screen.getByPlaceholderText("AAAA");
    const heureInput = screen.getByPlaceholderText("HH");
    await userEvent.type(anneeInput, "1991");
    expect(document.activeElement).toBe(heureInput);
  });

  test("Change le focus du champ heure lorsque les deux chiffres sont entrés", async () => {
    renderComponent();
    const heureInput = screen.getByPlaceholderText("HH");
    const minuteInput = screen.getByPlaceholderText("MN");
    await userEvent.type(heureInput, "11");
    expect(document.activeElement).toBe(minuteInput);
  });
});

describe("Champs initialisés avec valeurs", () => {
  const renderComponentAvecValeurs = (name = "test", libelle = "Date de test") => {
    return render(
      <Formik
        initialValues={{ test: { jour: "14", mois: "07", annee: "2010", heure: "16", minute: "39" } }}
        onSubmit={() => {}}
      >
        <ChampDate
          name={name}
          libelle={libelle}
          avecHeure={true}
        />
      </Formik>
    );
  };
  test("Valeurs par defaut des champs", async () => {
    renderComponentAvecValeurs();

    const jourInput: HTMLInputElement = screen.getByPlaceholderText("JJ");
    const moisInput: HTMLInputElement = screen.getByPlaceholderText("MM");
    const anneeInput: HTMLInputElement = screen.getByPlaceholderText("AAAA");
    const heureInput: HTMLInputElement = screen.getByPlaceholderText("HH");
    const minuteInput: HTMLInputElement = screen.getByPlaceholderText("MN");

    await waitFor(() => {
      expect(jourInput.value).toBe("14");
      expect(moisInput.value).toBe("07");
      expect(anneeInput.value).toBe("2010");
      expect(heureInput.value).toBe("16");
      expect(minuteInput.value).toBe("39");
    });
  });
});
