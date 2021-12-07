import {
  Decret,
  IDecret
} from "../../../../../../model/etatcivil/commun/IDecret";
import { storeRece } from "../../../../util/storeRece";

export interface IElementsJasperCertificatPACS {
  decrets: IDecret[];
}

class SpecificationPACS {
  getElementsJasper(): IElementsJasperCertificatPACS {
    return {
      decrets: Decret.getDecretsAttestationPacs(storeRece.decrets)
    };
  }
}

export const specificationPACS = new SpecificationPACS();
