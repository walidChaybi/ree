import React from "react";
import WithHabilitation from "../../../../views/common/util/habilitation/WithHabilitation";
import { render, screen } from "@testing-library/react";
import { storeRece } from "../../../../views/common/util/storeRece";
import mockConnectedUser from "../../../../mock/data/connectedUser.json";
import { IOfficierSSOApi } from "../../../../model/IOfficierSSOApi";
import { Droit } from "../../../../model/Droit";
import { IHabiliationDescription } from "../../../../views/common/util/habilitation/habilitationsDescription";

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
storeRece.utilisateurCourant = u as IOfficierSSOApi;

const habsDesc: IHabiliationDescription[] = [
  {
    nomComposant: "BoutonTest",
    droits: [Droit.Attribuer],
    comportementSiNonAutorise: { disabled: true }
  }
];

const BoutonTestWithHab = WithHabilitation(BoutonTest, habsDesc);

test("Le bouton ne doit pas être grisé car l'utilisateur à le droit Attribuer", () => {
  storeRece.utilisateurCourant!.habilitations[0].profil.droits[0] = {
    idDroit: "d12345",
    nom: Droit.Attribuer
  };
  const { getByText, queryByTestId } = render(<BoutonTestWithHab />);
  expect(queryByTestId(/testid/i)).not.toBeNull();
  expect(getByText(/Click me/i).closest("button")).not.toBeDisabled();
});

test("Le bouton doit être grisé car l'utilisateur n'à pas le droit Attribuer", () => {
  storeRece.utilisateurCourant!.habilitations[0].profil.droits = [];
  const { getByText, queryByTestId } = render(<BoutonTestWithHab />);
  expect(queryByTestId(/testid/i)).not.toBeNull();
  expect(getByText(/Click me/i).closest("button")).toBeDisabled();
});

test("Le bouton doit être invisible car l'utilisateur n'à pas le droit Attribuer", () => {
  storeRece.utilisateurCourant!.habilitations[0].profil.droits = [];
  habsDesc[0].nonvisibleSiNonAutorise = true;
  const { queryByTestId } = render(<BoutonTestWithHab />);
  expect(queryByTestId(/testid/i)).toBeNull();
});
