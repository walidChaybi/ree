import React from "react";
import { render, screen } from "@testing-library/react";
import {
  goToLinkRequete,
  getIconPrioriteRequete
} from "../../../views/pages/espaceDelivrance/espaceDelivranceUtils";
import { IDataTable } from "../../../views/pages/espaceDelivrance/MesRequetesPage";

test("espace delivrance utils goToLinkRequete", () => {
  const result = goToLinkRequete(
    "<http://localhost:80/rece-requete-api/v1//requetes/requetesService?statut=A_SIGNER&tri=dateStatut&sens=ASC&range=2-105",
    "requetesService"
  );
  expect(result?.statuts).toStrictEqual(["A_SIGNER"]);
  expect(result?.tri).toBe("dateStatut");
  expect(result?.sens).toBe("ASC");
  expect(result?.range).toBe("2-105");
  expect(result?.lastDateReaload).toBeUndefined();
});

test("espace delivrance utils getIconPrioriteRequete ", () => {
  const result = getIconPrioriteRequete({
    dateStatut: "01/01/2020"
  } as IDataTable);
  render(result);
  expect(screen.getByTitle(/Priorité haute/i)).toBeDefined();
});
