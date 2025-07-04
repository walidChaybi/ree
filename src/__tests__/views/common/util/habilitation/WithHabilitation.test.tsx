import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { render, waitFor } from "@testing-library/react";
import WithHabilitation from "@util/habilitation/WithHabilitation";
import { IHabiliationDescription } from "@util/habilitation/habilitationsDescription";
import React from "react";
import { expect, test } from "vitest";

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
  const { getByText, queryByTestId } = render(
    <MockRECEContextProvider
      utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.ATTRIBUER_REQUETE).generer()}
    >
      <BoutonTestWithHab />
    </MockRECEContextProvider>
  );
  expect(queryByTestId(/testid/i)).not.toBeNull();
  expect(getByText(/Click me/i).closest("button")?.disabled).not.toBeTruthy();
});

test("Le bouton ne doit pas être grisé car l'utilisateur à un de ces droit à Attribuer ou Consulter", () => {
  const { getByText, queryByTestId } = render(
    <MockRECEContextProvider utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.CONSULTER).generer()}>
      <BoutonTest3WithHab />
    </MockRECEContextProvider>
  );
  expect(queryByTestId(/testid/i)).not.toBeNull();
  expect(getByText(/Click me/i).closest("button")?.disabled).not.toBeTruthy();
});

test("Le bouton doit être grisé car l'utilisateur n'à pas le droit Attribuer", () => {
  const { getByText, queryByTestId } = render(
    <MockRECEContextProvider utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().generer()}>
      <BoutonTestWithHab />
    </MockRECEContextProvider>
  );
  expect(queryByTestId(/testid/i)).not.toBeNull();
  expect(getByText(/Click me/i).closest("button")?.disabled).toBeTruthy();
});

test("Le bouton doit être invisible car l'utilisateur n'à pas le droit Attribuer", () => {
  habsDesc[0].visiblePourLesDroits = [Droit.ATTRIBUER_REQUETE];
  const { queryByTestId } = render(
    <MockRECEContextProvider
      utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.CONSULTER_ARCHIVES).generer()}
    >
      <BoutonTestWithHab />
    </MockRECEContextProvider>
  );
  expect(queryByTestId(/testid/i)).toBeNull();
});

test("Le bouton ne doit pas être grisé car il n'a aucun droit associé", () => {
  const { getByText, queryByTestId } = render(
    <MockRECEContextProvider utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().generer()}>
      <BoutonTest2WithHab />
    </MockRECEContextProvider>
  );
  expect(queryByTestId(/testid/i)).not.toBeNull();
  expect(getByText(/Click me/i).closest("button")?.disabled).not.toBeTruthy();
});

test("Le bouton ne doit être ni grisé ni invisible car l'utilisateur à seulement le droit CONSULTER_ARCHIVES", async () => {
  const { getByText, queryByTestId } = render(
    <MockRECEContextProvider
      utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.CONSULTER_ARCHIVES).generer()}
    >
      <BoutonTest4WithHab />
    </MockRECEContextProvider>
  );

  await waitFor(() => {
    expect(queryByTestId(/testid/i)).not.toBeNull();
    expect(getByText(/Click me/i).closest("button")?.disabled).not.toBeTruthy();
  });
});

test("Le bouton doit être invisible car l'utilisateur n'a pas seulement le droit CONSULTER_ARCHIVES", () => {
  const { queryByTestId } = render(
    <MockRECEContextProvider
      utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte()
        .avecDroits([Droit.CONSULTER_ARCHIVES, Droit.ATTRIBUER_REQUETE])
        .generer()}
    >
      <BoutonTest4WithHab />
    </MockRECEContextProvider>
  );
  expect(queryByTestId(/testid/i)).toBeNull();
});
