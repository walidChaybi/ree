import { pacsModificationNotaireMap } from "@mock/data/fichePACS";
import { CertificatPACSComposition } from "@model/composition/pacs/ICertificatPACSComposition";
import { DocumentDecret, IDecret } from "@model/etatcivil/commun/IDecret";
import { ETypeRcRcaPacs } from "@model/etatcivil/enum/ETypeRcRcaPacs";
import { FichePacs } from "@model/etatcivil/pacs/FichePacs";
import { Qualite } from "@model/requete/enum/Qualite";
import { TypeCanal } from "@model/requete/enum/TypeCanal";
import { IRequerant } from "@model/requete/IRequerant";
import { describe, expect, test } from "vitest";

describe("CertificatPACSComposition", () => {
  test("DOIT créer un certificat PACS correctement formaté", () => {
    const decrets: IDecret[] = [
      { id: "1", document: DocumentDecret.ATTESTATION_PACS, ordre: 1, libelle: "decret 01", principal: true, type: ETypeRcRcaPacs.PACS }
    ];
    const fichePacs = FichePacs.depuisDto(pacsModificationNotaireMap) as FichePacs;
    const canal = TypeCanal.INTERNET;

    const requerant = {
      id: "123",
      nomFamille: "nomFamille",
      prenom: "prenom",
      adresse: {
        ligne2: "l2",
        ligne3: "l3",
        ligne4: "l4",
        ligne5: "l5",
        ville: "ville",
        codePostal: "123456",
        pays: "pays"
      },
      qualiteRequerant: {
        qualite: Qualite.PARTICULIER
      }
    } as IRequerant;

    const numeroRequete = "REQ12345";

    const certificat = CertificatPACSComposition.creerCertificatPACS(decrets, fichePacs, canal, requerant, numeroRequete);

    expect(certificat.numero_fiche_pac).toBe("2018 - 123456");
    expect(certificat.decrets).toEqual([{ decret: "decret 01" }]);
    expect(certificat.decret_fin).toBe("decret 01");
    expect(certificat.paragraphe_enregistrement).toBeDefined();
    expect(certificat.nom_partenaire_1).toBe("DUREL");
    expect(certificat.prenoms_partenaire_1).toBe("Marie Charlotte, Sara");
  });
});
