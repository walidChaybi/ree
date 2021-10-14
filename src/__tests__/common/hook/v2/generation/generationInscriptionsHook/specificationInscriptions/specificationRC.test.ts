import request from "superagent";
import {
  FicheRcDecisionNotaire,
  FicheRcDecisionNotaireTypeRequete,
  FicheRcDecisionNotaireTypeRequete2,
  FicheRcRenouvellementTypeJugement,
  FicheRcRenouvellementTypeOrdonnance
} from "../../../../../../../mock/data/ficheRC";
import { decrets } from "../../../../../../../mock/data/NomenclatureEtatCivilDecrets";
import { configEtatcivil } from "../../../../../../../mock/superagent-config/superagent-mock-etatcivil";
import { NatureRc } from "../../../../../../../model/etatcivil/enum/NatureRc";
import { TypeInscriptionRc } from "../../../../../../../model/etatcivil/enum/TypeInscriptionRc";
import { specificationRC } from "../../../../../../../views/common/hook/v2/generation/generationInscriptionsHook/specificationInscriptions/specificationRC";
import { storeRece } from "../../../../../../../views/common/util/storeRece";

const superagentMock = require("superagent-mock")(request, configEtatcivil);

beforeAll(() => {
  NatureRc.init();
  storeRece.decrets = decrets;
});
test("Attendu: specificationRC.getElementsJasper avec une décision Notaire autre que Requete", async () => {
  const data = FicheRcDecisionNotaire;
  const elementsJasper = specificationRC.getElementsJasper(data);
  const interesse = `Mathieu SLAOUI
Date de naissance: 1er septembre 1983
Lieu de naissance: Paris arr.20`;
  expect(elementsJasper.anneeInscription).toBe("2020");
  expect(elementsJasper.numeroInscription).toBe("11");
  expect(elementsJasper.decisionRecue1).toBe(
    "Le service central d'état civil a reçu un acte établi par Maitre Jean DUPONT, notaire à Paris arr.18, office notarial n°1234567, le 26 novembre 2020"
  );
  expect(elementsJasper.decisionRecue2).toBe("concernant le placement de : ");
  expect(elementsJasper.interesseDecision).toBe(interesse);
  expect(elementsJasper.regime).toBe("sous le régime de curatelle simple");
  expect(elementsJasper.renouvellementModification).toBeUndefined();
  expect(elementsJasper.decisionExequatur).toBeUndefined();
  expect(elementsJasper.duree).toBe("pour une durée de 1 année");
  expect(elementsJasper.paragrapheFin).toBe(
    "Conformément à l'Article 4 du décret 65-422 du 1er juin 1965, une inscription a été prise au répertoire civil le 18 novembre 2020 sous la référence : RC n°2020 - 11."
  );
});

test("Attendu: specificationRC.getElementsJasper avec une décision Notaire de type Requete", async () => {
  const data = FicheRcDecisionNotaireTypeRequete;
  const elementsJasper = specificationRC.getElementsJasper(data);
  const interesse = `Mathieu SLAOUI
Date de naissance: 1er septembre 1983
Lieu de naissance: Paris arr.20`;
  expect(elementsJasper.anneeInscription).toBe("2020");
  expect(elementsJasper.numeroInscription).toBe("11");
  expect(elementsJasper.decisionRecue1).toBe(
    "Le service central d'état civil a reçu un extrait de la requête présentée auprès du Tribunal judiciaire de Paris arr.20 afin d'obtenir homologation de l'acte reçu par Maitre Jean DUPONT, notaire à Paris arr.18, office notarial n°1234567, le 26 novembre 2020"
  );
  expect(elementsJasper.decisionRecue2).toBe(
    "concernant le transfert des pouvoirs de : "
  );
  expect(elementsJasper.interesseDecision).toBe(interesse);
  expect(elementsJasper.regime).toBeUndefined();
  expect(elementsJasper.renouvellementModification).toBeUndefined();
  expect(elementsJasper.decisionExequatur).toBeUndefined();
  expect(elementsJasper.duree).toBe("pour une durée de 1 année");
  expect(elementsJasper.paragrapheFin).toBe(
    "Conformément à l'Article 4 du décret 65-422 du 1er juin 1965, une inscription a été prise au répertoire civil le 18 novembre 2020 sous la référence : RC n°2020 - 11."
  );
});

