import moment from "moment";
import {
  prioriteDeLaRequete,
  getMessagePrioriteDeLaRequete
} from "../RequetesUtils";
import { getText } from "../../../common/widget/Text";

test("récupération de la priorité de la requête : Priotité basse", () => {
  const dateRequete = moment();
  const priorite = prioriteDeLaRequete(dateRequete.format("DD/MM/YYYY"));
  expect(priorite).toBe("PrioriteBasse");
});

test("récupération de la priorité de la requête : Priotité moyenne", () => {
  const dateRequete = moment().subtract(3, "days");
  const priorite = prioriteDeLaRequete(dateRequete.format("DD/MM/YYYY"));

  expect(priorite).toBe("PrioriteMoyenne");
});

test("récupération de la priorité de la requête : Priotité haute", () => {
  const dateRequete = moment().subtract(6, "days");
  let priorite = prioriteDeLaRequete(dateRequete.format("DD/MM/YYYY"));
  expect(priorite).toBe("PrioriteHaute");
});

test("récupération du libelle de la priorité de la requête : Priotité basse", () => {
  const dateRequete = moment();
  let priorite = getMessagePrioriteDeLaRequete(
    dateRequete.format("DD/MM/YYYY")
  );
  expect(priorite).toBe(
    getText("pages.delivrance.mesRequetes.tableau.body.priorite.basse")
  );
});

test("récupération du libelle de la priorité de la requête : Priotité moyenne", () => {
  const dateRequete = moment().subtract(3, "days");
  let priorite = getMessagePrioriteDeLaRequete(
    dateRequete.format("DD/MM/YYYY")
  );
  expect(priorite).toBe(
    getText("pages.delivrance.mesRequetes.tableau.body.priorite.moyenne")
  );
});

test("récupération du libelle  de la priorité de la requête : Priotité haute", () => {
  const dateRequete = moment().subtract(6, "days");
  let priorite = getMessagePrioriteDeLaRequete(
    dateRequete.format("DD/MM/YYYY")
  );
  expect(priorite).toBe(
    getText("pages.delivrance.mesRequetes.tableau.body.priorite.haute")
  );
});
