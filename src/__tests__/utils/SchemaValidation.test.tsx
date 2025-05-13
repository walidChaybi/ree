import { ConditionChamp, EOperateurCondition, IConditionChampDto } from "@model/form/commun/ConditionChamp";
import { NumeroInscriptionRcRcaForm } from "@model/form/commun/NumeroInscriptionRcRcaForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form, Formik } from "formik";
import { describe, expect, test } from "vitest";
import ChampsNomSecable from "../../composants/commun/champs/ChampsNomSecable";
import ChampsNumeroInscriptionRcRca from "../../composants/commun/champs/ChampsNumeroInscriptionRcRca";
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
          nomPartie1={{ name: "nomSecable.nomPartie1", libelle: "Nom 1re partie" }}
          nomPartie2={{ name: "nomSecable.nomPartie2", libelle: "Nom 2nde partie" }}
        />
      </MockFormulaire>
    );
    userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => screen.findByText("⚠ La saisie du champ est obligatoire"));
  });
});

describe("Schema de validation: nomSecable", () => {
  test("LORSQUE le formulaire est soumis et que le champ n'est pas valide, ALORS une erreur apparait", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{ numero: { ligne1: "" } }}
        schemaDeValidation={SchemaValidation.objet({
          numero: SchemaValidation.numerosInscriptionRcRca({
            prefix: `numero.ligne`,
            tailleMax: 1,
            obligatoire: conditionToujoursObligatoire("numero.ligne1")
          })
        })}
      >
        <ChampsNumeroInscriptionRcRca
          libelle={"Numéro"}
          cheminNumeroInscriptionRcRca={"numero"}
          prefixeNumeroInscriptionRcRca={"ligne"}
          tailleMax={1}
        />
      </MockFormulaire>
    );
    userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.getByText("⚠ La saisie du champ est obligatoire")).toBeDefined());

    const InputNumero: HTMLInputElement = screen.getByRole("textbox", { name: "aria-label-numero.ligne1" });

    await userEvent.type(InputNumero, "123");
    userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.getByText("⚠ La date est invalide")).toBeDefined());

    await userEvent.type(InputNumero, "4");
    userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.getByText("⚠ Le champ est invalide")).toBeDefined());

    await userEvent.type(InputNumero, "-567890000001");
    userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => {
      expect(screen.queryByText("⚠ La saisie du champ est obligatoie")).toBeNull();
      expect(InputNumero.value).toBe("1234-56789");
    });
  });
  test("LORSQUE plusieurs champs sont présents, ALORS les bonnes erreurs apparaissent sur les bons champs", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{ numero: { ...NumeroInscriptionRcRcaForm.valeursInitiales() } }}
        schemaDeValidation={SchemaValidation.objet({
          numero: SchemaValidation.numerosInscriptionRcRca({
            prefix: `numero.ligne`,
            tailleMax: 6,
            obligatoire: conditionToujoursObligatoire("numero.ligne1")
          })
        })}
      >
        <ChampsNumeroInscriptionRcRca
          libelle={"Numéro"}
          cheminNumeroInscriptionRcRca={"numero"}
          prefixeNumeroInscriptionRcRca={"ligne"}
          tailleMax={6}
        />
      </MockFormulaire>
    );
    userEvent.click(screen.getByRole("button", { name: "Ajouter un numéro" }));
    userEvent.click(screen.getByRole("button", { name: "Ajouter un numéro" }));
    userEvent.click(screen.getByRole("button", { name: "Ajouter un numéro" }));
    userEvent.click(screen.getByRole("button", { name: "Ajouter un numéro" }));
    userEvent.click(screen.getByRole("button", { name: "Ajouter un numéro" }));
    userEvent.click(screen.getByRole("button", { name: "Ajouter un numéro" }));

    userEvent.click(screen.getByRole("button", { name: "Valider" }));

    await waitFor(() => expect(screen.queryAllByText("⚠ La saisie du champ est obligatoire")).toHaveLength(1));

    const InputNumero1: HTMLInputElement = screen.getByRole("textbox", { name: "aria-label-numero.ligne1" });
    const InputNumero2: HTMLInputElement = screen.getByRole("textbox", { name: "aria-label-numero.ligne2" });
    const InputNumero3: HTMLInputElement = screen.getByRole("textbox", { name: "aria-label-numero.ligne3" });
    const InputNumero4: HTMLInputElement = screen.getByRole("textbox", { name: "aria-label-numero.ligne4" });
    const InputNumero5: HTMLInputElement = screen.getByRole("textbox", { name: "aria-label-numero.ligne5" });
    const InputNumero6: HTMLInputElement = screen.getByRole("textbox", { name: "aria-label-numero.ligne6" });

    await waitFor(() => {
      expect(InputNumero1).toBeDefined();
      expect(InputNumero2).toBeDefined();
      expect(InputNumero3).toBeDefined();
      expect(InputNumero4).toBeDefined();
      expect(InputNumero5).toBeDefined();
      expect(InputNumero6).toBeDefined();

      expect(screen.queryByRole("textbox", { name: "aria-label-numero.ligne7" })).toBeNull();
    });

    fireEvent.input(InputNumero5, { target: { value: "002-" } });
    fireEvent.input(InputNumero4, { target: { value: "12345" } });
    fireEvent.input(InputNumero3, { target: { value: "-12345" } });
    fireEvent.input(InputNumero2, { target: { value: "2024" } });

    userEvent.click(screen.getByRole("button", { name: "Valider" }));

    await waitFor(() => {
      expect(screen.queryAllByText("⚠ La saisie du champ est obligatoire")).toHaveLength(1);
      expect(screen.queryAllByText("⚠ La date est invalide")).toHaveLength(2);
      expect(screen.queryAllByText("⚠ La saisie de la date est obligatoire")).toHaveLength(1);
      expect(screen.queryAllByText("⚠ Le champ est invalide")).toHaveLength(1);
    });
  });
});
