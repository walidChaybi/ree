import { createMemoryHistory } from "history";
import { StatutRequete } from "../../../../model/requete/v2/enum/StatutRequete";
import { TypeRequete } from "../../../../model/requete/v2/enum/TypeRequete";
import { checkURL } from "../../../../views/common/util/route/Protection/ProtectionApercu";

const history = createMemoryHistory();

test("Protection apercu", () => {
  history.push(
    "http://localhost/rece/rece-ui/mesrequetesv2/saisircertificatsituation"
  );
  expect(
    checkURL(history, StatutRequete.BROUILLON, TypeRequete.DELIVRANCE)
  ).toBeTruthy();

  history.push(
    "http://localhost/rece/rece-ui/mesrequetesv2/apercurequetepriseencharge"
  );
  expect(
    checkURL(history, StatutRequete.PRISE_EN_CHARGE, TypeRequete.DELIVRANCE)
  ).toBeTruthy();

  history.push("http://localhost/rece/rece-ui/mesrequetesv2/apercurequete/");
  expect(
    checkURL(history, StatutRequete.TRANSFEREE, TypeRequete.DELIVRANCE)
  ).toBeTruthy();

  history.push(
    "http://localhost/rece/rece-ui/mesrequetesv2/apercurequetetraitement"
  );
  expect(
    checkURL(history, StatutRequete.A_VALIDER, TypeRequete.DELIVRANCE)
  ).toBeTruthy();

  history.push(
    "http://localhost/rece/rece-ui/mesrequetesinformation/apercurequete"
  );
  expect(
    checkURL(history, StatutRequete.PRISE_EN_CHARGE, TypeRequete.INFORMATION)
  ).toBeTruthy();
});
