import { render, screen, waitFor } from "@testing-library/react";
import { PopinSignatureMiseAJourMentions } from "@widget/signature/PopinSignatureMiseAJourMentions";
import { MemoryRouter } from "react-router-dom";

test("render PopinSignatureMiseAJourMentions QUAND on ouvre la popin", async () => {

  await waitFor(() => {
    expect(screen.queryByText("Signature des mentions")).toBeNull();
    expect(
      screen.queryByText(
        "En cliquant sur VALIDER, vous acceptez de signer électroniquement la ou les mentions apposée(s) qui comporteront les données suivantes insérées automatiquement : lieu et date d’apposition, qualité du signataire, prénom et nom usuels dans le dispositif de création de signature qualifiée."
      )
    ).toBeNull();
  });

  render(
    <MemoryRouter>
      <PopinSignatureMiseAJourMentions
        estOuvert={true}
        setEstOuvert={() => {}}
      />
    </MemoryRouter>
  );
  await waitFor(() => {
    expect(screen.queryByText("Signature des mentions")).toBeDefined();
    expect(
      screen.getByText(
        "En cliquant sur VALIDER, vous acceptez de signer électroniquement la ou les mentions apposée(s) qui comporteront les données suivantes insérées automatiquement : lieu et date d’apposition, qualité du signataire, prénom et nom usuels dans le dispositif de création de signature qualifiée."
      )
    ).toBeDefined();
  });
});
