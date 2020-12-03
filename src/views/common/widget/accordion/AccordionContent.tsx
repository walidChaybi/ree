import React from "react";
import "./sass/AccordionContent.scss";

export interface AccordionContentProps {
  libelle: string;
  value: JSX.Element | JSX.Element[] | string;
  row?: number;
  className?: string;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({
  libelle,
  value,
  row = 0,
  className
}) => {
  return (
    <div
      className={className ? className : "content"}
      style={{ gridRow: row + 1 }}
    >
      {libelle && <label className="libelleContent">{libelle}</label>}
      <span className="valueContent">{value}</span>
    </div>
  );
};
