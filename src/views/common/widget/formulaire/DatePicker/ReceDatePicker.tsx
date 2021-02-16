import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import "../scss/ReceDatePicker.scss";
import "react-datepicker/dist/react-datepicker.css";
import { connect, FormikProps, FormikValues } from "formik";
import { rempliAGaucheAvecZero } from "../../../util/Utils";
import { customHeaderRenderer } from "./CustomHeader";
import { FormikComponentProps } from "../utils/FormUtil";

interface ComponentProps {
  nomComposantjour: string;
  nomComposantMois: string;
  nomComposantAnnee: string;
  dateValue?: Date;
}

export type ReceDatePickerProps = ComponentProps & FormikComponentProps;

const ReceDatePicker: React.FC<ReceDatePickerProps> = props => {
  const [dateValue, setDateValue] = useState(props.dateValue ?? new Date());
  const formik: FormikProps<FormikValues> = props.formik;

  function onDateValueChange(
    date: Date,
    event: React.SyntheticEvent<any> | undefined
  ) {
    if (date) {
      formik.setFieldValue(
        props.nomComposantjour,
        rempliAGaucheAvecZero(date.getDate())
      );
      formik.setFieldValue(
        props.nomComposantMois,
        rempliAGaucheAvecZero(date.getMonth() + 1)
      );
      formik.setFieldValue(props.nomComposantAnnee, date.getFullYear());
      setDateValue(date);
    }
  }

  return (
    <div className="ReceDatePicker">
      <DatePicker
        renderCustomHeader={customHeaderRenderer}
        selected={dateValue}
        onChange={onDateValueChange}
        customInput={<IconCalendar />}
        shouldCloseOnSelect={true}
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
      />
    );
  }
}

export default connect(ReceDatePicker);
