import { Option } from "@util/Type";
import IServiceDto from "../../dto/etatcivil/agent/IServiceDto";
import { IHierarchieService } from "./IHierarchieService";
import { ETypeService, TypeService } from "./enum/ETypeService";

const CODE_SERVICE_ETABLISSEMENT = "Etablissement";

export interface IService {
  idService: string;
  type: ETypeService | null;
  code: string;
  libelleService: string;
  hierarchieService?: IHierarchieService[];
  utilisateur?: any;
  estDansScec?: boolean;
}

export const Service = {
  depuisDto: (serviceDto: IServiceDto): IService => ({
    idService: serviceDto.idService ?? "",
    code: serviceDto.code ?? "",
    libelleService: serviceDto.libelleService ?? "",
    type: TypeService.depuisString(serviceDto.type ?? ""),
    estDansScec: Boolean(serviceDto.estDansScec),
    hierarchieService:
      (serviceDto.hierarchieService as IHierarchieService[] | undefined) ?? [],
    utilisateur: serviceDto.utilisateur
  }),

  trouverEtablissement: (listeServices: IService[]) =>
    listeServices.find(service => service.code === CODE_SERVICE_ETABLISSEMENT),

  commeOptions: (services?: IService[]): Option[] =>
    services?.map(service => ({
      libelle: service.libelleService,
      cle: service.idService
    })) ?? [],

  libelleDepuisId: (idService: string, services: IService[]): string | null =>
    services.find(service => service.idService === idService)?.libelleService ??
    null
} as const;
