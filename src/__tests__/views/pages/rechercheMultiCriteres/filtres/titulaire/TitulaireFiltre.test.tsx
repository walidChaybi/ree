import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { ITitulaireRequete } from "@model/requete/ITitulaireRequete";
import { TITULAIRE } from "@pages/rechercheMultiCriteres/acteInscription/RMCActeInscription";
import TitulaireFiltre, {
  TitulaireDefaultValues,
  TitulaireFiltreProps
} from "@pages/rechercheMultiCriteres/filtres/titulaire/TitulaireFiltre";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { describe, expect, test } from "vitest";

const titulaire1: ITitulaireRequete = {
  id: "8b549d8d-eda3-4706-9a4f-bb45fde00155",
  position: 1,
  nomNaissance: "nomNaissance1",
  prenoms: [
    {
      prenom: "prenom11",
      numeroOrdre: 1
    },
    {
      prenom: "prenom12",
      numeroOrdre: 2
    }
  ],
  jourNaissance: 1,
  moisNaissance: 2,
  anneeNaissance: 1990,
  sexe: "M",
  nationalite: Nationalite.ETRANGERE,
  paysNaissance: "Maroc"
};

const titulaire2: ITitulaireRequete = {
  id: "87233557-bc8f-4b52-ad85-30c313463092",
  position: 2,
  nomNaissance: "nomNaissance2",
  prenoms: [
    {
      prenom: "prenom21",
      numeroOrdre: 1
    },
    {
      prenom: "prenom22",
      numeroOrdre: 2
    }
  ],
  jourNaissance: 20,
  moisNaissance: 10,
  anneeNaissance: 2002,
  sexe: "F",
  nationalite: Nationalite.ETRANGERE,
  paysNaissance: "Argentine"
};

const HookConsummerTitulaireForm: React.FC<{
  titulaires?: ITitulaireRequete[];
}> = props => {
  const [result, setResult] = useState("");

  const titulaireFiltreProps = {
    nomFiltre: TITULAIRE,
    titulaires: props.titulaires
  } as TitulaireFiltreProps;

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };

  return (
    <Formik
      initialValues={{
        [TITULAIRE]: { ...TitulaireDefaultValues }
      }}
      onSubmit={handleClickButton}
    >
      <Form>
        <TitulaireFiltre {...titulaireFiltreProps} />
        <button type="submit">Submit</button>
        <div data-testid="result">{result || "error"}</div>
      </Form>
    </Formik>
  );
};

test("DOIT rendre le composant formulaire Titulaire QUAND on l'affiche.", async () => {
  render(<HookConsummerTitulaireForm />);
  const inputNom: HTMLInputElement = screen.getByLabelText("Nom");
  const inputPrenom: HTMLInputElement = screen.getByLabelText("Prénom");
  const inputPays: HTMLInputElement = screen.getByLabelText("Pays de naissance");

  fireEvent.change(inputNom, {
    target: {
      value: "mockNom"
    }
  });
  fireEvent.change(inputPrenom, {
    target: {
      value: "mockPrenom"
    }
  });
  fireEvent.change(inputPays, {
    target: {
      value: "mockPays"
    }
  });

  const submit = screen.getByText(/Submit/i);
  fireEvent.click(submit);

  await waitFor(() =>
    expect(screen.getByTestId("result").innerHTML).toBe(
      '{"titulaire":{"nom":"mockNom","prenom":"mockPrenom","dateNaissance":{"jour":"","mois":"","annee":""},"paysNaissance":"mockPays"}}'
    )
  );
});

test("DOIT inverser nom et prenom QUAND on clique sur le bouton switch.", async () => {
  render(<HookConsummerTitulaireForm />);

  const inputNom: HTMLInputElement = screen.getByLabelText("Nom");
  const inputPrenom: HTMLInputElement = screen.getByLabelText("Prénom");

  fireEvent.change(inputNom, {
    target: {
      value: "mockNom"
    }
  });
  fireEvent.change(inputPrenom, {
    target: {
      value: "mockPrenom"
    }
  });

  const boutonSwitch = screen.getByLabelText("inverser nom et prénom");

  await waitFor(() => {
    expect(inputNom.value).toBe("mockNom");
    expect(inputPrenom.value).toBe("mockPrenom");
  });

  fireEvent.click(boutonSwitch);

  await waitFor(() => {
    expect(inputNom.value).toBe("mockPrenom");
    expect(inputPrenom.value).toBe("mockNom");
  });
});

