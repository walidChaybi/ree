import { ETypeLienRequerant } from "./enum/ETypeLienRequerant";

export interface ILienRequerant {
  id: string;
  lien: keyof typeof ETypeLienRequerant;
  natureLien?: string;
}
