import moment from "moment";
import classNames from "classnames";
import { getText } from "../../common/widget/Text";
import { FormatDate } from "../../../ressources/FormatDate";

export const tableauHeader = "pages.delivrance.mesRequetes.tableau.header";

export const indexParamsReq = {
  NomOec: 0,
  PrenomOec: 1,
  Statut: 2,
  Tri: 3,
  Sens: 4,
  Range: 5
};

const limiteBasse = 2;
const limiteHaute = 5;

export function prioriteDeLaRequete(dateStatut: string): string {
  const ecartEnJours = moment().diff(
    moment(dateStatut, FormatDate.DDMMYYYY),
    "days"
  );

  return classNames({
    PrioriteBasse: ecartEnJours <= limiteBasse,
    PrioriteMoyenne: ecartEnJours > limiteBasse && ecartEnJours <= limiteHaute,
    PrioriteHaute: ecartEnJours > limiteHaute
  });
}

export function getMessagePrioriteDeLaRequete(dateStatut: string): string {
  const ecartEnJours = moment().diff(
    moment(dateStatut, FormatDate.DDMMYYYY),
    "days"
  );
  if (ecartEnJours <= limiteBasse) {
    return getText("pages.delivrance.mesRequetes.tableau.body.priorite.basse");
  } else if (ecartEnJours > limiteBasse && ecartEnJours <= limiteHaute) {
    return getText(
      "pages.delivrance.mesRequetes.tableau.body.priorite.moyenne"
    );
  } else {
    return getText("pages.delivrance.mesRequetes.tableau.body.priorite.haute");
  }
}
