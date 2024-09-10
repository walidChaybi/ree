import { Backdrop, CircularProgress } from "@mui/material";
import gestionnaireTimer from "@util/timer/GestionnaireTimer";
import React, { useEffect } from "react";
import "./scss/OperationEnCours.scss";

export interface OperationEnCoursProps {
  visible: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onTimeoutEnd?: () => void;
  timeoutInMiliSec?: number;
}

const DEFAULT_TIMEOUT_MILI_SEC = 16000;
const BACKDROP_TIMER_NAME = "BackdropTimer";

export const OperationEnCours: React.FC<OperationEnCoursProps> = props => {
  useEffect(() => {
    if (props.visible && props.onTimeoutEnd) {
      gestionnaireTimer.declancheTimer(
        BACKDROP_TIMER_NAME,
        props.timeoutInMiliSec
          ? props.timeoutInMiliSec
          : DEFAULT_TIMEOUT_MILI_SEC,
        true,
        () => {
          if (props.onTimeoutEnd) {
            props.onTimeoutEnd();
          }
        }
      );
    }
    return function cleanUp() {
      gestionnaireTimer.annuleTimer(BACKDROP_TIMER_NAME);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.visible]);

  return (
    <Backdrop
      className={"backdrop"}
      open={props.visible}
      onClick={(e: any) => {
        e.stopPropagation();
        if (props.onClick) {
          props.onClick(e);
        }
      }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
