import { IDroit } from "../../model/Habilitation";
import { INomenclatureAgentApi } from "../../model/INomenclatureAgentApi";
import { IPerimetre } from "../../model/IPerimetre";

export const MockMappedHabilitation = {
  habilitations: [
    {
      idHabilitation: "idHabilitation",
      profil: {
        idProfil: "idProfil",
        nom: {
          idNomenclature: "string",
          categorie: "string",
          code: "string",
          libelle: "string",
          estActif: true
        } as INomenclatureAgentApi,
        droits: [
          {
            idDroit: "idDroit",
            nom: "CONSULTER"
          } as IDroit,
          {
            idDroit: "idDroit",
            nom: "ATTRIBUER"
          } as IDroit,
          {
            idDroit: "idDroit",
            nom: "DELIVRER"
          } as IDroit
        ]
      },
      perimetre: {
        idPerimetre: "idPerimetre",
        description: "descPérimètre",
        estActif: true,
        listePays: ["paysPérimètre"],
        nom: "MEAE",
        listeIdTypeRegistre: ["idlisteIdTypeRegistre"]
      } as IPerimetre
    }
  ]
};
