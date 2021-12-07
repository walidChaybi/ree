import moment from "moment";
import { FormatDate } from "../../../views/common/util/DateUtils";
import {
  getMessagePrioriteDeLaRequete,
  prioriteDeLaRequete
} from "../../../views/common/util/RequetesUtils";

test("récupération de la priorité de la requête : Priotité basse", () => {
  const dateRequete = moment();
  const priorite = prioriteDeLaRequete(dateRequete.format(FormatDate.DDMMYYYY));
  expect(priorite).toBe("PrioriteBasse");
});

test("récupération de la priorité de la requête : Priotité moyenne", () => {
  const dateRequete = moment().subtract(3, "days");
  const priorite = prioriteDeLaRequete(dateRequete.format(FormatDate.DDMMYYYY));

  expect(priorite).toBe("PrioriteMoyenne");
});

test("récupération de la priorité de la requête : Priotité haute", () => {
  const dateRequete = moment().subtract(6, "days");
  let priorite = prioriteDeLaRequete(dateRequete.format(FormatDate.DDMMYYYY));
  expect(priorite).toBe("PrioriteHaute");
});

test("récupération du libelle de la priorité de la requête : Priotité basse", () => {
  const dateRequete = moment();
  let priorite = getMessagePrioriteDeLaRequete(
    dateRequete.format(FormatDate.DDMMYYYY)
  );
  expect(priorite).toBe("Priorité basse");
});

test("récupération du libelle de la priorité de la requête : Priotité moyenne", () => {
  const dateRequete = moment().subtract(3, "days");
  let priorite = getMessagePrioriteDeLaRequete(
    dateRequete.format(FormatDate.DDMMYYYY)
  );
  expect(priorite).toBe("Priorité moyenne");
});

test("récupération du libelle  de la priorité de la requête : Priotité haute", () => {
  const dateRequete = moment().subtract(6, "days");
  let priorite = getMessagePrioriteDeLaRequete(
    dateRequete.format(FormatDate.DDMMYYYY)
  );
  expect(priorite).toBe("Priorité haute");
});
