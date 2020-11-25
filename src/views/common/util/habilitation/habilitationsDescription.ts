import { Droit } from "../../../../model/Droit";

export interface IHabiliationDescription {
  nomComposant: string;
  droits: Droit[];
  comportementSiNonAutorise: Object;
  comportementSiAutorise?: Object;
  nonvisibleSiNonAutorise?: boolean;
}

export const habilitationsDescription: IHabiliationDescription[] = [
  {
    nomComposant: "LinkTabMesRequetes",
    droits: [Droit.Attribuer],
    comportementSiNonAutorise: { disabled: true }
  }
];
