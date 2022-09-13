import { DATES_DEBUT_FIN_ANNEE } from "@pages/rechercheMultiCriteres/acteInscription/RMCActeInscriptionForm";
import DatesDebutFinAnneeFiltre, {
  DatesDebutFinAnneeDefaultValues,
  DatesDebutFinAnneeFiltreProps
} from "@pages/rechercheMultiCriteres/filtres/datesDebutFinAnnee/DatesDebutFinAnneeFiltre";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";

const HookDatesDebutFinAnneeFiltre: React.FC = () => {
  const [result, setResult] = useState("");

  const datesDebutFinAnneeFiltreProps = {
    nomFiltre: DATES_DEBUT_FIN_ANNEE,
    key: DATES_DEBUT_FIN_ANNEE,
    anneeVisible: true
  } as any as DatesDebutFinAnneeFiltreProps;

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
        <button type="submit">Rechercher</button>
        <Field as="textarea" value={result} data-testid="result" />
      </Form>
    </Formik>
  );
};

test("render composant DatesDebutFinAnneeFiltre", async () => {
  await act(async () => {
    render(<HookDatesDebutFinAnneeFiltre />);
  });

  const inputJour = screen.getByLabelText(
    "datesDebutFinAnnee.dateDebut.jour"
  ) as HTMLInputElement;
  const inputMois = screen.getByLabelText(
    "datesDebutFinAnnee.dateDebut.mois"
  ) as HTMLInputElement;
  const inputAnnee = screen.getByLabelText(
    "datesDebutFinAnnee.dateDebut.annee"
  ) as HTMLInputElement;
  const inputJourFin = screen.getByLabelText(
    "datesDebutFinAnnee.dateFin.jour"
  ) as HTMLInputElement;
  const inputMoisFin = screen.getByLabelText(
    "datesDebutFinAnnee.dateFin.mois"
  ) as HTMLInputElement;
  const inputAnneeFin = screen.getByLabelText(
    "datesDebutFinAnnee.dateFin.annee"
  ) as HTMLInputElement;

  act(() => {
    fireEvent.input(inputJour, {
      target: {
        value: "10"
      }
    });
    fireEvent.input(inputMois, {
      target: {
        value: "10"
      }
    });
    fireEvent.input(inputAnneeFin, {
      target: {
        value: "2020"
      }
    });
    fireEvent.input(inputJourFin, {
      target: {
        value: "10"
      }
    });
    fireEvent.input(inputMoisFin, {
      target: {
        value: "10"
      }
    });
    fireEvent.input(inputAnnee, {
      target: {
        value: "1990"
      }
    });
  });

  const submit = screen.getByText(/Rechercher/i);
  await act(async () => {
    fireEvent.click(submit);
  });
});
