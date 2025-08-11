import { ConditionChamp, EOperateurCondition, IConditionChampDto } from "@model/form/commun/ConditionChamp";
import { NumeroRcRcaPacsForm } from "@model/form/commun/NumeroRcRcaPacsForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import { describe, expect, test } from "vitest";
import ChampTexte from "../../composants/commun/champs/ChampTexte";
import ChampsNomSecable from "../../composants/commun/champs/ChampsNomSecable";
import ChampNumeroRcRcaPacs from "../../composants/commun/champs/ChampsNumeroRcRcaPacs";
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
    await waitFor(() => expect(screen.getByText("⚠ La saisie du champ est obligatoire")).toBeDefined());
  });
});

describe("Schema de validation: champsNumeroRcRcaPacs", () => {
  test("LORSQUE le formulaire est soumis et que le champ n'est pas valide, ALORS une erreur apparait", async () => {
    const { container } = render(
      <MockFormulaire
        valeursInitiales={{ numero: NumeroRcRcaPacsForm.valeursInitiales() }}
        schemaDeValidation={SchemaValidation.objet({
          numero: SchemaValidation.numerosRcRcaPacs({
            prefix: `numero.ligne`,
            tailleMax: 1,
            obligatoire: conditionToujoursObligatoire("numero.ligne1")
          })
        })}
      >
        <ChampNumeroRcRcaPacs
          libelle={"Numéro"}
          cheminNumeroRcRcaPacs={"numero"}
          prefixeNumeroRcRcaPacs={"ligne"}
          tailleMax={1}
        />
      </MockFormulaire>
    );

    const boutonValider = screen.getByRole("button", { name: "Valider" });

    await userEvent.click(boutonValider);
    expect(container.firstChild).toMatchSnapshot();

    const [champAnnee, champNumero] = screen.getAllByRole("textbox");

    await userEvent.type(champAnnee, "123");
    await userEvent.click(boutonValider);
    expect(container.firstChild).toMatchSnapshot();

    await userEvent.clear(champAnnee);
    await userEvent.type(champAnnee, `${dayjs().get("year") + 1}`);
    await userEvent.click(boutonValider);
    expect(container.firstChild).toMatchSnapshot();

    await userEvent.clear(champAnnee);
    await userEvent.type(champNumero, "4");
    await userEvent.click(boutonValider);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("LORSQUE plusieurs champs sont présents, ALORS les bonnes erreurs apparaissent sur les bons champs", async () => {
    const { container } = render(
      <MockFormulaire
        valeursInitiales={{ numero: { ...NumeroRcRcaPacsForm.valeursInitiales() } }}
        schemaDeValidation={SchemaValidation.objet({
          numero: SchemaValidation.numerosRcRcaPacs({
            prefix: `numero.ligne`,
            tailleMax: 6,
            obligatoire: conditionToujoursObligatoire("numero.ligne1")
          })
        })}
      >
        <ChampNumeroRcRcaPacs
          libelle={"Numéro"}
          cheminNumeroRcRcaPacs={"numero"}
          prefixeNumeroRcRcaPacs={"ligne"}
          tailleMax={6}
        />
      </MockFormulaire>
    );

    const boutonAjout = screen.getByRole("button", { name: "Ajouter un numéro" });
    await userEvent.click(boutonAjout);
    await userEvent.click(boutonAjout);
    await userEvent.click(boutonAjout);
    await userEvent.click(boutonAjout);
    await userEvent.click(boutonAjout);
    await userEvent.click(boutonAjout);

    const boutonValider = screen.getByRole("button", { name: "Valider" });
    await userEvent.click(boutonValider);
    expect(container.firstChild).toMatchSnapshot();

    const champs = screen.getAllByRole("textbox");
    const dernierChampNumero = champs.pop();
    const dernierChampAnnee = champs.pop();
    expect(dernierChampNumero).toBeDefined();
    expect(dernierChampAnnee).toBeDefined();

    if (dernierChampNumero && dernierChampAnnee) {
      await userEvent.type(dernierChampAnnee, "1900");
      await userEvent.type(dernierChampNumero, "11111");
      await userEvent.click(boutonValider);
      expect(container.firstChild).toMatchSnapshot();
    }
  });
});

describe("Schema de validation: comparerValeurChamps", () => {
  test("LORSQUE le formulaire est soumis et que deux champs inter-dépendants ne remplissent pas la conditon, ALORS une erreur apparait", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{ champ1: "", champ2: "" }}
        schemaDeValidation={SchemaValidation.objet({
          champ1: SchemaValidation.texte({
            comparaisonValeurAutreChamp: {
              cheminChampCompare: "champ2",
              operateur: EOperateurCondition.EGAL,
              messageErreurSpecifique: "⚠ Incohérence entre les valeurs champ2/champ1"
            }
          }),
          champ2: SchemaValidation.texte({
            comparaisonValeurAutreChamp: {
              cheminChampCompare: "champ1",
              operateur: EOperateurCondition.EGAL,
              messageErreurSpecifique: "⚠ Incohérence entre les valeurs champ1/champ2"
            }
          })
        })}
      >
        <ChampTexte
          name="champ1"
          aria-label="champ1"
        />
        <ChampTexte
          name="champ2"
          aria-label="champ2"
        />
      </MockFormulaire>
    );

    fireEvent.change(screen.getByLabelText("champ1"), { target: { value: "Bonjour" } });
    fireEvent.change(screen.getByLabelText("champ2"), { target: { value: "Au revoir" } });
    fireEvent.click(screen.getByText("Valider"));

    await waitFor(() => {
      expect(screen.getByText("⚠ Incohérence entre les valeurs champ2/champ1")).toBeDefined();
      expect(screen.getByText("⚠ Incohérence entre les valeurs champ1/champ2")).toBeDefined();
    });
  });
});
