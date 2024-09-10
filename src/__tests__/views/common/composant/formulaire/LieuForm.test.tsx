import LieuForm, { ILieuProps } from "@composant/formulaire/LieuForm";
import { EtrangerFrance } from "@model/etatcivil/enum/EtrangerFrance";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { Formulaire } from "@widget/formulaire/Formulaire";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { RadioField } from "@widget/formulaire/champsSaisie/RadioField";
import { SelectField } from "@widget/formulaire/champsSaisie/SelectField";
import { expect, test } from "vitest";

test("DOIT afficher aucun champ QUAND le lieu est inconnu", () => {
  rendreComposantLieuForm(false, false);
  const lieuInconnu = screen.getByLabelText("Inconnu");
  waitFor(() => {
    expect(lieuInconnu).toBeDefined();
  });

  fireEvent.click(lieuInconnu);

  waitFor(() => {
    expect(screen.queryByLabelText("Ville")).toBeNull();
    expect(screen.queryByLabelText("Arrondissement")).toBeNull();
    expect(screen.queryByLabelText("Département")).toBeNull();
    expect(screen.queryByLabelText("Région")).toBeNull();
    expect(screen.queryByLabelText("Pays")).toBeNull();
  });
});

test("DOIT afficher la ville, région et pays QUAND le lieu est étranger", () => {
  rendreComposantLieuForm(false, false);
  const lieuInconnu = screen.getByLabelText("Etranger");
  waitFor(() => {
    expect(lieuInconnu).toBeDefined();
  });

  fireEvent.click(lieuInconnu);

  waitFor(() => {
    expect(screen.getByLabelText("Ville")).toBeDefined();
    expect(screen.queryByLabelText("Arrondissement")).toBeNull();
    expect(screen.queryByLabelText("Département")).toBeNull();
    expect(screen.getByLabelText("Région")).toBeDefined();
    expect(screen.getByLabelText("Pays")).toBeDefined();
  });
});

test("DOIT afficher la ville QUAND le lieu est france et qu'on affiche le minimum de champs", () => {
  rendreComposantLieuForm(false, false);
  const lieuInconnu = screen.getByLabelText("France");
  waitFor(() => {
    expect(lieuInconnu).toBeDefined();
  });

  fireEvent.click(lieuInconnu);

  waitFor(() => {
    expect(screen.getByLabelText("Ville")).toBeDefined();
    expect(screen.queryByLabelText("Arrondissement")).toBeNull();
    expect(screen.queryByLabelText("Département")).toBeNull();
    expect(screen.queryByLabelText("Région")).toBeNull();
    expect(screen.queryByLabelText("Pays")).toBeNull();
  });
});

test("DOIT afficher la ville, l'arrondissement et le département QUAND le lieu est france et qu'on affiche le maximum de champs", () => {
  rendreComposantLieuForm(true, true);
  const lieuInconnu = screen.getByLabelText("France");
  waitFor(() => {
    expect(lieuInconnu).toBeDefined();
  });

  fireEvent.click(lieuInconnu);

  waitFor(() => {
  expect(screen.getByLabelText("Ville")).toBeDefined();
  expect(screen.getByLabelText("Arrondissement")).toBeDefined();
  expect(screen.getByLabelText("Département")).toBeDefined();
  expect(screen.queryByLabelText("Région")).toBeNull();
  expect(screen.queryByLabelText("Pays")).toBeNull();
});
});

function rendreComposantLieuForm(
  afficherArrondissement: boolean,
  afficherDepartement: boolean
) {
  const lieuElements: ILieuProps = {
    lieu: (
      <RadioField
        name="lieu"
        label="Lieu"
        values={EtrangerFrance.getAllEnumsAsOptions()}
      />
    ),
    ville: <InputField name="ville" label="Ville" />,
    arrondissement: (
      <SelectField
        name="arrondissement"
        label="Arrondissement"
        options={LieuxUtils.getOptionsArrondissement("Paris")}
      />
    ),
    departement: <InputField name="departement" label="Département" />,
    region: <InputField name="region" label="Région" />,
    pays: <InputField name="pays" label="Pays" />
  };
  render(
    <Formulaire
      formDefaultValues={{}}
      formValidationSchema={undefined}
      onSubmit={() => {}}
    >
      <LieuForm
        elements={lieuElements}
        afficherArrondissement={afficherArrondissement}
        afficherDepartement={afficherDepartement}
      ></LieuForm>
    </Formulaire>
  );
}
