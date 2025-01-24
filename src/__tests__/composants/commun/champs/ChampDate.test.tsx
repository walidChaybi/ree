import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Formik } from "formik";
import { describe, expect, test } from "vitest";
import ChampDate from "../../../../composants/commun/champs/ChampDate";

describe("ChampDate", () => {
  const renderComponent = (name = "test", libelle = "Date") => {
    return render(
      <Formik
        initialValues={{ test: { jour: "", mois: "", annee: "" } }}
        onSubmit={() => {}}
      >
        <ChampDate
          name={name}
          libelle={libelle}
        />
      </Formik>
    );
  };

  test("render le composant correctement", () => {
    renderComponent();
    expect(screen.getByLabelText("Date")).toBeDefined();
  });

  test("Le jour mois est remplissable correctement", async () => {
    renderComponent();
    const jourInput: HTMLInputElement = screen.getByPlaceholderText("JJ");
    await act(() => fireEvent.change(jourInput, { target: { value: "12" } }));
    await act(() => {
      fireEvent.blur(jourInput);
    });
expect(jourInput.value).toBe("12");
  });

  test("Le champ mois est remplissable correctement", async () => {
    renderComponent();
    const moisInput: HTMLInputElement = screen.getByPlaceholderText("MM");
    await act(() => fireEvent.change(moisInput, { target: { value: "06" } }));
    await act(async () => {
      fireEvent.blur(moisInput);
      expect(moisInput.value).toBe("06");
    });
  });

  test("Le champ année est remplissable correctement", async () => {
    renderComponent();
    const anneeInput: HTMLInputElement = screen.getByPlaceholderText("AAAA");
    await act(() => fireEvent.change(anneeInput, { target: { value: "2024" } }));
    await act(async () => {
      fireEvent.blur(anneeInput);
      expect(anneeInput.value).toBe("2024");
    });
  });

  test.skip("Change le focus du champ lorsque les deux chiffres sont entrés", async () => {
    renderComponent();
    const moisInput = screen.getByPlaceholderText("MM");
    const anneeInput = screen.getByPlaceholderText("AAAA");
    await act(async () => {
      fireEvent.change(moisInput, { target: { value: "06" } });
      expect(document.activeElement).toBe(anneeInput);
    });
  });

  test.skip("Empêche de dépasser le nombre de jours maximal", async () => {
    renderComponent();
    const jourInput: HTMLInputElement = screen.getByPlaceholderText("JJ");
    await act(() => fireEvent.change(jourInput, { target: { value: "1000" } }));
    await act(async () => {
      fireEvent.blur(jourInput);
      expect(jourInput.value).toBe("31");
    });
  });

  test.skip("Empêche de dépasser le nombre de mois maximal", async () => {
    renderComponent();
    const moisInput: HTMLInputElement = screen.getByPlaceholderText("MM");
    await act(() => fireEvent.change(moisInput, { target: { value: "1000" } }));
    await act(async () => {
      fireEvent.blur(moisInput);
      expect(moisInput.value).toBe("12");
    });
  });
  test("Le champ heure n'est pas présent", async () => {
    renderComponent();
    expect(screen?.queryByPlaceholderText("HH")).toBeNull();
  });
  test("Le champ Minute n'est pas présent", async () => {
    renderComponent();
    expect(screen.queryByPlaceholderText("MN")).toBeNull();
  });
});
describe("ChampHeure", () => {
  const renderComponent = (name = "test", libelle = "Date de naissance") => {
    return render(
      <Formik
        initialValues={{ test: { jour: "", mois: "", annee: "", heure: "", minutes: "" } }}
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

  test("render le composant correctement", () => {
    renderComponent();
    expect(screen.getByLabelText("Date de naissance")).toBeDefined();
  });

  test("L'heure est remplissable correctement", async () => {
    renderComponent();
    const heureInput: HTMLInputElement = screen.getByPlaceholderText("HH");
    await act(() => fireEvent.change(heureInput, { target: { value: "12" } }));
    await act(() => fireEvent.blur(heureInput));
    expect(heureInput.value).toBe("12");
  });

  test("Le champ minutes est remplissable correctement", async () => {
    renderComponent();
    const minutesInput: HTMLInputElement = screen.getByPlaceholderText("MN");
    await act(() => fireEvent.change(minutesInput, { target: { value: "5" } }));
    await act(() => fireEvent.blur(minutesInput));
    expect(minutesInput.value).toBe("05");
  });

  test.skip("Change le focus du champ année lorsque les 4 chiffres sont entrés", async () => {
    renderComponent();
    const anneeInput = screen.getByPlaceholderText("AAAA");
    const heureInput = screen.getByPlaceholderText("HH");
    await act(() => fireEvent.change(anneeInput, { target: { value: "1991" } }));
    expect(document.activeElement).toBe(heureInput);
  });
  test.skip("Change le focus du champ heure lorsque les deux chiffres sont entrés", async () => {
    renderComponent();
    const heureInput = screen.getByPlaceholderText("HH");
    const minutesInput = screen.getByPlaceholderText("MN");
    await act(() => fireEvent.change(heureInput, { target: { value: "11" } }));
    expect(document.activeElement).toBe(minutesInput);
  });

  test("Empêche de dépasser le nombre d'heures maximal", async () => {
    renderComponent();
    const heureInput: HTMLInputElement = screen.getByPlaceholderText("HH");
    await act(() => fireEvent.change(heureInput, { target: { value: "33" } }));
    await act(() => fireEvent.blur(heureInput));
    expect(heureInput.value).toBe("23");
  });

  test("Empêche de dépasser le nombre de minutes maximal", async () => {
    renderComponent();
    const minutesInput: HTMLInputElement = screen.getByPlaceholderText("MN");
    await act(() => fireEvent.change(minutesInput, { target: { value: "78" } }));
    await act(() => fireEvent.blur(minutesInput));
    expect(minutesInput.value).toBe("59");
  });
});
describe("Champs initialisés avec valeurs", () => {
  const renderComponentAvecValeurs = (name = "test", libelle = "Date de test") => {
    return render(
      <Formik
        initialValues={{ test: { jour: "14", mois: "07", annee: "2010", heure: "16", minutes: "39" } }}
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
    const minutesInput: HTMLInputElement = screen.getByPlaceholderText("MN");
    await waitFor(() => {
      expect(jourInput.value).toBe("14");
      expect(moisInput.value).toBe("07");
      expect(anneeInput.value).toBe("2010");
      expect(heureInput.value).toBe("16");
      expect(minutesInput.value).toBe("39");
    });
  });
});
