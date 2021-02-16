import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import "../scss/ReceDatePicker.scss";
import "react-datepicker/dist/react-datepicker.css";
import { customHeaderRenderer } from "./CustomHeader";

interface ComponentProps {
  dateValue?: Date;
  disabled?: boolean;
  onChange?: (date: Date) => void;
}

export type ReceDatePickerProps = ComponentProps;

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
        onChange={(date: Date, event: React.SyntheticEvent<any> | undefined) =>
          onDateValueChange(props, setDateValue, date, event)
        }
        customInput={<IconCalendar />}
        shouldCloseOnSelect={true}
        disabled={props.disabled}
      />
    </div>
  );
};

class IconCalendar extends React.Component<{ value?: any; onClick?: any }> {
  render() {
    return (
      <FontAwesomeIcon
        icon={faCalendarAlt}
        size="lg"
        className="IconeCalendar"
        onClick={this.props.onClick}
        title="calendrier"
      />
    );
  }
}

export function onDateValueChange(
  props: any,
  setDateValue: any,
  date: Date,
  event: React.SyntheticEvent<any> | undefined
) {
  if (date) {
    if (props.onChange) {
      props.onChange(date);
    }

    setDateValue(date);
  }
}

export default ReceDatePicker;
