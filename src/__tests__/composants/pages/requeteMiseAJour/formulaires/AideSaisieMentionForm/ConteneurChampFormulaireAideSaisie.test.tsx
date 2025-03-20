import { ChampMetaModele, ETypeChamp } from "@model/etatcivil/typesMention/MetaModeleTypeMention";
import { EOperateurCondition } from "@model/form/commun/ConditionChamp";
import { render, screen, waitFor } from "@testing-library/react";
import { Form, Formik } from "formik";
import { describe, expect, test } from "vitest";
import { ConteneurChampFormulaireAideSaisie } from "../../../../../../composants/pages/requetesMiseAJour/formulaires/mentions/AideSaisieMentionForm/ConteneurChampFormulaireAideSaisie";
import SchemaValidation from "../../../../../../utils/SchemaValidation";

const getChampParType = (typeChamp: ETypeChamp, estMasque: boolean = false) =>
  ChampMetaModele.depuisDto({
    id: "idTest",
    libelle: "Libelle du champ",
    type: typeChamp,
    position: 1,
    estAffiche: [
      {
        idChampReference: null,
        operateur: estMasque ? EOperateurCondition.TOUJOURS_FAUX : EOperateurCondition.TOUJOURS_VRAI,
        valeurs: null
      }
    ],
    estObligatoire: [
      {
        idChampReference: null,
        operateur: EOperateurCondition.TOUJOURS_FAUX,
        valeurs: null
      }
    ],
    valeursPossibles: [],
    estLectureSeule: []
  });

const MockFormulaire: React.FC<{ children: any }> = ({ children }) => (
  <Formik
    initialValues={{ test: "test" }}
    validationSchema={SchemaValidation.objet({})}
    onSubmit={() => {}}
  >
    <Form>
      {children}
      <button type="submit">Valider</button>
    </Form>
  </Formik>
);

describe("Affichage des différents types de champs possible dans l'aide à la saisie", () => {
  const formulaireAvecChampAffiche = (typeChamp: ETypeChamp, idBloc: string) => (
    <MockFormulaire>
      <ConteneurChampFormulaireAideSaisie
        champ={getChampParType(typeChamp)!}
        idBloc={idBloc}
      />
    </MockFormulaire>
  );

  test("AFFICHE correctement les champs de type NOM_SECABLE", async () => {
    render(formulaireAvecChampAffiche(ETypeChamp.NOM_SECABLE, "nomSecable"));

    await waitFor(() => {
      expect(screen.getByRole("textbox", { name: "aria-label-nomSecable.idTest.nom" })).toBeDefined();
      expect(screen.getByRole("checkbox", { name: "Nom sécable" })).toBeDefined();
    });
  });
  test("AFFICHE correctement les champs de type DATE_COMPLETE", async () => {
    render(formulaireAvecChampAffiche(ETypeChamp.DATE_COMPLETE, "date"));

    await waitFor(() => {
      expect(screen.getByPlaceholderText("JJ")).toBeDefined();
      expect(screen.getByPlaceholderText("MM")).toBeDefined();
      expect(screen.getByPlaceholderText("AAAA")).toBeDefined();
    });
  });
  test("AFFICHE correctement les champs de type DATE_INCOMPLETE", async () => {
    render(formulaireAvecChampAffiche(ETypeChamp.DATE_INCOMPLETE, "date"));

    await waitFor(() => {
      expect(screen.getByPlaceholderText("JJ")).toBeDefined();
      expect(screen.getByPlaceholderText("MM")).toBeDefined();
      expect(screen.getByPlaceholderText("AAAA")).toBeDefined();
    });
  });
  test("AFFICHE correctement les champs de type TEXTE", async () => {
    render(formulaireAvecChampAffiche(ETypeChamp.TEXT, "text"));

    await waitFor(() => {
      expect(screen.getByRole("textbox", { name: "aria-label-text.idTest" })).toBeDefined();
    });
  });
  test("AFFICHE correctement les champs de type BOOLEAN", async () => {
    render(
      <MockFormulaire>
        <ConteneurChampFormulaireAideSaisie
          champ={getChampParType(ETypeChamp.BOOLEAN)!}
          idBloc={"boolean"}
        />
      </MockFormulaire>
    );
    await waitFor(() => {
      expect(screen.getByRole("checkbox", { name: "Libelle du champ" })).toBeDefined();
    });
  });
  test("AFFICHE correctement les champs de type POCOPA", async () => {
    render(formulaireAvecChampAffiche(ETypeChamp.POCOPA, "pocopa"));

    await waitFor(() => {
      expect(screen.getByRole("combobox", { name: "Libelle du champ" })).toBeDefined();
    });
  });
  test("AFFICHE correctement les champs de type ANNEE", async () => {
    render(formulaireAvecChampAffiche(ETypeChamp.ANNEE, "annee"));

    await waitFor(() => {
      expect(screen.getByRole("textbox", { name: "aria-label-annee.idTest" })).toBeDefined();
    });
  });
  test("AFFICHE correctement les champs de type INT", async () => {
    render(formulaireAvecChampAffiche(ETypeChamp.INT, "nombre"));

    await waitFor(() => {
      expect(screen.getByRole("textbox", { name: "aria-label-nombre.idTest" })).toBeDefined();
    });
  });
  test("AFFICHE correctement les champs de type CRPCEN", async () => {
    render(formulaireAvecChampAffiche(ETypeChamp.CRPCEN, "crpcen"));

    await waitFor(() => {
      expect(screen.getByRole("textbox", { name: "aria-label-crpcen.idTest" })).toBeDefined();
    });
  });
  test("AFFICHE correctement les champs de type SOUS_TITRE", async () => {
    render(formulaireAvecChampAffiche(ETypeChamp.SOUS_TITRE, "sous-titre"));

    await waitFor(() => {
      expect(screen.getByText("Libelle du champ")).toBeDefined();
    });
  });
  test("AFFICHE aucun champs lorsqu'il n'y à pas de type", async () => {
    render(formulaireAvecChampAffiche({} as ETypeChamp, "aucun"));

    await waitFor(() => {
      expect(screen.queryByText("Libelle du champ")).toBeDefined();
    });
  });
});

