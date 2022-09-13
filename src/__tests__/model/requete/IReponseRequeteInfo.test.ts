import { ComplementObjetRequete } from "@model/requete/enum/ComplementObjetRequete";
import { ObjetRequete } from "@model/requete/enum/ObjetRequete";
import {
  IReponseRequeteInfo,
  ReponseRequeteInfo
} from "@model/requete/IReponseRequeteInfo";
import { NOMENCLATURE_REPONSE } from "../../../mock/data/NomenclatureReponse";

test("Attendu: ReponseRequeteInfo.getLibelleNomenclatureReponseRequeteInfoFromId fonctionne correctement", () => {
  expect(
    ReponseRequeteInfo.getLibelleNomenclatureReponseRequeteInfoFromId(
      {
        reponse: "7c713156-8c88-4d20-8e90-9aa63c903b01"
      } as IReponseRequeteInfo,
      NOMENCLATURE_REPONSE
    )
  ).toBe("Problème technique accès Service Public");
});

test("Attendu: ReponseRequeteInfo.getNomenclatureReponseRequetInfoFromObjetEtComplementObjet fonctionne correctement", () => {
  expect(
    ReponseRequeteInfo.getNomenclatureReponseRequetInfoFromObjetEtComplementObjet(
      {
        objet: ObjetRequete.COMPLETION_REQUETE_EN_COURS.nom,
        complementObjet: ComplementObjetRequete.REPONSE_LIBRE_AGENT.nom
      },
      NOMENCLATURE_REPONSE
    )
  ).toBe(NOMENCLATURE_REPONSE[4]);
});
