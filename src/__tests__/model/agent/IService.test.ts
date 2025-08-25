import { ETypeService } from "@model/agent/enum/ETypeService";
import { Service, ServiceDto } from "@model/agent/IService";
import { describe, expect, test } from "vitest";

const SERVICE_DEFAULT_VALUES = {
  code: "",
  estDansScec: false,
  hierarchieService: [],
  idService: "",
  libelleService: "",
  type: null
};

describe("Test du modèle Service", () => {
  test("Création IService depuis DTO", () => {
    expect(Service.depuisDto({})).toStrictEqual(SERVICE_DEFAULT_VALUES);

    const service = Service.depuisDto({
      idService: "idService",
      code: "ETA",
      libelleService: "test",
      estDansScec: true,
      type: ETypeService.BUREAU
    });

    expect(service).toStrictEqual({
      idService: "idService",
      code: "ETA",
      libelleService: "test",
      estDansScec: true,
      type: ETypeService.BUREAU,
      hierarchieService: []
    });
  });

  test("Méthode Service trouverEtablissement", () => {
    const ETAService = Service.depuisDto({
      idService: "idService",
      code: "ETA",
      libelleService: "test",
      estDansScec: true,
      type: ETypeService.BUREAU
    });

    expect(Service.trouverEtablissement([ETAService])).toStrictEqual(ETAService);

    const autreService = Service.depuisDto({
      idService: "idService",
      code: "Autre",
      libelleService: "test",
      estDansScec: true,
      type: ETypeService.BUREAU
    });

    const services = [ETAService, autreService];

    expect(Service.trouverEtablissement(services)).toStrictEqual(ETAService);
    expect(Service.trouverEtablissement([autreService])).toStrictEqual(undefined);
  });

  test("Méthode Service commeOptions", () => {
    const services = [
      Service.depuisDto({
        idService: "idService1",
        code: "ETA",
        libelleService: "libelle service 1",
        estDansScec: true,
        type: ETypeService.BUREAU
      }),
      Service.depuisDto({
        idService: "idService2",
        code: "ETA",
        libelleService: "libelle service 2",
        estDansScec: false,
        type: ETypeService.MINISTERE
      })
    ];

    expect(Service.commeOptions(services)).toStrictEqual([
      {
        cle: "idService1",
        libelle: "libelle service 1"
      },
      {
        cle: "idService2",
        libelle: "libelle service 2"
      }
    ]);
  });

  test("Méthode Service libelleDepuisId", () => {
    const services = [
      Service.depuisDto({
        idService: "idService1",
        code: "ETA",
        libelleService: "libelle service 1",
        estDansScec: true,
        type: ETypeService.BUREAU
      }),
      Service.depuisDto({
        idService: "idService2",
        code: "ETA",
        libelleService: "libelle service 2",
        estDansScec: false,
        type: ETypeService.MINISTERE
      })
    ];

    expect(Service.libelleDepuisId("idService1", services)).toStrictEqual("libelle service 1");
  });

  test("Méthode ServiceDto estDejaPresent", () => {
    const services = [
      Service.depuisDto({
        idService: "idService1",
        code: "ETA",
        libelleService: "libelle service 1",
        estDansScec: true,
        type: ETypeService.BUREAU
      }),
      Service.depuisDto({
        idService: "idService2",
        code: "ETA",
        libelleService: "libelle service 2",
        estDansScec: false,
        type: ETypeService.MINISTERE
      })
    ];

    const serviceDtoNonPresent = {
      idService: "idService3",
      code: "ETA",
      libelleService: "libelle service 3",
      estDansScec: true,
      type: ETypeService.POSTE
    };

    expect(ServiceDto.estDejaPresent(serviceDtoNonPresent, services)).toStrictEqual(false);

    const serviceDtoPresent = {
      idService: "idService1",
      code: "ETA",
      libelleService: "libelle service 1",
      estDansScec: true,
      type: ETypeService.BUREAU
    };

    expect(ServiceDto.estDejaPresent(serviceDtoPresent, services)).toStrictEqual(true);
  });
});
