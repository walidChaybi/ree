import { specificationRCA } from "@hook/generation/generationInscriptionsHook/specificationInscriptions/specificationRCA";
import { NATURE_RCA } from "@mock/data/NomenclatureNatureRca";
import {
  ficheRcaDecisionAvecInstructionProcureur,
  ficheRcaDecisionJuridictionEtrangere,
  ficheRcaDecisionNotaireConvention
} from "@mock/data/ficheRCA";
import { DocumentDecret, IDecret } from "@model/etatcivil/commun/IDecret";
import { ETypePacsRcRca } from "@model/etatcivil/enum/ETypePacsRcRca";
import { NatureRca } from "@model/etatcivil/enum/NatureRca";
import { FicheRcRca } from "@model/etatcivil/rcrca/FicheRcRca";
import { describe, expect, test } from "vitest";

describe("Test specificationRCA", () => {
  const decret = [
    {
      libelle: "Article 4-1 du décret 65-422 du 1er juin 1965",
      id: "",
      document: DocumentDecret.CERTIFICAT_INSCRIPTION_RCA,
      ordre: 1,
      principal: true,
      type: ETypePacsRcRca.RCA
    } as IDecret
  ];

  NatureRca.init(NATURE_RCA);

  test("Attendu: specificationRCA.getElementsJasper AVEC une instruction procureur", () => {
    const ficheRcRca = FicheRcRca.RcaDepuisDto(ficheRcaDecisionAvecInstructionProcureur) as FicheRcRca;
    const elementsJasper = specificationRCA.getElementsJasper(ficheRcRca, decret);
    const interesse = `Léo, Jules FLECK
Date de naissance: 2 septembre 1983
Lieu de naissance: Lyon 8ème arrondissement (Rhône)
Date de décès: mars 2003
Lieu de décès: Londres, Grand-Londres (Royaume-Uni)`;
    expect(elementsJasper.anneeInscription).toBe("2020");
    expect(elementsJasper.numeroInscription).toBe("4012");
    expect(elementsJasper.decisionRecue).toBe(
      "Le Service central d'état civil a reçu la décision de la Directrice générale de l'Office national des anciens combattants et victimes de guerre en date du 26 novembre 2020 concernant la mention adoption simple prononcée à l'étranger avec jugement d'exequatur attribuée à :"
    );
    expect(elementsJasper.interesseDecision).toBe(interesse);
    expect(elementsJasper.decisionExequatur).toBeUndefined();
    expect(elementsJasper.paragrapheFin).toBe(
      "Conformément à l'Article 4-1 du décret 65-422 du 1er juin 1965, et sur instruction du procureur de la République de Nantes 1er arrondissement (Loire-Atlantique) (N° réf. 56848) du 26 novembre 2020, une inscription a été prise au répertoire civil annexe le 23 février 2020 sous la référence : RCA n°2020 - 4012."
    );
  });

  test("Attendu: specificationRCA.getElementsJasper AVEC une decision Juridiction étrangère", () => {
    const ficheRcRca = FicheRcRca.RcaDepuisDto(ficheRcaDecisionJuridictionEtrangere) as FicheRcRca;
    const elementsJasper = specificationRCA.getElementsJasper(ficheRcRca, decret);
    const interesse = `Léo, Jules FLECK
Date de naissance: 1er septembre 1983
Lieu de naissance: Lyon 8ème arrondissement (Rhône)
par
Lucas, Didier DUPONT
Date de naissance: 1er février 1993
Lieu de naissance: Nantes (Loire-Atlantique)`;
    expect(elementsJasper.anneeInscription).toBe("2020");
    expect(elementsJasper.numeroInscription).toBe("4013");
    expect(elementsJasper.decisionRecue).toBe(
      "Le Service central d'état civil a reçu le jugement du Tribunal judiciaire de Paris 18ème arrondissement, en date du 26 novembre 2020 concernant le changement de régime matrimonial par acte notarié étranger / instruction du Procureur de : "
    );
    expect(elementsJasper.interesseDecision).toBe(interesse);
    expect(elementsJasper.decisionExequatur).toBe("prise en exequatur de la décision étrangère en date du 26 novembre 2020");
    expect(elementsJasper.paragrapheFin).toBe(
      "Conformément à l'Article 4-1 du décret 65-422 du 1er juin 1965, une inscription a été prise au répertoire civil annexe le 23 février 2020 sous la référence : RCA n°2020 - 4013."
    );
  });

  test("Attendu: specificationRCA.getElementsJasper AVEC une decision Notaire type convention", () => {
    const ficheRcRca = FicheRcRca.RcaDepuisDto(ficheRcaDecisionNotaireConvention) as FicheRcRca;
    const elementsJasper = specificationRCA.getElementsJasper(ficheRcRca, decret);
    const interesses = `Julie, Sarah DURANT
Date de naissance: octobre 1960
Lieu de naissance: Brooklyn, New-York (États-unis d'Amériques)

et

Harleen, Charlène QUINZEL
Date de naissance: 1993
Lieu de naissance: Nantes (Loire-Atlantique)

mariés devant les autorités consulaires de Italie en France le 28 juin 2018`;
    expect(elementsJasper.anneeInscription).toBe("1998");
    expect(elementsJasper.numeroInscription).toBe("4094");
    expect(elementsJasper.decisionRecue).toBe(
      "Le Service central d'état civil a reçu la convention déposée au rang des minutes de Maître Flavie Le-Grand, notaire à Nantes (Loire-Atlantique), office notarial n°9AKLO, le 3 juin 2020 concernant la contestation de paternité de : "
    );
    expect(elementsJasper.interesseDecision).toBe(interesses);
    expect(elementsJasper.decisionExequatur).toBeUndefined();
    expect(elementsJasper.paragrapheFin).toBe(
      "Conformément à l'Article 4-1 du décret 65-422 du 1er juin 1965, une inscription a été prise au répertoire civil annexe le 23 novembre 1998 sous la référence : RCA n°1998 - 4094."
    );
  });
});
