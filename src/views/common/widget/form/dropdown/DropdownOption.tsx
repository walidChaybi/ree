import React from "react";
import { getText } from "../../Text";

export interface IDropdownOptionProps {
  value: string | number;
  messageId: string;
}
export const DropdownOption: React.FC<IDropdownOptionProps> = ({
  value,
  messageId
}) => {
  return (
    <>
      <option value={value}>
        {messageId !== "" ? getText(messageId) : null}
      </option>
    </>
  );
};
