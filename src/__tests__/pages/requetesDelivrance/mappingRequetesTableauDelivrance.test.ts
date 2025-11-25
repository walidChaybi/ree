import { requeteDelivranceApresMapping, requeteDelivranceRDC } from "@mock/data/requeteDelivrance";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { ETypeService } from "@model/agent/enum/ETypeService";
import { IService } from "@model/agent/IService";
import { mappingRequetesTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { describe, expect, test } from "vitest";

describe("mappingRequetesTableauDelivrance", () => {
  test("doit retourner un tableau transformé avec les bons attributs", () => {
    const services: IService[] = [
      {
        idService: "8883f9e3-88e2-4a11-8dfc-71eb15f85a72",
        type: ETypeService.BUREAU,
        code: "section ABIDJAN 1",
        libelleService: "Section Consulaire 1 de ABIDJAN",
        hierarchieService: undefined,

        estDansScec: false
      }
    ];
    const UTILISATEUR = MockUtilisateurBuilder.utilisateurConnecte().generer();

    let result = mappingRequetesTableauDelivrance([], false, [UTILISATEUR], services);

    expect(result).toEqual([]);

    result = mappingRequetesTableauDelivrance([requeteDelivranceRDC], false, [UTILISATEUR], services);
    expect(result).toEqual(requeteDelivranceApresMapping);
  });
});
