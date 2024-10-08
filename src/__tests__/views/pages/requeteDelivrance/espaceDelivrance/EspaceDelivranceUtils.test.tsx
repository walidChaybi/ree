import {
  requeteRDCSC,
  requeteRDCSCCertificatSituationRCA
} from "@mock/data/requeteDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { mappingRequetesTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import {
  ADonneesTitulaireRequeteAbsentes,
  goToLinkRequete
} from "@pages/requeteDelivrance/espaceDelivrance/EspaceDelivranceUtils";
import { render, screen } from "@testing-library/react";
import { RenderIconPrioriteRequete } from "@util/tableauRequete/TableauRequeteUtils";
import { expect, test } from "vitest";

test("espace delivrance utils goToLinkRequete", () => {
  const result = goToLinkRequete(
    "<http://localhost:80/rece-requete-api/v2/requetes/mesrequetescreation?statut=A_SIGNER&tri=dateStatut&sens=ASC&range=2-105",
    "mesrequetescreation"
  );
  expect(result?.statuts).toStrictEqual([StatutRequete.A_SIGNER]);
  expect(result?.tri).toBe("dateStatut");
  expect(result?.sens).toBe("ASC");
  expect(result?.range).toBe("2-105");
});

test("espace delivrance utils getIconPrioriteRequete ", () => {
  const result = RenderIconPrioriteRequete({
    priorite: "HAUTE"
  });
  render(result);
  expect(screen.getByTitle(/Priorité haute/i)).toBeDefined();
});

test("Doit retourer true quand une des conditions n'est pas remplie (ex: NATIONALITE = FRANCAISE)", () => {
  const requete = mappingRequetesTableauDelivrance(
    [requeteRDCSC],
    false,
    [],
    []
  ) as unknown as IRequeteDelivrance[];

  const result = ADonneesTitulaireRequeteAbsentes(requete[0]);

  expect(result).toBe(true);
});

test("Doit retourer false quand toutes les données sont présente", () => {
  const requete = mappingRequetesTableauDelivrance(
    [requeteRDCSCCertificatSituationRCA],
    false,
    [],
    []
  ) as unknown as IRequeteDelivrance[];

  const result = ADonneesTitulaireRequeteAbsentes(requete[0]);

  expect(result).toBe(false);
});
