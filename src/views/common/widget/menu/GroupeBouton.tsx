import { Button, ButtonGroup } from "@material-ui/core";
import React from "react";
import { IActionOption } from "../../../../model/requete/v2/IActionOption";
import { DoubleSubmitUtil } from "../../util/DoubleSubmitUtil";
import "./scss/GroupeBouton.scss";

interface IGroupeBoutonProps {
  titre: string;
  onSelect: (indexMenu: number) => any;
  listeActions: IActionOption[];
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
            ref={el.ref}
            onClick={() => {
              DoubleSubmitUtil.eviteDoubleSubmit(el.ref?.current);
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
