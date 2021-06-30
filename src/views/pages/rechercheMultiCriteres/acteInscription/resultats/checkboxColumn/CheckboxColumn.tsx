import Checkbox from "@material-ui/core/Checkbox";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import React, { useEffect, useState } from "react";
import "./scss/CheckboxColumn.scss";

export interface CheckboxColumnProps {
  index: number;
  data: any;
  disabledMessage?: string;
  isDisabled?: (data: any) => boolean;
  hasWarning?: (isChecked: boolean, data: any) => boolean;
  onClickParentCallBack?: (
    index: number,
    isChecked: boolean,
    data: any
  ) => void;
}

export const CheckboxColumn: React.FC<CheckboxColumnProps> = ({
  index,
  data,
  disabledMessage = "",
  isDisabled,
  hasWarning,
  onClickParentCallBack
}) => {
  const [displayWarning, setDisplayWarning] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    isDisabled && setDisabled(isDisabled(data));
  }, [data, isDisabled]);

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
    <div
      className="CheckboxColumn"
      title={disabled === true ? disabledMessage : ""}
    >
      <Checkbox
        disabled={disabled}
        onClick={onClick}
        role="checkbox"
        className="Checkbox"
      />
      {displayWarning === true && <WarningIcon className="WarningIcon" />}
      {disabled === true && <InfoIcon className="InfoIcon" />}
    </div>
  );
};
