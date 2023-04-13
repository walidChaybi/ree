import { getOngletSelectVenantDePriseEnCharge } from "@hook/requete/creerCourrierECHook";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { DocumentEC } from "@model/requete/enum/DocumentEC";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";

test("getOngletSelectVenantDePriseEnCharge", () => {
  expect(
    getOngletSelectVenantDePriseEnCharge(
      SousTypeDelivrance.RDD,
      ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION
    )
  ).toBe(DocumentEC.Principal);

  expect(
    getOngletSelectVenantDePriseEnCharge(
      SousTypeDelivrance.RDD,
      ChoixDelivrance.REP_SANS_DEL_EC_ACTE_NON_DETENU_AU_SCEC
    )
  ).toBe(DocumentEC.Courrier);

  expect(
    getOngletSelectVenantDePriseEnCharge(
      SousTypeDelivrance.RDC,
      ChoixDelivrance.REP_SANS_DEL_EC_ACTE_NON_DETENU_AU_SCEC
    )
  ).toBe(DocumentEC.Courrier);

  expect(
    getOngletSelectVenantDePriseEnCharge(
      SousTypeDelivrance.RDC,
      ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION
    )
  ).toBe(DocumentEC.Courrier);
});
