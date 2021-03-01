import { NatureActe } from "../../etatcivil/enum/NatureActe";
import { CodeFamilleRegistre } from "../../etatcivil/enum/CodeFamilleRegistre";

export interface IRMCRegistre {
  natureActe?: string;
  familleRegistre?: string;
  pocopa?: string;
  numeroActe?: string;
}
