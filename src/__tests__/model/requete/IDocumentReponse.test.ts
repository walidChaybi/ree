import {
  documentReponseCARN_CSPAC_01,
  documentReponseCertificatRCA,
  documentReponseCopieIntegrale,
  documentReponseCopieNonSignee,
  documentReponseCourrier117,
  documentReponseExtraitAvecFiliation
} from "@mock/data/DocumentReponse";
import { DOCUMENT_DELIVRANCE } from "@mock/data/NomenclatureDocumentDelivrance";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { documentDejaCree, DocumentReponse, IDocumentReponse } from "@model/requete/IDocumentReponse";
import { describe, expect, test } from "vitest";

describe("DocumentReponse", () => {
  beforeEach(() => {
    DocumentDelivrance.init(DOCUMENT_DELIVRANCE);
  });

  test("estExtraitCopie retourne true si  c'est un extrait", () => {
    expect(DocumentReponse.estExtraitCopie(documentReponseExtraitAvecFiliation)).toBe(true);
  });

  test("estExtraitCopie retourne false si le code du document n'appartient pas à l'une des valeurs de CodesExtraitCopie", () => {
    expect(DocumentReponse.estExtraitCopie(documentReponseCARN_CSPAC_01)).toBe(false);
  });

  test("triDocumentsDelivrance trie les documents correctement", () => {
    const documents: IDocumentReponse[] = [
      { ...documentReponseCertificatRCA },
      { ...documentReponseCourrier117 },
      { ...documentReponseCARN_CSPAC_01 }
    ];

    const documentsTries = DocumentReponse.triDocumentsDelivrance(documents);

    expect(documentsTries).toHaveLength(3);

    expect(documentsTries[0].id).toBe("ccac2335-562c-4b14-96aa-4386814c02b3");
    expect(documentsTries[1].id).toBe("c4f4c8fb-562c-4b14-96aa-4386814c05d8");
    expect(documentsTries[2].id).toBe("bbac2335-562c-4b14-96aa-4386814c02a2");
  });

  test("getLibelle retourne 'Courrier'", () => {
    const libelle = DocumentReponse.getLibelle(documentReponseCourrier117);
    expect(libelle).toBe("Courrier");
  });

  test("getLibelle retourne 'Copie intégrale archive'", () => {
    const libelle = DocumentReponse.getLibelle(documentReponseCopieNonSignee);
    expect(libelle).toBe("Copie intégrale archive");
  });

  describe("documentDejaCree", () => {
    test("Doit retourner true si un document existe déjà", () => {
      const documents: IDocumentReponse[] = [documentReponseCopieIntegrale];
      const result = documentDejaCree(documents, ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE);

      expect(result).toBe(true);
    });
    test("retourne false si aucun document correspondant n'existe", () => {
      const documents: IDocumentReponse[] = [documentReponseCopieIntegrale];
      const result = documentDejaCree(documents, ChoixDelivrance.REP_SANS_DEL_EC_DIVERS);

      expect(result).toBe(false);
    });
  });
});
