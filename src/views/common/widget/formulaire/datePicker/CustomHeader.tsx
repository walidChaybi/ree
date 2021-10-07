import React from "react";

function range(n1: number, n2: number) {
  const resRange: string[] = [];
  for (let i = n1; i < n2; i++) {
    resRange.push(String(i));
  }
  return resRange;
}

function getYear(date: Date) {
  return date.getFullYear();
}

function getMonth(date: Date) {
  return date.getMonth();
}
const ANNEE_MIN = 1900;
const years = range(ANNEE_MIN, getYear(new Date()) + 1);
const months = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre"
];

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

    <select
      aria-label="select month"
      value={months[getMonth(date)]}
      onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
    >
      {months.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>

    <select
      aria-label="select year"
      value={getYear(date)}
      onChange={({ target: { value } }) => changeYear(Number(value))}
    >
      {years.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>

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
