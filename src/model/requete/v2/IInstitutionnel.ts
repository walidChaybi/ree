import { TypeInstitutionnel } from "./enum/TypeInstitutionnel";

export interface IInstitutionnel {
  type: TypeInstitutionnel;
  nomInstitution?: string;
  nature?: string;
}
