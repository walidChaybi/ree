import { FormatDate } from "@util/DateUtils";
import {
  getMessagePrioriteDeLaRequete,
  prioriteDeLaRequete
} from "@util/RequetesUtils";
import dayjs from "dayjs";
import { expect, test } from "vitest";

test("récupération de la priorité de la requête : Priorité basse", () => {
  const dateRequete = dayjs();
  const priorite = prioriteDeLaRequete(dateRequete.format(FormatDate.DDMMYYYY));
  expect(priorite).toBe("PrioriteBasse");
});

test("récupération de la priorité de la requête : Priorité moyenne", () => {
  const dateRequete = dayjs().subtract(3, "day");
  const priorite = prioriteDeLaRequete(dateRequete.format(FormatDate.DDMMYYYY));

  expect(priorite).toBe("PrioriteMoyenne");
});

test("récupération de la priorité de la requête : Priorité haute", () => {
  const dateRequete = dayjs().subtract(6, "day");
  let priorite = prioriteDeLaRequete(dateRequete.format(FormatDate.DDMMYYYY));
  expect(priorite).toBe("PrioriteHaute");
});

test("récupération du libellé de la priorité de la requête : Priorité basse", () => {
  const dateRequete = dayjs();
  let priorite = getMessagePrioriteDeLaRequete(dateRequete.format(FormatDate.DDMMYYYY));
  expect(priorite).toBe("Priorité basse");
});

test("récupération du libellé de la priorité de la requête : Priorité moyenne", () => {
  const dateRequete = dayjs().subtract(3, "day");
  let priorite = getMessagePrioriteDeLaRequete(dateRequete.format(FormatDate.DDMMYYYY));
  expect(priorite).toBe("Priorité moyenne");
});

test("récupération du libellé de la priorité de la requête : Priorité haute", () => {
  const dateRequete = dayjs().subtract(6, "day");
  let priorite = getMessagePrioriteDeLaRequete(dateRequete.format(FormatDate.DDMMYYYY));
  expect(priorite).toBe("Priorité haute");
});
