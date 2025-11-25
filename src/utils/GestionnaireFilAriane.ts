export interface IElementFilAriane {
  titre: string;
  url: string;
}

export interface IElementsFilAriane {
  niveau1: IElementFilAriane | null;
  niveau2: IElementFilAriane | null;
}

interface IAjoutElementParams extends IElementFilAriane {
  niveau?: 1 | 2;
}

export const EVENT_MISE_A_JOUR_FIL_ARIANE = "fil-ariane-rece:mise-a-jour";

class GestionnaireFilAriane {
  public static elementsFilAriane: IElementsFilAriane = {
    niveau1: null,
    niveau2: null
  };

  public static ajoutElement({ titre, url, niveau }: IAjoutElementParams) {
    switch (niveau) {
      case 1:
        GestionnaireFilAriane.elementsFilAriane = {
          niveau1: { titre, url },
          niveau2: null
        };
        break;

      case 2:
        GestionnaireFilAriane.elementsFilAriane.niveau2 = { titre, url };
        break;

      default:
        GestionnaireFilAriane.elementsFilAriane = { niveau1: null, niveau2: null };
    }

    document.dispatchEvent(new Event(EVENT_MISE_A_JOUR_FIL_ARIANE));
  }
}

export default GestionnaireFilAriane;
