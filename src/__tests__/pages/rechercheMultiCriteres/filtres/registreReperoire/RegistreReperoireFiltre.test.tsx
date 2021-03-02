import React, { useState } from "react";
import {
  RegistreRepertoireFiltre,
  RegistreRepertoireDefaultValues
} from "../../../../../views/pages/rechercheMultiCriteres/filtres/registreReperoire/RegistreReperoireFiltre";
import {
  render,
  act,
  waitFor,
  screen,
  fireEvent
} from "@testing-library/react";
import { getLibelle } from "../../../../../views/common/widget/Text";
import { Formik, Form } from "formik";
import { REGISTRE_REPERTOIRE } from "../../../../../views/pages/rechercheMultiCriteres/RMCActeInscriptionPage";

const HookRegistreRepertoireFiltre: React.FC = () => {
  return (
    <Formik
      initialValues={{ [REGISTRE_REPERTOIRE]: RegistreRepertoireDefaultValues }}
      onSubmit={(values: any) => {}}
    >
      <Form>
        <RegistreRepertoireFiltre nomFiltre={REGISTRE_REPERTOIRE} />
      </Form>
    </Formik>
  );
};

test("renders filtre Registre et Repertoire", async () => {
  await act(async () => {
    render(<HookRegistreRepertoireFiltre />);
  });
  await waitFor(() => {
    expect(
      screen.getAllByText(getLibelle("Filtre registre et répertoire"))
    ).toHaveLength(1);
  });

  // Test du grisé/dégrisé des registres et répertoires
  const natureActe = screen.getByLabelText(
    "registreRepertoire.registre.natureActe"
  ) as HTMLInputElement;

  const numeroInscription = screen.getByLabelText(
    "registreRepertoire.repertoire.numeroInscription"
  ) as HTMLInputElement;

  await waitFor(() => {
    expect(natureActe).toBeDefined();
    expect(numeroInscription).toBeDefined();
  });

  // La partie acte est renseignée alors la partie inscription doit être inactive
  fireEventChange(natureActe, "MARIAGE");

  await waitFor(() => {
    expect(numeroInscription).toBeDisabled();
  });

  // La partie acte est non renseignée alors la partie inscription doit être active
  fireEventChange(natureActe, "");

  await waitFor(() => {
    expect(numeroInscription).not.toBeDisabled();
  });

  // La partie inscription est renseignée alors la partie acte doit être inactive
  fireEventChange(numeroInscription, "123456");

  await waitFor(() => {
    expect(natureActe).toBeDisabled();
  });

  // La partie inscription est non renseignée alors la partie acte doit être active
  fireEventChange(numeroInscription, "");

  await waitFor(() => {
    expect(natureActe).not.toBeDisabled();
  });
});

function fireEventChange(component: any, value: any) {
  act(() => {
    fireEvent.change(component, {
      target: {
        value
      }
    });
  });
}
