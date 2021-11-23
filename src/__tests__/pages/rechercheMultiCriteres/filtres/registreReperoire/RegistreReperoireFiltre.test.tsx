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
import { configEtatcivil } from "../../../../../mock/superagent-config/superagent-mock-etatcivil";
import { getLibelle } from "../../../../../views/common/widget/Text";
import { REGISTRE_REPERTOIRE } from "../../../../../views/pages/rechercheMultiCriteres/acteInscription/RMCActeInscriptionForm";
import RegistreRepertoireFiltre, {
  RegistreRepertoireDefaultValues,
  RegistreRepertoireFiltreProps
} from "../../../../../views/pages/rechercheMultiCriteres/filtres/registreReperoire/RegistreReperoireFiltre";

const superagentMock = require("superagent-mock")(request, configEtatcivil);

const HookRegistreRepertoireFiltre: React.FC = () => {
  const registreRepertoireFiltreFiltreProps = {
    nomFiltre: REGISTRE_REPERTOIRE
  } as RegistreRepertoireFiltreProps;

  return (
    <Formik
      initialValues={{ [REGISTRE_REPERTOIRE]: RegistreRepertoireDefaultValues }}
      onSubmit={(values: any) => {}}
    >
      <Form>
        <RegistreRepertoireFiltre {...registreRepertoireFiltreFiltreProps} />
      </Form>
    </Formik>
  );
};

test("renders filtre Registre et Repertoire", async () => {
  await act(async () => {
    render(<HookRegistreRepertoireFiltre />);
  });
  await waitFor(() => {
    expect(screen.getAllByText(getLibelle("Filtre registre"))).toHaveLength(1);
    expect(screen.getAllByText(getLibelle("Filtre répertoire"))).toHaveLength(
      1
    );
    expect(screen.getAllByText(getLibelle("Filtre évènement"))).toHaveLength(1);
  });

  // Test du grisé/dégrisé des registres et répertoires
  const natureActe = screen.getByLabelText(
    "registreRepertoire.registre.natureActe"
  ) as HTMLInputElement;

  const numeroInscription = screen.getByLabelText(
    "registreRepertoire.repertoire.numeroInscription"
  ) as HTMLInputElement;

  const typeRepertoire = screen.getByLabelText(
    "registreRepertoire.repertoire.typeRepertoire"
  ) as HTMLInputElement;

  const paysEvenement = screen.getByLabelText(
    "registreRepertoire.evenement.paysEvenement"
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

  // Le champ typeRepertoire est renseigné alors le champ paysEvenement doit être inactive
  fireEventChange(typeRepertoire, "RC");

  await waitFor(() => {
    expect(paysEvenement).toBeDisabled();
  });

  // Le champ typeRepertoire est non renseigné alors le champ paysEvenement doit être active
  fireEventChange(typeRepertoire, "");

  await waitFor(() => {
    expect(paysEvenement).not.toBeDisabled();
  });

  // Le champ paysEvenement est renseigné alors le champ typeRepertoire doit être filtré
  fireEventChange(paysEvenement, "pays");

  await waitFor(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(screen.getByText("PACS")).toBeDefined;
    expect(screen.queryByText("RC")).toBeNull();
    expect(screen.queryByText("RCA")).toBeNull();
  });

  // Le champ paysEvenement est non renseigné alors le champ typeRepertoire ne doit pas être filtré
  fireEventChange(paysEvenement, "");

  await waitFor(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(screen.getByText("PACS")).toBeDefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(screen.getByText("RC")).toBeDefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(screen.getByText("RCA")).toBeDefined;
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
