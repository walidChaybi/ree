import moment from "moment";
import classNames from "classnames";
import { getText } from "../../common/widget/Text";

export function prioriteDeLaRequete(dateStatut: string): string {
  const ecartEnJours = moment().diff(moment(dateStatut, "DD/MM/YYYY"), "days");

  return classNames({
    PrioriteBasse: ecartEnJours <= 2,
    PrioriteMoyenne: ecartEnJours > 2 && ecartEnJours <= 5,
    PrioriteHaute: ecartEnJours > 5
  });
}

export function getMessagePrioriteDeLaRequete(dateStatut: string): string {
  const ecartEnJours = moment().diff(moment(dateStatut, "DD/MM/YYYY"), "days");
  if (ecartEnJours <= 2) {
    return getText("pages.delivrance.mesRequetes.tableau.body.priorite.basse");
  } else if (ecartEnJours > 2 && ecartEnJours <= 5) {
    return getText(
      "pages.delivrance.mesRequetes.tableau.body.priorite.moyenne"
    );
  } else {
    return getText("pages.delivrance.mesRequetes.tableau.body.priorite.haute");
  }
}
