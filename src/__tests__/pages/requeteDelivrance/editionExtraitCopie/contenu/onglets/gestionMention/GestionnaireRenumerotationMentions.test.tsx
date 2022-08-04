import { IMention } from "../../../../../../../model/etatcivil/acte/mention/IMention";
import { IMentionAffichage } from "../../../../../../../views/pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/mentions/GestionMentionsUtil";
import { gestionnaireRenumerotationMentions } from "../../../../../../../views/pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/mentions/GestionnaireRenumerotationMentions";

test("renumerotationMentions avec mentions pas en Base", () => {
  const mentionEcran = [
    {
      id: "1",
      numeroOrdre: 1,
      texte: "1"
    } as IMentionAffichage,
    {
      id: "4",
      numeroOrdre: 2,
      texte: "4"
    } as IMentionAffichage,
    {
      id: "5",
      numeroOrdre: 3,
      texte: "5"
    } as IMentionAffichage
  ];

  const mentionBase = [
    {
      id: "1",
      numeroOrdre: 1,
      textes: { texteMentionDelivrance: "1" }
    } as IMention,
    {
      id: "2",
      numeroOrdre: 2,
      textes: { texteMentionDelivrance: "2" }
    } as IMention,
    {
      id: "3",
      numeroOrdre: 3,
      textes: { texteMentionDelivrance: "3" }
    } as IMention
  ];

  expect(
    gestionnaireRenumerotationMentions
      .renumerotationMentions(mentionEcran, mentionBase, "")
      .map(el => [el.textes.texteMentionDelivrance, el.numeroOrdreExtrait])
  ).toStrictEqual([
    ["1", 1],
    ["4", 2],
    ["5", 3],
    ["2", 4],
    ["3", 5]
  ]);
});

test("renumerotationMentions avec mention enlevé", () => {
  const mentionEcran = [
    {
      id: "3",
      numeroOrdre: 1
    } as IMentionAffichage,
    {
      id: "1",
      numeroOrdre: 2
    } as IMentionAffichage
  ];

  const mentionBase = [
    {
      id: "1",
      numeroOrdre: 1,
      textes: {}
    } as IMention,
    {
      id: "2",
      numeroOrdre: 2,
      textes: {}
    } as IMention,
    {
      id: "3",
      numeroOrdre: 3,
      textes: {}
    } as IMention,
    {
      id: "4",
      numeroOrdre: 4,
      textes: {}
    } as IMention
  ];

  expect(
    gestionnaireRenumerotationMentions
      .renumerotationMentions(mentionEcran, mentionBase, "")
      .map(el => [el.id, el.numeroOrdreExtrait])
  ).toStrictEqual([
    ["2", 1],
    ["3", 2],
    ["1", 3],
    ["4", 4]
  ]);
});

test("renumerotationMentions avec mentions enlevé 2", () => {
  const mentionEcran = [
    {
      id: "1",
      numeroOrdre: 1
    } as IMentionAffichage,
    {
      id: "3",
      numeroOrdre: 2
    } as IMentionAffichage
  ];

  const mentionBase = [
    {
      id: "1",
      numeroOrdre: 1,
      textes: {}
    } as IMention,
    {
      id: "2",
      numeroOrdre: 2,
      textes: {}
    } as IMention,
    {
      id: "3",
      numeroOrdre: 3,
      textes: {}
    } as IMention
  ];

  expect(
    gestionnaireRenumerotationMentions
      .renumerotationMentions(mentionEcran, mentionBase, "")
      .map(el => [el.id, el.numeroOrdreExtrait])
  ).toStrictEqual([
    ["1", 1],
    ["2", 2],
    ["3", 3]
  ]);
});

test("renumerotationMentions sans mentions enlevé", () => {
  const mentionEcran = [
    {
      id: "1",
      numeroOrdre: 1
    } as IMentionAffichage,
    {
      id: "3",
      numeroOrdre: 2
    } as IMentionAffichage,
    {
      id: "2",
      numeroOrdre: 3
    } as IMentionAffichage
  ];

  const mentionBase = [
    {
      id: "1",
      numeroOrdre: 1,
      textes: {}
    } as IMention,
    {
      id: "2",
      numeroOrdre: 2,
      textes: {}
    } as IMention,
    {
      id: "3",
      numeroOrdre: 3,
      textes: {}
    } as IMention
  ];

  expect(
    gestionnaireRenumerotationMentions
      .renumerotationMentions(mentionEcran, mentionBase, "")
      .map(el => [el.id, el.numeroOrdreExtrait])
  ).toStrictEqual([
    ["1", 1],
    ["3", 2],
    ["2", 3]
  ]);
});
