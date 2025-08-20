import React from "react";
import "./scss/BoutonAccordionTitle.scss";

interface BoutonAccordionTitleProps {
  iconeBouton: JSX.Element;
  onClickBouton?: () => any;
}

export const BoutonAccordionTitle: React.FC<BoutonAccordionTitleProps> = ({ iconeBouton, onClickBouton }) => {
  return (
    <button
      type="button"
      className={iconeBouton ? "flexAccordion m-0 justify-end bg-transparent p-0" : ""}
      onClick={onClickBouton}
    >
      {iconeBouton}
    </button>
  );
};
