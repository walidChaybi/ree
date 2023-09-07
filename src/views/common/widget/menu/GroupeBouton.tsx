import { IActionOption } from "@model/requete/IActionOption";
import { Button, ButtonGroup } from "@mui/material";
import { DoubleClicUtil } from "@util/DoubleClicUtil";
import React, { MutableRefObject } from "react";
import "./scss/GroupeBouton.scss";

interface IGroupeBoutonProps {
  titre: string;
  onSelect: (indexMenu: number, e?: any) => any;
  listeActions: IActionOption[];
  disabled?: boolean;
  refs?: MutableRefObject<HTMLElement[]>;
}

export const GroupeBouton: React.FC<IGroupeBoutonProps> = props => {
  return (
    <div className="GroupeBouton">
      <div className="Titre">
        <span>{props.titre}</span>
      </div>
      <ButtonGroup orientation="vertical">
        {props.listeActions.map(el => (
          <Button
            disabled={props.disabled}
            ref={element => {
              if (props.refs && element) {
                props.refs.current.push(element);
              }
            }}
            onClick={() => {
              if (props.refs) {
                props.refs.current.forEach(ref => {
                  DoubleClicUtil.desactiveOnClick(ref);
                });
              }
              props.onSelect(el.value);
            }}
            key={el.value}
          >
            {el.label}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};
