import { IHabilitation } from "@model/agent/Habilitation";
import { IOfficier } from "@model/agent/IOfficier";
import { IPerimetre } from "@model/agent/IPerimetre";
import { Droit } from "@model/agent/enum/Droit";
import { render, waitFor } from "@testing-library/react";
import WithHabilitation from "@util/habilitation/WithHabilitation";
import { IHabiliationDescription } from "@util/habilitation/habilitationsDescription";
import React from "react";
import { expect, test } from "vitest";
import { elementAvecContexte } from "../../../../__tests__utils__/testsUtil";
import mockConnectedUser from "../../../../mock/data/connectedUser.json";

interface BoutonTestProps {
  disabled?: boolean;
}

const BoutonTest: React.FC<BoutonTestProps> = props => {
  return (
    <button
      data-testid="testid"
      disabled={props.disabled}
    >
      <span>Click me</span>
    </button>
  );
};
const u: any = mockConnectedUser;
const utilisateurConnecte = u as IOfficier;

const habsDesc: IHabiliationDescription[] = [
  {
    // @ts-ignore
    nomComposant: "BoutonTest",
    tousLesDroits: [Droit.ATTRIBUER_REQUETE],
    comportementSiNonAutorise: { disabled: true }
  },

  {
    // @ts-ignore
    nomComposant: "BoutonTest2",
    comportementSiNonAutorise: { disabled: true }
  },
  {
    // @ts-ignore
    nomComposant: "BoutonTest3",
    unDesDroits: [Droit.ATTRIBUER_REQUETE, Droit.CONSULTER],
    comportementSiNonAutorise: { disabled: true }
  },
  {
    // @ts-ignore
    nomComposant: "BoutonTest4",
    tousLesDroits: [Droit.CONSULTER_ARCHIVES],
    comportementSiNonAutorise: { disabled: true },
    visibleSeulementPourLesDroits: [Droit.CONSULTER_ARCHIVES]
  }
];

const BoutonTestWithHab = WithHabilitation(
  BoutonTest,
  // @ts-ignore
  "BoutonTest",
  habsDesc
);
const BoutonTest2WithHab = WithHabilitation(
  BoutonTest,
  // @ts-ignore
  "BoutonTest2",
  habsDesc
);
const BoutonTest3WithHab = WithHabilitation(
  BoutonTest,
  // @ts-ignore
  "BoutonTest3",
  habsDesc
);
const BoutonTest4WithHab = WithHabilitation(
  BoutonTest,
  // @ts-ignore
  "BoutonTest4",
  habsDesc
);

test.skip("Le bouton ne doit pas être grisé car l'utilisateur à le droit Attribuer", () => {
  let utilisateurConnecteMock = {
    ...utilisateurConnecte
  };
  utilisateurConnecteMock.habilitations[0].profil.droits[0] = {
    idDroit: "d12345",
    nom: Droit.ATTRIBUER_REQUETE
  };
  const { getByText, queryByTestId } = render(elementAvecContexte(<BoutonTestWithHab />, utilisateurConnecteMock));
  expect(queryByTestId(/testid/i)).not.toBeNull();
  expect(getByText(/Click me/i).closest("button")?.disabled).not.toBeTruthy();
});

test("Le bouton ne doit pas être grisé car l'utilisateur à un de ces droit à Attribuer ou Consulter", () => {
  let utilisateurConnecteMock = {
    ...utilisateurConnecte
  };
  utilisateurConnecteMock.habilitations[0].profil.droits[0] = {
    idDroit: "d12345",
    nom: Droit.CONSULTER
  };
  const { getByText, queryByTestId } = render(elementAvecContexte(<BoutonTest3WithHab />, utilisateurConnecteMock));
  expect(queryByTestId(/testid/i)).not.toBeNull();
  expect(getByText(/Click me/i).closest("button")?.disabled).not.toBeTruthy();
});

test("Le bouton doit être grisé car l'utilisateur n'à pas le droit Attribuer", () => {
  let utilisateurConnecteMock = {
    ...utilisateurConnecte
  };
  utilisateurConnecteMock.habilitations[0].profil.droits = [];
  const { getByText, queryByTestId } = render(elementAvecContexte(<BoutonTestWithHab />, utilisateurConnecteMock));
  expect(queryByTestId(/testid/i)).not.toBeNull();
  expect(getByText(/Click me/i).closest("button")?.disabled).toBeTruthy();
});

test("Le bouton doit être invisible car l'utilisateur n'à pas le droit Attribuer", () => {
  let utilisateurConnecteMock = {
    ...utilisateurConnecte
  };
  utilisateurConnecteMock.habilitations[0].profil.droits[0] = {
    idDroit: "d12346",
    nom: Droit.CONSULTER_ARCHIVES
  };
  habsDesc[0].visiblePourLesDroits = [Droit.ATTRIBUER_REQUETE];
  const { queryByTestId } = render(elementAvecContexte(<BoutonTestWithHab />, utilisateurConnecteMock));
  expect(queryByTestId(/testid/i)).toBeNull();
});

test("Le bouton ne doit pas être grisé car il n'a aucun droit associé", () => {
  let utilisateurConnecteMock = {
    ...utilisateurConnecte
  };
  utilisateurConnecteMock.habilitations[0].profil.droits = [];
  const { getByText, queryByTestId } = render(elementAvecContexte(<BoutonTest2WithHab />, utilisateurConnecteMock));
  expect(queryByTestId(/testid/i)).not.toBeNull();
  expect(getByText(/Click me/i).closest("button")?.disabled).not.toBeTruthy();
});

test("Le bouton ne doit être ni grisé ni invisible car l'utilisateur à seulement le droit CONSULTER_ARCHIVES", async () => {
  let utilisateurConnecteMock = {
    habilitations: [
      {
        profil: {
          droits: [
            {
              idDroit: "d12345",
              nom: Droit.CONSULTER_ARCHIVES
            }
          ]
        }
      }
    ]
  } as IOfficier;
  const { getByText, queryByTestId } = render(elementAvecContexte(<BoutonTest4WithHab />, utilisateurConnecteMock));

  await waitFor(() => {
    expect(queryByTestId(/testid/i)).not.toBeNull();
    expect(getByText(/Click me/i).closest("button")?.disabled).not.toBeTruthy();
  });
});

test("Le bouton doit être invisible car l'utilisateur n'a pas seulement le droit CONSULTER_ARCHIVES", () => {
  const hab1 = {
    idHabilitation: "h12345",
    profil: {
      idProfil: "p12345",
      nom: {
        code: "CONSULTER_ARCHIVES"
      },
      droits: [
        {
          idDroit: "d12345",
          nom: Droit.CONSULTER_ARCHIVES
        }
      ]
    },
    perimetre: {} as IPerimetre
  } as IHabilitation;
  const hab2 = {
    idHabilitation: "h67890",
    profil: {
      idProfil: "p12346",
      nom: {
        code: "ATTRIBUER_REQUETE"
      },
      droits: [
        {
          idDroit: "d12346",
          nom: Droit.ATTRIBUER_REQUETE
        }
      ]
    }
  } as IHabilitation;
  let utilisateurConnecteMock = {
    ...utilisateurConnecte
  };
  utilisateurConnecteMock.habilitations = [hab1, hab2];
  const { queryByTestId } = render(elementAvecContexte(<BoutonTest4WithHab />, utilisateurConnecteMock));
  expect(queryByTestId(/testid/i)).toBeNull();
});
