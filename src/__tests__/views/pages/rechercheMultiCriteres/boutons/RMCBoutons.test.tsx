import { TITULAIRE } from "@pages/rechercheMultiCriteres/acteInscription/RMCActeInscriptionForm";
import RMCBoutons, {
  RMCBoutonsProps
} from "@pages/rechercheMultiCriteres/boutons/RMCBoutons";
import TitulaireFiltre, {
  TitulaireDefaultValues,
  TitulaireFiltreProps
} from "@pages/rechercheMultiCriteres/filtres/titulaire/TitulaireFiltre";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { stockageDonnees } from "@util/stockageDonnees";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";

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
        <Field as="textarea" value={result} data-testid="result" />
      </Form>
    </Formik>
  );
};

test("render composant RMCBoutons", async () => {
  await act(async () => {
    render(<HookConsummerRMCBoutons />);
  });

  await waitFor(() => {
    expect(screen.getByText(/Rappel critères/i)).toBeDefined();
    expect(screen.getByText(/Réinitialiser les critères/i)).toBeDefined();
    expect(screen.getByText(/Rechercher/i)).toBeDefined();
  });
});

test("Click boutons", async () => {
  await act(async () => {
    render(<HookConsummerRMCBoutons />);
  });

  const inputNom = screen.getByLabelText("Nom") as HTMLInputElement;
  const inputPrenom = screen.getByLabelText("Prénom") as HTMLInputElement;
  const inputPays = screen.getByLabelText(
    "Pays de naissance"
  ) as HTMLInputElement;

  const boutonRappel = screen.getByText(
    /Rappel critères/i
  ) as HTMLButtonElement;
  const boutonReset = screen.getByText(
    /Réinitialiser les critères/i
  ) as HTMLButtonElement;

  const boutonSubmit = screen.getByText(/Rechercher/i) as HTMLButtonElement;

  act(() => {
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
  });

  await act(async () => {
    fireEvent.click(boutonSubmit);
  });

  const result = screen.getByTestId("result");

  await waitFor(() => {
    expect(result.innerHTML).toBe(
      '{"titulaire":{"nom":"mockNom","prenom":"mockPrenom","dateNaissance":{"jour":"","mois":"","annee":""},"paysNaissance":"mockPays"}}'
    );
  });

  await act(async () => {
    fireEvent.click(boutonReset);
  });

  await waitFor(() => {
    expect(inputNom.value).toBe("");
    expect(inputPrenom.value).toBe("");
    expect(inputPays.value).toBe("");
  });

  await act(async () => {
    fireEvent.click(boutonRappel);
  });

  await waitFor(() => {
    expect(inputNom.value).toBe("mockNom");
    expect(inputPrenom.value).toBe("mockPrenom");
    expect(inputPays.value).toBe("mockPays");
  });
});
