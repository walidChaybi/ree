import { mappingInscriptionsRC } from "@hook/acte/InscriptionsRcHook";
import { SpecificationRC } from "@hook/generation/generationInscriptionsHook/specificationInscriptions/specificationRC";
import { NatureRc } from "@model/etatcivil/enum/NatureRc";
import { TypeInscriptionRc } from "@model/etatcivil/enum/TypeInscriptionRc";
import { describe, expect, test } from "vitest";
import { decrets } from "../../../../../../mock/data/NomenclatureEtatCivilDecrets";
import { NATURE_RC } from "../../../../../../mock/data/NomenclatureNatureRc";
import {
  FicheRcDecisionNotaire,
  FicheRcDecisionNotaireTypeRequete,
  FicheRcDecisionNotaireTypeRequete2,
  FicheRcRadiation,
  FicheRcRenouvellementTypeJugement,
  FicheRcRenouvellementTypeOrdonnance
} from "../../../../../../mock/data/ficheRC";

describe("Test specificationRC", () => {
  NatureRc.init(NATURE_RC);

  test("Attendu: specificationRC.getElementsJasper avec une décision Notaire autre que Requete", () => {
    const data = FicheRcDecisionNotaire;
    const elementsJasper = SpecificationRC.getElementsJasper(data, decrets);
    const interesse = `Mathieu SLAOUI
Date de naissance: 1er septembre 1983
Lieu de naissance: paris 20ème arrondissement`;
    expect(elementsJasper.anneeInscription).toBe("2020");
    expect(elementsJasper.numeroInscription).toBe("11");
    expect(elementsJasper.decisionRecue1).toBe(
      "Le Service central d'état civil a reçu un acte établi par Maître Jean DUPONT, notaire à paris 18ème arrondissement, office notarial n°1234567, le 26 novembre 2020"
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

  test("Attendu: specificationRC.getElementsJasper avec une décision Notaire de type Requete", () => {
    const data = FicheRcDecisionNotaireTypeRequete;
    const elementsJasper = SpecificationRC.getElementsJasper(data, decrets);
    const interesse = `Mathieu SLAOUI
Date de naissance: 1er septembre 1983
Lieu de naissance: paris 20ème arrondissement`;
    expect(elementsJasper.anneeInscription).toBe("2020");
    expect(elementsJasper.numeroInscription).toBe("11");
    expect(elementsJasper.decisionRecue1).toBe(
      "Le Service central d'état civil a reçu un extrait de la requête présentée auprès du Tribunal judiciaire de paris 20ème arrondissement afin d'obtenir homologation de l'acte reçu par Maître Jean DUPONT, notaire à paris 18ème arrondissement, office notarial n°1234567, le 26 novembre 2020"
    );
    expect(elementsJasper.decisionRecue2).toBe("concernant le transfert des pouvoirs de : ");
    expect(elementsJasper.interesseDecision).toBe(interesse);
    expect(elementsJasper.regime).toBeUndefined();
    expect(elementsJasper.renouvellementModification).toBeUndefined();
    expect(elementsJasper.decisionExequatur).toBeUndefined();
    expect(elementsJasper.duree).toBe("pour une durée de 1 année");
    expect(elementsJasper.paragrapheFin).toBe(
      "Conformément à l'Article 4 du décret 65-422 du 1er juin 1965, une inscription a été prise au répertoire civil le 18 novembre 2020 sous la référence : RC n°2020 - 11."
    );
  });

  test("Attendu: specificationRC.getElementsJasper avec une décision Notaire de type Requete 2", () => {
    const data = FicheRcDecisionNotaireTypeRequete2;
    const elementsJasper = SpecificationRC.getElementsJasper(data, decrets);
    const interesse = `Mathieu SLAOUI
Date de naissance: 1er septembre 1983
Lieu de naissance: paris 20ème arrondissement`;
    expect(elementsJasper.anneeInscription).toBe("2020");
    expect(elementsJasper.numeroInscription).toBe("11");
    expect(elementsJasper.decisionRecue1).toBe(
      "Le Service central d'état civil a reçu un extrait de la requête présentée auprès du Tribunal judiciaire de paris 20ème arrondissement afin d'obtenir homologation de l'acte reçu par Maître Jean DUPONT, notaire à paris 18ème arrondissement, office notarial n°1234567, le 26 novembre 2020"
    );
    expect(elementsJasper.decisionRecue2).toBe("concernant l'habilitation familiale générale de : ");
    expect(elementsJasper.interesseDecision).toBe(interesse);
    expect(elementsJasper.regime).toBeUndefined();
    expect(elementsJasper.renouvellementModification).toBeUndefined();
    expect(elementsJasper.decisionExequatur).toBeUndefined();
    expect(elementsJasper.duree).toBe("pour une durée de 1 année");
    expect(elementsJasper.paragrapheFin).toBe(
      "Conformément à l'Article 4 du décret 65-422 du 1er juin 1965, une inscription a été prise au répertoire civil le 18 novembre 2020 sous la référence : RC n°2020 - 11."
    );
  });

  test("Attendu: specificationRC.getElementsJasper avec une Juridiction et une décision de type 'Jugement'", () => {
    const data = FicheRcRenouvellementTypeJugement;

    const elementsJasper = SpecificationRC.getElementsJasper(data, decrets);
    const interesses = `Marie-Charlotte, Anne-Claire, Lily-Rose, Abby-Gaëlle SLAOUI
Date de naissance: 1er septembre 1983
Lieu de naissance: Brest (Finistère)

et

Pierre-Olivier, Félix-Antoine, François-Xavier LE ROUX
Date de naissance: 24 décembre 1987
Lieu de naissance: Châteauneuf-du-Faou (Finistère, Bretagne)

mariés à Nanning, zhuang du Guangxi (Chine, Pays du soleil levant) le 12 juin 2020`;
    expect(elementsJasper.anneeInscription).toBe("2020");
    expect(elementsJasper.numeroInscription).toBe("2");
    expect(elementsJasper.decisionRecue1).toBe(
      "Le Service central d'état civil a reçu le jugement du Tribunal judiciaire de nantes (Loire-Atlantique), en date du 26 novembre 2020"
    );
    expect(elementsJasper.decisionRecue2).toBe("concernant : ");
    expect(elementsJasper.interesseDecision).toBe(interesses);
    expect(elementsJasper.regime).toBeUndefined();
    expect(elementsJasper.renouvellementModification).toBe("prononçant le renouvellement de la mesure de curatelle simple RC n° 2020 - 3");
    expect(elementsJasper.decisionExequatur).toBeUndefined();
    expect(elementsJasper.duree).toBe("pour une durée de 1 mois");
    expect(elementsJasper.paragrapheFin).toBe(
      "Conformément à l'Article 4 du décret 65-422 du 1er juin 1965, une inscription a été prise au répertoire civil le 22 novembre 2020 sous la référence : RC n°2020 - 2."
    );
  });

  test("Attendu: specificationRC.getElementsJasper avec une Juridiction et une décision de type 'Jugement' et un type d'inscription 'Modification'", () => {
    const data = {
      ...FicheRcRenouvellementTypeJugement
    };
    data.typeInscription = TypeInscriptionRc.MODIFICATION;

    const elementsJasper = SpecificationRC.getElementsJasper(data, decrets, mappingInscriptionsRC(FicheRcRadiation)[0]);

    const interesses = `Marie-Charlotte, Anne-Claire, Lily-Rose, Abby-Gaëlle SLAOUI
Date de naissance: 1er septembre 1983
Lieu de naissance: Brest (Finistère)

et

Pierre-Olivier, Félix-Antoine, François-Xavier LE ROUX
Date de naissance: 24 décembre 1987
Lieu de naissance: Châteauneuf-du-Faou (Finistère, Bretagne)

mariés à Nanning, zhuang du Guangxi (Chine, Pays du soleil levant) le 12 juin 2020`;
    expect(elementsJasper.anneeInscription).toBe("2020");
    expect(elementsJasper.numeroInscription).toBe("2");
    expect(elementsJasper.decisionRecue1).toBe(
      "Le Service central d'état civil a reçu le jugement du Tribunal judiciaire de nantes (Loire-Atlantique), en date du 26 novembre 2020"
    );
    expect(elementsJasper.decisionRecue2).toBe("concernant : ");
    expect(elementsJasper.interesseDecision).toBe(interesses);
    expect(elementsJasper.regime).toBeUndefined();
    expect(elementsJasper.renouvellementModification).toBe(
      "prononçant la modification de la mesure de tutelle aménagée en tutelle aux biens et à la personne"
    );
    expect(elementsJasper.decisionExequatur).toBeUndefined();
    expect(elementsJasper.duree).toBe("pour une durée de 1 mois");
    expect(elementsJasper.paragrapheFin).toBe(
      "Conformément à l'Article 4 du décret 65-422 du 1er juin 1965, une inscription a été prise au répertoire civil le 22 novembre 2020 sous la référence : RC n°2020 - 2."
    );
  });

  test("Attendu: specificationRC.getElementsJasper avec une Juridiction et une décision de type 'Ordonnance'", () => {
    const data = FicheRcRenouvellementTypeOrdonnance;
    const elementsJasper = SpecificationRC.getElementsJasper(data, decrets);
    const interesses = `Pierre-Olivier, Félix-Antoine, François-Xavier LE ROUX
Date de naissance: 24 décembre 1987
Lieu de naissance: Châteauneuf-du-Faou (Finistère, Bretagne)

et

Marie-Charlotte, Anne-Claire, Lily-Rose, Abby-Gaëlle SLAOUI
Date de naissance: 1er septembre 1983
Lieu de naissance: Brest (Finistère)

mariés à Nanning, zhuang du Guangxi (Chine, Pays du soleil levant) le 12 juin 2020`;
    expect(elementsJasper.anneeInscription).toBe("2020");
    expect(elementsJasper.numeroInscription).toBe("2");
    expect(elementsJasper.decisionRecue1).toBe(
      "Le Service central d'état civil a reçu l'ordonnance du Tribunal judiciaire de paris 18ème arrondissement, en date du 26 novembre 2020"
    );
    expect(elementsJasper.decisionRecue2).toBe("concernant le placement de : ");
    expect(elementsJasper.interesseDecision).toBe(interesses);
    expect(elementsJasper.regime).toBe("sous le régime de tutelle aux biens et à la personne");
    expect(elementsJasper.renouvellementModification).toBeUndefined();
    expect(elementsJasper.decisionExequatur).toBeUndefined();
    expect(elementsJasper.duree).toBe("pour une durée de 1 mois");
    expect(elementsJasper.paragrapheFin).toBe(
      "Conformément à l'Article 4 du décret 65-422 du 1er juin 1965, une inscription a été prise au répertoire civil le 22 novembre 2020 sous la référence : RC n°2020 - 2."
    );
  });
});
