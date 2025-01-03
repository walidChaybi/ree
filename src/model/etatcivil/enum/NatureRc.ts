/* v8 ignore start */

import { Option } from "@util/Type";

export interface INatureRc {
  id: string;
  nom: string;
  code: string;
  libelle: string;
  article: string;
  type: string;
  categorieRCRCA: string;
  decisionCouple: boolean;
  estActif: boolean;
}

export class NatureRc {
  private static liste: INatureRc[] | null = null;

  public static init(naturesRca: INatureRc[]) {
    if (NatureRc.liste !== null) {
      return;
    }

    NatureRc.liste = naturesRca;
  }

  public static depuisId(id: string): INatureRc | null {
    return NatureRc.liste?.find(natureRc => natureRc.id === id) ?? null;
  }

  public static versOptions(): Option[] {
    return NatureRc.liste?.map(natureRc => ({ cle: natureRc.id, libelle: natureRc.libelle })) ?? [];
  }
}
/* v8 ignore end */
