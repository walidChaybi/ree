import { TypeRequete } from "@model/requete/enum/TypeRequete";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { getLibelle } from "@util/Utils";
import PiecesJointesForm from "@widget/formulaire/piecesJointes/PiecesJointesForm";
import { Form, Formik } from "formik";
import React from "react";
import request from "superagent";
import { configRequetes } from "../../../../../mock/superagent-config/superagent-mock-requetes";
import { inputPngFiles } from "../../../../__tests__utils__/testsUtil";

const superagentMock = require("superagent-mock")(request, configRequetes);

test("Attendu (composant PiecesJointesForm):  Une une pièce jointe est ajoutée à l'écran puis supprimée", async () => {
  const PIECES_JOINTES = "piecesJointes";

  // Utilisation d'enzyme car avec "testing library" pas de déclanchement de l'événement "change"
  render(
    <Formik initialValues={{ [PIECES_JOINTES]: null }} onSubmit={jest.fn()}>
      <Form>
        <PiecesJointesForm
          nom={PIECES_JOINTES}
          typeRequete={TypeRequete.DELIVRANCE}
          titre={getLibelle("Pièces justificatives")}
        />
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
