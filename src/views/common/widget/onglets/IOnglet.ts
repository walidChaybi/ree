import { NomComposant } from "../../util/habilitation/habilitationsDescription";

export interface EnTeteOnglet {
  titre: string;
  url: string;
  nomHabilitation?: NomComposant;
}

export interface CorpsOnglet {
  composant: JSX.Element;
  nomHabilitation?: NomComposant;
}

export interface IOngletProps {
  enTete: EnTeteOnglet;
  corps: CorpsOnglet;
}
