import { TypeFamille } from "@model/etatcivil/enum/TypeFamille";
import RegistreActeFiltre, {
  RegistreActeDefaultValues,
  RegistreActeFiltreProps
} from "@pages/rechercheMultiCriteres/filtres/registreReperoire/RegistreActeFiltre";
import { REGISTRE } from "@pages/rechercheMultiCriteres/filtres/registreReperoire/RegistreRepertoireFiltre";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { describe, expect, test } from "vitest";

function expectToBeDefined(elements: HTMLElement[]) {
  elements.forEach(el => expect(el).toBeDefined());
}

const HookRegistreActeFiltre: React.FC = () => {
  const [result, setResult] = useState("");

  const registreFiltreProps = {
    nomFiltre: REGISTRE
  } as RegistreActeFiltreProps;

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };
  return (
    <Formik
      initialValues={{
        [REGISTRE]: { ...RegistreActeDefaultValues }
      }}
      onSubmit={handleClickButton}
    >
      <Form>
        <RegistreActeFiltre {...registreFiltreProps} />
        <button type="submit">Submit</button>
        <Field as="textarea" value={result} data-testid="result" />
      </Form>
    </Formik>
  );
};

describe("Test l'affichage du composant RegistreActeFiltre", () => {
  test("DOIT afficher les champs et leur libellé QUAND on rend le composant", () => {
    render(<HookRegistreActeFiltre />);

    waitFor(() => {
      expect(screen.getByText("Nature de l'acte")).toBeDefined();
      expect(screen.getByText("Famille de registre")).toBeDefined();
      expect(screen.getByText("Type / Poste / Commune / Pays")).toBeDefined();
      expect(screen.getByText("Année")).toBeDefined();
      expect(screen.getByText("Registre (support)")).toBeDefined();
      expect(screen.getByText("N° d'acte / N° d'ordre")).toBeDefined();
      expect(screen.getByPlaceholderText("Support 1")).toBeDefined();
      expect(screen.getByPlaceholderText("Support 2")).toBeDefined();
      expect(screen.getByPlaceholderText("N° BisTer")).toBeDefined();
    });
  });

  test("DOIT rendre la liste des options de 'Famille de registre'.", () => {
    render(<HookRegistreActeFiltre />);

    waitFor(() => {
      expect(screen.getByText("(ACQ) Acquisition de la nationalité française"));
      expect(screen.getByText("(CSL) Acte consulaire"));
      expect(screen.getByText("(DEP) Acte déposé dans un pays voisin"));
      expect(screen.getByText("(COL) Acte issu d'anciennes colonies"));
      expect(
        screen.getByText(
          "(AR2) Acte reconstitué - Anciens territoires français (hors Algérie)"
        )
      );
      expect(screen.getByText("(AR3) Acte reconstitué – Algérie"));
      expect(
        screen.getByText(
          "(OP2) Actes d'optants à la nationalité (Afrique ou Indochine)"
        )
      );
      expect(
        screen.getByText("(OP3) Actes d'optants à la nationalité (Algérie)")
      );
      expect(screen.getByText("(JUG) Transcription judiciaire"));
      expect(screen.getByText("(MAR) Acte dressé en mer ou aux armées"));
      expect(screen.getByText("(CPN) Changement de nom ou prénoms"));
      expect(screen.getByText("(AFF) Dossier d'affaire"));
      expect(screen.getByText("(XDX) Dossier pour acquisition"));
      expect(screen.getByText("(OPT) Dossier d'optants"));
      expect(screen.getByText("(PR) Pré-dossier"));
      expect(screen.getByText("(PAC) Etranger ayant conclu un PACS en France"));
    });
  });
});

