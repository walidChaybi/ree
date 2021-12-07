import { TypeLienRequerant } from "./enum/TypeLienRequerant";

export interface ILienRequerant {
  id: string;
  lien: TypeLienRequerant;
  natureLien?: string;
}
