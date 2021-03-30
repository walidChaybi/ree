import {Field, Form, Formik} from "formik";
import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import React, {useState} from "react";
import RepertoireInscriptionFiltre, {
  ComponentFiltreInscriptionProps,
  RepertoireInscriptionDefaultValues
} from "../../../../../views/pages/rechercheMultiCriteres/filtres/registreReperoire/RepertoireInscriptionFiltre";
import {REPERTOIRE} from "../../../../../views/pages/rechercheMultiCriteres/filtres/registreReperoire/RegistreReperoireFiltre";
import request from "superagent";
import {configEtatcivil} from "../../../../../mock/superagent-config/superagent-mock-etatcivil";

const superagentMock = require("superagent-mock")(request, configEtatcivil);

const HookRepertoireInscriptionFiltre: React.FC = () => {
  const [result, setResult] = useState("");

  const repertoireInscriptionFiltreProps = {
    nomFiltre: REPERTOIRE
  } as ComponentFiltreInscriptionProps;

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };

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

test("Le champ Nature de l'inscription est conditionné par le choix de l'utilisateur pour le type de répertoire RC", async () => {
  await act(async () => {
    render(<HookRepertoireInscriptionFiltre />);
  });

  const numeroInscription = screen.getByLabelText(
    "repertoire.numeroInscription"
  ) as HTMLInputElement;
  const typeRepertoire = screen.getByLabelText(
    "repertoire.typeRepertoire"
  ) as HTMLInputElement;
  const natureInscription = screen.getByLabelText(
    "repertoire.natureInscription"
  ) as HTMLInputElement;
  const submit = screen.getByText(/Submit/i);

  act(() => {
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
  });

  await waitFor(() => {
    act(() => {
      fireEvent.change(natureInscription, {
        target: {
          value: "058a436b-330d-4c3c-83e0-e49d27390123"
        }
      });
      fireEvent.click(submit);
    });
  });

  const result = screen.getByTestId("result");
  await waitFor(() => {
    expect(natureInscription.disabled).toBeFalsy();
    expect(result.innerHTML).toBe(
        '{"repertoire":{"numeroInscription":"1982-123456789","typeRepertoire":"RC","natureInscription":"058a436b-330d-4c3c-83e0-e49d27390123"}}'
    );
  });
});

test("Le champ Nature de l'inscription est conditionné par le choix de l'utilisateur pour le type de répertoire RCA", async () => {
  await act(async () => {
    render(<HookRepertoireInscriptionFiltre />);
  });

  const numeroInscription = screen.getByLabelText(
    "repertoire.numeroInscription"
  ) as HTMLInputElement;
  const typeRepertoire = screen.getByLabelText(
    "repertoire.typeRepertoire"
  ) as HTMLInputElement;
  const natureInscription = screen.getByLabelText(
    "repertoire.natureInscription"
  ) as HTMLInputElement;
  const submit = screen.getByText(/Submit/i);

  act(() => {
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
  });

  await waitFor(() => {
    act(() => {
      fireEvent.change(natureInscription, {
        target: {
          value: "358a436b-330d-4c3c-83e0-e49d27390123"
        }
      });
      fireEvent.click(submit);
    });
  });

  const result = screen.getByTestId("result");
  await waitFor(() => {
    expect(natureInscription.disabled).toBeFalsy();
    expect(result.innerHTML).toBe(
        '{"repertoire":{"numeroInscription":"1982-123456789","typeRepertoire":"RCA","natureInscription":"358a436b-330d-4c3c-83e0-e49d27390123"}}'
    );
  });
});

test("Le champ Nature de l'inscription est désactivé par le choix de l'utilisateur pour le type de répertoire PACS", async () => {
  await act(async () => {
    render(<HookRepertoireInscriptionFiltre />);
  });

  const numeroInscription = screen.getByLabelText(
    "repertoire.numeroInscription"
  ) as HTMLInputElement;
  const typeRepertoire = screen.getByLabelText(
    "repertoire.typeRepertoire"
  ) as HTMLInputElement;
  const natureInscription = screen.getByLabelText(
    "repertoire.natureInscription"
  ) as HTMLInputElement;

  act(() => {
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
  });

  await waitFor(() => {
    expect(natureInscription.disabled).toBeTruthy();
  });
});

test("Le champ Nature de l'inscription est désactivé car l'utilisateur n'a pas choisi de type de répertoire", async () => {
  await act(async () => {
    render(<HookRepertoireInscriptionFiltre />);
  });

  const numeroInscription = screen.getByLabelText(
    "repertoire.numeroInscription"
  ) as HTMLInputElement;
  const natureInscription = screen.getByLabelText(
    "repertoire.natureInscription"
  ) as HTMLInputElement;

  act(() => {
    fireEvent.change(numeroInscription, {
      target: {
        value: "1982-123456789"
      }
    });
  });

  await waitFor(() => {
    expect(natureInscription.disabled).toBeTruthy();
  });
});

test("Un tiret est automatiquement ajouté après le 4ème caractère du numéro d'inscription", async () => {
  await act(async () => {
    render(<HookRepertoireInscriptionFiltre />);
  });

  const numeroInscription = screen.getByLabelText(
    "repertoire.numeroInscription"
  ) as HTMLInputElement;

  act(() => {
    fireEvent.change(numeroInscription, {
      target: {
        value: "19826"
      }
    });
  });

  await act(async () => {
    fireEvent.input(numeroInscription);
  });

  await waitFor(() => {
    expect(numeroInscription.value).toEqual("1982-6");
  });
});

test("Un tiret n'est pas ajouté après le 4ème caractère du numéro d'inscription si le 5ème caractère est lui-même un tiret", async () => {
  await act(async () => {
    render(<HookRepertoireInscriptionFiltre />);
  });

  const numeroInscription = screen.getByLabelText(
    "repertoire.numeroInscription"
  ) as HTMLInputElement;

  act(() => {
    fireEvent.change(numeroInscription, {
      target: {
        value: "1982-"
      }
    });
  });

  await waitFor(() => {
    expect(numeroInscription.value).toEqual("1982-");
  });
});
