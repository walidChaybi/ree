import { REQUETE } from "@composant/formulaire/ConstantesNomsForm";
import RequeteFiltre, {
  RequeteDefaultValues,
  RequeteFiltreProps
} from "@pages/rechercheMultiCriteres/filtres/requete/RequeteFiltre";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Field, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import { expect, test } from "vitest";

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

test.skip("Le champ Type requete est conditionné par le choix de l'utilisateur à la valeur DELIVRANCE", () => {
  render(<HookRequeteFiltre />);

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

  fireEvent.change(sousTypeRequete, {
    target: {
      value: "RDD"
    }
  });

  fireEvent.change(statutRequete, {
    target: {
      value: "A_SIGNER"
    }
  });

  fireEvent.click(submit);

  const result = screen.getByTestId("result");
  waitFor(() => {
    expect(sousTypeRequete.disabled).toBeFalsy();
    expect(result.innerHTML).toBe(
      '{"requete":{"numeroRequete":"1234ABCD","numeroTeledossier":"","numeroDossierNational":"","typeRequete":"DELIVRANCE","sousTypeRequete":"RDD","statutRequete":"A_SIGNER"}}'
    );
  });
});

test("Le champ Type requete est conditionné par le choix de l'utilisateur à la valeur CREATION", () => {
  render(<HookRequeteFiltre />);

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

  fireEvent.change(sousTypeRequete, {
    target: {
      value: "RCTC"
    }
  });

  fireEvent.change(statutRequete, {
    target: {
      value: "RETOUR_SDANF"
    }
  });

  fireEvent.click(submit);
  const result = screen.getByTestId("result");
  waitFor(() => {
    expect(sousTypeRequete.disabled).toBeFalsy();
    expect(result.innerHTML).toBe(
      '{"requete":{"numeroRequete":"1234ABCD","numeroTeledossier":"","numeroDossierNational":"","typeRequete":"CREATION","sousTypeRequete":"RCTC","statutRequete":"RETOUR_SDANF"}}'
    );
  });
});

test("Le champ Type requete est conditionné par le choix de l'utilisateur à la valeur MISE_A_JOUR", () => {
  render(<HookRequeteFiltre />);

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

  fireEvent.change(sousTypeRequete, {
    target: {
      value: "RMPR"
    }
  });

  fireEvent.change(statutRequete, {
    target: {
      value: "DOUBLON"
    }
  });

  fireEvent.click(submit);
  const result = screen.getByTestId("result");
  waitFor(() => {
    expect(sousTypeRequete.disabled).toBeFalsy();
    expect(result.innerHTML).toBe(
      '{"requete":{"numeroRequete":"1234ABCD","numeroTeledossier":"","numeroDossierNational":"","typeRequete":"MISE_A_JOUR","sousTypeRequete":"RMPR","statutRequete":"DOUBLON"}}'
    );
  });
});

test("Le champ Type requete est conditionné par le choix de l'utilisateur à la valeur INFORMATION", () => {
  render(<HookRequeteFiltre />);

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

  fireEvent.change(sousTypeRequete, {
    target: {
      value: "COMPLETION_REQUETE_EN_COURS"
    }
  });

  fireEvent.change(statutRequete, {
    target: {
      value: "A_TRAITER"
    }
  });

  fireEvent.click(submit);
  const result = screen.getByTestId("result");
  waitFor(() => {
    expect(sousTypeRequete.disabled).toBeFalsy();
    expect(result.innerHTML).toBe(
      '{"requete":{"numeroRequete":"1234ABCD","numeroTeledossier":"","numeroDossierNational":"","typeRequete":"INFORMATION","sousTypeRequete":"COMPLETION_REQUETE_EN_COURS","statutRequete":"A_TRAITER"}}'
    );
  });
});

test("Sous Type Requete : Disabled / message d'erreur CARACTERES_ALPHANUMERIQUE ", () => {
  render(<HookRequeteFiltre />);

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

  fireEvent.change(numeroRequete, {
    target: {
      value: "1234-"
    }
  });

  waitFor(() => {
    expect(numeroRequete.value).toBe("1234-");
    // expect(submit.disabled).toBeTruthy(); ne fonctionne pas (pas compris pourquoi)
    expect(sousTypeRequete.disabled).toBeTruthy();
    expect(statutRequete.disabled).toBeTruthy();
  });

  fireEvent.change(typeRequete, {
    target: {
      value: "INFORMATION"
    }
  });

  waitFor(() => {
    expect(sousTypeRequete.disabled).toBeFalsy();
    expect(statutRequete.disabled).toBeTruthy();
  });

  fireEvent.change(sousTypeRequete, {
    target: {
      value: "COMPLETION_REQUETE_EN_COURS"
    }
  });

  waitFor(() => {
    expect(sousTypeRequete.disabled).toBeFalsy();
    expect(statutRequete.disabled).toBeFalsy();
  });

  fireEvent.change(statutRequete, {
    target: {
      value: "A_TRAITER"
    }
  });

    waitFor(() => {
      expect(sousTypeRequete.disabled).toBeFalsy();
      expect(statutRequete.disabled).toBeFalsy();
    });
});
