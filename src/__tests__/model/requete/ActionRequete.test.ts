import { ActionRequete } from "@model/requete/ActionRequete";
import { describe, expect, test } from "vitest";
import DateRECE from "../../../utils/DateRECE";

describe("ActionsRequete", () => {
  const mockActions = ActionRequete.depuisDtos([
    {
      id: "123457",
      numeroOrdre: 2,
      libelle: "Modification de la requête",
      dateAction: 123,
      idUtilisateur: "456788",
      nomUtilisateur: "Dupont",
      prenomUtilisateur: "Antoine"
    },
    {
      id: "123456",
      numeroOrdre: 1,
      libelle: "Saisie de la requête",
      dateAction: 123,
      idUtilisateur: "456789",
      nomUtilisateur: "RECE",
      prenomUtilisateur: "Système"
    }
  ]) as ActionRequete[];
  test("DOIT créer une instance valide à partir de données DTO complètes", () => {
    expect(mockActions).toHaveLength(2);
    const action = mockActions[0];
    const dateAttendue = DateRECE.depuisTimestamp(123).format("JJ mois AAAA");

    expect(action.id).toBe("123457");
    expect(action.numeroOrdre).toBe(2);
    expect(action.libelle).toBe("Modification de la requête");
    expect(action.idUtilisateur).toBe("456788");
    expect(action.nomUtilisateur).toBe("DUPONT");
    expect(action.prenomUtilisateur).toBe("Antoine");
    expect(action.phraseHistorique).toBe("Modification de la requête - 01/01/1970 - DUPONT Antoine");
    expect(action.date.format("JJ mois AAAA")).toEqual(dateAttendue);
  });

  test("DOIT pas afficher le nom prénom dans la phraseHistorique QUAND l'utilisateur est RECE système", () => {
    const action = mockActions[1];

    const dateAttendue = DateRECE.depuisTimestamp(124).format("JJ mois AAAA");

    expect(action.id).toBe("123456");
    expect(action.numeroOrdre).toBe(1);
    expect(action.libelle).toBe("Saisie de la requête");
    expect(action.idUtilisateur).toBe("456789");
    expect(action.nomUtilisateur).toBe("RECE");
    expect(action.prenomUtilisateur).toBe("Système");
    expect(action.phraseHistorique).toBe("Saisie de la requête - 01/01/1970");
    expect(action.date.format("JJ mois AAAA")).toEqual(dateAttendue);
  });
});
