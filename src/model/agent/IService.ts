import { Option } from "@util/Type";
import { storeRece } from "../../views/common/util/storeRece";
import { TypeService } from "./enum/TypeService";

const CODE_SERVICE_ETABLISSEMENT = "Etablissement";

export interface IHierarchieService {
  service?: IService;
  serviceParent: IService;
}

export interface IService {
  idService: string;
  type: TypeService;
  code: string;
  libelleService: string;
  hierarchieService?: IHierarchieService[];
  utilisateur?: any;
  estDansSCEC?: boolean;
}

export const Service = {
  getService(codeService: string) {
    return storeRece.listeServices.find(
      service => service.code === codeService
    );
  },
  getServiceEtablissement() {
    return this.getService(CODE_SERVICE_ETABLISSEMENT);
  },
  mapCommeOptions(services?: IService[]): Option[] {
    return services
      ? services.map(service => ({
          libelle: service.libelleService,
          cle: service.idService
        }))
      : [];
  }
};

export function getServiceParId(idService: string): IService | undefined {
  return storeRece.listeServices.find(
    service => service.idService === idService
  );
}