test("Attendu: specificationRC.getElementsJasper avec une décision Notaire de type Requete 2", async () => {
  const data = FicheRcDecisionNotaireTypeRequete2;
  const elementsJasper = specificationRC.getElementsJasper(data);
  const interesse = `Mathieu SLAOUI
Date de naissance: 1er septembre 1983
Lieu de naissance: Paris arr.20`;
  expect(elementsJasper.anneeInscription).toBe("2020");
  expect(elementsJasper.numeroInscription).toBe("11");
  expect(elementsJasper.decisionRecue1).toBe(
    "Le service central d'état civil a reçu un extrait de la requête présentée auprès du Tribunal judiciaire de Paris arr.20 afin d'obtenir homologation de l'acte reçu par Maitre Jean DUPONT, notaire à Paris arr.18, office notarial n°1234567, le 26 novembre 2020"
  );
  expect(elementsJasper.decisionRecue2).toBe(
    "concernant l'habilitation familiale générale de : "
  );
  expect(elementsJasper.interesseDecision).toBe(interesse);
  expect(elementsJasper.regime).toBeUndefined();
  expect(elementsJasper.renouvellementModification).toBeUndefined();
  expect(elementsJasper.decisionExequatur).toBeUndefined();
  expect(elementsJasper.duree).toBe("pour une durée de 1 année");
  expect(elementsJasper.paragrapheFin).toBe(
    "Conformément à l'Article 4 du décret 65-422 du 1er juin 1965, une inscription a été prise au répertoire civil le 18 novembre 2020 sous la référence : RC n°2020 - 11."
  );
});

test("Attendu: specificationRC.getElementsJasper avec une Juridiction et une décision de type 'Jugement'", async () => {
  const data = FicheRcRenouvellementTypeJugement;
  const elementsJasper = specificationRC.getElementsJasper(data);
  const interesses = `Marie-Charlotte, Anne-Claire, Lily-Rose, Abby-Gaëlle SLAOUI
Date de naissance: 1er septembre 1983
Lieu de naissance: Brest (Finistère)
et
Pierre-Olivier, Félix-Antoine, François-Xavier LE ROUX
Date de naissance: 24 décembre 1987
Lieu de naissance: Châteauneuf-du-Faou (Finistère, Bretagne)
Mariés à Nanning - Zhuang du Guangxi (Chine, Pays du Soleil Levant) le 12 juin 2020`;
  expect(elementsJasper.anneeInscription).toBe("2020");
  expect(elementsJasper.numeroInscription).toBe("2");
  expect(elementsJasper.decisionRecue1).toBe(
    "Le service central d'état civil a reçu le jugement du Tribunal judiciaire de Nantes (Loire-Atlantique), en date du 26 novembre 2020"
  );
  expect(elementsJasper.decisionRecue2).toBe("concernant : ");
  expect(elementsJasper.interesseDecision).toBe(interesses);
  expect(elementsJasper.regime).toBeUndefined();
  expect(elementsJasper.renouvellementModification).toBe(
    "prononçant le renouvellement de la mesure de curatelle simple RC n° 2020 - 3"
  );
  expect(elementsJasper.decisionExequatur).toBeUndefined();
  expect(elementsJasper.duree).toBe("pour une durée de 1 mois");
  expect(elementsJasper.paragrapheFin).toBe(
    "Conformément à l'Article 4 du décret 65-422 du 1er juin 1965, une inscription a été prise au répertoire civil le 22 novembre 2020 sous la référence : RC n°2020 - 2."
  );
});

