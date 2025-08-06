import { Option } from "@util/Type";
import { IRMCNumeroActe } from "./IRMCNumeroActe";
import { IRMCRegistreSupport } from "./IRMCRegistreSupport";

export interface IRMCRegistre {
  natureActe?: string;
  familleRegistre?: string;
  pocopa?: Option | string | null;
  anneeRegistre?: string;
  registreSupport?: IRMCRegistreSupport;
  numeroActe?: IRMCNumeroActe;
}