describe("Test le comportement des champs du formulaire en fonction des valeurs sélectionnées.", () => {
  const VALEURS_TEST_CHAMP_NATURE_ACTE = [
    {
      cle: "ACQ",
      nomChamp: "Nature d'acte",
      ariaLabelChamp: "Nature de l'acte",
      valeur: "NAISSANCE",
      valeurAffichee: "Naissance",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "CSL",
      nomChamp: "Nature d'acte",
      ariaLabelChamp: "Nature de l'acte",
      valeur: "NAISSANCE",
      valeurAffichee: "Naissance",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "DEP",
      nomChamp: "Nature d'acte",
      ariaLabelChamp: "Nature de l'acte",
      valeur: "NAISSANCE",
      valeurAffichee: "Naissance",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "COL",
      nomChamp: "Nature d'acte",
      ariaLabelChamp: "Nature de l'acte",
      valeur: "NAISSANCE",
      valeurAffichee: "Naissance",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "AR2",
      nomChamp: "Nature d'acte",
      ariaLabelChamp: "Nature de l'acte",
      valeur: "NAISSANCE",
      valeurAffichee: "Naissance",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "AR3",
      nomChamp: "Nature d'acte",
      ariaLabelChamp: "Nature de l'acte",
      valeur: "NAISSANCE",
      valeurAffichee: "Naissance",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "OP2",
      nomChamp: "Nature d'acte",
      ariaLabelChamp: "Nature de l'acte",
      valeur: "NAISSANCE",
      valeurAffichee: "Naissance",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "OP3",
      nomChamp: "Nature d'acte",
      ariaLabelChamp: "Nature de l'acte",
      valeur: "NAISSANCE",
      valeurAffichee: "Naissance",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "JUG",
      nomChamp: "Nature d'acte",
      ariaLabelChamp: "Nature de l'acte",
      valeur: "NAISSANCE",
      valeurAffichee: "Naissance",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "MAR",
      nomChamp: "Nature d'acte",
      ariaLabelChamp: "Nature de l'acte",
      valeur: "NAISSANCE",
      valeurAffichee: "Naissance",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "CPN",
      nomChamp: "Nature d'acte",
      ariaLabelChamp: "Nature de l'acte",
      valeur: "NAISSANCE",
      valeurAffichee: "Naissance",
      libelleTest: "DOIT",
      estVerrouilleEtReinitialise: true
    },
    {
      cle: "AFF",
      nomChamp: "Nature d'acte",
      ariaLabelChamp: "Nature de l'acte",
      valeur: "NAISSANCE",
      valeurAffichee: "Naissance",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "XDX",
      nomChamp: "Nature d'acte",
      ariaLabelChamp: "Nature de l'acte",
      valeur: "NAISSANCE",
      valeurAffichee: "Naissance",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "OPT",
      nomChamp: "Nature d'acte",
      ariaLabelChamp: "Nature de l'acte",
      valeur: "NAISSANCE",
      valeurAffichee: "Naissance",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "PR",
      nomChamp: "Nature d'acte",
      ariaLabelChamp: "Nature de l'acte",
      valeur: "NAISSANCE",
      valeurAffichee: "Naissance",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "PAC",
      nomChamp: "Nature d'acte",
      ariaLabelChamp: "Nature de l'acte",
      valeur: "NAISSANCE",
      valeurAffichee: "Naissance",
      libelleTest: "DOIT",
      estVerrouilleEtReinitialise: true
    }
  ];
  const VALEURS_TEST_CHAMP_SUPPORT_UN = [
    {
      cle: "ACQ",
      nomChamp: "Support 1",
      ariaLabelChamp: "Support 1",
      valeur: "123",
      valeurAffichee: "123",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "CSL",
      nomChamp: "Support 1",
      ariaLabelChamp: "Support 1",
      valeur: "123",
      valeurAffichee: "123",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "DEP",
      nomChamp: "Support 1",
      ariaLabelChamp: "Support 1",
      valeur: "123",
      valeurAffichee: "123",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "COL",
      nomChamp: "Support 1",
      ariaLabelChamp: "Support 1",
      valeur: "123",
      valeurAffichee: "123",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "AR2",
      nomChamp: "Support 1",
      ariaLabelChamp: "Support 1",
      valeur: "123",
      valeurAffichee: "123",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "AR3",
      nomChamp: "Support 1",
      ariaLabelChamp: "Support 1",
      valeur: "123",
      valeurAffichee: "123",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "OP2",
      nomChamp: "Support 1",
      ariaLabelChamp: "Support 1",
      valeur: "123",
      valeurAffichee: "123",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "OP3",
      nomChamp: "Support 1",
      ariaLabelChamp: "Support 1",
      valeur: "123",
      valeurAffichee: "123",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "JUG",
      nomChamp: "Support 1",
      ariaLabelChamp: "Support 1",
      valeur: "123",
      valeurAffichee: "123",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "MAR",
      nomChamp: "Support 1",
      ariaLabelChamp: "Support 1",
      valeur: "123",
      valeurAffichee: "123",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "CPN",
      nomChamp: "Support 1",
      ariaLabelChamp: "Support 1",
      valeur: "123",
      valeurAffichee: "123",
      libelleTest: "DOIT",
      estVerrouilleEtReinitialise: true
    },
    {
      cle: "AFF",
      nomChamp: "Support 1",
      ariaLabelChamp: "Support 1",
      valeur: "123",
      valeurAffichee: "123",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "XDX",
      nomChamp: "Support 1",
      ariaLabelChamp: "Support 1",
      valeur: "123",
      valeurAffichee: "123",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "OPT",
      nomChamp: "Support 1",
      ariaLabelChamp: "Support 1",
      valeur: "123",
      valeurAffichee: "123",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "PR",
      nomChamp: "Support 1",
      ariaLabelChamp: "Support 1",
      valeur: "123",
      valeurAffichee: "123",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "PAC",
      nomChamp: "Support 1",
      ariaLabelChamp: "Support 1",
      valeur: "123",
      valeurAffichee: "123",
      libelleTest: "DOIT",
      estVerrouilleEtReinitialise: true
    }
  ];
  const VALEURS_TEST_CHAMP_SUPPORT_DEUX = [
    {
      cle: "ACQ",
      nomChamp: "Support 2",
      ariaLabelChamp: "Support 2",
      valeur: "456",
      valeurAffichee: "456",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "CSL",
      nomChamp: "Support 2",
      ariaLabelChamp: "Support 2",
      valeur: "456",
      valeurAffichee: "456",
      libelleTest: "DOIT",
      estVerrouilleEtReinitialise: true
    },
    {
      cle: "DEP",
      nomChamp: "Support 2",
      ariaLabelChamp: "Support 2",
      valeur: "456",
      valeurAffichee: "456",
      libelleTest: "DOIT",
      estVerrouilleEtReinitialise: true
    },
    {
      cle: "COL",
      nomChamp: "Support 2",
      ariaLabelChamp: "Support 2",
      valeur: "456",
      valeurAffichee: "456",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "AR2",
      nomChamp: "Support 2",
      ariaLabelChamp: "Support 2",
      valeur: "456",
      valeurAffichee: "456",
      libelleTest: "DOIT",
      estVerrouilleEtReinitialise: true
    },
    {
      cle: "AR3",
      nomChamp: "Support 2",
      ariaLabelChamp: "Support 2",
      valeur: "456",
      valeurAffichee: "456",
      libelleTest: "DOIT",
      estVerrouilleEtReinitialise: true
    },
    {
      cle: "OP2",
      nomChamp: "Support 2",
      ariaLabelChamp: "Support 2",
      valeur: "456",
      valeurAffichee: "456",
      libelleTest: "DOIT",
      estVerrouilleEtReinitialise: true
    },
    {
      cle: "OP3",
      nomChamp: "Support 2",
      ariaLabelChamp: "Support 2",
      valeur: "456",
      valeurAffichee: "456",
      libelleTest: "DOIT",
      estVerrouilleEtReinitialise: true
    },
    {
      cle: "JUG",
      nomChamp: "Support 2",
      ariaLabelChamp: "Support 2",
      valeur: "456",
      valeurAffichee: "456",
      libelleTest: "DOIT",
      estVerrouilleEtReinitialise: true
    },
    {
      cle: "MAR",
      nomChamp: "Support 2",
      ariaLabelChamp: "Support 2",
      valeur: "456",
      valeurAffichee: "456",
      libelleTest: "DOIT",
      estVerrouilleEtReinitialise: true
    },
    {
      cle: "CPN",
      nomChamp: "Support 2",
      ariaLabelChamp: "Support 2",
      valeur: "456",
      valeurAffichee: "456",
      libelleTest: "DOIT",
      estVerrouilleEtReinitialise: true
    },
    {
      cle: "AFF",
      nomChamp: "Support 2",
      ariaLabelChamp: "Support 2",
      valeur: "456",
      valeurAffichee: "456",
      libelleTest: "DOIT",
      estVerrouilleEtReinitialise: true
    },
    {
      cle: "XDX",
      nomChamp: "Support 2",
      ariaLabelChamp: "Support 2",
      valeur: "456",
      valeurAffichee: "456",
      libelleTest: "DOIT",
      estVerrouilleEtReinitialise: true
    },
    {
      cle: "OPT",
      nomChamp: "Support 2",
      ariaLabelChamp: "Support 2",
      valeur: "456",
      valeurAffichee: "456",
      libelleTest: "DOIT",
      estVerrouilleEtReinitialise: true
    },
    {
      cle: "PR",
      nomChamp: "Support 2",
      ariaLabelChamp: "Support 2",
      valeur: "456",
      valeurAffichee: "456",
      libelleTest: "DOIT",
      estVerrouilleEtReinitialise: true
    },
    {
      cle: "PAC",
      nomChamp: "Support 2",
      ariaLabelChamp: "Support 2",
      valeur: "456",
      valeurAffichee: "456",
      libelleTest: "DOIT",
      estVerrouilleEtReinitialise: true
    }
  ];
  const VALEURS_TEST_CHAMP_NUMERO_ACTE_OU_ORDRE = [
    {
      cle: "ACQ",
      nomChamp: "N° Acte / N° Ordre",
      ariaLabelChamp: "Numero d'acte ou d'ordre",
      valeur: "36",
      valeurAffichee: "36",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "CSL",
      nomChamp: "N° Acte / N° Ordre",
      ariaLabelChamp: "Numero d'acte ou d'ordre",
      valeur: "36",
      valeurAffichee: "36",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "DEP",
      nomChamp: "N° Acte / N° Ordre",
      ariaLabelChamp: "Numero d'acte ou d'ordre",
      valeur: "36",
      valeurAffichee: "36",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "COL",
      nomChamp: "N° Acte / N° Ordre",
      ariaLabelChamp: "Numero d'acte ou d'ordre",
      valeur: "36",
      valeurAffichee: "36",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "AR2",
      nomChamp: "N° Acte / N° Ordre",
      ariaLabelChamp: "Numero d'acte ou d'ordre",
      valeur: "36",
      valeurAffichee: "36",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "AR3",
      nomChamp: "N° Acte / N° Ordre",
      ariaLabelChamp: "Numero d'acte ou d'ordre",
      valeur: "36",
      valeurAffichee: "36",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "OP2",
      nomChamp: "N° Acte / N° Ordre",
      ariaLabelChamp: "Numero d'acte ou d'ordre",
      valeur: "36",
      valeurAffichee: "36",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "OP3",
      nomChamp: "N° Acte / N° Ordre",
      ariaLabelChamp: "Numero d'acte ou d'ordre",
      valeur: "36",
      valeurAffichee: "36",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "JUG",
      nomChamp: "N° Acte / N° Ordre",
      ariaLabelChamp: "Numero d'acte ou d'ordre",
      valeur: "36",
      valeurAffichee: "36",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "MAR",
      nomChamp: "N° Acte / N° Ordre",
      ariaLabelChamp: "Numero d'acte ou d'ordre",
      valeur: "36",
      valeurAffichee: "36",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "CPN",
      nomChamp: "N° Acte / N° Ordre",
      ariaLabelChamp: "Numero d'acte ou d'ordre",
      valeur: "36",
      valeurAffichee: "36",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "AFF",
      nomChamp: "N° Acte / N° Ordre",
      ariaLabelChamp: "Numero d'acte ou d'ordre",
      valeur: "36",
      valeurAffichee: "36",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "XDX",
      nomChamp: "N° Acte / N° Ordre",
      ariaLabelChamp: "Numero d'acte ou d'ordre",
      valeur: "36",
      valeurAffichee: "36",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "OPT",
      nomChamp: "N° Acte / N° Ordre",
      ariaLabelChamp: "Numero d'acte ou d'ordre",
      valeur: "36",
      valeurAffichee: "36",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "PR",
      nomChamp: "N° Acte / N° Ordre",
      ariaLabelChamp: "Numero d'acte ou d'ordre",
      valeur: "36",
      valeurAffichee: "36",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "PAC",
      nomChamp: "N° Acte / N° Ordre",
      ariaLabelChamp: "Numero d'acte ou d'ordre",
      valeur: "36",
      valeurAffichee: "36",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    }
  ];
  const VALEURS_TEST_CHAMP_NUMERO_BIS_TER = [
    {
      cle: "ACQ",
      nomChamp: "N° BisTer",
      ariaLabelChamp: "Numero BisTer",
      valeur: "123",
      valeurAffichee: "123",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "CSL",
      nomChamp: "N° BisTer",
      ariaLabelChamp: "Numero BisTer",
      valeur: "123",
      valeurAffichee: "123",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "DEP",
      nomChamp: "N° BisTer",
      ariaLabelChamp: "Numero BisTer",
      valeur: "123",
      valeurAffichee: "123",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "COL",
      nomChamp: "N° BisTer",
      ariaLabelChamp: "Numero BisTer",
      valeur: "123",
      valeurAffichee: "123",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "AR2",
      nomChamp: "N° BisTer",
      ariaLabelChamp: "Numero BisTer",
      valeur: "123",
      valeurAffichee: "123",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "AR3",
      nomChamp: "N° BisTer",
      ariaLabelChamp: "Numero BisTer",
      valeur: "123",
      valeurAffichee: "123",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "OP2",
      nomChamp: "N° BisTer",
      ariaLabelChamp: "Numero BisTer",
      valeur: "123",
      valeurAffichee: "123",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "OP3",
      nomChamp: "N° BisTer",
      ariaLabelChamp: "Numero BisTer",
      valeur: "123",
      valeurAffichee: "123",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "JUG",
      nomChamp: "N° BisTer",
      ariaLabelChamp: "Numero BisTer",
      valeur: "123",
      valeurAffichee: "123",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "MAR",
      nomChamp: "N° BisTer",
      ariaLabelChamp: "Numero BisTer",
      valeur: "123",
      valeurAffichee: "123",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "CPN",
      nomChamp: "N° BisTer",
      ariaLabelChamp: "Numero BisTer",
      valeur: "123",
      valeurAffichee: "123",
      libelleTest: "DOIT",
      estVerrouilleEtReinitialise: true
    },
    {
      cle: "AFF",
      nomChamp: "N° BisTer",
      ariaLabelChamp: "Numero BisTer",
      valeur: "123",
      valeurAffichee: "123",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "XDX",
      nomChamp: "N° BisTer",
      ariaLabelChamp: "Numero BisTer",
      valeur: "123",
      valeurAffichee: "123",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "OPT",
      nomChamp: "N° BisTer",
      ariaLabelChamp: "Numero BisTer",
      valeur: "123",
      valeurAffichee: "123",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "PR",
      nomChamp: "N° BisTer",
      ariaLabelChamp: "Numero BisTer",
      valeur: "123",
      valeurAffichee: "123",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "PAC",
      nomChamp: "N° BisTer",
      ariaLabelChamp: "Numero BisTer",
      valeur: "123",
      valeurAffichee: "123",
      libelleTest: "DOIT",
      estVerrouilleEtReinitialise: true
    }
  ];
  const VALEURS_TEST_CHAMP_ANNEE = [
    {
      cle: "ACQ",
      nomChamp: "Année",
      ariaLabelChamp: "registre.annee",
      valeur: "1990",
      valeurAffichee: "1990",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "CSL",
      nomChamp: "Année",
      ariaLabelChamp: "registre.annee",
      valeur: "1990",
      valeurAffichee: "1990",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "DEP",
      nomChamp: "Année",
      ariaLabelChamp: "registre.annee",
      valeur: "1990",
      valeurAffichee: "1990",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "COL",
      nomChamp: "Année",
      ariaLabelChamp: "registre.annee",
      valeur: "1990",
      valeurAffichee: "1990",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "AR2",
      nomChamp: "Année",
      ariaLabelChamp: "registre.annee",
      valeur: "1990",
      valeurAffichee: "1990",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "AR3",
      nomChamp: "Année",
      ariaLabelChamp: "registre.annee",
      valeur: "1990",
      valeurAffichee: "1990",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "OP2",
      nomChamp: "Année",
      ariaLabelChamp: "registre.annee",
      valeur: "1990",
      valeurAffichee: "1990",
      libelleTest: "DOIT",
      estVerrouilleEtReinitialise: true
    },
    {
      cle: "OP3",
      nomChamp: "Année",
      ariaLabelChamp: "registre.annee",
      valeur: "1990",
      valeurAffichee: "1990",
      libelleTest: "DOIT",
      estVerrouilleEtReinitialise: true
    },
    {
      cle: "JUG",
      nomChamp: "Année",
      ariaLabelChamp: "registre.annee",
      valeur: "1990",
      valeurAffichee: "1990",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "MAR",
      nomChamp: "Année",
      ariaLabelChamp: "registre.annee",
      valeur: "1990",
      valeurAffichee: "1990",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "CPN",
      nomChamp: "Année",
      ariaLabelChamp: "registre.annee",
      valeur: "1990",
      valeurAffichee: "1990",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "AFF",
      nomChamp: "Année",
      ariaLabelChamp: "registre.annee",
      valeur: "1990",
      valeurAffichee: "1990",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "XDX",
      nomChamp: "Année",
      ariaLabelChamp: "registre.annee",
      valeur: "1990",
      valeurAffichee: "1990",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "OPT",
      nomChamp: "Année",
      ariaLabelChamp: "registre.annee",
      valeur: "1990",
      valeurAffichee: "1990",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "PR",
      nomChamp: "Année",
      ariaLabelChamp: "registre.annee",
      valeur: "1990",
      valeurAffichee: "1990",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    },
    {
      cle: "PAC",
      nomChamp: "Année",
      ariaLabelChamp: "registre.annee",
      valeur: "1990",
      valeurAffichee: "1990",
      libelleTest: "NE DOIT PAS",
      estVerrouilleEtReinitialise: false
    }
  ];
  const VALEURS_TEST_CHAMP_POCOPA = [
    {
      cle: "ACQ",
      nomChamp: "Type / Poste / Commune / Pays",
      ariaLabelChamp: "registre.pocopa",
      valeur: "t",
      valeurAffichee: "TORONTO",
      libelleTest: "NE DOIT PAS",
      estVerrouille: false
    },
    {
      cle: "CSL",
      nomChamp: "Type / Poste / Commune / Pays",
      ariaLabelChamp: "registre.pocopa",
      valeur: "t",
      valeurAffichee: "TORONTO",
      libelleTest: "NE DOIT PAS",
      estVerrouille: false
    },
    {
      cle: "DEP",
      nomChamp: "Type / Poste / Commune / Pays",
      ariaLabelChamp: "registre.pocopa",
      valeur: "t",
      valeurAffichee: "TORONTO",
      libelleTest: "NE DOIT PAS",
      estVerrouille: false
    },
    {
      cle: "COL",
      nomChamp: "Type / Poste / Commune / Pays",
      ariaLabelChamp: "registre.pocopa",
      valeur: "t",
      valeurAffichee: "TORONTO",
      libelleTest: "NE DOIT PAS",
      estVerrouille: false
    },
    {
      cle: "AR2",
      nomChamp: "Type / Poste / Commune / Pays",
      ariaLabelChamp: "registre.pocopa",
      valeur: "t",
      valeurAffichee: "TORONTO",
      libelleTest: "NE DOIT PAS",
      estVerrouille: false
    },
    {
      cle: "AR3",
      nomChamp: "Type / Poste / Commune / Pays",
      ariaLabelChamp: "registre.pocopa",
      valeur: "t",
      valeurAffichee: "TORONTO",
      libelleTest: "NE DOIT PAS",
      estVerrouille: false
    },
    {
      cle: "OP2",
      nomChamp: "Type / Poste / Commune / Pays",
      ariaLabelChamp: "registre.pocopa",
      valeur: "t",
      valeurAffichee: "TORONTO",
      libelleTest: "DOIT",
      estVerrouille: true
    },
    {
      cle: "OP3",
      nomChamp: "Type / Poste / Commune / Pays",
      ariaLabelChamp: "registre.pocopa",
      valeur: "t",
      valeurAffichee: "TORONTO",
      libelleTest: "DOIT",
      estVerrouille: true
    },
    {
      cle: "JUG",
      nomChamp: "Type / Poste / Commune / Pays",
      ariaLabelChamp: "registre.pocopa",
      valeur: "t",
      valeurAffichee: "TORONTO",
      libelleTest: "NE DOIT PAS",
      estVerrouille: false
    },
    {
      cle: "MAR",
      nomChamp: "Type / Poste / Commune / Pays",
      ariaLabelChamp: "registre.pocopa",
      valeur: "t",
      valeurAffichee: "TORONTO",
      libelleTest: "DOIT",
      estVerrouille: true
    },
    {
      cle: "CPN",
      nomChamp: "Type / Poste / Commune / Pays",
      ariaLabelChamp: "registre.pocopa",
      valeur: "t",
      valeurAffichee: "TORONTO",
      libelleTest: "DOIT",
      estVerrouille: true
    },
    {
      cle: "AFF",
      nomChamp: "Type / Poste / Commune / Pays",
      ariaLabelChamp: "registre.pocopa",
      valeur: "t",
      valeurAffichee: "TORONTO",
      libelleTest: "NE DOIT PAS",
      estVerrouille: false
    },
    {
      cle: "XDX",
      nomChamp: "Type / Poste / Commune / Pays",
      ariaLabelChamp: "registre.pocopa",
      valeur: "t",
      valeurAffichee: "TORONTO",
      libelleTest: "NE DOIT PAS",
      estVerrouille: false
    },
    {
      cle: "OPT",
      nomChamp: "Type / Poste / Commune / Pays",
      ariaLabelChamp: "registre.pocopa",
      valeur: "t",
      valeurAffichee: "TORONTO",
      libelleTest: "NE DOIT PAS",
      estVerrouille: false
    },
    {
      cle: "PR",
      nomChamp: "Type / Poste / Commune / Pays",
      ariaLabelChamp: "registre.pocopa",
      valeur: "t",
      valeurAffichee: "TORONTO",
      libelleTest: "NE DOIT PAS",
      estVerrouille: false
    },
    {
      cle: "PAC",
      nomChamp: "Type / Poste / Commune / Pays",
      ariaLabelChamp: "registre.pocopa",
      valeur: "t",
      valeurAffichee: "TORONTO",
      libelleTest: "DOIT",
      estVerrouille: true
    }
  ];

  test.each([
    ...VALEURS_TEST_CHAMP_NATURE_ACTE,
    ...VALEURS_TEST_CHAMP_SUPPORT_UN,
    ...VALEURS_TEST_CHAMP_SUPPORT_DEUX,
    ...VALEURS_TEST_CHAMP_NUMERO_ACTE_OU_ORDRE,
    ...VALEURS_TEST_CHAMP_NUMERO_BIS_TER,
    ...VALEURS_TEST_CHAMP_ANNEE
  ])(
    `$libelleTest verrouiller et reinitialiser le champ '$nomChamp' QUAND la clé '$cle' du champ 'Famille de registre' est sélectionné.`,
    params => {
      const { getByLabelText, getByDisplayValue, queryByDisplayValue } = render(
        <HookRegistreActeFiltre />
      );

      const champFamilleRegistre = getByLabelText("Famille de registre");
      const champTeste = getByLabelText(
        params.ariaLabelChamp
      ) as HTMLInputElement;

      fireEvent.change(champTeste, {
        target: {
          value: params.valeur
        }
      });

      expect(champTeste.disabled).not.toBeTruthy();
      expect(getByDisplayValue(params.valeurAffichee)).toBeDefined();

      fireEvent.change(champFamilleRegistre, {
        target: {
          value: params.cle
        }
      });

      if (params.estVerrouilleEtReinitialise) {
        expect(champTeste.disabled).toBeTruthy();
        expect(queryByDisplayValue(params.valeurAffichee)).toBeNull();
      } else {
        expect(champTeste.disabled).not.toBeTruthy();
        expect(getByDisplayValue(params.valeurAffichee)).toBeDefined();
      }
    }
  );

  test.skip.each(VALEURS_TEST_CHAMP_POCOPA)(
    "$libelleTest verrouiller le champ '$nomChamp' QUAND la clé '$cle' du champ 'Famille de registre' est sélectionné.",
    params => {
      render(<HookRegistreActeFiltre />);

      const champFamilleRegistre = screen.getByLabelText("Famille de registre");
      const champTeste = screen.getByLabelText(
        params.ariaLabelChamp
      ) as HTMLInputElement;

      fireEvent.change(champTeste, {
        target: {
          value: params.valeur
        }
      });
      waitFor(() => {
        expect(screen.getByText(params.valeurAffichee)).toBeDefined();
      });
      fireEvent.keyDown(champTeste, { key: "Enter" });

      waitFor(() => {
        expect(screen.getByDisplayValue(params.valeurAffichee)).toBeDefined();
      });

      fireEvent.change(champFamilleRegistre, {
        target: {
          value: params.cle
        }
      });

      waitFor(() => {
        if (params.estVerrouille) {
          expect(champTeste.disabled).toBeTruthy();
        } else {
          expect(champTeste.disabled).not.toBeTruthy();
        }
      });
    }
  );

  test("DOIT pré-remplir le champ 'Type / Poste / Commune / Pays' avec la valeur 'TR-ACTES' QUAND la clé 'MAR' du champ 'Famille de registre' est sélectionné.", () => {
    render(<HookRegistreActeFiltre />);

    const champFamilleRegistre = screen.getByLabelText("Famille de registre");

    waitFor(() => {
      expect(screen.queryByDisplayValue("TR-ACTES")).toBeNull();
    });

    fireEvent.change(champFamilleRegistre, {
      target: {
        value: "MAR"
      }
    });

    waitFor(() => {
      expect(screen.queryByDisplayValue("TR-ACTES")).toBeDefined();
    });
  });

  test.skip.each(Object.keys(TypeFamille).map(cle => ({ cle })))(
    "DOIT réinitialiser le champ 'Type / Poste / Commune / Pays' QUAND la clé '$cle' du champ 'Famille de registre' est sélectionné.",
    params => {
      render(<HookRegistreActeFiltre />);

      const champFamilleRegistre = screen.getByLabelText("Famille de registre");
      const champTypePosteCommunePays =
        screen.getByLabelText("registre.pocopa");

      fireEvent.change(champTypePosteCommunePays, {
        target: {
          value: "t"
        }
      });
      waitFor(() => {
        expect(screen.getByText("TORONTO")).toBeDefined();
      });
      fireEvent.keyDown(champTypePosteCommunePays, { key: "Enter" });

      waitFor(() => {
        expect(screen.getByDisplayValue("TORONTO")).toBeDefined();
      });

      fireEvent.change(champFamilleRegistre, {
        target: {
          value: params.cle
        }
      });

      waitFor(() => {
        expect(screen.queryByDisplayValue("TORONTO")).toBeNull();
      });
    }
  );
});

