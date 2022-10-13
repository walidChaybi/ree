import { Personne } from "@model/etatcivil/commun/IPersonne";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { personneMock } from "../../../fiche/hook/constructionComposants/mock/PersonneMock";
test("render composant SectionPart", async () => {
  expect(Personne.getNom(personneMock)).toBe("FAULKNER");
  expect(Personne.getAutresNoms(personneMock)).toBe("ELISA (Pseudonyme)");
  expect(Personne.getPrenoms(personneMock)).toBe(
    "Elie_madelaine-Henriette, Maëlla, Marie-Charlotte"
  );
  expect(Personne.getAutresPrenom(personneMock)).toBe("Solomon");
  expect(Personne.getLieuNaissance(personneMock)).toBe(
    "Marseille 2ème arrondissement (Provence-Aples-Côte d'Azur)"
  );
  expect(Personne.getLieuDeces(personneMock)).toBe(
    "Londres, Angleterre (Grande Bretagne)"
  );
  expect(Personne.getDateNaissance(personneMock)).toBe("26/02/1980");
  expect(Personne.getDateDeces(personneMock)).toBe("07/2020");
  expect(Personne.getNationalite(personneMock)).toBe("Française");
  expect(Personne.getSexe(personneMock)).toBe("Masculin");
  expect(Personne.getParents(personneMock)).toStrictEqual([
    { nom: "Paul", prenoms: ["Justice"] },
    { nom: "Barton", prenoms: ["Buck"] },
    { nom: "Janine", prenoms: ["Alyce"] }
  ]);
  expect(Personne.getEnfants(personneMock)).toStrictEqual([
    { nom: "Paul", prenoms: ["Justice"] },
    { nom: "Barton", prenoms: ["Buck"] },
    { nom: "Janine", prenoms: ["Alyce"] }
  ]);
  expect(Personne.getActes(personneMock)).toStrictEqual([
    {
      id: "b41079a5-9e8d-478c-b04c-c4c2ac67134f",
      numero: "413",
      nature: NatureActe.getEnumFor("ABSENCE")
    }
  ]);
  expect(Personne.getPacss(personneMock)).toStrictEqual([
    {
      id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e0",
      numero: "123456",
      statut: "INACTIF"
    },
    {
      id: "89c9d030-26c3-41d3-bdde-8b4dcc0420df",
      numero: "1234506",
      statut: "ACTIF"
    },
    {
      id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e1",
      numero: "1234508",
      statut: "INACTIF"
    },
    {
      id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e2",
      numero: "1234509",
      statut: "ACTIF"
    },
    {
      id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e3",
      numero: "1234510",
      statut: "INACTIF"
    }
  ]);
  expect(Personne.getRcs(personneMock)).toStrictEqual([
    {
      id: "85df1d10-71b7-4336-9463-bb1c5760d1a0",
      numero: "3",
      statut: "ACTIF"
    },
    {
      id: "a3d1eeb9-a01e-455d-8fc4-ee595bcc3918",
      numero: "4",
      statut: "ACTIF"
    }
  ]);
  expect(Personne.getRcas(personneMock)).toStrictEqual([
    {
      id: "8c9ea77f-55dc-494f-8e75-b136ac7ce63e",
      numero: "4094",
      statut: "INACTIF"
    }
  ]);
});
