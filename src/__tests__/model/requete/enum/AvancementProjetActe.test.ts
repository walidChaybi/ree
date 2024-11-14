import { AvancementProjetActe } from "@model/requete/enum/AvancementProjetActe";
import { describe, expect, test } from "vitest";

describe("TEST des fonctions statique de l'enum AvancementProjetActe", () => {
    test("estASaisir DOIT retourner 'VRAI' quand le projet d'acte est à l'avancement 'A_SAISIR'", () => {
        expect(AvancementProjetActe.estASaisir(AvancementProjetActe.A_SAISIR)).toBeTruthy();
    })

    test("estProjetValide DOIT retourner 'VRAI' quand le projet d'acte est à l'avancement 'VALIDE'", () => {
        expect(AvancementProjetActe.estProjetValide(AvancementProjetActe.VALIDE)).toBeTruthy();  
    })

    test("estActeASigner DOIT retourner 'VRAI' quand le projet d'acte est à l'avancement 'ACTE_A_SIGNER'", () => {
        expect(AvancementProjetActe.estActeASigner(AvancementProjetActe.ACTE_A_SIGNER)).toBeTruthy();
    })

    test("estAVerifier DOIT retourner 'VRAI' quand le projet d'acte est à l'avancement 'A_VERIFIER'", () => {
        expect(AvancementProjetActe.estAVerifier(AvancementProjetActe.A_VERIFIER)).toBeTruthy();
    })

    test("estProjetCree DOIT retourner 'VRAI' quand le projet d'acte est à l'avancement 'EN_COURS'", () => {
        expect(AvancementProjetActe.estProjetCree(AvancementProjetActe.EN_COURS)).toBeTruthy();
    })

    test("estSigne DOIT retourner 'VRAI' quand le projet d'acte est à l'avancement 'SIGNE'", () => {
        expect(AvancementProjetActe.estSigne(AvancementProjetActe.SIGNE)).toBeTruthy();
    })
})