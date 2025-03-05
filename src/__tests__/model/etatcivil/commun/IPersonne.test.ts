import { PersonneUtils } from "@model/etatcivil/commun/Personne";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { expect, test } from "vitest";
import { personneMock } from "../../../mock/data/ficheEtBandeau/divers/PersonneMock";
test("render composant SectionPart", () => {
  expect(PersonneUtils.getNom(personneMock)).toBe("Faulkner");
  expect(PersonneUtils.getAutresNoms(personneMock)).toBe("Elisa (Pseudonyme)");
  expect(PersonneUtils.getPrenoms(personneMock)).toBe("Elie_madelaine-henriette, Maëlla, Marie-Charlotte");
  expect(PersonneUtils.getAutresPrenom(personneMock)).toBe("Solomon");
  expect(PersonneUtils.getLieuNaissance(personneMock)).toBe("marseille 2ème arrondissement (Provence-Aples-côte d'azur)");
  expect(PersonneUtils.getLieuDeces(personneMock)).toBe("londres, Angleterre (Grande bretagne)");
  expect(PersonneUtils.getDateNaissance(personneMock)).toBe("26/02/1980");
  expect(PersonneUtils.getDateDeces(personneMock)).toBe("07/2020");
  expect(PersonneUtils.getNationalite(personneMock)).toBe("Française");
  expect(PersonneUtils.getSexe(personneMock)).toBe("Masculin");
  expect(PersonneUtils.getParents(personneMock)).toStrictEqual([
    { nom: "Paul", prenoms: ["Justice"] },
    { nom: "Barton", prenoms: ["Buck"] },
    { nom: "Janine", prenoms: ["Alyce"] }
  ]);
  expect(PersonneUtils.getEnfants(personneMock)).toStrictEqual([
    { nom: "Paul", prenoms: ["Justice"] },
    { nom: "Barton", prenoms: ["Buck"] },
    { nom: "Janine", prenoms: ["Alyce"] }
  ]);
  expect(PersonneUtils.getActes(personneMock)).toStrictEqual([
    {
      id: "b41079a5-9e8d-478c-b04c-c4c2ac67134f",
      numero: "413",
      nature: NatureActe.getEnumFor("ABSENCE"),
      referenceComplete: "Mariage ACQ.Y.2023.2"
    }
  ]);
  expect(PersonneUtils.getPacss(personneMock)).toStrictEqual([
    {
      id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e0",
      numero: "123456",
      statut: "INACTIF",
      referenceComplete: "PACS N° 2020-1234507"
    },
    {
      id: "89c9d030-26c3-41d3-bdde-8b4dcc0420df",
      numero: "1234506",
      statut: "ACTIF",
      referenceComplete: "PACS N° 2020-1234508"
    },
    {
      id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e1",
      numero: "1234508",
      statut: "INACTIF",
      referenceComplete: "PACS N° 2020-1234509"
    },
    {
      id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e2",
      numero: "1234509",
      statut: "ACTIF",
      referenceComplete: "PACS N° 2020-1234505"
    },
    {
      id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e3",
      numero: "1234510",
      statut: "INACTIF",
      referenceComplete: "PACS N° 2020-1234504"
    }
  ]);
  expect(PersonneUtils.getRcs(personneMock)).toStrictEqual([
    {
      id: "85df1d10-71b7-4336-9463-bb1c5760d1a0",
      numero: "3",
      statut: "ACTIF",
      referenceComplete: "RC N° 2020-4"
    },
    {
      id: "a3d1eeb9-a01e-455d-8fc4-ee595bcc3918",
      numero: "4",
      statut: "ACTIF",
      referenceComplete: "RC N° 2020-5"
    }
  ]);
  expect(PersonneUtils.getRcas(personneMock)).toStrictEqual([
    {
      id: "8c9ea77f-55dc-494f-8e75-b136ac7ce63e",
      numero: "4094",
      statut: "INACTIF",
      referenceComplete: "RCA N° 2019-492"
    }
  ]);
});
