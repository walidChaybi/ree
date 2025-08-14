import { describe, expect, test } from "vitest";
import GestionnaireFilAriane, { EVENT_MISE_A_JOUR_FIL_ARIANE } from "../../utils/GestionnaireFilAriane";

describe("Test du gestionnaire du fil d'ariane", () => {
  test("Le gestionnaire fonctionne correctement", () => {
    let nombreEvent = 0;
    const listenerNombreEvent = () => nombreEvent++;
    document.addEventListener(EVENT_MISE_A_JOUR_FIL_ARIANE, listenerNombreEvent);

    expect(GestionnaireFilAriane.elementsFilAriane).toStrictEqual({
      niveau1: null,
      niveau2: null
    });

    GestionnaireFilAriane.ajoutElement({ titre: "Niveau1", url: "/niveau-1", niveau: 1 });

    expect(GestionnaireFilAriane.elementsFilAriane).toStrictEqual({
      niveau1: { titre: "Niveau1", url: "/niveau-1" },
      niveau2: null
    });
    expect(nombreEvent).toBe(1);

    GestionnaireFilAriane.ajoutElement({ titre: "Niveau2", url: "/niveau-2", niveau: 2 });
    expect(GestionnaireFilAriane.elementsFilAriane).toStrictEqual({
      niveau1: { titre: "Niveau1", url: "/niveau-1" },
      niveau2: { titre: "Niveau2", url: "/niveau-2" }
    });
    expect(nombreEvent).toBe(2);

    GestionnaireFilAriane.ajoutElement({ titre: "Niveau1Bis", url: "/niveau-1-bis", niveau: 1 });
    expect(GestionnaireFilAriane.elementsFilAriane).toStrictEqual({
      niveau1: { titre: "Niveau1Bis", url: "/niveau-1-bis" },
      niveau2: null
    });
    expect(nombreEvent).toBe(3);

    GestionnaireFilAriane.ajoutElement({ titre: "NiveauInconnu", url: "/niveau-inconnu" });
    expect(GestionnaireFilAriane.elementsFilAriane).toStrictEqual({
      niveau1: null,
      niveau2: null
    });
    expect(nombreEvent).toBe(4);

    GestionnaireFilAriane.ajoutElement({ titre: "Niveau2Bis", url: "/niveau-2-bis", niveau: 2 });
    expect(GestionnaireFilAriane.elementsFilAriane).toStrictEqual({
      niveau1: null,
      niveau2: { titre: "Niveau2Bis", url: "/niveau-2-bis" }
    });
    expect(nombreEvent).toBe(5);

    document.removeEventListener(EVENT_MISE_A_JOUR_FIL_ARIANE, listenerNombreEvent);
  });
});