test.skip("render composant RegistreActeFiltre", () => {
  render(<HookRegistreActeFiltre />);

  const natureActe = screen.getByTestId(
    "registre.natureActe"
  ) as HTMLSelectElement;
  const familleRegistre = screen.getByTestId(
    "registre.familleRegistre"
  ) as HTMLSelectElement;
  const autocomplete = screen.getByTestId("autocomplete");
  const pocopa = screen.getByLabelText("registre.pocopa") as HTMLInputElement;
  const numeroActe = screen.getByLabelText(
    "Numero d'acte ou d'ordre"
  ) as HTMLInputElement;

  const allInputRegistreActe = [
    natureActe,
    familleRegistre,
    pocopa,
    numeroActe,
    autocomplete
  ];

  waitFor(() => {
    expectToBeDefined([...allInputRegistreActe]);
  });
  autocomplete.focus();

  fireEvent.change(familleRegistre, {
    target: {
      value: "ACQ"
    }
  });
  fireEvent.change(pocopa, {
    target: {
      value: "t"
    }
  });

  waitFor(() => {
    expect(screen.getByText("TORONTO")).toBeDefined();
  });

  fireEvent.keyDown(pocopa, { key: "Enter" });

  fireEvent.change(natureActe, {
    target: {
      value: "MARIAGE"
    }
  });

  fireEvent.change(numeroActe, {
    target: {
      value: "123456"
    }
  });

  fireEvent.click(screen.getByText(/Submit/i));

  const result = screen.getByTestId("result");
  waitFor(() => {
    expect(result.innerHTML).toBe(
      '{"registre":{"natureActe":"MARIAGE","familleRegistre":"ACQ","anneeRegistre":"","pocopa":{"cle":"TORONTO","libelle":"TORONTO"},"registreSupport":{"supportUn":"","supportDeux":""},"numeroActe":{"numeroActeOuOrdre":"123456","numeroBisTer":"","aPartirDe":false}}}'
    );
  });
});