test("DOIT reformater le champ 'nom' QUAND on sort du champ.", async () => {
  render(<HookConsummerTitulaireForm />);

  const inputNom: HTMLInputElement = screen.getByLabelText("Nom");

  fireEvent.change(inputNom, {
    target: {
      value: "  mock  Nom  "
    }
  });

  await waitFor(() => {
    expect(inputNom.value).toBe("  mock  Nom  ");
  });

  fireEvent.blur(inputNom);

  await waitFor(() => {
    expect(inputNom.value).toBe("mock Nom");
  });
});

describe("Tests des boutons 'Rappel titulaire'", () => {
  test("DOIT rendre aucun bouton QUAND aucun titulaire n'est présent.", async () => {
    render(<HookConsummerTitulaireForm titulaires={[]} />);

    await waitFor(() => {
      expect(screen.queryByText("Rappel titulaire")).toBeNull();
      expect(screen.queryByText("Rappel titulaire 1")).toBeNull();
      expect(screen.queryByText("Rappel titulaire 2")).toBeNull();
    });
  });

  test("DOIT rendre le bouton 'Rappel titulaire' QUAND un seul titulaire est présent.", async () => {
    render(<HookConsummerTitulaireForm titulaires={[titulaire1]} />);

    await waitFor(() => {
      expect(screen.queryByText("Rappel titulaire")).toBeDefined();
      expect(screen.queryByText("Rappel titulaire 1")).toBeNull();
      expect(screen.queryByText("Rappel titulaire 2")).toBeNull();
    });
  });

  test("DOIT rendre les boutons 'Rappel titulaire 1' et 'Rappel titulaire 2' QUAND deux titulaires sont présents.", async () => {
    render(<HookConsummerTitulaireForm titulaires={[titulaire1, titulaire2]} />);

    await waitFor(() => {
      expect(screen.queryByText("Rappel titulaire")).toBeNull();
      expect(screen.queryByText("Rappel titulaire 1")).toBeDefined();
      expect(screen.queryByText("Rappel titulaire 2")).toBeDefined();
    });
  });

  test("DOIT remplir les champs avec les informations du titulaire 1 QUAND on clique sur le bouton 'Rappel titulaire 1'.", async () => {
    render(<HookConsummerTitulaireForm titulaires={[titulaire1, titulaire2]} />);

    await waitFor(() => {
      expect(screen.queryByDisplayValue("nomNaissance1")).toBeNull();
      expect(screen.queryByDisplayValue("prenom11")).toBeNull();
      expect(screen.queryByDisplayValue("01")).toBeNull();
      expect(screen.queryByDisplayValue("01")).toBeNull();
      expect(screen.queryByDisplayValue("1990")).toBeNull();
      expect(screen.queryByDisplayValue("Maroc")).toBeNull();
    });

    fireEvent.click(screen.getByText("Rappel titulaire 1"));

    await waitFor(() => {
      expect(screen.queryByDisplayValue("nomNaissance1")).toBeDefined();
      expect(screen.queryByDisplayValue("prenom11")).toBeDefined();
      expect(screen.queryByDisplayValue("01")).toBeDefined();
      expect(screen.queryByDisplayValue("02")).toBeDefined();
      expect(screen.queryByDisplayValue("1990")).toBeDefined();
      expect(screen.queryByDisplayValue("Maroc")).toBeDefined();
    });
  });

  test("DOIT remplir les champs avec les informations du titulaire 2 QUAND on clique sur le bouton 'Rappel titulaire 2'.", async () => {
    render(<HookConsummerTitulaireForm titulaires={[titulaire1, titulaire2]} />);

    await waitFor(() => {
      expect(screen.queryByDisplayValue("nomNaissance2")).toBeNull();
      expect(screen.queryByDisplayValue("prenom21")).toBeNull();
      expect(screen.queryByDisplayValue("20")).toBeNull();
      expect(screen.queryByDisplayValue("10")).toBeNull();
      expect(screen.queryByDisplayValue("2002")).toBeNull();
      expect(screen.queryByDisplayValue("Argentine")).toBeNull();
    });

    fireEvent.click(screen.getByText("Rappel titulaire 2"));

    await waitFor(() => {
      expect(screen.queryByDisplayValue("nomNaissance2")).toBeDefined();
      expect(screen.queryByDisplayValue("prenom21")).toBeDefined();
      expect(screen.queryByDisplayValue("20")).toBeDefined();
      expect(screen.queryByDisplayValue("10")).toBeDefined();
      expect(screen.queryByDisplayValue("2002")).toBeDefined();
      expect(screen.queryByDisplayValue("Argentine")).toBeDefined();
    });
  });
});
