import mockConnectedUser from "@mock/data/connectedUser.json";
import { IOfficier } from "@model/agent/IOfficier";
import { Droit } from "@model/agent/enum/Droit";
import { render } from "@testing-library/react";
import WithHabilitation from "@util/habilitation/WithHabilitation";
import { IHabiliationDescription } from "@util/habilitation/habilitationsDescription";
import { storeRece } from "@util/storeRece";
import React from "react";

interface BoutonTestProps {
  disabled?: boolean;
}

const BoutonTest: React.FC<BoutonTestProps> = props => {
  return (
    <button data-testid="testid" disabled={props.disabled}>
      <span>Click me</span>
    </button>
  );
};
const u: any = mockConnectedUser;
storeRece.utilisateurCourant = u as IOfficier;

const habsDesc: IHabiliationDescription[] = [
  {
    // @ts-ignore
    nomComposant: "BoutonTest",
    tousLesDroits: [Droit.ATTRIBUER],
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
    unDesDroits: [Droit.ATTRIBUER, Droit.CONSULTER],
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

test("Le bouton ne doit pas être grisé car l'utilisateur à le droit Attribuer", () => {
  storeRece.utilisateurCourant!.habilitations[0].profil.droits[0] = {
    idDroit: "d12345",
    nom: Droit.ATTRIBUER
  };
  const { getByText, queryByTestId } = render(<BoutonTestWithHab />);
  expect(queryByTestId(/testid/i)).not.toBeNull();
  // @ts-ignore
  expect(getByText(/Click me/i).closest("button")).not.toBeDisabled();
});

test("Le bouton ne doit pas être grisé car l'utilisateur à un de ces droit à Attribuer ou Consulter", () => {
  storeRece.utilisateurCourant!.habilitations[0].profil.droits[0] = {
    idDroit: "d12345",
    nom: Droit.CONSULTER
  };
  const { getByText, queryByTestId } = render(<BoutonTest3WithHab />);
  expect(queryByTestId(/testid/i)).not.toBeNull();
  // @ts-ignore
  expect(getByText(/Click me/i).closest("button")).not.toBeDisabled();
});

test("Le bouton doit être grisé car l'utilisateur n'à pas le droit Attribuer", () => {
  storeRece.utilisateurCourant!.habilitations[0].profil.droits = [];
  const { getByText, queryByTestId } = render(<BoutonTestWithHab />);
  expect(queryByTestId(/testid/i)).not.toBeNull();
  // @ts-ignore
  expect(getByText(/Click me/i).closest("button")).toBeDisabled();
});

test("Le bouton doit être invisible car l'utilisateur n'à pas le droit Attribuer", () => {
  storeRece.utilisateurCourant!.habilitations[0].profil.droits[0] = {
    idDroit: "d12346",
    nom: Droit.CONSULTER_ARCHIVES
  };
  habsDesc[0].visiblePourLesDroits = [Droit.ATTRIBUER];
  const { queryByTestId } = render(<BoutonTestWithHab />);
  expect(queryByTestId(/testid/i)).toBeNull();
});

test("Le bouton ne doit pas être grisé car il n'a aucun droit associé", () => {
  storeRece.utilisateurCourant!.habilitations[0].profil.droits = [];
  const { getByText, queryByTestId } = render(<BoutonTest2WithHab />);
  expect(queryByTestId(/testid/i)).not.toBeNull();
  // @ts-ignore
  expect(getByText(/Click me/i).closest("button")).not.toBeDisabled();
});

test("Le bouton ne doit être ni grisé ni invisible car l'utilisateur à seulement le droit CONSULTER_ARCHIVES", () => {
  storeRece.utilisateurCourant!.habilitations[0].profil.droits[0] = {
    idDroit: "d12345",
    nom: Droit.CONSULTER_ARCHIVES
  };
  const { getByText, queryByTestId } = render(<BoutonTest4WithHab />);
  expect(queryByTestId(/testid/i)).not.toBeNull();
  // @ts-ignore
  expect(getByText(/Click me/i).closest("button")).not.toBeDisabled();
});

test("Le bouton doit être invisible car l'utilisateur n'a pas seulement le droit CONSULTER_ARCHIVES", () => {
  const hab1 = {
    idHabilitation: "h12345",
    profil: {
      idProfil: "p12345",
      nom: "CONSULTER_ARCHIVES",
      droits: [
        {
          idDroit: "d12345",
          nom: Droit.CONSULTER_ARCHIVES
        }
      ]
    }
  };
  const hab2 = {
    idHabilitation: "h67890",
    profil: {
      idProfil: "p12346",
      nom: "ATTRIBUER",
      droits: [
        {
          idDroit: "d12346",
          nom: Droit.ATTRIBUER
        }
      ]
    }
  };
  storeRece.utilisateurCourant!.habilitations = [hab1, hab2];
  const { queryByTestId } = render(<BoutonTest4WithHab />);
  expect(queryByTestId(/testid/i)).toBeNull();
});
