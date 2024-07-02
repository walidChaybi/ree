import { IDroit } from "@model/agent/Habilitation";
import { INomenclatureAgentApi } from "@model/agent/INomenclatureAgentApi";
import { IPerimetre } from "@model/agent/IPerimetre";

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
          } as IDroit,
          {
            idDroit: "idInformerUsager",
            nom: "INFORMER_USAGER"
          } as IDroit
        ]
      },
      perimetre: {
        idPerimetre: "idPerimetre",
        description: "descPérimètre",
        estActif: true,
        listePays: ["paysPérimètre"],
        nom: "TOUS_REGISTRES",
        listeIdTypeRegistre: ["idlisteIdTypeRegistre"]
      } as IPerimetre
    }
  ]
};
