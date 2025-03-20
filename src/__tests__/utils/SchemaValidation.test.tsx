import { render, screen, waitFor } from "@testing-library/react";
import { Form, Formik } from "formik";
import { describe, test } from "vitest";

// Import your validation schema function
import { ConditionChamp, EOperateurCondition, IConditionChampDto } from "@model/form/commun/ConditionChamp";
import userEvent from "@testing-library/user-event";
import ChampsNomSecable from "../../composants/commun/champs/ChampsNomSecable";
import SchemaValidation from "../../utils/SchemaValidation";

const conditionToujoursObligatoire = (idChampReference: string): ConditionChamp[] | boolean => [
  ConditionChamp.depuisDto({
    operateur: EOperateurCondition.TOUJOURS_VRAI,
    idChampReference: idChampReference,
    valeurs: []
  } as IConditionChampDto)!
];

const MockFormulaire: React.FC<{ valeursInitiales: any; schemaDeValidation: any; children: any }> = ({
  valeursInitiales,
  schemaDeValidation,
  children
}) => (
  <Formik
    initialValues={valeursInitiales}
    validationSchema={schemaDeValidation}
    onSubmit={() => {}}
  >
    <Form>
      {children}
      <button type="submit">Valider</button>
    </Form>
  </Formik>
);

describe("Schema de validation: nomSecable", () => {
  test("LORSQUE le formulaire est soumis et que le champ nom est vide, ALORS une erreur apparait", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{ nomSecable: { nom: "", secable: false, nomPartie1: "", nomPartie2: "" } }}
        schemaDeValidation={SchemaValidation.objet({
          nomSecable: SchemaValidation.nomSecable({ obligatoire: conditionToujoursObligatoire("nomSecable.nom") })
        })}
      >
        <ChampsNomSecable
          nom={{ name: "nomSecable.nom", libelle: "Nom" }}
          secable={{ name: "nomSecable.secable", libelle: "Nom sécable" }}
          nomPartie1={{ name: "nomSecable.nomPartie1", libelle: "Nom 1ère partie" }}
          nomPartie2={{ name: "nomSecable.nomPartie2", libelle: "Nom 2nde partie" }}
        />
      </MockFormulaire>
    );
    userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => screen.findByText("⚠ La saisie du champ est obligatoire"));
  });
});
