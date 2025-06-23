import { REGISTRE_REPERTOIRE } from "@pages/rechercheMultiCriteres/acteInscription/RMCActeInscription";
import RegistreRepertoireFiltre, {
  RegistreRepertoireDefaultValues,
  RegistreRepertoireFiltreProps
} from "@pages/rechercheMultiCriteres/filtres/registreReperoire/RegistreRepertoireFiltre";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getLibelle } from "@util/Utils";
import { Form, Formik } from "formik";
import React from "react";
import { expect, test } from "vitest";

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

test("renders filtre Registre et Repertoire", () => {
  render(<HookRegistreRepertoireFiltre />);

  waitFor(() => {
    expect(screen.getAllByText(getLibelle("Filtre registre"))).toHaveLength(1);
    expect(screen.getAllByText(getLibelle("Filtre répertoire"))).toHaveLength(1);
    expect(screen.getAllByText(getLibelle("Filtre évènement"))).toHaveLength(1);
  });

  // Test du grisé/dégrisé des registres et répertoires
  const natureActe = screen.getByTestId("registreRepertoire.registre.natureActe") as HTMLInputElement;

  const numeroInscription = screen.getByLabelText("registreRepertoire.repertoire.numeroInscription") as HTMLInputElement;

  const typeRepertoire = screen.getByTestId("registreRepertoire.repertoire.typeRepertoire") as HTMLInputElement;

  const paysEvenement = screen.getByLabelText("registreRepertoire.evenement.paysEvenement") as HTMLInputElement;

  waitFor(() => {
    expect(natureActe).toBeDefined();
    expect(numeroInscription).toBeDefined();
  });

  // La partie acte est renseignée alors la partie inscription doit être inactive
  fireEventChange(natureActe, "MARIAGE");

  waitFor(() => {
    expect(numeroInscription.disabled).toBeTruthy();
  });

  // La partie acte est non renseignée alors la partie inscription doit être active
  fireEventChange(natureActe, "");

  waitFor(() => {
    expect(numeroInscription.disabled).not.toBeTruthy();
  });

  // La partie inscription est renseignée alors la partie acte doit être inactive
  fireEventChange(numeroInscription, "123456");

  waitFor(() => {
    expect(natureActe.disabled).toBeTruthy();
  });

  // La partie inscription est non renseignée alors la partie acte doit être active
  fireEventChange(numeroInscription, "");

  waitFor(() => {
    expect(natureActe.disabled).not.toBeTruthy();
  });

  // Le champ typeRepertoire est renseigné alors le champ paysEvenement doit être inactive
  fireEventChange(typeRepertoire, "RC");

  waitFor(() => {
    expect(paysEvenement.disabled).toBeTruthy();
  });

  // Le champ typeRepertoire est non renseigné alors le champ paysEvenement doit être active
  fireEventChange(typeRepertoire, "");

  waitFor(() => {
    expect(paysEvenement.disabled).not.toBeTruthy();
  });

  // Le champ paysEvenement est renseigné alors le champ typeRepertoire doit être filtré
  fireEventChange(paysEvenement, "pays");

  waitFor(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(screen.getByText("PACS")).toBeDefined;
    expect(screen.queryByText("RC")).toBeNull();
    expect(screen.queryByText("RCA")).toBeNull();
  });

  // Le champ paysEvenement est non renseigné alors le champ typeRepertoire ne doit pas être filtré
  fireEventChange(paysEvenement, "");

  waitFor(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(screen.getByText("PACS")).toBeDefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(screen.getByText("RC")).toBeDefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(screen.getByText("RCA")).toBeDefined;
  });
});

function fireEventChange(component: any, value: any) {
  fireEvent.change(component, {
    target: {
      value
    }
  });
}
