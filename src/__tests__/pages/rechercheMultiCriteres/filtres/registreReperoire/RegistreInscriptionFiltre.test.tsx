import { Field, Form, Formik } from "formik";
import {
  render,
  waitFor,
  act,
  screen,
  fireEvent
} from "@testing-library/react";
import React, { useState } from "react";
import RepertoireInscriptionFiltre, {
  ComponentFiltreInscriptionProps,
  RepertoireInscriptionDefaultValues
} from "../../../../../views/pages/rechercheMultiCriteres/filtres/registreReperoire/RepertoireInscriptionFiltre";
import { REGISTRE_REPERTOIRE } from "../../../../../views/pages/rechercheMultiCriteres/RMCActeInscriptionPage";

const HookRegistreInscriptionFiltre: React.FC = () => {
  const [result, setResult] = useState("");

  const registreInscriptionFiltreProps = {
    nomFiltre: REGISTRE_REPERTOIRE
  } as ComponentFiltreInscriptionProps;

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };
  return (
    <Formik
      initialValues={{
        [REGISTRE_REPERTOIRE]: { ...RepertoireInscriptionDefaultValues }
      }}
      onSubmit={handleClickButton}
    >
      <Form>
        <RepertoireInscriptionFiltre {...registreInscriptionFiltreProps} />
        <button type="submit">Submit</button>
        <Field as="textarea" value={result} data-testid="result" />
      </Form>
    </Formik>
  );
};

test("Le champ Nature de l'inscription est conditionné par le choix de l'utilisateur pour le type de répertoire RC", async () => {
  await act(async () => {
    render(<HookRegistreInscriptionFiltre />);
  });

  const numeroInscription = screen.getByLabelText(
    "registreRepertoire.numeroInscription"
  ) as HTMLInputElement;
  const typeRepertoire = screen.getByLabelText(
    "registreRepertoire.typeRepertoire"
  ) as HTMLInputElement;
  const natureInscription = screen.getByLabelText(
    "registreRepertoire.natureInscription"
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
          value: "CURATELLE_SIMPLE"
        }
      });
      fireEvent.click(submit);
    });
  });

  const result = screen.getByTestId("result");
  await waitFor(() => {
    expect(natureInscription).not.toBeDisabled();
    expect(result.innerHTML).toBe(
      '{"registreRepertoire":{"numeroInscription":"1982-123456789","typeRepertoire":"RC","natureInscription":"CURATELLE_SIMPLE"}}'
    );
  });
});

test("Le champ Nature de l'inscription est conditionné par le choix de l'utilisateur pour le type de répertoire RCA", async () => {
  await act(async () => {
    render(<HookRegistreInscriptionFiltre />);
  });

  const numeroInscription = screen.getByLabelText(
    "registreRepertoire.numeroInscription"
  ) as HTMLInputElement;
  const typeRepertoire = screen.getByLabelText(
    "registreRepertoire.typeRepertoire"
  ) as HTMLInputElement;

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

  const natureInscription = screen.getByLabelText(
    "registreRepertoire.natureInscription"
  ) as HTMLInputElement;
  const submit = screen.getByText(/Submit/i);

  await waitFor(() => {
    act(() => {
      fireEvent.change(natureInscription, {
        target: {
          value: "FILIATION"
        }
      });
      fireEvent.click(submit);
    });
  });

  const result = screen.getByTestId("result");
  await waitFor(() => {
    expect(natureInscription).not.toBeDisabled();
    expect(result.innerHTML).toBe(
      '{"registreRepertoire":{"numeroInscription":"1982-123456789","typeRepertoire":"RCA","natureInscription":"FILIATION"}}'
    );
  });
});

test("Le champ Nature de l'inscription est désactivé par le choix de l'utilisateur pour le type de répertoire PACS", async () => {
  await act(async () => {
    render(<HookRegistreInscriptionFiltre />);
  });

  const numeroInscription = screen.getByLabelText(
    "registreRepertoire.numeroInscription"
  ) as HTMLInputElement;
  const typeRepertoire = screen.getByLabelText(
    "registreRepertoire.typeRepertoire"
  ) as HTMLInputElement;
  const natureInscription = screen.getByLabelText(
    "registreRepertoire.natureInscription"
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
  });

  await act(() => {
    fireEvent.input(typeRepertoire);
  });

  const submit = screen.getByText(/Submit/i);
  await waitFor(() => {
    act(() => {
      fireEvent.click(submit);
    });
  });

  await waitFor(() => {
    expect(natureInscription).toBeDisabled();
  });
});

test("Le champ Nature de l'inscription est désactivé car l'utilisateur n'a pas choisi de type de répertoire", async () => {
  await act(async () => {
    render(<HookRegistreInscriptionFiltre />);
  });

  const numeroInscription = screen.getByLabelText(
    "registreRepertoire.numeroInscription"
  ) as HTMLInputElement;
  const typeRepertoire = screen.getByLabelText(
    "registreRepertoire.typeRepertoire"
  ) as HTMLInputElement;
  const natureInscription = screen.getByLabelText(
    "registreRepertoire.natureInscription"
  ) as HTMLInputElement;

  act(() => {
    fireEvent.change(numeroInscription, {
      target: {
        value: "1982-123456789"
      }
    });
  });

  await act(() => {
    fireEvent.input(typeRepertoire);
  });

  const submit = screen.getByText(/Submit/i);
  await waitFor(() => {
    act(() => {
      fireEvent.click(submit);
    });
  });

  await waitFor(() => {
    expect(natureInscription).toBeDisabled();
  });
});

test("Un tiret est automatiquement ajouté après le 4ème caractère du numéro d'inscription", async () => {
  await act(async () => {
    render(<HookRegistreInscriptionFiltre />);
  });

  const numeroInscription = screen.getByLabelText(
    "registreRepertoire.numeroInscription"
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
    render(<HookRegistreInscriptionFiltre />);
  });

  const numeroInscription = screen.getByLabelText(
    "registreRepertoire.numeroInscription"
  ) as HTMLInputElement;

  act(() => {
    fireEvent.change(numeroInscription, {
      target: {
        value: "1982-"
      }
    });
  });

  await act(async () => {
    fireEvent.input(numeroInscription);
  });

  await waitFor(() => {
    expect(numeroInscription.value).toEqual("1982-");
  });
});
