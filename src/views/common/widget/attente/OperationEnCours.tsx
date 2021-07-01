import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import gestionnaireTimer from "../../util/timer/GestionnaireTimer";

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
}));

export interface OperationEnCoursProps {
  visible: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onTimeoutEnd?: () => void;
  timeoutInMiliSec?: number;
}

const DEFAULT_TIMEOUT = 20000;
const BACKDROP_TIMER_NAME = "BackdropTimer";

export const OperationEnCours: React.FC<OperationEnCoursProps> = props => {
  const classes = useStyles();

  useEffect(() => {
    if (props.visible && props.onTimeoutEnd) {
      gestionnaireTimer.declancheTimer(
        BACKDROP_TIMER_NAME,
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
      gestionnaireTimer.annuleTimer(BACKDROP_TIMER_NAME);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.visible]);

  return (
    <Backdrop
      className={classes.backdrop}
      open={props.visible}
      onClick={props.onClick}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
