import { Option } from "@util/Type";
import { ETypeService, TypeService } from "./enum/ETypeService";
import IAdresseServiceDto from "./IAdresseServiceDto";
import { IHierarchieService } from "./IHierarchieService";
import IHierarchieServiceDto from "./IHierarchieServiceDto";
import IMemoCourrierDto from "./IMemoCourrierDto";

const CODE_SERVICE_ETABLISSEMENT = "ETA";

export interface IService {
  idService: string;
  type: ETypeService | null;
  code: string;
  libelleService: string;
  hierarchieService?: IHierarchieService[];
  estDansScec?: boolean;
}

export interface IServiceDto {
  idService?: string;
  type?: string;
  code?: string;
  libelleService?: string;
  siteInternet?: string;
  hierarchieService?: IHierarchieServiceDto[];
  memoCourrier?: IMemoCourrierDto;
  adresseService?: IAdresseServiceDto;
  estDansScec?: boolean;
}

export const Service = {
  depuisDto: (serviceDto: IServiceDto): IService => ({
    idService: serviceDto.idService ?? "",
    code: serviceDto.code ?? "",
    libelleService: serviceDto.libelleService ?? "",
    type: TypeService.depuisString(serviceDto.type ?? ""),
    estDansScec: Boolean(serviceDto.estDansScec),
    hierarchieService: (serviceDto.hierarchieService as IHierarchieService[] | undefined) ?? []
  }),

  trouverEtablissement: (listeServices: IService[]) => listeServices.find(service => service.code === CODE_SERVICE_ETABLISSEMENT),

  commeOptions: (services?: IService[]): Option[] =>
    services?.map(service => ({
      libelle: service.libelleService,
      cle: service.idService
    })) ?? [],

  libelleDepuisId: (idService: string, services: IService[]): string | null =>
    services.find(service => service.idService === idService)?.libelleService ?? null
} as const;

export const ServiceDto = {
  estDejaPresent: (serviceDto: IServiceDto, services: IService[]): boolean =>
    serviceDto.idService ? services.some(service => service.idService === serviceDto.idService) : false
};
