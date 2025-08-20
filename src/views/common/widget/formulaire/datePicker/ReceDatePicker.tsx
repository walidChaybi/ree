import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import "../scss/ReceDatePicker.scss";
import { customHeaderRenderer } from "./CustomHeader";

interface ReceDatePickerProps {
  dateValue?: Date;
  disabled?: boolean;
  onChange?: (date: Date) => void;
  dateMini?: Date;
  dateMaxi?: Date;
}

const ReceDatePicker: React.FC<ReceDatePickerProps> = props => {
  const [dateValue, setDateValue] = useState(props.dateValue ?? new Date());

  React.useEffect(() => {
    if (props.dateValue) {
      setDateValue(props.dateValue);
    }
  }, [props.dateValue]);

  return (
    <div className="ReceDatePicker">
      <DatePicker
        renderCustomHeader={customHeaderRenderer}
        selected={dateValue}
        onChange={(date: Date | null, event: React.SyntheticEvent<any> | undefined) => onDateValueChange(props, setDateValue, date, event)}
        customInput={<IconCalendar />}
        shouldCloseOnSelect={true}
        disabled={props.disabled}
        minDate={props.dateMini}
        maxDate={props.dateMaxi}
      />
    </div>
  );
};

class IconCalendar extends React.Component<{ value?: any; onClick?: any }> {
  render() {
    return (
      <FaCalendarAlt
        className="IconeCalendar text-2xl"
        onClick={this.props.onClick}
        title="Calendrier"
        aria-label="Calendrier"
      />
    );
  }
}

export function onDateValueChange(props: any, setDateValue: any, date: Date | null, event: React.SyntheticEvent<any> | undefined) {
  if (date) {
    if (props.onChange) {
      props.onChange(date);
    }

    setDateValue(date);
  }
}

export default ReceDatePicker;
