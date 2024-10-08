import { IService } from "@model/agent/IService";
import { ZERO } from "@util/Utils";
import IAdresseServiceDto from "./IAdresseServiceDto";
import IHierarchieServiceDto from "./IHierarchieServiceDto";
import IMemoCourrierDto from "./IMemoCourrierDto";
import IUtilisateurDto from "./IUtilisateurDto";

interface IServiceDto {
  idService?: string;
  type?: string;
  code?: string;
  libelleService?: string;
  siteInternet?: string;
  hierarchieService?: IHierarchieServiceDto[];
  utilisateur?: IUtilisateurDto[];
  memoCourrier?: IMemoCourrierDto;
  adresseService?: IAdresseServiceDto;
  estDansScec?: boolean;
}

export const ServiceDto = {
  estDejaPresent: (serviceDto: IServiceDto, services: IService[]) =>
    serviceDto.idService
      ? services.findIndex(
          service => service.idService === serviceDto.idService
        ) >= ZERO
      : false
};

export default IServiceDto;
