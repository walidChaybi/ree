import { IActeEtrangerTranscription } from "@model/form/creation/transcription/IProjetActeTranscritForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Formik } from "formik";
import { describe, expect, test } from "vitest";
import BlocActeEtranger from "../../../../../../composants/pages/requetesConsulaire/saisieProjet/formulaireSaisieProjet/BlocActeEtranger";

const renderComponent = (initialValues: { acteEtranger: IActeEtrangerTranscription }) => {
  return render(
    <Formik
      initialValues={initialValues}
      onSubmit={() => {}}
    >
      <BlocActeEtranger />
    </Formik>
  );
};

describe("BlocActeEtranger", () => {
  const initialValues = {
    acteEtranger: {
      typeActe: "DRESSE",
      typeActeAutre: "",
      dateEnregistrement: { jour: "", mois: "", annee: "" },
      lieuEnregistrement: { ville: "", etatProvince: "", pays: "" },
      redacteur: "",
      referenceComplement: ""
    }
  };

  test("doit afficher les champs par défaut", async () => {
    renderComponent(initialValues);

    await waitFor(() => {
      expect(screen.getByLabelText(/Type d'acte étranger/)).toBeDefined();
      expect(screen.getByLabelText(/Date d'enregistrement/)).toBeDefined();
      expect(screen.getByLabelText(/Ville/)).toBeDefined();
      expect(screen.getByLabelText(/État, canton, province/)).toBeDefined();
      expect(screen.getByLabelText(/Pays/)).toBeDefined();
      expect(screen.getByLabelText(/Rédacteur/)).toBeDefined();
      expect(screen.getByLabelText(/Référence et\/ou complément/)).toBeDefined();
    });
  });

  test("doit afficher le champ 'Précisez le type d'acte' si 'AUTRE' est sélectionné", async () => {
    renderComponent({
      acteEtranger: { ...initialValues.acteEtranger, typeActe: "AUTRE" }
    });

    await waitFor(() => {
      expect(screen.getByLabelText(/Précisez le type d'acte/)).toBeDefined();
    });
  });

  test("ne doit pas afficher le champ 'Précisez le type d'acte' si 'AUTRE' n'est pas sélectionné", async () => {
    renderComponent(initialValues);

    await waitFor(() => {
      expect(screen.queryByLabelText(/Précisez le type d'acte/)).toBeNull();
    });
  });

  test("doit mettre à jour les valeurs dans Formik quand les champs sont modifiés", async () => {
    const { getByLabelText } = renderComponent(initialValues);

    const typeActeInput = getByLabelText(/Type d'acte étranger/) as HTMLInputElement;
    const redacteurInput = getByLabelText(/Rédacteur/) as HTMLInputElement;

    await waitFor(async () => {
      fireEvent.change(typeActeInput, { target: { value: "ACTE_DRESSE" } });
      fireEvent.change(redacteurInput, { target: { value: "Jean Dupont" } });
    });

    await waitFor(() => {
      expect(typeActeInput.value).toBe("ACTE_DRESSE");
      expect(redacteurInput.value).toBe("Jean Dupont");
    });
  });

  test("doit vider le champ 'Précisez le type d'acte' si 'AUTRE' n'est pas sélectionné", async () => {
    const { getByLabelText } = renderComponent({
      acteEtranger: {
        ...initialValues.acteEtranger,
        typeActe: "AUTRE",
        typeActeAutre: "Test"
      }
    });

    const typeActeSelect = getByLabelText(/Type d'acte étranger/) as HTMLSelectElement;

    await waitFor(() => {
      const typeActeAutreInput = getByLabelText(/Précisez le type d'acte/) as HTMLInputElement;
      expect(typeActeAutreInput.value).toBe("Test");
    });

    await waitFor(async () => {
      fireEvent.change(typeActeSelect, { target: { value: "ACTE_DRESSE" } });
    });

    await waitFor(async () => {
      fireEvent.change(typeActeSelect, { target: { value: "AUTRE" } });
    });

    await waitFor(() => {
      const typeActeAutreInput2 = screen.getByLabelText(/Précisez le type d'acte/) as HTMLInputElement;
      expect(typeActeAutreInput2.value).toBe("");
    });
  });
});
