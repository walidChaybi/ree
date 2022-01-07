import { createMemoryHistory } from "history";
import { StatutRequete } from "../../../../model/requete/enum/StatutRequete";
import { TypeRequete } from "../../../../model/requete/enum/TypeRequete";
import { checkURL } from "../../../../views/common/util/route/Protection/ProtectionApercu";

const history = createMemoryHistory();

test("Protection apercu", () => {
  history.push(
    "http://localhost/rece/rece-ui/mesrequetes/saisircertificatsituation"
  );
  expect(
    checkURL(history, StatutRequete.BROUILLON, TypeRequete.DELIVRANCE)
  ).toBeTruthy();

  history.push(
    "http://localhost/rece/rece-ui/mesrequetes/apercurequetepriseencharge"
  );
  expect(
    checkURL(history, StatutRequete.PRISE_EN_CHARGE, TypeRequete.DELIVRANCE)
  ).toBeTruthy();

  history.push(
    "http://localhost/rece/rece-ui/mesrequetes/apercurequetedelivrance/"
  );
  expect(
    checkURL(history, StatutRequete.TRANSFEREE, TypeRequete.DELIVRANCE)
  ).toBeTruthy();

  history.push(
    "http://localhost/rece/rece-ui/mesrequetes/apercurequetetraitement"
  );
  expect(
    checkURL(history, StatutRequete.A_VALIDER, TypeRequete.DELIVRANCE)
  ).toBeTruthy();

  history.push(
    "http://localhost/rece/rece-ui/mesrequetesinformation/apercurequeteinformation"
  );
  expect(
    checkURL(history, StatutRequete.PRISE_EN_CHARGE, TypeRequete.INFORMATION)
  ).toBeTruthy();
});
