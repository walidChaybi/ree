import { formatLigne } from "@util/Utils";
import {
  AccordionRece,
  AccordionReceClassNameProps
} from "@widget/accordion/AccordionRece";
import React from "react";

export interface ItemProps {
  titre: string;
  etendu?: boolean;
  visible?: boolean;
  numeroItem?: number;
  totalItems?: number;
  className?: AccordionReceClassNameProps;
  parent2Enfant?: boolean;
}

export const Item: React.FC<ItemProps> = ({
  visible = true,
  etendu = true,
  ...props
}) => {
  const numerotationOK = !(props.numeroItem === 1 && props.totalItems === 1);
  const titreNumerote = formatLigne(
    [props.titre, numerotationOK && props.numeroItem?.toString()],
    " "
  );

  return visible ? (
    <AccordionRece
      key={titreNumerote}
      expanded={etendu}
      titre={titreNumerote}
      className={{
        container: "accordionContainer",
        content: "accordionContent",
        title: props.className?.title
      }}
    >
      {props.children}
    </AccordionRece>
  ) : (
    <></>
  );
};

export default Item;
