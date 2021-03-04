import { Field, Form, Formik } from "formik";
import {
  render,
  waitFor,
  act,
  screen,
  fireEvent
} from "@testing-library/react";
import React, { useState } from "react";
import { REQUETE } from "../../../../../views/pages/rechercheMultiCriteres/requete/RMCRequetePage";
import RequeteFiltre, {
  RequeteDefaultValues,
  RequeteFiltreProps
} from "../../../../../views/pages/rechercheMultiCriteres/filtres/requete/RequeteFiltre";
import { CARACTERES_ALPHANUMERIQUE } from "../../../../../views/common/widget/formulaire/FormulaireMessages";

const HookRequeteFiltre: React.FC = () => {
  const [result, setResult] = useState("");

  const requeteFiltreProps = {
    nomFiltre: REQUETE
  } as RequeteFiltreProps;

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };
  return (
    <Formik
      initialValues={{
        [REQUETE]: { ...RequeteDefaultValues }
      }}
      onSubmit={handleClickButton}
    >
      <Form>
        <RequeteFiltre {...requeteFiltreProps} />
        <button type="submit">Submit</button>
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
  const typeRequete = screen.getByLabelText(
    "requete.typeRequete"
  ) as HTMLInputElement;
  const sousTypeRequete = screen.getByLabelText(
    "requete.sousTypeRequete"
  ) as HTMLInputElement;
  const statutRequete = screen.getByLabelText(
    "requete.statutRequete"
  ) as HTMLInputElement;

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
    fireEvent.input(typeRequete);
    fireEvent.change(statutRequete, {
      target: {
        value: "A_SIGNER"
      }
    });
  });

  await waitFor(() => {
    act(() => {
      fireEvent.change(sousTypeRequete, {
        target: {
          value: "RDD"
        }
      });
      fireEvent.click(submit);
    });
  });

  const result = screen.getByTestId("result");
  await waitFor(() => {
    expect(sousTypeRequete.disabled).toBeFalsy();
    expect(result.innerHTML).toBe(
      '{"requete":{"numeroRequete":"1234ABCD","typeRequete":"DELIVRANCE","sousTypeRequete":"RDD","statutRequete":"A_SIGNER"}}'
    );
  });
});

test("Le champ Type requete est conditionné par le choix de l'utilisateur à la valeur CREATION_ACTE", async () => {
  await act(async () => {
    render(<HookRequeteFiltre />);
  });

  const numeroRequete = screen.getByLabelText(
    "requete.numeroRequete"
  ) as HTMLInputElement;
  const typeRequete = screen.getByLabelText(
    "requete.typeRequete"
  ) as HTMLInputElement;
  const sousTypeRequete = screen.getByLabelText(
    "requete.sousTypeRequete"
  ) as HTMLInputElement;
  const statutRequete = screen.getByLabelText(
    "requete.statutRequete"
  ) as HTMLInputElement;

  const submit = screen.getByText(/Submit/i);

  act(() => {
    fireEvent.change(numeroRequete, {
      target: {
        value: "1234ABCD"
      }
    });
    fireEvent.change(typeRequete, {
      target: {
        value: "CREATION_ACTE"
      }
    });
    fireEvent.input(typeRequete);
    fireEvent.change(statutRequete, {
      target: {
        value: "A_IMPRIMER"
      }
    });
  });

  await waitFor(() => {
    act(() => {
      fireEvent.change(sousTypeRequete, {
        target: {
          value: "RCTC"
        }
      });
      fireEvent.click(submit);
    });
  });

  const result = screen.getByTestId("result");
  await waitFor(() => {
    expect(sousTypeRequete.disabled).toBeFalsy();
    expect(result.innerHTML).toBe(
      '{"requete":{"numeroRequete":"1234ABCD","typeRequete":"CREATION_ACTE","sousTypeRequete":"RCTC","statutRequete":"A_IMPRIMER"}}'
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
  const typeRequete = screen.getByLabelText(
    "requete.typeRequete"
  ) as HTMLInputElement;
  const sousTypeRequete = screen.getByLabelText(
    "requete.sousTypeRequete"
  ) as HTMLInputElement;
  const statutRequete = screen.getByLabelText(
    "requete.statutRequete"
  ) as HTMLInputElement;

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
    fireEvent.input(typeRequete);
    fireEvent.change(statutRequete, {
      target: {
        value: "DOUBLON"
      }
    });
  });

  await waitFor(() => {
    act(() => {
      fireEvent.change(sousTypeRequete, {
        target: {
          value: "RMPR"
        }
      });
      fireEvent.click(submit);
    });
  });

  const result = screen.getByTestId("result");
  await waitFor(() => {
    expect(sousTypeRequete.disabled).toBeFalsy();
    expect(result.innerHTML).toBe(
      '{"requete":{"numeroRequete":"1234ABCD","typeRequete":"MISE_A_JOUR","sousTypeRequete":"RMPR","statutRequete":"DOUBLON"}}'
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
  const typeRequete = screen.getByLabelText(
    "requete.typeRequete"
  ) as HTMLInputElement;
  const sousTypeRequete = screen.getByLabelText(
    "requete.sousTypeRequete"
  ) as HTMLInputElement;
  const statutRequete = screen.getByLabelText(
    "requete.statutRequete"
  ) as HTMLInputElement;

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
    fireEvent.input(typeRequete);
    fireEvent.change(statutRequete, {
      target: {
        value: "A_TRAITER"
      }
    });
  });

  await waitFor(() => {
    act(() => {
      fireEvent.change(sousTypeRequete, {
        target: {
          value: "COMPLETION_REQUETE"
        }
      });
      fireEvent.click(submit);
    });
  });

  const result = screen.getByTestId("result");
  await waitFor(() => {
    expect(sousTypeRequete.disabled).toBeFalsy();
    expect(result.innerHTML).toBe(
      '{"requete":{"numeroRequete":"1234ABCD","typeRequete":"INFORMATION","sousTypeRequete":"COMPLETION_REQUETE","statutRequete":"A_TRAITER"}}'
    );
  });
});

test("Sous Type Requete : Disabled / message d'erreur CARACTERES_ALPHANUMERIQUE ", async () => {
  await act(async () => {
    render(<HookRequeteFiltre />);
  });

  const numeroRequete = screen.getByLabelText(
    "requete.numeroRequete"
  ) as HTMLInputElement;
  const sousTypeRequete = screen.getByLabelText(
    "requete.sousTypeRequete"
  ) as HTMLInputElement;
  const statutRequete = screen.getByLabelText(
    "requete.statutRequete"
  ) as HTMLInputElement;
  const submit = screen.getByText(/Submit/i);

  act(() => {
    fireEvent.change(numeroRequete, {
      target: {
        value: "1234-"
      }
    });
    fireEvent.change(statutRequete, {
      target: {
        value: "A_TRAITER"
      }
    });
  });

  await waitFor(() => {
    expect(numeroRequete.value).toBe("1234-");
    expect(statutRequete.value).toBe("A_TRAITER");
    expect(sousTypeRequete.disabled).toBeTruthy();
    expect(submit).toBeTruthy();
  });
});
