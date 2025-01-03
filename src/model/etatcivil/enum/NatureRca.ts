/* v8 ignore start */

import { Option } from "@util/Type";

export interface INatureRca {
  id: string;
  nom: string;
  code: string;
  libelle: string;
  article: string;
  type?: string;
  categorieRCRCA: string;
  decisionCouple: boolean;
  estActif: boolean;
}

export class NatureRca {
  private static liste: INatureRca[] | null = null;

  public static init(naturesRca: INatureRca[]) {
    if (NatureRca.liste !== null) {
      return;
    }

    NatureRca.liste = naturesRca;
  }

  public static depuisId(id: string): INatureRca | null {
    return NatureRca.liste?.find(natureRca => natureRca.id === id) ?? null;
  }

  public static versOptions(): Option[] {
    return NatureRca.liste?.map(natureRca => ({ cle: natureRca.id, libelle: natureRca.libelle })) ?? [];
  }
}
/* v8 ignore end */
