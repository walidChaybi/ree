import React, { useState } from "react";
import {
  render,
  waitFor,
  act,
  screen,
  fireEvent
} from "@testing-library/react";
import { Field, Formik, Form } from "formik";
import DatesDebutFinAnneeFiltre, {
  DatesDebutFinAnneeDefaultValues,
  DatesDebutFinAnneeFiltreProps
} from "../../../../../views/pages/rechercheMultiCriteres/filtres/datesDebutFinAnnee/DatesDebutFinAnneeFiltre";
import { DATES_DEBUT_FIN_ANNEE } from "../../../../../views/pages/rechercheMultiCriteres/acteInscription/RMCActeInscriptionPage";
const HookDatesDebutFinAnneeFiltre: React.FC = () => {
  const [result, setResult] = useState("");

  const datesDebutFinAnneeFiltreProps = ({
    nomFiltre: DATES_DEBUT_FIN_ANNEE,
    key: DATES_DEBUT_FIN_ANNEE
  } as any) as DatesDebutFinAnneeFiltreProps;

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };
  return (
    <Formik
      initialValues={{
        datesDebutFinAnnee: { ...DatesDebutFinAnneeDefaultValues }
      }}
      onSubmit={handleClickButton}
    >
      <Form>
        <DatesDebutFinAnneeFiltre {...datesDebutFinAnneeFiltreProps} />
        <button type="submit">Submit</button>
        <Field as="textarea" value={result} data-testid="result" />
      </Form>
    </Formik>
  );
};

test("render composant DatesDebutFinAnneeFiltre", async () => {
  await act(async () => {
    render(<HookDatesDebutFinAnneeFiltre />);
  });

  const inputAnneeSeule = screen.getByLabelText(
    "datesDebutFinAnnee année"
  ) as HTMLInputElement;
  const inputJour = screen.getByLabelText(
    "datesDebutFinAnnee.dateDebut jour"
  ) as HTMLInputElement;
  const inputMois = screen.getByLabelText(
    "datesDebutFinAnnee.dateDebut mois"
  ) as HTMLInputElement;
  const inputAnnee = screen.getByLabelText(
    "datesDebutFinAnnee.dateDebut année"
  ) as HTMLInputElement;
  const inputJourFin = screen.getByLabelText(
    "datesDebutFinAnnee.dateFin jour"
  ) as HTMLInputElement;
  const inputMoisFin = screen.getByLabelText(
    "datesDebutFinAnnee.dateFin mois"
  ) as HTMLInputElement;
  const inputAnneeFin = screen.getByLabelText(
    "datesDebutFinAnnee.dateFin année"
  ) as HTMLInputElement;

  const allIputDateDebutDateFin = [
    inputJour,
    inputMois,
    inputAnnee,
    inputJourFin,
    inputMoisFin,
    inputAnneeFin
  ];

  await waitFor(() => {
    expectToBeDefined([inputAnneeSeule, ...allIputDateDebutDateFin]);
  });

  act(() => {
    fireEvent.input(inputAnneeSeule, {
      target: {
        value: "1990"
      }
    });
  });

  expect(inputAnneeSeule.value).toBe("1990");
  expectToBeDisabled(allIputDateDebutDateFin);

  act(() => {
    fireEvent.input(inputAnneeSeule, {
      target: {
        value: ""
      }
    });
  });

  expectToBeNotDisabled(allIputDateDebutDateFin);

  act(() => {
    fireEvent.input(inputJour, {
      target: {
        value: "10"
      }
    });
  });

  expectToBeDisabled([inputAnneeSeule]);

  act(() => {
    fireEvent.input(inputJour, {
      target: {
        value: ""
      }
    });
  });

  expectToBeNotDisabled([inputAnneeSeule]);

  act(() => {
    fireEvent.input(inputJourFin, {
      target: {
        value: "10"
      }
    });
  });

  expectToBeDisabled([inputAnneeSeule]);
});

function expectToBeDefined(elements: HTMLElement[]) {
  elements.forEach(el => expect(el).toBeDefined());
}

function expectToBeDisabled(elements: HTMLElement[]) {
  elements.forEach(el => expect(el).toBeDisabled());
}

function expectToBeNotDisabled(elements: HTMLElement[]) {
  elements.forEach(el => expect(el).not.toBeDisabled());
}
