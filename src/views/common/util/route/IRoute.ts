import { Droit } from "@model/agent/enum/Droit";
import { Perimetre } from "@model/agent/enum/Perimetre";

export interface IDroitPerimetre {
  droit: Droit;
  perimetres: Perimetre[];
}
export interface IRoute {
  component?: any;
  url: string;
  props?: Object;
  render?: (props: any) => React.ReactNode;
  droits?: Droit[];
  auMoinsUnDesDroits?: Droit[];
  uniquementLesdroits?: Droit[];
  canAccess?: () => boolean;
  libelle: string;
  droitPerimetres?: IDroitPerimetre;
}
