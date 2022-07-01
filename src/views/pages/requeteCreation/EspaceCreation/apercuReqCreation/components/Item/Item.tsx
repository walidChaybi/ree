import React from "react";
import {
  AccordionRece,
  AccordionReceClassNameProps
} from "../../../../../../common/widget/accordion/AccordionRece";
import "../../scss/ApercuReqCreationPage.scss";
import { formatLigne } from "../Formatages";

export interface ItemProps {
  titre: string;
  etendu?: boolean;
  visible?: boolean;
  numeroItem?: number;
  totalItems?: number;
  className?: AccordionReceClassNameProps;
}

const Item: React.FC<ItemProps> = ({
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

export const AccordeonInfos: React.FC<ItemProps> = props => {
  props = {
    className: {
      title: "bg-clair",
      ...props.className
    },
    ...props
  };

  return <Item {...props} />;
};

export default Item;
