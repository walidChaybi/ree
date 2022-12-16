import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getLibelle } from "@util/Utils";
import React from "react";
import "./scss/BoutonAccordionTitle.scss";

export interface BoutonAccordionTitleProps {
  iconeBouton: IconDefinition;
  onClickBouton?: any;
  classNameBouton: string;
  descriptionBouton: string;
}

export const BoutonAccordionTitle: React.FC<
  BoutonAccordionTitleProps
> = props => {
  function onClickBouton(e: any) {
    e.stopPropagation();
    props.onClickBouton();
  }

  return (
    <div className={props.iconeBouton ? "flexAccordion" : ""}>
      <FontAwesomeIcon
        icon={props.iconeBouton}
        className={`BoutonAccordionTitle ${props.classNameBouton}`}
        title={getLibelle(props.descriptionBouton)}
        onClick={onClickBouton}
      />
    </div>
  );
};
