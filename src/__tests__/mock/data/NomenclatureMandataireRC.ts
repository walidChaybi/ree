import { IMandataire } from "@model/etatcivil/enum/MandataireRc";

export const MANDATAIRE_RC = [
  { id: "058a436b-330d-4c3c-83e4-d49c27380526", nom: "MANDATAIRE", code: "MANDATAIRE_FAMILLE", libelle: "Famille", estActif: true },
  {
    id: "058a436b-330d-4c3c-83e1-d49c27380226",
    nom: "MANDATAIRE",
    code: "MANDATAIRE_JUDICIAIRE_ASSOCIATION",
    libelle: "Mandataire judiciaire à la protection des majeurs association",
    estActif: true
  },
  {
    id: "058a436b-330d-4c3c-83e2-d49c27380326",
    nom: "MANDATAIRE",
    code: "MANDATAIRE_JUDICIAIRE_INDIVIDUEL",
    libelle: "Mandataire judiciaire à la protection des majeurs  individuel",
    estActif: true
  },
  {
    id: "058a436b-330d-4c3c-83e3-d49c27380426",
    nom: "MANDATAIRE",
    code: "MANDATAIRE_PREPOSE",
    libelle: "Préposé d’établissement",
    estActif: true
  }
] as IMandataire[];