describe("Masquage des différents types de champs possible dans l'aide à la saisie", () => {
  const formulaireAvecChampMasque = (typeChamp: ETypeChamp, idBloc: string) => (
    <MockFormulaire>
      <ConteneurChampFormulaireAideSaisie
        champ={getChampParType(typeChamp, true)!}
        idBloc={idBloc}
      />
    </MockFormulaire>
  );

  test("MASQUE correctement les champs de type NOM_SECABLE", async () => {
    render(formulaireAvecChampMasque(ETypeChamp.NOM_SECABLE, "nomSecable"));

    await waitFor(() => {
      expect(screen.queryByRole("textbox", { name: "aria-label-nomSecable.idTest.nom" })).toBeNull();
      expect(screen.queryByRole("checkbox", { name: "Nom sécable" })).toBeNull();
    });
  });
  test("MASQUE correctement les champs de type DATE_COMPLETE", async () => {
    render(formulaireAvecChampMasque(ETypeChamp.DATE_COMPLETE, "date"));

    await waitFor(() => {
      expect(screen.queryByPlaceholderText("JJ")).toBeNull();
      expect(screen.queryByPlaceholderText("MM")).toBeNull();
      expect(screen.queryByPlaceholderText("AAAA")).toBeNull();
    });
  });
  test("MASQUE correctement les champs de type DATE_INCOMPLETE", async () => {
    render(formulaireAvecChampMasque(ETypeChamp.DATE_INCOMPLETE, "date"));

    await waitFor(() => {
      expect(screen.queryByPlaceholderText("JJ")).toBeNull();
      expect(screen.queryByPlaceholderText("MM")).toBeNull();
      expect(screen.queryByPlaceholderText("AAAA")).toBeNull();
    });
  });
  test("MASQUE correctement les champs de type TEXTE", async () => {
    render(formulaireAvecChampMasque(ETypeChamp.TEXT, "text"));

    await waitFor(() => {
      expect(screen.queryByRole("textbox", { name: "aria-label-text.idTest" })).toBeNull();
    });
  });
  test("MASQUE correctement les champs de type BOOLEAN", async () => {
    render(formulaireAvecChampMasque(ETypeChamp.BOOLEAN, "boolean"));

    await waitFor(() => {
      expect(screen.queryByRole("checkbox", { name: "Libelle du champ" })).toBeNull();
    });
  });
  test("MASQUE correctement les champs de type POCOPA", async () => {
    render(formulaireAvecChampMasque(ETypeChamp.POCOPA, "pocopa"));

    await waitFor(() => {
      expect(screen.queryByRole("combobox", { name: "Libelle du champ" })).toBeNull();
    });
  });
  test("MASQUE correctement les champs de type ANNEE", async () => {
    render(formulaireAvecChampMasque(ETypeChamp.ANNEE, "annee"));

    await waitFor(() => {
      expect(screen.queryByRole("textbox", { name: "aria-label-annee.idTest" })).toBeNull();
    });
  });
  test("MASQUE correctement les champs de type INT", async () => {
    render(formulaireAvecChampMasque(ETypeChamp.INT, "nombre"));

    await waitFor(() => {
      expect(screen.queryByRole("textbox", { name: "aria-label-nombre.idTest" })).toBeNull();
    });
  });
  test("MASQUE correctement les champs de type CRPCEN", async () => {
    render(formulaireAvecChampMasque(ETypeChamp.CRPCEN, "crpcen"));

    await waitFor(() => {
      expect(screen.queryByRole("textbox", { name: "aria-label-crpcen.idTest" })).toBeNull();
    });
  });
  test("MASQUE correctement les champs de type SOUS_TITRE", async () => {
    render(formulaireAvecChampMasque(ETypeChamp.SOUS_TITRE, "sous-titre"));

    await waitFor(() => {
      expect(screen.queryByText("Libelle du champ")).toBeNull();
    });
  });
});
