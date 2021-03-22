export const PERIMETRE_MEAE = "MEAE";
export interface IPerimetre {
  idPerimetre: string;
  nom: string;
  description: string;
  estActif: boolean;
  listePays: string[];
  listeIdTypeRegistre: string[];
}
