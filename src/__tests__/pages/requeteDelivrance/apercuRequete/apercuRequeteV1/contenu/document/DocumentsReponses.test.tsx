import { render } from "@testing-library/react";
import React from "react";
import requeteDelivrance from "../../../../../../../mock/data/requeteDelivrance";
import { StatutRequete } from "../../../../../../../model/requete/v2/enum/StatutRequete";
import { DocumentsReponses } from "../../../../../../../views/pages/requeteDelivrance/apercuRequete/apercuRequetePartieGauche/contenu/document/DocumentsReponses";

test("render bloc Documents Reponses", () => {
  const requete = requeteDelivrance;
  requete.statutCourant.statut = StatutRequete.A_VALIDER;
  const { getByText } = render(
    <DocumentsReponses requete={requete}></DocumentsReponses>
  );

  const titre = getByText(/Documents à délivrer/i);
  expect(titre).toBeDefined();

  const textTitulaire = getByText(/CARN_EC_117/i);
  expect(textTitulaire).toBeDefined();
});
