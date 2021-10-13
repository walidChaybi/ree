import { createMemoryHistory } from "history";
import { StatutRequete } from "../../../../model/requete/v2/enum/StatutRequete";
import { checkURLEnFonctionDuStatut } from "../../../../views/common/util/route/Protection/ProtectionApercu";

const history = createMemoryHistory();

test("Protection apercu", () => {
  history.push(
    "http://localhost/rece/rece-ui/mesrequetesv2/saisircertificatsituation"
  );
  expect(
    checkURLEnFonctionDuStatut(StatutRequete.BROUILLON, history)
  ).toBeTruthy();

  history.push(
    "http://localhost/rece/rece-ui/mesrequetesv2/apercurequetepriseencharge"
  );
  expect(
    checkURLEnFonctionDuStatut(StatutRequete.PRISE_EN_CHARGE, history)
  ).toBeTruthy();

  history.push("http://localhost/rece/rece-ui/mesrequetesv2/apercurequete/");
  expect(
    checkURLEnFonctionDuStatut(StatutRequete.TRANSFEREE, history)
  ).toBeTruthy();

  history.push(
    "http://localhost/rece/rece-ui/mesrequetesv2/apercurequetetraitement"
  );
  expect(
    checkURLEnFonctionDuStatut(StatutRequete.A_VALIDER, history)
  ).toBeTruthy();
});
