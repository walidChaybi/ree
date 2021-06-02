import React from "react";
import "./scss/SectionContent.scss";

export interface SectionContentProps {
  libelle?: string;
  value: JSX.Element | JSX.Element[] | string;
  row?: number;
  className?: string;
}

export const SectionContent: React.FC<SectionContentProps> = ({
  libelle,
  value,
  row = 0,
  className
}) => {
  return (
    <>
      {libelle ? (
        <div
          className={className ? className : "content"}
          style={{ gridRow: row + 1 }}
        >
          {libelle && <label className="libelleContent">{libelle}</label>}
          <span className="valueContent">{value}</span>
        </div>
      ) : (
        <span>{value}</span>
      )}
    </>
  );
};
