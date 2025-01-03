import { NATURE_RC } from "@mock/data/NomenclatureNatureRc";
import { NATURE_RCA } from "@mock/data/NomenclatureNatureRca";
import { NatureRc } from "@model/etatcivil/enum/NatureRc";
import { NatureRca } from "@model/etatcivil/enum/NatureRca";
import { REPERTOIRE } from "@pages/rechercheMultiCriteres/filtres/registreReperoire/RegistreRepertoireFiltre";
import RepertoireInscriptionFiltre, {
  RepertoireInscriptionDefaultValues,
  RepertoireInscriptionFiltreProps
} from "@pages/rechercheMultiCriteres/filtres/registreReperoire/RepertoireInscriptionFiltre";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Field, Form, Formik } from "formik";
import React, { act, useState } from "react";
import { describe, expect, test } from "vitest";

describe("Tes RepertoireInscriptionFiltre", () => {
  const HookRepertoireInscriptionFiltre: React.FC = () => {
    const [result, setResult] = useState("");

    const repertoireInscriptionFiltreProps = {
      nomFiltre: REPERTOIRE
    } as RepertoireInscriptionFiltreProps;

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
          <Field
            as="textarea"
            value={result}
            data-testid="result"
          />
        </Form>
      </Formik>
    );
  };

  NatureRc.init(NATURE_RC);
  NatureRca.init(NATURE_RCA);

  test("Le champ Nature de l'inscription est conditionné par le choix de l'utilisateur pour le type de répertoire RC", async () => {
    render(<HookRepertoireInscriptionFiltre />);

    const numeroInscription: HTMLInputElement = screen.getByLabelText("repertoire.numeroInscription");
    const typeRepertoire: HTMLSelectElement = screen.getByTestId("repertoire.typeRepertoire");
    const natureInscription: HTMLSelectElement = screen.getByTestId("repertoire.natureInscription");
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

    act(() => fireEvent.click(submit));

    await waitFor(() => {
      expect(natureInscription.disabled).toBeFalsy();
      expect(screen.getByTestId("result").innerHTML).toBe(
        '{"repertoire":{"numeroInscription":"1982-123456789","typeRepertoire":"RC","natureInscription":"058a436b-330d-4c3c-83e0-e49d27390123"}}'
      );
    });
  });

  test("Le champ Nature de l'inscription est conditionné par le choix de l'utilisateur pour le type de répertoire RCA", async () => {
    render(<HookRepertoireInscriptionFiltre />);

    const numeroInscription: HTMLInputElement = screen.getByLabelText("repertoire.numeroInscription");
    const typeRepertoire: HTMLSelectElement = screen.getByTestId("repertoire.typeRepertoire");
    const natureInscription: HTMLSelectElement = screen.getByTestId("repertoire.natureInscription");
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

    await act(() => fireEvent.click(submit));

    expect(natureInscription.disabled).toBeFalsy();
    expect(screen.getByTestId("result").innerHTML).toBe(
      '{"repertoire":{"numeroInscription":"1982-123456789","typeRepertoire":"RCA","natureInscription":"358a436b-330d-4c3c-83e0-e49d27390123"}}'
    );
  });

  test("Le champ Nature de l'inscription est désactivé par le choix de l'utilisateur pour le type de répertoire PACS", () => {
    render(<HookRepertoireInscriptionFiltre />);

    const numeroInscription: HTMLInputElement = screen.getByLabelText("repertoire.numeroInscription");
    const typeRepertoire: HTMLSelectElement = screen.getByTestId("repertoire.typeRepertoire");
    const natureInscription: HTMLSelectElement = screen.getByTestId("repertoire.natureInscription");

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

    expect(natureInscription.disabled).toBeTruthy();
  });

  test("Le champ Nature de l'inscription est désactivé car l'utilisateur n'a pas choisi de type de répertoire", () => {
    render(<HookRepertoireInscriptionFiltre />);

    const numeroInscription: HTMLInputElement = screen.getByLabelText("repertoire.numeroInscription");
    const natureInscription: HTMLSelectElement = screen.getByTestId("repertoire.natureInscription");

    fireEvent.change(numeroInscription, {
      target: {
        value: "1982-123456789"
      }
    });

    expect(natureInscription.disabled).toBeTruthy();
  });

  test("Un tiret est automatiquement ajouté après le 4ème caractère du numéro d'inscription", () => {
    render(<HookRepertoireInscriptionFiltre />);

    const numeroInscription: HTMLInputElement = screen.getByLabelText("repertoire.numeroInscription");

    fireEvent.change(numeroInscription, {
      target: {
        value: "19826"
      }
    });

    fireEvent.input(numeroInscription);

    expect(numeroInscription.value).toEqual("1982-6");
  });

  test("Un tiret n'est pas ajouté après le 4ème caractère du numéro d'inscription si le 5ème caractère est lui-même un tiret", () => {
    render(<HookRepertoireInscriptionFiltre />);

    const numeroInscription: HTMLInputElement = screen.getByLabelText("repertoire.numeroInscription");

    fireEvent.change(numeroInscription, {
      target: {
        value: "1982-"
      }
    });

    expect(numeroInscription.value).toEqual("1982-");
  });
});
