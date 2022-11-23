import Checkbox from "@mui/material/Checkbox";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import React, { useEffect, useState } from "react";
import "./scss/CheckboxColumn.scss";

export interface CheckboxColumnProps {
  index: number;
  data: any;
  disabledMessage?: string;
  isDisabledCallBack?: (data: any) => boolean;
  hasWarningCallBack?: (isChecked: boolean, data: any) => boolean;
  onClickCheckboxCallBack?: (
    index: number,
    isChecked: boolean,
    data: any
  ) => void;
}

export const CheckboxColumn: React.FC<CheckboxColumnProps> = ({
  index,
  data,
  disabledMessage = "",
  isDisabledCallBack,
  hasWarningCallBack,
  onClickCheckboxCallBack
}) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [displayWarning, setDisplayWarning] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    isDisabledCallBack && setDisabled(isDisabledCallBack(data));
  }, [data, isDisabledCallBack]);

  useEffect(() => {
    hasWarningCallBack && setDisplayWarning(hasWarningCallBack(checked, data));
  }, [checked, data, hasWarningCallBack]);

  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    const isChecked: boolean = (event?.target as any)?.checked;
    setChecked(isChecked);
    onClickCheckboxCallBack && onClickCheckboxCallBack(index, isChecked, data);
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
