import React from "react";
import { Text } from "../Text";

export interface AccordionContentProps {
  libelleId: string;
  value: JSX.Element | JSX.Element[] | string;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({
  libelleId,
  value
}) => {
  return (
    <div>
      <Text messageId={libelleId} /> {value}
    </div>
  );
};
