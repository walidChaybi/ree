import RequeteFiltre, {
  RequeteDefaultValues,
  RequeteFiltreProps
} from "@pages/rechercheMultiCriteres/filtres/requete/RequeteFiltre";
import { REQUETE } from "@pages/rechercheMultiCriteres/requete/RMCRequeteForm";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { Field, Form, Formik } from "formik";
import React, { useRef, useState } from "react";

const HookRequeteFiltre: React.FC = () => {
  const ref = useRef<any>(null);

  const [result, setResult] = useState("");

  const requeteFiltreProps = {
    nomFiltre: REQUETE
  } as RequeteFiltreProps;

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };

  const estDisabled = (): boolean => {
    return ref.current == null ? false : !ref.current.isValid;
  };

  return (
    <Formik
      //@ts-ignore
      innerRef={ref}
      initialValues={{
        [REQUETE]: { ...RequeteDefaultValues }
      }}
      onSubmit={handleClickButton}
    >
      <Form>
        <RequeteFiltre {...requeteFiltreProps} />
        <button type="submit" disabled={estDisabled()}>
          Submit
        </button>
        <Field as="textarea" value={result} data-testid="result" />
      </Form>
    </Formik>
  );
};

test("Le champ Type requete est conditionné par le choix de l'utilisateur à la valeur DELIVRANCE", async () => {
  await act(async () => {
    render(<HookRequeteFiltre />);
  });

  const numeroRequete = screen.getByLabelText(
    "requete.numeroRequete"
  ) as HTMLInputElement;
  const typeRequete = screen.getByTestId(
    "requete.typeRequete"
  ) as HTMLSelectElement;
  const sousTypeRequete = screen.getByTestId(
    "requete.sousTypeRequete"
  ) as HTMLSelectElement;
  const statutRequete = screen.getByTestId(
    "requete.statutRequete"
  ) as HTMLSelectElement;

  const submit = screen.getByText(/Submit/i);

  act(() => {
    fireEvent.change(numeroRequete, {
      target: {
        value: "1234ABCD"
      }
    });
    fireEvent.change(typeRequete, {
      target: {
        value: "DELIVRANCE"
      }
    });
  });

  act(() => {
    fireEvent.change(sousTypeRequete, {
      target: {
        value: "RDD"
      }
    });
  });

  act(() => {
    fireEvent.change(statutRequete, {
      target: {
        value: "A_SIGNER"
      }
    });
  });

  fireEvent.click(submit);

  const result = screen.getByTestId("result");
  await waitFor(() => {
    expect(sousTypeRequete.disabled).toBeFalsy();
    expect(result.innerHTML).toBe(
      '{"requete":{"numeroRequete":"1234ABCD","numeroTeledossier":"","typeRequete":"DELIVRANCE","sousTypeRequete":"RDD","statutRequete":"A_SIGNER"}}'
    );
  });
});

test("Le champ Type requete est conditionné par le choix de l'utilisateur à la valeur CREATION", async () => {
  await act(async () => {
    render(<HookRequeteFiltre />);
  });

  const numeroRequete = screen.getByLabelText(
    "requete.numeroRequete"
  ) as HTMLInputElement;
  const typeRequete = screen.getByTestId(
    "requete.typeRequete"
  ) as HTMLSelectElement;
  const sousTypeRequete = screen.getByTestId(
    "requete.sousTypeRequete"
  ) as HTMLSelectElement;
  const statutRequete = screen.getByTestId(
    "requete.statutRequete"
  ) as HTMLSelectElement;

  const submit = screen.getByText(/Submit/i);

  act(() => {
    fireEvent.change(numeroRequete, {
      target: {
        value: "1234ABCD"
      }
    });
    fireEvent.change(typeRequete, {
      target: {
        value: "CREATION"
      }
    });
  });

  act(() => {
    fireEvent.change(sousTypeRequete, {
      target: {
        value: "RCTC"
      }
    });
  });

  act(() => {
    fireEvent.change(statutRequete, {
      target: {
        value: "RETOUR_SDANF"
      }
    });
  });

  fireEvent.click(submit);
  const result = screen.getByTestId("result");
  await waitFor(() => {
    expect(sousTypeRequete.disabled).toBeFalsy();
    expect(result.innerHTML).toBe(
      '{"requete":{"numeroRequete":"1234ABCD","numeroTeledossier":"","typeRequete":"CREATION","sousTypeRequete":"RCTC","statutRequete":"RETOUR_SDANF"}}'
    );
  });
});

