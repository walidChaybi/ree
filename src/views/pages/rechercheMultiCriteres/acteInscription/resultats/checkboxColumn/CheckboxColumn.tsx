import Checkbox from "@material-ui/core/Checkbox";
import WarningIcon from "@material-ui/icons/Warning";
import React, { useState } from "react";
import "./scss/CheckboxColumn.scss";

export interface CheckboxColumnProps {
  index: number;
  data: any;
  onClickParentCallBack?: (
    index: number,
    isChecked: boolean,
    data: any
  ) => void;
  hasWarning?: (isChecked: boolean, data: any) => boolean;
}

export const CheckboxColumn: React.FC<CheckboxColumnProps> = ({
  index,
  data,
  hasWarning,
  onClickParentCallBack
}) => {
  const [displayWarning, setDisplayWarning] = useState<boolean>(false);

  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    const isChecked: boolean = (event?.target as any)?.checked;
    if (hasWarning && hasWarning(isChecked, data)) {
      setDisplayWarning(true);
    } else {
      setDisplayWarning(false);
    }
    onClickParentCallBack && onClickParentCallBack(index, isChecked, data);
  };

  return (
    <div className="CheckboxColumn">
      <Checkbox onClick={onClick} role="checkbox" className="Checkbox" />
      {displayWarning === true && <WarningIcon className="WarningIcon" />}
    </div>
  );
};