test("Attendu: specificationRC.getElementsJasper avec une Juridiction et une décision de type 'Jugement' et un type d'inscription 'Modification'", async () => {
  const data = {
    ...FicheRcRenouvellementTypeJugement
  };
  data.typeInscription = TypeInscriptionRc.MODIFICATION;
  const elementsJasper = specificationRC.getElementsJasper(data);
  const interesses = `Marie-Charlotte, Anne-Claire, Lily-Rose, Abby-Gaëlle SLAOUI
Date de naissance: 1er septembre 1983
Lieu de naissance: Brest (Finistère)
et
Pierre-Olivier, Félix-Antoine, François-Xavier LE ROUX
Date de naissance: 24 décembre 1987
Lieu de naissance: Châteauneuf-du-Faou (Finistère, Bretagne)
Mariés à Nanning - Zhuang du Guangxi (Chine, Pays du Soleil Levant) le 12 juin 2020`;
  expect(elementsJasper.anneeInscription).toBe("2020");
  expect(elementsJasper.numeroInscription).toBe("2");
  expect(elementsJasper.decisionRecue1).toBe(
    "Le service central d'état civil a reçu le jugement du Tribunal judiciaire de Nantes (Loire-Atlantique), en date du 26 novembre 2020"
  );
  expect(elementsJasper.decisionRecue2).toBe("concernant : ");
  expect(elementsJasper.interesseDecision).toBe(interesses);
  expect(elementsJasper.regime).toBeUndefined();
  expect(elementsJasper.renouvellementModification).toBe(
    "prononçant la modification de la mesure de curatelle simple RC n° 2020 - 3 en tutelle aux biens et à la personne"
  );
  expect(elementsJasper.decisionExequatur).toBeUndefined();
  expect(elementsJasper.duree).toBe("pour une durée de 1 mois");
  expect(elementsJasper.paragrapheFin).toBe(
    "Conformément à l'Article 4 du décret 65-422 du 1er juin 1965, une inscription a été prise au répertoire civil le 22 novembre 2020 sous la référence : RC n°2020 - 2."
  );
});

test("Attendu: specificationRC.getElementsJasper avec une Juridiction et une décision de type 'Ordonnance'", async () => {
  const data = FicheRcRenouvellementTypeOrdonnance;
  const elementsJasper = specificationRC.getElementsJasper(data);
  const interesses = `Pierre-Olivier, Félix-Antoine, François-Xavier LE ROUX
Date de naissance: 24 décembre 1987
Lieu de naissance: Châteauneuf-du-Faou (Finistère, Bretagne)
et
Marie-Charlotte, Anne-Claire, Lily-Rose, Abby-Gaëlle SLAOUI
Date de naissance: 1er septembre 1983
Lieu de naissance: Brest (Finistère)
Mariés à Nanning - Zhuang du Guangxi (Chine, Pays du Soleil Levant) le 12 juin 2020`;
  expect(elementsJasper.anneeInscription).toBe("2020");
  expect(elementsJasper.numeroInscription).toBe("2");
  expect(elementsJasper.decisionRecue1).toBe(
    "Le service central d'état civil a reçu l'ordonnance du Tribunal judiciaire de Paris arr.18, en date du 26 novembre 2020"
  );
  expect(elementsJasper.decisionRecue2).toBe("concernant le placement de : ");
  expect(elementsJasper.interesseDecision).toBe(interesses);
  expect(elementsJasper.regime).toBe(
    "sous le régime de tutelle aux biens et à la personne"
  );
  expect(elementsJasper.renouvellementModification).toBeUndefined();
  expect(elementsJasper.decisionExequatur).toBeUndefined();
  expect(elementsJasper.duree).toBe("pour une durée de 1 mois");
  expect(elementsJasper.paragrapheFin).toBe(
    "Conformément à l'Article 4 du décret 65-422 du 1er juin 1965, une inscription a été prise au répertoire civil le 22 novembre 2020 sous la référence : RC n°2020 - 2."
  );
});

afterAll(() => {
  superagentMock.unset();
});
