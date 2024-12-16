import { fireEvent, render, screen } from "@testing-library/react";
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

  test("Le jour mois est remplissable correctement", () => {
    renderComponent();
    const jourInput = screen.getByPlaceholderText("JJ") as HTMLInputElement;
    fireEvent.change(jourInput, { target: { value: "12" } });
    expect(jourInput.value).toBe("12");
  });
  test("Le champ mois est remplissable correctement", () => {
    renderComponent();
    const moisInput = screen.getByPlaceholderText("MM") as HTMLInputElement;
    fireEvent.change(moisInput, { target: { value: "06" } });
    expect(moisInput.value).toBe("06");
  });
  test("Le champ année est remplissable correctement", () => {
    renderComponent();
    const anneeInput = screen.getByPlaceholderText("AAAA") as HTMLInputElement;
    fireEvent.change(anneeInput, { target: { value: "2024" } });
    expect(anneeInput.value).toBe("2024");
  });

  test("Change le focus du champ lorsque les deux chiffres sont entrés", () => {
    renderComponent();
    const moisInput = screen.getByPlaceholderText("MM");
    const anneeInput = screen.getByPlaceholderText("AAAA");
    fireEvent.change(moisInput, { target: { value: "06" } });
    expect(document.activeElement).toBe(anneeInput);
  });

  test("Empêche de dépasser le nombre de jours maximal", () => {
    renderComponent();
    const moisInput = screen.getByPlaceholderText("JJ") as HTMLInputElement;
    fireEvent.change(moisInput, { target: { value: "1000" } });
    expect(moisInput.value).toBe("31");
  });

  test("Empêche de dépasser le nombre de mois maximal", () => {
    renderComponent();
    const moisInput = screen.getByPlaceholderText("MM") as HTMLInputElement;
    fireEvent.change(moisInput, { target: { value: "1000" } });
    expect(moisInput.value).toBe("12");
  });
});
