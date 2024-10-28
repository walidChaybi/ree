import { TITULAIRE } from "@pages/rechercheMultiCriteres/acteInscription/RMCActeInscriptionForm";
import RMCBoutons, { RMCBoutonsProps } from "@pages/rechercheMultiCriteres/boutons/RMCBoutons";
import TitulaireFiltre, {
  TitulaireDefaultValues,
  TitulaireFiltreProps
} from "@pages/rechercheMultiCriteres/filtres/titulaire/TitulaireFiltre";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { stockageDonnees } from "@util/stockageDonnees";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { expect, test } from "vitest";

const HookConsummerRMCBoutons: React.FC = () => {
  const rappelCriteres = () => {
    return stockageDonnees.recupererCriteresRMCActeInspt();
  };

  const titulaireFiltreProps = {
    nomFiltre: TITULAIRE
  } as TitulaireFiltreProps;

  const boutonsProps = {
    rappelCriteres
  } as RMCBoutonsProps;

  const [result, setResult] = useState("");
  const handleClickButton = (values: any) => {
    stockageDonnees.stockerCriteresRMCActeInspt(values);
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
        <RMCBoutons {...boutonsProps} />
        <Field
          as="textarea"
          value={result}
          data-testid="result"
        />
      </Form>
    </Formik>
  );
};

test("render composant RMCBoutons", () => {
  render(<HookConsummerRMCBoutons />);

  expect(screen.getByText(/Rappel critères/i)).toBeDefined();
  expect(screen.getByText(/Réinitialiser les critères/i)).toBeDefined();
  expect(screen.getByText(/Rechercher/i)).toBeDefined();
});

test("Click boutons", async () => {
  render(<HookConsummerRMCBoutons />);

  const inputNom: HTMLInputElement = screen.getByLabelText("Nom");
  const inputPrenom: HTMLInputElement = screen.getByLabelText("Prénom");
  const inputPays: HTMLInputElement = screen.getByLabelText("Pays de naissance");

  const boutonRappel: HTMLButtonElement = screen.getByText(/Rappel critères/i);
  const boutonReset: HTMLButtonElement = screen.getByText(/Réinitialiser les critères/i);

  const boutonSubmit: HTMLButtonElement = screen.getByText(/Rechercher/i);

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

  fireEvent.click(boutonSubmit);

  const result = screen.getByTestId("result");

  await waitFor(() => {
    expect(result.innerHTML).toBe(
      '{"titulaire":{"nom":"mockNom","prenom":"mockPrenom","dateNaissance":{"jour":"","mois":"","annee":""},"paysNaissance":"mockPays"}}'
    );
  });

  fireEvent.click(boutonReset);

  await waitFor(() => {
    expect(inputNom.value).toBe("");
    expect(inputPrenom.value).toBe("");
    expect(inputPays.value).toBe("");
  });

  fireEvent.click(boutonRappel);

  await waitFor(() => {
    expect(inputNom.value).toBe("mockNom");
    expect(inputPrenom.value).toBe("mockPrenom");
    expect(inputPays.value).toBe("mockPays");
  });
});
