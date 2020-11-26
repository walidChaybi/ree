import React from "react";
import { Text } from "../Text";
import "./sass/AccordionContent.scss";

export interface AccordionContentProps {
  libelleId: string;
  value: JSX.Element | JSX.Element[] | string;
  row?: number;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({
  libelleId,
  value,
  row = 0
}) => {
  return (
    <div className="content" style={{ gridRow: row + 1 }}>
      {libelleId && (
        <label className="libelleContent">
          <Text messageId={libelleId} />
        </label>
      )}
      <span className="valueContent">{value}</span>
    </div>
  );
};
