import { RouteComponentProps } from "react-router";
import { Droit } from "../../../../model/Droit";

export interface IRoute {
  component?: any;
  url: string;
  props?: Object;
  render?: (props: RouteComponentProps<any>) => React.ReactNode;
  droits?: Droit[];
  uniquementLesdroits?: Droit[];
  canAccess?: boolean;
  libelle: string;
}
