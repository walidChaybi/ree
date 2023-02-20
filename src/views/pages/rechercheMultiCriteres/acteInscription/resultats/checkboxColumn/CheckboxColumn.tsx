import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import Checkbox from "@mui/material/Checkbox";
import React, { useEffect, useState } from "react";
import "./scss/CheckboxColumn.scss";

export interface IEtatCheckboxColonne {
  coche: boolean;
}

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
  etat?: IEtatCheckboxColonne;
}

export const CheckboxColumn: React.FC<CheckboxColumnProps> = ({
  index,
  data,
  disabledMessage = "",
  isDisabledCallBack,
  hasWarningCallBack,
  onClickCheckboxCallBack,
  etat
}) => {
  const [checked, setChecked] = useState<boolean>(etat ? etat.coche : false);
  const [displayWarning, setDisplayWarning] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (etat) {
      setChecked(etat.coche);
    }
  }, [etat]);

  useEffect(() => {
    isDisabledCallBack && setDisabled(isDisabledCallBack(data));
  }, [data, isDisabledCallBack]);

  useEffect(() => {
    hasWarningCallBack && setDisplayWarning(hasWarningCallBack(checked, data));
  }, [checked, data, hasWarningCallBack]);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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
        checked={checked}
      />
      {displayWarning === true && <WarningIcon className="WarningIcon" />}
      {disabled === true && <InfoIcon className="InfoIcon" />}
    </div>
  );
};
