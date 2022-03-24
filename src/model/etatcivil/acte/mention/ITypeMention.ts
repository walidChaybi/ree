import { NatureActe } from "../../enum/NatureActe";
import { NatureMention } from "../../enum/NatureMention";

export interface ITypeMention {
  codeType: string;

  libelleType: string;

  codeSousType: string;

  libelleSousType: string;

  estActif: boolean;

  modeInformatisation: string;

  nature: NatureMention;

  sousTypeParDefaut?: boolean;

  natureActe?: NatureActe;
}
