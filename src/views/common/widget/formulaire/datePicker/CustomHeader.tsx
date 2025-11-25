import React from "react";
import { OptionVide, SelectRece } from "../champsSaisie/SelectField";

const range = (n1: number, n2: number) => {
  const resRange: string[] = [];
  for (let i = n1; i < n2; i++) {
    resRange.push(String(i));
  }
  return resRange;
};

const getYear = (date: Date) => {
  return date.getFullYear();
};

const getMonth = (date: Date) => {
  return date.getMonth();
};
const ANNEE_MIN = 1900;
const years = range(ANNEE_MIN, getYear(new Date()) + 1);
const months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

export const customHeaderRenderer = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled
}: {
  date: Date;
  changeYear(year: number): void;
  changeMonth(month: number): void;
  decreaseMonth(): void;
  increaseMonth(): void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
}) => (
  <div
    style={{
      margin: 10,
      display: "flex",
      justifyContent: "center"
    }}
  >
    <button
      name="decrease"
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        decreaseMonth();
      }}
      disabled={prevMonthButtonDisabled}
    >
      {"<"}
    </button>

    <SelectRece
      placeholder="Mois"
      ariaLabel="select month"
      value={months[getMonth(date)]}
      onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
      options={months.map(month => ({ cle: month, libelle: month }))}
      optionVide={OptionVide.NON_PRESENTE}
    />

    <SelectRece
      placeholder="Année"
      ariaLabel="select year"
      value={getYear(date)}
      onChange={({ target: { value } }) => changeYear(Number(value))}
      options={years.map(year => ({ cle: year, libelle: year }))}
    />

    <button
      name="increase"
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        increaseMonth();
      }}
      disabled={nextMonthButtonDisabled}
    >
      {">"}
    </button>
  </div>
);
