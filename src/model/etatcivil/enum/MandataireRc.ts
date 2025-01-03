/* v8 ignore start */

import { Option } from "@util/Type";

export interface IMandataire {
  id: string;
  nom: string;
  code: string;
  libelle: string;
  estActif: boolean;
}

export class MandataireRc {
  private static liste: IMandataire[] | null = null;

  public static init(mandataires: IMandataire[]) {
    if (MandataireRc.liste !== null) {
      return;
    }

    MandataireRc.liste = mandataires;
  }

  public static depuisId(id: string): IMandataire | null {
    return MandataireRc.liste?.find(mandataire => mandataire.id === id) ?? null;
  }

  public static versOptions(): Option[] {
    return MandataireRc.liste?.map(mandataire => ({ cle: mandataire.id, libelle: mandataire.libelle })) ?? [];
  }
}
/* v8 ignore start */
