import { List, ListItemText } from "@material-ui/core";
import React from "react";
import {
  IObservation,
  Observation
} from "../../../../model/requete/v2/IObservation";
import { AccordionRece } from "../../../common/widget/accordion/AccordionRece";
import "./scss/Suivis.scss";

interface SuiviObservationsRequeteProps {
  observations?: IObservation[];
}

export const SuiviObservationsRequete: React.FC<SuiviObservationsRequeteProps> = props => {
  return (
    <div className="suivis-requete">
      <AccordionRece
        titre={"Suivi des observations"}
        disabled={false}
        expanded={true}
      >
        <List>
          {props.observations
            ?.sort((a, b) => (a.numeroOrdre > b.numeroOrdre ? -1 : 1))
            .map(el => (
              <ListItemText
                title={el.texte}
                key={el.id}
                className={
                  Observation.getTrigramme(el) === "RECE" ? "RECE" : ""
                }
              >
                {`${Observation.getTexte(el)} - ${Observation.getDate(el)} ${
                  Observation.getTrigramme(el) !== "RECE"
                    ? `- ${Observation.getTrigramme(el)}`
                    : ""
                }`}
              </ListItemText>
            ))}
        </List>
      </AccordionRece>
    </div>
  );
};
