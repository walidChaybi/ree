import { render, screen } from "@testing-library/react";
import { StatutRequete } from "../../../model/requete/v2/enum/StatutRequete";
import { getIconPrioriteRequete } from "../../../views/common/util/tableauRequete/TableauRequeteUtils";
import { goToLinkRequete } from "../../../views/pages/espaceDelivrance/v2/EspaceDelivranceUtilsV2";

test("espace delivrance utils goToLinkRequete", () => {
  const result = goToLinkRequete(
    "<http://localhost:80/rece-requete-api/v2/requetes/requetesService?statut=A_SIGNER&tri=dateStatut&sens=ASC&range=2-105",
    "requetesService"
  );
  expect(result?.statuts).toStrictEqual([StatutRequete.A_SIGNER]);
  expect(result?.tri).toBe("dateStatut");
  expect(result?.sens).toBe("ASC");
  expect(result?.range).toBe("2-105");
});

test("espace delivrance utils getIconPrioriteRequete ", () => {
  const result = getIconPrioriteRequete({
    priorite: "HAUTE"
  });
  render(result);
  expect(screen.getByTitle(/Priorité haute/i)).toBeDefined();
});
