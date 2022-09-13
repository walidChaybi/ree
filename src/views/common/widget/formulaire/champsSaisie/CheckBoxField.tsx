import { Option } from "@util/Type";
import React from "react";
import { RadioField } from "./RadioField";

interface CheckboxFieldProps {
  name: string;
  label: string;
  values: Option[];
  ariaLabel?: string;
  title?: string;
  disabled?: boolean;
  noErrorMessage?: boolean;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = props => {
  const type: "checkbox" | "radio" = "checkbox";
  const checkBoxProps = { ...props, type };
  return <RadioField {...checkBoxProps} />;
};
