import React, { ChangeEvent } from "react";
import { DropdownOption } from "./DropdownOption";

export interface IDropdownProps {
  name: string;
  isBlankAllowed?: boolean;
  onChangeFct?: ((event: ChangeEvent<HTMLSelectElement>) => void) | undefined;
}

export const Dropdown: React.FC<IDropdownProps> = ({
  name,
  children,
  isBlankAllowed = false,
  onChangeFct
}) => {
  return (
    <>
      <select name={name} onChange={onChangeFct}>
        {isBlankAllowed ? <DropdownOption value={""} messageId={""} /> : null}
        {children}
      </select>
    </>
  );
};
