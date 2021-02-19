import React, { useState } from "react";
import { RegistreRepertoireFiltre } from "../../../../../views/pages/rechercheMultiCriteres/filtres/registreReperoire/RegistreReperoireFiltre";
import { render, act, waitFor, screen } from "@testing-library/react";
import { getLibelle } from "../../../../../views/common/widget/Text";
import { Formik, Form } from "formik";

const HookRegistreRepertoireFiltre: React.FC = () => {
  return (
    <Formik initialValues={{}} onSubmit={(values: any) => {}}>
      <Form>
        <RegistreRepertoireFiltre nomFiltre="" />
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
});
