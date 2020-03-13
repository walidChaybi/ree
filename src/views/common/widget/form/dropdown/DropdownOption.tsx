import React from "react";
import { getText, MessageId } from "../../Text";

export interface IDropdownOptionProps {
  value: string | number;
  messageId: MessageId;
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
