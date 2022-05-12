import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { Form, Formik } from "formik";
import React from "react";
import request from "superagent";
import { configRequetes } from "../../../../../mock/superagent-config/superagent-mock-requetes";
import PiecesJointesForm from "../../../../../views/common/widget/formulaire/piecesJointes/PiecesJointesForm";
import { SubFormProps } from "../../../../../views/common/widget/formulaire/utils/FormUtil";
import { inputPngFiles } from "../../../../__tests__utils__/testsUtil";

const superagentMock = require("superagent-mock")(request, configRequetes);

test("Attendu (composant PiecesJointesForm):  Une une pièce jointe est ajoutée à l'écran puis supprimée", async () => {
  const PIECES_JOINTES = "piecesJointes";

  const piecesJointesFormProps = {
    nom: PIECES_JOINTES,
    titre: "Pièces justificatives"
  } as SubFormProps;

  // Utilisation d'enzyme car avec "testing library" pas de déclanchement de l'événement "change"
  render(
    <Formik initialValues={{ [PIECES_JOINTES]: null }} onSubmit={jest.fn()}>
      <Form>
        <PiecesJointesForm {...piecesJointesFormProps} />
      </Form>
    </Formik>
  );

  const inputUploadField = screen.getByTestId(
    PIECES_JOINTES
  ) as HTMLInputElement;

  act(() => {
    fireEvent.change(inputUploadField, {
      target: {
        files: inputPngFiles // "hello.png" file
      }
    });
  });

  await waitFor(() => {
    expect(screen.getByText("hello.png")).toBeDefined();
    expect(screen.getAllByTitle("Supprimer")[1]).toBeDefined();
  });

  const boutonSupprimer = screen.getAllByTitle(
    "Supprimer"
  )[1] as HTMLButtonElement;

  act(() => {
    fireEvent.click(boutonSupprimer);
  });

  await waitFor(() => {
    expect(screen.queryByText("hello.png")).toBeNull();
  });
});

afterAll(() => {
  superagentMock.unset();
});
