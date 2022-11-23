import { CircularProgress } from "@mui/material";
import gestionnaireTimer from "@util/timer/GestionnaireTimer";
import React, { useEffect } from "react";
import "./scss/OperationLocaleEnCours.scss";

export interface OperationEnCoursProps {
  visible: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onTimeoutEnd?: () => void;
  timeoutInMiliSec?: number;
}

const DEFAULT_TIMEOUT = 10000;
const SPINNER_TIMER_NAME = "SpinnerTimer";

export const OperationLocaleEnCours: React.FC<OperationEnCoursProps> =
  props => {
    useEffect(() => {
      if (props.visible && props.onTimeoutEnd) {
        gestionnaireTimer.declancheTimer(
          SPINNER_TIMER_NAME,
          props.timeoutInMiliSec ? props.timeoutInMiliSec : DEFAULT_TIMEOUT,
          true,
          () => {
            if (props.onTimeoutEnd) {
              props.onTimeoutEnd();
            }
          }
        );
      }
      return function cleanUp() {
        gestionnaireTimer.annuleTimer(SPINNER_TIMER_NAME);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.visible]);

    return <CircularProgress className="spinner" />;
  };
