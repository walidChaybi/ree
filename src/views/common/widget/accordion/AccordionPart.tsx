import React from "react";

export interface DataAccordion {
  libelle: JSX.Element;
  value: JSX.Element;
}

export const AccordionContent: React.FC<DataAccordion> = ({
  libelle,
  value
}) => {
  return <div>{`${libelle} : ${value}`}</div>;
};
