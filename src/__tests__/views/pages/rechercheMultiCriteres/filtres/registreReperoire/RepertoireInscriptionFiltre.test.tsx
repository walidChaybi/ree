import { NatureRc } from "@model/etatcivil/enum/NatureRc";
import { NatureRca } from "@model/etatcivil/enum/NatureRca";
import { REPERTOIRE } from "@pages/rechercheMultiCriteres/filtres/registreReperoire/RegistreRepertoireFiltre";
import RepertoireInscriptionFiltre, {
  RepertoireInscriptionDefaultValues,
  RepertoireInscriptionFiltreProps
} from "@pages/rechercheMultiCriteres/filtres/registreReperoire/RepertoireInscriptionFiltre";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { expect, test } from "vitest";

const HookRepertoireInscriptionFiltre: React.FC = () => {
  const [result, setResult] = useState("");

  const repertoireInscriptionFiltreProps = {
    nomFiltre: REPERTOIRE
  } as RepertoireInscriptionFiltreProps;

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };

  NatureRc.init();
  NatureRca.init();

  return (
    <Formik
      initialValues={{
        [REPERTOIRE]: { ...RepertoireInscriptionDefaultValues }
      }}
      onSubmit={handleClickButton}
    >
      <Form>
        <RepertoireInscriptionFiltre {...repertoireInscriptionFiltreProps} />
        <button type="submit">Submit</button>
        <Field as="textarea" value={result} data-testid="result" />
      </Form>
    </Formik>
  );
};

test("Le champ Nature de l'inscription est conditionné par le choix de l'utilisateur pour le type de répertoire RC", () => {
  render(<HookRepertoireInscriptionFiltre />);

  const numeroInscription = screen.getByLabelText(
    "repertoire.numeroInscription"
  ) as HTMLInputElement;
  const typeRepertoire = screen.getByTestId(
    "repertoire.typeRepertoire"
  ) as HTMLSelectElement;
  const natureInscription = screen.getByTestId(
    "repertoire.natureInscription"
  ) as HTMLSelectElement;
  const submit = screen.getByText(/Submit/i);

  fireEvent.change(numeroInscription, {
    target: {
      value: "1982-123456789"
    }
  });
  fireEvent.change(typeRepertoire, {
    target: {
      value: "RC"
    }
  });
  fireEvent.input(typeRepertoire);

  fireEvent.change(natureInscription, {
    target: {
      value: "058a436b-330d-4c3c-83e0-e49d27390123"
    }
  });
  fireEvent.click(submit);

  const result = screen.getByTestId("result");
  waitFor(() => {
    expect(natureInscription.disabled).toBeFalsy();
    expect(result.innerHTML).toBe(
      '{"repertoire":{"numeroInscription":"1982-123456789","typeRepertoire":"RC","natureInscription":"058a436b-330d-4c3c-83e0-e49d27390123"}}'
    );
  });
});

test("Le champ Nature de l'inscription est conditionné par le choix de l'utilisateur pour le type de répertoire RCA", () => {
  render(<HookRepertoireInscriptionFiltre />);

  const numeroInscription = screen.getByLabelText(
    "repertoire.numeroInscription"
  ) as HTMLInputElement;
  const typeRepertoire = screen.getByTestId(
    "repertoire.typeRepertoire"
  ) as HTMLSelectElement;
  const natureInscription = screen.getByTestId(
    "repertoire.natureInscription"
  ) as HTMLSelectElement;
  const submit = screen.getByText(/Submit/i);

  fireEvent.change(numeroInscription, {
    target: {
      value: "1982-123456789"
    }
  });
  fireEvent.change(typeRepertoire, {
    target: {
      value: "RCA"
    }
  });
  fireEvent.input(typeRepertoire);

  fireEvent.change(natureInscription, {
    target: {
      value: "358a436b-330d-4c3c-83e0-e49d27390123"
    }
  });
  fireEvent.click(submit);

  const result = screen.getByTestId("result");
  waitFor(() => {
    expect(natureInscription.disabled).toBeFalsy();
    expect(result.innerHTML).toBe(
      '{"repertoire":{"numeroInscription":"1982-123456789","typeRepertoire":"RCA","natureInscription":"358a436b-330d-4c3c-83e0-e49d27390123"}}'
    );
  });
});

test("Le champ Nature de l'inscription est désactivé par le choix de l'utilisateur pour le type de répertoire PACS", () => {
  render(<HookRepertoireInscriptionFiltre />);

  const numeroInscription = screen.getByLabelText(
    "repertoire.numeroInscription"
  ) as HTMLInputElement;
  const typeRepertoire = screen.getByTestId(
    "repertoire.typeRepertoire"
  ) as HTMLSelectElement;
  const natureInscription = screen.getByTestId(
    "repertoire.natureInscription"
  ) as HTMLSelectElement;

  fireEvent.change(numeroInscription, {
    target: {
      value: "1982-123456789"
    }
  });
  fireEvent.change(typeRepertoire, {
    target: {
      value: "PACS"
    }
  });
  fireEvent.input(typeRepertoire);

  waitFor(() => {
    expect(natureInscription.disabled).toBeTruthy();
  });
});

test("Le champ Nature de l'inscription est désactivé car l'utilisateur n'a pas choisi de type de répertoire", () => {
  render(<HookRepertoireInscriptionFiltre />);

  const numeroInscription = screen.getByLabelText(
    "repertoire.numeroInscription"
  ) as HTMLInputElement;
  const natureInscription = screen.getByTestId(
    "repertoire.natureInscription"
  ) as HTMLSelectElement;

  fireEvent.change(numeroInscription, {
    target: {
      value: "1982-123456789"
    }
  });

  waitFor(() => {
    expect(natureInscription.disabled).toBeTruthy();
  });
});

test("Un tiret est automatiquement ajouté après le 4ème caractère du numéro d'inscription", () => {
  render(<HookRepertoireInscriptionFiltre />);

  const numeroInscription = screen.getByLabelText(
    "repertoire.numeroInscription"
  ) as HTMLInputElement;

  fireEvent.change(numeroInscription, {
    target: {
      value: "19826"
    }
  });

  fireEvent.input(numeroInscription);

  waitFor(() => {
    expect(numeroInscription.value).toEqual("1982-6");
  });
});

test("Un tiret n'est pas ajouté après le 4ème caractère du numéro d'inscription si le 5ème caractère est lui-même un tiret", () => {
  render(<HookRepertoireInscriptionFiltre />);

  const numeroInscription = screen.getByLabelText(
    "repertoire.numeroInscription"
  ) as HTMLInputElement;

  fireEvent.change(numeroInscription, {
    target: {
      value: "1982-"
    }
  });

  waitFor(() => {
    expect(numeroInscription.value).toEqual("1982-");
  });
});
