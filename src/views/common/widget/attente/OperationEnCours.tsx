import { Backdrop, CircularProgress } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import gestionnaireTimer from "@util/timer/GestionnaireTimer";
import React, { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 99,
    color: "#fff"
  }
}));

export interface OperationEnCoursProps {
  visible: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onTimeoutEnd?: () => void;
  timeoutInMiliSec?: number;
}

const DEFAULT_TIMEOUT_MILI_SEC = 16000;
const BACKDROP_TIMER_NAME = "BackdropTimer";

export const OperationEnCours: React.FC<OperationEnCoursProps> = props => {
  const classes = useStyles();

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
      className={classes.backdrop}
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
