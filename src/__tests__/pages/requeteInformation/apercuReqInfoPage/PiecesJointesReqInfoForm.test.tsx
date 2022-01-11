import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { Form, Formik } from "formik";
import React from "react";
import { SubFormProps } from "../../../../views/common/widget/formulaire/utils/FormUtil";
import PiecesJointesReqInfoForm from "../../../../views/pages/requeteInformation/apercuRequeteInformation/contenu/choixReponse/PiecesJointesReqInfoForm";
import { PIECES_JOINTES } from "../../../../views/pages/requeteInformation/apercuRequeteInformation/contenu/choixReponse/ReponseReqInfoForm";

test("renders PiecesJointesReqInfoForm, bouton activé", async () => {
  const props = {
    nom: PIECES_JOINTES,
    titre: "Pièces justificatives",
    disabled: false,
    visible: true
  } as SubFormProps;

  render(
    <Formik initialValues={{ piecesJointes: null }} onSubmit={jest.fn()}>
      <Form>
        <PiecesJointesReqInfoForm {...props} />
      </Form>
    </Formik>
  );

  const bouton = screen.getByText(
    /Ajouter une pièce jointe/i
  ) as HTMLButtonElement;

  await waitFor(() => {
    expect(bouton).toBeDefined();
    expect(bouton.disabled).toBeFalsy();
  });

  act(() => {
    fireEvent.click(bouton);
  });
});

test("renders PiecesJointesReqInfoForm, bouton désactivé", async () => {
  const props = {
    nom: PIECES_JOINTES,
    titre: "Pièces justificatives",
    disabled: true,
    visible: true
  } as SubFormProps;

  render(
    <Formik initialValues={{ piecesJointes: null }} onSubmit={jest.fn()}>
      <Form>
        <PiecesJointesReqInfoForm {...props} />
      </Form>
    </Formik>
  );

  const bouton = screen.getByText(
    /Ajouter une pièce jointe/i
  ) as HTMLButtonElement;

  await waitFor(() => {
    expect(bouton).toBeDefined();
    expect(bouton.disabled).toBeTruthy();
  });

  act(() => {
    fireEvent.click(bouton);
  });
});
