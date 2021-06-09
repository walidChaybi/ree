import { List } from "@material-ui/core";
import React, { useEffect } from "react";
import { IAction } from "../../../../model/requete/v2/IActions";
import { AccordionRece } from "../../../common/widget/accordion/AccordionRece";
import {
  IUtilisateurInfoApi,
  useUtilisateursInfosApi
} from "../hook/UtilisateursInfosRequeteHook";
import { ActionRequete } from "./ActionRequete";
import "./scss/SuiviActions.scss";

interface SuiviActionsRequeteProps {
  actions?: IAction[];
}

export const SuiviActionsRequete: React.FC<SuiviActionsRequeteProps> = props => {
  const [actions, setActions] = React.useState<IAction[] | undefined>(
    props?.actions
  );
  const [ids, setIds] = React.useState<string[]>([]);

  const { dataState } = useUtilisateursInfosApi(ids);

  useEffect(() => {
    if (props.actions && dataState) {
      setActions(mapActions(props.actions, dataState));
    } else if (props.actions) {
      setIds(props.actions.map(el => el.idUtilisateur));
    }
  }, [props.actions, dataState]);

  return (
    <div className="suivi-actions-requete">
      <AccordionRece
        titre={"Suivi des actions"}
        disabled={false}
        defaultExpanded={true}
      >
        <List>
          {actions
            ?.sort((a, b) => (a.numeroOrdre > b.numeroOrdre ? -1 : 1))
            .map(el => (
              <ActionRequete key={el.id} action={el} />
            ))}
        </List>
      </AccordionRece>
    </div>
  );
};

function mapActions(
  actions: IAction[],
  trigrammes: IUtilisateurInfoApi[]
): IAction[] {
  return actions.map(el => {
    el.trigramme = getTrigramme(el.idUtilisateur, trigrammes);
    return el;
  });
}

function getTrigramme(
  idUtilisateur: string,
  trigrammes: IUtilisateurInfoApi[]
): string {
  if (trigrammes) {
    for (const el of trigrammes) {
      if (idUtilisateur === el.idUtilisateur) {
        return el.trigramme;
      }
    }
  }
  return "";
}
