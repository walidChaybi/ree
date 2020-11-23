import { IDocumentDelivre } from "../../../../views/common/types/RequeteType";
import { extraitALireParDefault } from "../../../../views/pages/apercuRequete/contenu/document/DocumentsRequete";

test("Vérification ordre de sélection des documents par défaut visible si copie intégrale", () => {
  let documentsDelivres: IDocumentDelivre[] = [
    {
      idDocumentDelivre: "1",
      nom: "AtestationPACS",
      mimeType: "type",
      typeDocument: "ATTESTATION_PACS",
      taille: 8922,
      identifiantSwift: "15451",
      reponse: undefined,
      conteneurSwift: "",
      contenu: ""
    },
    {
      idDocumentDelivre: "2",
      nom: "copie intégrale",
      mimeType: "type",
      typeDocument: "COPIE_INTEGRALE",
      taille: 8922,
      identifiantSwift: "15451",
      reponse: undefined,
      conteneurSwift: "",
      contenu: ""
    },
    {
      idDocumentDelivre: "3",
      nom: "certificat 1",
      mimeType: "type",
      typeDocument: "CERTIFICAT_SITUATION_RC",
      taille: 8922,
      identifiantSwift: "15451",
      reponse: undefined,
      conteneurSwift: "",
      contenu: ""
    },
    {
      idDocumentDelivre: "4",
      nom: "certificat 2",
      mimeType: "type",
      typeDocument: "FA116",
      taille: 8922,
      identifiantSwift: "15451",
      reponse: undefined,
      conteneurSwift: "",
      contenu: ""
    },
    {
      idDocumentDelivre: "5",
      nom: "certificat 2",
      mimeType: "type",
      typeDocument: "EXTRAIT_AVEC_FILIATION",
      taille: 8922,
      identifiantSwift: "15451",
      reponse: undefined,
      conteneurSwift: "",
      contenu: ""
    },
    {
      idDocumentDelivre: "6",
      nom: "certificat 2",
      mimeType: "type",
      typeDocument: "CERTIFICAT_SITUATION_RCA",
      taille: 8922,
      identifiantSwift: "15451",
      reponse: undefined,
      conteneurSwift: "",
      contenu: ""
    }
  ];
  let documentParDefaut = extraitALireParDefault(documentsDelivres);
  expect(documentParDefaut).toBeTruthy();
  expect(documentParDefaut?.nom).toBe("Copie intégrale");
});

test("Vérification ordre de sélection des documents par défaut visible si extrait sans copie intégrale", () => {
  let documentsDelivres: IDocumentDelivre[] = [
    {
      idDocumentDelivre: "1",
      nom: "AtestationPACS",
      mimeType: "type",
      typeDocument: "ATTESTATION_PACS",
      taille: 8922,
      identifiantSwift: "15451",
      reponse: undefined,
      conteneurSwift: "",
      contenu: ""
    },
    {
      idDocumentDelivre: "3",
      nom: "certificat 1",
      mimeType: "type",
      typeDocument: "CERTIFICAT_SITUATION_RC",
      taille: 8922,
      identifiantSwift: "15451",
      reponse: undefined,
      conteneurSwift: "",
      contenu: ""
    },
    {
      idDocumentDelivre: "4",
      nom: "certificat 2",
      mimeType: "type",
      typeDocument: "FA116",
      taille: 8922,
      identifiantSwift: "15451",
      reponse: undefined,
      conteneurSwift: "",
      contenu: ""
    },
    {
      idDocumentDelivre: "5",
      nom: "certificat 2",
      mimeType: "type",
      typeDocument: "EXTRAIT_AVEC_FILIATION",
      taille: 8922,
      identifiantSwift: "15451",
      reponse: undefined,
      conteneurSwift: "",
      contenu: ""
    },
    {
      idDocumentDelivre: "6",
      nom: "certificat 2",
      mimeType: "type",
      typeDocument: "CERTIFICAT_SITUATION_RCA",
      taille: 8922,
      identifiantSwift: "15451",
      reponse: undefined,
      conteneurSwift: "",
      contenu: ""
    }
  ];
  let documentParDefaut = extraitALireParDefault(documentsDelivres);
  expect(documentParDefaut).toBeTruthy();
  expect(documentParDefaut?.nom).toBe("Extrait avec filiation");
});

test("Vérification ordre de sélection des documents par défaut visible si extrait sans copie intégrale, sans extrait", () => {
  let documentsDelivres: IDocumentDelivre[] = [
    {
      idDocumentDelivre: "1",
      nom: "AtestationPACS",
      mimeType: "type",
      typeDocument: "ATTESTATION_PACS",
      taille: 8922,
      identifiantSwift: "15451",
      reponse: undefined,
      conteneurSwift: "",
      contenu: ""
    },
    {
      idDocumentDelivre: "3",
      nom: "certificat 1",
      mimeType: "type",
      typeDocument: "CERTIFICAT_SITUATION_RC",
      taille: 8922,
      identifiantSwift: "15451",
      reponse: undefined,
      conteneurSwift: "",
      contenu: ""
    },
    {
      idDocumentDelivre: "4",
      nom: "certificat 2",
      mimeType: "type",
      typeDocument: "FA116",
      taille: 8922,
      identifiantSwift: "15451",
      reponse: undefined,
      conteneurSwift: "",
      contenu: ""
    },
    {
      idDocumentDelivre: "6",
      nom: "certificat 2",
      mimeType: "type",
      typeDocument: "CERTIFICAT_SITUATION_RCA",
      taille: 8922,
      identifiantSwift: "15451",
      reponse: undefined,
      conteneurSwift: "",
      contenu: ""
    }
  ];
  let documentParDefaut = extraitALireParDefault(documentsDelivres);
  expect(documentParDefaut).toBeTruthy();
  expect(documentParDefaut?.nom).toBe("Certificat de situation au RC");
});

test("Vérification ordre de sélection des documents par défaut visible si extrait sans copie intégrale, sans extrait, sans certificat", () => {
  let documentsDelivres: IDocumentDelivre[] = [
    {
      idDocumentDelivre: "1",
      nom: "AtestationPACS",
      mimeType: "type",
      typeDocument: "ATTESTATION_PACS",
      taille: 8922,
      identifiantSwift: "15451",
      reponse: undefined,
      conteneurSwift: "",
      contenu: ""
    },
    {
      idDocumentDelivre: "4",
      nom: "certificat 2",
      mimeType: "type",
      typeDocument: "FA116",
      taille: 8922,
      identifiantSwift: "15451",
      reponse: undefined,
      conteneurSwift: "",
      contenu: ""
    }
  ];
  let documentParDefaut = extraitALireParDefault(documentsDelivres);
  expect(documentParDefaut).toBeTruthy();
  expect(documentParDefaut?.nom).toBe("Attestation de PACS");
});

test("Vérification ordre de sélection des documents par défaut visible si extrait sans copie intégrale, sans extrait, sans certificat, sans attestation", () => {
  let documentsDelivres: IDocumentDelivre[] = [
    {
      idDocumentDelivre: "4",
      nom: "certificat 2",
      mimeType: "type",
      typeDocument: "FA116",
      taille: 8922,
      identifiantSwift: "15451",
      reponse: undefined,
      conteneurSwift: "",
      contenu: ""
    }
  ];
  let documentParDefaut = extraitALireParDefault(documentsDelivres);
  expect(documentParDefaut).toBeTruthy();
  expect(documentParDefaut?.nom).toBe("Formulaire FA116");
});
