import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { checkURL } from "@util/route/Protection/ProtectionApercu";

test("Protection apercu", () => {
  expect(
    checkURL(
      "http://localhost/rece/rece-ui/mesrequetes/saisircertificatsituation",
      StatutRequete.BROUILLON,
      TypeRequete.DELIVRANCE
    )
  ).toBeTruthy();

  expect(
    checkURL(
      "http://localhost/rece/rece-ui/mesrequetes/apercurequetepriseencharge",
      StatutRequete.PRISE_EN_CHARGE,
      TypeRequete.DELIVRANCE
    )
  ).toBeTruthy();

  expect(
    checkURL(
      "http://localhost/rece/rece-ui/mesrequetes/apercurequetedelivrance/",
      StatutRequete.TRANSFEREE,
      TypeRequete.DELIVRANCE
    )
  ).toBeTruthy();
  expect(
    checkURL(
      "http://localhost/rece/rece-ui/mesrequetes/apercurequetetraitement",
      StatutRequete.A_VALIDER,
      TypeRequete.DELIVRANCE
    )
  ).toBeTruthy();

  expect(
    checkURL(
      "http://localhost/rece/rece-ui/mesrequetesinformation/apercurequeteinformation",
      StatutRequete.PRISE_EN_CHARGE,
      TypeRequete.INFORMATION
    )
  ).toBeTruthy();
});
