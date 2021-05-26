import Checkbox from "@material-ui/core/Checkbox";
import WarningIcon from "@material-ui/icons/Warning";
import React, { useState } from "react";
import "./scss/CheckboxColumn.scss";

export interface CheckboxColumnProps {
  data: any;
  onClickParentCallBack: (isChecked: boolean, data: any) => void;
  hasWarning?: (isChecked: boolean, data: any) => boolean;
}

export const CheckboxColumn: React.FC<CheckboxColumnProps> = ({
  data,
  hasWarning,
  onClickParentCallBack
}) => {
  const [displayWarning, setDisplayWarning] = useState<boolean>(false);

  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    const isChecked: boolean = (event?.target as any)?.checked;
    setDisplayWarning(true);
    if (hasWarning && hasWarning(isChecked, data)) {
      setDisplayWarning(true);
    } else {
      setDisplayWarning(false);
    }
    onClickParentCallBack && onClickParentCallBack(isChecked, data);
  };

  return (
    <div className="CheckboxColumn">
      <Checkbox onClick={onClick} role="checkbox" className="Checkbox" />
      {displayWarning === true && <WarningIcon className="WarningIcon" />}
    </div>
  );
};
