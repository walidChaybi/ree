import NomSecableForm, { ComponentFormProps } from "@composant/formulaire/NomSecableForm";
import { render } from "@testing-library/react";
import { Formik } from "formik";
import { describe, expect, test } from "vitest";

const afficherComposant = (valeursForm: object, props?: ComponentFormProps) => {
  const propsAUtiliser: ComponentFormProps = {
    ...props,
    nomComposant: props?.nomComposant ?? "",
    saisieVerrouillee: props?.saisieVerrouillee ?? false
  };

  return render(
    <Formik
      initialValues={valeursForm}
      onSubmit={() => {}}
    >
      <NomSecableForm {...propsAUtiliser} />
    </Formik>
  );
};

describe("Test du composant Nom secable form", () => {
  test("Affichage du composant sans les champs de nom", () => {
    const { queryByText } = afficherComposant({ secable: "" });

    expect(queryByText("Nom sécable")).toBeDefined();
    expect(queryByText("1re partie")).toBeNull();
    expect(queryByText("2nde partie")).toBeNull();
  });

  test("Affichage des deux champs du nom", () => {
    const { queryByText } = afficherComposant({ secable: "true" });

    expect(queryByText("1re partie")).not.toBeNull();
    expect(queryByText("2nde partie")).not.toBeNull();
  });

  test("Affichage du message d'avertissement", () => {
    const { queryByText } = afficherComposant({ secable: "true", afficherAvertissementVocable: true, nomTitulaire: "test test test" });

    expect(queryByText("Nom avec plus de deux vocables")).toBeDefined();
  });
});