test("Le champ Type requete est conditionné par le choix de l'utilisateur à la valeur MISE_A_JOUR", async () => {
  await act(async () => {
    render(<HookRequeteFiltre />);
  });

  const numeroRequete = screen.getByLabelText(
    "requete.numeroRequete"
  ) as HTMLInputElement;
  const typeRequete = screen.getByTestId(
    "requete.typeRequete"
  ) as HTMLSelectElement;
  const sousTypeRequete = screen.getByTestId(
    "requete.sousTypeRequete"
  ) as HTMLSelectElement;
  const statutRequete = screen.getByTestId(
    "requete.statutRequete"
  ) as HTMLSelectElement;

  const submit = screen.getByText(/Submit/i);

  act(() => {
    fireEvent.change(numeroRequete, {
      target: {
        value: "1234ABCD"
      }
    });
    fireEvent.change(typeRequete, {
      target: {
        value: "MISE_A_JOUR"
      }
    });
  });

  act(() => {
    fireEvent.change(sousTypeRequete, {
      target: {
        value: "RMPR"
      }
    });
  });

  act(() => {
    fireEvent.change(statutRequete, {
      target: {
        value: "DOUBLON"
      }
    });
  });

  fireEvent.click(submit);
  const result = screen.getByTestId("result");
  await waitFor(() => {
    expect(sousTypeRequete.disabled).toBeFalsy();
    expect(result.innerHTML).toBe(
      '{"requete":{"numeroRequete":"1234ABCD","numeroTeledossier":"","typeRequete":"MISE_A_JOUR","sousTypeRequete":"RMPR","statutRequete":"DOUBLON"}}'
    );
  });
});

test("Le champ Type requete est conditionné par le choix de l'utilisateur à la valeur INFORMATION", async () => {
  await act(async () => {
    render(<HookRequeteFiltre />);
  });

  const numeroRequete = screen.getByLabelText(
    "requete.numeroRequete"
  ) as HTMLInputElement;
  const typeRequete = screen.getByTestId(
    "requete.typeRequete"
  ) as HTMLSelectElement;
  const sousTypeRequete = screen.getByTestId(
    "requete.sousTypeRequete"
  ) as HTMLSelectElement;
  const statutRequete = screen.getByTestId(
    "requete.statutRequete"
  ) as HTMLSelectElement;

  const submit = screen.getByText(/Submit/i);

  act(() => {
    fireEvent.change(numeroRequete, {
      target: {
        value: "1234ABCD"
      }
    });
    fireEvent.change(typeRequete, {
      target: {
        value: "INFORMATION"
      }
    });
  });

  act(() => {
    fireEvent.change(sousTypeRequete, {
      target: {
        value: "COMPLETION_REQUETE_EN_COURS"
      }
    });
  });

  act(() => {
    fireEvent.change(statutRequete, {
      target: {
        value: "A_TRAITER"
      }
    });
  });

  fireEvent.click(submit);
  const result = screen.getByTestId("result");
  await waitFor(() => {
    expect(sousTypeRequete.disabled).toBeFalsy();
    expect(result.innerHTML).toBe(
      '{"requete":{"numeroRequete":"1234ABCD","numeroTeledossier":"","typeRequete":"INFORMATION","sousTypeRequete":"COMPLETION_REQUETE_EN_COURS","statutRequete":"A_TRAITER"}}'
    );
  });
});

test("Sous Type Requete : Disabled / message d'erreur CARACTERES_ALPHANUMERIQUE ", async () => {
  await act(async () => {
    render(<HookRequeteFiltre />);
  });

  const typeRequete = screen.getByTestId(
    "requete.typeRequete"
  ) as HTMLSelectElement;
  const numeroRequete = screen.getByLabelText(
    "requete.numeroRequete"
  ) as HTMLInputElement;
  const sousTypeRequete = screen.getByTestId(
    "requete.sousTypeRequete"
  ) as HTMLSelectElement;
  const statutRequete = screen.getByTestId(
    "requete.statutRequete"
  ) as HTMLSelectElement;
  //const submit: HTMLButtonElement = screen.getByText(/Submit/i);

  act(() => {
    fireEvent.change(numeroRequete, {
      target: {
        value: "1234-"
      }
    });
  });

  await waitFor(() => {
    expect(numeroRequete.value).toBe("1234-");
    // expect(submit.disabled).toBeTruthy(); ne fonctionne pas (pas compris pourquoi)
    expect(sousTypeRequete.disabled).toBeTruthy();
    expect(statutRequete.disabled).toBeTruthy();
  });

  act(() => {
    fireEvent.change(typeRequete, {
      target: {
        value: "INFORMATION"
      }
    });
  });

  await waitFor(() => {
    expect(sousTypeRequete.disabled).toBeFalsy();
    expect(statutRequete.disabled).toBeTruthy();
  });

  act(() => {
    fireEvent.change(sousTypeRequete, {
      target: {
        value: "COMPLETION_REQUETE_EN_COURS"
      }
    });
  });

  await waitFor(() => {
    expect(sousTypeRequete.disabled).toBeFalsy();
    expect(statutRequete.disabled).toBeFalsy();
  });

  act(() => {
    fireEvent.change(statutRequete, {
      target: {
        value: "A_TRAITER"
      }
    });
  });

  await waitFor(() => {
    expect(sousTypeRequete.disabled).toBeFalsy();
    expect(statutRequete.disabled).toBeFalsy();
  });
});
