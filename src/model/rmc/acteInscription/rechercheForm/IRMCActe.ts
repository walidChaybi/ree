import { ENatureActe } from "@model/etatcivil/enum/NatureActe";
import { EFamilleRegistre } from "@model/etatcivil/enum/TypeFamille";
import { IReferenceRECE } from "@model/form/commun/referenceRECE";
import { ETypeReference } from "./ETypeReference";
import { IRMCNumeroActe } from "./IRMCNumeroActe";
import { IRMCRegistreSupport } from "./IRMCRegistreSupport";

export interface IRMCActe {
  natureActe: keyof typeof ENatureActe | "";
  familleRegistre: keyof typeof EFamilleRegistre | "";
  typeReference: keyof typeof ETypeReference | "";
  pocopa: string;
  anneeRegistre: string;
  registreSupport: IRMCRegistreSupport;
  numeroActe: IRMCNumeroActe;
  etActesSuivants: boolean;
  referenceRECE: IReferenceRECE;
}

export interface IRMCActeDto {
  natureActe?: keyof typeof ENatureActe | "";
  referenceRECE?: IReferenceRECE;
  referenceRegistre?: {
    familleRegistre?: keyof typeof EFamilleRegistre | "";
    pocopa?: string;
    numeroActe?: string;
    numeroBisTer?: string;
    anneeRegistre?: string;
    support1?: string;
    support2?: string;
    etActesSuivants?: boolean;
  };
}
